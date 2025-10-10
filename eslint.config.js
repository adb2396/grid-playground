import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
	// Ignore patterns
	{
		ignores: ['**/dist/**', '**/node_modules/**', '**/public/**'],
	},

	// Base JavaScript config
	js.configs.recommended,

	// TypeScript configs
	...tseslint.configs.recommended,
	...tseslint.configs.stylistic,

	// React config
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		...react.configs.flat.recommended,
		...react.configs.flat['jsx-runtime'],
		languageOptions: {
			ecmaVersion: 2024,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.es2024,
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},

	// React Hooks
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		plugins: {
			'react-hooks': reactHooks,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
		},
	},

	// React Refresh (for Vite HMR)
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		plugins: {
			'react-refresh': reactRefresh,
		},
		rules: {
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		},
	},

	// Prettier integration
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		plugins: {
			prettier: prettier,
		},
		rules: {
			...prettierConfig.rules,
			'prettier/prettier': 'error',
		},
	},

	// Custom rules for your project
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		rules: {
			// TypeScript specific
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

			// React specific
			'react/prop-types': 'off', // TypeScript handles this
			'react/jsx-uses-react': 'off', // Not needed with new JSX transform
			'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform

			// General rules
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'prefer-const': 'error',
			'no-unused-expressions': 'error',
			'no-duplicate-imports': 'error',
		},
	},
])
