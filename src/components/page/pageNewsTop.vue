<template>
  <div class="page-top">
    <div class="page-top-banner">
      <img :src="bannerInfo.image" alt="" />
    </div>

    <div class="page-top-text-wrap">
      <div class="page-top-text-inner">
        <div class="main-title">新闻中心</div>
        <div class="main-title-en">NEWS CENTER</div>
        <div class="title-line"></div>
        <div class="bread-box">
          <img src="@img/bread-home.png" alt="" />
          <router-link to="/">首页</router-link>
          <span class="bread-divider">&gt;</span>
          <router-link :to="'/news/' + default_news_cate_id">新闻中心</router-link>
          <template v-if="$route.params.id != 29">
            <span class="bread-divider">&gt;</span>
            <a href="javascript:void(0)">{{ curr_news_cate.title }}</a>
          </template>
        </div>
      </div>
    </div>

    <!-- 子级导航 -->
    <!-- <div class="child-nav-wrap">
      <div class="child-nav-inner">
        <router-link :to="item.route" class="child-item" :class="{ active: item.route == $route.path }" v-for="(item, index) in nav_list" :key="index">
          {{ item.title }}
        </router-link>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {},
  data() {
    return {
      // news_cate_id: this.$route.params.id || "", //当前新闻分类id
    };
  },
  computed: {
    ...mapState([""]),

    bannerInfo() {
      return this.opt_inner_banners[3] || {};
    },

    curr_news_cate() {
      let news_cate_id = this.$route.params.id;
      let cate = this.opt_news_cate.find((v) => v.id == news_cate_id) || {};

      return cate;
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
            height: 3px;
            background: #ea3200;
          }
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/zujian/pageNewsTop.less"></style>
