import { BookOpenCheck, GraduationCap, Presentation, UsersRound } from "lucide-react";
import {
  learningNeeds,
  trainingLayers,
  trainingSchedule,
} from "../data/portalData";
import { PageHeader, SectionHeader } from "./Ui";

const layerIcons = [UsersRound, GraduationCap, BookOpenCheck, Presentation];

export default function TrainingPage() {
  const maxNeed = Math.max(...learningNeeds.map((item) => item.percent));

  return (
    <div className="page">
      <PageHeader
        title="培训计划"
        description="培训不是工具展示，而是帮助员工围绕真实工作问题形成可使用、可复核、可参赛的成果。"
        meta="服务单位场景摸排、重点试点和年度AI大赛"
      />

      <section className="panel">
        <SectionHeader
          title="分层参与机制"
          description="全员基础认知、单位骨干场景实训、成熟项目团队进阶辅导。"
        />
        <div className="training-layer-grid">
          {trainingLayers.map((layer, index) => {
            const Icon = layerIcons[index];
            return (
              <article className="training-layer" key={layer.name}>
                <div className="training-layer-icon">
                  <Icon size={23} aria-hidden="true" />
                </div>
                <h3>{layer.name}</h3>
                <strong>{layer.audience}</strong>
                <p>{layer.goal}</p>
                <span>成果要求：{layer.output}</span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="training-two-column">
        <article className="panel">
          <SectionHeader
            title="课程安排"
            description="课程与年度项目推进同步衔接。"
          />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>时间</th>
                  <th>课程主题</th>
                  <th>主要实操</th>
                  <th>服务成果</th>
                </tr>
              </thead>
              <tbody>
                {trainingSchedule.map((course) => (
                  <tr key={`${course.time}-${course.theme}`}>
                    <td className="cell-strong">{course.time}</td>
                    <td>{course.theme}</td>
                    <td>{course.practice}</td>
                    <td>{course.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel">
          <SectionHeader
            title="培训需求证据"
            description="问卷需求比例用于确定首期课程优先顺序。"
          />
          <div className="need-bars">
            {learningNeeds.map((need) => (
              <div className="need-row" key={need.short}>
                <div>
                  <span>{need.short}</span>
                  <strong>{need.percent}%</strong>
                </div>
                <div className="need-track">
                  <i style={{ width: `${(need.percent / maxNeed) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="source-note">数据来源：2026年5月29日AI认知与需求调研，n=134。</p>
        </article>
      </section>
    </div>
  );
}
