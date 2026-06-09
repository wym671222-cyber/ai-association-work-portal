import { CheckCircle2, Circle, Milestone, UsersRound } from "lucide-react";
import {
  annualMainline,
  portalMeta,
  roles,
  targets,
} from "../data/portalData";
import { PageHeader, SectionHeader } from "./Ui";

export default function AnnualPlanPage() {
  return (
    <div className="page">
      <PageHeader
        title="竹网行动推进节奏"
        description="以兴趣驱动、以点带面、渐进深入为原则，从会员自愿参与推进到应用孵化、成果推广和系统能力固化。"
        meta={`${portalMeta.versionStatus} · ${portalMeta.period}`}
      />

      <section className="panel annual-roadmap-panel">
        <SectionHeader
          title="五个节点推进路线"
          description="当前重点是破土启动：协会招募、工具支持、薪火破冰和单位方向确认。"
        />
        <div className="roadmap">
          {annualMainline.map((stage, index) => (
            <article className="roadmap-stage" key={stage.id}>
              <div className="roadmap-marker">
                {stage.status === "当前重点" ? (
                  <CheckCircle2 size={22} aria-hidden="true" />
                ) : (
                  <Circle size={22} aria-hidden="true" />
                )}
                <span>{index + 1}</span>
              </div>
              <div className="roadmap-content">
                <div className="roadmap-title">
                  <h3>{stage.name}</h3>
                  <span>{stage.period}</span>
                </div>
                <strong>{stage.purpose}</strong>
                <p>{stage.description}</p>
                <div className="deliverable-list">
                  {stage.deliverables.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="annual-two-column">
        <article className="panel">
          <SectionHeader
            title="执行目标"
            description="目标用于对齐资源投入和阶段验收，不代表当前完成进度。"
          />
          <div className="target-list">
            {targets.map((target) => (
              <div className="target-row" key={target.label}>
                <Milestone size={19} aria-hidden="true" />
                <div>
                  <strong>
                    {target.value}
                    {target.suffix}
                  </strong>
                  <span>{target.label}</span>
                </div>
                <p>{target.note}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <SectionHeader
            title="组织架构与职责"
            description="完成稿明确会长、副会长、会员、技术指导和教练顾问的产生机制与主要职责。"
          />
          <div className="role-list">
            {roles.map((item) => (
              <div className="role-row" key={item.role}>
                <UsersRound size={18} aria-hidden="true" />
                <div>
                  <strong>{item.role}</strong>
                  <p>{item.responsibility}</p>
                  <span>关键输出：{item.output}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
