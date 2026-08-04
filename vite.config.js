import { defineConfig } from "vite";
import { createApi } from "./src/server/api.js";
import { JsonRepository } from "./src/server/repository.js";

const localApi = () => createApi(new JsonRepository(".data/folio-local.json"));

export default defineConfig({
  plugins: [{
    name: "folio-local-api",
    configureServer(server) { server.middlewares.use(localApi()); },
    configurePreviewServer(server) { server.middlewares.use(localApi()); }
  }]
});
