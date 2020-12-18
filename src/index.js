const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  overrideWebpackConfig: ({ webpackConfig, pluginOptions }) => {
    // Check webpack config
    if (
      !webpackConfig ||
      !webpackConfig.module ||
      !webpackConfig.module.rules ||
      typeof webpackConfig.module.rules !== "object"
    ) {
      throw new Error("craco-plugin-svg-sprite error: no valid webpackConfig.module.rules");
    }

    // Check variable pluginOptions
    if (Object.prototype.toString.call(pluginOptions) !== "[object Object]") {
      throw new Error("craco-plugin-svg-sprite error: variable pluginOptions should is an object");
    }

    // Check pluginOptions property
    if (!pluginOptions.include) {
      throw new Error("craco-plugin-svg-sprite error: parameter ⭐️include⭐️ is required");
    }

    // Add the loader rule where needed
    const output = { ...webpackConfig };
    Object.keys(output.module.rules).forEach((ruleKey, ruleIndex) => {
      const rule = output.module.rules[ruleKey];
      if (Object.prototype.hasOwnProperty.call(rule, "oneOf")) {
        const svgPrefixName = pluginOptions.svgPrefixName ? `${pluginOptions.svgPrefixName}-[name]` : "[name]";
        const { spriteLoaderConfig = {}, svgoConfig = {} } = pluginOptions;

        const loaderItem = {
          test: /\.svg$/,
          use: [
            {
              loader: "svg-sprite-loader",
              options: {
                ...spriteLoaderConfig,
                symbolId: svgPrefixName,
              },
            },
          ],
          include: [resolveApp(pluginOptions.include)],
        };

        if (pluginOptions.compress !== false || pluginOptions.compress !== true) {
          pluginOptions.compress = true;
        }

        if (pluginOptions.compress) {
          loaderItem.use.push({
            loader: "svgo-loader",
            // https://www.npmjs.com/package/svgo-loader
            options: svgoConfig,
          });
        }

        output.module.rules[ruleIndex].oneOf.unshift(loaderItem);
      }
    });
    return output;
  },
};
