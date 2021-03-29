module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
  },
  root: true,
  env: {
    node: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',

    'plugin:jest/recommended',
    'plugin:lodash/recommended',
    'eslint:recommended',

    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['vue', 'jest', 'lodash'],
  rules: {
    /*************************
     * Typescript *
     *************************/
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/class-name-casing': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',

    /*************************
     * Modified ESLint rules *
     *************************/
    camelcase: 'off',
    'one-var': ['error', 'never'],
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'no-empty-function': 'off',
    'no-tabs': 'error',
    'no-debugger': 'warn',

    'no-use-before-define': [
      'off',
      {
        functions: true,
        classes: true,
        variables: false,
      },
    ],
    'lines-between-class-members': ['off'],
    'prefer-destructuring': ['error', {object: false, array: false}],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    'object-curly-spacing': ['error', 'never'],

    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          consistent: true,
        },
        ObjectPattern: {
          multiline: true,
          consistent: true,
        },
        ImportDeclaration: {
          multiline: true,
          consistent: true,
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
      },
    ],

    indent: [
      'off',
      2,
      {
        VariableDeclarator: 'off',
        MemberExpression: 1,
        ArrayExpression: 2,
        ObjectExpression: 'off',
        CallExpression: {arguments: 2},
        FunctionDeclaration: {parameters: 2},
        FunctionExpression: {parameters: 2},
      },
    ],
    'no-trailing-spaces': ['error', {skipBlankLines: true}],
    'max-len': ['warn', {code: 140}],
    'eol-last': ['warn', 'always'],
    semi: [2, 'never'],
    'no-param-reassign': 'off',
    'import/no-unresolved': ['off'],
    'implicit-arrow-linebreak': 'off',

    // Argument for this best presented here: https://youtu.be/eEBOvqMfPoI?t=1665
    'no-else-return': ['off'],
    'spaced-comment': 'off',
    'line-comment-position': ['warn', {position: 'above'}],

    /**********
     * Import *
     **********/
    'import/named': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'import/no-cycle': 'off',
    'import/no-unused-modules': 'off',
    'import/no-deprecated': 'off',

    'import/no-absolute-path': 'off',

    /**********
     * Lodash *
     **********/
    'lodash/import-scope': ['error', 'member'],
    'lodash/matches-prop-shorthand': 'off',

    // Disable all lodash prefer checks for things that already exist natively
    'lodash/prefer-lodash-method': ['off'],
    'lodash/prefer-lodash-typecheck': 'off',
    'lodash/prefer-noop': 'off',
    'lodash/prefer-constant': 'off',
    'lodash/preferred-alias': 'off',
    'lodash/prefer-includes': 'off',
    'lodash/prefer-get': 'off',
    'lodash/prefer-is-nil': 'off',
    'lodash/prefer-lodash-chain': 'off',
    'lodash/prefer-matches': 'off',
    'lodash/prefer-over-quantifier': 'off',
    'lodash/prefer-some': 'off',
    'lodash/prefer-startswith': 'off',
    'lodash/prefer-times': 'off',

    // this is as warning, as it breaks type inference
    'lodash/prop-shorthand': ['warn', 'never'],

    /**************
     * Jest Rules *
     **************/
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',


  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
