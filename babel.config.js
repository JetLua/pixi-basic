module.exports = {
  presets: [
    ['@babel/typescript', {isTSX: true, allExtensions: true, onlyRemoveTypeImports: true}],
    ['@babel/env', {useBuiltIns: 'usage', corejs: 3}],
  ],
  plugins: [
    '@babel/proposal-class-properties',
    ['@babel/transform-runtime', {
      corejs: 3,
      helpers: true,
      regenerator: true,
      useESModules: true
    }]
  ]
}
