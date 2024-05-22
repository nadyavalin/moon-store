const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DotenvWebpackPlugin = require("dotenv-webpack");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const baseConfig = {
  entry: { main: { import: "./src/index.ts" } },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ts$/i,
        use: "ts-loader",
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".jsx"],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new DotenvWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public/"),
          to: path.resolve(__dirname, "dist/public/"),
        },
      ],
    }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === "prod";
  const envConfig = isProductionMode ? require("./webpack.prod.config") : require("./webpack.dev.config");

  return merge(baseConfig, envConfig);
};
