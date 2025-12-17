import path from "path"
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import mdx from "@mdx-js/rollup"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [react(), mdx({ providerImportSource: "@mdx-js/react" })],
    base: env.VITE_PATH, // Use the VITE_PATH environment variable for the base path
    define: {
      "process.env": env,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        assets: path.resolve(__dirname, "./src/assets"),
        base: path.resolve(__dirname, "./src/base"),
        components: path.resolve(__dirname, "./src/components"),
        data: path.resolve(__dirname, "./src/data"),
        hooks: path.resolve(__dirname, "./src/hooks"),
        shaders: path.resolve(__dirname, "./src/shaders"),
        store: path.resolve(__dirname, "./src/store"),
        styles: path.resolve(__dirname, "./src/styles"),
        types: path.resolve(__dirname, "./src/types"),
        ui: path.resolve(__dirname, "./src/ui"),
        utils: path.resolve(__dirname, "./src/utils"),
      },
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true, // needed for the Docker Container port mapping to work
      strictPort: true,
      port: 5173, // you can replace this port with any port
    },
    assetsInclude: ["**/*.glb"], // <-- Add this line
  }
})
