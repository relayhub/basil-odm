module.exports = {
  "transform": {
    "^.+\\.tsx?$": "esbuild-jest"
  },
  testRegex: "src/(.*)\\.(test|spec)\\.(tsx?)$",
  "globalSetup": "<rootDir>/test/globalSetup.ts",
  "globalTeardown": "<rootDir>/test/globalTeardown.ts",
};
