import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    const proxyTarget =
        env.API_PROXY_TARGET ?? "http://localhost:3333";

    return {
        plugins: [react()],
        server: {
            proxy: {
                "/feedbacks": {
                    target: proxyTarget,
                    changeOrigin: true,
                },
            },
        },
    };
});
