import reactRefresh from '@vitejs/plugin-react-refresh';
import dotenv from 'dotenv';
import * as path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, PluginOption } from 'vite';
import checker from 'vite-plugin-checker';
dotenv.config();
// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    optimizeDeps: {
      esbuildOptions: {
        keepNames: true,
      },
    },
    plugins: [
      reactRefresh(),
      checker({
        typescript: true,
      }),
      visualizer({
        filename: './stats.html',
        title: 'Bundle Visualizer',
        sourcemap: true,
      }) as PluginOption,
    ],
    clearScreen: false,
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },

    define: {
      'process.env.NODE_ENV': `"${mode}"`,
    },

    server: {
      fs: {
        strict: false,
      },
      port: 3000,
    },

    preview: {
      port: 3000,
    },
  });
};
