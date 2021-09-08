/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  coverageProvider: 'v8',

  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!micromark|unified|remark|rehype|unist|mdast-util|hast-util|property-information|html-void-elements|space-separated-tokens|comma-separated-tokens|stringify-entities|ccount|parse-entities|character-entities|zwitch|longest-streak|bail|is-plain-obj|trough|vfile)',
  ],
};
