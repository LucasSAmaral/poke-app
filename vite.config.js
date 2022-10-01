import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: {
            "@front": path.relative(__dirname, "packages/poke-front"),
            "@bff": path.relative(__dirname, "packages/poke-bff")
        }
    }
})