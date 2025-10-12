module.exports = {
  env: {
    node: true,
    mocha: true,
  },
  globals: {
    browser: true,
    $: true,
    $$: true,
    expect: true,
    assert: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "script",
  },
  rules: {
    "no-unused-vars": "warn",
    "no-undef": "error",
  },
};
