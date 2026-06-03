import { CheckCircle2, Circle, Milestone, UsersRound } from "lucide-react";
import {
  annualMainline,
  roles,
  targets,
} from "../data/portalData";
import { PageHeader, SectionHeader } from "./Ui";

export default function AnnualPlanPage() {
  return (
    <div className="page">
      <PageHeader
        title="年度主线"
        description="以调研诊断为起点，以可验证、可复制的业务成果为年度工作出口。"
        meta="2026年6月至12月 · 六阶段推进"
      />

      <section className="panel annual-roadmap-panel">
        <SectionHeader
          title="六阶段推进路线"
          description="当前处于启动期，后续阶段均以完成前置交付为进入条件。"
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
            title="年度目标"
            description="目标用于指导资源投入和阶段验收，不代表当前完成进度。"
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
            title="组织协同"
            description="协会提供方法、资源和协作支持，不替代各单位管理职责。"
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
