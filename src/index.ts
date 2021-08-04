import tailwindPostcssPlugin from "./postcss-plugin-tailwind";
import * as fs from "fs";
import * as path from "path";

type PluginOptions = {
  exclude?: string[];
  include?: any[];
  configFile?: string;
};

export default (ctx, pluginOpts: PluginOptions) => {
  const createConfigFile = () => {
    let hasConfigFile = false;
    try {
      fs.accessSync("./tailwind.config.js");
      hasConfigFile = true;
    } catch (error) {}
    if (hasConfigFile) {
      console.log(
        ctx.helper.chalk.greenBright(
          `⚠️ [taro-plugin-tailwind-weapp] 已存在 tailwind.config.js!`
        )
      );
      return;
    }
    try {
      fs.copyFileSync(
        path.resolve(__dirname, "../tailwind.config.js"),
        "./tailwind.config.js"
      );
    } catch (error) {
      console.log(
        ctx.helper.chalk.redBright(
          `⚠️ [taro-plugin-tailwind-weapp] tailwind.config.js 生成失败！`
        )
      );
    }
  };
  ctx.onBuildStart(() => {
    createConfigFile();
  });
  ctx.registerCommand({
    name: "tailwind",
    optionsMap: {
      "--init": "生成 tailwind.config.js 配置文件",
    },
    synopsisList: ["taro tailwind --init"],
    fn() {
      createConfigFile();
    },
  });
  ctx.modifyWebpackChain(({ chain }) => {
    chain.module
      .rule("taro-tailwind")
      .test(/\.(css|wxss|acss|ttss|less|sass|scss)(\?.*)?$/)
      .include.merge(pluginOpts.include)
      .end()
      .exclude.merge(pluginOpts.exclude ?? [])
      .end()
      .use("taro-tailwind")
      .loader(require.resolve("postcss-loader"))
      .options({
        postcssOptions: {
          plugins: [require.resolve("tailwindcss"), tailwindPostcssPlugin()],
        },
      })
      .end();
  });
};
