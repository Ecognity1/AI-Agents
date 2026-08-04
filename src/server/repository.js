import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { books as seedBooks } from "../catalog.js";

export class JsonRepository {
  constructor(file) { this.file = file; this.queue = Promise.resolve(); }
  async read() {
    try { return JSON.parse(await readFile(this.file, "utf8")); }
    catch (error) { if (error.code !== "ENOENT") throw error; return { books: seedBooks.map((book) => ({ ...book, forSale: true, version: 1 })), orders: [], idempotency: {}, audit: [] }; }
  }
  async update(change) {
    const operation = this.queue.then(async () => {
      const data = await this.read(); const result = await change(data);
      await mkdir(dirname(this.file), { recursive: true });
      const temporary = `${this.file}.tmp`;
      await writeFile(temporary, JSON.stringify(data, null, 2)); await rename(temporary, this.file);
      return result;
    });
    this.queue = operation.catch(() => {}); return operation;
  }
}
