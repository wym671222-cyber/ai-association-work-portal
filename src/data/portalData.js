import reviewData from "./review_data.json";
import resourceManifest from "./resource_manifest.json";

export const portalMeta = {
  company: reviewData.metadata.company,
  period: "2026年6月至12月",
  phase: "竹网行动启动期",
  reviewDate: "2026-06-04",
  surveyDate: reviewData.metadata.survey_date,
};

export const targets = [
  {
    value: "3",
    suffix: "条线",
    label: "组织线",
    note: "协会、薪火、平台协同",
    tone: "blue",
  },
  {
    value: "3",
    suffix: "万元/年",
    label: "工具支持",
    note: "商用AI工具与付费额度",
    tone: "teal",
  },
  {
    value: reviewData.metadata.formal_unit_count,
    suffix: "个",
    label: "正式业务单位",
    note: "全部进入探索网络",
    tone: "blue",
  },
  {
    value: "1",
    suffix: "个",
    label: "OA模块出口",
    note: "成熟场景系统固化",
    tone: "green",
  },
];

export const annualMainline = [
  {
    id: "seed",
    name: "破土",
    period: "会后2周",
    purpose: "兴趣启动",
    description:
      "AI兴趣协会发布招募公告，首批成员入群，开通付费AI工具；各单位确认AI对接人和2-3个探索方向。",
    deliverables: ["招募公告", "首批成员", "单位探索方向"],
    status: "当前重点",
  },
  {
    id: "grow",
    name: "拔节",
    period: "会后1个月",
    purpose: "以点带面",
    description:
      "召开首次线下交流会，形成“使用换分享”记录；各单位提交一页纸AI探索计划。",
    deliverables: ["交流会记录", "薪火需求池", "一页纸计划"],
    status: "计划",
  },
  {
    id: "forest",
    name: "成林",
    period: "会后2个月",
    purpose: "经验共创",
    description:
      "从活跃成员中识别潜在分享人，推荐至薪火计划；召开AI应用交流会，校准各单位探索方向。",
    deliverables: ["分享人名单", "AI应用交流会", "方向调整记录"],
    status: "计划",
  },
  {
    id: "root",
    name: "扎根",
    period: "持续推进",
    purpose: "系统嵌入",
    description:
      "标杆案例涌现后推动跨单位经验复制，成熟场景纳入OA模块规划。",
    deliverables: ["标杆案例", "复制记录", "OA模块候选"],
    status: "计划",
  },
  {
    id: "year-end",
    name: "年度沉淀",
    period: "年底",
    purpose: "复盘表彰",
    description:
      "形成年度优秀会员、优秀分享人、年度知识库、各单位AI应用总结和下年度规划。",
    deliverables: ["年度知识库", "表彰清单", "下年度规划"],
    status: "计划",
  },
];

export const timelineColumns = ["会后2周", "会后1个月", "会后2个月", "持续推进", "年底"];

export const timelineRows = [
  { label: "破土", start: 1, span: 1, text: "兴趣启动" },
  { label: "拔节", start: 2, span: 1, text: "一页纸计划" },
  { label: "成林", start: 3, span: 1, text: "应用交流会" },
  { label: "扎根", start: 4, span: 1, text: "标杆复制/OA" },
  { label: "年度沉淀", start: 5, span: 1, text: "知识库/表彰" },
];

export const initiativeLines = [
  {
    name: "AI兴趣协会",
    role: "播种机",
    mechanism: "3万元/年工具支持，使用换分享",
    action: "面向全员招募，组织AI应用推动工作会议，汇报推进情况。",
  },
  {
    name: "薪火计划",
    role: "催化剂",
    mechanism: "每月2-3场内部分享，线下实操，录屏归档",
    action: "员工提需求，协会认领，分享人钻研，形成薪火需求池和知识库。",
  },
  {
    name: "平台协同",
    role: "孵化场",
    mechanism: "公司领导、各单位、人力资源中心共同支撑",
    action: "推动成熟场景跨单位复制，并纳入OA模块规划。",
  },
];

