import Vue from "vue";
import axios from "axios";
import store from "@/store";
import router from "@/router";

import needAuthApiNames from "@/store/needAuthApiNames.js";
import ApiList from "@/shop-api/ApiList.js";


let needAuthApi = needAuthApiNames.needAuthApiList.map((item) => item.api); //需要用户登录授权的接口
let ApiList_successActionTip = ApiList.ApiList.filter((v) => v.successActionTip).map((v) => v.api); //接口操作成功后需要展示提示的接口
let ApiList_failActionTip = ApiList.ApiList.filter((v) => v.failActionTip).map((v) => v.api); //接口操作失败后需要展示提示的接口

// //console.log("接口操作成功后需要展示提示的接口 ApiList_successActionTip", ApiList_successActionTip);
// //console.log("接口操作失败后需要展示提示的接口 ApiList_failActionTip", ApiList_failActionTip);

//设置axios为form-data
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
// axios.defaults.headers.get["Content-Type"] = "application/x-www-form-urlencoded";
// axios.defaults.transformRequest = [
//     function (data) {
//         let ret = "";
//         for (let it in data) {
//             ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
//         }
//         return ret;
//     },
// ];

// 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//   let req = config.data;
//   // debugger
//   let operateNeedLogin_actions = ['hospital_fork'];//需要登录的操作
//   if((typeof req.user_id != 'undefined' && !req.user_id)

//   // && (typeof req.token != 'undefined' && !req.token)

//   ){
//     //console.log('此操作需要授权， 当前用户未没有登录')

//     alert('请先登录');
//     store.commit('clear_loginInfo')

//     router.push({
//       path: "/login",
//       query: {
//         mode: "noLogin",
//       },
//     });

//     return Promise.reject(config);
//   }

//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    let req = config.data;
    if (!req) {
      return false;
    }

    let currApiName = req.action; //当前接口名称
    let currRoute = router.history.current; //当前路由
    let token = localStorage.getItem("token");

    if (req._no_tip) {
      // debugger
      // delete req._no_tip
    }
    // //console.log('接口数据拦截', req)

    // let currRouteNeedAuth = currRoute.meta ? currRoute.meta.requireAuth : false; //当前路由是否需要授权
    // //console.log("当前路由是否需要授权 currRouteNeedAuth = ", currRouteNeedAuth);
    // //console.log("当前接口名称 currRouteNeedAuth = ", currRouteNeedAuth);

    // 跳转登录： 当前接口需要登录
    if (!token && needAuthApi.includes(currApiName)) {
      alertErr("请您先登录");
      store.commit("clear_loginInfo");

      // let is_wx_auth = true; //是否微信授权登录项目
      if (!store.state.is_weChat_auth) {
        let fullPath_encode = encodeURIComponent(currRoute.fullPath);


        //开发时需取消注释
        // router.push({
        //   path: "/login",
        //   query: {
        //     fullPath: fullPath_encode,
        //   },
        // });
      } else {
        store.commit("set_weixinReAuth", new Date().getTime());
      }

      // debugger;
      // return config;
      return Promise.reject(config);
    }

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (res) {
    let data = res.data;

    // debugger
    if (data && (data.code == 2 || data.code == -1 || data.code == -2)) {
      //微信授权项目 重新微信授权
      //非微信授权登录项目  跳转登录页
      if (store.state.is_weChat_auth) {
        data.message = "登录过期或未登录，请您先登录";
        store.commit("clear_loginInfo"); //清除登录数据
      } else {
        data.message = "登录过期或未登录，请您先登录";
        store.commit("clear_loginInfo"); //清除登录数据


                //开发时需取消注释
        // router.push({
        //   path: "/login",
        //   query: {
        //     mode: "noLogin",
        //   },
        // });
      }
    } else if (data && data.code == 0) {
      //操作失败提示
      let is_upload = res.config.data instanceof FormData;
      let actionStr = "";
      let actionName = "";
      if (is_upload) {
        actionStr = "";
        actionName = "index_upload";
      } else {
        actionStr = res.config.data.split("&").find((v) => v.includes("action"));
        actionName = actionStr.split("=")[1];
      }

      if (actionName) {
        if (ApiList_failActionTip.includes(actionName)) {
          alertErr(res.data.message);
        }
      }
    } else if (data && data.code == 1) {
      //操作成功提示
      let is_upload = res.config.data instanceof FormData;
      let actionStr = "";
      let actionName = "";
      let _no_tip_str = "";
      let _no_tip = "";

      if (is_upload) {
        actionStr = "";
        actionName = "index_upload";
      } else {
        let arr_params = res.config.data.split("&");
        actionStr = arr_params.find((v) => v.includes("action"));
        actionName = actionStr.split("=")[1];

        _no_tip_str = arr_params.find((v) => v.includes("_no_tip"));
        if (_no_tip_str) {
          _no_tip = _no_tip_str.split("=")[1];
        }
        // //console.log("操作成功提示 _no_tip", _no_tip);
      }

      if (actionName) {
        if (ApiList_successActionTip.includes(actionName) && _no_tip != 1) {
          alertSucc(res.data.message || "操作成功");
        }
      }
    }

    return data;
  },
  function (error) {
    //console.log("-------------- axios拦截 error----------------");
  }
);

