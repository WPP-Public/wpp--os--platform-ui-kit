const preset = require('@stencil/core/testing/jest-preset')

module.exports = {
  ...preset,
  testRunner: 'jasmine2',
  moduleNameMapper: {
    ...preset.moduleNameMapper,
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^types/(.*)$': '<rootDir>/src/types/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^common/(.*)$': '<rootDir>/src/common/$1',
    '^shared/(.*)$': '<rootDir>/src/shared/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx,ts,tsx}',
    'src/utils/**/*.{js,jsx,ts,tsx}',
    '!src/components/**/*.stories.{ts,tsx}',
    '!src/components/wpp-icon/**',
  ],
  setupFilesAfterEnv: [...preset.setupFilesAfterEnv, '<rootDir>/.jest/setupMocks.js'],
  coverageReporters: ['text-summary', 'lcov', 'html'],
}