export const executionRhythm = [
  {
    time: "会后2周",
    line: "AI兴趣协会",
    action: "发布招募公告，首批成员入群，开通付费AI工具。",
    output: "成员清单、工具额度记录",
  },
  {
    time: "会后2周",
    line: "薪火计划",
    action: "启动首批工具破冰分享，覆盖安全边界和基础实操。",
    output: "首期分享记录",
  },
  {
    time: "会后2周",
    line: "各单位",
    action: "确认AI对接人，选定2-3个探索方向，一句话描述即可。",
    output: "单位方向清单",
  },
  {
    time: "会后1个月",
    line: "AI兴趣协会",
    action: "召开首次线下交流会，形成“使用换分享”记录。",
    output: "交流会纪要",
  },
  {
    time: "会后1个月",
    line: "各单位",
    action: "提交一页纸AI探索计划，说明探索内容、预期收获和所需支持。",
    output: "一页纸计划",
  },
  {
    time: "会后2个月",
    line: "平台协同",
    action: "召开AI应用交流会，汇报初步探索情况，允许说明路线不通和调整方向。",
    output: "交流会材料、方向调整记录",
  },
  {
    time: "年底",
    line: "三线合并",
    action: "表彰优秀会员和分享人，发布年度知识库，沉淀标杆案例和OA模块候选。",
    output: "知识库、标杆清单、OA候选池",
  },
];

export const evidenceFacts = [
  {
    value: `${reviewData.metadata.sample_n}份`,
    label: "有效答卷",
    note: "作为场景支撑证据",
    tone: "blue",
  },
  {
    value: `${reviewData.metadata.formal_unit_count}个`,
    label: "正式业务单位",
    note: "全部进入探索网络",
    tone: "teal",
  },
  {
    value: `${reviewData.overall.learning_focus[0].percent}%`,
    label: "AI办公技巧需求",
    note: "薪火计划首期重点",
    tone: "amber",
  },
  {
    value: `${reviewData.overall.high_freq_pct}%`,
    label: "高频使用占比",
    note: "已有个人探索基础",
    tone: "green",
  },
];

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

export const projectScenes = reviewData.scenes.map((scene, index) => ({
  ...scene,
  id: `scene-${index + 1}`,
  status: explorationStatus(scene),
  support_need: supportNeed(scene),
  oa_candidate: /知识库|资料库|流程|审批|周报|OA|制度/.test(scene.scene)
    ? "候选待评估"
    : "先探索后判断",
}));

export const priorityPilots = reviewData.priority_pilots.map((item) => ({
  ...item,
  project: item.project,
  status: "标杆候选待交流验证",
}));

export const riskCounts = projectScenes.reduce(
  (counts, project) => {
    counts[project.risk] = (counts[project.risk] || 0) + 1;
    return counts;
  },
  { 低: 0, 中: 0, 高: 0, 待定: 0 },
);

export const trainingLayers = [
  {
    name: "破冰层",
    audience: "全体员工",
    goal: "理解AI可用边界、禁用数据和基础工具用法",
    output: "完成低敏实操样例",
  },
  {
    name: "薪火层",
    audience: "工具额度申领成员、活跃会员",
    goal: "按“使用换分享”沉淀工具经验、实操案例和踩坑记录",
    output: "分享记录、录屏资料",
  },
  {
    name: "单位层",
    audience: "各单位AI对接人和业务骨干",
    goal: "把2-3个方向转化为一页纸AI探索计划",
    output: "一页纸计划、交流会材料",
  },
  {
    name: "标杆层",
    audience: "成熟探索方向和分享人",
    goal: "推动经验跨单位复制，筛选OA模块候选",
    output: "年度知识库、标杆案例",
  },
];

export const trainingSchedule = [
  {
    time: "会后2周",
    theme: "工具破冰与安全边界",
    practice: "可用与禁用数据、提示词基础、输出复核、低敏样例",
    output: "首期分享记录",
  },
  {
    time: "会后1个月",
    theme: "公文、会议纪要与Excel实操",
    practice: "纪要整理、表格分析、材料初稿、常见错误校验",
    output: "薪火需求池、录屏资料",
  },
  {
    time: "会后2个月",
    theme: "场景渗透主题",
    practice: "围绕公文、Excel、会议纪要、知识检索、周报材料做专题轮动",
    output: "交流会支撑材料",
  },
  {
    time: "持续推进",
    theme: "内部分享与标杆复盘",
    practice: "员工提需求、协会认领、分享人钻研、线下分享、录屏归档",
    output: "年度知识库和可复制案例",
  },
];

