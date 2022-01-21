const CracoLessPlugin = require("craco-less");
// const webpack = require("webpack");

module.exports = {
  devServer: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:5000/api/v1",
        changeOrigin: true,
        pathRewrite: {
          "^/api/v1": "",
        },
      },
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "rgb(234, 84, 11)",
              "@font-size-base": "16px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
