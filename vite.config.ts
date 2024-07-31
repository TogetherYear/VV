import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig(({ command, mode }) => {
    return {
        plugins: [
            vue({
                script: {
                    defineModel: true
                }
            }),
            AutoImport({
                resolvers: [ElementPlusResolver()]
            }),
            Components({
                resolvers: [ElementPlusResolver()]
            }),
            ElementPlus({})
        ],
        resolve: {
            alias: {
                '@': path.resolve('Src')
            }
        },
        esbuild: {
            drop: command === 'serve' ? [] : ['console', 'debugger']
        },
        build: {
            outDir: path.join(__dirname, 'Dist'),
            emptyOutDir: true,
            minify: 'esbuild',
            assetsDir: 'Source',
            sourcemap: false,
            target: 'esnext',
            rollupOptions: {
                output: {
                    manualChunks: (id: string) => {
                        if (id.includes('node_modules')) {
                            return 'Vendor';
                        }
                    }
                }
            }
        },
        root: path.join(__dirname, ''),
        publicDir: 'Public',
        optimizeDeps: {
            include: ['axios']
        },
        base: './',
        envDir: './Env',
        server: {
            host: '0.0.0.0',
            port: 6768,
            open: true,
            strictPort: true
            // proxy: {
            //   '^/Application': {
            //     target: 'http://192.168.0.76:6789',
            //     changeOrigin: true,
            //     rewrite: (t) => t.replace(/^\/Application/, '')
            //   }
            // }
        }
    };
});
