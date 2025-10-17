import Vue from "vue";
import store from "../store/index";
import VueRouter from "vue-router";

// 解决报错
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

// 官网页面1
const Index = () => import(/* webpackChunkName: "index" */ "@/views/Index.vue");//已适配
// const page = () => import(/* webpackChunkName: "page" */ "@/views/page.vue");
const about = () => import(/* webpackChunkName: "about" */ "@/views/about.vue");
//关于我们
const companyProfile = () => import(/* webpackChunkName: "companyProfile" */ "@/views/companyProfile.vue");//已适配
const companyAdvantages = () => import(/* webpackChunkName: "companyAdvantages" */ "@/views/companyAdvantages.vue");//已适配
const companyCulture = () => import(/* webpackChunkName: "companyCulture" */ "@/views/companyCulture.vue");//已适配
const companyHistory = () => import(/* webpackChunkName: "companyHistory" */ "@/views/companyHistory.vue");//已适配
const companyStrategy = () => import(/* webpackChunkName: "companyStrategy" */ "@/views/companyStrategy.vue");//已适配
const companyServiceNet = () => import(/* webpackChunkName: "companyServiceNet" */ "@/views/companyServiceNet.vue");//已适配
const companyBusiness = () => import(/* webpackChunkName: "companyBusiness" */ "@/views/companyBusiness.vue");//已适配
const companySales = () => import(/* webpackChunkName: "companySales" */ "@/views/companySales.vue");//已适配
const certificate = () => import(/* webpackChunkName: "certificate" */ "@/views/certificate.vue");//已适配
const idea = () => import(/* webpackChunkName: "idea" */ "@/views/idea.vue");//已适配
const job = () => import(/* webpackChunkName: "job" */ "@/views/job.vue");//已适配
const jobdetail = () => import(/* webpackChunkName: "jobdetail" */ "@/views/jobdetail.vue");//已适配
//
const news = () => import(/* webpackChunkName: "news" */ "@/views/news.vue");//已适配
const newsSearch = () => import(/* webpackChunkName: "newsSearch" */ "@/views/newsSearch.vue");//已适配
const newsDetail = () => import(/* webpackChunkName: "newsDetail" */ "@/views/newsDetail.vue");//已适配

const technologyService = () => import("@/views/technologyService.vue");//已适配
const products = () => import(/* webpackChunkName: "products" */ "@/views/products.vue");//已适配
const questions = () => import(/* webpackChunkName: "questions" */ "@/views/questions.vue");//已适配
const questionscate = () => import(/* webpackChunkName: "questionscate" */ "@/views/questionscate.vue");//已适配

//学习中心
const technology = () => import(/* webpackChunkName: "technology" */ "@/views/technology.vue");//已适配
const technologyCenter = () => import(/* webpackChunkName: "technologyCenter" */ "@/views/technologyCenter.vue");//已适配
const technologyVideo = () => import(/* webpackChunkName: "technologyVideo" */ "@/views/technologyVideo.vue");//已适配
const technologyArticle = () => import(/* webpackChunkName: "technologyArticle" */ "@/views/technologyArticle.vue");//已适配
const technologyPdf = () => import(/* webpackChunkName: "technologyPdf" */ "@/views/technologyPdf.vue");//已适配

// const technologyOnline = () => import(/* webpackChunkName: "technologyOnline" */ "@/views/technologyOnline.vue");
// const technologyResearch = () => import(/* webpackChunkName: "technologyResearch" */ "@/views/technologyResearch.vue");
const technologyDownload = () => import(/* webpackChunkName: "technologyDownload" */ "@/views/technologyDownload.vue");
// const technologyEdge = () => import(/* webpackChunkName: "technologyEdge" */ "@/views/technologyEdge.vue");
// const technologyStudyInfo = () => import(/* webpackChunkName: "technologyStudyInfo" */ "@/views/technologyStudyInfo.vue");