const isZhiShang = true; //是否为知商系统

function api(action, data, method, uploaderConfig) {
  let reqUrl = "/api/service.php"; //请求地址
  let reqMethod = method ? method.toLowerCase() : "post"; //请求方式
  let reqData = {
    action: action,
    com_id: 888,
    user_id: localStorage.getItem("user_id") || "",
    token: localStorage.getItem("token") || "",

    ...data,
  }; //请求数据

  //如果是知商系统
  // if (isZhiShang) {
  //   let is_xianshang = location.host.includes("swamp");
  //   if (process.env.NODE_ENV !== "production") {
  //     reqUrl = "/api/service.php";
  //   } else {
  //     if (is_xianshang) {
  //       //线上
  //       reqUrl = "https://admin.bio-swamp.com/service.php";
  //     } else {
  //       //渲染打包用
  //       reqUrl = "/api/service.php";
  //     }
  //   }
  //   reqData.action = url;
  // }


  if (process.env.NODE_ENV !== "production") {
      reqUrl = "/api/service.php";
  } else {
      reqUrl = "https://admin.bio-swamp.com/service.php";
  }

  // debugger
  //axios 配置信息
  //普通请求 使用 x-www 格式
  //上传文件时  使用 formdata
  let otherConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    transformRequest: uploaderConfig
      ? []
      : [
          function (data) {
            let ret = "";
            for (let it in data) {
              ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
            }
            return ret;
          },
        ],
  };

  if (reqMethod == "get") {
    return axios({
      url: reqUrl,
      method: reqMethod,
      params: reqData,
      ...otherConfig,
      ...uploaderConfig,
    });
  } else if (reqMethod == "post") {
    return axios({
      url: reqUrl,
      method: reqMethod,
      data: uploaderConfig ? data : reqData,
      ...otherConfig,
      ...uploaderConfig,
    });
  }
}

// function api(url, data, method) {
//     // debugger

//     // let url = "http://jipinhui.nmgyzwc.com/service.php";
//     let reqUrl = "api/" + url;//请求地址
//     let reqMethod = method || "post";//请求方式
//     let reqData = { comId, ...data };//请求数据
//     if (process.env.NODE_ENV !== "production") {
//         reqUrl = "api/" + url;
//     } else {
//         reqUrl = "api/" + url;
//     }

//     if (reqMethod == "get") {
//         return axios({
//             url: reqUrl,
//             method: reqMethod,
//             params: reqData,
//         });
//     } else if (reqMethod == "post") {
//         return axios({
//             url: reqUrl,
//             method: reqMethod,
//             data: reqData,
//         });
//     }
// }

//api('login', {}, 'get')
//api('login', {}, 'post')

Vue.prototype.$axios = axios;
Vue.prototype.$api = api;

export default {
  api,
};
