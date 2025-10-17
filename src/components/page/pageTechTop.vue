<template>
  <div class="page-top">
    <div class="page-top-banner">
      <img :src="bannerInfo.image" alt="" />
    </div>

    <div class="page-top-text-wrap">
      <div class="page-top-text-inner">
        <div class="main-title">技术支持</div>
        <div class="main-title-en">TECHNICAL SUPPORT</div>
        <div class="title-line"></div>
        <div class="bread-box">
          <img src="@img/bread-home.png" alt="" />
          <router-link to="/">首页</router-link>
          <span class="bread-divider">&gt;</span>
          <router-link to="/technology">技术支持</router-link>
          <!-- <template v-if="$route.meta.level == 4">
            <span class="bread-divider">&gt;</span>
            <router-link to="/technologyOnline?id=860">学习中心</router-link>
          </template> -->
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
          :class="checkClass(item)"
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
  data() {
    return {
      nav_list: [
        {
          title: "学习中心",
          root2: "技术支持-学习中心",
          route: "/technology",
          routeList: [
            //
            "technology",
            "technologyOnline",
            "technologyEdge",
            "technologyStudyInfo",
            "technologyVideo",
          ],
        },
        {
          title: "技术问题",
          root2: "技术支持-技术问题",
          route: "/questions",
          routeList: [
            //
            "questions",
            "questionscate",
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState([""]),

    bannerInfo() {
      return this.opt_inner_banners[2] || {};
    },
  },
  created() {},
  methods: {
    // 判断当前是哪个页面 切换页面显示active
    checkClass(item) {
      let pagePath = this.$route.fullPath;

      let obj = {
        active: pagePath == item.path || item.root2 == this.$route.meta.root2,
      };
      return obj;
    },
  },
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

<style scoped lang="less" src="@/assets/h5css/zujian/pageTechTop.less"></style>
