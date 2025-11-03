import { defineConfig, mergeConfig } from 'vite'
import { defineConfig as defineVitestConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default mergeConfig(
	defineConfig({
		plugins: [react()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
	}),
	defineVitestConfig({
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: './src/test/setup.ts',
			css: true,
		},
	})
)
