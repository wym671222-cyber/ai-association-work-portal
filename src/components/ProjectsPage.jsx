import { useEffect, useMemo, useRef, useState } from "react";
import {
  Building2,
  ClipboardList,
  Download,
  Edit3,
  Flag,
  Save,
  Search,
  SlidersHorizontal,
  Target,
  Upload,
  X,
} from "lucide-react";
import { projectScenes as defaultProjectScenes } from "../data/portalData";
import {
  LEDGER_FIELDS,
  LEDGER_PASSWORD_KEY,
  PRIORITY_OPTIONS,
  RISK_OPTIONS,
  calculateRiskCounts,
  normalizeLedgerScene,
  normalizeLedgerScenes,
} from "../lib/ledgerSchema.js";
import {
  downloadLedgerExcel,
  downloadLedgerJson,
  importServerScenes,
  loadLedgerScenes,
  persistLocalScenes,
  saveServerScene,
} from "../lib/ledgerStore.js";
import {
  EmptyState,
  PageHeader,
  PriorityTag,
  RiskTag,
  SectionHeader,
  StatCard,
  StatusTag,
} from "./Ui";

const PAGE_SIZE = 15;
const DETAIL_FIELDS = [
  "pain_point",
  "human_review",
  "output",
  "support_need",
  "oa_candidate",
  "metric",
  "owner",
  "sample_n",
  "mention_count",
  "survey_dept",
  "center",
  "ai_method",
  "evidence_type",
  "evidence_quote",
];

const fieldByKey = new Map(LEDGER_FIELDS.map((field) => [field.key, field]));