export const learningNeeds = reviewData.overall.learning_focus.slice(0, 6);

export const resourceCategories = [
  "全部",
  "领导方案",
  "治理制度",
  "竹网行动",
  "薪火计划",
  "单位探索/OA候选",
  "调研分析",
];

export const resources = resourceManifest;

export function resourceHref(path) {
  const workspaceRoot = "/Users/Ross/Desktop/AI协会";
  const fullPath = encodeURI(`${workspaceRoot}/${path}`);
  return import.meta.env.DEV ? `/@fs/${fullPath}` : `./resources/${encodeURI(path)}`;
}

export const roles = [
  {
    role: "公司领导",
    responsibility: "明确AI应用后续方向，支持平台协同和成熟场景固化",
    output: "方向要求、协调意见",
  },
  {
    role: "人力资源中心",
    responsibility: "组织AI兴趣协会、薪火计划、资料归档和OA模块协同建设",
    output: "会议记录、需求池、知识库",
  },
  {
    role: "AI兴趣协会",
    responsibility: "面向全员播种兴趣，管理工具支持，组织使用换分享和推进汇报",
    output: "成员清单、工具记录、分享记录",
  },
  {
    role: "薪火计划",
    responsibility: "把员工需求转化为内部实操分享，降低各单位启动门槛",
    output: "录屏资料、主题课件、年度知识库",
  },
  {
    role: "各单位AI对接人",
    responsibility: "确认2-3个探索方向，提交一页纸计划，参加AI应用交流会",
    output: "探索方向、一页纸计划、交流会材料",
  },
  {
    role: "平台协同支撑",
    responsibility: "识别可复制标杆，推动成熟场景进入OA模块候选",
    output: "标杆清单、OA候选池",
  },
];

export const safetyRedlines = [
  {
    title: "数据与保密",
    requirement:
      "不得上传涉密、敏感、个人信息或未经授权的业务数据；优先使用公开资料、脱敏样例和低敏材料。",
  },
  {
    title: "专业判断",
    requirement:
      "AI输出不得直接替代投资、设计、工程、成本、财务、法务、人力等专业判断和审批责任。",
  },
  {
    title: "准确性与追溯",
    requirement:
      "重要结论必须人工复核，分享和探索过程应保留需求来源、工具、边界、提示和修改记录。",
  },
  {
    title: "工具与账号",
    requirement:
      "3万元/年工具支持和付费额度按规定使用，申领成员应落实“使用换分享”。",
  },
  {
    title: "平台固化",
    requirement:
      "成熟场景进入OA模块规划前，应确认权限、数据来源、人工复核点和运维责任。",
  },
];

export const riskLevels = [
  {
    level: "低",
    examples: "公开信息摘要、低敏文稿初稿、会议纪要、培训材料",
    controls: "人工定稿或抽检，保留来源，适合作为薪火计划首批主题",
  },
  {
    level: "中",
    examples: "内部知识库、流程提醒、业务报告、项目资料整理",
    controls: "权限控制、人工复核、使用记录，完成边界确认后探索",
  },
  {
    level: "高",
    examples: "投资、设计、工程、成本、财务、法务、人力专业场景",
    controls: "受控环境、专业复核、必要审批，不得替代专业结论",
  },
];

export const projectGates = [
  "明确单位AI对接人和2-3个探索方向，先一句话说明业务问题",
  "会后1个月提交一页纸AI探索计划，说明预期收获和所需支持",
  "完成数据范围、工具使用、权限和人工复核点确认",
  "会后2个月参加AI应用交流会，汇报有效经验、问题或方向调整",
  "成熟经验先跨单位复制验证，再纳入OA模块候选",
];
