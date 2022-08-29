const merge = require('merge');
const mongo = require('@shelf/jest-mongodb/jest-preset');

module.exports = merge.recursive(mongo, {
  transform: {
    "^.+\\.tsx?$": "esbuild-jest"
  }
});
