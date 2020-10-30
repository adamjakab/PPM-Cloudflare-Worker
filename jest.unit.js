module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  automock: false,
  verbose: true,
  setupFiles: [
    "./test/setupJest.ts"
  ],
  testMatch: ['**/test/unit/**/*.test.ts']
};
