import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(projectDir, "dist");
const destination = path.join(projectDir, "docs");

await fs.rm(destination, { recursive: true, force: true });
await fs.cp(source, destination, { recursive: true });
await fs.writeFile(path.join(destination, ".nojekyll"), "");

console.log(`Prepared GitHub Pages directory at ${destination}`);
