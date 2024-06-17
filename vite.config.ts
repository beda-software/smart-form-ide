import { createRequire } from 'module'
import * as path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const require = createRequire(import.meta.url)

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    server: {
        port: 3001,
    },
    plugins: [
        react(),
    ],
    resolve: {
        alias: [
            { find: 'web', replacement: path.resolve(__dirname, './contrib/sdc-ide/web/') },
            { find: 'src', replacement: path.resolve(__dirname, './contrib/sdc-ide/web/src/') },
        ],
    },
    define: {
        'process.env': {},
    },
    build: {
        outDir: path.resolve(__dirname, 'build'),
        commonjsOptions: {
            defaultIsModuleExports(id) {
                try {
                    const module = require(id)
                    if (module?.default) {
                        return false
                    }
                    return 'auto'
                } catch (error) {
                    return 'auto'
                }
            },
            transformMixedEsModules: true,
        },
    },
}))
