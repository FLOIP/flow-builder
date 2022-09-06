module.exports = {
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
        ['@babel/preset-typescript'],
      ],
    },
    development: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            forceAllTransforms: true,
          },
        ],
        ['@babel/preset-typescript'],
      ],
    },
    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            forceAllTransforms: true,
          },
        ],
        ['@babel/preset-typescript'],
      ],
    },
  },
}
