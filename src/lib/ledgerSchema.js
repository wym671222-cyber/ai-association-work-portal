export const LEDGER_STORAGE_KEY = "ai-association-ledger-scenes:v1";
export const LEDGER_PASSWORD_KEY = "ai-association-ledger-password";

export const RISK_OPTIONS = ["低", "中", "高", "待定"];
export const PRIORITY_OPTIONS = ["高", "中"];

export const LEDGER_FIELDS = [
  { key: "unit", label: "单位", type: "text" },
  { key: "center", label: "中心", type: "text" },
  { key: "survey_dept", label: "调研部门", type: "text" },
  { key: "sample_n", label: "样本数", type: "number" },
  { key: "scene", label: "探索方向", type: "textarea", wide: true },
  { key: "pain_point", label: "业务痛点", type: "textarea", wide: true },
  { key: "ai_method", label: "AI辅助方式", type: "textarea", wide: true },
  { key: "output", label: "输出成果", type: "textarea" },
  { key: "risk", label: "风险等级", type: "select", options: RISK_OPTIONS },
  { key: "human_review", label: "人工复核", type: "text" },
  { key: "priority", label: "优先级", type: "select", options: PRIORITY_OPTIONS },
  { key: "owner", label: "负责人", type: "text" },
  { key: "metric", label: "验证指标", type: "textarea" },
  { key: "status", label: "状态", type: "text" },
  { key: "evidence_type", label: "证据类型", type: "text" },
  { key: "mention_count", label: "提及次数", type: "number" },
  { key: "evidence_quote", label: "证据摘录", type: "textarea", wide: true },
  { key: "support_need", label: "需要支持", type: "text" },
  { key: "oa_candidate", label: "OA模块状态", type: "text" },
];

export const EXPORT_COLUMNS = [
  { key: "id", label: "系统编号" },
  ...LEDGER_FIELDS.map(({ key, label }) => ({ key, label })),
];

export function normalizeLedgerScene(scene, fallbackId = "scene-1") {
  const normalized = { ...scene, id: String(scene?.id || fallbackId) };

  for (const field of LEDGER_FIELDS) {
    if (field.type === "number") {
      const parsed = Number(normalized[field.key]);
      normalized[field.key] = Number.isFinite(parsed) ? parsed : 0;
    } else {
      normalized[field.key] = String(normalized[field.key] ?? "");
    }
  }

  if (!RISK_OPTIONS.includes(normalized.risk)) normalized.risk = "待定";
  if (!PRIORITY_OPTIONS.includes(normalized.priority)) normalized.priority = "中";

  return normalized;
}

export function normalizeLedgerScenes(scenes) {
  if (!Array.isArray(scenes)) return [];
  return scenes.map((scene, index) => normalizeLedgerScene(scene, `scene-${index + 1}`));
}

export function calculateRiskCounts(scenes) {
  return normalizeLedgerScenes(scenes).reduce(
    (counts, project) => {
      counts[project.risk] = (counts[project.risk] || 0) + 1;
      return counts;
    },
    { 低: 0, 中: 0, 高: 0, 待定: 0 },
  );
}

export function scenesToExportRows(scenes) {
  return normalizeLedgerScenes(scenes).map((scene) =>
    EXPORT_COLUMNS.reduce((row, column) => {
      row[column.label] = scene[column.key] ?? "";
      return row;
    }, {}),
  );
}
