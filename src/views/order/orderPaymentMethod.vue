<template>
  <div class="page">
    <!-- 余额支付弹窗 -->
    <modalYueSetPass ref="modalYueSetPass" />
    <!-- 余额支付弹窗 -->
    <modalYuePay ref="modalYuePay" />
    <!-- 余额支付失败弹窗 -->
    <modalYuePayDisabled ref="modalYuePayDisabled" />
    <!-- 微信支付弹窗 -->
    <orderPayWxCode ref="orderPayWxCode" :payment_money="money_daizhifu" />
    <!-- 支付等待弹窗 -->
    <orderPayWaiting ref="orderPayWaiting" />

    <!-- 图片预览 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>

 

    <el-dialog title="订单提醒" :visible.sync="payConfirmTip" width="30%" :before-close="handleClose" :close-on-click-modal="false" :append-to-body="true">
      <span>确认支付当前订单？</span>
      <span slot="footer" class="dialog-footer">
        <button class="btn-ripple btn-cancel" @click="payConfirmTip = false">取 消</button>
        <button class="btn-ripple btn-confirm" @click="order_payment_confirm">确认支付</button>
      </span>
    </el-dialog>



    <div class="inner">
      <div class="order-info">
        <div class="left">
          <img src="@img/pay/create-success.png" alt="" />
        </div>
        <div class="right">
          <div class="section-1">
            <div class="text-1">订单支付信息</div>
            <div class="text-2">
              <div class="item-1">
                应付总额：<b>￥{{ money_order }}</b>
              </div>
              <!-- 
                <div class="item-2">
                订单详情
              </div>   
              -->
            </div>
          </div>

          <div class="line"></div>

          <div class="section-2" v-if="mode != 'yue'">
            <div class="text-1">
              <div class="title">订单号：</div>
              <div class="val order-no">{{ order.order_id }}</div>
            </div>
            <div class="text-1" v-if="order.peisong_type != 1">
              <div class="title">收货信息：</div>
              <div class="val">{{ shouhuoText }}</div>
            </div>
            <div class="text-1" v-if="order.peisong_type == 1">
              <div class="title">自提信息：</div>
              <div class="val">{{ shouhuoText }}</div>
            </div>
            <div class="text-1" v-if="order.peisong_type == 1">
              <div class="title">厂家信息：</div>
              <div class="val">{{ changjiaText }}</div>
            </div>

            <!-- <div class="text-1" >
              <div class="title">商品名称：</div>
              <div class="val">
                <div class="list">
                  <div class="item" v-for="(item, index) in order.products" :key="index">
                    {{ item.title }}
                  </div>
                </div>
              </div>
            </div> -->
          </div>

          <div class="section-2" v-else>
            <div class="text-1">商品名称：余额充值</div>
          </div>
        </div>
      </div>

      <!-- 订单商品列表 -->
      <div class="order-products">
        <div class="goods-box-title">
          <div class="text">订单商品</div>
        </div>

        <div class="list">
          <!-- 标题 -->
          <div class="list-title">
            <div class="title-1">产品标题</div>
            <!-- <div class="title-2">规格</div> -->
            <div class="title-2">价格</div>
            <div class="title-3">数量</div>
            <div class="title-4">小计</div>
          </div>

          <!-- 商品列表 -->
          <div class="item" v-for="(item, index) in product_list" :key="index">
            <div class="item-detail">
              <div class="item-1">
                <img :src="item.img" />
              </div>
              <div class="item-2">
                <div class="goods-title">
                  {{ item.title }}
                </div>
                <div class="goods-guige">
                  {{ item.key_vals }}
                </div>
              </div>
              <!-- <div class="item-3">{{ item.key_vals == "无" || !item.key_vals ? "默认" : item.key_vals }}</div> -->
              <div class="item-3">￥ {{ item.price_sale }}</div>
              <div class="item-4">{{ item.num }}</div>
              <div class="item-5">￥ {{ (item.price_sale * item.num).toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 支付方式 -->
      <div class="type">
        <div class="type-title">
          <div class="text">选择以下支付方式付款</div>
        </div>
        <div class="type-inner">
          <div class="select-1">
            <!-- 抵现操作 -->
            <template v-if="false">
              <div class="dixian-box" v-if="from != 'orderCreate'">
                <!-- 积分抵现功能 -->
                <div class="section-item">
                  <div class="section-title">使用积分</div>

                  <template v-if="!used_jifen">
                    <div class="section-tip" v-if="jifen_pay.jifen">可用积分：{{ +baseInfo.jifen || 0 }}, 本单最多可用 {{ jifen_pay.jifen }} 积分抵扣 {{ currency }}{{ jifen_pay.money }}</div>
                    <div class="section-tip" v-else>当前没有可抵扣的积分</div>
                    <div class="section-btn-actions">
                      <template v-if="!used_jifen">
                        <button class="btn" :class="{ active: if_use_jifen }" @click="allow_use_jifen ? (if_use_jifen = true) : ''">使用积分</button>
                        <button class="btn" :class="{ active: !if_use_jifen }" @click="if_use_jifen = false">不使用积分</button>
                      </template>
                      <template v-else>
                        <button class="btn">已使用</button>
                      </template>
                    </div>
                    <div class="use-jifen-num">
                      <span>本单{{ used_jifen ? "已" : "将" }}扣减积分</span> <b>{{ use_jifen_num }}</b>
                      <div class="dikou-info" v-if="+money_jifen_dixian">
                        <span>抵扣金额</span> <b>￥{{ money_jifen_dixian }}</b>
                      </div>
                    </div>
                  </template>

                  <template v-else>
                    <div class="section-btn-actions">
                      <button class="btn">已使用</button>
                    </div>
                  </template>
                </div>

                <!-- 佣金抵现功能 -->
                <div class="section-item">
                  <div class="section-title">使用佣金</div>
                  <div class="section-tip">可用佣金：{{ +baseInfo.yongjin || 0 }}</div>
                  <div class="section-btn-actions">
                    <template v-if="!used_yongjin">
                      <button class="btn" :class="{ active: if_use_yongjin }" @click="allow_use_yongjin ? (if_use_yongjin = true) : ''">使用佣金</button>
                      <button class="btn" :class="{ active: !if_use_yongjin }" @click="if_use_yongjin = false">不使用佣金</button>
                    </template>
                    <template v-else>
                      <button class="btn">已使用</button>
                    </template>
                  </div>
                  <div class="use-jifen-num">
                    <span>本单{{ used_yongjin ? "已" : "将" }}扣减佣金</span> <b>￥{{ money_yongjin_dixian }}</b>
                  </div>
                </div>
              </div>
            </template>

            <!-- 抵现操作 -->

            <!-- 其他支付方式 -->
            <!-- <div class="title">支付方式</div> -->
            <!-- <div class="list">
              <button class="item" :class="payType == item.title ? 'active' : ''" v-for="(item, index) in list_pay_type" :key="index" @click="select_payType(item)">
                <img :src="item.icon" alt="" />
              </button>
            </div> -->

            <div class="pay-type-list">
              <div class="section section-pay">
                <!-- <div class="section-title">支付和配送信息</div> -->
                <div class="section-ctx section-ctx-type">
                  <div class="pay-group">
                    <div class="title">支付方式：</div>
                    <div class="pay-items">
                      <div class="item" @click="payType = '微信支付'" :class="{ checked: payType == '微信支付' }">
                        <img class="img-check check-0 check-img check-img-0" src="@img/check-0.png" alt="" />
                        <img class="img-check check-1 check-img check-img-1" src="@img/check-1.png" alt="" />
                        <img class="marker-img" src="@img/pay-wx.png" alt="" />
                        <span>微信支付</span>
                      </div>
                      <!-- <div class="item" @click="payType = '支付宝支付'" :class="{ checked: payType == '支付宝支付' }">
                <img class="img-check check-0 check-img check-img-0" src="@img/check-0.png" alt="" />
                <img class="img-check check-1 check-img check-img-1" src="@img/check-1.png" alt="" />
                <img class="marker-img" src="@img/pay-zfb.png" alt="" />
                <span>支付宝支付</span>
              </div> -->
                      <div class="item" @click="payType = '余额支付'" :class="{ checked: payType == '余额支付' }">
                        <img class="img-check check-0 check-img check-img-0" src="@img/check-0.png" alt="" />
                        <img class="img-check check-1 check-img check-img-1" src="@img/check-1.png" alt="" />
                        <img class="marker-img" src="@img/pay-yue.png" alt="" />
                        <span> 余额支付 </span>
                      </div>
                      <div class="item" @click="payType = '线下转款'" :class="{ checked: payType == '线下转款' }">
                        <img class="img-check check-0 check-img check-img-0" src="@img/check-0.png" alt="" />
                        <img class="img-check check-1 check-img check-img-1" src="@img/check-1.png" alt="" />
                        <img class="marker-img" src="@img/pay-xianxia.png" alt="" />
                        <span> 线下转款 </span>
                      </div>
                    </div>
                  </div>

                  <div class="yue-info" v-if="payType == '余额支付'">
                    <div class="info-item">
                      <div class="info-label">可用余额：</div>
                      <div class="info-val">{{ +baseInfo.yue }}</div>
                    </div>
                    <div class="info-item" v-if="+baseInfo.yue < this.payment_money">
                      <div class="info-label yue-warn-tip">提示：您的余额不足，请选择其他支付方式</div>
                    </div>
                  </div>

                  <!-- 线下转款信息 -->
                  <div class="xianxia-info" v-if="payType == '线下转款'">
                    <div class="info-item">
                      <div class="info-label">收款单位名称:</div>
                      <div class="info-val">{{ webConfig.offline_company }}</div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">收款单位账号:</div>
                      <div class="info-val">{{ webConfig.offline_code }}</div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">开户银行:</div>
                      <div class="info-val">{{ webConfig.offline_bank }}</div>
                    </div>
                    <div class="info-item scroll-target-pingzheng">
                      <div class="info-label">转账凭证:</div>
                      <div class="info-val">
                        <el-upload class="upload-demo" list-type="picture-card" multiple accept="image/*" :limit="upload_limit_number" :name="upload_col_name" :action="uploadAction" :data="uploadExtraData" :on-success="uploadSuccess_pingjia" :before-upload="beforeUpload_pingjia" :on-preview="handlePictureCardPreview">
                          <i class="el-icon-plus"></i>

                          <!-- <div class="el-upload__tip" slot="tip">
                    <div class="tip-text-1">添加图片</div>
                    <div class="tip-text-2">
                      最多
                      <b class="number">6</b>
                      张
                    </div>
                  </div> -->
                        </el-upload>
                      </div>
                    </div>
                  </div>

                  <div class="pay-group" style="margin-top: 22px; margin-bottom: 12px">
                    <div class="title">配送方式：</div>
                    <div class="peisong-items">
                      <div class="item">快递配送</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="huizong-info">
              <div class="huizong">
                <!-- <div class="item">
            积分抵扣：
            <b>￥ {{ jifen_pay.money || 0 }}</b>
          </div> -->
                <!-- <div class="order-tip">
            {{ webConfig.yunfei_msg }}
          </div> -->
                <div class="item">
                  <span class="text">应付金额：</span>
                  <b class="val huizong-number">￥ {{ money_order || 0 }}</b>
                </div>

                <div class="item">
                  <span class="text">优惠券：</span>
                  <b class="val">-￥ {{ money_yhq || 0 }}</b>
                </div>

                <!-- <div class="item">
                  <span class="text">积分抵现：</span>
                  <b>-￥ {{ money_jifen_dixian || 0 }}</b>
                </div> -->

                <!-- <div class="item">
                  <span class="text">佣金：</span>
                  <b>-￥ {{ money_yongjin_dixian || 0 }}</b>
                </div> -->

                <div class="item">
                  <span class="text">运费：</span>
                  <b>￥ {{ money_yunfei || 0 }}</b>
                </div>

                <div class="total">
                  <span class="text">待支付金额:</span>
                  <b>￥ {{ money_daizhifu }}</b>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="yue-box" v-if="payType == '余额'">
          <div class="text-1">使用余额</div>
          <div class="text-2">您当前可用余额为 ￥{{ baseInfo.yue }}</div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="bottom bottom-btns">
        <button class="btn-ripple back" @click="back_from">返回</button>
        <!-- <button class="tijiao" :disabled="disabledPay" @click="order_payment">立即支付</button> -->
        <button class="btn-ripple tijiao" @click="order_payment_submit">立即支付</button>
      </div>
    </div>
  </div>
</template>

<script>
import modalYueSetPass from "@/components/yue/modalYueSetPass.vue";
import modalYuePay from "@/components/yue/modalYuePay.vue";
import modalYuePayDisabled from "@/components/yue/modalYuePayDisabled.vue";

import orderPayWxCode from "@/components/order/orderPayWxCode.vue";
import orderPayWaiting from "@/components/order/orderPayWaiting.vue";

import order from "@/shop-actions/order";

import { mapState } from "vuex";

export default {
  name: "order-pay-type",
  components: {
    modalYueSetPass,
    modalYuePay,
    modalYuePayDisabled,
    orderPayWxCode,
    orderPayWaiting,
  },
  data() {
    return {
      from: this.$route.query.from || "",
      order_id: this.$route.query.order_id,
      mode: this.$route.query.mode == "yue" ? "yue" : "",
      type: this.$route.query.mode == "yue" ? 0 : 1,

      showModal_wx: false, //微信支付弹窗
      show_pop: false,
      order: {}, //订单信息

      pay_info: {}, //支付信息
      list_payment: [], //要支付的商品信息
      currency: "￥", //货币
      list: [], //订单的商品列表
      product_list: [],
      product_info: [], //订单对应的创建订单所需信息
      orderMoney: 0,

      timer: null,

      if_use_jifen: true, //是否使用积分抵扣
      if_use_yongjin: true, //是否使用佣金扣减
      jifen_pay: {}, //积分抵扣信息

      money_yunfei: 0, //运费
      money_yhq: 0, //优惠总额
      order_price: 0, //总 订单金额



      used_jifen: false, //是否已使用积分抵扣
      used_yongjin: false, //是否已使用佣金抵扣

      allow_use_jifen: true, //是否允许使用积分
      allow_use_yongjin: true, //是否允许使用佣金

      baseInfo_query_done: false, //是否已经查询完用户信息

      //
      is_pay_pass: 0, //是否设置余额支付密码
      payType: "",
      upload_limit_number: 6,
      dialogVisible: false,
      dialogImageUrl: "", //转账图片查看
      payConfirmTip: false, //确认支付信息提示
      xianxia_file_list: [],
    };
  },
  computed: {
    ...mapState([""]),

    list_pay_type() {
      let arr = [
        // {
        //   title: "佣金支付",
        //   icon: require("@img/pay/paytype-yue.png"),
        //   notYue: true,
        // },
        // { title: "支付宝", icon: require("@img/pay/paytype-zfb.png") },
        { title: "微信", icon: require("@img/pay/paytype-wx.png") },
        // {
        //   title: "货到付款",
        //   icon: require("@img/pay/paytype-daofu.png"),
        //   notYue: true,
        // },
        // {
        //   title: "线下转款",
        //   icon: require("@img/pay/type-xianxia.png"),
        //   notYue: true,
        // },

        // { title: "银行卡支付", icon: require("@img/pay/paytype-visa.png") },
      ];
      if (this.mode == "yue") {
        arr = arr.filter((v) => !v.notYue);
      }

      return arr;
    },

    //购物车商品总金额
    payment_money() {
      let money = 0;
      if (this.mode == "yue") {
        money = sessionStorage.getItem("yue_money");
      } else {
        if (this.order) {
          money = this.order.price;

          if (this.order.pay_info && this.order.pay_info.jifen) {
            money -= this.order.pay_info.jifen;
          }
        }
      }
      if (money) {
        money = (+money).toFixed(2);
      }

      return money;
    },

    //收货或自提信息
    shouhuoText() {
      let ret = "";
      if (this.order) {
        let shouhuo_info = this.order.shouhuo_info;
        if (shouhuo_info) {
          let { address, name, phone } = shouhuo_info;

          //自提订单
          if (this.order.peisong_type == 1) {
            ret = `${name} ${phone} `;
          } else {
            ret = `${name} ${phone} ${address}`;
          }
        }
      }
      return ret;
    },

    //厂家信息  //自提订单
    changjiaText() {
      let ret = "";
      if (this.order) {
        let shequ = this.order.shequ;
        if (shequ) {
          let { address, phone } = shequ;

          ret = `联系电话：${phone} ， 厂家地址：${address} `;
        }
      }
      return ret;
    },

    //是否可以支付
    disabledPay() {
      let ret = false;
      if (this.payType == "余额") {
        if (this.baseInfo.yue < this.payment_money) {
          ret = true;
        }
      }

      return ret;
    },

    //使用积分支付要抵扣的积分
    use_jifen_num() {
      if (!this.if_use_jifen) {
        return 0;
      }

      //已使用积分支付过
      if (this.pay_info.jifen && this.jifen_pay.rule) {
        return this.pay_info.jifen * this.jifen_pay.rule;
      }
      // debugger

      //需要优先考虑选择优惠券后的积分数值变动
      let jifen = 0;
      let total_dixian_jifen = this.jifen_pay.jifen || 0; //最大可抵扣积分数值
      if (this.money_yhq) {
        if (this.jifen_pay.money && this.order_price) {
          //最大可抵扣金额 = （剩余待支付金额 = 订单金额 - 优惠金额） 与  可使用积分的最大抵扣金额

          let last_dixian_jifen = (this.order_price - this.money_yhq) * this.jifen_pay.rule;
          if (last_dixian_jifen < 0) {
            total_dixian_jifen = 0;
          } else {
            total_dixian_jifen = last_dixian_jifen < total_dixian_jifen ? last_dixian_jifen : total_dixian_jifen;
          }
        }
      }
      if (this.baseInfo.jifen && total_dixian_jifen) {
        if (this.baseInfo.jifen < total_dixian_jifen) {
          jifen = this.baseInfo.jifen;
        } else {
          jifen = total_dixian_jifen;
        }
      }

      return parseInt(jifen);
    },

    //订单总金额
    money_order() {
      // return this.order.price || 0
      return this.money_goods + this.money_yunfei;
    },

    //商品 金额
    money_goods() {
      let ret = 0;
      if (this.order && this.order.products) {
        this.order.products.forEach((v) => {
          if (this.currency == "积分") {
            ret += v.jifen;
          } else {
            ret += v.price_sale * v.num;
          }
        });
      }
      return ret;
    },

    //运费 金额
    // money_yunfei() {
    //   return this.order.yunfei || 0;
    // },

    //优惠金额
    // money_yhq() {
    //   let money_yhq = 0;

    //   debugger
    //   if (this.pay_info.yhq) {
    //     money_yhq = +this.pay_info.yhq || 0;
    //   }

    //   return money_yhq;
    // },

    //积分抵现金额
    money_jifen_dixian() {
      if (this.order.pay_info && this.order.pay_info.jifen) {
        return +this.order.pay_info.jifen;
      }

      let money = 0;

      if (this.use_jifen_num && this.jifen_pay.rule) {
        money = this.use_jifen_num / this.jifen_pay.rule;
      }

      return +money;
    },

    //佣金抵现金额
    money_yongjin_dixian() {
      if (this.order.pay_info && this.order.pay_info.yue) {
        return +this.order.pay_info.yue;
      }

      if (!this.if_use_yongjin) {
        return 0;
      }
      if (!this.baseInfo.yongjin) {
        return 0;
      }

      // debugger

      let money_yongjin = 0;
      let money_last = 0; //剩余待支付金额
      if (this.order_price) {
        money_last = this.order_price - this.money_yhq - this.money_jifen_dixian;

        if (money_last > this.baseInfo.yongjin) {
          money_yongjin = this.baseInfo.yongjin;
        } else {
          money_yongjin = money_last;
        }
      }

      return money_yongjin.toFixed(2);
    },

    // 剩余待支付金额
    money_daizhifu() {
      //剩余待支付金额 = 订单总金额(已减去优惠券)  - 积分抵现 -  佣金抵现
      let money_daizhifu = 0;

      // if (this.order.order_price) {
      //   money_daizhifu = this.order.order_price - this.money_jifen_dixian - this.money_yongjin_dixian;
      // }
      if (this.order_price) {
        money_daizhifu = this.order_price - this.money_yhq;
      }

      // debugger;
      return money_daizhifu;
    },
  },
  watch: {
    baseInfo(data) {
      if (data) {
        this.is_pay_pass = data.is_pay_pass;

        this.baseInfo_query_done = true;

        // this.check_jifen_yongjin();
      }
    },
  },
  created() {
    this.$store.dispatch("getUserInfo");
    this.setView();
  },

  beforeDestroy() {
    this.clearTimer();
  },

  methods: {
    yuePayPassSetCallback() {
      this.is_pay_pass = 1;
    },
    updatePhone() {
      this.$refs.modalBindPhone.init();
    },
    parentHandleModalAction(option = {}) {
      let type = option.type || "";
      if (type == "修改绑定") {
        this.$store.dispatch("getUserInfo");
      }
    },

    //检测积分佣金是否可使用的情况  如果用户来自于下单页面 则默认不显示 积分 佣金使用
    check_jifen_yongjin() {
      if (this.order.price && this.baseInfo_query_done) {
        // debugger
        let data = this.baseInfo;
        if (data.jifen <= 0 || this.from == "orderCreate") {
          this.allow_use_jifen = false;
          this.if_use_jifen = false;
        }
        if (data.yongjin <= 0 || this.from == "orderCreate") {
          this.allow_use_yongjin = false;
          this.if_use_yongjin = false;
        }
      }
    },

    back_from() {
      // debugger;
      if (this.from == "orderCreate") {
        this.$router.push("/myOrder");
      } else {
        this.$router.back();
      }
    },
    handleClose(done) {},

    //获取已使用的积分数值

    showWaiting() {
      this.clearTimer();
      let that = this;

      this.$refs.orderPayWaiting.show = true;

      this.timer = setInterval(() => {
        this.$api("orders_detail", {
          id: this.order_id,
        }).then((res) => {
          let { code, data, message } = res;
          if (data.status == 2 || data.status == 3) {
            that.jump_payDone();
          }
        });
      }, 2000);
    },

    clearTimer() {
      //console.log("清除定时器");
      clearInterval(this.timer);
      this.timer = null;
    },

    setView() {
      this.$api("orders_detail", {
        id: this.order_id,
      }).then((res) => {
        let { code, data, message } = res;
        if (code == 1) {
          this.order = data;
          this.product_list = data.products;

          this.check_jifen_yongjin();

          this.pay_info = data.pay_info || {};
          if (data.pay_info) {
            // debugger;
            this.money_yhq = data.pay_info.yhq || 0;

            if (data.pay_info.jifen) {
              this.used_jifen = true;
            }
            if (data.pay_info.yue) {
              this.used_yongjin = true;
            }
          }

          if (data.status_info != "待支付") {
            alertErr("当前订单不是待支付状态!");
            this.$router.push("/myOrder");
          } else {
            this.orders_getPayInfo();
          }
        }
      });
    },

    //根据下单商品获取确认订单信息
    orders_getPayInfo() {
      // let product_info = sessionStorage.getItem("list_payment");
      // let list_product = JSON.parse(product_info);

      let list_product = this.order.products;
      let list_product_str = list_product.map((v) => ({
        inventoryId: v.id || v.inventoryId,
        productId: v.productId,
        num: v.num,
      }));
      list_product_str = JSON.stringify(list_product_str);

      this.$api("orders_getPayInfo", {
        address_id: "",
        product_info: list_product_str,
      }).then((res) => {
        let { code, data, message } = res;
        if (code == 1) {
          //console.log("根据下单商品获取确认订单信息", data);
          this.order_price = data.order_price;
          this.money_yunfei = +data.yunfei || 0;
          this.jifen_pay = data.jifen_pay;
        }
      });
    },

    //选择收货地址
    select_payType(item) {
      this.payType = item.title;
    },

    //滚动到指定位置 元素类名
    scrollToTarget(clsName) {
      // var element = document.querySelector(".wenxian-box");
      var element = document.querySelector(clsName);
      element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    },

    // 支付提示
    order_payment_submit() {

      if (this.payType == "线下转款") {
        if (!this.xianxia_file_list.length) {
          alertErr("请上传转款凭证信息");
          this.scrollToTarget(".scroll-target-pingzheng");
          return;
        }
      }


      if (this.payType == "余额支付") {
        if (+this.baseInfo.yue < +this.money_daizhifu) {
          alertErr("您的余额不足，请选择其他支付方式");
          this.scrollToTarget(".section-pay");
          return;
        }

        if (!this.is_pay_pass) {
          alertErr("请先设置余额支付密码");
          // this.scrollToTarget(".section-pay");
          this.$refs.modalYueSetPass.init(this.baseInfo);
          return;
        }
      }

      this.payConfirmTip = true;
    },

    //确认支付
    order_payment_confirm() {
      this.payConfirmTip = false;

      // if ((!this.if_use_jifen || this.baseInfo.jifen <= 0) && (!this.if_use_yongjin || this.baseInfo.yongjin <= 0)) {
      //   //不使用积分 不使用佣金  直接进行微信支付
      //
      // } else {
      //   this.order_pay_step();
      // }

      this.callPayFn();
    },

    //支付方式调取
    callPayFn() {
      if (this.payType == "微信支付") {
        this.order_payment_wx_pc();
      } else if (this.payType == "支付宝支付") {
        this.order_payment_zfb();
      } else if (this.payType == "余额支付") {
        this.$refs.modalYuePay.init({
          order_id: this.order_id,
          money: this.payment_money,
        });
        // this.order_payment_yue();
      } else if (this.payType == "线下转款") {
        this.order_payment_xianxia();
      }
    },

    //微信支付 pc
    order_payment_wx_pc() {
      this.$api("orders_wxScanCodePay", {
        order_id: this.order_id,
      }).then((res) => {
        //console.log("pc 微信扫码", res);
        // alert(res);
        let { code, data } = res;
        if (res.code == 1) {
          let info = {
            // ...res,
            qrcode: data.qrcode,
            order_id: this.order_id,
          };
          this.$refs.orderPayWxCode.init(info);
          // this.$refs.orderPayWxCode.qrcode = data.qrcode;
          // this.$refs.orderPayWxCode.showModal = true;
          // this.showWaiting();
        }
      });
    },

    //pc 支付宝支付
    order_payment_zfb() {
      // alertErr('尚未开通支付宝支付');

      this.showWaiting();

      this.$api("orders_aliScanCodePay", {
        order_id: this.order_id,
      }).then((res) => {
        //console.log("支付宝支付", res);
        let { code, message, data } = res;
        if (code == 1) {
          const { href } = this.$router.resolve({
            path: "/zfbPay",
            query: {
              htmlData: data,
            },
          });
          window.open(href, "_blank");

          // this.$router.push({
          //   path: "/zfbPay",
          //   query: {
          //     htmlData: data,
          //   },
          // });
        }
      });
    },

    //余额支付
    order_payment_yue() {
      if (+this.baseInfo.money < +this.money_daizhifu) {
        alertErr("您的余额不足，请选择其他支付方式");
        return;
      }

      this.$api("orders_yuePay", { order_id: this.order_id }).then((res) => {
        //console.log("余额支付", res);
        let { code, message } = res;

        if (code == 1) {
          this.jump_payDone();
        } else {
        }
      });
    },

    //线下转款
    order_payment_xianxia() {
      // this.$api("orders_offlinePay", { order_id: this.order_id }).then((res) => {
      //   //console.log("货到付款支付", res);
      //   let { code, message } = res;

      //   if (code == 1) {
      //     this.jump_payDone();
      //   } else {
      //     this.toFail();
      //   }
      // });

      let paypz = this.xianxia_file_list.join();
      this.$api("orders_uploadPz", {
        //
        order_id: this.order_id,
        paypz: paypz,
      }).then((res) => {
        //console.log("线下转款支付", res);
        let { code, message } = res;
        if (code == 1) {
          this.jump_payDone();
        } else {
          this.toFail();
        }
      });
    },

    toFail() {
      this.$router.push(`/payFail?order_id=${this.order_id}`);
    },

    order_pay_step() {
      //支付步骤
      //积分 1
      //佣金 2
      //微信支付 3
      if (this.if_use_jifen && this.use_jifen_num > 0) {
        this.order_jifen_dixian();
      } else if (this.if_use_yongjin && this.money_yongjin_dixian) {
        this.order_yongjin_pay();
      }
    },

    // 订单积分抵现
    order_jifen_dixian() {
      this.$api("orders_jifenPay", {
        order_id: this.order_id,
        jifen: this.use_jifen_num,
      }).then((res) => {
        //console.log("积分抵现", res);
        let { code, is_over, message } = res;
        if (code == 1) {
          this.used_jifen = true;
          if (is_over == 1) {
            alert(res);
            //支付完成
            this.$router.push("/myOrder");
          } else {
            //有佣金
            if (this.if_use_yongjin && this.money_yongjin_dixian) {
              this.order_yongjin_pay();
            } else {
              //没选择佣金 用微信
              this.order_payment_wx_pc();
            }
          }
        }
      });
    },

    //订单佣金抵现
    order_yongjin_pay() {
      this.$api("orders_yuePay", {
        order_id: this.order_id,
      }).then((res) => {
        //console.log("余额抵扣", res);
        let { code, is_over } = res;
        if (code == 1) {
          this.used_yongjin = true;
          if (is_over == 1) {
            alert(res);
            //支付完成
            this.$router.push("/myOrder");
          } else {
            //佣金不足 用微信
            this.order_payment_wx_pc();
          }
        }
      });
    },

    //确认
    order_payment() {
      //console.log(this.payType);
      let payType = this.payType;

      // if (this.disabledPay) {
      //   return;
      // }

      // if (!payType) {
      //   alertErr("请选择支付方式");
      //   return;
      // }

      if (this.money_daizhifu != 0) {
        // alertErr('当前支付方式组合不足以支付当前订单，请勾选其他支');
      }
      return;

      if (payType == "微信") {
        // this.orderPayWxJsapi(); //订单微信jsapi支付
      } else if (payType == "余额") {
        this.orderPay_yue();
      } else if (payType == "货到付款") {
        this.orderPay_huodaofukuan();
      } else if (payType == "线下转款") {
        this.orderPay_xianxia();
      } else if (payType == "支付宝") {
        this.global_zfb(); // *********
      } else if (payType == "银行卡支付") {
        this.orderPay_xinyongka();
      } else if (payType == "PayPal") {
      }
    },

    //Global 微信JSAPI支付 pay_wxJspay
    global_wx() {
      // this.$api("pay_wxJspay", {
      //   order_id: this.order_id,
      //   type: this.type, //类型：0-充值  1-订单支付
      // }).then((res) => {
      //   //console.log("Global 微信JSAPI支付 pay_wxJspay", res);
      //   let { code, data, message } = res;

      //   if (code == 1) {
      //     // location.href = data.url;
      //     window.open(data.url, "_blank");
      //   } else {
      //   }
      // });

      this.$api("pay_qrCodePay", {
        order_id: this.order_id,
        type: this.type, //类型：0-充值  1-订单支付
        source: 0, //	类型：0-支付宝  1-微信
      }).then((res) => {
        //console.log("Global 支付宝H5支付 pay_aliH5pay", res);
        let { code, data, message } = res;
        if (code == 1) {
          // location.href = data.url;
          window.open(data.url, "_blank");
        } else {
        }
      });
    },

    //Global 支付宝H5支付 pay_aliH5pay
    global_zfb() {
      // this.$api("pay_aliH5pay", {
      //   order_id: this.order_id,
      //   type: this.type, //类型：0-充值  1-订单支付
      // }).then((res) => {
      //   //console.log("Global 支付宝H5支付 pay_aliH5pay", res);
      //   let { code, data, message } = res;
      //   if (code == 1) {
      //     // location.href = data.url;
      //     window.open(data.url, "_blank");
      //   } else {
      //   }
      // });

      this.$api("pay_qrCodePay", {
        order_id: this.order_id,
        type: this.type, //类型：0-充值  1-订单支付
        source: 1, //	类型：0-支付宝 1-微信
      }).then((res) => {
        //console.log("Global 支付宝H5支付 pay_aliH5pay", res);
        let { code, data, message } = res;
        if (code == 1) {
          // location.href = data.url;
          window.open(data.url, "_blank");
        } else {
        }
      });
    },

    //订单微信jsapi支付
    orderPayWxJsapi() {
      let that = this;
      order.orders_wxPay({
        params: {
          order_id: this.order_id,
        },
        success: (data) => {
          //console.log("订单微信jsapi支付", data);
          let { timeStamp, nonceStr, signType, paySign } = data;

          wx.chooseWXPay({
            timestamp: timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr, // 支付签名随机串，不长于 32 位
            package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign, // 支付签名
            success: function (res) {
              that.jump_payDone();
            },
            fail(err) {
              //console.log("支付失败了");
            },
          });
        },
        fail: (err) => {
          //console.log("支付失败", err);
        },
      });
    },

    //余额支付
    orderPay_yue() {
      this.$api("orders_yuePay", { order_id: this.order_id }).then((res) => {
        //console.log("余额支付", res);
        let { code, message } = res;

        if (code == 1) {
          this.jump_payDone();
        } else {
          this.$router.push(`/payFail?order_id=${this.order_id}`);
        }
      });
    },

    //货到付款
    orderPay_huodaofukuan() {
      this.$api("orders_cashOnDelivery", { order_id: this.order_id }).then((res) => {
        //console.log("货到付款支付", res);
        let { code, message } = res;

        if (code == 1) {
          this.jump_payDone();
        } else {
          this.$router.push(`/payFail?order_id=${this.order_id}`);
        }
      });
    },
    //线下转款
    orderPay_xianxia() {
      this.$api("orders_offlinePay", { order_id: this.order_id }).then((res) => {
        //console.log("货到付款支付", res);
        let { code, message } = res;

        if (code == 1) {
          this.jump_payDone();
        } else {
          this.$router.push(`/payFail?order_id=${this.order_id}`);
        }
      });
    },
    //银行卡支付
    //https://stripe.com/docs/testing
    orderPay_xinyongka() {
      this.$api("pay_stripeOrder", {
        order_id: this.order_id,
        type: this.type,
      }).then((res) => {
        //console.log("银行卡支付", res);
        let { code, data, message } = res;

        // return
        if (code == 1) {
          // location.href = data.url;
          window.open(data.url, "_blank");
        } else {
          this.$router.push(`/payFail?order_id=${this.order_id}`);
        }
      });
    },

    //支付成功操作
    jump_payDone() {
      if (this.mode == "yue") {
        this.$router.push(`/yue`);
      } else {
        this.$router.push(`/payDone?order_id=${this.order_id}`);
      }
    },

    //上传相关
    uploadSuccess_pingjia(res, file) {
      //console.log("上传结果", res);
      let { code, data, message } = res;
      alert(res);
      if (code == 1) {
        this.xianxia_file_list.push(data);
      }
    },

    beforeUpload_pingjia(file) {
      const isLt2M = file.size / 1024 / 1024 < 20; //文件大小
      return isLt2M;
    },

    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url;
      this.dialogImageUrl = file.response.data;
      this.dialogVisible = true;
    },

    // 上传相关结束
  },
};
</script>


<style scoped lang="less">
.upload-box {
  padding: 20px 20px;
  text-align: left;
}

.btn-cancel {
  min-width: 100px;
  height: 40px;
  border: 1px solid @theme;
  color: @theme;
  font-size: 14px;
}

.btn-confirm {
  margin-left: 20px;
  min-width: 100px;
  height: 40px;
  background: @theme;
  color: #fff;
  font-size: 14px;
}

.img-check {
  cursor: pointer;
  &.check-0 {
    display: block;
  }
  &.check-1 {
    display: none;
  }
}

.checked {
  cursor: pointer;
  .check-0 {
    display: none !important;
  }
  .check-1 {
    display: block !important;
  }
}

/deep/ .el-dialog__header {
  text-align: center;
}
/deep/ .el-dialog__body {
  text-align: center;
}
/deep/ .el-dialog__footer {
  text-align: center;
}

.page {
  padding-top: 40px;
  text-align: center;
  font-size: 14px;
  margin-top: 92px;
  .inner {
    width: @width;
    margin: 0 auto;

    padding: 20px 0 80px;
  }

  .type {
    margin-bottom: 40px;
    text-align: left;
    min-height: 127px;
    background: #ffffff;
    border: 1px solid #ddd;

    .type-title {
      padding-left: 20px;
      padding-right: 20px;
      height: 48px;
      line-height: 48px;
      background: #f9f9f9;
      border-bottom: 1px solid #ddd;
      border-top: none;
      font-size: 14px;
      font-weight: bold;
      color: #333333;
    }

    .type-inner {
      padding: 30px 20px;

      .select-1 {
        // .flex();

        & + .select-1 {
          margin-top: 30px;
        }
        .title {
          margin-bottom: 15px;
          font-size: 14px;
          font-weight: bold;
          color: #333333;
        }
        .list {
          button {
            margin-right: 20px;
            width: 160px;
            height: 60px;
            border: 1px solid #ddd;
            background: #ffffff;
            overflow: hidden;
            &.active {
              border: 1px solid #ff9312;
            }

            img {
              height: 30px;
              object-fit: contain;
              vertical-align: bottom;
            }
          }
        }
      }
    }
  }

  .main-title {
    .flex-between();
    margin-bottom: 30px;
    text-align: left;

    .left {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ff1312;

      .num {
        margin-left: 10px;
      }
    }
    .right {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 24px;
      color: #333333;

      .el-select {
        width: 250px;
      }
    }
  }

  .bottom2 {
    .flex();
    justify-content: flex-end;
    button {
      width: 200px;
      height: 40px;
      background: #ffffff;
      border: 1px solid #ddd;
      font-size: 16px;
      font-weight: bold;
      color: #333333;
      transition: 0.3s;
      border-radius: 45px;
      &:hover {
        opacity: 0.8;
      }

      &.tijiao {
        margin-left: 50px;
        color: #ffffff;
        background: linear-gradient(90deg, #ff9312 0%, #eb5d53 100%);
        border-color: #ff3d00;

        &:disabled {
          filter: grayscale(100%);
          cursor: not-allowed;
        }
      }
    }
  }

  .bottom-btns {
    display: flex;
    justify-content: flex-end;
    button {
      width: 191px;
      height: 46px;
      // border-radius: 30px;
      background: #ffffff;
      border: 1px solid #cccccc;
      font-size: 16px;
      font-weight: 400;
      color: #ea3200;

      transition: 0.3s;
      &:hover {
        opacity: 0.8;
      }

      &.back {
        margin-right: 24px;
        border: 1px solid #ea3200;
        font-size: 16px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #ea3200;
      }

      &.tijiao {
        color: #ffffff;
        background: #ea3200;
      }
    }
  }
}

.order-info {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #ddd;
  .flex();
  align-items: flex-start;

  .left {
    img {
      width: 80px;
    }
  }
  .right {
    flex: 2;
    padding-left: 40px;
    text-align: left;
  }
  .section-1 {
    padding-top: 50px;
    .flex-between();

    .text-1 {
      font-size: 22px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 20px;
      color: #333333;
    }
    .text-2 {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 13px;
      color: #333333;

      b {
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 13px;
        color: #f13f17;
      }
    }
  }

  .line {
    margin: 30px 50px 30px 0;
    border-top: 1px solid #eeeeee;
  }
  .section-2 {
    .text-1 {
      .flex();
      align-items: flex-start;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 30px;

      .title {
        color: #666;
      }
      .val {
        color: #333333;
      }
      .order-no {
        color: #ff9312;
      }
    }
  }
}

.yue-box {
  padding: 20px;
  .text-1 {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 30px;
    color: #333333;
  }
  .text-2 {
    margin-top: 15px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 30px;
    color: #666666;
  }
}

.dixian-box {
  .section-item {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px dashed #ddd;
  }
  .section-title {
    margin-bottom: 5px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 25px;
    color: #333333;
  }
  .section-tip {
    margin-bottom: 5px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 25px;
    color: #666666;
  }
  .section-input {
    margin-top: 5px;
    margin-bottom: 5px;
    input {
      display: inline-block;
      width: 240px;
      height: 35px;
      background: #ffffff;
      border: 1px solid #ddd;
      opacity: 1;
      border-radius: 4px;
      padding-left: 15px;
    }

    textarea {
      border: 1px solid #ddd;
      outline: none;
      width: 460px;
      min-height: 100px;
      background: #fff;
      resize: none;
      padding: 10px 15px;
      border-radius: 4px;
    }

    .el-input {
      width: 340px;
    }
    .el-select {
      width: 340px;
    }
    .el-textarea {
      width: 460px;
    }
  }

  .use-jifen-num {
    .flex();
    margin-top: 10px;
    margin-bottom: 10px;
    span {
      display: inline-block;
      height: 20px;
      line-height: 20px;
    }
    b {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      color: @theme;
      vertical-align: bottom;
    }

    .dikou-info {
      margin-left: 10px;
      .flex();
    }
  }

  .section-btn-actions {
    .flex();

    .btn {
      width: 160px;
      height: 32px;
      margin-right: 20px;
      font-size: 16px;
      font-weight: bold;
      background: #e1e1e1;
      color: #333333;
      &.active {
        background: #009a44;
        color: #ffffff;
      }
    }
  }
}

// 支付金额汇总
.huizong-info {
  margin-top: 20px;
  .huizong {
    padding: 20px;
    // padding-top: 0;
    background: #f9f9f9;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    // line-height: 30px;
    color: #333333;

    .item {
      margin-bottom: 10px;
      text-align: right;

      b {
        display: inline-block;
        min-width: 130px;
        font-weight: normal;
        font-size: 20px;
        color: #333;
      }

      .huizong-number {
        font-size: 20px;
        color: #f13f17;
      }
    }
    .total {
      text-align: right;
      .text {
      }

      b {
        display: inline-block;
        min-width: 130px;
        font-weight: bold;
        font-size: 20px;
        color: #f13f17;
      }
    }
  }
}

.order-products {
  margin-bottom: 32px;
  border: 1px solid #ddd;
  .goods-box-title {
    text-align: left;
    padding-left: 20px;
    padding-right: 20px;
    height: 48px;
    line-height: 48px;
    background: #f9f9f9;
    border-bottom: 1px solid #ddd;
    border-top: none;
    font-size: 14px;
    font-weight: bold;
    color: #333333;
  }
  .list {
    .list-title {
      .flex();
      font-size: 14px;
      text-align: center;
      height: 48px;
      background: #f9f9f9;
      background: #fafbfc;
      padding: 15px;
      color: #666;

      // border-bottom: 1px solid #ddd;
      .title-1 {
        flex: 2;
        text-align: left;
        padding-left: 10px;
      }
      .title-2 {
        width: 150px;
      }
      .title-3 {
        width: 150px;
      }
      .title-4 {
        width: 150px;
      }
    }
    .item {
      border-bottom: 1px solid #eee;
      &:last-child {
        border-bottom: none;
      }

      .item-detail {
        padding: 15px;
        text-align: center;
        font-size: 16px;
        color: #333333;

        .flex();

        .item-1 {
          width: 100px;
          img {
            width: 100px;
            height: 100px;
          }
        }
        .item-2 {
          flex: 2;
          padding-left: 20px;
          text-align: left;

          .goods-title {
            height: 40px;
            font-size: 12px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #666666;
            line-height: 18px;
          }
          .goods-guige {
            font-size: 12px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #999999;
          }
        }
        .item-3 {
          width: 150px;

          color: @theme;
        }
        .item-4 {
          width: 150px;
        }
        .item-5 {
          width: 150px;
          color: @theme;
        }
      }
    }
  }
}

// 支付方式
.section-pay {
  .pay-group {
    .flex();
    .title {
      min-width: 120px;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #666666;
    }
    .pay-items {
      flex: 1;
      .flex();

      .item {
        .flex();
        margin-right: 60px;
        cursor: pointer;

        .check-img {
          width: 21px;
        }
        .check-img-1 {
          display: none;
        }

        .marker-img {
          width: 39px;
          margin: 0 10px;
        }

        span {
          font-size: 16px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #000000;
        }
      }
    }

    .peisong-items {
      .item {
        text-align: center;
        width: 144px;
        height: 40px;
        line-height: 40px;
        background: #ffffff;
        border-radius: 3px 3px 3px 3px;
        border: 1px solid #ea3200;
        font-size: 14px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #ea3200;
      }
    }
  }
}

// 余额信息
.yue-info {
  margin-top: 32px;
  padding: 24px 120px;
  padding: 24px 32px;
  // padding-bottom: 0;
  border: 1px dashed #ccc;
  .info-item {
    .flex();
    align-items: flex-start;
    margin-bottom: 10px;
    .info-label {
      line-height: 32px;
      padding-right: 10px;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #666666;
    }

    .info-val {
      line-height: 32px;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #666666;
    }

    .yue-warn-tip {
      color: @theme;
      font-size: 14px;
    }
  }
}

// 线下转款信息
.xianxia-info {
  margin-top: 32px;
  padding: 24px 120px;
  padding: 24px 32px;
  // padding-bottom: 0;
  border: 1px dashed #ccc;

  .info-item {
    .flex();
    align-items: flex-start;
    margin-bottom: 10px;
    .info-label {
      line-height: 32px;
      padding-right: 10px;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #666666;
    }

    .info-val {
      line-height: 32px;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #666666;
    }
  }
}
</style>
