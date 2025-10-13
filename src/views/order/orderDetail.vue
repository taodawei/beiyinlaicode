<template>
  <div class="page">
    <!-- 图片预览 -->
    <!-- <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog> -->

    <div class="main-title">
      <span>订单详情</span>
      <button @click="$router.push('/myOrder')">返回</button>
    </div>

    <div class="page-ctx">
      <div class="step-box">
        <div class="step-item active">
          <div class="step-number">
            <div class="step-line step-line-1"></div>
            <div class="step-num">1</div>
            <div class="step-line step-line-2"></div>
          </div>
          <div class="step-title">订购时间</div>
          <div class="step-date">{{ orderObj.dtTime }}</div>
        </div>
        <div class="step-item" :class="{ active: detail.status >= 3 }">
          <div class="step-number">
            <div class="step-line step-line-3"></div>
            <div class="step-num">2</div>
            <div class="step-line step-line-4"></div>
          </div>
          <div class="step-title">商品发货</div>
          <div class="step-date" style="visibility: hidden">-</div>
        </div>
        <div class="step-item" :class="{ active: detail.status >= 4 }">
          <div class="step-number">
            <div class="step-line step-line-5"></div>
            <div class="step-num">3</div>
            <div class="step-line step-line-6"></div>
          </div>
          <div class="step-title">订单收货</div>
          <div class="step-date" style="visibility: hidden">-</div>
        </div>
      </div>

      <div class="order-other">
        <div class="title">订单信息</div>
        <div class="other">
          <!--     3: "快递配送",
        4: "门店自取",
        5: "同城配送", -->

          <!-- v-if="peisong_type_text == '普通快递'" -->
          <div class="item">
            <div class="item-title">收货人信息</div>
            <div class="item-content">
              <div class="name">
                <span>收货人：</span>
                {{ shouhuo_info.name }}
              </div>
              <div class="phone">
                <span>手机号码：</span>
                {{ shouhuo_info.phone }}
              </div>
              <div class="address">
                <span>详细地址：</span>
                {{ shouhuo_info.address }}
              </div>
              <!-- <div class="address">
              <span>邮编：</span>
              {{ shouhuo_info.postCode }}
            </div> -->
            </div>
          </div>

          <div class="item">
            <div class="item-title">支付及配送方式</div>
            <div class="item-content">
              <div class="date" v-if="orderObj.status >= 1">
                <span>支付方式：</span>
                <span class="val" v-if="is_xianxia"> 线下转款 </span>
                <span class="val" v-else> {{ pay_type || "-" }} </span>
              </div>

              <div class="date">
                <span>下单时间：</span>
                {{ orderObj.dtTime }}
              </div>

              <div class="pay-type">
                <span>配送方式：</span>
                {{ "普通快递" }}
              </div>

              <!-- <div class="date" v-if="orderObj.peisong_time">
              <span>配送时间:</span>
              {{ orderObj.peisong_time }}
            </div> -->
            </div>
          </div>

          <div class="item" v-if="peisong_type_text == '上门自提'">
            <div class="item-title">取货人信息</div>
            <div class="item-content">
              <div class="name">
                <span>取货人：</span>
                {{ shouhuo_info.name }}
              </div>
              <div class="phone">
                <span>手机号码：</span>
                {{ shouhuo_info.phone }}
              </div>
            </div>
          </div>

          <div class="item" v-if="peisong_type_text == '上门自提'">
            <div class="item-title">厂家信息</div>
            <div class="item-content">
              <div class="phone">
                <span>联系方式：</span>
                {{ shequ.phone }}
              </div>
              <div class="address">
                <span>厂家地址：</span>
                {{ shequ.address }}
              </div>
            </div>
          </div>

          <!-- 转款凭证 -->
          <div class="item" v-if="is_xianxia">
            <div class="item-title">转账凭证</div>
            <div class="item-content">
              <div class="wuliu-name">
                <!-- <span>转账凭证：</span> -->

                <div class="pingzheng-box">
                  <div
                    class="pingzheng-item"
                    v-for="(item, index) in xianxia_imgs"
                    :key="index"
                  >
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="item"
                      :preview-src-list="xianxia_imgs"
                    >
                    </el-image>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 物流信息 -->
          <div class="item" v-if="fahuo_info.company">
            <div class="item-title">发货信息</div>
            <div class="item-content">
              <div class="wuliu-name">
                <span>快递公司：</span>
                {{ fahuo_info.company }}
              </div>
              <div class="wuliu-code">
                <span>物流单号：</span>
                {{ fahuo_info.order_id }}
              </div>
            </div>
          </div>
          <!-- 物流信息 -->
          <div class="item">
            <div class="item-title">订单备注</div>
            <div class="item-content">
              <div class="wuliu-name">
                <span>备注：</span>
                {{ orderObj.remark }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 订单商品信息 -->
      <div class="order-product">
        <orderInfo :order="orderObj" />
      </div>
    </div>
  </div>
</template>

<script>
import orderInfo from "@/components/order/orderInfo.vue"; //
import { mapState } from "vuex";

export default {
  name: "servicePage",
  components: {
    orderInfo,
  },
  data() {
    return {
      order_id: this.$route.query.order_id,
      orderObj: {}, //订单信息
      detail: {}, //订单信息

      shouhuo_info: {}, //收货人信息
      pay_info: {}, //支付信息
      fahuo_info: {}, //发货信息
      peisong_info: {}, //门店配送信息
      peisong_type_text: "",
      peisong_type: "",

      is_payed: false, //是否已支付
      is_fahuo: false, //是否已发货
      is_mendian_peisong: false, //是否门店配送

      shequ: {},

      xianxia_imgs: [], //线下凭证信息
      is_xianxia: false, //是否线下转款
      pay_type: "", //支付方式
    };
  },
  computed: {
    ...mapState(["defaultAvatar"]),
  },
  watch: {
    orderObj(data) {
      let { shouhuo_info, status, pay_info, fahuo_info, peisong_type, shequ } = data;

      this.peisong_type = peisong_type;
      this.shequ = shequ;
      this.shouhuo_info = shouhuo_info;
      this.pay_info = pay_info;

      //订单状态码(-5待支付 -3售后处理中 -1无效 0待成团 2待发货 3待收货 4已收货)
      if (status != -5 && status != -1 && status != 0) {
        this.is_payed = true;
      }

      //配送方式
      let peisong_map = {
        1: "上门自提",
        2: "社区配送",
        3: "普通快递",
        4: "",
        5: "",
      };

      //社区购配送方式(1自提 2社区配送 3快递)

      this.peisong_type_text = peisong_map[peisong_type] || "";
      //门店配送订单需要显示配送员信息
      if (this.peisong_type_text == "同城配送") {
        this.is_mendian_peisong = true;
        this.peisong_info = fahuo_info;
      }

      //发货信息
      if (fahuo_info && fahuo_info.company) {
        this.fahuo_info = fahuo_info;
        this.is_fahuo = true; //已经发货
      }
    },
  },
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
          data.actions = this.getOrderActionsByStatus({
            ...data,
          });

          data.products.forEach((v) => {
            v.allow_actions = this.mix_getOrderProductsAllowActions(data, v);
          });

          //积分商品
          if (data.if_jifen) {
            this.is_jifen_goods = true;
          }
          //订单状态
          if (data.pay_type == 6) {
            if (data.status == -5) {
              data.statusInfo = "待审核";
            }
          }

          //支付方式
          if (data.pay_info) {
            let pay_list = [];
            let pay_type = "";
            if (data.pay_info.yue) {
              pay_list.push({
                title: "余额",
                money: data.pay_info.yue,
              });
            }
            if (data.pay_info.yhq) {
              pay_list.push({
                title: "优惠券",
                money: data.pay_info.yhq,
              });
            }
            if (data.pay_info.weixin) {
              pay_list.push({
                title: "微信",
                money: data.pay_info.weixin,
              });
            }
            if (data.pay_info.alipay) {
              pay_list.push({
                title: "支付宝",
                money: data.pay_info.alipay,
              });
            }

            if (pay_list.length) {
              this.pay_type = pay_list.map((v) => v.title).join();
            }
          }

          //凭证图片
          if (data.paypz && data.paypz.paypz) {
            this.is_xianxia = true;
            this.xianxia_imgs = data.paypz.paypz.split(",");
          }

          this.orderObj = data;
          this.detail = data;
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.page {
  padding-bottom: 80px;
  .main-title {
    .flex-between();
    padding: 0 32px;
    text-align: left;
    height: 56px;
    line-height: 56px;
    background: #ffffff;
    font-size: 16px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #333333;

    button {
      min-width: 96px;
      height: 30px;
      line-height: 30px;
      background: @theme;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
  }
}

.page-ctx {
  margin-top: 24px;
  padding: 24px 32px;
  background: #fff;
}

.step-box {
  .flex-center();
  padding: 55px 0;

  .step-item {
    text-align: center;

    &.active {
      .step-number {
        .step-num {
          background: #fc5a00;
          color: #fff;
        }
        .step-line {
          background: #fc5a00;
        }
      }
    }

    .step-number {
      margin: 0 auto;
      .flex();

      .step-line {
        width: 147px;
        height: 2px;
        background: #f5f5f5;

        &.step-line-1 {
          visibility: hidden;
        }
        &.step-line-6 {
          visibility: hidden;
        }
      }
      .step-num {
        width: 44px;
        height: 44px;
        line-height: 44px;
        background: #fff5f0;
        border-radius: 50%;

        font-size: 20px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
    }
    .step-title {
      margin-top: 14px;
      margin-bottom: 10px;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #000000;
    }
    .step-date {
      font-size: 12px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #808080;
    }
  }
}

.order-other {
  margin-bottom: 24px;
  min-height: 156px;
  background: #ffffff;
  border: 1px solid #e5e5e5;

  .title {
    text-align: left;
    padding-left: 24px;
    height: 48px;
    line-height: 48px;
    background: #f9f9f9;
    border-bottom: 1px solid #e5e5e5;

    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;

    color: #333333;
  }

  .other {
    // .flex-between();
    display: flex;
    flex-wrap: wrap;
    padding: 20px 25px;

    .item {
      width: 50%;
      margin-bottom: 10px;
      text-align: left;
      padding-right: 40px;
      // flex: 1;
      .item-title {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        color: #333;
        margin-bottom: 10px;
      }
      .item-content {
        min-height: 20px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 20px;
        color: #666;

        > div {
          margin-bottom: 5px;
          span {
            display: inline-block;
            // min-width: 80px;
          }
        }
      }
    }
  }
}

.order-product {
}

.pingzheng-box {
  .flex();
  flex-wrap: wrap;

  .pingzheng-item {
    border: 1px solid #eee;
    margin-bottom: 10px;
    margin-right: 10px;
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/shop/orderDetail.less"></style>
