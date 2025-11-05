import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

describe('package.json configuration', () => {
	let packageJson

	it('should be valid JSON', () => {
		const content = readFileSync('package.json', 'utf8')
		assert.doesNotThrow(() => {
			packageJson = JSON.parse(content)
		}, 'package.json should be valid JSON')
	})

	it('should have correct package name', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.equal(
			packageJson.name,
			'@tc96/biome-config',
			'Package name should be @tc96/biome-config',
		)
	})

	it('should have version 2.1.0', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.equal(
			packageJson.version,
			'2.1.0',
			'Package version should be 2.1.0',
		)
	})

	it('should have valid semantic version format', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		const semverRegex = /^\d+\.\d+\.\d+$/
		assert.ok(
			semverRegex.test(packageJson.version),
			'Version should follow semantic versioning (x.y.z)',
		)
	})

	it('should have type set to module', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.equal(
			packageJson.type,
			'module',
			'Package type should be module for ESM',
		)
	})

	it('should have publishConfig with public access', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.ok(
			packageJson.publishConfig,
			'publishConfig should be defined',
		)
		assert.equal(
			packageJson.publishConfig.access,
			'public',
			'Package should be publicly accessible',
		)
	})

	it('should export biome.json configuration', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.ok(packageJson.exports, 'exports field should be defined')
		assert.equal(
			packageJson.exports['.'],
			'./biome.json',
			'Should export biome.json as main entry',
		)
	})

	it('should have required scripts', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.ok(packageJson.scripts, 'scripts should be defined')

		const requiredScripts = ['lint', 'lint:staged', 'lint:ci', 'prepare']
		for (const script of requiredScripts) {
			assert.ok(
				packageJson.scripts[script],
				`Script ${script} should be defined`,
			)
		}
	})

	it('should have correct lint script', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.equal(
			packageJson.scripts.lint,
			'biome check . --fix',
			'lint script should run biome check with fix',
		)
	})

	it('should have correct lint:staged script', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.equal(
			packageJson.scripts['lint:staged'],
			'biome check . --staged --fix',
			'lint:staged script should run biome check on staged files',
		)
	})

	it('should have correct lint:ci script', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.equal(
			packageJson.scripts['lint:ci'],
			'biome ci',
			'lint:ci script should run biome ci',
		)
	})

	it('should have prepare script for husky', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.equal(
			packageJson.scripts.prepare,
			'husky',
			'prepare script should initialize husky',
		)
	})

	it('should have @biomejs/biome in devDependencies', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.ok(
			packageJson.devDependencies,
			'devDependencies should be defined',
		)
		assert.ok(
			packageJson.devDependencies['@biomejs/biome'],
			'@biomejs/biome should be in devDependencies',
		)
	})

	it('should have @biomejs/biome version 2.3.4', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.equal(
			packageJson.devDependencies['@biomejs/biome'],
			'2.3.4',
			'@biomejs/biome version should be 2.3.4',
		)
	})

	it('should have commitlint dependencies', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.ok(
			packageJson.devDependencies['@commitlint/cli'],
			'@commitlint/cli should be in devDependencies',
		)
		assert.ok(
			packageJson.devDependencies['@commitlint/config-conventional'],
			'@commitlint/config-conventional should be in devDependencies',
		)
	})

	it('should have husky in devDependencies', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.ok(
			packageJson.devDependencies.husky,
			'husky should be in devDependencies',
		)
	})

	it('should have peerDependencies defined', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.ok(
			packageJson.peerDependencies,
			'peerDependencies should be defined',
		)
	})

	it('should have @biomejs/biome in peerDependencies', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.equal(
			packageJson.peerDependencies['@biomejs/biome'],
			'2.3.4',
			'@biomejs/biome should be in peerDependencies with version 2.3.4',
		)
	})

	it('should have matching biome version in devDependencies and peerDependencies', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		const devVersion = packageJson.devDependencies['@biomejs/biome']
		const peerVersion = packageJson.peerDependencies['@biomejs/biome']

		assert.equal(
			devVersion,
			peerVersion,
			'Biome version should match in devDependencies and peerDependencies',
		)
	})

	it('should have valid dependency version formats', () => {
		packageJson = JSON.parse(readFileSync('package.json', 'utf8'))

		const checkVersions = (deps, depType) => {
			if (!deps) return
			for (const [name, version] of Object.entries(deps)) {
				assert.ok(
					typeof version === 'string' && version.length > 0,
					`${name} in ${depType} should have a valid version string`,
				)
			}
		}

		checkVersions(packageJson.devDependencies, 'devDependencies')
		checkVersions(packageJson.peerDependencies, 'peerDependencies')
		checkVersions(packageJson.dependencies, 'dependencies')
	})
})

describe('package.json edge cases and validation', () => {
	it('should not have dependencies field (config packages typically only need devDependencies)', () => {
		const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.equal(
			packageJson.dependencies,
			undefined,
			'Config package should not have runtime dependencies',
		)
	})

	it('should have appropriate fields for npm publishing', () => {
		const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		const publishFields = ['name', 'version', 'publishConfig']

		for (const field of publishFields) {
			assert.ok(
				packageJson[field] !== undefined,
				`${field} is required for publishing`,
			)
		}
	})

	it('should use caret or exact versions for commitlint', () => {
		const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		const commitlintCli = packageJson.devDependencies['@commitlint/cli']
		const commitlintConfig =
			packageJson.devDependencies['@commitlint/config-conventional']

		assert.ok(
			commitlintCli.startsWith('^'),
			'commitlint/cli should use caret versioning',
		)
		assert.ok(
			commitlintConfig.startsWith('^'),
			'commitlint/config-conventional should use caret versioning',
		)
	})

	it('should use exact version for @biomejs/biome to ensure compatibility', () => {
		const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		const biomeVersion = packageJson.devDependencies['@biomejs/biome']

		assert.ok(
			!biomeVersion.startsWith('^') && !biomeVersion.startsWith('~'),
			'@biomejs/biome should use exact version',
		)
	})

	it('should be properly formatted JSON', () => {
		const content = readFileSync('package.json', 'utf8')
		const parsed = JSON.parse(content)
		const reformatted = JSON.stringify(parsed, null, '\t')

		// Check if it uses tabs (based on biome config)
		assert.ok(
			content.includes('\t'),
			'package.json should use tab indentation',
		)
	})

	it('should have a scoped package name', () => {
		const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		assert.ok(
			packageJson.name.startsWith('@'),
			'Package should be scoped (start with @)',
		)
	})

	it('should have version greater than or equal to 2.0.0', () => {
		const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		const [major, minor] = packageJson.version.split('.').map(Number)

		assert.ok(
			major >= 2,
			'Major version should be 2 or greater (updated from 2.0.0)',
		)
		if (major === 2) {
			assert.ok(
				minor >= 1,
				'Minor version should be 1 or greater for v2.x',
			)
		}
	})
})

describe('package.json consistency with biome.json', () => {
	it('should have biome version matching schema version', () => {
		const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
		const biomeConfig = JSON.parse(readFileSync('biome.json', 'utf8'))

		const schemaVersion = biomeConfig.$schema.match(/\/(\d+\.\d+\.\d+)\//)?.[1]
		const packageVersion = packageJson.devDependencies['@biomejs/biome']

		assert.equal(
			schemaVersion,
			packageVersion,
			'Biome version in package.json should match schema version in biome.json',
		)
	})
})