<template>
  <div class="page-top">
    <div class="page-top-banner">
      <img :src="bannerInfo.image" alt="" />
    </div>

    <div class="page-top-text-wrap">
      <div class="page-top-text-inner">
        <div class="main-title">关于我们</div>
        <div class="main-title-en">ABOUT US</div>
        <div class="title-line"></div>
        <div class="bread-box">
          <img src="@img/bread-home.png" alt="" />
          <router-link to="/">首页</router-link>
          <span class="bread-divider">&gt;</span>
          <router-link to="/companyProfile">关于我们</router-link>
          <span class="bread-divider">&gt;</span>
          <a href="javascript:void(0)">{{ $route.meta.title }}</a>
        </div>
      </div>
    </div>

    <!-- 子级导航 -->
    <div class="child-nav-wrap">
      <div class="child-nav-inner">
        <router-link
          :to="item.route"
          class="child-item"
          :class="{
            active:
              item.route == $route.path ||
              (item.routeNames && item.routeNames.includes($route.name)),
          }"
          v-for="(item, index) in nav_list"
          :key="index"
        >
          {{ item.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState([""]),

    nav_list() {
      let nav_list = [
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
        { title: "招聘信息", route: "/job", routeNames: ["jobdetail"] },
      ];

      if (this.show_nav_jingxiao) {
        // debugger;
        let info = { title: "授权经销商", route: "/companyBusiness" };
        nav_list.splice(5, 0, info);
      }

      return nav_list;
    },

    bannerInfo() {
      return this.opt_inner_banners[4] || {};
    },
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.page-top {
  position: relative;
  padding-top: 92px;
  .page-top-banner {
    img {
      width: 100%;
    }
  }

  .page-top-text-wrap {
    width: @width;
    margin: 0 auto;
    .page-top-text-inner {
      position: absolute;
      top: 170px;
      text-align: left;

      .main-title {
        font-size: 46px;
        font-family: SourceHanSansSC-Bold-, SourceHanSansSC-Bold;
        font-weight: normal;
        color: #ffffff;
      }
      .main-title-en {
        margin-top: 12px;

        font-size: 56px;
        font-family: SourceHanSansSC-Bold-, SourceHanSansSC-Bold;
        font-weight: normal;
        color: #ffffff;
      }

      .title-line {
        margin: 26px 0 20px;
        width: 640px;
        height: 1px;
        background: #e6e6e6;
      }
      .bread-box {
        display: flex;
        align-items: center;

        img {
          width: 15px;
          margin-right: 10px;
        }
        .bread-divider {
          margin: 0 10px;
          font-size: 18px;
          font-family: MicrosoftYaHei-, MicrosoftYaHei;
          font-weight: normal;
          color: #ffffff;
        }
        a {
          font-size: 18px;
          font-family: MicrosoftYaHei-, MicrosoftYaHei;
          font-weight: normal;
          color: #ffffff;
        }
      }
    }
  }

  .child-nav-wrap {
    width: 100%;
    border-bottom: 1px solid #e6e6e6;
    .child-nav-inner {
      width: @width;
      margin: 0 auto;

      height: 71px;
      display: flex;
      justify-content: center;
      align-items: center;

      .child-item {
        position: relative;
        height: 71px;
        line-height: 71px;
        flex: 1;
        font-size: 14px;
        font-family: MicrosoftYaHei-, MicrosoftYaHei;
        font-weight: normal;
        color: #333333;

        &.router-link-active,
        &.active {
          font-size: 14px;
          font-family: Microsoft YaHei-Bold, Microsoft YaHei;
          font-weight: bold;
          color: #ea3200;

          &::after {
            content: "";
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translate(-50%, 0);
            width: 56px;
            height: 3px;
            background: #ea3200;
          }
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/zujian/pageAboutTop.less"></style>