//产品
const productCates = () => import(/* webpackChunkName: "productCates" */ "@/views/productCates.vue");//已适配
const productSearch = () => import(/* webpackChunkName: "productSearch" */ "@/views/productSearch.vue");//已适配
const productApparatusesCates = () => import(/* webpackChunkName: "productApparatusesCates" */ "@/views/productApparatusesCates.vue");//已适配
const productComparison = () => import(/* webpackChunkName: "productComparison" */ "@/views/productComparison.vue");//已适配
const goodsDetail = () => import(/* webpackChunkName: "goodsDetail" */ "@/views/goodsDetail.vue");//已适配
//说明书
// const productFile = () => import(/* webpackChunkName: "productFile" */ "@/views/productFile.vue");
const productSpecification = () => import(/* webpackChunkName: "productSpecification" */ "@/views/productSpecification.vue");//已适配
const productSpecificationPdf = () => import(/* webpackChunkName: "productSpecificationPdf" */ "@/views/productSpecificationPdf.vue");//已适配
//产品文献
const productDocument = () => import(/* webpackChunkName: "productDocument" */ "@/views/productDocument.vue");//已适配
//产品领域
const productField = () => import(/* webpackChunkName: "productField" */ "@/views/productField.vue");//已适配
//专题
const productArticle = () => import(/* webpackChunkName: "productArticle" */ "@/views/productArticle.vue");//已适配
const productArticleDetail = () => import(/* webpackChunkName: "productArticleDetail" */ "@/views/productArticleDetail.vue");//已适配

// 账号相关
const register = () => import(/* webpackChunkName: "register" */ "@/views/account/register.vue");//已适配
const login = () => import(/* webpackChunkName: "login" */ "@/views/account/login.vue");//已适配
const retrieve = () => import(/* webpackChunkName: "retrieve" */ "@/views/account/retrieve.vue");//已适配


// 订单
const shoppingCart = () => import(/* webpackChunkName: "shoppingCart" */ "@/views/order/shoppingCart.vue"); //已适配
const orderCreate = () => import(/* webpackChunkName: "orderCreate" */ "@/views/order/orderCreate.vue");//已适配
const orderPaymentMethod = () => import(/* webpackChunkName: "orderPaymentMethod" */ "@/views/order/orderPaymentMethod.vue");//已适配
// 支付
const zfbPay = () => import(/* webpackChunkName: "zfbPay" */ "@/views/pay/zfbPay.vue");//已适配
const payDone = () => import(/* webpackChunkName: "payDone" */ "@/views/pay/payDone.vue");//已适配

const myOrder = () => import(/* webpackChunkName: "myOrder" */ "@/views/order/myOrder.vue");//已适配
const orderDetail = () => import(/* webpackChunkName: "orderDetail" */ "@/views/order/orderDetail.vue");//已适配
// const jifenorderDetail = () => import(/* webpackChunkName: "jifenorderDetail" */ "@/views/order/jifenorderDetail.vue");
const orderReview = () => import(/* webpackChunkName: "orderReview" */ "@/views/order/orderReview.vue");//已适配
const orderLogistics = () => import(/* webpackChunkName: "orderLogistics" */ "@/views/order/orderLogistics.vue");//已适配

// const searchResult = () => import("@/views/company/searchResult.vue");
// const aboutUs = () => import("@/views/company/aboutUs.vue");
// const contactUs = () => import("@/views/company/contactUs.vue");
// const search = () => import("@/views/company/search.vue");

// 商品
// const category = () => import("@/views/goods/category.vue");
// const classify = () => import("@/views/goods/classify.vue");


