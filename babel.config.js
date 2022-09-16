module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    ["minify", {
      "keepFnName": true,
      "mangle": {
        "exclude": ["ParserError", "NetworkError"]
      }
    }]
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@modules': './src/modules',
          '@config': './src/config',
          '@shared': './src/shared',
          '@error': './src/error',
          '@utils': './src/utils',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { legacy: true }],
  ],
};
