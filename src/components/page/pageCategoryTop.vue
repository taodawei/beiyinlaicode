<template>
  <div class="page-banner-nav">
    <!-- banner -->
    <div class="banner-wrap">
      <div class="banner-box">
        <img :src="curr_banner" alt="" />
      </div>
    </div>

    <!-- 面包屑 -->
    <div class="bread-wrap" :class="'page-' + $route.name">
      <div class="bread-box">
        <router-link to="/">
          <img src="@img/icon-home.png" alt="" />
          首页
        </router-link>
        <div v-for="(item, index) in list_bread" :key="index" class="other-link">
          <span>&gt;</span>
          <a href="javascript:void(0);">{{ item.title }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    pageOpt: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["opt_other_banner"]),
    curr_banner() {
      return this.opt_other_banner[1]?.image;
    },

    list_tab() {
      let arr = [
        {
          title: "公司新闻",
          route: "/news/1",
        },
        {
          title: "行情分析",
          route: "/news/2",
        },
        {
          title: "常见问题",
          route: "/news/3",
        },
      ];
      // return this.pageOpt.list_tab || [];
      return arr;
    },
    active_tab() {
      return this.pageOpt.active_tab || {};
    },
    list_bread() {
      return this.pageOpt.list_bread;
    },
  },
  created() {},
  methods: {
    //tab
    toggleTab(item) {
      if (item.route) {
        this.$router.push(item.route);
      }
    },

    clickBread(item) {
      //console.log("item", { ...item });

      if (item.route != this.$route.path) {
        this.$router.push(item.route);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.page-banner-nav {
  position: relative;
}

.banner-wrap {
  position: relative;
  .banner-box {
    width: 100%;

    img {
      width: 100%;
      object-fit: cover;
    }
  }
}

// /deep/ .bread-box {
//   background: #f8fafc;
//   .breadcrumb-wrap {
//     width: 1360px;
//     margin: 0 auto;
//   }
// }

// 面包屑导航

.bread-wrap {
  background: #fff;
  .flex-between();
  width: 1300px;
  margin: 0 auto;
  padding: 60px 0 50px 0;

  .bread-box {
    .flex();

    // border: 1px solid #EEEEEE;

    a {
      color: #666;
    }

    img {
      width: 15px;
      margin-right: 10px;
    }
    span {
      color: #666;
      margin: 0 5px;
    }

    .weizhi {
      margin: 0;
    }

    .other-link {
      a {
        color: #666;
        cursor: pointer;
      }
      &:last-child {
        a {
          color: #036dd1;
          color: #666;
        }
      }
    }
  }
}

.tab-wrap {
}

// 顶部切换
.tab-box-wrap {
  .tab-box {
    .flex();
    color: #333;

    .tab-item {
      margin-right: 10px;
      flex: 1;
      width: 140px;
      height: 44px;
      line-height: 44px;
      background: #029060;
      border: 1px solid #029060;
      opacity: 1;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #fff;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
