# Test Suite Documentation

This test suite provides comprehensive coverage for the `@tc96/biome-config` package, focusing on the changes made in the version upgrade from 2.0.0 to 2.1.0 and the Biome upgrade from 2.0.6 to 2.3.4.

## Test Files

### 1. biome.config.test.js
Tests the `biome.json` configuration file.

**Coverage:**
- ✅ JSON validity
- ✅ Schema URL correctness (2.3.4)
- ✅ VCS configuration (enabled, clientKind, useIgnoreFile)
- ✅ Formatter configuration (enabled, settings)
- ✅ Formatter properties (indentStyle, indentWidth, lineWidth, lineEnding, etc.)
- ✅ Linter configuration (enabled, rules)
- ✅ Recommended rules enablement
- ✅ Nursery rules (useSortedClasses)
- ✅ Style rules (10 specific rules validated)
- ✅ JavaScript-specific formatter settings (7 properties)
- ✅ Top-level property validation
- ✅ Formatting consistency with own rules
- ✅ Valid rule level values
- ✅ Schema version consistency with package.json

**Edge Cases:**
- ✅ File reading error handling
- ✅ Required fields validation
- ✅ Valid indentWidth range (1-8)
- ✅ Valid lineWidth range (1-320)
- ✅ Valid indentStyle values (tab/space)
- ✅ Valid lineEnding values (lf/crlf/cr)

**Test Count:** 21 tests

### 2. package.test.js
Tests the `package.json` configuration file.

**Coverage:**
- ✅ JSON validity
- ✅ Package name (@tc96/biome-config)
- ✅ Version (2.1.0)
- ✅ Semantic versioning format
- ✅ Module type (ESM)
- ✅ PublishConfig (public access)
- ✅ Exports field (./biome.json)
- ✅ Required scripts (lint, lint:staged, lint:ci, prepare)
- ✅ Script correctness
- ✅ DevDependencies (@biomejs/biome 2.3.4, commitlint, husky)
- ✅ PeerDependencies (@biomejs/biome 2.3.4)
- ✅ Version matching between dev and peer dependencies
- ✅ Dependency version format validation

**Edge Cases:**
- ✅ No runtime dependencies (config package pattern)
- ✅ Required publishing fields
- ✅ Caret versioning for commitlint
- ✅ Exact versioning for Biome
- ✅ JSON formatting (tab indentation)
- ✅ Scoped package name validation
- ✅ Version >= 2.0.0 validation

**Consistency Checks:**
- ✅ Biome version matching schema version in biome.json

**Test Count:** 28 tests

### 3. commitlint.config.test.js
Tests the `commitlint.config.js` configuration file.

**Coverage:**
- ✅ File readability
- ✅ ES module export syntax
- ✅ Extends @commitlint/config-conventional
- ✅ Extends as array structure
- ✅ Single-line export simplicity
- ✅ Syntax validation (balanced braces/brackets)
- ✅ ES module compatibility

**Edge Cases:**
- ✅ No comments present
- ✅ Single quotes consistency (per Biome config)
- ✅ Proper formatting per Biome rules (semicolons as needed)

**Test Count:** 10 tests

### 4. integration.test.js
Integration tests across all configuration files.

**Coverage:**
- ✅ All required files present
- ✅ Version consistency across files
- ✅ Formatting compatibility between JSON files
- ✅ JSON parsing for all config files
- ✅ pnpm-lock.yaml presence and validity
- ✅ Exports field correctness
- ✅ Husky hooks directory
- ✅ Lockfile dependency references

**Version Upgrade Validation:**
- ✅ Package version bump (2.0.0 → 2.1.0)
- ✅ Biome upgrade (2.0.6 → 2.3.4)
- ✅ No old version references

**Package Exports:**
- ✅ Usable as extends target
- ✅ Valid package name format

**Test Count:** 13 tests

## Running Tests

### Run all tests
```bash
npm test
```

### Run with verbose output
```bash
npm run test:verbose
```

### Run specific test file
```bash
node --test tests/biome.config.test.js
node --test tests/package.test.js
node --test tests/commitlint.config.test.js
node --test tests/integration.test.js
```

## Test Statistics

- **Total Tests:** 72
- **Total Suites:** 10
- **Pass Rate:** 100%
- **Coverage Areas:**
  - Configuration validation
  - Version consistency
  - Schema correctness
  - Formatting rules
  - Edge cases
  - Integration scenarios

## Test Strategy

The test suite follows these principles:

1. **Validation-First:** All configuration files are validated for basic correctness before detailed testing
2. **Version-Aware:** Tests specifically validate the upgrade from 2.0.6 to 2.3.4
3. **Schema Compliance:** Tests ensure all configurations match their respective schemas
4. **Consistency:** Tests verify consistency across related configurations
5. **Edge Cases:** Tests cover boundary conditions and error scenarios
6. **Integration:** Tests validate how configurations work together

## Dependencies

The test suite uses **Node.js built-in test runner** (available in Node.js 18+), requiring:
- No external testing dependencies
- Pure Node.js native modules
- Zero additional package overhead

This aligns with the project's philosophy of minimal dependencies for configuration packages.

## Future Enhancements

Potential areas for test expansion:
- Runtime validation with actual Biome CLI execution (currently not done due to sandbox limitations)
- Schema validation against official Biome JSON schemas
- Performance tests for large file formatting
- Compatibility tests with different Biome versions