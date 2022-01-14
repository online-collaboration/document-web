import { defineConfig } from 'vite'
import { join } from 'path'

export default defineConfig({
    base: './',
    resolve: {
        alias: [
            {
                find: /^@\//,
                replacement: join(__dirname, 'src/'),
            },
        ],
    },
})
