module.exports = {
  root: true,
  env: {
    node: true,
    'jest/globals': true,
  },

  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
  },

  extends: [
    // TODO: Once we upgrade to Vue3, we need to change this to 'plugin:vue/vue3-recommended'
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended',

    'plugin:jest/recommended',
    'plugin:lodash/recommended',
    'eslint:recommended',

    'plugin:import/errors',
    'plugin:import/warnings',
  ],

  plugins: [
    'vue',
    'jest',
    'lodash',
  ],
  overrides: [
    {
      files: [
        '*.vue',
        '*.js',
        '*.ts',
        '*.tsx',
      ],
      excludedFiles: '*.png',
      env: {
        jest: true,
      },
    },
  ],

  rules: {
    // To be removed when all components are class based components
    'vue/require-prop-types': 0,
    'vue/require-default-prop': 0,

    /********************
     * Typescript rules *
     ********************/
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/class-name-casing': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    // Need to remove this rule after all the ts-ignore comments are removed
    '@typescript-eslint/ban-ts-ignore': 'off',
    // Remove this after any is replaced in all the files
    '@typescript-eslint/no-explicit-any': 'off',

    /*************************
     * Modified ESLint rules *
     *************************/
    'one-var': ['error', 'never'],

    // These are off due to https://github.com/typescript-eslint/typescript-eslint/blob/f335c504bcf75623d2d671e2e784b047e5e186b9/docs/getting-started/linting/FAQ.md#eslint-plugin-import
    'import/named': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/export': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'import/no-cycle': 'off',
    'import/no-unused-modules': 'off',
    'import/no-deprecated': 'off',
    'import/no-absolute-path': 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'no-empty-function': 'off',
    'no-tabs': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-console': [
      process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      {
        allow: [
          'warn',
          'error',
          'info',
        ],
      },
    ],
    'no-use-before-define': [
      'off',
      {
        functions: true,
        classes: true,
        variables: false,
      },
    ],

    'lines-between-class-members': ['off'],
    'prefer-destructuring': [
      'error',
      {object: false, array: false},
    ],
    'space-before-function-paren': [
      'error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      }],

    'object-curly-spacing': [
      'error',
      'never',
    ],

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
    'no-trailing-spaces': [
      'error',
      {skipBlankLines: true},
    ],
    'max-len': [
      'warn',
      {code: 140},
    ],
    'eol-last': [
      'warn',
      'always',
    ],
    semi: [
      'warn',
      'never',
    ],
    'no-param-reassign': 'off',
    'import/no-unresolved': ['off'],
    'implicit-arrow-linebreak': 'off',

    // Argument for this best presented here: https://youtu.be/eEBOvqMfPoI?t=1665
    'no-else-return': ['off'],
    'spaced-comment': 'off',
    'line-comment-position': ['error', {position: 'above'}],

    /**********
     * Lodash *
     **********/
    'lodash/import-scope': [
      'error',
      'member',
    ],
    'lodash/matches-prop-shorthand': 'off',

    // Disable all lodash prefer checks for things that already exist natively
    'lodash/prefer-lodash-method': 'off',
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
}
