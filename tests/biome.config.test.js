import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

describe('biome.json configuration', () => {
	let biomeConfig

	it('should be valid JSON', () => {
		const content = readFileSync('biome.json', 'utf8')
		assert.doesNotThrow(() => {
			biomeConfig = JSON.parse(content)
		}, 'biome.json should be valid JSON')
	})

	it('should have the correct schema URL for version 2.3.4', () => {
		biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		assert.equal(
			biomeConfig.$schema,
			'https://biomejs.dev/schemas/2.3.4/schema.json',
			'Schema should point to Biome 2.3.4',
		)
	})

	it('should have VCS configuration', () => {
		biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		assert.ok(biomeConfig.vcs, 'VCS configuration should exist')
		assert.equal(biomeConfig.vcs.enabled, false, 'VCS should be disabled')
		assert.equal(
			biomeConfig.vcs.clientKind,
			'git',
			'VCS client should be git',
		)
		assert.equal(
			biomeConfig.vcs.useIgnoreFile,
			false,
			'VCS should not use ignore file',
		)
	})

	it('should have formatter configuration enabled', () => {
		biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		assert.ok(biomeConfig.formatter, 'Formatter configuration should exist')
		assert.equal(
			biomeConfig.formatter.enabled,
			true,
			'Formatter should be enabled',
		)
	})

	it('should have correct formatter settings', () => {
		biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		const { formatter } = biomeConfig

		assert.equal(
			formatter.formatWithErrors,
			false,
			'Should not format with errors',
		)
		assert.equal(
			formatter.attributePosition,
			'auto',
			'Attribute position should be auto',
		)
		assert.equal(formatter.indentStyle, 'tab', 'Indent style should be tab')
		assert.equal(formatter.indentWidth, 2, 'Indent width should be 2')
		assert.equal(formatter.lineWidth, 80, 'Line width should be 80')
		assert.equal(formatter.lineEnding, 'lf', 'Line ending should be lf')
	})

	it('should have linter configuration enabled', () => {
		biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		assert.ok(biomeConfig.linter, 'Linter configuration should exist')
		assert.equal(biomeConfig.linter.enabled, true, 'Linter should be enabled')
	})

	it('should have recommended rules enabled', () => {
		biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		assert.ok(biomeConfig.linter.rules, 'Linter rules should exist')
		assert.equal(
			biomeConfig.linter.rules.recommended,
			true,
			'Recommended rules should be enabled',
		)
	})

	it('should have nursery rules configured', () => {
		biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		const { nursery } = biomeConfig.linter.rules

		assert.ok(nursery, 'Nursery rules should exist')
		assert.ok(
			nursery.useSortedClasses,
			'useSortedClasses rule should be configured',
		)
		assert.equal(
			nursery.useSortedClasses.level,
			'error',
			'useSortedClasses should be set to error level',
		)
		assert.equal(
			nursery.useSortedClasses.fix,
			'safe',
			'useSortedClasses should have safe fix',
		)
	})

	it('should have style rules configured correctly', () => {
		biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		const { style } = biomeConfig.linter.rules

		assert.ok(style, 'Style rules should exist')

		// Test each style rule
		const expectedStyleRules = [
			'noParameterAssign',
			'useAsConstAssertion',
			'useDefaultParameterLast',
			'useEnumInitializers',
			'useSelfClosingElements',
			'useSingleVarDeclarator',
			'noUnusedTemplateLiteral',
			'useNumberNamespace',
			'noInferrableTypes',
			'noUselessElse',
		]

		for (const rule of expectedStyleRules) {
			assert.equal(
				style[rule],
				'error',
				`${rule} should be set to error level`,
			)
		}
	})

	it('should have JavaScript-specific formatter configuration', () => {
		biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		assert.ok(biomeConfig.javascript, 'JavaScript configuration should exist')
		assert.ok(
			biomeConfig.javascript.formatter,
			'JavaScript formatter should exist',
		)
	})

	it('should have correct JavaScript formatter settings', () => {
		biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		const jsFormatter = biomeConfig.javascript.formatter

		assert.equal(
			jsFormatter.arrowParentheses,
			'always',
			'Arrow parentheses should be always',
		)
		assert.equal(
			jsFormatter.bracketSameLine,
			false,
			'Bracket should not be on same line',
		)
		assert.equal(
			jsFormatter.bracketSpacing,
			true,
			'Bracket spacing should be enabled',
		)
		assert.equal(
			jsFormatter.quoteProperties,
			'asNeeded',
			'Quote properties should be as needed',
		)
		assert.equal(
			jsFormatter.semicolons,
			'asNeeded',
			'Semicolons should be as needed',
		)
		assert.equal(
			jsFormatter.trailingCommas,
			'all',
			'Trailing commas should be all',
		)
		assert.equal(
			jsFormatter.quoteStyle,
			'single',
			'Quote style should be single',
		)
	})

	it('should not have any unexpected top-level properties', () => {
		biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		const expectedProps = [
			'$schema',
			'vcs',
			'formatter',
			'linter',
			'javascript',
		]
		const actualProps = Object.keys(biomeConfig)

		for (const prop of actualProps) {
			assert.ok(
				expectedProps.includes(prop),
				`Unexpected property: ${prop}`,
			)
		}
	})

	it('should be properly formatted according to its own rules', () => {
		const content = readFileSync('biome.json', 'utf8')
		biomeConfig = JSON.parse(content)

		// Check that file uses tabs for indentation (based on config)
		const lines = content.split('\n')
		const indentedLines = lines.filter(
			(line) => line.length > 0 && line[0] === '\t',
		)
		assert.ok(
			indentedLines.length > 0,
			'File should use tab indentation as configured',
		)
	})

	it('should have valid rule level values', () => {
		biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		const validLevels = ['off', 'warn', 'error']

		const checkRuleLevel = (rules, path = '') => {
			for (const [key, value] of Object.entries(rules)) {
				if (typeof value === 'object' && value !== null) {
					if (value.level) {
						assert.ok(
							validLevels.includes(value.level),
							`Invalid rule level at ${path}${key}: ${value.level}`,
						)
					} else if (!['fix', 'options'].includes(key)) {
						checkRuleLevel(value, `${path}${key}.`)
					}
				} else if (typeof value === 'string') {
					assert.ok(
						validLevels.includes(value),
						`Invalid rule level at ${path}${key}: ${value}`,
					)
				}
			}
		}

		if (biomeConfig.linter?.rules) {
			checkRuleLevel(biomeConfig.linter.rules, 'linter.rules.')
		}
	})

	it('should have consistent schema version across configuration', () => {
		biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))

		// Extract version from schema URL
		const schemaVersion = biomeConfig.$schema.match(/\/(\d+\.\d+\.\d+)\//)?.[1]
		assert.ok(schemaVersion, 'Should extract version from schema URL')

		// Check it matches package.json biome version
		const biomeVersion = packageJson.devDependencies['@biomejs/biome']
		assert.equal(
			schemaVersion,
			biomeVersion,
			'Schema version should match Biome package version',
		)
	})
})

