import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 全局组件注册

import pageProductIndexTop from "@/components/page/pageProductIndexTop";
Vue.component("pageProductIndexTop", pageProductIndexTop); //2 产品中心聚合页 顶部

import pageProductList from "@/components/page/pageProductList";
Vue.component("pageProductList", pageProductList); //2 产品分类页 产品列表
import pageProductArticleTop from "@/components/page/pageProductArticleTop";
Vue.component("pageProductArticleTop", pageProductArticleTop); //2 产品中心专题页 顶部





import pageServiceTop from "@/components/page/pageServiceTop";
Vue.component("pageServiceTop", pageServiceTop); //3 技术服务 顶部

import pageTechInner from "@/components/page/pageTechInner";
Vue.component("pageTechInner", pageTechInner); //4 技术支持 模板页
import pageTechTop from "@/components/page/pageTechTop";
Vue.component("pageTechTop", pageTechTop); //4 技术支持
import pageTechLeftNav from "@/components/page/pageTechLeftNav";
Vue.component("pageTechLeftNav", pageTechLeftNav); //4 技术支持 左侧分类

import pageNewsTop from "@/components/page/pageNewsTop";
Vue.component("pageNewsTop", pageNewsTop); //5 新闻中心
import pageNewsRightCate from "@/components/page/pageNewsRightCate";
Vue.component("pageNewsRightCate", pageNewsRightCate); //5 新闻中心 右侧分类

import pageAboutTop from "@/components/page/pageAboutTop";
Vue.component("pageAboutTop", pageAboutTop); //关于我们 导航

import pageAboutInner from "@/components/page/pageAboutInner";
Vue.component("pageAboutInner", pageAboutInner); //关于我们 内容

import LiuyanForm from "@/components/page/LiuyanForm.vue";
Vue.component("LiuyanForm", LiuyanForm); //留言咨询

import pageProductTop from "@/components/page/pageProductTop";
Vue.component("pageProductTop", pageProductTop); //产品相关 导航

// 全局组件注册
import pageCompanyTop from "@/components/page/pageCompanyTop";
Vue.component("pageCompanyTop", pageCompanyTop); //公司 导航

import pageCategoryTop from "@/components/page/pageCategoryTop";
Vue.component("pageCategoryTop", pageCategoryTop); //产品 导航



// import VConsole from "vconsole";
// if (VConsole) {
//   new VConsole();
// }

// import "lib-flexible";//网页适配
// import "@/lib/lib-flexible.js"; //网页适配

import "@/css/css-reset.css"; // css reset

import "@/store/axiosConfig.js"; //  axios 配置

// import "@/store/api.js";//  api 配置

import Directives from "./directives"; //全局指令
Vue.use(Directives);

import * as filters from "@/filters/index"; //全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// 加载
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { Loading } from "element-ui";
import { Message } from "element-ui";
// import "@/css/index.css"; // 自定义主题
Vue.use(ElementUI);

// 混入
import _mixin from "@/mixins/index.js";
Vue.mixin(_mixin);

Vue.prototype.$load = {
  loading: null,
  open: function () {
    this.loading = Loading.service({
      fullscreen: true,
    });
  },
  close: function () {
    if (!this.loading) return false;
    this.loading.close();
  },
};

// 提示
let duration = 1500; //提示时长
window.alert = function (res = {}) {
  //console.log("= alert =");

  if (typeof res == "object") {
    let { message, code } = res;
    if (code == 1) {
      Message.success({
        message,
        offset: 300,
        duration: duration,
      });
    } else {
      Message.error({
        message,
        offset: 300,
        duration: duration,
      });
    }
  } else if (typeof res == "string") {
    Message.info(res);
  }
};
window.alertSucc = function (message) {
  //console.log("= alertSucc =");
  Message.success({
    message,
    offset: 300,
    duration: duration,
  });
};
window.alertErr = function (message) {
  //console.log("= alertErr =");
  Message.error({
    message,
    offset: 300,
    duration: duration,
  });
};
window.alertInfo = function (message) {
  //console.log("= alertInfo =");
  Message.info({
    message,
    offset: 300,
    duration: duration,
  });
};





store.dispatch("appInit"); //重新初始化

Vue.prototype.$message = Message;
Vue.config.productionTip = false;
// Vue.config.devtools=true;

new Vue({
  router,
  store,

  render: (h) => h(App),
}).$mount("#app");
