<template>
  <div id="header" class="header-box" :class="headerTheme">
    <div class="section-1">
      <div class="header-info">
        <div class="info-left">
          <img class="img-1" src="@img/icon-phone.png" alt="" />
          <span class="text-1">{{ webConfig.hotLine }}</span>
          <img class="img-2" src="@img/icon-env.png" alt="" />
          <span class="text-2">{{ webConfig.email }}</span>
        </div>
        <div class="info-right">
          <router-link v-if="!is_login" class="login" to="/login"> 登录 </router-link>
          <router-link v-else class="login" to="/userIndex">
            {{ baseInfo.username }}
          </router-link>
          <span class="divider"></span>
          <router-link v-if="!is_login" class="register" to="/register">
            注册
          </router-link>
          <a v-else class="register" href="javascript:void(0)" @click="logout"> 退出 </a>

          <router-link class="shopcart" to="/shoppingCart">
            购物车 ({{ shopcart_count || 0 }})
          </router-link>

          <router-link class="lang" to="/login">
            <img src="@img/icon-language.png" alt="" />
            简体中文
          </router-link>
        </div>
      </div>
    </div>

    <div class="section-2">
      <div class="header-inner">
        <!-- logo -->
        <div class="left">
          <div class="logo" @click="toHome">
            <img v-if="header_theme == 'transparent'" src="@img/home-logo.png" />
            <img v-else src="@img/logo.png" />
          </div>
        </div>

        <!-- 搜索 -->
        <div class="center-search-wrap" v-if="!is_page_home || header_theme == 'white'">
          <div class="center-search">
            <div class="left-select">
              <!-- <el-select v-model="selectType" placeholder="">
              <el-option v-for="item in options" :key="item.id" :label="item.title" :value="item.id"> </el-option>
            </el-select> -->

              <el-select v-model="selectCate" placeholder="">
                <el-option
                  v-for="item in options_product_cates"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>

            <div class="search-box">
              <input
                v-model="keyword"
                type="text"
                placeholder="请输入搜索关键词"
                @keyup.enter="toSearch"
                @input="handleSearchInput"
              />
              <button class="btn-search" @click="toSearch">
                <img class="img-search" src="@img/icon-search.png" alt="" />
              </button>
            </div>
          </div>

          <!-- 搜索建议 -->
          <!-- v-if="search_suggest_list.length" -->
          <div class="search-suggest-list" v-if="search_suggest_list.length">
            <div
              class="search-suggest-item"
              v-for="(item, index) in search_suggest_list"
              :key="index"
            >
              <router-link
                :to="'/goodsDetail/' + item.inventoryId"
                :alt="item.title"
                :title="item.title"
              >
                【{{ item.skuId }}】 {{ item.title }}
              </router-link>
            </div>
          </div>
        </div>

        <div class="right-nav">
          <!-- 导航区 -->
          <div class="nav-list">
            <div
              class="nav-item"
              v-for="(item, index) in opt_nav"
              :key="index"
              :class="checkClass(item)"
            >
              <!-- 无子导航 -->
              <template v-if="!item.child">
                <router-link class="nav-link" :to="item.route">
                  {{ item.title }}
                </router-link>
              </template>

              <!-- 有子导航 -->
              <template v-else>
                <template v-if="item.title == '产品中心'">
                  <router-link class="nav-link" slot="reference" :to="item.route">
                    {{ item.title }}
                  </router-link>

                  <!-- 产品分类弹窗 -->
                  <div class="pop-product-box">
                    <div class="pop-product">
                      <div class="pop-product-inner">
                        <div class="box-cate">
                          <div class="pop-product-group pop-product-group-leixing">
                            <div class="group-title">
                              <router-link to="/productCates">产品类型</router-link>
                            </div>
                            <div class="group-list group-leixing">
                              <div class="list">
                                <div
                                  class="link-item"
                                  v-for="(level1, index) in product_cates"
                                  :key="index"
                                  @mouseover="handleHoverCate(level1, index)"
                                >
                                  <router-link
                                    :to="'/productCates?id=' + level1.id"
                                    class="item"
                                    :class="{
                                      active: active_product_cate.id == level1.id,
                                    }"
                                  >
                                    {{ level1.title }}
                                  </router-link>
                                </div>
                              </div>
                              <div
                                class="list-level2"
                                v-if="active_product_cate && active_product_cate.channels"
                              >
                                <div
                                  class="item"
                                  v-for="(
                                    level2, index
                                  ) in active_product_cate.channels.filter(
                                    (v) => v.is_show
                                  )"
                                  :key="index"
                                >
                                  <router-link :to="'/productCates?id=' + level2.id">{{
                                    level2.title
                                  }}</router-link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="box-haocai">
                          <div class="pop-product-group">
                            <!-- 路由修改 /productApparatusesCates -->

                            <div class="group-title">
                              <router-link :to="'/productCates?id=855'"
                                >仪器耗材中心</router-link
                              >
                            </div>
                            <div class="group-list group-haocai">
                              <div class="list">
                                <div
                                  class="item"
                                  v-for="(level1, index) in haocai_cates"
                                  :key="index"
                                  :class="{ active: active_haocai_cate.id == level1.id }"
                                >
                                  <router-link
                                    :to="level1.route"
                                    class="item-title"
                                    @click="toggleHaocai(level1)"
                                  >
                                    {{ level1.title }}
                                  </router-link>

                                  <!-- v-if="active_haocai_cate.id == level1.id" -->
                                  <div class="sub-list">
                                    <router-link
                                      :to="level2.route"
                                      class="sub"
                                      v-for="(level2, level2_index) in level1.channels"
                                      :key="level2_index"
                                    >
                                      {{ level2.title }}
                                    </router-link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="box-zhuanti">
                          <div class="pop-product-group">
                            <div class="group-title" v-if="first_zhuanti_route">
                              <router-link :to="first_zhuanti_route"
                                >专题推荐</router-link
                              >
                            </div>
                            <div class="group-list group-zhuanti">
                              <div class="list" v-if="zhuanti_cates.length">
                                <router-link
                                  :to="item.route"
                                  class="item"
                                  v-for="(item, index) in zhuanti_cates"
                                  :key="index"
                                >
                                  {{ item.title }}
                                </router-link>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="box-lingyu">
                          <div class="pop-product-group">
                            <div class="group-title" v-if="lingyu_cates.length">
                              <router-link :to="lingyu_cates[0] && lingyu_cates[0].route"
                                >研究领域</router-link
                              >
                            </div>
                            <div class="group-list group-lingyu">
                              <div class="list" v-if="lingyu_cates.length">
                                <router-link
                                  :to="item.route"
                                  class="item"
                                  v-for="(item, index) in lingyu_cates"
                                  :key="index"
                                >
                                  {{ item.title }}
                                </router-link>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="box-wenxian">
                          <div class="pop-product-group">
                            <div class="group-title">
                              <router-link to="/productDocument"
                                >产品文献引用</router-link
                              >
                            </div>
                            <div class="group-list group-wenxian"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <!-- 产品中心结束 -->

                <!-- 技术服务 -->
                <template v-else-if="item.title == '技术服务'">
                  <el-popover
                    popper-class="w-nav-popover"
                    placement="top"
                    title=""
                    width=""
                    trigger="hover"
                    content=""
                  >
                    <router-link slot="reference" class="nav-link" :to="item.route">
                      {{ item.title }}
                    </router-link>
                    <div class="pop-child" v-if="item.child">
                      <router-link
                        :to="sub.route"
                        class="child-item service-child-item"
                        v-for="(sub, index) in item.child"
                        :key="index"
                      >
                        <span>
                          {{ sub.title }}
                        </span>
                        <div class="service-child-box">
                          <div class="service-child-inner">
                            <router-link
                              :to="son.route"
                              class="child-item"
                              v-for="(son, son_index) in sub.child"
                              :key="son_index"
                            >
                              {{ son.title }}
                            </router-link>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </el-popover>
                </template>
                <!-- 技术服务结束 -->

                <!-- 其他子分类导航 -->
                <template v-else>
                  <el-popover
                    popper-class="w-nav-popover"
                    placement="top"
                    title=""
                    width="150"
                    trigger="hover"
                    content=""
                  >
                    <router-link slot="reference" class="nav-link" :to="item.route">
                      {{ item.title }}
                    </router-link>

                    <div class="pop-child" v-if="item.child">
                      <router-link
                        :to="sub.route"
                        class="child-item"
                        v-for="(sub, index) in item.child"
                        :key="index"
                      >
                        {{ sub.title }}
                      </router-link>
                    </div>
                  </el-popover>
                </template>
                <!-- 其他子分类导航 结束 -->
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="section-3">
      <div class="main-title">
        
      </div>
      <div class="search-box">

      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HeaderIndex",
  data() {
    return {
      // selectCate: 853,
      selectCate: "",

      active_product_cate_index: 0,
      // active_product_cate: {},
      active_haocai_cate: {},

      showSearch: false,
      keyword: "",
      selectType: "",

      options: [
        {
          title: "所有产品",
          id: "",
        },
      ],

      search_suggest_list: [],
      disabledSearchQuery: false,
      searchLock: false, //锁定搜素

      pagination_wenxian: {
        page: 1,
        pagenum: 10,
      },
      wenxian_list: [],
    };
  },

  computed: {
    ...mapState(["header_theme"]),

    options_product_cates() {
      if (!this.product_cates.length) {
        return [
          {
            title: "抗体",
            id: 853,
          },
        ];
      } else {
        return [
          {
            id: "",
            title: "所有产品",
          },
          ...this.product_cates,
        ];
      }
    },

    headerTheme() {
      return {
        ["theme-" + this.header_theme]: true,
      };
    },

    //3个主页
    is_page_home() {
      let ret = false;
      let route_arr = ["index"];
      if (route_arr.includes(this.$route.name)) {
        ret = true;
      }
      return ret;
    },

    // 主导航
    opt_nav() {
      //技术服务
      let child_tech_service = this.child_tech_service || [];
      let tech_service_route =
        child_tech_service && child_tech_service[0] ? child_tech_service[0].route : "";

      //技术支持
      let child_tech_support = [
        { title: "学习中心", route: "/technology" },
        { title: "技术问题", route: "/questions" },
      ];

      //新闻中心
      let first_news_route = `/news/${this.default_news_cate_id}`;
      let child_news = this.news_cates;

      //关于我们
      let child_about = [
        { title: "公司简介", route: "/companyProfile" },
        // { title: "服务网络", route: "/companyServiceNet" },
        { title: "企业优势", route: "/companyAdvantages" },
        { title: "企业文化", route: "/companyCulture" },
        { title: "发展历程", route: "/companyHistory" },
        { title: "全球战略布局", route: "/companyStrategy" },
        // { title: "授权经销商", route: "/companyBusiness" },
        { title: "销售网络", route: "/companySales" },
        { title: "获奖证书", route: "/certificate" },
        { title: "人才理念", route: "/idea" },
        { title: "招聘信息", route: "/job" },
      ];

      if (this.show_nav_jingxiao) {
        // debugger;
        let info = { title: "授权经销商", route: "/companyBusiness" };
        child_about.splice(5, 0, info);
      }

      let arr = [
        { title: "首页", route: "/" },
        { title: "产品中心", route: "/products", child: [] },
        { title: "技术服务", route: tech_service_route, child: child_tech_service },
        { title: "技术支持", route: "/technology", child: child_tech_support },
        { title: "新闻中心", route: first_news_route, child: child_news },
        { title: "关于我们", route: "/companyProfile", child: child_about },
      ];
      return arr;
    },

    // 个人中心导航
    opt_user_center_nav() {
      let arr = [
        { title: "我的订单", route: "/myOrder" },
        { title: "我的佣金", route: "/myCommission" },
        { title: "个人资料", route: "/myInfo" },
      ];
      if (this.is_login) {
        arr.push({ title: "退出账号", route: "" });
      }
      return arr;
    },

    active_product_cate() {
      return this.product_cates[this.active_product_cate_index];
    },
  },

  watch: {
    $route(to, from) {
      //console.log("页面顶部 watch $route", to);
      // if (val) {
      //   this.keyword = val;
      // }

      if (to.name == "productSearch") {
        if (to.query.id) {
          //当前id 是否对应1级分类
          //当前id 不对应 时展示1级分类

          let item = this.product_cates_all.find((v) => v.id == to.query.id);
          if (item) {
            let level1_id = item.ids[0];
            console.log("当前分类", { ...item });
            // debugger;
            this.selectCate = +level1_id;
          }
          // console.log("pageHeader watch", this.selectCate === 864);
        }
      }

      this.searchLock = true;
      this.keyword = to.query.keyword;

      this.search_suggest_list = [];
    },

    keyword(val) {
      if (val) {
        if (!this.searchLock) {
          this.handleSearchChange();
        }
      } else {
        this.search_suggest_list = [];
      }
    },
  },

  created() {
    this.keyword = this.$route.query.keyword || "";
    this.setView();
  },

  methods: {
    setView() {
      let start = "";
      let end = "";

      this.$api("paper_brand", {
        ...this.pagination_wenxian,
        start: start,
        end: end,
      }).then((res) => {
        this.wenxian_list = res.data;
      });
    },

    mouseoutSearch() {
      //console.log("鼠标移除搜素区域");
      // this.search_suggest_list = [];
    },

    handleSearchInput() {
      this.searchLock = false;
    },

    kwywordSearch() {
      // search_suggest_list

      this.$api("product_searchPlist", {
        channel_id: this.selectCate || "",
        page: 1,
        pagenum: 8,
        keyword: this.keyword.trim() || "",
      }).then((res) => {
        //console.log("搜索相关");
        this.search_suggest_list = res.data.list.slice(0, 8);

        // setTimeout(() => {
        // this.disabledSearchQuery = false;
        // }, 500);
      });
    },

    handleSearchChange() {
      //console.log("监视 change 事件", this.keyword);

      if (this.disabledSearchQuery) {
        return false;
      }

      this.cutdown();
      this.kwywordSearch();
    },

    cutdown() {
      this.disabledSearchQuery = true;
      setTimeout(() => {
        this.disabledSearchQuery = false;
      }, 200);
    },

    toHome() {
      if (this.$route.name != "index") {
        this.$router.push("/");
      } else {
        document.documentElement.scrollTop = 0;
      }
    },

    // 判断当前是哪个页面 切换页面显示active
    checkClass(item) {
      let pagePath = this.$route.fullPath;

      let obj = {
        active: item.route == pagePath || item.title == this.$route.meta.root,
        "nav-item-static": "/productCates" == item.path,
      };
      return obj;
    },

    logout() {
      // //console.log(this.$route.fullPath)
      // return

      this.$store.commit("clear_loginInfo");
      // debugger
      if (this.$route.meta.requireAuth) {
        this.$router.push("/");
      }

      alertSucc("退出成功");
    },

    toSearch() {
      this.search_suggest_list = [];

      if (!this.keyword) {
        alertErr("请输入搜索关键字");
        return;
      }
      // if (this.selectCate) {
      //   this.$router.push("/productSearch?id=" + this.selectCate + "&keyword=" + this.keyword);
      // } else {
      //   this.$router.push("/productSearch?keyword=" + this.keyword);
      // }

      let query = {};
      if (this.selectCate) {
        query.id = this.selectCate;
      }

      query.keyword = this.keyword.trim() || "";
      query.ms = new Date().getTime();

      // this.toProductSearchPage(params);

      this.$router.push({
        path: "/productSearch",
        query: query,
      });
    },

    handleHoverCate(item, index) {
      //console.log("鼠标移入分类", { ...item });
      this.active_product_cate_index = index;
    },

    toggleHaocai(item) {
      if (this.active_haocai_cate.id == item.id) {
        this.active_haocai_cate = {};
      } else {
        this.active_haocai_cate = item;
      }
    },

    link_to(item) {
      //console.log({ ...item });

      if (item.title == "退出账号") {
        this.mix_logout();
      }
    },
    handleSearch() {
      if (this.$route.name != "searchResult") {
        this.$router.push({
          path: "/searchResult",
          query: {
            keyword: this.keyword,
          },
        });
      } else {
        this.$store.commit("change_store_keyword", this.keyword);
      }

      this.keyword = "";
      this.showSearch = false;
    },
    jump_nav(item) {
      //console.log({ ...item });

      if (item.route) {
        // this.$router.push(item.route);
      } else {
        window.open(this.webConfig.url, "_blank");
      }
    },

    //自定义 banner跳转
    jump_banner(item) {
      //console.log({ ...item });
      let url = item.url;
      if (!url) {
        return;
      }
      window.open(url, "_blank");
    },

    openModalSearch() {
      this.showSearch = true;
    },
  },
};
</script>

