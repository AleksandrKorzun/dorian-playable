const playableName = "pl-dorian33";

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const BuilderPlugin = require(`./playables/${playableName}/builder/builder/Index`);

module.exports = {
  mode: "production",
  entry: {
    main: path.resolve(__dirname, `./playables/${playableName}/builder/App.js`),
  },
  output: {
    path: path.resolve(__dirname, `./playables/${playableName}/dist`),
    filename: "[name].js",
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new BuilderPlugin({ mode: "production" }),
  ],
};
