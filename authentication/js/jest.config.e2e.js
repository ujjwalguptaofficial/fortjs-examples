const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
    transform: {
        '^.+\\.js?$': 'babel-jest'
    },
    testEnvironment: 'node',
    testRegex: '.*\\.(test)?\\.(ts|tsx|js)$',
    moduleFileExtensions: ['ts', 'js'],
    "testPathIgnorePatterns": [
        "<rootDir>/(build|bin|dist|node_modules)/"
    ],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    globalSetup: "<rootDir>/tests/e2e.setup.js",
    globalTeardown: "<rootDir>/tests/e2e.teardown.js"
};