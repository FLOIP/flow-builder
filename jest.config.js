module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transformIgnorePatterns: [
    '!node_modules/',
  ],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "@vue/vue2-jest"
  },
  testPathIgnorePatterns : [
    "tests/unit/storybook.spec.ts",
    "tests/unit/app.spec.ts",
    // "tests/unit/BaseBlockSlots.spec.ts",
    "tests/unit/MessageBlock.spec.ts",
  ],
  globals: {
    'ts-jest': {
      // fix from https://github.com/kulshekhar/ts-jest/issues/805#issuecomment-456055213
      isolatedModules: true,
    },
  },
}