// 用户中心
const user = () => import("@/views/my/index.vue");//已适配
const myInfo = () => import(/* webpackChunkName: "myInfo" */ "@/views/my/myInfo.vue");//已适配
const updatePass = () => import(/* webpackChunkName: "updatePass" */ "@/views/my/updatePass.vue");//已适配
const userIndex = () => import(/* webpackChunkName: "userIndex" */ "@/views/my/userIndex.vue");//已适配
// const memberCenter = () => import(/* webpackChunkName: "memberCenter" */ "@/views/my/member/memberCenter.vue");
const myReview = () => import(/* webpackChunkName: "myReview" */ "@/views/my/myReview.vue");//已适配
const myAddress = () => import(/* webpackChunkName: "myAddress" */ "@/views/my/myAddress.vue");//已适配
const myFavorite = () => import(/* webpackChunkName: "myFavorite" */ "@/views/my/myFavorite.vue");//已适配
const myBrowse = () => import(/* webpackChunkName: "myBrowse" */ "@/views/my/myBrowse.vue");//已适配

//优惠活动积分等
// const myCommission = () => import("@/views/my/myCommission/myCommission.vue");
// // const myCommissionDetail = () => import("@/views/my/myCommission/myCommissionDetail.vue");
// const myYeJi = () => import("@/views/my/myYeJi/myYeJi.vue");
// const myYeJiDetail = () => import("@/views/my/myYeJi/myYeJiDetail.vue");
// const myFenRun = () => import("@/views/my/myYeJi/myFenRun.vue");
// const myFenRunDetail = () => import("@/views/my/myYeJi/myFenRunDetail.vue");
// const myTeam = () => import("@/views/my/myTeam/myTeam.vue");

const myCoupon = () => import("@/views/my/coupon/myCoupon.vue");//已适配
const couponCenter = () => import("@/views/my/coupon/couponCenter.vue");//已适配
// const feedback = () => import("@/views/service/feedback.vue");
// const helpCenter = () => import("@/views/service/helpCenter.vue");

//余额
const yue = () => import(/* webpackChunkName: "yue" */ "@/views/my/yue/yue.vue");//已适配
const yueChongzhi = () => import(/* webpackChunkName: "yueChongzhi" */ "@/views/my/yue/yueChongzhi.vue");//已适配
const yueMingxi = () => import(/* webpackChunkName: "yueMingxi" */ "@/views/my/yue/yueMingxi.vue");//已适配
// const chongzhijilu = () => import("@/views/my/yue/chongzhijilu.vue");//
// const chongzhichenggong = () => import("@/views/my/yue/chongzhichenggong.vue");
// const chongzhishibai = () => import("@/views/my/yue/chongzhishibai.vue");

// 积分
const pointsMall = () => import(/* webpackChunkName: "pointsMall" */ "@/views/my/points/pointsMall.vue");//已适配
const pointsDetail = () => import(/* webpackChunkName: "pointsDetail" */ "@/views/my/points/pointsDetail.vue");//已适配
// const pointsRedemption = () => import(/* webpackChunkName: "pointsRedemption" */ "@/views/my/points/pointsRedemption.vue");
// const jifengoodsdetail = () => import(/* webpackChunkName: "jifengoodsdetail" */ "@/views/my/points/jifengoodsdetail.vue");
const jifenOrderCreate = () => import(/* webpackChunkName: "jifenOrderCreate" */ "@/views/my/points/jifenOrderCreate.vue");//已适配
const jifenpayDone = () => import(/* webpackChunkName: "jifenpayDone" */ "@/views/my/points/jifenpayDone.vue");//已适配


// 售后
const refundFeedback = () => import(/* webpackChunkName: "refundFeedback" */ "@/views/my/refundFeedback.vue");//已适配
// const myRefund = () => import("@/views/refund/myRefund.vue");
// const refundType = () => import("@/views/refund/refundType.vue");
// const refundSubmit = () => import("@/views/refund/refundSubmit.vue");
// const refundServiceDetail = () => import("@/views/refund/refundServiceDetail.vue");
// const orderRefundStep3 = () => import("@/views/refund/orderRefundStep3.vue");
const test = () => import(/* webpackChunkName: "refundFeedback" */ "@/views/test.vue");//已适配


const metaInfo = {
  title: "武汉贝茵莱生物科技",
  keywords: "武汉贝茵莱生物科技",
  description: "武汉贝茵莱生物科技",
};

