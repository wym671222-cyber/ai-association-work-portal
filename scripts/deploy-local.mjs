import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(projectDir, "dist");
const destination = path.join(os.homedir(), "Sites/ai-association-portal");

await fs.rm(destination, { recursive: true, force: true });
await fs.mkdir(path.dirname(destination), { recursive: true });
await fs.cp(source, destination, { recursive: true });

console.log(`Deployed portal to ${destination}`);
