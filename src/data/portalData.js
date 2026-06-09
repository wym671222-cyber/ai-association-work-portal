import reviewData from "./review_data.json";
import resourceManifest from "./resource_manifest.json";
import { buildDefaultProjectScenes } from "../lib/ledgerDefaults.js";
import { calculateRiskCounts } from "../lib/ledgerSchema.js";

export const portalMeta = {
  company: reviewData.metadata.company,
  period: "2026年6月至12月",
  phase: "章程试行期",
  reviewDate: "2026-06-09",
  surveyDate: reviewData.metadata.survey_date,
  documentTitle: "AI兴趣协会章程及运行规则（试行）",
  versionStatus: "完成稿（0609）",
};

export const targets = [
  {
    value: "3",
    suffix: "个一",
    label: "行动承接",
    note: "掌握工具/新增场景/核心场景",
    tone: "blue",
  },
  {
    value: "9",
    suffix: "章30条",
    label: "制度框架",
    note: "总则至试行与修订",
    tone: "teal",
  },
  {
    value: "2+6",
    suffix: "类",
    label: "活动机制",
    note: "双周分享、单周交流和专题活动",
    tone: "blue",
  },
  {
    value: "3",
    suffix: "类",
    label: "资源方向",
    note: "氛围打造、工具体验、应用孵化",
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
    time: "会员加入",
    line: "第十一条",
    action: "协会面向全体员工开放，不限制岗位、不限制技术基础，员工可自愿加入。",
    output: "会员清单、活动通知",
  },
  {
    time: "活动运行",
    line: "第七至九条",
    action: "双周分享会每月2-3场，单周交流原则上每周一次；分享会采用15+30+15结构。",
    output: "分享提纲、答疑记录、需求收集",
  },
  {
    time: "资源支持",
    line: "第十四至十六条",
    action: "工具额度、会员订阅、API额度、教练辅导等资源按需求、参与、成果和风险评审分配。",
    output: "资源申请、使用台账、成果反馈",
  },
  {
    time: "经费使用",
    line: "第十七至十九条",
    action: "经费用于氛围打造、工具体验和业务应用孵化，坚持先决策、重成果、按需开通、台账管理。",
    output: "费用台账、成果材料、复盘意见",
  },
  {
    time: "需求孵化",
    line: "第二十至二十一条",
    action: "按照需求提出、场景说明、资源申请、协会研讨、试点推进、成果验收管理。",
    output: "一页纸探索计划、应用原型、成果卡",
  },
  {
    time: "展示发布",
    line: "第二十二至二十五条",
    action: "成果发布前审核涉密、敏感、个人信息、适用范围、使用边界和重大错误风险。",
    output: "试用链接、操作说明、反馈记录",
  },
  {
    time: "成果沉淀",
    line: "第二十七至二十九条",
    action: "沉淀工具、模板、案例、培训和平台成果，年底形成优秀会员、优秀分享人、知识库和标杆案例。",
    output: "年度知识库、标杆案例清单",
  },
];

export const governanceHighlights = [
  {
    title: "协会定位",
    content:
      "公司内部员工自愿参与的学习交流型、应用孵化型、成果推广型组织，围绕普及AI知识、培养AI能力、孵化AI应用、沉淀AI成果、赋能公司业务开展工作。",
  },
  {
    title: "基本原则",
    content:
      "坚持兴趣驱动、以点带面、渐进深入、务实分享、安全可控、人工负责；优先支持有明确业务需求、实际应用场景和成果输出可能的事项。",
  },
  {
    title: "成果导向",
    content:
      "协会不以单纯学习培训为目的，而是以解决实际工作问题、提升工作效率、沉淀可复用成果为导向。",
  },
];

export const activityMechanisms = [
  {
    type: "双周分享会",
    rule: "原则上每月组织2-3场，面向公司员工开放。",
    output: "使用经验、实际案例、踩坑教训、提效成果",
  },
  {
    type: "单周交流会",
    rule: "原则上每周组织一次交流，主题、内容和形式不限。",
    output: "问题答疑、近期案例、资源需求、活动建议",
  },
  {
    type: "专题活动",
    rule: "可组织专题培训、教练辅导、应用路演、AI大赛、知识快讯和群内分享。",
    output: "课程资料、辅导记录、成果展示、知识快讯",
  },
];

