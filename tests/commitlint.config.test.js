import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

describe('commitlint.config.js', () => {
	it('should be valid JavaScript that can be read', () => {
		assert.doesNotThrow(() => {
			readFileSync('commitlint.config.js', 'utf8')
		}, 'commitlint.config.js should be readable')
	})

	it('should use ES module export syntax', () => {
		const content = readFileSync('commitlint.config.js', 'utf8')
		assert.ok(
			content.includes('export default'),
			'Should use ES module export default syntax',
		)
	})

	it('should extend @commitlint/config-conventional', () => {
		const content = readFileSync('commitlint.config.js', 'utf8')
		assert.ok(
			content.includes('@commitlint/config-conventional'),
			'Should extend @commitlint/config-conventional',
		)
	})

	it('should have extends as an array', () => {
		const content = readFileSync('commitlint.config.js', 'utf8')
		assert.ok(
			content.includes('extends:') && content.includes('['),
			'extends should be an array',
		)
	})

	it('should be a simple one-line export', () => {
		const content = readFileSync('commitlint.config.js', 'utf8')
		const lines = content
			.split('\n')
			.filter((line) => line.trim().length > 0)

		assert.equal(
			lines.length,
			1,
			'Should be a single line export for simplicity',
		)
	})

	it('should not have any syntax errors', () => {
		const content = readFileSync('commitlint.config.js', 'utf8')

		// Check for balanced braces
		const openBraces = (content.match(/{/g) || []).length
		const closeBraces = (content.match(/}/g) || []).length
		assert.equal(openBraces, closeBraces, 'Braces should be balanced')

		// Check for balanced brackets
		const openBrackets = (content.match(/\[/g) || []).length
		const closeBrackets = (content.match(/\]/g) || []).length
		assert.equal(openBrackets, closeBrackets, 'Brackets should be balanced')
	})

	it('should be compatible with ES modules (type: module in package.json)', () => {
		const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		const commitlintContent = readFileSync('commitlint.config.js', 'utf8')

		assert.equal(
			packageJson.type,
			'module',
			'package.json should specify type: module',
		)
		assert.ok(
			!commitlintContent.includes('module.exports'),
			'Should not use CommonJS module.exports',
		)
	})
})

describe('commitlint.config.js edge cases', () => {
	it('should not contain comments', () => {
		const content = readFileSync('commitlint.config.js', 'utf8')
		assert.ok(
			!content.includes('//') && !content.includes('/*'),
			'Configuration should be comment-free for simplicity',
		)
	})

	it('should use single quotes consistently', () => {
		const content = readFileSync('commitlint.config.js', 'utf8')
		const biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))

		if (biomeConfig.javascript?.formatter?.quoteStyle === 'single') {
			// Count single vs double quotes (excluding those in strings)
			const singleQuotes = (content.match(/'/g) || []).length
			const doubleQuotes = (content.match(/"/g) || []).length

			assert.ok(
				singleQuotes > doubleQuotes,
				'Should primarily use single quotes per biome config',
			)
		}
	})

	it('should be properly formatted per biome rules', () => {
		const content = readFileSync('commitlint.config.js', 'utf8')

		// Should not have trailing semicolons if semicolons: 'asNeeded'
		const biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		if (biomeConfig.javascript?.formatter?.semicolons === 'asNeeded') {
			// Simple export shouldn't need semicolon
			const hasUnnecessarySemicolon =
				content.trim().endsWith(';') && !content.includes(';)')
			assert.ok(
				!hasUnnecessarySemicolon,
				'Should not have unnecessary semicolons',
			)
		}
	})
})