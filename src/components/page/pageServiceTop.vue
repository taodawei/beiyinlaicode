<template>
  <div class="page-top">
    <div class="page-top-banner">
      <img :src="bannerInfo.image" alt="" />
    </div>

    <div class="page-top-text-wrap">
      <div class="page-top-text-inner">
        <div class="main-title">技术服务</div>
        <div class="main-title-en">TECHNICAL SERVICE</div>
        <div class="title-line"></div>
        <div class="bread-box">
          <img src="@img/bread-home.png" alt="" />
          <router-link to="/">首页</router-link>
          <span class="bread-divider">&gt;</span>
          <router-link :to="tech_service_route">技术服务</router-link>
          <span class="bread-divider">&gt;</span>
          <router-link :to="service_info.root_route">{{
            service_info.route_title
          }}</router-link>
          <span class="bread-divider">&gt;</span>
          <a href="javascript:void(0)">{{ service_info.title }}</a>
        </div>
      </div>
    </div>

    <!-- 子级导航 -->
    <div class="child-nav-wrap">
      <div class="child-nav-inner">
        <router-link
          :to="item.route"
          class="child-item"
          :class="{ active: item.route == $route.path }"
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

    bannerInfo() {
      return this.opt_inner_banners[1] || {};
    },

    tech_service_route() {
      let child_tech_service = this.child_tech_service;
      let route =
        child_tech_service && child_tech_service[0] ? child_tech_service[0].route : "";
      return route;
    },

    service_info() {
      let info = "";
      this.service_cates.forEach((level1) => {
        if (level1.skill) {
          if (!info) {
            info = level1.skill.find((v) => v.skill_id == this.$route.params.id);
          }
        }
      });

      return info;
    },

    nav_list() {
      let main_cate = {};
      this.service_cates.forEach((level1) => {
        if (level1.skill) {
          let info = level1.skill.find((v) => v.skill_id == this.$route.params.id);
          if (info) {
            main_cate = level1;
          }
        }
      });
      let nav_list = [];
      if (main_cate && main_cate.skill && main_cate.skill.length) {
        nav_list = main_cate.skill.map((v) => ({
          ...v,
          id: v.skill_id,
          route: "/technologyService/" + v.skill_id,
        }));
      }

      return nav_list;
    },
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.page-top {
  position: relative;
  padding-top: 150px;
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
      justify-content: flex-start;
      align-items: center;

      .child-item {
        position: relative;
        margin-right: 70px;
        height: 71px;
        line-height: 71px;
        // flex: 1;
        font-size: 14px;
        font-family: MicrosoftYaHei-, MicrosoftYaHei;
        font-weight: normal;
        color: #333333;

        &.router-link-active {
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
            width: 100%;
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
