import {
  Building2,
  Flag,
  Layers3,
  Trophy,
  UsersRound,
} from "lucide-react";
import {
  evidenceFacts,
  portalMeta,
  priorityPilots,
  riskCounts,
  targets,
  timelineRows,
  annualMainline,
} from "../data/portalData";
import {
  PageHeader,
  RiskTag,
  SectionHeader,
  StatCard,
  TextLink,
} from "./Ui";

const targetIcons = [Building2, Layers3, Trophy, Flag];
const months = ["6月", "7月", "8月", "9月", "10月", "11月", "12月"];

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
        title="2026年度工作总览"
        description="围绕真实业务场景，推动学习、实践、竞赛与成果转化。"
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
            title="项目优先级"
            description="重点试点建议，进入试点前仍需访谈确认。"
            action={
              <TextLink onClick={() => onNavigate("projects")}>查看全部项目池</TextLink>
            }
          />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>序号</th>
                  <th>申报单位</th>
                  <th>项目名称</th>
                  <th>风险等级</th>
                  <th>优先级评分</th>
                </tr>
              </thead>
              <tbody>
                {priorityPilots.slice(0, 5).map((pilot) => (
                  <tr key={pilot.rank}>
                    <td>{pilot.rank}</td>
                    <td>{pilot.unit}</td>
                    <td className="cell-strong">{pilot.project}</td>
                    <td>
                      <RiskTag risk={pilot.risk} />
                    </td>
                    <td className="score-cell">{pilot.score.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel timeline-panel">
          <SectionHeader
            title="6月至12月培训与交付时间线"
            description="以阶段交付连接培训、试点、大赛和成果转化。"
          />
          <div className="timeline-grid">
            <div className="timeline-head timeline-label-cell" />
            {months.map((month) => (
              <div className="timeline-head" key={month}>
                {month}
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
            description="门户中的目标和行动均以调研证据为起点。"
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
            description="当前项目池按场景数据边界和专业责任进行初步分级。"
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