<style lang="less">
.w-nav-popover .popper__arrow {
  display: none !important;
}
.w-nav-popover {
  padding: 0 !important;
  margin-top: 2px !important;
  // border: none !important;
}
.pop-child {
  .child-item {
    display: block;
    height: 36px;
    line-height: 36px;
    padding-left: 20px;
    background: #fff;
    text-align: left;
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #000000;

    &:hover {
      background: #ea3200;
      color: #fff;
    }
  }
}

// 定制服务 三级导航
.service-child-box {
  position: absolute;
  z-index: 10;
  display: none;
  left: 99.99%;
  top: 2px;
  top: 0;
  min-width: 200px;
  box-shadow: 0 0.104167vw 0.625vw 0 #ddd;
  background: #fff;

  .service-child-inner {
    width: fit-content !important;
    width: 100% !important;
    white-space: nowrap;

    .child-item {
      width: 100% !important;
      white-space: nowrap;
      padding-right: 1.041667vw;
    }
  }
}
.service-child-item {
  position: relative;
}
.service-child-item:hover {
  .service-child-box {
    display: block;
  }
}
</style>

<style scoped lang="less">
.theme-transparent {
  box-shadow: none !important;

  .section-1 {
    background: transparent;
  }

  .header-inner .nav-list .nav-item a {
    color: #fff;
  }
}

