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
        title="薪火计划"
        description="薪火计划连接AI兴趣协会与各单位，把员工需求转化为可上手、可录屏、可复用的内部分享。"
        meta="服务工具破冰、单位探索和OA模块候选沉淀"
      />

      <section className="panel">
        <SectionHeader
          title="参与机制"
          description="从全员破冰到内部分享，再到单位计划和标杆复制。"
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
            title="分享安排"
            description="每月2-3场内部分享，线下带电脑实操，全程录屏归档。"
          />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>时间</th>
                  <th>分享主题</th>
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
            description="问卷需求比例用于确定薪火计划首期主题顺序。"
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
