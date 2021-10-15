import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export default {
  // entry: `./src/airFriction.ts`,
  // entry: `./src/avalanche.ts`,
  // entry: `./src/bridge.ts`,
  entry: `./src/sensors.ts`,
  // entry: `./src/getting_started.ts`,
  // entry: `./src/slingshot.ts`,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  mode: "development",
  // mode: "production",
  output: {
    filename: "bundle.js",
    path: path.resolve("dist"),
    clean: true,
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: "dist",
    },
    compress: true,
    port: 5500,
    open: false,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/index.html", to: "." },
        { from: "src/style.css", to: "." },
      ],
    }),
  ],
};
