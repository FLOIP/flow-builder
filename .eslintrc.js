module.exports = {
  root: true,
  env: {
    node: true,
    'jest/globals': true,
  },

  parser: 'vue-eslint-parser',
  parserOptions: {
    project: 'tsconfig.json',
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    app: 'readonly',
    builder: 'readonly',
    _: 'readonly',
    Lang: 'readonly',
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
    'plugin:import/typescript',

    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',

    'plugin:@viamo/recommended',
  ],

  plugins: [
    'jest',
    'lodash',
    '@typescript-eslint',
  ],
  overrides: [
    {
      files: [
        '*.js',
      ],
      excludedFiles: '*.png',
      env: {
        jest: true,
        jquery: true,
      },
      rules: {
        '@typescript-eslint/adjacent-overload-signatures': 'off',
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-tslint-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/brace-style': 'off',
        '@typescript-eslint/class-literal-property-style': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/comma-spacing': 'off',
        '@typescript-eslint/consistent-indexed-object-style': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/default-param-last': 'off',
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/func-call-spacing': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/init-declarations': 'off',
        '@typescript-eslint/keyword-spacing': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/method-signature-style': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-array-constructor': 'off',
        '@typescript-eslint/no-base-to-string': 'off',
        '@typescript-eslint/no-confusing-non-null-assertion': 'off',
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/no-dupe-class-members': 'off',
        '@typescript-eslint/no-duplicate-imports': 'off',
        '@typescript-eslint/no-dynamic-delete': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-extra-non-null-assertion': 'off',
        '@typescript-eslint/no-extra-parens': 'off',
        '@typescript-eslint/no-extra-semi': 'off',
        '@typescript-eslint/no-extraneous-class': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-for-in-array': 'off',
        '@typescript-eslint/no-implicit-any-catch': 'off',
        '@typescript-eslint/no-implied-eval': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-invalid-this': 'off',
        '@typescript-eslint/no-invalid-void-type': 'off',
        '@typescript-eslint/no-loop-func': 'off',
        '@typescript-eslint/no-loss-of-precision': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
        '@typescript-eslint/no-misused-new': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-throw-literal': 'off',
        '@typescript-eslint/no-type-alias': 'off',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/no-unnecessary-qualifier': 'off',
        '@typescript-eslint/no-unnecessary-type-arguments': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/no-unnecessary-type-constraint': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-unused-vars-experimental': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-useless-constructor': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/non-nullable-type-assertion-style': 'off',
        '@typescript-eslint/object-curly-spacing': 'off',
        '@typescript-eslint/prefer-as-const': 'off',
        '@typescript-eslint/prefer-enum-initializers': 'off',
        '@typescript-eslint/prefer-for-of': 'off',
        '@typescript-eslint/prefer-function-type': 'off',
        '@typescript-eslint/prefer-includes': 'off',
        '@typescript-eslint/prefer-literal-enum-member': 'off',
        '@typescript-eslint/prefer-namespace-keyword': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/prefer-optional-chain': 'off',
        '@typescript-eslint/prefer-readonly': 'off',
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
        '@typescript-eslint/prefer-reduce-type-parameter': 'off',
        '@typescript-eslint/prefer-regexp-exec': 'off',
        '@typescript-eslint/prefer-string-starts-ends-with': 'off',
        '@typescript-eslint/prefer-ts-expect-error': 'off',
        '@typescript-eslint/promise-function-async': 'off',
        '@typescript-eslint/quotes': 'off',
        '@typescript-eslint/require-array-sort-compare': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/return-await': 'off',
        '@typescript-eslint/semi': 'off',
        '@typescript-eslint/sort-type-union-intersection-members': 'off',
        '@typescript-eslint/space-before-function-paren': 'off',
        '@typescript-eslint/space-infix-ops': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/switch-exhaustiveness-check': 'off',
        '@typescript-eslint/triple-slash-reference': 'off',
        '@typescript-eslint/type-annotation-spacing': 'off',
        '@typescript-eslint/typedef': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/unified-signatures': 'off',
      },
    },
  ],

  rules: {
    /********************
     * Typescript rules *
     ********************/
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowNullableBoolean: true,
      },
    ],
    // Disabled until we can take the time to fix uses of object
    '@typescript-eslint/ban-types': 'off',

    // Disabled until we can take the time to fix uses
    '@typescript-eslint/restrict-template-expressions': 'off',

    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    // Might be able to get rid of this after TS 4.0
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'warn',
      {
        multiline: {
          delimiter: 'comma',
          requireLast: true,
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false,
        },
      },
    ],

    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never',
    }],

    /*************************
     * Modified ESLint rules *
     *************************/
    camelcase: 'off',
    'no-shadow': 'off',
    'consistent-return': ['error', {treatUndefinedAsUnspecified: false}],
    'one-var': ['error', 'never'],

    // These are off due to https://github.com/typescript-eslint/typescript-eslint/blob/f335c504bcf75623d2d671e2e784b047e5e186b9/docs/getting-started/linting/FAQ.md#eslint-plugin-import
    'import/named': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/export': 'off',
    'import/extensions': 'off',
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
      {
        object: false,
        array: false,
      },
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
