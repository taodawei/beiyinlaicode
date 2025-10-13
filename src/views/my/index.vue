<template>
  <div class="page-user-wrap">
    <pageUserTop />

    <div class="inner">
      <div class="user-left">
        <div class="nav-wrap">
          <div class="nav-item" v-for="(item, index) in filter_userMenu" :key="index">
            <div class="nav-title main-title" v-if="!item.route">
              {{ item.title }}
            </div>
            <div
              v-else
              class="nav-title link"
              :class="$route.name == item.route ? 'active' : ''"
              @click="onClick_main(item)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="user-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import pageUserTop from "@/components/page/pageUserTop";
// Vue.component("pageUserTop", pageUserTop); //用户 导航

import { mapState } from "vuex";
// import commonUserInfo from "@/components/common/commonUserInfo.vue";

export default {
  name: "userCenter",
  components: {
    pageUserTop,
  },
  data() {
    return {
      //个人中心导航
      userMenu: [
        {
          title: "个人主页",
          route: "",
        },
        {
          title: "会员中心",
          route: "userIndex",
        },

        {
          title: "订单中心",
          route: "",
        },
        {
          title: "我的订单",
          route: "myOrder",
        },
        {
          title: "评价晒单",
          route: "myReview",
        },

        // {
        //   title: "我的购物车",
        //   route: "shoppingCart",
        // },
        // {
        //   title: "我的售后",
        //   route: "myRefund",
        // },

        {
          title: "我的活动",
          route: "",
        },
        {
          title: "我的收藏",
          route: "myFavorite",
        },
        {
          title: "我的足迹",
          route: "myBrowse",
        },
        {
          title: "我的优惠券",
          route: "myCoupon",
        },
        {
          title: "领券中心",
          route: "couponCenter",
        },

        {
          title: "账户资金",
          route: "",
        },
        // {
        //   title: "我的佣金",
        //   route: "myCommission",
        // },
        // {
        //   title: "我的业绩",
        //   route: "myYeJi",
        // },

        // {
        //   title: "我的团队",
        //   route: "myTeam",
        // },
        // {
        //   title: "分润统计",
        //   route: "myFenRun",
        // },

        {
          title: "在线充值",
          route: "yueChongzhi",
        },
        {
          title: "余额明细",
          route: "yueMingxi",
        },

        {
          title: "我的积分",
          route: "pointsDetail",
        },
        {
          title: "积分商城",
          route: "pointsMall",
        },

        {
          title: "个人设置",
          route: "",
        },
        {
          title: "个人资料",
          route: "myInfo",
        },
        {
          title: "地址管理",
          route: "myAddress",
        },
        {
          title: "修改密码",
          route: "updatePass",
        },
        // {
        //   title: "意见反馈",
        //   route: "feedback",
        // },
      ],

      activeRoute: "",
      openeds: [
        "myMessage",
        "myConsultPlatform",
        "myBook",
        "myCollectDoctor",
        "myOrder",
        "myInfo",
      ],
    };
  },
  computed: {
    ...mapState(["baseInfo", "defaultAvatar", "is_login", "is_common"]),
    filter_userMenu() {
      let navList = [];

      if (this.is_common) {
        //普通用户
        navList = this.userMenu.filter((v) => v.role != 2);
      } else {
        //员工或者分销
        navList = this.userMenu;
      }

      return navList;
    },
  },

  //导航激活
  beforeRouteUpdate(to, from, next) {
    //console.log("组件复用 from", from);
    //console.log("组件复用 to", to);

    next();

    this.activeRoute = to.path.replace("/", "");
  },

  watch: {},
  created() {
    // this.subArr = this.subNavArr[0];
  },

  mounted() {},

  methods: {
    onClick_main(item) {
      if (!item.route) {
        let route = item.sub[0].route;
        this.$router.push("/" + route);
      } else {
        this.$router.push("/" + item.route);
      }
    },
    onClick_sub(item) {
      this.$router.push("/" + item.route);
    },
    onClick_homepage() {
      this.$router.push({
        path: "/homepage",
        query: {
          id: this.baseInfo.id,
        },
      });
    },
  },
};
</script>

<style scoped lang="less">
.page-user-wrap {
  background: #fff;

  background: #f7f7f7;
  background-size: cover;
  padding-top: 0;

  .inner {
    width: @width;
    margin: 0 auto;
    min-height: 70vh;
    display: flex;
    justify-content: space-between;

    .user-left {
      width: 210px;
      min-width: 210px;
      margin-bottom: 50px;

      .nav-wrap {
        background: #f9f9f9;
        background: #fff;
        padding-bottom: 20px;
        .nav-item {
          overflow: hidden;
          .nav-title {
            position: relative;
            cursor: pointer;
            padding-left: 30px;
            padding-left: 52px;
            text-align: left;
            line-height: 48px;
            height: 48px;
            line-height: 32px;
            height: 32px;
            // border-bottom: 1px solid #eee;

            font-size: 12px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #666666;

            &.link {
              &:hover {
                color: @theme;
              }
            }

            &.main-title {
              line-height: 48px;
              height: 48px;
              margin-top: 10px;
              padding-left: 30px;
              cursor: auto;
              font-size: 14px;
              font-family: Microsoft YaHei-Regular, Microsoft YaHei;
              font-weight: 400;
              color: #333333;
              user-select: none;
            }

            &.active {
              background: #ffffff;
              background: #fffaf7;
              color: @theme;
              &:before {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 3px;
                // height: 24px;
                background-color: @theme;
              }
            }

            &[data-hide="hide"] {
              display: none;
            }
          }

          &:first-child {
            .main-title {
              margin-top: 0;
            }
          }
        }
      }
    }
    .user-right {
      flex: 2;
      margin-left: 24px;
      min-height: 50vh;
      padding-bottom: 50px;
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/user/index.less"></style>
