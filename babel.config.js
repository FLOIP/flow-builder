module.exports = {
  presets: [
    '@babel/preset-env',
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining"
  ],
}
