import {
  Building2,
  Flag,
  Layers3,
  Sparkles,
} from "lucide-react";
import {
  evidenceFacts,
  executionRhythm,
  portalMeta,
  riskCounts,
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
        title="竹网行动工作总览"
        description="按照领导确定方案，以AI兴趣协会、薪火计划和平台协同支撑推动公司AI应用落地。"
        meta={`${portalMeta.period} · ${portalMeta.phase}`}
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
            title="会后行动清单"
            description="按会后2周、1个月、2个月和年底节点推进，先启动兴趣和方向，再沉淀标杆与OA模块候选。"
            action={
              <TextLink onClick={() => onNavigate("projects")}>查看探索台账</TextLink>
            }
          />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>节点</th>
                  <th>工作线</th>
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
            title="竹网行动推进节奏"
            description="从破土到扎根，按节点完成方向确认、计划提交、交流复盘和平台固化。"
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
            title="调研与需求证据"
            description="问卷作为场景支撑材料保留，领导方案是当前执行主线。"
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
          <TextLink onClick={() => onNavigate("resources")}>查看调研分析资料</TextLink>
        </article>

        <article className="panel">
          <SectionHeader
            title="安全边界"
            description="AI应用不替代业务责任主体。"
            action={<TextLink onClick={() => onNavigate("safety")}>查看完整规则</TextLink>}
          />
          <div className="safety-summary">
            <div>
              <span className="safety-dot safety-blue" />
              <strong>数据与保密</strong>
              <p>不得上传涉密、敏感、个人信息或未经授权数据。</p>
            </div>
            <div>
              <span className="safety-dot safety-amber" />
              <strong>专业判断</strong>
              <p>重要结论和专业事项必须由责任人员判断和审批。</p>
            </div>
            <div>
              <span className="safety-dot safety-red" />
              <strong>人工复核</strong>
              <p>保留来源、关键提示、修改记录和验证证据。</p>
            </div>
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
      </section>
    </div>
  );
}