.theme-white {
  background: #fff;
}

.section-1 {
  height: 32px;
  background: #ea3200;

  .header-info {
    .flex-between();
    height: 32px;
    width: @width;
    margin: 0 auto;

    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;

    .info-left {
      .flex();
      img {
        margin-right: 5px;
      }

      .img-1 {
        width: 14px;
        height: 14px;
      }
      .img-2 {
        width: 13px;
        height: 10px;
      }
      .text-1 {
        margin-right: 40px;
      }
    }
    .info-right {
      .flex();

      .divider {
        margin: 0 10px;
        width: 2px;
        height: 16px;
        background: #fff;
      }

      a {
        color: #fff;
        .flex();

        img {
          margin-right: 5px;
        }
      }

      .shopcart {
        margin: 0 32px;
      }
    }
  }
}

.header-box {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;

  line-height: 0;
  padding: 0;
  // border-bottom: 4px solid #009a44;
  box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.16);
}
.header-inner {
  width: 1400px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;
    .logo {
      cursor: pointer;
      img {
        width: 209px;
      }
    }
  }

  .center-search {
    .flex();
    align-items: stretch;
    border: 1px solid #c2c2c2;
    border-radius: 5px;
    position: relative;
    overflow: hidden;

    .left-select {
      width: 120px;
      // width: 140px;

      /deep/ .el-input__inner {
        border: none !important;
        background: #f2f2f2;
        padding: 0 10px;
      }
    }
    .search-box {
      .flex();
      overflow: hidden;
      // height: 100%;

      input {
        display: block;
        height: 100%;
        width: 190px;
        padding-left: 10px;

        &::-webkit-input-placeholder {
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #c2c2c2;
        }
      }
      .btn-search {
        .flex-center();
        position: absolute;
        right: 0;
        width: 40px;
        height: 40px;
        background: #fff;

        &:hover {
          opacity: 1 !important;
        }
      }
      .img-search {
        width: 16px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }

  .nav-list {
    margin-left: 80px;
    .flex-center();
    height: 100%;
    .nav-item {
      margin-left: 64px;

      &.nav-item-static {
        position: static;
      }

      .nav-link {
        position: relative;
        display: inline-block;
        height: 90px;
        line-height: 90px;
        font-size: 16px;
        color: #222;
        font-size: 1.6rem;

        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%);
          width: 0;
          height: 3px;
          background: #ea3200;
          transition: 0.3s;
        }
      }

      &:hover {
        .nav-link::after {
          width: 36px;
        }
      }

      &.active {
        .nav-link {
          font-weight: bold;
          color: @theme;
          &::after {
            width: 36px;
          }
        }
      }

      a {
        color: #222;
        width: 100%;
        font-size: 16px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333;
      }
    }
  }
}

