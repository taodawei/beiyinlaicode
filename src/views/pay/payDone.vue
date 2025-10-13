<template>
  <div class="page">
    <div class="inner">
      <div class="section-title">支付结果</div>
      <div class="pay-info">
        <!-- 成功 -->
        <div class="img-box">
          <img
            v-if="payState == '支付成功' || payState == '提交成功'"
            src="@img/pay-done.png"
            alt
          />
          <img v-else src="@img/pay-fail.png" alt />
        </div>
        <div class="text-1">{{ payState }}！</div>
        <div class="text-2" v-if="payState == '提交成功'">
          您的转账凭证已提交，请等待后台审核！
        </div>
        <div class="text-2">订单号：{{ detail.order_id }}</div>
        <!-- 操作按钮 -->
        <div class="bottom">
          <!-- <button class="btn-ripple tijiao" @click="$router.push('/orderDetail?order_id=' + order_id)">查看订单</button> -->
          <button class="btn-ripple tijiao" @click="$router.push('/myOrder')">
            查看订单
          </button>
          <button class="btn-ripple back" @click="$router.push('/userIndex')">
            个人中心
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "order-pay-done",
  components: {},
  data() {
    return {
      order_id: this.$route.query.order_id,
      payState: "",
      detail: {},
    };
  },
  computed: {
    ...mapState([""]),
  },
  watch: {},
  created() {
    this.setView();
  },
  methods: {
    setView() {
      this.$api("orders_detail", {
        id: this.order_id,
      }).then((res) => {
        let { code, data, message } = res;
        if (code == 1) {
          this.detail = data;
          if (data.status_info == "待支付") {
            this.payState = "支付失败";
          } else if (data.status_info == "待审核") {
            this.payState = "提交成功";
          } else {
            this.payState = "支付成功";
          }
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.section-title {
  text-align: left;
  padding-bottom: 16px;
  border-bottom: 1px solid #d5d8de;
  font-size: 24px;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}

.page {
  text-align: center;
  font-size: 14px;

  .inner {
    width: @width;
    // width: 100%;
    margin: 0 auto;
    min-height: 50vh;
    padding: 48px 0 80px;
  }

  .pay-info {
    margin-top: 50px;
    .img-box {
      img {
        width: 80px;
      }
    }
    .text-1 {
      margin: 20px 0;
      font-size: 24px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #000000;
    }
    .text-2 {
      margin: 15px 0;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #000000;
    }
    .bottom {
      margin-top: 30px;
      .flex-center();
      button {
        width: 170px;
        height: 40px;
        background: #ffffff;
        border: 1px solid #cccccc;
        font-size: 14px;
        color: #7d7d7d;
        transition: 0.3s;
        border-radius: 4px 4px 4px 4px;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        &:hover {
          opacity: 0.8;
        }

        &.tijiao {
          margin-right: 30px;
          color: #ffffff;
          background: @theme;
        }

        &.back {
          border: 1px solid @theme;
          color: @theme;
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/shop/payDone.less"></style>