describe('biome.json edge cases and validation', () => {
	it('should handle reading errors gracefully', () => {
		assert.throws(
			() => {
				readFileSync('nonexistent-biome.json', 'utf8')
			},
			{
				code: 'ENOENT',
			},
			'Should throw ENOENT for missing file',
		)
	})

	it('should validate that all required fields are present', () => {
		const biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		const requiredFields = ['$schema', 'formatter', 'linter']

		for (const field of requiredFields) {
			assert.ok(
				biomeConfig[field] !== undefined,
				`Required field ${field} should be present`,
			)
		}
	})

	it('should have valid formatter indentWidth range', () => {
		const biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		const indentWidth = biomeConfig.formatter.indentWidth

		assert.ok(
			typeof indentWidth === 'number',
			'indentWidth should be a number',
		)
		assert.ok(
			indentWidth > 0 && indentWidth <= 8,
			'indentWidth should be between 1 and 8',
		)
	})

	it('should have valid formatter lineWidth range', () => {
		const biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		const lineWidth = biomeConfig.formatter.lineWidth

		assert.ok(typeof lineWidth === 'number', 'lineWidth should be a number')
		assert.ok(
			lineWidth > 0 && lineWidth <= 320,
			'lineWidth should be between 1 and 320',
		)
	})

	it('should have valid indentStyle values', () => {
		const biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		const validStyles = ['tab', 'space']

		assert.ok(
			validStyles.includes(biomeConfig.formatter.indentStyle),
			'indentStyle should be either tab or space',
		)
	})

	it('should have valid lineEnding values', () => {
		const biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))
		const validEndings = ['lf', 'crlf', 'cr']

		assert.ok(
			validEndings.includes(biomeConfig.formatter.lineEnding),
			'lineEnding should be lf, crlf, or cr',
		)
	})
})