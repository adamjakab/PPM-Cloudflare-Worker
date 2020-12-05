module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  automock: false,
  verbose: true,
  setupFiles: [
    './test/jest.setup.ts'
  ],
  testMatch: ['**/test/**/*.test.ts'],
  runner: 'groups'
}
