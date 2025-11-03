import router from "@/router";
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeBannerIndex: 0,
      //上传接口字段
      upload_col_name: "file",
      //上传相关
      uploadAction: process.env.NODE_ENV !== "production" ? "/api/service.php" : "https://admin.bio-swamp.com/service.php",
    };
  },
  computed: {
    ...mapState([
      //
      "lang",
      "webConfig",
      "com_id",
      "user_id",
      "token",
      "is_login",
      "show_nav_jingxiao",//是否展示导航栏经销商

      "product_cates", //产品分类 带子级
      "product_cates_all", //产品分类  一层
      "haocai_cates", //实验耗材分类
      "haocai_cates_all", //耗材分类 一层
      "lingyu_cates", //领域分类
      "lingyu_cates_all", //所有领域 一层
      "zhuanti_cates", //专题
      "first_zhuanti_route", //专题链接
      "study_cates", //学习中心分类
      "study_cates_all", //学习中心分类 一层

      "pdt_max_num", // 产品展示形式区间值
      "invite_jifen", // 邀请获得积分

      "service_cates", //定制服务分类
      "child_tech_service", //定制服务分类
      "default_news_cate_id", //新闻分类
      "opt_news_cate", //新闻分类
      "news_cates", //新闻分类

      "opt_inner_banners", //内页banner
      "baseInfo",
      "defaultAvatar",

      "default_address",
      "pageScrollTopMap",
      "company_title",
      "company_title_en",
      "company_detail_id",
      "shopcart_count",
      // //新的产品中心分类导航数据
      // "newProductNavList",
      // //新的产品中心中的其他分类导航数据
      // "newProductOtherNavList",
    ]),
    myAvatar() {
      return this.baseInfo.user_image || this.defaultAvatar;
    },
    uploadExtraData() {
      let data = {
        action: "index_ossupload",
        com_id: this.com_id,
        user_id: localStorage.getItem("user_id") || "",
        token: localStorage.getItem("token") || "",
      };
      return data;
    },
  },

  filters: {
    f_guige(str) {
      let ret = str;
      if (str == "" || str == "无" || str == "默认") {
        ret = "默认";
      }
      return ret;
    },
  },
  created() {},
  mounted() {},
  destroyed() {},

  methods: {
    changePage(page) {
      if (this.pagination && this.pagination.page) {
        this.pagination.page = page;
        this.setView();
        document.documentElement.scrollTop = 0;
      }
    },

    mix_logout() {
      this.$store.commit("clear_loginInfo");
      alertSucc("已退出登录");
      this.$router.push("/");
    },

    mix_userinfo_query() {
      this.$store.dispatch("getUserInfo");
    },

    toProductSearchPage(option) {
      this.$router.push({
        path: "/productSearch",
        query: {
          keyword: option.keyword,
          id: option.id,
        },
      });
    },

    //用户头像
    getAvatar() {
      return this.baseInfo.user_image || this.defaultAvatar;
    },

    toBack() {
      this.$router.back();
    },
    toLink(item) {
      if (item.url) {
        location.href = item.url;
      }
    },
    toRoute(route) {
      this.$router.push(route);
    },

    //打开弹窗
    mix_openModal(refName, data) {
      // debugger
      this.$refs[refName].init(data);
    },

    //商品详情页
    mix_to_goods(item) {
      let { inventoryId, id } = item;
      if (inventoryId) {
        this.$router.push(`/goodsDetail/${inventoryId}`);
      } else if (id) {
        this.$router.push(`/goodsDetail/${id}`);
      }
    },

    userLogin() {
      let is_wx_auth = true; //是否微信授权登录项目
      if (!is_wx_auth) {
        this.toRoute("/login");
      } else {
        this.$store.commit("set_weixinReAuth", new Date().getTime());
      }
    },

    // 购物车 —— 购物车商品列表
    mix_shopcart_get_list(callback) {
      this.$api("gouwuche_lists").then((res) => {
        let { code, data } = res;
        if (code == 1) {
          let count = 0;
          data.forEach((v) => {
            count += v.num * 1;
          });

          if (callback) {
            callback(data);
          }

          this.$store.commit("set_shopcart_count", count);
        }
      });
    },

    /**
     * 
     * @param {*} params 
     * 
     * 
     * 
     * this.mix_shopcart_add_goods({
        inventoryId: item.inventoryId,
        add_num: 1,
      });

     */
    // 购物车添加商品
    mix_shopcart_add_goods(params) {
      let { inventoryId, add_num, kucun } = params;
      if (!inventoryId) {
        alertErr("请选择商品规格！");
        return;
      }
      if (add_num > kucun) {
        alertErr("当前商品库存不足！");
        return;
      }
      this.$api("gouwuche_add", {
        inventoryId: inventoryId,
        num: add_num,
      }).then((res) => {
        let { code, count } = res;
        if (code == 1) {
          this.mix_shopcart_update_count(count);
        }
      });
    },

    //购物车添加
    shoppingCartAdd(params) {
      let { num, kucun } = params;
      if (num > kucun) {
        alertErr("当前商品库存不足！");
        return;
      }
      this.$api("gouwuche_add", params).then((res) => {
        let { code, data, message, count } = res;
        alert(res);
        if (code == 1) {
          this.$store.commit("set_shopcart_count", count);
        }
      });
    },

    //购物车删除商品
    mix_shopcart_delete(ids, callback) {
      this.$api("gouwuche_del", {
        inventoryId: ids,
        _no_tip: this.$route.name == "orderCreate" ? 1 : 0,
      }).then((res) => {
        let { code, count } = res;
        if (code == 1) {
          this.mix_shopcart_update_count(count);

          if (this.list_shopcart) {
            let arr_id = (ids + "").split(",");
            arr_id.forEach((inventoryId) => {
              let index = this.list_shopcart.findIndex((v) => v.inventoryId == inventoryId);
              this.list_shopcart.splice(index, 1);
            });
          }
        }
      });
    },
    //购物车删除商品
    mix_shopcart_update(item, callback) {
      let { inventoryId, num } = item;
      this.$api("gouwuche_updateNum", {
        inventoryId,
        num,
      }).then((res) => {
        let { code, count } = res;
        if (code == 1) {
          this.mix_shopcart_update_count(count);

          let index = this.list_shopcart.findIndex((v) => v.inventoryId == inventoryId);
          this.list_shopcart.splice(index, 1, item);
        }
      });
    },
    //购物车删除商品
    mix_shopcart_clear() {
      if (!this.list_shopcart.length) {
        alertErr("购物车是空的！");
        return;
      }

      this.$api("gouwuche_delAll").then((res) => {
        let { code, count } = res;
        if (code == 1) {
          this.mix_shopcart_update_count(count);
          this.list_shopcart = [];
        }
      });
    },

    //购物车修改数量
    mix_shopcart_update_count(count) {
      this.$store.commit("set_shopcart_count", count);
    },

    // 用户地址
    mix_address_list() {
      this.$api("userAddress_lists").then((res) => {
        let { code, data } = res;
        if (code == 1) {
          this.list_address = data;
          let obj = data.find((v) => v.if_default) || {};

          this.$store.commit("set_vuex_data", {
            key: "default_address",
            val: obj,
          });
        }
      });
    },

    //地址 —— 删除地址
    mix_address_delete() {},
    //地址 —— 设置默认地址
    mix_address_set_default(item, callback) {
      let address_id = item.id;
      this.$api("userAddress_setDefault", {
        id: address_id,
      }).then((res) => {
        let { code, data, message } = res;
        alert(res);
        if (code == 1) {
          this.$store.commit("set_vuex_data", {
            key: "default_address",
            val: item,
          });

          if (callback) {
            callback();
          }
        }
      });
    },

    // 优惠券  展示信息格式化
    mix_format_list_coupon(list = []) {
      let list_coupon = list.map((item) => ({
        ...item,
        miaoshu: item.man ? `满${item.man}元` : `下单立减${item.money}元`,
        youxiaoqi: item.startTime + " - " + item.endTime,
      }));

      return list_coupon;
    },

    //优惠券领取
    coupon_pick(item) {
      this.$api("users_yhqLingqu", {
        id: item.id,
      }).then((res) => {
        let { code, message } = res;
        alert(res);
        if (this.$route.name == "goodsDetail") {
          this.show_coupon = false;
        }
      });
    },

    //订单
    //订单详情
    mix_order_detail(order_id, callback) {
      this.$api("orders_detail", {
        id: order_id,
      }).then((res) => {
        let { code, data, message } = res;
        if (code == 1) {
          data.actions = this.getOrderActionsByStatus({
            ...data,
          });

          if (callback) {
            callback(data);
          }
        }
      });
    },

    //订单取消
    mix_order_cancel(order_id, callback) {
      this.$api("orders_qxOrder", {
        order_id: order_id,
      }).then((res) => {
        let { code, data, message } = res;
        if (code == 1) {
          if (callback) {
            callback();
          }
        }
      });
    },

    //订单删除
    mix_order_delete(order_id, callback) {
      this.$api("orders_del", {
        order_id: order_id,
      }).then((res) => {
        let { code, data, message } = res;
        if (code == 1) {
          if (callback) {
            callback();
          }
        }
      });
    },

    //订单确认收货
    mix_order_qianshou(order_id, callback) {
      this.$api("orders_qrshouhuo", {
        orderId: order_id,
      }).then((res) => {
        let { code, data, message } = res;
        if (code == 1) {
          if (callback) {
            callback();
          }
        }
      });
    },

    //订单详情页
    mix_order_detail_link(order_id) {
      this.toRoute(`/orderDetail?order_id=${order_id}`);
    },
    //订单去支付
    mix_order_payment_link(order_id) {
      this.toRoute(`/orderPaymentMethod?order_id=${order_id}`);
    },
    //订单去评价
    mix_order_review_link(order_id) {
      this.toRoute(`/orderReview?order_id=${order_id}`);
    },
    //订单去售后
    mix_order_refund_link(order_id) {
      this.toRoute(`/orderRefund?order_id=${order_id}`);
    },

    //上传文件
    mix_fileUpload(params) {
      //console.log("文件上传 mix_uploadFileApi");
      const formData = new FormData();
      formData.append("action", "index_upload");
      formData.append("com_id", this.com_id);
      formData.append("user_id", localStorage.getItem("user_id"));
      formData.append("token", localStorage.getItem("token"));
      formData.append("img", params.file);
      formData.append("if_touxiang", params.if_touxiang || "");

      const uploaderConfig = {
        headers: {
          "Content-Type": "multipart/form-data;boundary=" + new Date().getTime(),
        },
      };
      return this.$api("index_upload", formData, "post", uploaderConfig);
    },

    //banner 跳转
    mix_banner_click(item) {
      //console.log(" bannerClick item", { ...item });
      let { url, inventory_id, channel_id } = item;
      // return
      if (url) {
        location.href = url;
      } else if (inventory_id) {
        this.toRoute(`/goodsDetail?id=${inventory_id}`);
      } else if (channel_id) {
        this.toRoute(`/category?id=${channel_id}`);
      }
    },

    // 自定义导航跳转
    mix_cus_nav_click(item) {
      //console.log(" indexNavClick item", { ...item });
      let { url, inventory_id, channel_id } = item;

      // return
      if (url) {
        if (url.includes("http") || url.includes(".cn") || url.includes(".com")) {
          location.href = url;
        } else {
          this.toRoute(url);
        }
      } else if (inventory_id) {
        this.toRoute(`/goodsDetail?id=${inventory_id}`);
      } else if (channel_id) {
        this.toRoute(`/category?id=${channel_id}`);
      }
    },

    //订单中的单个商品允许的操作类型
    mix_getOrderProductsAllowActions(order, product) {
      let { status } = order;

      let { ifpingjia, ifshouhou } = product;

      let allow_review = !ifpingjia && status == 4; //是否允许评价
      let allow_refund = !ifshouhou && (status == 2 || status == 3 || status == 4); //是否允许售后申请
      // let allow_logistics =  status >= 3 && order.fahuo_info?.fahuo_id; //是否允许查看物流

      // debugger

      let allow_actions = {
        allow_review,
        allow_refund,
        // allow_logistics,
      };

      return allow_actions;
    },

    //获取订单允许执行的操作
    mix_getOrderActionsByStatus(order) {
      return this.getOrderActionsByStatus(order);
    },

    //根据订单状态获取订单操作结果
    getOrderActionsByStatus(order) {
      let { status, status_info, ifpingjia } = order;
      let actions = [];
      // let actions = [
      //   { name: "取消订单",type: 'quxiao' },
      //   { name: "立即支付",type: 'zhifu' },
      //   { name: "确认收货",type: 'shouhuo' },
      //   { name: "评价订单",type: 'pingjia' },
      //   { name: "申请售后",type: 'shouhou' },
      //   { name: "删除订单",type: 'shanchu' },
      //   { name: "再次购买",type: 'goumai' },
      // ];

      if (status == -5) {
        //待支付
        if (status_info == "无效") {
          actions = [{ name: "取消订单", type: "quxiao" }];
        } else if (status_info == "待支付") {
          actions = [
            { name: "立即支付", type: "zhifu" },
            { name: "取消订单", type: "quxiao" },
          ];
        }
      } else if (status == -3) {
        //-3售后处理中
        actions = [{ name: "删除订单", type: "shanchu" }];
      } else if (status == -1) {
        //无效
        actions = [{ name: "删除订单", type: "shanchu" }];
      } else if (status == 0) {
        //0待成团
        actions = [{ name: "取消订单", type: "quxiao" }];
      } else if (status == 2) {
        //2待发货
        actions = [
          // { name: "取消订单", type: "quxiao" }
        ];
      } else if (status == 3) {
        //3待收货
        actions = [
          { name: "确认收货", type: "shouhuo" },
          { name: "查看物流", type: "wuliu" },
        ];
      } else if (status == 4) {
        //4已收货
        if (ifpingjia) {
          actions = [
            // { name: "删除订单", type: "shanchu" },
            // { name: "查看物流", type: "wuliu" },
            { name: "售后", type: "shouhou" },
          ];
        } else {
          actions = [
            // { name: "删除订单", type: "shanchu" },
            // { name: "查看物流", type: "wuliu" },
            //  { name: "评价", type: 'pingjia' },
            { name: "售后", type: "shouhou" },
          ];
        }
      }
      return actions;
    },
  },
};
