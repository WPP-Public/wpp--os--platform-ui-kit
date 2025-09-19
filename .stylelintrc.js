module.exports = {
  customSyntax: 'postcss-scss',
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'no-empty-source': null,
    'function-name-case': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'keyframes-name-pattern': null,
    'no-descending-specificity': null,
    'selector-class-pattern': null,
  },
}
