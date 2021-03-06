module.exports = {
    transform: {
        '^.+\\.js?$': 'babel-jest'
    },
    testEnvironment: 'node',
    testRegex: '.*\\.(test|spec)?\\.(ts|tsx|js)$',
    moduleFileExtensions: ['ts', 'js'],
    "testPathIgnorePatterns": [
        "<rootDir>/(build|bin|dist|node_modules)/"
    ]
};