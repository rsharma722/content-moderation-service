import fs from "fs";
import path from "path";
import { generateSwaggerSpec } from "../config/swaggerOptions";

const fullSpec: any = generateSwaggerSpec();

const PUBLIC_TITLE = "Content Moderation API - Public Documentation";
const ALLOWED_PATHS = new Set<string>([
  "/moderation/post/{id}",
  "/moderation/user/{id}/profile",
]);

const publicSpec: any = {
  ...fullSpec,
  info: { ...(fullSpec.info || {}), title: PUBLIC_TITLE },
  servers: fullSpec.servers || [{ url: "http://localhost:3000/api/v1" }],
  components: fullSpec.components || {},
  security: fullSpec.security || [],
  paths: {},
};

if (fullSpec.paths) {
  for (const key of Object.keys(fullSpec.paths)) {
    if (ALLOWED_PATHS.has(key)) publicSpec.paths[key] = fullSpec.paths[key];
  }
}

const out = path.resolve(process.cwd(), "openapi.json");
fs.writeFileSync(out, JSON.stringify(publicSpec, null, 2));
console.log("[public-docs] wrote", out);
