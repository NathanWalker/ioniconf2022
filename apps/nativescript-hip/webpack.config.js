const webpack = require('@nativescript/webpack');
const { resolve } = require('path');

module.exports = (env) => {
  webpack.init(env);
  webpack.useConfig('angular');

  webpack.chainWebpack((config) => {
    // shared scss
    config.resolve.alias.set('@ioniconf/xplat-scss', resolve(__dirname, '../../libs/xplat/scss/src/'));
    config.resolve.alias.set('@ioniconf/xplat-nativescript-scss', resolve(__dirname, '../../libs/xplat/nativescript/scss/src/'));

    // ignore cross platform include warnings (harmless)
    config.set('ignoreWarnings', (config.get('ignoreWarnings') || []).concat([/native-views/]));
  });

  return webpack.resolveConfig();
};
