import {
  CheckCircle2,
  LockKeyhole,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import {
  projectGates,
  riskLevels,
  safetyRedlines,
} from "../data/portalData";
import { PageHeader, RiskTag, SectionHeader } from "./Ui";

export default function SafetyPage() {
  return (
    <div className="page">
      <PageHeader
        title="安全合规"
        description="强化数据安全、权限边界、人工复核和输出责任，确保AI应用不替代业务责任主体。"
      />

      <section className="safety-hero">
        <ShieldCheck size={34} aria-hidden="true" />
        <div>
          <strong>安全是探索准入条件，不是事后补充项。</strong>
          <p>所有探索方向在交流和固化前均需确认数据范围、工具环境、权限和人工复核点。</p>
        </div>
      </section>

      <section className="safety-two-column">
        <article className="panel">
          <SectionHeader
            title="安全红线"
            description="重要结论和专业事项必须由责任人员判断、复核和审批。"
          />
          <div className="redline-list">
            {safetyRedlines.map((item) => (
              <div className="redline-row" key={item.title}>
                <ShieldAlert size={19} aria-hidden="true" />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.requirement}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <SectionHeader
            title="探索准入条件"
            description="风险不可控即暂停；成熟场景先复盘复制，再进入OA模块候选。"
          />
          <div className="gate-list">
            {projectGates.map((gate) => (
              <div key={gate}>
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>{gate}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="panel">
        <SectionHeader
          title="风险分级与控制"
          description="风险等级越高，越需要受控环境、专业复核和必要审批。"
        />
        <div className="risk-level-grid">
          {riskLevels.map((item) => (
            <article className={`risk-level-card risk-level-${item.level}`} key={item.level}>
              <div className="risk-level-head">
                <RiskTag risk={item.level} />
                <LockKeyhole size={19} aria-hidden="true" />
              </div>
              <h3>典型场景</h3>
              <p>{item.examples}</p>
              <h3>控制要求</h3>
              <p>{item.controls}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
