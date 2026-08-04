import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { createApi } from "./api.js";
import { JsonRepository } from "./repository.js";

const root = fileURLToPath(new URL("../../dist/", import.meta.url));
const dataFile = process.env.FOLIO_DATA_FILE || fileURLToPath(new URL("../../.data/folio.json", import.meta.url));
const api = createApi(new JsonRepository(dataFile));
const port = Number(process.env.PORT) || 8080;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

async function serveStatic(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { allow: "GET, HEAD" });
    return res.end();
  }

  const pathname = decodeURIComponent(new URL(req.url, "http://local").pathname);
  const relative = normalize(pathname).replace(/^[/\\]+/, "");
  let file = join(root, relative || "index.html");

  if (!file.startsWith(root)) {
    res.writeHead(400);
    return res.end("Invalid path");
  }

  try {
    if (!(await stat(file)).isFile()) file = join(root, "index.html");
  } catch {
    file = join(root, "index.html");
  }

  const headers = {
    "content-type": contentTypes[extname(file)] || "application/octet-stream",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "referrer-policy": "strict-origin-when-cross-origin"
  };
  res.writeHead(200, headers);
  if (req.method === "HEAD") return res.end();
  createReadStream(file).pipe(res);
}

createServer((req, res) => api(req, res, () => {
  serveStatic(req, res).catch(() => {
    if (!res.headersSent) res.writeHead(500);
    res.end("The application could not serve this request.");
  });
})).listen(port, "0.0.0.0", () => {
  console.log(JSON.stringify({ event: "server_started", port }));
});
