const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');

function extractStyleChunks(isProdBuild) {
  return [
    // If you are using the old stylus, you should uncomment this
    // {
    //   test: /\.styl$/,
    //   use: [
    //     {
    //       loader: ExtractCssChunksPlugin.loader,
    //       options: {
    //         hot: !isProdBuild,
    //       },
    //     },
    //     { loader: 'css-loader' },
    //     { loader: 'stylus-loader' },
    //   ],
    // },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader: ExtractCssChunksPlugin.loader,
          options: {
            hot: !isProdBuild,
          },
        },
        'css-loader',
        'postcss-loader',
      ],
    },
  ];
}

module.exports = extractStyleChunks;
