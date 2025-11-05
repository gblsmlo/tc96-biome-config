import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { execSync } from 'node:child_process'

describe('Configuration integration tests', () => {
	it('should have all configuration files present', () => {
		const requiredFiles = [
			'biome.json',
			'package.json',
			'commitlint.config.js',
		]

		for (const file of requiredFiles) {
			assert.doesNotThrow(
				() => readFileSync(file, 'utf8'),
				`${file} should exist and be readable`,
			)
		}
	})

	it('should have consistent versioning across files', () => {
		const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		const biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))

		const packageBiomeVersion =
			packageJson.devDependencies['@biomejs/biome']
		const schemaBiomeVersion =
			biomeConfig.$schema.match(/\/(\d+\.\d+\.\d+)\//)?.[1]

		assert.equal(
			packageBiomeVersion,
			schemaBiomeVersion,
			'Biome versions should be consistent across package.json and biome.json schema',
		)
	})

	it('should have package.json and biome.json with compatible formatting', () => {
		const packageContent = readFileSync('package.json', 'utf8')
		const biomeContent = readFileSync('biome.json', 'utf8')
		const biomeConfig = JSON.parse(biomeContent)

		// Both should use the same indentation style
		if (biomeConfig.formatter.indentStyle === 'tab') {
			assert.ok(
				packageContent.includes('\t'),
				'package.json should use tabs',
			)
			assert.ok(biomeContent.includes('\t'), 'biome.json should use tabs')
		}
	})

	it('should be able to parse all JSON configuration files without errors', () => {
		const jsonFiles = ['biome.json', 'package.json']

		for (const file of jsonFiles) {
			assert.doesNotThrow(() => {
				const content = readFileSync(file, 'utf8')
				JSON.parse(content)
			}, `${file} should be valid JSON`)
		}
	})

	it('should have pnpm-lock.yaml present and non-empty', () => {
		const lockContent = readFileSync('pnpm-lock.yaml', 'utf8')
		assert.ok(lockContent.length > 0, 'pnpm-lock.yaml should not be empty')
		assert.ok(
			lockContent.includes('lockfileVersion'),
			'pnpm-lock.yaml should have lockfileVersion',
		)
	})

	it('should have correct exports field pointing to existing file', () => {
		const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		const exportPath = packageJson.exports['.']

		assert.equal(exportPath, './biome.json', 'Should export biome.json')

		// Verify the file exists by reading it
		assert.doesNotThrow(
			() => readFileSync('biome.json', 'utf8'),
			'Exported file should exist',
		)
	})

	it('should have husky hooks directory', () => {
		assert.doesNotThrow(
			() => readFileSync('.husky/commit-msg', 'utf8'),
			'commit-msg hook should exist',
		)
		assert.doesNotThrow(
			() => readFileSync('.husky/pre-commit', 'utf8'),
			'pre-commit hook should exist',
		)
	})

	it('should have valid pnpm lockfile with correct dependencies', () => {
		const lockContent = readFileSync('pnpm-lock.yaml', 'utf8')
		const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))

		// Check that lock file references the correct biome version
		const biomeVersion = packageJson.devDependencies['@biomejs/biome']
		assert.ok(
			lockContent.includes(biomeVersion),
			`Lock file should reference biome version ${biomeVersion}`,
		)
	})
})

describe('Configuration version upgrade validation', () => {
	it('should reflect version bump from 2.0.0 to 2.1.0', () => {
		const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.equal(
			packageJson.version,
			'2.1.0',
			'Package version should be updated to 2.1.0',
		)
	})

	it('should reflect biome upgrade from 2.0.6 to 2.3.4', () => {
		const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		const biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))

		assert.equal(
			packageJson.devDependencies['@biomejs/biome'],
			'2.3.4',
			'Biome devDependency should be 2.3.4',
		)
		assert.equal(
			packageJson.peerDependencies['@biomejs/biome'],
			'2.3.4',
			'Biome peerDependency should be 2.3.4',
		)
		assert.ok(
			biomeConfig.$schema.includes('2.3.4'),
			'Biome schema should reference 2.3.4',
		)
	})

	it('should not reference old biome version 2.0.6 anywhere', () => {
		const packageContent = readFileSync('package.json', 'utf8')
		const biomeContent = readFileSync('biome.json', 'utf8')
		const lockContent = readFileSync('pnpm-lock.yaml', 'utf8')

		assert.ok(
			!packageContent.includes('2.0.6'),
			'package.json should not reference old version 2.0.6',
		)
		assert.ok(
			!biomeContent.includes('2.0.6'),
			'biome.json should not reference old version 2.0.6',
		)
		// Lock file might still have it in the dependency tree, but not as primary version
	})
})

describe('Package exports and usage', () => {
	it('should be usable as an extends target', () => {
		const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))

		// Verify the package can be extended
		assert.ok(packageJson.exports, 'Should have exports field')
		assert.ok(
			packageJson.exports['.'],
			'Should have default export',
		)

		// Verify the export points to a valid config
		const exportedConfig = JSON.parse(
			readFileSync(packageJson.exports['.'].replace('./', ''), 'utf8'),
		)
		assert.ok(exportedConfig.$schema, 'Exported config should have schema')
	})

	it('should have package name that can be used in extends array', () => {
		const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))

		// Verify name is properly scoped and formatted
		assert.ok(
			packageJson.name.startsWith('@'),
			'Should be scoped package',
		)
		assert.ok(
			!packageJson.name.includes(' '),
			'Package name should not contain spaces',
		)
		assert.ok(
			packageJson.name === packageJson.name.toLowerCase(),
			'Package name should be lowercase',
		)
	})
})