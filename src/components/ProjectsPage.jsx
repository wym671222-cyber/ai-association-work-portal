import { useMemo, useState } from "react";
import {
  Building2,
  ClipboardList,
  Flag,
  Search,
  SlidersHorizontal,
  Target,
} from "lucide-react";
import {
  projectScenes,
  riskCounts,
} from "../data/portalData";
import {
  EmptyState,
  PageHeader,
  PriorityTag,
  RiskTag,
  SectionHeader,
  StatCard,
  StatusTag,
} from "./Ui";

const PAGE_SIZE = 8;

function uniqueValues(key) {
  return [...new Set(projectScenes.map((project) => project[key]).filter(Boolean))].sort(
    (a, b) => a.localeCompare(b, "zh-CN"),
  );
}

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [unit, setUnit] = useState("全部");
  const [risk, setRisk] = useState("全部");
  const [priority, setPriority] = useState("全部");
  const [status, setStatus] = useState("全部");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(projectScenes[0]?.id);

  const units = uniqueValues("unit");
  const statuses = uniqueValues("status");

  const filteredProjects = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return projectScenes.filter((project) => {
      const text = `${project.scene} ${project.pain_point} ${project.unit} ${project.center}`.toLowerCase();
      return (
        (!keyword || text.includes(keyword)) &&
        (unit === "全部" || project.unit === unit) &&
        (risk === "全部" || project.risk === risk) &&
        (priority === "全部" || project.priority === priority) &&
        (status === "全部" || project.status === status)
      );
    });
  }, [priority, risk, search, status, unit]);

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

  function updateFilter(setter, value) {
    setter(value);
    setPage(1);
  }

  function resetFilters() {
    setSearch("");
    setUnit("全部");
    setRisk("全部");
    setPriority("全部");
    setStatus("全部");
    setPage(1);
  }

  return (
    <div className="page">
      <PageHeader
        title="单位探索台账"
        description="把各单位问卷证据转化为AI对接人、2-3个探索方向、一页纸计划和OA模块候选。"
      />

      <section className="project-summary-grid">
        <StatCard
          icon={ClipboardList}
          value={projectScenes.length}
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
            options={["低", "中", "高", "待定"]}
          />
          <FilterSelect
            label="优先级"
            value={priority}
            onChange={(value) => updateFilter(setPriority, value)}
            options={["高", "中"]}
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
                            onClick={() => setSelectedId(project.id)}
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
                  共 {filteredProjects.length} 条，第 {activePage} / {totalPages} 页
                </span>
                <div>
                  <button
                    type="button"
                    disabled={activePage === 1}
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                  >
                    上一页
                  </button>
                  <button
                    type="button"
                    disabled={activePage === totalPages}
                    onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
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
          {selectedProject ? (
            <>
              <div className="detail-head">
                <span>{selectedProject.unit}</span>
                <h2>{selectedProject.scene}</h2>
                <div className="detail-tags">
                  <RiskTag risk={selectedProject.risk} />
                  <PriorityTag priority={selectedProject.priority} />
                  <StatusTag status={selectedProject.status} />
                </div>
              </div>
              <DetailItem label="业务痛点" value={selectedProject.pain_point} />
              <DetailItem label="AI辅助方式" value={selectedProject.ai_method} />
              <DetailItem label="输出成果" value={selectedProject.output} />
              <DetailItem label="人工复核" value={selectedProject.human_review} />
              <DetailItem label="需要支持" value={selectedProject.support_need} />
              <DetailItem label="OA模块状态" value={selectedProject.oa_candidate} />
              <DetailItem
                label="数据边界"
                value={
                  selectedProject.risk === "高"
                    ? "需在受控环境中验证，明确权限、专业复核和必要审批。"
                    : "探索前确认数据范围、工具环境和保留记录要求。"
                }
              />
              <DetailItem label="验证指标" value={selectedProject.metric} />
              <div className="detail-evidence">
                <strong>证据说明</strong>
                <p>{selectedProject.evidence_type}</p>
                <span>问卷样本 n={selectedProject.sample_n}</span>
              </div>
            </>
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
            ["低", riskCounts.低],
            ["中", riskCounts.中],
            ["高", riskCounts.高],
            ["待定", riskCounts.待定],
          ].map(([label, count]) => (
            <div className="risk-bar-row" key={label}>
              <span>{label}风险</span>
              <div>
                <i
                  className={`risk-bar risk-bar-${label}`}
                  style={{ width: `${(count / projectScenes.length) * 100}%` }}
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

function DetailItem({ label, value }) {
  return (
    <div className="detail-item">
      <strong>{label}</strong>
      <p>{value}</p>
    </div>
  );
}
