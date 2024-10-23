module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    roots: ['<rootDir>/src', '<rootDir>/tests'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    testTimeout: 40000,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};