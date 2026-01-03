import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: '/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                'habits-media': resolve(__dirname, 'projects/habits-media/index.html'),
                'annual-meeting': resolve(__dirname, 'presentations/annual-meeting-2026/index.html'),
                'pinara-digital': resolve(__dirname, 'proposals/pinara-digital/index.html'),
                'shifr-asia': resolve(__dirname, 'proposals/shifr-asia/index.html'),
                'trust': resolve(__dirname, 'proposals/trust/index.html'),
                'sims': resolve(__dirname, 'proposals/sims/index.html'),
                'ai-customer-services': resolve(__dirname, 'proposals/ai-customer-services/index.html')
            }
        }
    },
    server: {
        open: true
    }
})
