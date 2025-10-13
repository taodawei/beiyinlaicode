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
        <!-- <img src="@/assets/weizhi.png" alt="" /> -->
        <span class="weizhi">您的位置： </span>
        <router-link to="/"> 首页 </router-link>
        <div v-for="(item, index) in list_bread" :key="index" class="other-link">
          <span>&gt;</span>
          <a @click="clickBread(item)">{{ item.title }}</a>
        </div>
      </div>
    </div>

    <!-- tab 切换 -->
    <div class="tab-wrap" v-if="list_tab.length">
      <div class="tab-box-wrap">
        <div class="tab-box">
          <div
            v-for="(item, index) in list_tab"
            :key="index"
            class="tab-item"
            :class="
              item.route == $route.path || item.route == active_tab.route ? 'active' : ''
            "
            @click="toggleTab(item)"
          >
            {{ item.title }}
          </div>
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
      return this.opt_other_banner[0]?.image;
    },

    list_tab() {
      let arr = [];
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

  .bread-box {
    .flex();
    width: 1390px;
    margin: 0 auto;
    padding: 52px 0 27px 0;
    padding-left: 0;

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
        }
      }
    }
  }
}

.tab-wrap {
  width: 1390px;
  margin: 0 auto;
}

// 顶部切换
.tab-box-wrap {
  .flex-center();
  .tab-box {
    .flex-center();
    width: 1390px;

    color: #333;

    .tab-item {
      margin-right: 10px;
      flex: 1;
      width: 270px;
      height: 44px;
      line-height: 44px;
      background: #ffffff;
      border: 1px solid #e4e7ec;
      opacity: 1;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #212529;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
