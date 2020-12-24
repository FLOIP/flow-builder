module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transformIgnorePatterns: [
    '!node_modules/',
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true, // fix from https://github.com/kulshekhar/ts-jest/issues/805#issuecomment-456055213
    },
  },
};
