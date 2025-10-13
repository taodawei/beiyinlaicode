import Vue from "vue";
import Vuex from "vuex";

import router from "../router";

import ajax from "@/store/axiosConfig.js"; //导入 axios 配置
const api = ajax.api; //请求方法

// debugger
//console.log("========== store location ==========", location);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    is_weChat_auth: false, //项目是否微信授权登录
    com_id: 888,
    defaultAvatar: require("@img/avatar.png"),
    company_title: "武汉贝茵莱生物科技",
    company_title_en: "",

    header_theme: location.pathname == "/" ? "transparent" : "white", //顶部导航主题 // white 白色背景  transparent 主页使用的透明背景
    lang: "0", // 0-中文  1-英文


    show_nav_jingxiao: false,//是否展示授权经销商页面

    company_detail_id: "6", //公司详情id
    news_parent_id: "29", //新闻大分类id
    default_news_cate_id: "30",
    service_cates: [], //定制服务分类
    child_tech_service: [], //定制服务分类路由
    product_cates: [], //产品类型 带子级分类
    product_cates_all: [], //只有一层
    product_id_map: {},
    haocai_cates: [], //耗材分类 带子级分类
    haocai_cates_all: [], //所有耗材 只有一层
    zhuanti_cates: [], //专题
    first_zhuanti_route: "/",

    study_cates: [], //学习中心 节点型
    study_cates_all: [], //学习中心 只有一层
    vuex_study_active_cate_id: "", //技术中心展开的分类节点id
    study_index_banners: "", //学习中心banner

    pdt_max_num: 0, //产品数量 确定产品列表的展示形式
    invite_jifen: 0, //邀请积分

    //新闻分类
    news_cates: [],

    lingyu_cates: [], //产品领域 节点树数据
    lingyu_cates_all: [], //产品领域  只有一层

    hotSearchWords: [], //热门搜索词
    serviceIcons: [], //定制服务图标


    index_banners: [], //首页banner
    opt_inner_banners: [], //内页 banner

    list_channel: [], //分类数据

    opt_honor_images: [], //资质荣誉
    opt_news_cate: [], //新闻分类
    opt_companyProfile_hezuo: [], //简介页面合作
    opt_companyProfile_school: [], //简介页面学校
    opt_companyProfile_friend_link: [], //简介页面友情链接

    appId: "",
    //登录相关
    token: "",
    user_id: 0,
    baseInfo: {}, //基本信息:包含昵称 姓名 性别 居住地
    is_login: false, //是否登录
    is_common: true, //是否普通用户

    list_brand: [], //分类信息

    kefu_qq: [], //客服qq
    kefu_weixin: [], //客服qq
    kefu_phone: [], //客服qq

    footer_nav: [], //底部导航
    webConfig: {}, //站点设置

    shopcart_count: 0,

    if_calc_yunfei: false, //是否需要计算运费
    default_address: {}, //默认收货地址
    store_keyword: {},

    active_news_right_id: "",
  },

  getters: {},

  mutations: {
    //设置数据
    set_vuex_data(state, opt) {
      // //console.log('set_vuex_data',opt)
      let { key, val } = opt;
      state[key] = val;
    },

    savePass(state, data) {
      localStorage.setItem("phone", data.phone);
      localStorage.setItem("password", data.password);
    },

    set_header_theme(state, data) {
      state.header_theme = data;
    },

    change_store_keyword(state, val) {
      state.store_keyword = {
        time: new Date().getTime(),
        keyword: val,
      };
    },

    set_list_channel(state, value) {
      value.forEach((v) => {
        if (v.id == 628) {
          v.is_youhuiqu = true;
        }
      });
      state.list_channel = value;
    },

    //底部导航
    set_webConfig(state, data) {
      var info = {
        //
        ...data,
        hotLine: data.com_kefu,
        hotLine2: data.com_phone,
        email: data.com_email,
        address: data.com_address,
        beian: data.com_beian,
        qrcode_gongzhonghao: data.qrcode_gongzhonghao,
        // pdt_max_num: data.pdt_max_num,
        // beian_en: 'Copyright@2003-2020 Bioswamp Life Scienc',
      };

      state.show_nav_jingxiao = 1 || data.show_nav_jingxiao;//是否展示授权经销商页面

      state.pdt_max_num = data.pdt_max_num; //低于该数量 展示产品列表  多余数量 展示产品表格
      state.webConfig = info;
    },

    //设置购物车商品数量
    set_shopcart_count(state, value) {
      //console.log("设置购物车商品数量", value);
      state.shopcart_count = value;
    },

    //清空登录信息
    clear_loginInfo(state) {
      state.shopcart_count = "0";
      state.token = "";
      state.user_id = "";
      state.baseInfo = {};
      state.is_login = false;
      localStorage.clear();
    },

    //改变meta
    CHANGE_META_INFO(state, metaInfo) {
      state.metaInfo = metaInfo;
    },

    //设置基本信息
    set_baseInfo(state, data) {
      // //console.log("设置用户信息", { ...data });
      let { token, user_id, level, level_rules } = data;

      state.is_login = true;
      state.token = token;
      state.user_id = user_id;

      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user_id);

      if (level_rules) {
        //处理
        let curr_level = level_rules.find((v) => v.title == level) || {};
        let level_id = curr_level.id || "";

        data = {
          ...data,
          phone: data.username,
          name: data.name || "未设置",
          yue: data.money || 0, //余额
          jifen: +data.jifen || 0, //积分
          yongjin: +data.money || 0, //佣金

          yongjin_leiji: +data.earn || 0, //佣金累计

          level_title: level || "", //会员级别
          level_id: level_id || "", //会员级别
          curr_level: curr_level, //当前级别
        };
      }

      state.baseInfo = data;
      localStorage.setItem("baseInfo", JSON.stringify(data));
    },

    set_is_login(state, value) {
      // //console.log("--------------- 用户是否登录 ---------------", value);
      state.is_login = value;
    },
  },

  actions: {
    async appInit({ commit, state, dispatch }, data) {
      dispatch("appInitGetAssets");

      let token = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");
      if (token && user_id) {
        commit("set_is_login", true);
        dispatch("getUserloginedInfo");
        //console.log("======== 用户已登录 ========");
      } else {
        commit("set_is_login", false);
        //console.log("======== 用户未登录 ========");
      }
    },

    //获取登录后的信息
    async getUserloginedInfo({ commit, state, dispatch }, data) {
      dispatch("getUserInfo");

      //获取购物车数量
      api("gouwuche_lists").then((res) => {
        let { code, data } = res;
        if (code == 1) {
          let count = 0;
          data.forEach((v) => {
            count += v.num * 1;
          });

          commit("set_shopcart_count", count);
        }
      });
    },

    //初始化资源
    async appInitGetAssets({ commit, state, dispatch }, data) {
      //网站配置信息
      api("index_config").then((res) => {
        // //console.log("index_conf", res);
        let { code, data } = res;
        if (code == 1) {
          commit("set_webConfig", data); //

          // commit("set_vuex_data", {
          //   key: "hotSearchWords",
          //   val: data.reci,
          // });
        }
      });

      //首页数据接口 banner 图配置
      api("index_index", {
        position: 1, //1pc 2 h5 3小程序
      }).then((res) => {
        let { code, data } = res;
        if (code == 1) {
          let { banners, adverts } = data;

          //首页轮播
          commit("set_vuex_data", {
            key: "index_banners",
            val: banners,
          });

          //内页banners
          commit("set_vuex_data", {
            key: "opt_inner_banners",
            val: adverts[0].images,
          });
          //内页banners
          commit("set_vuex_data", {
            key: "study_index_banners",
            val: adverts[1].images,
          });
          commit("set_vuex_data", {
            key: "hotSearchWords",
            val: adverts[3].images,
          });

          commit("set_vuex_data", {
            key: "serviceIcons",
            val: adverts[4].images,
          });
        }
      });

      //产品分类
      api("product_channel").then((res) => {
        let { code, data } = res;
        if (code == 1) {
          // commit("set_list_channel", data);

          let root_chanpin_route = "/productCates?id=";
          // let root_haocai_route = '/productApparatusesCates?id=';
          let root_haocai_route = "/productCates?id=";

          //所有产品 1层
          let product_cates_all = [];

          let res_chanpin = res.data[1];
          let res_haocai = res.data[0];
          res_haocai.plistId = 2;
          res_haocai.is_show = 1;



          //仪器耗材
          let haocai_cates_all = [];
          let haocai_cates = res_haocai.channels.filter(v => v.is_show) || [];

          if (haocai_cates) {
            haocai_cates.forEach((level1) => {
              level1.is_show = 1;

              let view_type = level1.plistId;
              level1.view_type = view_type;//列表展示模式 1 图 + 信息    2 表格形式
              level1.route = root_haocai_route + level1.id;
              haocai_cates_all.push({
                ...level1,
              });

              let level2_list = level1.channels.filter(v => v.is_show || 1)
              if (level2_list.length) {
                level2_list.forEach((level2) => {
                  level2.is_show = 1;

                  level2.route = root_haocai_route + level2.id;
                  level2.view_type = view_type;//列表展示模式 1 图 + 信息    2 表格形式

                  haocai_cates_all.push({
                    ...level2,
                  });

                  let level3_list = level2.channels.filter(v => v.is_show || 1)
                  if (level3_list.length) {
                    level3_list.forEach((level3) => {
                      level3.is_show = 1;

                      level3.route = root_haocai_route + level3.id;
                      level3.view_type = view_type;//列表展示模式 1 图 + 信息    2 表格形式

                      haocai_cates_all.push({
                        ...level3,
                      });
                    });
                  }
                });
              }
            });
          }


          let product_id_map = {};
          //产品分类
          let chanpin_cates = res_chanpin.channels;
          let list_cates_level1 = []
          if (chanpin_cates) {
            let cate_haocai_index = chanpin_cates.findIndex((v) => v.id == 863);
            let cate_haocai = chanpin_cates.find((v) => v.id == 863);
            //修改子分类
            //修改id
            // cate_haocai = {
            //   ...res_haocai
            // }
            // cate_haocai.channels = res_haocai.channels;
            // cate_haocai.id = res_haocai.id;

            //替换仪器耗材分类
            chanpin_cates.splice(cate_haocai_index, 1, res_haocai);


            list_cates_level1 = chanpin_cates.filter(v => v.is_show);
            //console.log('产品分类信息', list_cates_level1)

            list_cates_level1.forEach((level1) => {
              let view_type = level1.plistId;

              level1.level = "1";
              level1.view_type = view_type;//列表展示模式 1 图 + 信息    2 表格形式
              level1.route = root_chanpin_route + level1.id;
              level1.ids = [level1.id];
              product_id_map[level1.id] = level1.title;

              product_cates_all.push({
                ...level1,
              });


              // if(level1.id == 862) {
              //   debugger
              // }

              let list_cates_level2 = level1.channels//.filter(v => v.is_show || 1);
              if (list_cates_level2.length) {
                list_cates_level2.forEach((level2) => {
                  level2.is_show = 1;

                  level2.level = "2";
                  level2.view_type = view_type;
                  level2.route = root_chanpin_route + level2.id;
                  level2.ids = [level1.id, level2.id];
                  product_id_map[level2.id] = level2.title;

                  product_cates_all.push({
                    ...level2,
                  });


                  let list_cates_level3 = level2.channels//.filter(v => v.is_show || 1);
                  if (list_cates_level3.length) {
                    list_cates_level3.forEach((level3) => {
                      level3.is_show = 1;
                      level3.level = "3";
                      level3.view_type = view_type;
                      level3.route = root_chanpin_route + level3.id;
                      level3.ids = [level1.id, level2.id, level3.id];
                      product_id_map[level3.id] = level3.title;

                      product_cates_all.push({
                        ...level3,
                      });
                    });
                  }
                });
              }
            });
          }


          //console.log('产品分类', list_cates_level1)

          // return 

          //仪器耗材
          commit("set_vuex_data", {
            key: "haocai_cates",
            val: haocai_cates,
          });
          commit("set_vuex_data", {
            key: "haocai_cates_all",
            val: haocai_cates_all,
          });

          //  产品分类
          // let product_cates_filters = res.data[1].channels.filter(v => v.is_show);
          commit("set_vuex_data", {
            key: "product_cates",
            val: list_cates_level1,
          });

          commit("set_vuex_data", {
            key: "product_cates_all",
            val: product_cates_all,
          });

          //产品id 标题对照
          // //console.table( product_id_map)

          commit("set_vuex_data", {
            key: "product_id_map",
            val: product_id_map,
          });

          // //console.log("store product_cates ", state.product_cates);
          // //console.log("store product_cates_all ", state.product_cates_all);
          // //console.log("store haocai_cates", state.haocai_cates);
        }
      });

      //专题列表
      api("brand_topics", {}).then((res) => {
        let { code, data } = res;
        if (code == 1) {
          // let { banners, adverts } = data;
          let zhuanti_cates = res.data;
          zhuanti_cates.forEach((level1) => {
            level1.route = "/productArticle/" + level1.id;
          });

          // //首页轮播
          commit("set_vuex_data", {
            key: "zhuanti_cates",
            val: zhuanti_cates,
          });
          commit("set_vuex_data", {
            key: "first_zhuanti_route",
            val: "/productArticle/" + zhuanti_cates[0].id,
          });
        }
      });

      //产品分类 产品领域
      // api("brand_index").then((res) => {
      //   let { code, data } = res;
      //   if (code == 1) {
      //     let lingyu_cates = res.data.domain || [];

      //     var lingyu_cates_all = [];
      //     if (lingyu_cates.length) {
      //       var routePrefix = "/productField?id=";
      //       lingyu_cates.forEach((level1) => {
      //         level1.id = level1.domain_id;
      //         level1.level = "1";
      //         level1.route = routePrefix + level1.id;
      //         level1.ids = [level1.id];
      //         lingyu_cates_all.push({
      //           ...level1,
      //         });
      //         if (level1.channels.length) {
      //           level1.channels.forEach((level2) => {
      //             level2.id = level2.domain_id;
      //             level2.level = "2";
      //             level2.route = routePrefix + level2.id;
      //             level2.ids = [level1.id, level2.id];
      //             lingyu_cates_all.push({
      //               ...level2,
      //             });

      //             if (level2.channels.length) {
      //               level2.channels.forEach((level3) => {
      //                 level3.id = level3.domain_id;
      //                 level3.level = "3";
      //                 level3.route = routePrefix + level3.id;
      //                 level3.ids = [level1.id, level2.id, level3.id];
      //                 lingyu_cates_all.push({
      //                   ...level3,
      //                 });
      //               });
      //             }
      //           });
      //         }
      //       });
      //     }

      //     //研究领域
      //     commit("set_vuex_data", {
      //       key: "lingyu_cates",
      //       val: lingyu_cates,
      //     });

      //     //研究领域
      //     commit("set_vuex_data", {
      //       key: "lingyu_cates_all",
      //       val: lingyu_cates_all,
      //     });
      //   }
      // });

      //产品分类 产品领域
      api("brand_brandChannel").then((res) => {
        let { code, data } = res;
        if (code == 1) {
          // //console.log("产品领域分类", res);

          let lingyu_cates = res.data || [];

          var lingyu_cates_all = [];
          if (lingyu_cates.length) {
            var routePrefix = "/productField?id=";
            lingyu_cates.forEach((level1) => {
              level1.level = "1";
              level1.route = routePrefix + level1.id;
              level1.ids = [level1.id];
              lingyu_cates_all.push({
                ...level1,
              });
              if (level1.channels.length) {
                level1.channels.forEach((level2) => {
                  level2.level = "2";
                  level2.route = routePrefix + level2.id;
                  level2.ids = [level1.id, level2.id];
                  lingyu_cates_all.push({
                    ...level2,
                  });

                  if (level2.channels.length) {
                    level2.channels.forEach((level3) => {
                      level3.level = "3";
                      level3.route = routePrefix + level3.id;
                      level3.ids = [level1.id, level2.id, level3.id];
                      lingyu_cates_all.push({
                        ...level3,
                      });
                    });
                  }
                });
              }
            });
          }

          //研究领域
          commit("set_vuex_data", {
            key: "lingyu_cates",
            val: lingyu_cates,
          });

          //研究领域
          commit("set_vuex_data", {
            key: "lingyu_cates_all",
            val: lingyu_cates_all,
          });
        }
      });

      api("brand_studyChannel").then((res) => {
        // //console.log("产品中心分类", res);

        let study_cates = res.data;
        let study_cates_all = [];

        if (study_cates.length) {
          study_cates.forEach((level1) => {
            let title = level1.title;
            let type = level1.type;

            // let routeMap = {
            //   在线课堂: "/technologyOnline?id=",
            //   前沿科技: "/technologyOnline?id=",
            //   热门靶点: "/technologyOnline?id=",
            //   技术专题: "/technologyResearch?id=",
            //   资料下载: "/technologyDownload?id=",
            // };
            // var route = routeMap[title];

            //类型：0-视频  1-图文 2-下载链接
            let routeMap = {
              // 0: "/technologyOnline?id=",
              // 1: "/technologyResearch?id=",
              // 2: "/technologyDownload?id=",

              0: "/technologyCenter?type=technologyOnline&id=",
              1: "/technologyCenter?type=technologyResearch&id=",
              2: "/technologyCenter?type=technologyDownload&id=",
            };
            var route = routeMap[type];

            level1.level = "1";
            level1.route = route + level1.id;
            level1.ids = [level1.id];
            study_cates_all.push({
              ...level1,
            });
            if (level1.channels.length) {
              level1.channels.forEach((level2) => {
                level2.level = "2";
                level2.route = route + level2.id;
                level2.ids = [level1.id, level2.id];

                study_cates_all.push({
                  ...level2,
                });

                if (level2.channels.length) {
                  level2.channels.forEach((level3) => {
                    level3.level = "3";
                    level3.route = route + level3.id;
                    level3.ids = [level1.id, level2.id, level3.id];
                    study_cates_all.push({
                      ...level3,
                      route: route + level3.id,
                    });
                  });
                }
              });
            }
          });
        }

        // debugger;

        commit("set_vuex_data", {
          key: "study_cates",
          val: study_cates,
        });

        commit("set_vuex_data", {
          key: "study_cates_all",
          val: study_cates_all,
        });

        // //console.log('学习中心分类 study_cates', study_cates)
        // //console.log("学习中心分类 study_cates_all", study_cates_all);
      });

      //技术服务分类
      api("skill_channel", {
        language: state.lang,
      }).then((res) => {
        let { code, data } = res;
        if (code == 1) {
          commit("set_vuex_data", {
            key: "service_cates",
            val: res.data,
          });

          let child_tech_service = [];
          res.data.forEach((v) => {
            let first_id = "";
            if (v.skill && v.skill.length) {
              first_id = v.skill[0].skill_id;
            }
            v.route = "/technologyService/" + first_id; //分类默认路由

            if (v.skill) {
              v.skill.forEach((sub) => {
                sub.id = sub.skill_id;
                sub.route = "/technologyService/" + sub.skill_id;

                sub.root_id = v.id;
                sub.route_title = v.title;
                sub.root_route = v.route;
              });

              v.child = v.skill;
            }

            child_tech_service.push({
              ...v,
              route: v.route,
            });
          });

          commit("set_vuex_data", {
            key: "child_tech_service",
            val: child_tech_service,
          });
        }
      });

      //新闻分类
      api("index_newsChannel", {
        channel_id: state.news_parent_id,
      }).then((res) => {
        // //console.log("新闻分类", res);
        let { code, data } = res;
        if (code == 1) {
          let opt = data;
          // let default_cate = data[0] || {};
          //修改默认分类为 新闻大分类
          let default_cate = {
            id: 29,
            originalPic: "",
            title: "新闻中心",
          };

          data.forEach((level1) => {
            level1.route = "/news/" + level1.id;
          });

          // debugger
          commit("set_vuex_data", {
            key: "default_news_cate_id",
            val: default_cate.id,
          });
          commit("set_vuex_data", {
            key: "opt_news_cate",
            val: opt,
          });

          // debugger
          commit("set_vuex_data", {
            key: "news_cates",
            val: data,
          });
        }
      });
    },

    // 获取用户信息
    async getUserInfo({ commit, state, dispatch }) {
      api("users_userInfo").then((res) => {
        // //console.log("动态获取用户信息", res);
        let { code, data, message } = res;
        // debugger
        if (code == 1) {
          commit("set_is_login", true);
          commit("set_baseInfo", data);
        } else {
          commit("set_is_login", false);
        }
      });
    },
  },
});
