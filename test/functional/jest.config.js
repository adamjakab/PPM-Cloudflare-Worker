module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  automock: false,
  verbose: true,
  setupFiles: [
    './jest.setup.ts'
  ],
  testMatch: ['**/*.test.ts']
}
