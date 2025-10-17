<template>
  <div class="page">
    <div class="page-top">
      <div class="page-top-banner">
        <!-- <img src="@img/demo/page-top-bg.jpg" alt="" /> -->
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
            <router-link to="/">关于我们</router-link>
            <span class="bread-divider">&gt;</span>
            <router-link to="/">公司简介</router-link>
          </div>
        </div>
      </div>

      <!-- 子级导航 -->
      <div class="child-nav-wrap">
        <div class="child-nav-inner">
          <router-link
            to="/"
            class="child-item"
            :class="{ active: index == 0 }"
            v-for="(item, index) in nav_list"
            :key="index"
          >
            {{ item.title }}
          </router-link>
        </div>
      </div>
    </div>

    <div class="page-inner">
      <div class="detail-title">{{ curr.title || "公司简介" }}</div>
      <div class="detail-title-line"></div>
      <div class="detail-content" v-html="curr.content">
        武汉贝茵莱生物科技有限公司是专业提供科研
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "create-order",
  components: {},
  data() {
    return {
      curr: {},

      nav_list: [],
    };
  },
  computed: {
    ...mapState([""]),
  },
  watch: {},

  beforeRouteUpdate(to, from, next) {
    //console.log("组件复用 from", from);
    //console.log("组件复用 to", to);

    next({
      query: to.query,
    });

    this.setView();
  },
  created() {
    this.setView();
  },
  methods: {
    setView() {
      // this.$api("index_newsDetail", {
      //   id: this.$route.query.id,
      // }).then((res) => {
      //   this.curr = res.data;
      // });
    },
  },
};
</script>

<style scoped lang="less">
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
        height: 71px;
        line-height: 71px;
        flex: 1;
        font-size: 14px;
        font-family: MicrosoftYaHei-, MicrosoftYaHei;
        font-weight: normal;
        color: #333333;

        &.active {
          font-size: 14px;
          font-family: Microsoft YaHei-Bold, Microsoft YaHei;
          font-weight: bold;
          color: #ea3200;

          &::after {
            content: "";
          }
        }
      }
    }
  }
}

.page {
  .page-inner {
    width: @width;
    margin: 0 auto;
    padding: 80px 0;

    .detail-title {
      font-size: 36px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;
    }

    .detail-title-line {
      width: 80px;
      margin: 24px auto;
      height: 5px;
      background: #ea3200;
      border-radius: 3px 3px 3px 3px;
    }

    .detail-content {
      margin-top: 40px;
      text-align: left;
      min-height: 50vh;

      /deep/ img {
        max-width: 100%;
        display: block;
        margin: 10px auto;
      }
    }
  }
}
</style>