function uniqueValues(projects, key) {
  return [...new Set(projects.map((project) => project[key]).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "zh-CN"),
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState(defaultProjectScenes);
  const [storageMode, setStorageMode] = useState("loading");
  const [modeMessage, setModeMessage] = useState("正在加载台账");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState(() => {
    try {
      return window.sessionStorage.getItem(LEDGER_PASSWORD_KEY) || "";
    } catch {
      return "";
    }
  });
  const [search, setSearch] = useState("");
  const [unit, setUnit] = useState("全部");
  const [risk, setRisk] = useState("全部");
  const [priority, setPriority] = useState("全部");
  const [status, setStatus] = useState("全部");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(defaultProjectScenes[0]?.id);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    loadLedgerScenes(defaultProjectScenes).then((result) => {
      if (!isMounted) return;
      setProjects(result.scenes);
      setStorageMode(result.mode);
      setModeMessage(result.message);
      setSelectedId(result.scenes[0]?.id);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const units = useMemo(() => uniqueValues(projects, "unit"), [projects]);
  const statuses = useMemo(() => uniqueValues(projects, "status"), [projects]);
  const dynamicRiskCounts = useMemo(() => calculateRiskCounts(projects), [projects]);

  const filteredProjects = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return projects.filter((project) => {
      const text =
        `${project.scene} ${project.pain_point} ${project.unit} ${project.center}`.toLowerCase();
      return (
        (!keyword || text.includes(keyword)) &&
        (unit === "全部" || project.unit === unit) &&
        (risk === "全部" || project.risk === risk) &&
        (priority === "全部" || project.priority === priority) &&
        (status === "全部" || project.status === status)
      );
    });
  }, [priority, projects, risk, search, status, unit]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));
  const activePage = Math.min(page, totalPages);
  const pageProjects = filteredProjects.slice(
    (activePage - 1) * PAGE_SIZE,
    activePage * PAGE_SIZE,
  );
  const selectedProject =
    filteredProjects.find((project) => project.id === selectedId) ||
    pageProjects[0] ||
    null;

  function clearMessages() {
    setNotice("");
    setError("");
  }

  function selectProject(id) {
    setSelectedId(id);
    setIsEditing(false);
    setDraft(null);
    clearMessages();
  }

  function updateFilter(setter, value) {
    setter(value);
    setPage(1);
    setIsEditing(false);
    setDraft(null);
  }

  function resetFilters() {
    setSearch("");
    setUnit("全部");
    setRisk("全部");
    setPriority("全部");
    setStatus("全部");
    setPage(1);
    setSelectedId(projects[0]?.id);
    setIsEditing(false);
    setDraft(null);
    clearMessages();
  }

  function goToPage(nextPage) {
    const nextActivePage = Math.min(Math.max(1, nextPage), totalPages);
    setPage(nextActivePage);
    setSelectedId(filteredProjects[(nextActivePage - 1) * PAGE_SIZE]?.id);
    setIsEditing(false);
    setDraft(null);
    clearMessages();
  }

  function updateProjects(nextProjects, nextSelectedId) {
    const normalized = normalizeLedgerScenes(nextProjects);
    setProjects(normalized);
    if (storageMode === "local") persistLocalScenes(normalized);
    if (nextSelectedId) setSelectedId(nextSelectedId);
  }

  function startEdit() {
    if (!selectedProject) return;
    setDraft({ ...selectedProject });
    setIsEditing(true);
    clearMessages();
  }

  function cancelEdit() {
    setDraft(null);
    setIsEditing(false);
    clearMessages();
  }

  function updateDraft(key, value) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function saveDraft() {
    if (!selectedProject || !draft) return;

    const normalized = normalizeLedgerScene(
      {
        ...selectedProject,
        ...draft,
        id: selectedProject.id,
      },
      selectedProject.id,
    );

    setIsSaving(true);
    clearMessages();
    try {
      let saved = normalized;
      if (storageMode === "server") {
        if (!password.trim()) throw new Error("请输入编辑口令");
        window.sessionStorage.setItem(LEDGER_PASSWORD_KEY, password);
        saved = await saveServerScene(normalized, password);
      }

      const nextProjects = projects.map((project) =>
        project.id === selectedProject.id ? saved : project,
      );
      updateProjects(nextProjects, saved.id);
      setDraft(null);
      setIsEditing(false);
      setNotice(storageMode === "server" ? "已保存到共享台账" : "已保存到本机浏览器");
    } catch (saveError) {
      setError(saveError.message || "保存失败");
    } finally {
      setIsSaving(false);
    }
  }

  async function exportExcel() {
    clearMessages();
    try {
      await downloadLedgerExcel(projects);
      setNotice("已生成Excel导出文件");
    } catch {
      setError("Excel导出失败");
    }
  }

  function exportJson() {
    clearMessages();
    downloadLedgerJson(projects);
    setNotice("已生成JSON备份文件");
  }

  async function importJsonFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    clearMessages();
    try {
      const parsed = JSON.parse(await file.text());
      const importedScenes = normalizeLedgerScenes(parsed.scenes || parsed);
      if (!importedScenes.length) throw new Error("JSON中没有台账数据");

      let nextScenes = importedScenes;
      if (storageMode === "server") {
        if (!password.trim()) throw new Error("请输入编辑口令");
        window.sessionStorage.setItem(LEDGER_PASSWORD_KEY, password);
        nextScenes = await importServerScenes(importedScenes, password);
      }

      updateProjects(nextScenes, nextScenes[0]?.id);
      setPage(1);
      setIsEditing(false);
      setDraft(null);
      setNotice(storageMode === "server" ? "已导入共享台账" : "已导入本机台账");
    } catch (importError) {
      setError(importError.message || "JSON导入失败");
    } finally {
      event.target.value = "";
    }
  }

  const modeLabel =
    storageMode === "server" ? "共享保存" : storageMode === "local" ? "本机保存" : "加载中";

  return (
    <div className="page">
      <PageHeader
        title="单位探索台账"
        description="把各单位问卷证据转化为AI对接人、2-3个探索方向、一页纸计划和OA模块候选。"
      />

      <section className="project-summary-grid">
        <StatCard
          icon={ClipboardList}
          value={projects.length}
          suffix="个"
          label="候选方向"
          note="来自单位开放题归纳"
          tone="blue"
        />
        <StatCard
          icon={Target}
          value="2-3"
          suffix="个/单位"
          label="探索方向"
          note="会后2周确认"
          tone="teal"
        />
        <StatCard
          icon={Building2}
          value={23}
          suffix="个"
          label="正式业务单位"
          note="全部进入探索网络"
          tone="blue"
        />
        <StatCard
          icon={Flag}
          value="1"
          suffix="份/单位"
          label="一页纸计划"
          note="会后1个月提交"
          tone="green"
        />
      </section>

      <section className="panel filter-panel">
        <div className="filter-title">
          <SlidersHorizontal size={18} aria-hidden="true" />
          <strong>筛选项目</strong>
          <span>当前显示 {filteredProjects.length} 个场景</span>
        </div>
        <div className="filters">
          <label className="search-field">
            <span className="sr-only">搜索探索方向</span>
            <Search size={17} aria-hidden="true" />
            <input
              value={search}
              onChange={(event) => updateFilter(setSearch, event.target.value)}
              placeholder="搜索探索方向、痛点或申报单位"
            />
          </label>
          <FilterSelect
            label="申报单位"
            value={unit}
            onChange={(value) => updateFilter(setUnit, value)}
            options={units}
          />
          <FilterSelect
            label="风险等级"
            value={risk}
            onChange={(value) => updateFilter(setRisk, value)}
            options={RISK_OPTIONS}
          />
          <FilterSelect
            label="优先级"
            value={priority}
            onChange={(value) => updateFilter(setPriority, value)}
            options={PRIORITY_OPTIONS}
          />
          <FilterSelect
            label="状态"
            value={status}
            onChange={(value) => updateFilter(setStatus, value)}
            options={statuses}
          />
          <button className="button button-secondary" type="button" onClick={resetFilters}>
            重置
          </button>
        </div>
      </section>

      <section className="ledger-action-bar">
        <div>
          <span className={`mode-pill mode-${storageMode}`}>{modeLabel}</span>
          <strong>{modeMessage}</strong>
          {notice ? <small className="ledger-notice">{notice}</small> : null}
          {error ? <small className="ledger-error">{error}</small> : null}
        </div>
        {storageMode === "server" ? (
          <label className="password-inline">
            <span>编辑口令</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="保存或导入时使用"
            />
          </label>
        ) : null}
        <div className="ledger-actions">
          <button className="button button-secondary" type="button" onClick={exportExcel}>
            <Download size={15} aria-hidden="true" />
            导出Excel
          </button>
          <button className="button button-secondary" type="button" onClick={exportJson}>
            <Download size={15} aria-hidden="true" />
            JSON备份
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={15} aria-hidden="true" />
            导入JSON
          </button>
          <input
            ref={fileInputRef}
            className="sr-only"
            type="file"
            accept="application/json,.json"
            onChange={importJsonFile}
          />
        </div>
      </section>

      <section className="project-workspace">
        <article className="panel project-table-panel">
          <SectionHeader
            title="探索方向清单"
            description="风险分级、支持需求和OA候选状态需在单位交流中进一步确认。"
          />
          {pageProjects.length ? (
            <>
              <div className="table-wrap project-table-wrap">
                <table className="project-table">
                  <thead>
                    <tr>
                      <th>探索方向</th>
                      <th>申报单位</th>
                      <th>风险等级</th>
                      <th>优先级</th>
                      <th>验证指标</th>
                      <th>状态</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageProjects.map((project) => (
                      <tr
                        className={selectedProject?.id === project.id ? "selected-row" : ""}
                        key={project.id}
                      >
                        <td className="cell-strong">{project.scene}</td>
                        <td>{project.unit}</td>
                        <td>
                          <RiskTag risk={project.risk} />
                        </td>
                        <td>
                          <PriorityTag priority={project.priority} />
                        </td>
                        <td>{project.metric}</td>
                        <td>
                          <StatusTag status={project.status} />
                        </td>
                        <td>
                          <button
                            className="table-action"
                            type="button"
                            onClick={() => selectProject(project.id)}
                          >
                            查看
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                <span>
                  共 {filteredProjects.length} 条，每页 {PAGE_SIZE} 条，第 {activePage} /{" "}
                  {totalPages} 页
                </span>
                <div>
                  <button
                    type="button"
                    disabled={activePage === 1}
                    onClick={() => goToPage(activePage - 1)}
                  >
                    上一页
                  </button>
                  <button
                    type="button"
                    disabled={activePage === totalPages}
                    onClick={() => goToPage(activePage + 1)}
                  >
                    下一页
                  </button>
                </div>
              </div>
            </>
          ) : (
            <EmptyState description="请调整搜索关键词或筛选条件。" />
          )}
        </article>

        <aside className="panel project-detail-panel">
          <SectionHeader
            title="方向详情"
            description={
              isEditing ? "正在编辑当前方向，保存后同步更新清单。" : "点击编辑后可修改全部字段。"
            }
            action={
              selectedProject ? (
                <DetailActions
                  isEditing={isEditing}
                  isSaving={isSaving}
                  onCancel={cancelEdit}
                  onEdit={startEdit}
                  onSave={saveDraft}
                />
              ) : null
            }
          />
          {selectedProject ? (
            isEditing ? (
              <EditDetailCard draft={draft || selectedProject} onChange={updateDraft} />
            ) : (
              <ReadOnlyDetailCard project={selectedProject} />
            )
          ) : (
            <EmptyState description="选择一个项目后查看详细信息。" />
          )}
        </aside>
      </section>

      <section className="panel risk-summary-panel">
        <SectionHeader
          title="探索方向风险分布"
          description="待定方向需在单位交流或访谈中完成风险分级。"
        />
        <div className="risk-bars">
          {[
            ["低", dynamicRiskCounts.低],
            ["中", dynamicRiskCounts.中],
            ["高", dynamicRiskCounts.高],
            ["待定", dynamicRiskCounts.待定],
          ].map(([label, count]) => (
            <div className="risk-bar-row" key={label}>
              <span>{label}风险</span>
              <div>
                <i
                  className={`risk-bar risk-bar-${label}`}
                  style={{ width: `${projects.length ? (count / projects.length) * 100 : 0}%` }}
                />
              </div>
              <strong>{count}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function DetailActions({ isEditing, isSaving, onCancel, onEdit, onSave }) {
  if (!isEditing) {
    return (
      <button className="button button-secondary detail-command" type="button" onClick={onEdit}>
        <Edit3 size={15} aria-hidden="true" />
        编辑
      </button>
    );
  }

  return (
    <div className="detail-action-group">
      <button
        className="button button-secondary detail-command"
        type="button"
        onClick={onCancel}
        disabled={isSaving}
      >
        <X size={15} aria-hidden="true" />
        取消
      </button>
      <button
        className="button button-primary detail-command"
        type="button"
        onClick={onSave}
        disabled={isSaving}
      >
        <Save size={15} aria-hidden="true" />
        {isSaving ? "保存中" : "保存"}
      </button>
    </div>
  );
}

function ReadOnlyDetailCard({ project }) {
  return (
    <div className="detail-card">
      <div className="detail-head">
        <span>{project.unit}</span>
        <h2>{project.scene}</h2>
        <div className="detail-tags">
          <RiskTag risk={project.risk} />
          <PriorityTag priority={project.priority} />
          <StatusTag status={project.status} />
        </div>
      </div>
      <div className="detail-body">
        {DETAIL_FIELDS.map((key) => (
          <DetailItem
            key={key}
            label={fieldByKey.get(key)?.label || key}
            value={project[key]}
            wide={fieldByKey.get(key)?.wide}
          />
        ))}
      </div>
    </div>
  );
}

function EditDetailCard({ draft, onChange }) {
  return (
    <form className="detail-card edit-detail-card" onSubmit={(event) => event.preventDefault()}>
      <div className="detail-head">
        <span>{draft.unit || "待填写单位"}</span>
        <h2>{draft.scene || "待填写探索方向"}</h2>
        <div className="detail-tags">
          <RiskTag risk={draft.risk} />
          <PriorityTag priority={draft.priority} />
          <StatusTag status={draft.status} />
        </div>
      </div>
      <div className="edit-field-grid">
        <div className="readonly-id-field">
          <strong>系统编号</strong>
          <span>{draft.id}</span>
        </div>
        {LEDGER_FIELDS.map((field) => (
          <EditableField
            key={field.key}
            field={field}
            value={draft[field.key]}
            onChange={(value) => onChange(field.key, value)}
          />
        ))}
      </div>
    </form>
  );
}

function EditableField({ field, value, onChange }) {
  const className = `edit-field ${field.wide ? "edit-field-wide" : ""}`;

  if (field.type === "select") {
    return (
      <label className={className} data-field={field.key}>
        <span>{field.label}</span>
        <select
          aria-label={field.label}
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
        >
          {field.options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <label className={className} data-field={field.key}>
        <span>{field.label}</span>
        <textarea
          aria-label={field.label}
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    );
  }

  return (
    <label className={className} data-field={field.key}>
      <span>{field.label}</span>
      <input
        aria-label={field.label}
        type={field.type === "number" ? "number" : "text"}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="select-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="全部">全部</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function DetailItem({ label, value, wide = false }) {
  return (
    <div className={`detail-item ${wide ? "detail-wide" : ""}`}>
      <strong>{label}</strong>
      <p>{String(value ?? "")}</p>
    </div>
  );
}
