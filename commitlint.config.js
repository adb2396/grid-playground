export default {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			[
				'feat', // New feature
				'fix', // Bug fix
				'docs', // Documentation
				'style', // Formatting
				'refactor', // Code change that neither fixes a bug nor adds a feature
				'test', // Adding tests
				'chore', // Maintenance
				'perf', // Performance improvement
				'config', // Configuration
			],
		],
	},
}

/**
 * Sample commit message:
 * feat: add new feature
 * fix: fixed a layout issue
 * docs: add documentation
 */
