import { normalizeLedgerScenes } from "./ledgerSchema.js";

function supportNeed(scene) {
  const text = `${scene.scene} ${scene.pain_point} ${scene.ai_method}`;
  const needs = [];
  if (/公文|OA|制度|知识|培训|会议|周报/.test(text)) needs.push("薪火主题");
  if (/流程|审批|提醒|归档|资料库|知识库/.test(text)) needs.push("平台协同");
  if (/数据|清标|财务|成本|合同|投资|图纸|规范|法务|人力/.test(text)) {
    needs.push("安全边界");
  }
  return needs.length ? needs.join("、") : "工具支持";
}

function explorationStatus(scene) {
  if (scene.risk === "待定") return "待访谈确认";
  if (/知识库|资料库|流程|审批|周报|OA|制度/.test(scene.scene)) return "OA候选待评估";
  return "待单位确认方向";
}

export function buildDefaultProjectScenes(scenes) {
  return normalizeLedgerScenes(
    scenes.map((scene, index) => ({
      ...scene,
      id: `scene-${index + 1}`,
      status: explorationStatus(scene),
      support_need: supportNeed(scene),
      oa_candidate: /知识库|资料库|流程|审批|周报|OA|制度/.test(scene.scene)
        ? "候选待评估"
        : "先探索后判断",
    })),
  );
}
