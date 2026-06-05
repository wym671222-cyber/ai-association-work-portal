import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as XLSX from "xlsx";
import { buildDefaultProjectScenes } from "../src/lib/ledgerDefaults.js";
import {
  normalizeLedgerScene,
  normalizeLedgerScenes,
  scenesToExportRows,
} from "../src/lib/ledgerSchema.js";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const staticDir = path.resolve(process.env.PORTAL_STATIC_DIR || path.join(projectDir, "dist"));
const dataFile = path.resolve(
  process.env.LEDGER_DATA_FILE || path.join(projectDir, "server/data/ledger-scenes.json"),
);
const port = Number(process.env.PORT || 5188);

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".svg", "image/svg+xml"],
  [".pdf", "application/pdf"],
  [".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  [".pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
  [".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
]);

async function defaultScenes() {
  const reviewData = JSON.parse(
    await fs.readFile(path.join(projectDir, "src/data/review_data.json"), "utf8"),
  );
  return buildDefaultProjectScenes(reviewData.scenes);
}

async function readScenes() {
  try {
    return normalizeLedgerScenes(JSON.parse(await fs.readFile(dataFile, "utf8")));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    const scenes = await defaultScenes();
    await writeScenes(scenes);
    return scenes;
  }
}

async function writeScenes(scenes) {
  const normalized = normalizeLedgerScenes(scenes);
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  const tempFile = `${dataFile}.${process.pid}.tmp`;
  await fs.writeFile(tempFile, JSON.stringify(normalized, null, 2));
  await fs.rename(tempFile, dataFile);
  return normalized;
}

function sendJson(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

function sendError(response, status, error) {
  sendJson(response, status, { error });
}

function getPassword(request) {
  return String(request.headers["x-ledger-password"] || "");
}

function hasWriteAccess(request) {
  const expected = process.env.LEDGER_EDIT_PASSWORD;
  if (!expected) return false;
  return getPassword(request) === expected;
}

async function readRequestJson(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

async function handleApi(request, response, url) {
  if (request.method === "GET" && url.pathname === "/api/health") {
    sendJson(response, 200, {
      ok: true,
      mode: "server",
      data_file: dataFile,
    });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/ledger/scenes") {
    sendJson(response, 200, { scenes: await readScenes() });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/ledger/export.xlsx") {
    const worksheet = XLSX.utils.json_to_sheet(scenesToExportRows(await readScenes()));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "探索方向台账");
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    response.writeHead(200, {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="ledger-scenes.xlsx"`,
    });
    response.end(buffer);
    return;
  }

  if (!hasWriteAccess(request)) {
    sendError(response, process.env.LEDGER_EDIT_PASSWORD ? 401 : 500, "编辑口令无效或未配置");
    return;
  }

  if (request.method === "PUT" && url.pathname.startsWith("/api/ledger/scenes/")) {
    const id = decodeURIComponent(url.pathname.replace("/api/ledger/scenes/", ""));
    const body = await readRequestJson(request);
    const incoming = normalizeLedgerScene({ ...(body.scene || body), id }, id);
    const scenes = await readScenes();
    const index = scenes.findIndex((scene) => scene.id === id);
    if (index < 0) {
      sendError(response, 404, "未找到该方向");
      return;
    }

    const nextScenes = scenes.slice();
    nextScenes[index] = incoming;
    await writeScenes(nextScenes);
    sendJson(response, 200, { scene: incoming });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/ledger/scenes/import") {
    const body = await readRequestJson(request);
    const scenes = normalizeLedgerScenes(body.scenes || body);
    if (!scenes.length) {
      sendError(response, 400, "导入数据为空");
      return;
    }
    sendJson(response, 200, { scenes: await writeScenes(scenes) });
    return;
  }

  sendError(response, 404, "接口不存在");
}

async function sendStatic(request, response, url) {
  const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const requestedPath = path.resolve(staticDir, `.${pathname}`);
  const relativePath = path.relative(staticDir, requestedPath);
  const safePath =
    relativePath && !relativePath.startsWith("..") && !path.isAbsolute(relativePath)
      ? requestedPath
      : path.join(staticDir, "index.html");

  try {
    const stat = await fs.stat(safePath);
    const filePath = stat.isDirectory() ? path.join(safePath, "index.html") : safePath;
    const ext = path.extname(filePath);
    response.writeHead(200, {
      "Content-Type": mimeTypes.get(ext) || "application/octet-stream",
    });
    response.end(await fs.readFile(filePath));
  } catch {
    const indexPath = path.join(staticDir, "index.html");
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(await fs.readFile(indexPath));
  }
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
    if (url.pathname.startsWith("/api/")) {
      await handleApi(request, response, url);
      return;
    }
    await sendStatic(request, response, url);
  } catch (error) {
    sendError(response, 500, error.message || "服务器错误");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`AI association portal server running at http://127.0.0.1:${port}`);
  console.log(`Ledger data file: ${dataFile}`);
});
