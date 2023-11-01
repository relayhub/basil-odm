module.exports = {
  "transform": {
    "^.+\\.tsx?$": "esbuild-jest"
  },
  testRegex: "(src|e2e)/(.*)\\.(test|spec)\\.(tsx?)$",
  "globalSetup": "<rootDir>/test/globalSetup.ts",
  "globalTeardown": "<rootDir>/test/globalTeardown.ts",
};
