export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  roots: ['src', 'test'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json', // ts-jest config goes here
      },
    ],
  },
  moduleNameMapper: {
    '^@app/(.*)$': ['<rootDir>/src/application/$1'],
    '^@common/(.*)$': ['<rootDir>/src/common/$1'],
    '^@posts/(.*)$': ['<rootDir>/src/posts/$1'],
    '^@tests/(.*)$': ['<rootDir>/test/$1']
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '\\.spec\\.ts$', // Exclude test files (e.g., *.spec.ts)
    '\\.scenario-spec\\.ts$', // Exclude test files (e.g., *.test.ts)
    '\\.module\\.ts$', // Exclude test files (e.g., *.test.ts)
    'fixture', // Exclude files with "fixture" in the name
    'enum', // Exclude files with "fixture" in the name
  ],
  displayName: 'ptx-ts-fixtures',
}
