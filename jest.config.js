module.exports = {
  preset: 'ts-jest',
  testRegex: "(src|e2e)/(.*)\\.(test|spec)\\.(tsx?)$",
  "globalSetup": "<rootDir>/test/globalSetup.ts",
  "globalTeardown": "<rootDir>/test/globalTeardown.ts",
  "testPathIgnorePatterns": [
    "/node_modules/",
    "/dist/",
  ],
};
