import reviewData from "./review_data.json";
import resourceManifest from "./resource_manifest.json";

export const portalMeta = {
  company: reviewData.metadata.company,
  period: "2026年6月至12月",
  phase: "启动期",
  reviewDate: reviewData.metadata.review_date,
  surveyDate: reviewData.metadata.survey_date,
};

export const targets = [
  {
    value: reviewData.metadata.formal_unit_count,
    suffix: "个",
    label: "正式业务单位",
    note: "全部单位完成场景确认",
    tone: "blue",
  },
  {
    value: "8至12",
    suffix: "个",
    label: "重点试点",
    note: "建立前后对比证据",
    tone: "teal",
  },
  {
    value: "6至8",
    suffix: "个",
    label: "决赛项目",
    note: "形成年度成果出口",
    tone: "blue",
  },
  {
    value: "不少于3",
    suffix: "个",
    label: "可复制成果",
    note: "形成模板、边界和说明",
    tone: "green",
  },
];

export const annualMainline = [
  {
    id: "diagnosis",
    name: "调研诊断",
    period: "6月",
    purpose: "识别需求",
    description: "发布调研结论，完善章程，完成单位场景确认。",
    deliverables: ["调研结论", "章程", "场景清单"],
    status: "当前重点",
  },
  {
    id: "training",
    name: "分层培训",
    period: "6月至11月",
    purpose: "形成能力",
    description: "面向全员、业务骨干和项目团队开展分层实训。",
    deliverables: ["培训资料", "实操作业", "候选项目卡"],
    status: "计划",
  },
  {
    id: "mapping",
    name: "场景摸排",
    period: "6月至8月",
    purpose: "建立项目池",
    description: "以单位为主体确认痛点、风险、指标和责任人。",
    deliverables: ["项目池", "场景评估表", "项目卡"],
    status: "计划",
  },
  {
    id: "pilot",
    name: "项目试点",
    period: "9月至10月",
    purpose: "验证实效",
    description: "推进自动化、知识管理和流程协作重点试点。",
    deliverables: ["试点记录", "前后对比", "风险复盘"],
    status: "计划",
  },
  {
    id: "contest",
    name: "AI大赛",
    period: "11月至12月",
    purpose: "成果出口",
    description: "完成项目辅导、初评、决赛和成果展示。",
    deliverables: ["决赛项目", "展示材料", "评审记录"],
    status: "计划",
  },
  {
    id: "scale",
    name: "成果转化",
    period: "12月",
    purpose: "复制推广",
    description: "将成熟项目沉淀为可复用模板、案例和推广清单。",
    deliverables: ["案例库", "模板库", "推广建议"],
    status: "计划",
  },
];

export const timelineRows = [
  { label: "调研诊断", start: 1, span: 1, text: "6月" },
  { label: "分层培训", start: 1, span: 6, text: "6月至11月" },
  { label: "场景摸排", start: 1, span: 3, text: "6月至8月" },
  { label: "项目试点", start: 4, span: 2, text: "9月至10月" },
  { label: "AI大赛", start: 6, span: 2, text: "11月至12月" },
  { label: "成果转化", start: 7, span: 1, text: "12月" },
];

export const evidenceFacts = [
  {
    value: `${reviewData.metadata.sample_n}份`,
    label: "有效答卷",
    note: "2026年5月29日调研",
    tone: "blue",
  },
  {
    value: `${reviewData.overall.learning_focus[0].percent}%`,
    label: "AI办公技巧需求",
    note: "培训需求首位",
    tone: "teal",
  },
  {
    value: `${reviewData.overall.current_usage.at(-1).percent}%`,
    label: "流程协作应用",
    note: "仍是当前短板",
    tone: "amber",
  },
  {
    value: `${reviewData.overall.high_freq_pct}%`,
    label: "高频使用占比",
    note: "已有应用基础",
    tone: "green",
  },
];

export const projectScenes = reviewData.scenes.map((scene, index) => ({
  ...scene,
  id: `scene-${index + 1}`,
}));

export const priorityPilots = reviewData.priority_pilots;

export const riskCounts = projectScenes.reduce(
  (counts, project) => {
    counts[project.risk] = (counts[project.risk] || 0) + 1;
    return counts;
  },
  { 低: 0, 中: 0, 高: 0, 待定: 0 },
);

export const trainingLayers = [
  {
    name: "基础层",
    audience: "全体员工",
    goal: "理解AI能力边界、安全要求和基础办公用法",
    output: "完成低敏场景实操",
  },
  {
    name: "实训层",
    audience: "各单位业务骨干、场景负责人",
    goal: "将业务痛点转化为可验证场景",
    output: "形成候选项目卡",
  },
  {
    name: "进阶层",
    audience: "重点试点和大赛项目团队",
    goal: "掌握自动化、知识库、智能体和效果验证方法",
    output: "形成试点成果与展示材料",
  },
  {
    name: "分享层",
    audience: "内部导师、成熟项目成员",
    goal: "沉淀可复制方法并支持推广",
    output: "形成案例、模板和内部分享",
  },
];

