const path =  require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, './start'),
    publicPath: isProd ? 
    'https://lazurey.github.io/jlpt-simulator/start/'
    : '/',
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/,
      },
      // {
      //   enforce: "pre",
      //   test: /\.js$/,
      //   loader: "source-map-loader",
      //   exclude: [
      //     /node_modules\/mutationobserver-shim/g,
      //   ],
      // },
      // {
      //   test: /\.(png|jpg|jpeg|gif|svg|ttf|woff|woff2|eot|ico|pdf)$/,
      //   use: ['file-loader']
      // },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    contentBase: path.join(__dirname, './start'),
    disableHostCheck: true,
    // publicPath: '/start',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'JLPT Simulator',
      template: './src/index.html',
    }),
  ]
};