export const resourceSupportTiers = [
  {
    audience: "兴趣入门会员",
    support: "免费工具推荐、基础教程、公开分享、知识库资料、群内答疑、活动通知、应用试用。",
    requirement: "参加活动、反馈学习问题，鼓励形成基础使用心得。",
  },
  {
    audience: "场景分享会员",
    support: "必要的API额度、专题培训、外部教练辅导、模板共创。",
    requirement: "每月至少形成一次经验反馈、案例分享、踩坑记录或模板沉淀。",
  },
  {
    audience: "应用孵化会员",
    support: "优先获得工具订阅、API额度、外部教练辅导、应用开发协助、展示发布和评优推荐。",
    requirement: "提交一页纸探索计划，形成应用原型、操作说明、成果卡、分享材料或提效案例。",
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

export const projectScenes = buildDefaultProjectScenes(reviewData.scenes);

export const priorityPilots = reviewData.priority_pilots.map((item) => ({
  ...item,
  project: item.project,
  status: "标杆候选待交流验证",
}));

export const riskCounts = calculateRiskCounts(projectScenes);

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
    role: "会长",
    responsibility:
      "统筹协会整体运行，组织会员活动，协调资源支持，推动成果展示和应用落地，负责费用申请、台账记录和费用报销等专项工作。",
    output: "协会运行统筹、核心应用推动",
  },
  {
    role: "副会长",
    responsibility:
      "由各单位AI对接人担任，协调本单位AI学习、活动组织、会员动员、需求收集、业务痛点查找和应用探索。",
    output: "2-3个探索方向、一页纸计划、阶段反馈",
  },
  {
    role: "会员",
    responsibility:
      "参加协会培训、分享、交流和应用试用，结合岗位提出AI需求、反馈问题、总结经验，主动探索AI融入业务场景。",
    output: "使用经验、需求反馈、可复用材料",
  },
  {
    role: "技术指导",
    responsibility:
      "由人力资源中心IT相关同事担任，负责工具安装配置、账号及权限协同、应用部署、环境支持、数据安全提示和技术可行性评估。",
    output: "技术支持、部署协同、安全提示",
  },
  {
    role: "教练顾问",
    responsibility:
      "由外部资深程序员、AI工具专家、AI博主等组成，为会员提供培训、答疑、开发指导、工具选型和应用优化支持。",
    output: "培训辅导、项目孵化、工具选型",
  },
];

export const safetyRedlines = [
  {
    title: "数据边界",
    requirement:
      "不得上传涉密、敏感、个人信息或未经授权的数据；涉及合同、议案、财务、人事、项目、法律等敏感材料时，优先采用本地工具、本地模型或脱敏处理方式。",
  },
  {
    title: "人工责任",
    requirement:
      "AI用于辅助消化信息、生成初稿、整理格式和提醒事项，专业判断、审批和最终输出仍由人员负责。",
  },
  {
    title: "记录留痕",
    requirement:
      "分享、试用和交流会材料应留存主题、需求来源、使用工具、边界说明和可复用模板；涉及费用支持的，同步留存申请、审批、使用和成果材料。",
  },
  {
    title: "平台固化",
    requirement:
      "成熟场景进入OA模块规划前，应确认使用频率、权限边界、数据来源、人工复核点和运维责任。",
  },
  {
    title: "应用边界",
    requirement:
      "协会孵化的AI应用仅作辅助，不替代公司正式审批、专业判断和责任签署；法律、财务、投资、采购、工程、安全、人事等事项由相应专业部门复核。",
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
  "需求收集：由会员或部门提出具体应用需求，优先聚焦小而实用的事项",
  "场景拆解：明确使用对象、输入材料、输出成果、操作流程、权限边界和风险边界",
  "方案设计：确定采用提示词模板、工作流、插件工具、本地小应用、API调用或智能体",
  "原型开发与内部测试：优先形成最小可用版本，由需求提出人、协会会员和相关部门试用",
  "展示发布与复盘沉淀：经审核后发布试用链接、操作说明，并形成案例材料和后续迭代计划",
];