export const trainingSchedule = [
  {
    time: "6月",
    theme: "AI认知破冰与安全合规",
    practice: "识别可用与禁用数据、判断输出可靠性",
    output: "安全边界、低敏场景清单",
  },
  {
    time: "7月上旬",
    theme: "AI办公技巧：文案、表格与PPT",
    practice: "使用脱敏材料生成初稿、摘要、表格分析和演示结构",
    output: "个人减负成果",
  },
  {
    time: "7月下旬",
    theme: "工作场景挖掘与项目定义",
    practice: "拆解痛点、输入、步骤、输出、风险和指标",
    output: "单位候选项目卡",
  },
  {
    time: "8月",
    theme: "知识管理、检索与高质量提示词",
    practice: "建立资料索引、问答提示和来源追溯",
    output: "知识库或检索原型",
  },
  {
    time: "9月",
    theme: "工作流、Skill与Agent进阶",
    practice: "判断何时使用固定流程、技能模板或动态智能体",
    output: "自动化试点原型",
  },
  {
    time: "10月",
    theme: "输出甄别、效果验证与复盘",
    practice: "记录前后变化、设计人工复核点、形成证据",
    output: "试点验证记录",
  },
  {
    time: "11月",
    theme: "AI大赛项目辅导",
    practice: "优化业务叙事、演示成果、评分材料和风险说明",
    output: "决赛展示材料",
  },
];

export const learningNeeds = reviewData.overall.learning_focus.slice(0, 6);

export const resourceCategories = [
  "全部",
  "治理制度",
  "年度计划",
  "推广培训",
  "调研分析",
  "场景与试点",
];

export const resources = resourceManifest;

export function resourceHref(path) {
  const workspaceRoot = "/Users/Ross/Desktop/AI协会";
  const fullPath = encodeURI(`${workspaceRoot}/${path}`);
  return import.meta.env.DEV ? `/@fs/${fullPath}` : `./resources/${encodeURI(path)}`;
}

export const roles = [
  {
    role: "指导与评审机制",
    responsibility: "审议年度方向、重大活动、风险边界和成果转化建议",
    output: "年度重点、评审意见",
  },
  {
    role: "协会理事会",
    responsibility: "统筹计划、资源协调、活动组织、成果复盘和对外汇报",
    output: "年度计划、成果清单",
  },
  {
    role: "秘书组",
    responsibility: "维护项目台账、培训安排、资料归档、会议纪要和进度跟踪",
    output: "项目台账、活动记录",
  },
  {
    role: "专业小组与导师",
    responsibility: "围绕业务专业线提供场景辅导、质量复核和经验分享",
    output: "专业建议、复核记录",
  },
  {
    role: "单位场景负责人",
    responsibility: "组织本单位场景确认、项目申报、试点验证和成效证明",
    output: "场景确认表、试点证据",
  },
  {
    role: "项目团队",
    responsibility: "完成方案设计、原型试用、数据记录、大赛展示和复盘",
    output: "项目成果、复盘报告",
  },
];

export const safetyRedlines = [
  {
    title: "数据与保密",
    requirement:
      "不得上传涉密、敏感、个人信息或未经授权的业务数据；确需使用时应采用受控环境并履行审批。",
  },
  {
    title: "专业判断",
    requirement:
      "AI输出不得直接替代投资、设计、工程、成本、财务、法务、人力等专业判断和审批责任。",
  },
  {
    title: "准确性与追溯",
    requirement:
      "重要结论必须人工复核，保留数据来源、关键提示和修改记录。",
  },
  {
    title: "知识产权与合规",
    requirement:
      "使用生成内容时应关注著作权、商标、肖像、宣传合规和第三方权益。",
  },
  {
    title: "工具与账号",
    requirement:
      "公司账号、付费资源和自动化权限应按规定使用，不得私自共享或扩大权限。",
  },
];

export const riskLevels = [
  {
    level: "低",
    examples: "公开信息摘要、低敏文稿初稿、培训材料",
    controls: "人工定稿或抽检，保留来源",
  },
  {
    level: "中",
    examples: "内部知识库、流程提醒、业务报告、项目资料整理",
    controls: "权限控制、人工复核、使用记录",
  },
  {
    level: "高",
    examples: "投资、设计、工程、成本、财务、法务、人力专业场景",
    controls: "受控环境、专业复核、必要审批、不得直接执行",
  },
];

export const projectGates = [
  "明确单位负责人和项目团队，能够持续参与试点和复盘",
  "明确当前流程、主要痛点、预期输出和可测量指标",
  "完成数据范围、工具使用、权限和人工复核点确认",
  "能够使用脱敏样例或受控环境进行初步验证",
  "接受风险不可控即暂停、证据不足不进入决赛的管理要求",
];
