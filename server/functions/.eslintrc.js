module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": [1, "single", {"avoidEscape": true}],
    'max-len': ["error", {"code": 120}],
    "arrow-parens": ["error", "as-needed"],
    "comma-spacing": ["error", {"before": false, "after": true}],
    "object-curly-spacing": ["error", "never"],
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
};
