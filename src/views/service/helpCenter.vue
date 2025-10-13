<template>
  <div class="page">
    <div class="inner">
      <div class="title">帮助中心</div>

      <div class="detail-content">
        <!-- v-html="curr.content" -->
        <div class="html-box" v-html="detail.content">
          <div class="html-inner">
            <div class="section-title">注册并登录网站</div>
            <div class="section-content">
              <p>1. 新用户注册：点击首页顶部“注册”进入注册页面后输入email、密码、验证码，按照提示完成注册。</p>
              <p>2. 已有账号用户登录：点击首页顶部“登录”，进入登录页面后，输入用户名、密码进行登录或者微信扫一扫登录。</p>
            </div>
            <div class="section-title">加入购物车</div>
            <div class="section-content">
              <p>1. 挑选商品后，您点击“立即购买”；</p>
              <p>2. 在购物车中（或新加入购物车时），系统默认每件商品的订购数量为1件，如果您想购买多件该商品，可修改购买数量；</p>
              <p>3. 在购物车中，您可以将商品单个或批量删除</p>
            </div>
            <div class="section-title">提交订单</div>
            <div class="section-content">
              <p>1. 浏览要购买的商品，选择购买数量点击“立即购买”，“结算中心”进行结算。</p>
              <p>2. 结算已在购物车中的商品，选择好商品及数量后填写/核对订单信息，支付成功后提交订单。</p>
            </div>
            <div class="section-title">查看订单状态</div>
            <div class="section-content">
              <p>1. 等待付款</p>
              <p>当您提交订单但未支付货款时，订单状态将显示为等待付款。</p>
              <p>2. 已发货 当您的订单已由库房发出，正在配送中，“订单状态”将显示已发货。</p>
              <p>3. 交易成功</p>
              <p>当您签收商品之后，也就是物流得到签收完成后，“订单状态”即显示交易成功。</p>
              <p>4. 等待发货</p>
              <p>当您的订单已经完成配货，正在等待发货时，订单状态将显示“等待发货”。</p>
              <p>5. 订单关闭</p>
              <p>如您已收到商品，在网站上确认后，订单关闭。</p>
            </div>
          </div>
        </div>
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
      detail: {},
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
      this.$api("index_newsDetail", {
        id: 32,
      }).then((res) => {
        //console.log("index_newsDetail", res);
        let { code, data } = res;
        if (code == 1) {
          this.detail = data.info;
        }
      });
    },
  },
};
</script>


<style scoped lang="less">
.page {
  text-align: center;
  font-size: 14px;

  .inner {
    width: 100%;
    margin: 0 auto;
    padding: 0 0 80px;

    .title {
      margin-bottom: 20px;
      text-align: left;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 20px;
      color: #333333;
    }

    .detail-content {
      /deep/ .html-box {
        margin-top: 20px;
        text-align: left;
        min-height: 50vh;

        img {
          max-width: 100%;
          display: block;
          margin: 0 auto;
        }

        .section-title {
          height: 30px;
          line-height: 30px;
          padding-left: 10px;
          background: #f5f5f5;

          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #333333;
        }

        .section-content {
          margin-top: 10px;
          margin-bottom: 20px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 25px;
          color: #333333;
        }
      }
    }
  }
}
</style>