const routes = [
  // 首页
  {
    path: "/",
    name: "index",
    component: Index,
    meta: {
      showIndexHeader: true,
      metaInfo,
    },
  },
  // {
  //   path: "/page/:id",
  //   name: "page",
  //   component: page,
  //   meta: {},
  // },

  {
    path: "/products",
    name: "products",
    component: products,
    meta: {
      title: "产品中心",
    },
  },

  {
    path: "/productCates",
    name: "productCates",
    component: productCates,
    meta: {
      title: "产品分类",
    },
  },
  {
    path: "/productSearch",
    name: "productSearch",
    component: productSearch,
    meta: {
      title: "产品搜索",
    },
  },

  {
    path: "/productApparatusesCates",
    name: "productApparatusesCates",
    component: productApparatusesCates,
    meta: {
      title: "仪器分类",
    },
  },

  {
    path: "/productComparison",
    name: "productComparison",
    component: productComparison,
    meta: {
      title: "产品对比",
    },
  },

  {
    path: "/productSpecification/:id",
    name: "productSpecification",
    component: productSpecification,
    meta: {
      title: "产品说明书",
    },
  },
  {
    path: "/productSpecificationPdf/:id",
    name: "productSpecificationPdf",
    component: productSpecificationPdf,
    meta: {
      title: "产品说明书",
    },
  },

  // {
  //   path: "/productFile/:id",
  //   name: "productFile",
  //   component: productFile,
  //   meta: {
  //     title: "产品说明书",
  //   },
  // },

  {
    path: "/productDocument",
    name: "productDocument",
    component: productDocument,
    meta: {
      title: "产品文献",
    },
  },
  {
    path: "/productField",
    name: "productField",
    component: productField,
    meta: {
      title: "产品研究领域",
    },
  },
  {
    path: "/productArticle/:id",
    name: "productArticle",
    component: productArticle,
    meta: {
      title: "产品专题",
    },
  },
  {
    path: "/productArticleDetail/:id",
    name: "productArticleDetail",
    component: productArticleDetail,
    meta: {
      title: "产品专题详情",
    },
  },

  {
    path: "/goodsDetail/:id",
    name: "goodsDetail",
    component: goodsDetail,
    meta: {},
  },

  {
    path: "/technologyService/:id",
    name: "technologyService",
    component: technologyService,
    meta: {
      title: "技术服务",
      root: "技术服务",
    },
  },

  {
    path: "/technology",
    name: "technology",
    component: technology,
    meta: {
      title: "学习中心",
      root: "技术支持",
      root2: "技术支持-学习中心",
    },
  },
  {
    path: "/technologyCenter",
    name: "technologyCenter",
    component: technologyCenter,
    meta: {
      title: "学习中心",
      source: "学习中心-在线课堂",
      root: "技术支持",
      root2: "技术支持-学习中心",
    },
  },

  {
    path: "/technologyVideo",
    name: "technologyVideo",
    component: technologyVideo,
    meta: {
      title: "视频详情",
      level: 4,
      source: "技术支持-学习中心-在线课堂-视频详情",
      root: "技术支持",
      root2: "技术支持-学习中心",
    },
  },

  {
    path: "/technologyArticle",
    name: "technologyArticle",
    component: technologyArticle,
    meta: {
      title: "文章详情",
      level: 4,
      source: "技术支持-学习中心-技术专题-文章详情",
      root: "技术支持",
      root2: "技术支持-学习中心",
    },
  },
  {
    path: "/technologyPdf",
    name: "technologyPdf",
    component: technologyPdf,
    meta: {
      title: "pdf附件",
      level: 4,
      source: "技术支持-学习中心-技术专题-pdf附件",
      root: "技术支持",
      root2: "技术支持-学习中心",
    },
  },

  // {
  //   path: "/technologyOnline",
  //   name: "technologyOnline",
  //   component: technologyOnline,
  //   meta: {
  //     title: "学习中心",
  //     source: "学习中心-在线课堂",
  //     root: "技术支持",
  //     root2: "技术支持-学习中心",
  //   },
  // },

  // {
  //   path: "/technologyResearch",
  //   name: "technologyResearch",
  //   component: technologyResearch,
  //   meta: {
  //     title: "学习中心",
  //     source: "学习中心-技术专题",
  //     root: "技术支持",
  //     root2: "技术支持-学习中心",
  //   },
  // },

  {
    path: "/technologyDownload",
    name: "technologyDownload",
    component: technologyDownload,
    meta: {
      title: "学习中心",
      source: "学习中心-资料下载",
      root: "技术支持",
      root2: "技术支持-学习中心",
    },
  },

  // {
  //   path: "/technologyEdge",
  //   name: "technologyEdge",
  //   component: technologyEdge,
  //   meta: {
  //     title: "学习中心",
  //     source: "学习中心-前沿领域",
  //     root: "技术支持",
  //     root2: "技术支持-学习中心",
  //   },
  // },


  // {
  //   path: "/technologyStudyInfo",
  //   name: "technologyStudyInfo",
  //   component: technologyStudyInfo,
  //   meta: {
  //     title: "学习资料",
  //     root: "技术支持",
  //     root2: "技术支持-学习中心",
  //   },
  // },


  {
    path: "/questions",
    name: "questions",
    component: questions,
    meta: {
      title: "技术问题",
      source: "技术支持-技术问题-聚合页",
      root: "技术支持",
      root2: "技术支持-技术问题",
    },
  },
  {
    path: "/questionscate",
    name: "questionscate",
    component: questionscate,
    meta: {
      title: "技术问题",
      source: "技术支持-技术问题-分类列表",
      root: "技术支持",
      root2: "技术支持-技术问题",
    },
  },

  {
    path: "/news/:id",
    name: "news",
    component: news,
    meta: {
      title: "新闻中心",
      root: "新闻中心",
    },
  },
  {
    path: "/newsSearch",
    name: "newsSearch",
    component: newsSearch,
    meta: {
      title: "新闻搜索",
      root: "新闻中心",
    },
  },
  {
    path: "/newsDetail/:id",
    name: "newsDetail",
    component: newsDetail,
    meta: {
      title: "新闻详情",
      root: "新闻中心",
    },
  },

  {
    path: "/about/:id",
    name: "about",
    component: about,
    meta: {
      title: "关于我们",
      source: '关于我们-[服务网络,企业优势,企业文化]'
    },
  },

  {
    path: "/companyProfile",
    name: "companyProfile",
    component: companyProfile,
    meta: {
      title: "公司简介",
      root: "关于我们",
    },
  },

  {
    path: "/companyServiceNet",
    name: "companyServiceNet",
    component: companyServiceNet,
    meta: {
      title: "服务网络",
      root: "关于我们",
    },
  },
  {
    path: "/companyAdvantages",
    name: "companyAdvantages",
    component: companyAdvantages,
    meta: {
      title: "企业优势",
      root: "关于我们",
    },
  },
  {
    path: "/companyCulture",
    name: "companyCulture",
    component: companyCulture,
    meta: {
      title: "企业文化",
      root: "关于我们",
    },
  },
  {
    path: "/companyHistory",
    name: "companyHistory",
    component: companyHistory,
    meta: {
      title: "发展历程",
      root: "关于我们",
    },
  },

  {
    path: "/companyStrategy",
    name: "companyStrategy",
    component: companyStrategy,
    meta: {
      title: "战略布局",
      root: "关于我们",
    },
  },
  {
    path: "/companyBusiness",
    name: "companyBusiness",
    component: companyBusiness,
    meta: {
      title: "授权经销商",
      root: "关于我们",
    },
  },
  {
    path: "/companySales",
    name: "companySales",
    component: companySales,
    meta: {
      title: "销售网络",
      root: "关于我们",
    },
  },
  {
    path: "/certificate",
    name: "certificate",
    component: certificate,
    meta: {
      title: "获奖证书",
      root: "关于我们",
    },
  },
  {
    path: "/idea",
    name: "idea",
    component: idea,
    meta: {
      title: "人才理念",
      root: "关于我们",
    },
  },
  {
    path: "/job",
    name: "job",
    component: job,
    meta: {
      title: "招聘信息",
      root: "关于我们",
    },
  },
  {
    path: "/jobdetail/:id",
    name: "jobdetail",
    component: jobdetail,
    meta: {
      title: "岗位详情",
      root: "关于我们",
    },
  },

  // {
  //   path: "/productDetail",
  //   name: "productDetail",
  //   component: productDetail,
  //   meta: {
  //     title: '产品详情'
  //   },
  // },

  // 之前

  // {
  //   path: "/searchResult",
  //   name: "searchResult",
  //   component: searchResult,
  //   meta: {},
  // },

  // {
  //   path: "/aboutUs",
  //   name: "aboutUs",
  //   component: aboutUs,
  //   meta: {},
  // },

  // {
  //   path: "/contactUs",
  //   name: "contactUs",
  //   component: contactUs,
  //   meta: {},
  // },

  // {
  //   path: "/category",
  //   name: "category",
  //   component: category,
  //   meta: {},
  // },

  // {
  //   path: "/jifengoodsdetail",
  //   name: "jifengoodsdetail",
  //   component: jifengoodsdetail,
  //   meta: {
  //     requireAuth: false,
  //     metaInfo,
  //   },
  // },

  // 注册
  {
    path: "/register",
    name: "register",
    component: register,
    meta: {
      hide_topHeaderInfo: true,
      hide_topHeaderSearch: true,
      hide_topNav: true,
      hide_footer: true,
      metaInfo,
    },
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      hide_topHeaderInfo: true,
      hide_topHeaderSearch: true,
      hide_topNav: true,
      hide_footer: true,
      metaInfo,
    },
  },
  // 修改密码
  {
    path: "/retrieve",
    name: "retrieve",
    component: retrieve,
    meta: {
      hide_topHeaderInfo: true,
      hide_topHeaderSearch: true,
      hide_topNav: true,
      hide_footer: true,
      metaInfo,
    },
  },

  // 优惠区分类
  // {
  //   path: "/classify",
  //   name: "classify",
  //   component: classify,
  //   meta: {
  //     hideHeader: true,
  //     metaInfo,
  //   },
  // },

  //  搜索
  // {
  //   path: "/search",
  //   name: "search",
  //   component: search,
  //   meta: {
  //     metaInfo,
  //   },
  // },

  {
    path: "/jifenOrderCreate",
    name: "jifenOrderCreate",
    component: jifenOrderCreate,
    meta: {
      requireAuth: true,
      metaInfo,
    },
  },

  {
    path: "/jifenpayDone",
    name: "jifenpayDone",
    component: jifenpayDone,
    meta: {
      requireAuth: true,

      metaInfo,
    },
  },

  {
    path: "/shoppingCart",
    name: "shoppingCart",
    component: shoppingCart,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/orderCreate",
    name: "orderCreate",
    component: orderCreate,
    meta: {
      requireAuth: true,
      title: '创建订单',
    },
  },

  {
    path: "/orderPaymentMethod",
    name: "orderPaymentMethod",
    component: orderPaymentMethod,
    meta: {
      title: '订单支付',
      requireAuth: true,
      metaInfo,
    },
  },

  {
    path: "/payDone",
    name: "payDone",
    component: payDone,
    meta: {
      title: '支付结果',
      requireAuth: true,
      metaInfo,
    },
  },

  //用户中心
  {
    path: "/user",
    name: "user",
    component: user,
    meta: {
      requireAuth: true,
      metaInfo,
    },
    children: [
      {
        path: "/userIndex",
        name: "userIndex",
        component: userIndex,
        meta: {
          title: "个人主页",
          requireAuth: true,
          metaInfo,
        },
      },
      {
        path: "/refundFeedback",
        name: "refundFeedback",
        component: refundFeedback,
        meta: {
          title: "售后",
          requireAuth: true,
          metaInfo,
        },
      },
      // {
      //   path: "/memberCenter",
      //   name: "memberCenter",
      //   component: memberCenter,
      //   meta: {
      //     title: "会员中心",
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },


      {
        path: "/zfbPay",
        name: "zfbPay",
        component: zfbPay,
        meta: {
          title: "支付宝支付",
          requireAuth: true,
          metaInfo,
        },
      },

      {
        path: "/pointsMall",
        name: "pointsMall",
        component: pointsMall,
        meta: {
          title: "积分商城",
          requireAuth: true,
          metaInfo,
        },
      },
      {
        path: "/pointsDetail",
        name: "pointsDetail",
        component: pointsDetail,
        meta: {
          title: "积分明细",
          requireAuth: true,
          metaInfo,
        },
      },

      // {
      //   path: "/pointsRedemption",
      //   name: "pointsRedemption",
      //   component: pointsRedemption,
      //   meta: {
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },

      {
        path: "/yue",
        name: "yue",
        component: yue,
        meta: {
          title: "我的余额",
          requireAuth: true,
          metaInfo,
        },
      },

      {
        path: "/yueChongzhi",
        name: "yueChongzhi",
        component: yueChongzhi,
        meta: {
          title: "在线充值",
          requireAuth: true,
          metaInfo,
        },
      },
      {
        path: "/yueMingxi",
        name: "yueMingxi",
        component: yueMingxi,
        meta: {
          title: "在线充值",
          requireAuth: true,
          metaInfo,
        },
      },

      // {
      //   path: "/chongzhichenggong",
      //   name: "chongzhichenggong",
      //   component: chongzhichenggong,
      //   meta: {
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },
      // {
      //   path: "/chongzhishibai",
      //   name: "chongzhishibai",
      //   component: chongzhishibai,
      //   meta: {
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },
      // {
      //   path: "/chongzhijilu",
      //   name: "chongzhijilu",
      //   component: chongzhijilu,
      //   meta: {
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },

      {
        path: "/myOrder",
        name: "myOrder",
        component: myOrder,
        meta: {
          requireAuth: true,
          metaInfo,
        },
      },
      {
        path: "/orderDetail",
        name: "orderDetail",
        component: orderDetail,
        meta: {
          title: "订单详情",
          requireAuth: true,
          metaInfo,
        },
      },
      {
        path: "/orderLogistics",
        name: "orderLogistics",
        component: orderLogistics,
        meta: {
          title: "订单物流",
          requireAuth: true,
          metaInfo,
        },
      },
      // {
      //   path: "/jifenorderDetail",
      //   name: "jifenorderDetail",
      //   component: jifenorderDetail,
      //   meta: {
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },
      // {
      //   path: "/myRefund",
      //   name: "myRefund",
      //   component: myRefund,
      //   meta: {
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },
      // {
      //   path: "/refundType",
      //   name: "refundType",
      //   component: refundType,
      //   meta: {
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },

      //售后申请
      // {
      //   path: "/refundSubmit",
      //   name: "refundSubmit",
      //   component: refundSubmit,
      //   meta: {
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },

      //售后进度
      // {
      //   path: "/refundServiceDetail",
      //   name: "refundServiceDetail",
      //   component: refundServiceDetail,
      //   meta: {
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },
      // {
      //   path: "/orderRefundStep3",
      //   name: "orderRefundStep3",
      //   component: orderRefundStep3,
      //   meta: {
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },



      {
        path: "/orderReview",
        name: "orderReview",
        component: orderReview,
        meta: {
          title: "订单评价",
          requireAuth: true,
          metaInfo,
        },
      },

      {
        path: "/myReview",
        name: "myReview",
        component: myReview,
        meta: {
          title: "我的评论",
          requireAuth: true,
          metaInfo,
        },
      },

      {
        path: "/myFavorite",
        name: "myFavorite",
        component: myFavorite,
        meta: {
          title: "我的收藏",
          requireAuth: true,
          metaInfo,
        },
      },
      {
        path: "/myBrowse",
        name: "myBrowse",
        component: myBrowse,
        meta: {
          title: "我的足迹",
          requireAuth: true,
          metaInfo,
        },
      },

      {
        path: "/myAddress",
        name: "myAddress",
        component: myAddress,
        meta: {
          title: "我的地址",
          requireAuth: true,
          metaInfo,
        },
      },
      // {
      //   path: "/myCommission",
      //   name: "myCommission",
      //   component: myCommission,
      //   meta: {
      //     title: "佣金",
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },
      // {
      //   path: "/myCommissionDetail",
      //   name: "myCommissionDetail",
      //   component: myCommissionDetail,
      //   meta: {
      //     title: "佣金明细",
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },
      // {
      //   path: "/myYeJi",
      //   name: "myYeJi",
      //   component: myYeJi,
      //   meta: {
      //     title: "我的业绩",
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },
      // {
      //   path: "/myYeJiDetail",
      //   name: "myYeJiDetail",
      //   component: myYeJiDetail,
      //   meta: {
      //     title: "业绩详情",
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },
      // {
      //   path: "/myTeam",
      //   name: "myTeam",
      //   component: myTeam,
      //   meta: {
      //     title: "我的团队",
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },
      // {
      //   path: "/myFenRun",
      //   name: "myFenRun",
      //   component: myFenRun,
      //   meta: {
      //     title: "分润统计",
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },
      // {
      //   path: "/myFenRunDetail",
      //   name: "myFenRunDetail",
      //   component: myFenRunDetail,
      //   meta: {
      //     title: "分润统计",
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },

      {
        path: "/myInfo",
        name: "myInfo",
        component: myInfo,
        meta: {
          title: "个人信息",
          requireAuth: true,
          metaInfo,
        },
      },
      {
        path: "/updatePass",
        name: "updatePass",
        component: updatePass,
        meta: {
          title: "修改密码",
          requireAuth: true,
          metaInfo,
        },
      },

      {
        path: "/myCoupon",
        name: "myCoupon",
        component: myCoupon,
        meta: {
          title: "我的优惠券",
          requireAuth: true,
          metaInfo,
        },
      },

      {
        path: "/couponCenter",
        name: "couponCenter",
        component: couponCenter,
        meta: {
          title: "领券中心",
          requireAuth: true,
          metaInfo,
        },
      },
      {
        path: "/test",
        name: "test",
        component: test,
        meta: {
          title: "测试功能页",
          root: "测试功能页",
        },
      },
      // {
      //   path: "/feedback",
      //   name: "feedback",
      //   component: feedback,
      //   meta: {
      //     title: "意见反馈",
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },
      // {
      //   path: "/helpCenter",
      //   name: "helpCenter",
      //   component: helpCenter,
      //   meta: {
      //     title: "帮助中心",
      //     requireAuth: true,
      //     metaInfo,
      //   },
      // },
    ],
  },

  {
    path: "*",
    redirect: "/",
  },
];

const scrollBehavior = (to, from, savedPosition) => {
  // //console.log('滚动行为', to, from, savedPosition)
  // if(1) {
  //   return savedPosition;  
  // }
  //console.log('router 处理滚动')
  if (to.name == 'technologyCenter') {
    let scrollTop = document.documentElement.scrollTop;
    return { x: 0, y: scrollTop }
  }
  return { x: 0, y: 0 };
};

const router = new VueRouter({
  routes,
  base: "/",
  mode: "history",
  scrollBehavior,
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  let user_id = localStorage.getItem("user_id");
  let is_login_curr = token && user_id;

  // debugger
  if (!is_login_curr && to.meta.requireAuth) {
    // debugger
    alertErr("请先登录");
    next("/login");
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  let theme = to.name == "index" ? "transparent" : "white";
  store.commit("set_header_theme", theme);
  // //console.log("切换导航, 重新配置微信分享");
  // wxShare.getSign();
});

export default router;
