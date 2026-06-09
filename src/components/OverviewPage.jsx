import {
  Building2,
  Flag,
  Layers3,
  Sparkles,
} from "lucide-react";
import {
  evidenceFacts,
  executionRhythm,
  activityMechanisms,
  governanceHighlights,
  portalMeta,
  resourceSupportTiers,
  riskCounts,
  roles,
  safetyRedlines,
  targets,
  timelineColumns,
  timelineRows,
  annualMainline,
} from "../data/portalData";
import {
  PageHeader,
  SectionHeader,
  StatCard,
  TextLink,
} from "./Ui";

const targetIcons = [Layers3, Sparkles, Building2, Flag];

export default function OverviewPage({ onNavigate }) {
  const riskTotal = riskCounts.低 + riskCounts.中 + riskCounts.高 + riskCounts.待定;
  const riskStyle = {
    "--low": `${(riskCounts.低 / riskTotal) * 360}deg`,
    "--medium": `${((riskCounts.低 + riskCounts.中) / riskTotal) * 360}deg`,
    "--high": `${((riskCounts.低 + riskCounts.中 + riskCounts.高) / riskTotal) * 360}deg`,
  };

  return (
    <div className="page">
      <PageHeader
        title={portalMeta.documentTitle}
        description="根据0609完成稿更新：协会以解决实际工作问题、提升工作效率、沉淀可复用成果为导向，建立会员管理、活动开展、资源支持、成果孵化和安全边界的常态化运行机制。"
        meta={`${portalMeta.versionStatus} · ${portalMeta.period} · ${portalMeta.phase}`}
      />

      <section className="mainline-strip" aria-label="年度工作主线">
        {annualMainline.map((stage, index) => (
          <div className="mainline-stage" key={stage.id}>
            <span>{index + 1}</span>
            <strong>{stage.name}</strong>
            <small>{stage.purpose}</small>
          </div>
        ))}
      </section>

      <section className="stats-grid" aria-label="年度目标">
        {targets.map((target, index) => (
          <StatCard
            key={target.label}
            icon={targetIcons[index]}
            value={target.value}
            suffix={target.suffix}
            label={target.label}
            note={target.note}
            tone={target.tone}
          />
        ))}
      </section>

      <section className="overview-grid overview-grid-primary">
        <article className="panel">
          <SectionHeader
            title="制度执行清单"
            description="从会员加入、活动运行、资源支持、经费使用到成果发布，首页按完成稿条款口径展示。"
            action={
              <TextLink onClick={() => onNavigate("projects")}>查看探索台账</TextLink>
            }
          />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>事项</th>
                  <th>条款</th>
                  <th>关键动作</th>
                  <th>输出</th>
                </tr>
              </thead>
              <tbody>
                {executionRhythm.slice(0, 6).map((item) => (
                  <tr key={`${item.time}-${item.line}`}>
                    <td className="cell-strong">{item.time}</td>
                    <td>{item.line}</td>
                    <td>{item.action}</td>
                    <td>{item.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel timeline-panel">
          <SectionHeader
            title="竹网行动推进逻辑"
            description="章程明确以“破土、拔节、成林、扎根”承接兴趣启动、以点带面、经验共创和系统能力固化。"
          />
          <div className="timeline-grid">
            <div className="timeline-head timeline-label-cell" />
            {timelineColumns.map((column) => (
              <div className="timeline-head" key={column}>
                {column}
              </div>
            ))}
            {timelineRows.map((row) => (
              <div className="timeline-row" key={row.label}>
                <div className="timeline-label-cell">{row.label}</div>
                <div className="timeline-track">
                  <div
                    className={`timeline-bar timeline-${row.label}`}
                    style={{ "--start": row.start, "--span": row.span }}
                  >
                    {row.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="overview-grid overview-grid-secondary">
        <article className="panel">
          <SectionHeader
            title="制度速览"
            description="完成稿把协会定位为学习交流、应用孵化、成果推广三位一体的内部组织。"
          />
          <div className="safety-summary">
            {governanceHighlights.map((item, index) => (
              <div key={item.title}>
                <span
                  className={`safety-dot ${
                    index === 0 ? "safety-blue" : index === 1 ? "safety-amber" : "safety-red"
                  }`}
                />
                <strong>{item.title}</strong>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <SectionHeader
            title="成员职责闭环"
            description="完成稿明确会长、副会长、会员、技术指导和教练顾问的定位与输出。"
          />
          <div className="role-list">
            {roles.slice(0, 4).map((item) => (
              <div className="role-row" key={item.role}>
                <Building2 size={18} aria-hidden="true" />
                <div>
                  <strong>{item.role}</strong>
                  <p>{item.responsibility}</p>
                  <span>关键输出：{item.output}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <SectionHeader
            title="安全边界"
            description="AI应用只作辅助，不替代正式审批、专业判断和责任签署。"
            action={<TextLink onClick={() => onNavigate("safety")}>查看完整规则</TextLink>}
          />
          <div className="safety-summary">
            {safetyRedlines.slice(0, 3).map((item, index) => (
              <div key={item.title}>
                <span
                  className={`safety-dot ${
                    index === 0 ? "safety-blue" : index === 1 ? "safety-amber" : "safety-red"
                  }`}
                />
                <strong>{item.title}</strong>
                <p>{item.requirement}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="overview-grid overview-grid-primary">
        <article className="panel">
          <SectionHeader
            title="活动运行机制"
            description="固定双周分享和单周交流，再按需要扩展专题培训、教练辅导、应用路演等活动。"
          />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>活动类型</th>
                  <th>运行要求</th>
                  <th>产出</th>
                </tr>
              </thead>
              <tbody>
                {activityMechanisms.map((item) => (
                  <tr key={item.type}>
                    <td className="cell-strong">{item.type}</td>
                    <td>{item.rule}</td>
                    <td>{item.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel">
          <SectionHeader
            title="资源支持与成果要求"
            description="工具额度、会员订阅、API额度和教练辅导按“使用换分享、资源换成果”分层支持。"
            action={<TextLink onClick={() => onNavigate("resources")}>查看资料中心</TextLink>}
          />
          <div className="safety-summary">
            {resourceSupportTiers.map((item, index) => (
              <div key={item.audience}>
                <span
                  className={`safety-dot ${
                    index === 0 ? "safety-blue" : index === 1 ? "safety-amber" : "safety-red"
                  }`}
                />
                <strong>{item.audience}</strong>
                <p>{item.support}</p>
                <p>成果要求：{item.requirement}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="overview-grid overview-grid-secondary">
        <article className="panel">
          <SectionHeader
            title="调研证据仍保留"
            description="问卷数据继续作为单位场景、培训主题和探索台账的支撑材料。"
          />
          <div className="evidence-list">
            {evidenceFacts.map((fact) => (
              <div className={`evidence-row evidence-${fact.tone}`} key={fact.label}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
                <small>{fact.note}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <SectionHeader
            title="风险分布"
            description="探索方向仍按数据边界和专业责任进行初步分级。"
          />
          <div className="risk-chart-layout">
            <div className="donut" style={riskStyle}>
              <div>
                <strong>{riskTotal}</strong>
                <span>候选场景</span>
              </div>
            </div>
            <div className="legend-list">
              <div>
                <span className="legend-dot low" />
                <span>低风险</span>
                <strong>{riskCounts.低}</strong>
              </div>
              <div>
                <span className="legend-dot medium" />
                <span>中风险</span>
                <strong>{riskCounts.中}</strong>
              </div>
              <div>
                <span className="legend-dot high" />
                <span>高风险</span>
                <strong>{riskCounts.高}</strong>
              </div>
              <div>
                <span className="legend-dot pending" />
                <span>待定</span>
                <strong>{riskCounts.待定}</strong>
              </div>
            </div>
          </div>
        </article>

        <article className="panel">
          <SectionHeader
            title="成果管理"
            description="年底评价强调真实使用、降低阻力和可复制经验，不单纯展示工具效果。"
          />
          <div className="safety-summary">
            <div>
              <span className="safety-dot safety-blue" />
              <strong>成果类型</strong>
              <p>工具成果、模板成果、案例成果、培训成果和平台成果。</p>
            </div>
            <div>
              <span className="safety-dot safety-amber" />
              <strong>知识库建设</strong>
              <p>沉淀AI基础知识、工具教程、提示词模板、工作流模板、会员分享和常见问题。</p>
            </div>
            <div>
              <span className="safety-dot safety-red" />
              <strong>年度评价</strong>
              <p>形成年度优秀会员、优秀分享人、年度知识库和标杆案例清单。</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