// 产品中心弹窗

// .pop-product-inner {
//   position: relative;
// }
// .box-zhuanti {
//   &::after {
//     content: '';
//     display: inline-block;
//     width: 1px;
//     height: 100%;
//     position: absolute;
//     left: 200px;
//     top: 0;
//     bottom: 0;
//     background: #f00;
//   }
// }

.nav-item:hover .pop-product-box {
  display: block;
}
.pop-product-box {
  // display: none;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 100;
  background: transparent;
  padding-top: 20px;
  transform: translate(0, -20px);
}

.pop-product {
  background: #fff;
  min-height: 200px;
  padding: 15px 0 35px;
  border-top: 1px solid #eee;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);

  .pop-product-inner {
    width: @width;
    margin: 0 auto;
    display: flex;
    align-items: stretch;
    line-height: 1.1;
    text-align: left;
    min-height: 33rem;
    height: auto;

    .box-cate {
      padding-right: 30px;
      padding-right: 20px;
    }
    .box-haocai {
      padding-left: 30px;
      padding-right: 30px;
      height: fit-content;
      width: 264px;
      width: 304px;
    }

    .box-zhuanti,
    .box-lingyu {
      padding-left: 18px;
      padding-right: 18px;
      height: fit-content;
      width: 230px;
    }

    .box-wenxian {
      padding-left: 18px;
      padding-right: 0;
      height: fit-content;
      width: 140px;
      width: 160px;
    }

    .box-cate,
    .box-haocai,
    .box-zhuanti,
    .box-lingyu {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        width: 1px;
        background: #ccc;
        height: 33rem;
      }
    }

    .box-cate,
    .box-haocai,
    .box-zhuanti {
      // border-right: 1px solid #ccc;
      height: 33rem;
    }

    .box-lingyu {
      // border-right: 1px solid #ccc;
      padding-right: 5px;
      height: auto;
    }

    .pop-product-group {
      &.pop-product-group-leixing {
        flex: 1;
      }

      .group-title {
        margin-bottom: 18px;
        margin-bottom: 8px;
        font-size: 16px;
        font-weight: bold;
        color: #000000;

        a {
          padding: 5px 3px;
          display: block;
          font-size: 16px;
          font-weight: bold;
          color: #000000;

          font-size: 1.6rem;

          &.active {
            background: @theme;
            color: #fff;
          }

          &:hover {
            background: @theme;
            color: #fff;
          }
        }
      }

      //产品类型
      .group-leixing {
        display: flex;
        flex: 1;

        .list {
          width: 160px;

          .item {
            display: block;
            padding: 0 3px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            background: #f7f7f7;
            margin-bottom: 5px;
            font-size: 14px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #333333;

            font-size: 1.6rem;
            margin-bottom: 0.5rem;

            &.active {
              background: @theme;
              color: #fff;
            }

            &:hover {
              background: @theme;
              color: #fff;
            }
          }
        }

        .list-level2 {
          width: 340px;
          width: 380px;
          width: 320px;
          // flex: 1;
          // display: flex;
          // flex-wrap: wrap;
          // align-items: flex-start;

          .item {
            margin-bottom: 5px;
            display: inline-block;
            width: calc((100% - 0) / 2);
            width: 50%;
            // text-align: center;
            padding-left: 20px;
            height: 30px;
            line-height: 30px;

            a {
              padding: 0 5px;
              display: block;
              font-size: 12px;
              font-family: Microsoft YaHei-Regular, Microsoft YaHei;
              font-weight: 400;
              color: #333333;

              font-size: 14px;
              font-size: 1.4rem;

              &:hover {
                background: @theme;
                color: #fff;
              }
            }
          }
        }
      }

      //耗材中心
      .group-haocai {
        .list {
          width: 200px;
          width: 100%;
          .item-title {
            display: block;
            height: 36px;
            line-height: 36px;
            padding-left: 9px;
            text-align: left;
            background: #f7f7f7;
            margin-bottom: 5px;
            cursor: pointer;
            color: #333333;
            font-size: 14px;
            color: #333333;

            font-size: 16px;
            font-size: 1.6rem;
            &:hover {
              background: @theme;
              color: #fff;
            }
          }

          .sub-list {
            padding-left: 17px;
            padding-left: 0;

            .sub {
              width: fit-content;
              display: block;
              font-size: 12px;
              font-family: Microsoft YaHei-Regular, Microsoft YaHei;
              font-weight: 400;
              color: #333333;
              line-height: 28px;

              font-size: 14px;
              font-size: 1.4rem;
              line-height: 2;
              padding-left: 9px;
              &:hover {
                color: @theme;
              }
            }
          }
        }
      }

      // 专题  领域
      .group-zhuanti,
      .group-lingyu {
        .list {
          .item {
            padding: 5px 3px;
            display: block;
            // width: fit-content;
            font-size: 12px;
            color: #333333;
            margin-bottom: 4px;

            font-size: 14px;
            font-size: 1.6rem;
            // line-height: 1.5;

            &:hover {
              background: @theme;
              color: #fff;
            }
          }
        }
      }
    }
  }
}

.center-search-wrap {
  position: relative;

  &:hover {
    .search-suggest-list {
      display: block;
    }
  }
}
.search-suggest-list {
  display: none;
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
  top: 43px;
  border: 1px solid #ddd;
  border-top: none;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  .search-suggest-item {
    .line-1();
    line-height: 3.5rem;
    height: 3.5rem;
    padding: 0 5px;
    text-align: left;
    transition: 0.3s;

    &:hover {
      background: #f5f5f5;
    }

    a {
      .line-1();
      display: block;
      width: 100%;
      height: 100%;
      color: #888;
      font-size: 1.3rem;
      &:hover {
        color: @theme;
      }
    }
  }
}

@media screen and (max-width: 1600px) {
  .header-inner .nav-list .nav-item {
    margin-left: 10px;
    min-width: 80px;
  }

  .left-select {
    width: 160px !important;
  }
}
@media screen and (max-width: 1400px) {
  .header-inner .nav-list .nav-item {
    margin-left: 10px;
    min-width: 80px;
  }

  .left-select {
    width: 150px !important;
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/zujian/pageHeader.less"></style>
