const PrerenderSPAPlugin = require("prerender-spa-plugin"); // 引入插件
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

const path = require("path");
const opt = {
  proxyTarget: "https://admin.bio-swamp.com",

  hostArr: ["localhost"],
  hostIndex: 0,
};

module.exports = {
  // 部署应用包时的基本 URL,从 Vue CLI 3.3 起已弃用baseUrl
  // publicPath: process.env.NODE_ENV !== "production" ? "./" : '/',
  // publicPath: process.env.NODE_ENV !== "production" ? "/" : "/", //本地开发用
  publicPath: process.env.NODE_ENV !== "production" ? "/" : "/", //本地开发用

  // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
  outputDir: "dist",

  // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  // assetsDir: "dist_pc_hemeixin",
  assetsDir: "",

  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: "index.html",

  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  lintOnSave: process.env.NODE_ENV !== "production",

  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,

  // Babel 显式转译列表
  transpileDependencies: [],

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false,

  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性（注：仅影响构建时注入的标签）
  crossorigin: undefined,

  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,

  // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
  // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象

  configureWebpack: (config) => {
    return {
      name: "武汉贝茵莱生物科技",
      resolve: {
        // 配置解析别名
        extensions: [".js", ".vue", ".json"],
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@img": path.resolve(__dirname, "./src/assets/img"),
          "@ying": path.resolve(__dirname, "./src/assets/ying"),
          vue$: "vue/dist/vue.esm.js",
          api: path.resolve(__dirname, "../src/api"),
        },
      },
      optimization: {
        splitChunks: {
          chunks: "all",
        },
      },
      externals: {
        // 'echarts': 'echarts',
      },

      plugins:
        process.env.NODE_ENV !== "production"
          ? []
          : [] || [
              new PrerenderSPAPlugin({
                // 生成文件的路径，也可以与webpakc打包的一致。
                // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
                // staticDir: path.join(__dirname, "dist_jinsu_pc"),
                //staticDir: path.join(__dirname, "dist_pc_beiyinlai"),
                staticDir: path.join(__dirname, "dist"),
                // 对应自己的路由文件，比如about有参数，就需要写成 /about/param1。
                routes: [
                  "/",
                  // "/goodsDetail",
                  // "/register",
                  // "/login",
                ],

                server: {
                  // 跨域请求
                  proxy: {
                    "/api": {
                      target: "https://admin.bio-swamp.com",
                      secure: false,
                      changeOrigin: true,
                      pathRewrite: {
                        "/api": "",
                      },
                    },
                  },
                },

                // 必须配置不然不会进行预编译
                renderer: new Renderer({
                  inject: {
                    foo: "bar",
                  },
                  headless: false,
                  renderAfterTime: 10000,
                  captureAfterTime: 600000,
                }),
              }),
            ],
    };
  },

  devServer: {
    // host: 'localhost',
    host: opt.hostArr[opt.hostIndex],
    disableHostCheck: true,
    port: 80,
    https: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/api": {
        target: opt.proxyTarget,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },

  css: {},

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/common/variable.less")], // 引入全局样式变量
    },
  },

  chainWebpack: (config) => {
    //设置图片不转base64格式  图片少 且对图片质量要求高
    const imagesRule = config.module.rule("images");
    imagesRule.uses.clear(); //清除原本的images loader配置
    imagesRule
      .test(/\.(jpg|gif|png|svg)$/)
      .exclude.add(path.join(__dirname, "../node_modules")) //去除node_modules里的图片转base64配置
      .end()
      .use("url-loader")
      .loader("url-loader")
      .options({ name: "img/[name].[hash:8].[ext]", limit: 1 });
  },
};
