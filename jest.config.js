module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: { '\\.ts$': ['ts-jest'] },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
}
