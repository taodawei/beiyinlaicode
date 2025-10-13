<template>
  <div class="page-footer">
    <div class="web-footer">
      <!-- 网站信息 -->
      <div class="footer-left">
        <div class="left-logo">
          <img src="@img/footer-logo.png" alt="" />
        </div>
        <div class="left-item">
          <div class="left-label">服务热线：</div>
          <div class="left-text left-hotline">
            {{ webConfig.hotLine }}
          </div>
        </div>
        <div class="left-item">
          <div class="left-label">地<span class="font-divider"></span>址：</div>
          <div class="left-text">{{ webConfig.address }}</div>
        </div>
        <div class="left-item">
          <div class="left-label">售后电话：</div>
          <div class="left-text">{{ webConfig.hotLine2 }} {{ webConfig.hotLine }}</div>
        </div>
        <div class="left-item">
          <div class="left-label">邮<span class="font-divider"></span>箱：</div>
          <div class="left-text">{{ webConfig.email }}</div>
        </div>
      </div>

      <!-- 底部链接 -->
      <div class="footer-center">
        <div class="nav-group" v-for="(group, index) in groupList" :key="index">
          <div class="group-title">
            {{ group.title }}
          </div>
          <div class="nav-item" v-for="(sub, index) in group.child" :key="index">
            <router-link :to="sub.route">
              {{ sub.title }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- 二维码 -->
      <div class="footer-right">
        <div class="qrcode-item">
          <img :src="webConfig.qrcode_gongzhonghao" alt="" />
          <div class="text">贝茵莱公众号</div>
        </div>
      </div>
    </div>

    <div class="beian-box">
      <div class="beian">
        <span> {{ webConfig.beian_en }} </span>
        <a href="https://beian.miit.gov.cn/"> {{ webConfig.beian }} </a>
        <span>版权所有：{{ webConfig.com_title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "web-footer",
  components: {},
  props: [],
  data() {
    return {};
  },
  computed: {
    ...mapState(["webConfig", "opt_news_cate"]),

    groupList() {
      //产品分类
      let child_cate = this.product_cates;

      //技术服务
      let child_tech_service = this.child_tech_service || [];
      let tech_service_route =
        child_tech_service && child_tech_service[0] ? child_tech_service[0].route : "";

      //技术支持
      let child_tech_support = [
        { title: "学习中心", route: "/technology" },
        { title: "技术问题", route: "/questions" },
      ];

      //关于我们
      let child_about = [
        { title: "公司简介", route: "/companyProfile" },
        // { title: "服务网络", route: "/companyServiceNet" },
        { title: "企业优势", route: "/companyAdvantages" },
        { title: "企业文化", route: "/companyCulture" },
        { title: "发展历程", route: "/companyHistory" },
        { title: "全球战略布局", route: "/companyStrategy" },
        // { title: "授权经销商", route: "/companyBusiness" },
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
        // { title: "首页", route: "/" },
        { title: "产品中心", route: "/productCates", child: child_cate },
        { title: "技术服务", route: "/technologyService", child: child_tech_service },
        { title: "技术支持", route: "/technology", child: child_tech_support },
        { title: "关于我们", route: "/companyProfile", child: child_about },
      ];

      return arr;
    },

    opt_footer_nav() {
      let news_cate_id = this.opt_news_cate[0]?.id || "0";
      let arr = [
        { title: "关于我们", route: "/companycompanyProfile" },
        { title: "产品中心", route: "/category" },
        { title: "胆汁酸介绍", route: "/companyProduct" },
        { title: "新闻中心", route: `/news/${news_cate_id}` },
        { title: "联系我们", route: "/contactUs" },
      ];

      return arr;
    },
  },
  watch: {},

  created() {},

  methods: {},
};
</script>

<style scoped lang="less">
.page-footer {
  width: 100%;
  min-height: 172px;
  padding-top: 55px;
  background: url("~@img/footer-bg.jpg") no-repeat center / cover;
  // background: #ea3200;
  color: #fff;
}

.web-footer {
  width: @width;
  margin: 0 auto;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .footer-left {
    width: 350px;

    .left-logo {
      margin-bottom: 25px;
      text-align: left;
      img {
        width: 225px;
      }
    }

    .left-item {
      margin-bottom: 10px;
      display: flex;
      align-items: flex-start;
      text-align: left;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      line-height: 24px;
      .left-label {
        min-width: 5em;
        width: fit-content;
      }
      .left-text {
        flex: 1;

        &.left-hotline {
          font-size: 24px;
          font-weight: bold;
        }
      }

      .font-divider {
        display: inline-block;
        width: 2em;
      }
    }
  }
  .footer-center {
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;

    .nav-group {
      .group-title {
        text-align: left;
        margin-bottom: 25px;
        font-size: 16px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
      }
      .nav-item {
        text-align: left;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        line-height: 32px;

        a {
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          line-height: 32px;
        }
      }
    }
  }
  .footer-right {
    .qrcode-item {
      img {
        width: 95px;
        height: 95px;
      }

      .text {
        margin-top: 15px;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
}

.top-logo {
  img {
    width: 201px;
  }
}

.desc-box {
  margin-top: 15px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 14px;
  color: #dae8e2;
}

.info-box {
  margin-top: 10px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 14px;
  color: #dae8e2;
}

.nav-box {
  .flex-between();
  width: 1600px;
  margin: 60px auto;
  border-top: 1px solid #41b48a;
  border-bottom: 1px solid #41b48a;
  height: 48px;
  line-height: 48px;

  .nav-item {
    flex: 1;
    a {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 48px;
      color: #ffffff;
    }
  }
}

.qrcode-box {
  .flex-center();
  padding-bottom: 60px;

  .qrcode-item {
    &:last-child {
      margin-left: 40px;
    }
    img {
      width: 190px;
      height: 190px;
      border-radius: 6px;
    }
    .text {
      margin-top: 15px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 16px;
      color: #dae8e2;
    }
  }
}

.beian-box {
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  height: 60px;
  line-height: 60px;
  padding: 0;

  a {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #fff;
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/zujian/pageFooter.less"></style>
