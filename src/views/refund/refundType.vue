<template>
  <div class="page">
    <div class="main-title">申请售后</div>

    <div class="refund-info">
      <!-- 商品信息 -->
      <refundGoodsInfo :order="order" />

      <!-- 服务类型 -->
      <div class="service-box">
        <div class="service-title">选择服务类型</div>
        <div class="service-list">
          <div class="service-item" @click="jump_apply_shouhou('3')">
            <div class="img-box">
              <img src="@img/refund/refund-type-1.png" alt />
            </div>
            <div class="text-box">
              <div class="type">我要换货</div>
              <div class="desc">已收到货，需要更换已收到的货物</div>
            </div>
          </div>
          <div class="service-item" @click="jump_apply_shouhou('2')">
            <div class="img-box">
              <img src="@img/refund/refund-type-2.png" alt />
            </div>
            <div class="text-box">
              <div class="type">我要退货退款</div>
              <div class="desc">已收到货，需要退还收到的货物</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import refundGoodsInfo from "@/components/refund/refundGoodsInfo.vue"; //
import { mapState } from "vuex";

export default {
  name: "servicePage",
  components: {
    refundGoodsInfo,
  },
  data() {
    return {
      order_id: this.$route.query.order_id,
      inventoryId: this.$route.query.inventoryId,
      order: {},
    };
  },
  computed: {
    ...mapState([""]),
  },
  created() {
    this.setView();
  },
  methods: {
    setView() {
      this.$api("orders_detail", {
        id: this.order_id,
      }).then((res) => {
        //console.log("订单详情", res);
        let { code, data, message } = res;
        if (code == 1) {
          this.order = data;
        }
      });
    },

    jump_apply_shouhou(type) {
      //退换货类型(1-退款   2-退货退款  3-换货)
      this.$router.push(
        `/refundSubmit?order_id=${this.order_id}&inventoryId=${this.inventoryId}&refund_type=${type}`
      );
    },
  },
};
</script>


<style scoped lang="less">
.page {
  padding-bottom: 80px;
  .main-title {
    margin-bottom: 20px;
    text-align: left;

    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 20px;
    color: #333333;
  }
}

.refund-info {
  padding: 20px 30px;
  min-height: 370px;
  background: #ffffff;
  border: 1px solid #ddd;
}

// 售后类型
.service-box {
  border-top: 1px solid #eee;
  padding-top: 20px;

  .service-title {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 30px;
    color: #333333;
    margin-bottom: 20px;
    text-align: left;
  }
  .service-list {
    .flex-between();

    .service-item {
      width: 450px;
      height: 120px;
      background: #ffffff;
      border: 1px solid #eeeeee;
      opacity: 1;
      border-radius: 4px;
      padding-left: 20px;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        background: #eee;
        // background: #FF9312;
      }

      .flex();
      .img-box {
        img {
          width: 48px;
        }
      }
      .text-box {
        text-align: left;
        padding-left: 20px;
        flex: 2;

        .type {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          line-height: 20px;
          color: #333333;
        }
        .desc {
          margin-top: 10px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;

          color: #9f9f9f;
        }
      }
    }
  }
}
</style>
