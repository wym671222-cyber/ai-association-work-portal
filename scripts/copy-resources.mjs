import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workspaceDir = path.resolve(projectDir, "..");
const manifestPath = path.join(projectDir, "src/data/resource_manifest.json");
const resources = JSON.parse(await fs.readFile(manifestPath, "utf8"));

await Promise.all(
  resources.map(async (resource) => {
    const source = path.join(workspaceDir, resource.path);
    const destination = path.join(projectDir, "dist/resources", resource.path);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.copyFile(source, destination);
  }),
);

console.log(`Copied ${resources.length} portal resources.`);
