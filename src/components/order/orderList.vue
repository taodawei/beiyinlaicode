<template>
  <div class="order-list-wrap">
    <!-- 确认收货 -->
    <orderQianshou ref="orderQianshou" />
    <!-- 取消订单 -->
    <orderCancel ref="orderCancel" />

    <div class="info-item" v-for="(order, index) in list" :key="index">
      <div class="info-title">
        <div class="date">{{ order.dtTime }}</div>
        <div class="order-code">
          订单号：
          <span>{{ order.order_id }}</span>
        </div>
        <div class="order-state" :class="'state-' + order.status">
          {{ order.status_info }}
        </div>
      </div>
      <div class="info-good">
        <div class="list-good">
          <div class="item-good" v-for="(good, index) in order.products" :key="index">
            <div class="img-box cover" @click="mix_to_goods(good)">
              <!-- <img :src="good.img" alt /> -->

              <el-image :src="good.img">
                <div slot="error" class="image-slot">
                  <img :src="good.default_img" />
                </div>
              </el-image>
            </div>
            <div class="title">
              <div class="goods-title" @click="mix_to_goods(good)">{{ good.title }}</div>
              <div class="goods-sku">{{ good.key_vals }}</div>
            </div>

            <div class="num">
              x
              {{ good.num }}
            </div>

            <div class="price">{{ good.price_sale }} 元</div>
          </div>
        </div>
      </div>
      <div class="info-heji">
        <div class="heji">
          <div class="heji-num">
            共 <b>{{ order.count_goods }}</b> 个商品
          </div>
          <div class="heji-money">
            合计金额： <b>{{ order.price }} 元</b>
          </div>
        </div>

        <div class="btn-actions">
          <button
            class="btn-ripple order-action"
            :class="action.type"
            v-for="(action, index) in order.actions"
            :key="index"
            @click="handleOrderAction(action, order.id, order)"
          >
            {{ action.name }}
          </button>

          <button class="btn-ripple order-detail" @click="jump_order_detail(order)">
            订单详情
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import order from "@/shop-actions/order";

import orderQianshou from "@/components/order/orderQianshou.vue"; //确认收货
import orderCancel from "@/components/order/orderCancel.vue"; //取消订单

import { mapState } from "vuex";

export default {
  name: "orderList",
  components: {
    orderQianshou,
    orderCancel,
  },
  props: ["list"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    updateView() {
      this.$parent.updateView();
    },

    //处理订单行为
    handleOrderAction(action, order_id, order) {
      let fahuo_id = order.fahuo_id || "";
      //console.log({ ...action });
      let name = action.name;
      if (name == "取消订单") {
        this.orders_qxOrder(order_id);
      } else if (name == "删除订单") {
        this.orders_del(order_id);
      } else if (name == "立即支付") {
        this.order_payment(order_id);
      } else if (name == "确认收货") {
        this.order_qianshou(order_id);
      } else if (name == "评价订单") {
        this.jump_pingjia(order_id);
      } else if (name == "申请售后") {
        this.jump_shouhou(order_id);
      } else if (name == "查看物流") {
        this.$router.push(
          `/orderLogistics?order_id=${order_id}&logistics_id=${fahuo_id}`
        );
      } else if (name == "售后") {
        this.$router.push(`/refundFeedback?order_id=${order_id}`);
      }
    },

    //取消订单
    orders_qxOrder(order_id) {
      let order = this.list.find((v) => v.id == order_id);
      this.$refs.orderCancel.showModal = true;
      this.$refs.orderCancel.order = order;

      // order.orders_qxOrder({
      //   params: { order_id },
      //   success: () => {
      //     this.updateView();
      //   }
      // });
    },
    //删除订单
    orders_del(order_id) {
      order.orders_del({
        params: { order_id },
        success: () => {
          this.updateView();
        },
      });
    },
    //订单支付
    order_payment(order_id) {
      this.$router.push(`/orderPaymentMethod?order_id=${order_id}`);
    },

    //订单确认收货
    order_qianshou(order_id) {
      let order = this.list.find((v) => v.id == order_id);
      this.$refs.orderQianshou.showModal = true;
      this.$refs.orderQianshou.order = order;
      //console.log("订单信息", { ...order });
    },

    //订单评价
    jump_pingjia(order_id) {
      this.$router.push(`/orderReview?order_id=${order_id}`);
    },
    //订单售后申请
    jump_shouhou(order_id) {
      this.$router.push(`/orderRefund?order_id=${order_id}`);
    },
    jump_order_detail(order) {
      this.$router.push(`/orderDetail?order_id=${order.id}`);
    },

    open_link(link) {
      window.open(link, "_blank");
    },
  },
};
</script>

<style scoped lang="less">
.goods-sku {
  margin: 15px 0;
}
.check-url {
  // margin: 15px 0;

  span {
    cursor: pointer;
    display: inlin-block;
    padding: 2px 4px;
    background: coral;
    color: #fff;
  }
}

.order-list-wrap {
  .info-item {
    border: 1px solid #e5e5e5;
    margin-bottom: 30px;
  }
  .info-title {
    .flex-between();
    height: 48px;
    padding: 0 15px;
    background: #f5f5f5;
    border-bottom: 1px solid #e5e5e5;

    .date {
      font-size: 14px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;
    }
    .order-code {
      flex: 2;
      text-align: left;
      padding-left: 20px;

      font-size: 14px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;
      span {
        color: #333333;
      }
    }
    .order-state {
      padding: 3px 6px;
      // border: 1px solid #ccc;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 20px;
      color: #999999;
      color: @theme;

      // 待付款
      &.state--5 {
        // background: #ff4c29;
        // border-color: #ff4c29;
        // color: #fff;
      }
      &.state-2 {
        color: @theme;
        border-color: @theme;
      }
    }
  }
  .info-good {
    .list-good {
      .item-good {
        padding: 20px;
        border-bottom: 1px dashed #ccc;
        .flex();

        &:last-child {
          border: none;
        }

        .img-box {
          width: 100px;
          cursor: pointer;
          img {
            width: 100px;
            height: 100px;
          }
        }
        .title {
          text-align: left;
          padding-left: 20px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 20px;
          color: #333333;
          flex: 2;

          .goods-title {
            width: fit-content;
            cursor: pointer;
            &:hover {
              color: @theme;
            }
          }
        }
        .num {
          width: 100px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 20px;
          color: #999999;
        }
        .price {
          min-width: 100px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 20px;
          color: #333333;
        }
      }
    }
  }
  .info-heji {
    padding: 15px;
    border-top: 1px solid #e5e5e5;
    .flex-between();
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 20px;
    color: #7d7d7d;

    .heji {
      .flex();
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #333333;

      .heji-num {
        margin-right: 30px;
        b {
          color: @theme;
        }
      }
      .heji-money {
        b {
          color: @theme;
        }
      }
    }

    .btn-actions {
      button {
        transition: 0.3s;
        margin-left: 15px;
        width: 104px;
        height: 32px;
        border-radius: 4px;

        &:hover {
          opacity: 0.7;
        }
      }

      .order-detail {
        background: #fff;
        border: 1px solid #cccccc;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 20px;
        color: #7d7d7d;

        border: 1px solid @theme;
        color: @theme;
      }

      .order-action {
        background: #fff;
        border: 1px solid @theme;
        font-size: 14px;
        color: @theme;

        &.zhifu {
          background: @theme;
          border-color: @theme;
          color: #fff;
        }

        &.shanchu {
          background: @theme;
          border-color: @theme;
          color: #fff;
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/shop/orderList.less"></style>
