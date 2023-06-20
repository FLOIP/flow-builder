module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transformIgnorePatterns: [
    '!node_modules/',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
  globals: {
    'ts-jest': {
      // fix from https://github.com/kulshekhar/ts-jest/issues/805#issuecomment-456055213
      isolatedModules: true,
    },
  },
}
