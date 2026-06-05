import {
  LEDGER_STORAGE_KEY,
  normalizeLedgerScene,
  normalizeLedgerScenes,
  scenesToExportRows,
} from "./ledgerSchema.js";

const API_TIMEOUT_MS = 1800;

function readLocalScenes(defaultScenes) {
  try {
    const raw = window.localStorage.getItem(LEDGER_STORAGE_KEY);
    if (!raw) return normalizeLedgerScenes(defaultScenes);
    const parsed = JSON.parse(raw);
    return normalizeLedgerScenes(parsed.scenes || parsed);
  } catch {
    return normalizeLedgerScenes(defaultScenes);
  }
}

export function persistLocalScenes(scenes) {
  window.localStorage.setItem(
    LEDGER_STORAGE_KEY,
    JSON.stringify({
      version: 1,
      updated_at: new Date().toISOString(),
      scenes: normalizeLedgerScenes(scenes),
    }),
  );
}

async function fetchJsonWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.includes("application/json")) {
      throw new Error("接口不可用");
    }
    return await response.json();
  } finally {
    window.clearTimeout(timeout);
  }
}

export async function loadLedgerScenes(defaultScenes) {
  try {
    const payload = await fetchJsonWithTimeout("/api/ledger/scenes");
    const scenes = normalizeLedgerScenes(payload.scenes || payload);
    if (scenes.length) {
      return {
        mode: "server",
        scenes,
        message: "共享保存模式",
      };
    }
  } catch {
    // GitHub Pages and Vite static preview do not provide the API.
  }

  return {
    mode: "local",
    scenes: readLocalScenes(defaultScenes),
    message: "本机保存模式",
  };
}

export async function saveServerScene(scene, password) {
  const normalized = normalizeLedgerScene(scene);
  const response = await fetch(`/api/ledger/scenes/${encodeURIComponent(normalized.id)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Ledger-Password": password || "",
    },
    body: JSON.stringify({ scene: normalized }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "保存失败");
  }
  return normalizeLedgerScene(payload.scene || normalized);
}

export async function importServerScenes(scenes, password) {
  const response = await fetch("/api/ledger/scenes/import", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Ledger-Password": password || "",
    },
    body: JSON.stringify({ scenes: normalizeLedgerScenes(scenes) }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "导入失败");
  }
  return normalizeLedgerScenes(payload.scenes);
}

function downloadBlob(blob, filename) {
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(href);
}

export function downloadLedgerJson(scenes) {
  const blob = new Blob(
    [
      JSON.stringify(
        {
          version: 1,
          exported_at: new Date().toISOString(),
          scenes: normalizeLedgerScenes(scenes),
        },
        null,
        2,
      ),
    ],
    { type: "application/json;charset=utf-8" },
  );
  downloadBlob(blob, `AI探索方向台账_${new Date().toISOString().slice(0, 10)}.json`);
}

export async function downloadLedgerExcel(scenes) {
  const XLSX = await import("xlsx");
  const worksheet = XLSX.utils.json_to_sheet(scenesToExportRows(scenes));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "探索方向台账");
  XLSX.writeFile(workbook, `AI探索方向台账_${new Date().toISOString().slice(0, 10)}.xlsx`);
}
