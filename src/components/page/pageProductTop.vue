<template>
  <div class="page-top">
    <div class="page-bread">
      <div class="bread-box">
        <img src="@img/product-home.png" alt="" />
        <router-link to="/">首页</router-link>
        <span class="bread-divider">&gt;</span>
        <router-link to="/">产品中心</router-link>
        <span class="bread-divider">&gt;</span>
        <router-link to="/">产品类型</router-link>
        <span class="bread-divider">&gt;</span>
        <router-link to="/">重组蛋白</router-link>
      </div>
    </div>
    <!-- <div class="page-top-banner">
      <img src="@img/demo/page-top-bg.jpg" alt="" />
    </div> -->

    <!-- <div class="page-top-text-wrap">
      <div class="page-top-text-inner">
        <div class="main-title">产品中心</div>
        <div class="main-title-en">ABOUT US</div>
        <div class="title-line"></div>

      
      </div>
    </div> -->

    <!-- 子级导航 -->
    <!-- <div class="child-nav-wrap">
      <div class="child-nav-inner">
        <router-link to="/" class="child-item" :class="{ active: index == 0 }" v-for="(item, index) in nav_list" :key="index">
          {{ item.title }}
        </router-link>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
   
  },
  data() {
    return {
      nav_list: [
        { title: "公司简介", route: "" },
        // { title: "服务网络", route: "" },
        { title: "企业优势", route: "" },
        { title: "企业文化", route: "" },
        { title: "发展历程", route: "" },
        { title: "全球战略布局", route: "" },
        { title: "授权经销商", route: "" },
        { title: "获奖证书", route: "" },
        { title: "人才理念", route: "" },
        { title: "招聘信息", route: "" },
      ],
    };
  },
  computed: {
    ...mapState([""]),

    bannerInfo() {
      return this.opt_inner_banners[0] || {}
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

  .page-bread {
    width: @width;
    margin: 0 auto;
    height: 44px;
    background: #f5f5f5;
    padding: 0 15px;

    .bread-box {
      height: 44px;
      display: flex;
      align-items: center;

      img {
        width: 15px;
        margin-right: 10px;
      }
      .bread-divider {
        margin: 0 10px;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
      a {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
    }
  }
}
</style>
