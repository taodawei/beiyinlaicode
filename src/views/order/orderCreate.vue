<template>
  <div class="page">
    <!-- 修改绑定手机号 -->
    <modalBindPhone ref="modalBindPhone" />
    <!-- 新增收货地址弹窗 -->
    <addressAdd ref="addressAdd" />

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

    <!-- 订单支付提示 -->
    <el-dialog
      class="modal-pay-tip"
      title="订单提醒"
      :visible.sync="payConfirmTip"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <span>确认支付当前订单？</span>
      <span slot="footer" class="dialog-footer">
        <button class="btn-ripple btn-cancel" @click="payConfirmTip = false">
          取 消
        </button>
        <button class="btn-ripple btn-confirm" @click="order_payment_confirm">
          确认支付
        </button>
      </span>
    </el-dialog>

    <div class="inner">
      <div class="main-title" v-if="false">
        <div class="left">
          <span>我的购物车</span>
          <!-- <span class="num">{{ shopcart_count }}</span> -->
        </div>
        <div class="right">
          <!-- <span>配送至：</span>
          <el-select v-model="address" placeholder="请选择">
            <el-option
              v-for="item in list_address"
              :key="item.id"
              :label="item.full_dizhi"
              :value="item.id"
            ></el-option>
          </el-select>-->

          <!-- 步骤条 -->
          <div class="step-box">
            <div class="step step-1">1.我的购物车</div>
            <div class="step step-2 active">2.填写/核对订单信息</div>
            <div class="step step-3">3.成功提交订单</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">选择收货人地址</div>
        <div class="section-ctx">
          <div class="address-list">
            <div
              class="address-item"
              v-for="(item, index) in list_address"
              :key="index"
              :class="{ active: item.id == select_address.id }"
              @click="handleSelectAddress(item)"
            >
              <div class="address-top">{{ item.areaName }}（{{ item.name }}收）</div>
              <div class="address-bottom">
                {{ item.areaName }} {{ item.address }} {{ item.phone }}
              </div>
              <img src="@img/dizhi-check-1.png" alt="" class="marker" />
            </div>
          </div>
          <div class="btn-box">
            <button class="btn-ripple" @click="handleAddressOpen">使用新地址</button>
          </div>
        </div>
      </div>

      <div class="section section-info">
        <div class="section-title">确认结算相关信息</div>
        <div class="section-ctx">
          <div class="input-list target-user-info">
            <div class="input-item">
              <div class="label">真实姓名 <span>*</span></div>
              <div class="val">
                <el-input clearable v-model="form.real_name" placeholder=""></el-input>
              </div>
            </div>
            <div class="input-item">
              <div class="label">绑定手机 <span>*</span></div>
              <div class="val">
                <!-- <el-input v-model="form.phone" placeholder=""></el-input> -->
                <span>{{ form.phone }}</span>
                <img
                  src="@img/address-edit.png"
                  alt=""
                  class="img-address-edit"
                  @click="updatePhone"
                />
              </div>
            </div>
            <div class="input-item">
              <div class="label">专属销售工程师 <span></span></div>
              <div class="val">
                <el-input clearable v-model="form.worker" placeholder=""></el-input>
              </div>
            </div>
            <div class="input-item">
              <div class="label">研究机构/院校 <span>*</span></div>
              <div class="val">
                <el-input clearable v-model="form.company" placeholder=""></el-input>
              </div>
            </div>
            <div class="input-item">
              <div class="label">课题组 <span>*</span></div>
              <div class="val">
                <el-input clearable v-model="form.u_group" placeholder=""></el-input>
              </div>
            </div>
            <div class="input-item">
              <div class="label">所在地区 <span>*</span></div>
              <div class="val">
                <el-input clearable v-model="form.address" placeholder=""></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section section-pay">
        <div class="section-title">支付和配送信息</div>
        <div class="section-ctx section-ctx-type">
          <div class="pay-group">
            <div class="title">支付方式：</div>
            <div class="pay-items">
              <div
                class="item"
                @click="payType = '微信支付'"
                :class="{ checked: payType == '微信支付' }"
              >
                <img
                  class="img-check check-0 check-img check-img-0"
                  src="@img/check-0.png"
                  alt=""
                />
                <img
                  class="img-check check-1 check-img check-img-1"
                  src="@img/check-1.png"
                  alt=""
                />
                <img class="marker-img" src="@img/pay-wx.png" alt="" />
                <span>微信支付</span>
              </div>
              <!-- <div class="item" @click="payType = '支付宝支付'" :class="{ checked: payType == '支付宝支付' }">
                <img class="img-check check-0 check-img check-img-0" src="@img/check-0.png" alt="" />
                <img class="img-check check-1 check-img check-img-1" src="@img/check-1.png" alt="" />
                <img class="marker-img" src="@img/pay-zfb.png" alt="" />
                <span>支付宝支付</span>
              </div> -->
              <div
                class="item"
                @click="payType = '余额支付'"
                :class="{ checked: payType == '余额支付' }"
              >
                <img
                  class="img-check check-0 check-img check-img-0"
                  src="@img/check-0.png"
                  alt=""
                />
                <img
                  class="img-check check-1 check-img check-img-1"
                  src="@img/check-1.png"
                  alt=""
                />
                <img class="marker-img" src="@img/pay-yue.png" alt="" />
                <span> 余额支付 </span>
              </div>
              <div
                class="item"
                @click="payType = '线下转款'"
                :class="{ checked: payType == '线下转款' }"
              >
                <img
                  class="img-check check-0 check-img check-img-0"
                  src="@img/check-0.png"
                  alt=""
                />
                <img
                  class="img-check check-1 check-img check-img-1"
                  src="@img/check-1.png"
                  alt=""
                />
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
              <div class="info-label yue-warn-tip">
                提示：您的余额不足，请选择其他支付方式
              </div>
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
                <el-upload
                  class="upload-demo"
                  list-type="picture-card"
                  multiple
                  accept="image/*"
                  :limit="upload_limit_number"
                  :name="upload_col_name"
                  :action="uploadAction"
                  :data="uploadExtraData"
                  :on-success="uploadSuccess_pingjia"
                  :before-upload="beforeUpload_pingjia"
                  :on-preview="handlePictureCardPreview"
                >
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

          <div class="pay-group" style="margin-top: 32px">
            <div class="title">配送方式：</div>
            <div class="peisong-items">
              <div class="item">快递配送</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 收货人地址 -->
      <div class="type-select" v-if="false">
        <div class="type-title">
          <div class="text">配送方式</div>
        </div>
        <div class="type-inner">
          <!-- <div class="select-1">
            <div class="title">支付方式</div>
            <div class="list">
              <button
                class="item"
                :class="payType == item.val ? 'active' : ''"
                v-for="(item, index) in list_payType"
                :key="index"
                @click="select_payType(item)"
              >
                {{ item.text }}
              </button>
            </div>
          </div> -->

          <div class="select-1">
            <div class="title">配送方式</div>
            <div class="list">
              <button
                class="item"
                :class="peisong_type == item ? 'active' : ''"
                v-for="(item, index) in opts_peisong"
                :key="index"
                @click="peisong_toggle(item)"
              >
                {{ item }}
              </button>
            </div>
          </div>

          <!-- <div class="ziti-box" v-if="peisong_type == '上门自提'">
            <div class="title">厂家信息</div>
            <div class="ziti-info">地址：{{ webConfig.com_address }}</div>
            <div class="ziti-info">电话：{{ webConfig.com_kefu }}</div>
          </div> -->

          <!-- <div class="select-1">
            <div class="title">配送时间</div>
            <div class="list">
              <el-date-picker v-model="select_date" type="date" placeholder="选择配送时间" value-format="yyyy-MM-dd" :picker-options="pickerOptions"> </el-date-picker>

              <el-select v-model="select_time" placeholder="请选择" style="margin-left: 30px">
                <el-option v-for="item in defaultContent" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
            </div>
          </div> -->
        </div>
      </div>

      <!-- <div class="ziti-wrap" v-if="peisong_type == '上门自提'">
        <div class="ziti-title">厂家信息</div>
        <div class="ziti-ctx">
          <div class="ziti-info">厂家地址：{{ webConfig.com_address }}</div>
          <div class="ziti-info">联系电话：{{ webConfig.com_kefu }}</div>
        </div>
      </div>

      <div class="ziti-wrap" v-if="peisong_type == '上门自提'">
        <div class="ziti-title">取货人信息</div>
        <div class="ziti-ctx">
          <div class="ziti-info"><span>取货人姓名：</span> <el-input v-model="shouhuo_name" placeholder="请输入取货人姓名"></el-input></div>
          <div class="ziti-info"><span>取货人电话：</span> <el-input v-model="shouhuo_phone" placeholder="请输入取货人电话"></el-input></div>
        </div>
      </div> -->

      <!-- 收货人地址 -->
      <div class="dizhi-select" v-if="false && peisong_type == '快递配送'">
        <div class="dizhi-title">
          <div class="text">收货人地址</div>
          <div class="add">
            <b @click="show_address_add">+新增收货地址</b>
          </div>
        </div>
        <div class="dizhi-inner">
          <div class="tip" v-if="!list_address.length">
            您还没有收货地址，
            <b @click="show_address_add">新增收货地址</b>
          </div>
          <div class="list" v-else>
            <div
              class="item"
              :class="select_address.id == item.id ? 'active' : ''"
              v-for="(item, index) in list_address"
              :key="index"
              @click="onSelectAddress(item)"
            >
              <button class="name" :class="address == item.id ? 'active' : ''">
                {{ item.name }}
              </button>
              <div class="phone">{{ item.phone }}</div>
              <div class="address">{{ item.areaName }} {{ item.address }}</div>
              <button class="moren" v-if="item.if_default">默认</button>

              <div class="checked" v-if="select_address.id == item.id">已选择</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品列表 -->

      <div class="section section-huizong">
        <div class="section-title">订单商品</div>
        <div class="section-ctx">
          <div class="goods-list">
            <!-- <div class="title">订单商品</div> -->
            <div class="list">
              <div class="goods-list-inner">
                <!-- 标题 -->
                <div class="list-title">
                  <div class="title-1">产品标题</div>
                  <!-- <div class="title-2">规格</div> -->
                  <div class="title-2">价格</div>
                  <div class="title-3">数量</div>
                  <div class="title-4">小计</div>
                </div>

                <!-- 商品列表 -->
                <div class="item" v-for="(item, index) in list_payment" :key="index">
                  <div class="item-detail">
                    <div class="item-1">
                      <el-image :src="item.image">
                        <div slot="error" class="image-slot">
                          <img :src="item.default_img" />
                        </div>
                      </el-image>
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
                    <div class="item-5">
                      ￥ {{ (item.price_sale * item.num).toFixed(2) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="order-action">
              <div class="order-action-inner">
                <div class="section-item" v-if="list_coupon.length">
                  <div
                    class="sub-title"
                    @click="showCoupon = !showCoupon"
                    :class="{ 'expand-0': !showCoupon }"
                  >
                    <div class="text">使用优惠</div>
                    <img src="@img/pay-arrow-top.png" alt="" />
                  </div>
                  <!-- <div class="section-input">
                    <el-select v-model="coupon_select_id" placeholder="请选择优惠券">
                      <el-option v-for="item in list_coupon" :key="item.id" :label="`${item.title} 【${item.miaoshu}】`" :value="item.id"> </el-option>
                    </el-select>
                  </div> -->

                  <div class="yhq-list" v-if="showCoupon">
                    <div
                      class="yhq-item"
                      v-for="(item, index) in list_coupon"
                      :key="index"
                      :class="{ active: coupon_select_id == item.id }"
                      @click="handleCouponSelect(item)"
                    >
                      <img src="@img/dizhi-check-1.png" alt="" class="marker" />

                      <div class="yhq-top">
                        <div class="yhq-1">
                          <div class="text-1">￥{{ +item.jian }}</div>
                          <div class="text-2">满{{ +item.man }}</div>
                        </div>
                        <div class="yhq-2">
                          有效期至 {{ item.endTime && item.endTime.substr(0, 10) }}
                        </div>
                      </div>
                      <div class="yhq-bottom">
                        <div class="yhq-3">[{{ item.title }}]</div>
                      </div>
                    </div>
                  </div>

                  <div class="yhq-select-info">
                    <b>金额抵用</b>

                    <template v-if="coupon_select.id">
                      <b class="number">￥{{ +coupon_select.jian }}</b
                      >, 使用【{{ coupon_select.title }}】优惠券 1张，优惠
                      {{ +coupon_select.jian }} 元
                    </template>
                    <template v-else> 无 </template>
                  </div>
                </div>

                <div class="section-item" v-if="false">
                  <div class="sub-title">使用积分</div>
                  <div class="section-tip" v-if="jifen_pay.jifen">
                    可用积分：{{ +baseInfo.jifen || 0 }}, 本单最多可用
                    {{ jifen_pay.jifen }} 积分抵扣 {{ currency }}{{ jifen_pay.money }}
                  </div>
                  <div class="section-tip" v-else>当前没有可抵扣的积分</div>

                  <div class="section-btn-actions">
                    <button
                      class="btn"
                      :class="{ active: if_use_jifen }"
                      @click="if_use_jifen = true"
                    >
                      使用积分
                    </button>
                    <button
                      class="btn"
                      :class="{ active: !if_use_jifen }"
                      @click="if_use_jifen = false"
                    >
                      不使用积分
                    </button>
                  </div>
                  <div class="use-jifen-num">
                    本单将扣减积分 <b>{{ use_jifen_num }}</b>
                  </div>
                  <!-- <div class="section-input" v-if="jifen_pay.jifen">
                <el-input type="number" :disabled="jifen_pay.jifen <= 0" v-model="use_jifen_num" @input="onInput_jifen" placeholder="请填写要抵扣的积分"></el-input>
              </div> -->
                </div>

                <div class="section-item" v-if="false">
                  <div class="sub-title">使用佣金</div>
                  <div class="section-tip">可用佣金：{{ +baseInfo.yongjin || 0 }}</div>

                  <div class="section-btn-actions">
                    <button
                      class="btn"
                      :class="{ active: if_use_yongjin }"
                      @click="if_use_yongjin = true"
                    >
                      使用佣金
                    </button>
                    <button
                      class="btn"
                      :class="{ active: !if_use_yongjin }"
                      @click="if_use_yongjin = false"
                    >
                      不使用佣金
                    </button>
                  </div>

                  <div class="use-jifen-num">
                    本单将扣减佣金 <b>{{ money_yongjin_dixian }}</b>
                  </div>

                  <!-- <div class="section-input" v-if="jifen_pay.jifen">
                <el-input type="number" :disabled="jifen_pay.jifen <= 0" v-model="use_jifen_num" @input="onInput_jifen" placeholder="请填写要抵扣的积分"></el-input>
              </div> -->
                </div>

                <!-- 
            <div class="section-item">
              <div class="section-title">优惠码</div>
              <div class="section-input">
                <el-input v-model="yh_code" placeholder="请填写优惠码"></el-input>
              </div>
              <div class="section-tip">优惠码填写完成后, 请点击下方使用按钮查询优惠信息。</div>
              <div class="section-input">
                <div class="btn-actions">
                  <el-button size="small" type="warning" @click="query_yh">使用优惠</el-button>
                  <el-button size="small" type="warning" @click="not_use_yh">不使用</el-button>
                </div>
              </div>
            </div>
          -->

                <div class="section-item remark-box">
                  <div class="sub-title">
                    <b> 订单备注 </b>
                  </div>
                  <div class="section-input input-box">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 3 }"
                      placeholder="请填写订单备注"
                      v-model="remark"
                    >
                    </el-input>
                    <!-- <textarea placeholder="请填写订单备注"></textarea> -->
                  </div>
                </div>
              </div>
            </div>

            <div class="huizong">
              <!-- <div class="item">
            积分抵扣：
            <b>￥ {{ jifen_pay.money || 0 }}</b>
          </div> -->
              <!-- <div class="order-tip">
            {{ webConfig.yunfei_msg }}
          </div> -->

              <div class="item">
                <!-- <span class="text">共：</span> -->
                <b class="val">共 {{ total_number || 0 }} 件</b>
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
                <span class="text">金额总计（含运费）:</span>
                <b>￥ {{ payment_money }}</b>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="bottom-btns">
        <button class="btn-ripple back" @click="$router.push('/shoppingCart')">
          返回购物车
        </button>
        <button class="btn-ripple tijiao" @click="submit_order">去支付</button>
      </div>
    </div>
  </div>
</template>

<script>
import modalBindPhone from "@/components/modals/modalBindPhone.vue";
import addressAdd from "@/components/address/addressAdd.vue"; //新增地址

import modalYueSetPass from "@/components/yue/modalYueSetPass.vue";
import modalYuePay from "@/components/yue/modalYuePay.vue";
import modalYuePayDisabled from "@/components/yue/modalYuePayDisabled.vue";

import orderPayWxCode from "@/components/order/orderPayWxCode.vue";
import orderPayWaiting from "@/components/order/orderPayWaiting.vue";

import { mapState } from "vuex";

export default {
  name: "create-order",
  components: {
    modalBindPhone,
    addressAdd,
    modalYueSetPass,
    modalYuePay,
    modalYuePayDisabled,
    orderPayWxCode,
    orderPayWaiting,
  },
  data() {
    return {
      order_id: "", //是否已经创建过订单
      showCoupon: true, //

      if_use_jifen: true, //是否使用积分抵扣
      if_use_yongjin: true, //是否使用佣金扣减
      jifen_pay: {}, //积分抵扣信息
      currency: "￥", //货币

      money_yunfei: 0,
      order_price: 0, //总 订单金额

      yh_code: "",
      yh_code_info: {},

      remark: "",

      peisong_type: "快递配送",
      select_address: {},
      address: "", //选择的地址
      list_address: [], //地址列表
      list_payment: [], //要支付的商品信息
      list_coupon: [], //优惠券
      coupon_select_id: "", //选择的优惠券 id

      // select_date: "", //日期
      // select_time: "", //时间

      shouhuo_name: "", //自提 取货人姓名
      shouhuo_phone: "", //自提 取货人电话

      // pickerOptions: {
      //   disabledDate(time) {
      //     return time.getTime() < Date.now() - 1000 * 60 * 60 * 24 * 1 || time.getTime() > Date.now() + 1000 * 60 * 60 * 24 * 6;
      //   },
      // },

      form: {
        real_name: "",
        phone: "",
        address: "",
        company: "",
        u_group: "",
        worker: "",
      },

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
    ...mapState(["if_calc_yunfei"]),

    total_number() {
      let number = 0;
      if (this.list_payment.length) {
        this.list_payment.forEach((v) => {
          number += +v.num;
        });
      }
      return number;
    },

    //选择的优惠券
    coupon_select() {
      return this.list_coupon.find((v) => v.id == this.coupon_select_id) || {};
    },

    opts_peisong() {
      let arr = ["快递配送", "上门自提"];
      return arr;
    },

    //使用积分支付要抵扣的积分
    use_jifen_num() {
      if (!this.if_use_jifen) {
        return 0;
      }

      // debugger

      //需要优先考虑选择优惠券后的积分数值变动
      let jifen = 0;
      let total_dixian_jifen = this.jifen_pay.jifen || 0; //最大可抵扣积分数值
      if (this.money_yhq) {
        if (this.jifen_pay.money && this.order_price) {
          //最大可抵扣金额 = （剩余待支付金额 = 订单金额 - 优惠金额） 与  可使用积分的最大抵扣金额

          let last_dixian_jifen =
            (this.order_price - this.money_yhq) * this.jifen_pay.rule;
          if (last_dixian_jifen < 0) {
            total_dixian_jifen = 0;
          } else {
            total_dixian_jifen =
              last_dixian_jifen < total_dixian_jifen
                ? last_dixian_jifen
                : total_dixian_jifen;
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

    //优惠金额
    money_yhq() {
      let money_yhq = 0;
      if (this.coupon_select_id) {
        let yhq = this.list_coupon.find((v) => v.id == this.coupon_select_id) || {};
        money_yhq = yhq.jian || 0;
      }
      return money_yhq;
    },

    //积分抵现金额
    money_jifen_dixian() {
      let money = 0;
      if (this.use_jifen_num && this.jifen_pay.rule) {
        money = this.use_jifen_num / this.jifen_pay.rule;
      }
      return +money;
    },

    //佣金抵现金额
    money_yongjin_dixian() {
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

    money_daizhifu() {
      return this.payment_money;
    },
    //商品总金额
    payment_money() {
      //总支付   商品金额 + 运费
      //减免     优惠券金额  + 积分抵现 + 佣金
      let money = 0;
      if (this.order_price) {
        money = this.order_price; //已包含运费
      }

      //优惠券信息
      if (this.coupon_select_id) {
        let yhq = this.list_coupon.find((v) => v.id == this.coupon_select_id) || {};
        let money_yhq = yhq.jian || 0;
        money -= money_yhq;
      }

      // 积分抵现
      // if (this.money_jifen_dixian) {
      //   money -= this.money_jifen_dixian;
      // }

      //佣金
      // if (this.money_yongjin_dixian) {
      //   money -= this.money_yongjin_dixian;
      // }

      money = money - 0;
      money = money < 0 ? 0 : money;
      return money.toFixed(2);
    },
  },
  watch: {
    //监视选择的地址
    select_address() {
      // this.orders_getPayInfo(); //根据下单商品获取确认订单信息
    },
    //配送方式变化 需要重新获取
    coupon_select_id(val, prev) {
      //console.log(val, prev);
    },

    baseInfo(data) {
      this.is_pay_pass = data.is_pay_pass;

      this.form = {
        real_name: data.real_name || "",
        phone: data.phone || "",
        address: data.address || "",
        company: data.company || "",
        u_group: data.u_group || "",
        worker: data.worker || "",
      };
    },

    payType(val) {
      if (val == "余额支付") {
        if (this.baseInfo.is_pay_pass == 0) {
          //未设置支付密码
          this.$refs.modalYueSetPass.init(this.baseInfo);
        } else if (+this.baseInfo.yue < this.payment_money) {
          //余额不足提示
          this.$refs.modalYuePayDisabled.init({
            money: this.payment_money,
          });
        }
      }
    },
  },

  created() {
    this.init();
    this.setView();
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

    init() {
      this.$store.dispatch("getUserInfo");
      this.get_list_payment();
    },

    setView() {
      this.address_getList(); //获取地址列表
      this.orders_getPayInfo();
    },

    //支付金额
    get_list_payment() {
      try {
        //console.log(JSON.parse(sessionStorage.getItem("list_payment")));
        if (sessionStorage.getItem("list_payment")) {
          this.list_payment = JSON.parse(sessionStorage.getItem("list_payment"));
        }
      } catch (error) {}
    },

    //获取地址列表
    address_getList() {
      this.$api("userAddress_lists").then((res) => {
        let { code, data } = res;
        if (code == 1) {
          data.forEach((v) => {
            v.full_dizhi = v.areaName + " " + v.address;
            // v.selected =  v.if_default
          });

          this.list_address = data;

          let obj = data.find((v) => v.if_default) || {};
          this.select_address = obj || {};

          this.$store.commit("set_vuex_data", {
            key: "default_address",
            val: obj,
          });
        }
      });
    },

    //根据下单商品获取确认订单信息
    orders_getPayInfo() {
      let product_info = sessionStorage.getItem("list_payment") || "[]";
      let list_product = JSON.parse(product_info);
      let list_product_str = list_product.map((v) => ({
        inventoryId: v.inventoryId,
        productId: v.productId,
        num: v.num,
      }));
      list_product_str = JSON.stringify(list_product_str);

      this.$api("orders_getPayInfo", {
        address_id: this.select_address.id || "",
        product_info: list_product_str,
      }).then((res) => {
        let { code, data, message } = res;
        if (code == 1) {
          //console.log("根据下单商品获取确认订单信息", data);

          if (data.yhq_list.length) {
            this.list_coupon = data.yhq_list.map((item) => ({
              ...item,

              miaoshu: +item.man
                ? `满${+item.man}减${+item.jian}元`
                : `下单立减${+item.jian}元`,
              youxiaoqi:
                item.startTime.substr(0, 10) + " - " + item.endTime.substr(0, 10),
            }));
          }

          this.order_price = data.order_price;
          this.money_yunfei = +data.yunfei || 0;
          this.jifen_pay = data.jifen_pay;
        }
      });
    },

    getPayParams() {
      //console.log("coupon_select_id", this.coupon_select_id);
      //console.log("this.select_address", { ...this.select_address });

      // let reg_phone = /^1[3-9]\d{9}$/;
      // let is_true_phone = reg_phone.test(this.shouhuo_phone);

      // if (this.peisong_type == "快递配送") {
      //   if (!this.select_address.id) {
      //     alertErr("请选择收货地址");
      //     return;
      //   }
      // } else if (this.peisong_type == "上门自提") {
      //   if (!this.shouhuo_name) {
      //     alertErr("请输入取货人姓名");
      //     return;
      //   }
      //   if (!is_true_phone) {
      //     alertErr("请输入正确的取货人电话");
      //     return;
      //   }
      // }

      // return
      let product_info = this.list_payment.map((v) => ({
        inventoryId: v.inventoryId,
        productId: v.productId,
        num: v.num,
      }));

      // let peisong_type = this.peisong_type == "快递配送" ? "3" : "1";

      let params = {
        address_id: this.select_address.id,
        product_info: JSON.stringify(product_info),
        yhq_id: this.coupon_select_id || "",
        remark: this.remark,
        // peisong_type: peisong_type, //社区购配送方式(1自提 2社区配送 3快递)
        // shouhuo_name: this.select_address.name || "", //提货人姓名
        // shouhuo_phone: this.select_address.phone || "", //提货人电话
      };

      //自提是1
      // if (this.peisong_type == "上门自提") {
      //   params.shequ_id = 1;
      //   params.shouhuo_name = this.shouhuo_name;
      //   params.shouhuo_phone = this.shouhuo_phone;

      //   delete params.address_id;
      // }

      //console.log("要提交的订单", { ...params });

      return params;
    },

    //提交订单
    submit_order() {
      let params_info = {
        ...this.form,
      };

      delete params_info.phone;

      if (!params_info.real_name) {
        alertErr("请输入真实姓名");
        this.scrollToTarget(".target-user-info");
        return;
      }
      // if(!params_info.real_name) {
      //   alertErr('请输入真实姓名')
      //   return
      // }
      // if(!params_info.real_name) {
      //   alertErr('请输入真实姓名')
      //   return
      // }
      if (!params_info.company) {
        alertErr("请输入研究机构/院校");
        this.scrollToTarget(".target-user-info");
        return;
      }
      if (!params_info.u_group) {
        alertErr("请输入课题组");
        this.scrollToTarget(".target-user-info");
        return;
      }
      if (!params_info.address) {
        alertErr("请输入所在地区");
        this.scrollToTarget(".target-user-info");
        return;
      }

      if (!this.payType) {
        alertErr("请选择支付方式");
        this.scrollToTarget(".section-pay");

        return;
      }

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

      this.$api("users_editInfo", params_info).then((res) => {
        let { code, message, data } = res;
        if (code == 1) {
          // this.createOrder(params);
          this.payConfirmTip = true;
        }
      });
    },

    //滚动到指定位置 元素类名
    scrollToTarget(clsName) {
      // var element = document.querySelector(".wenxian-box");
      var element = document.querySelector(clsName);
      element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    },

    handleClose(done) {},

    //确认支付
    order_payment_confirm() {
      this.payConfirmTip = false;

      // let not_use_jifen = !this.if_use_jifen || this.baseInfo.jifen <= 0;
      // let not_use_yongjin = !this.if_use_yongjin || this.baseInfo.yongjin <= 0;
      // if (not_use_jifen && not_use_yongjin) {
      //   //不使用积分 不使用佣金  直接进行微信支付
      //   // alert(res);
      //   // this.to_pay_methods();
      // } else {
      //   this.order_pay_step();
      // }

      let params = this.getPayParams();

      this.$api("orders_create", {
        ...params,
      }).then((res) => {
        let { code, data, order_id } = res;
        if (code == 1) {
          this.order_id = order_id;

          this.callPayFn();
        }
      });
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
    //支付成功操作
    jump_payDone() {
      if (this.mode == "yue") {
        this.$router.push(`/yue`);
      } else {
        this.$router.push(`/payDone?order_id=${this.order_id}`);
      }
    },

    order_pay_step() {
      //支付步骤
      //优惠券

      //积分 1
      //佣金 2
      //其他 3
      if (this.if_use_jifen && this.use_jifen_num > 0) {
        this.order_jifen_dixian(); //积分抵现
      } else if (this.if_use_yongjin && this.money_yongjin_dixian) {
        this.order_yongjin_pay(); //佣金支付
      }
    },

    //购物车 删除支付的商品
    shopcart_delete_payment() {
      let ids = this.list_payment.map((v) => v.inventoryId);
      let id = ids.join();

      this.mix_shopcart_delete(id);
    },

    //显示地址添加
    show_address_add() {
      // debugger;
      this.$refs.addressAdd.showAdd = true;
    },

    //选择收货地址
    handleSelectAddress(item) {
      this.select_address = item;
    },
    handleAddressOpen() {
      this.$refs.addressAdd.showAdd = true;
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
          if (this.if_use_yongjin && this.money_yongjin_dixian) {
            this.order_yongjin_pay();
          } else {
            alert(res);
            if (is_over == 1) {
              //支付完成
              this.$router.push("/myOrder");
            } else {
              this.to_pay_methods();
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
          alert(res);
          if (is_over == 1) {
            //支付完成
            this.$router.push("/myOrder");
          } else {
            this.to_pay_methods();
          }
        }
      });
    },

    //订单创建成功
    to_pay_methods() {
      if (this.$route.query.from == "shoppingCart") {
        this.shopcart_delete_payment();
      }

      this.$router.push({
        path: "/orderPaymentMethod",
        query: {
          order_id: this.order_id,
          from: "orderCreate",
        },
      });
    },

    //输入积分时
    onInput_jifen() {
      //console.log("输入积分", +this.use_jifen_num);
      //console.log("最多可使用积分", +this.jifen_pay.jifen);

      if (this.use_jifen_num && +this.use_jifen_num > +this.jifen_pay.jifen) {
        alertErr(`输入的积分大于${this.jifen_pay.jifen},请重新输入`);
        this.use_jifen_num = "";
      }
    },

    peisong_toggle(item) {
      //console.log("配送方式", item);

      this.peisong_type = item;

      if (item == "上门自提") {
        //console.log("用户地址", { ...this.select_address });
        if (this.select_address.id) {
          this.shouhuo_name = this.select_address.name;
          this.shouhuo_phone = this.select_address.phone;
        }
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

    //优惠券相关
    handleCouponSelect(item) {
      //console.log("优惠券", { ...item });
      this.coupon_select_id = item.id;
    },
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

.page {
  text-align: center;
  font-size: 14px;
  margin-top:92px;
  .inner {
    width: @width;
    // width: 100%;
    margin: 0 auto;
    padding: 50px 0 80px;
  }

  .main-title {
    .flex-between();
    margin-bottom: 30px;
    text-align: left;

    .left {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #333;

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

      .step-box {
        width: 500px;
        margin: 0 auto;
        font-size: 14px;
        .flex();

        .step {
          flex: 1;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background: #eee;
          cursor: pointer;
          transition: 0.3s;

          &:hover {
            opacity: 0.75;
          }

          &.step-1 {
            clip-path: polygon(0% 0%, 97% 0%, 100% 50%, 97% 100%, 0% 100%);
          }

          &.step-2 {
            clip-path: polygon(0% 0%, 97% 0%, 100% 50%, 97% 100%, 0% 100%, 3% 50%);
          }

          &.step-3 {
            clip-path: polygon(0% 0%, 97% 0%, 100% 50%, 97% 100%, 0% 100%, 3% 50%);
          }

          &.active {
            background: @theme;
            color: #fff;
          }
        }
      }
    }
  }

  .goods-list {
    // border: 1px solid #cccccc;
    // margin-bottom: 40px;
    text-align: left;

    .title {
      padding-left: 20px;
      height: 48px;
      line-height: 48px;
      background: #f9f9f9;
      border-bottom: 1px solid #cccccc;
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
          font-weight: normal;
          font-size: 20px;
          color: #333;
        }
      }

      .total {
        text-align: right;

        b {
          font-weight: bold;
          font-size: 20px;
          color: #f13f17;
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

.ziti-wrap {
  margin-bottom: 40px;
  text-align: left;
  min-height: 127px;
  background: #ffffff;
  border: 1px solid #cccccc;

  .ziti-title {
    .flex-between();
    padding-left: 20px;
    padding-right: 20px;
    height: 48px;
    line-height: 48px;
    background: #f9f9f9;
    border-bottom: 1px solid #cccccc;
    border-top: none;
    font-size: 14px;
    font-weight: bold;
    color: #333333;
  }

  .ziti-ctx {
    padding: 30px 20px;

    .ziti-info {
      margin-bottom: 15px;
      .flex();

      span {
        display: inline-block;
        min-width: 100px;
      }

      .el-input {
        width: auto;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

// 地址选择
.dizhi-select {
  margin-bottom: 40px;
  text-align: left;
  min-height: 127px;
  background: #ffffff;
  border: 1px solid #cccccc;

  .dizhi-title {
    .flex-between();
    padding-left: 20px;
    padding-right: 20px;
    height: 48px;
    line-height: 48px;
    background: #f9f9f9;
    border-bottom: 1px solid #cccccc;
    border-top: none;
    font-size: 14px;
    font-weight: bold;
    color: #333333;

    .add {
      b {
        font-weight: bold;
        color: @theme;
        cursor: pointer;
      }
    }
  }

  .dizhi-inner {
    padding: 30px 20px;

    .tip {
      font-size: 14px;
      color: #7d7d7d;

      b {
        color: @theme;
        cursor: pointer;
      }
    }

    .list {
      padding-left: 0;

      .item {
        cursor: pointer;
        font-size: 14px;
        color: #7d7d7d;
        margin-bottom: 5px;
        padding: 10px;
        padding-left: 30px;

        &:last-child {
          margin-bottom: 0;
        }

        &:hover {
          background-color: #eee;
        }

        &.active {
          background: #eee;
        }

        .flex();

        .name {
          width: 120px;
          height: 30px;
          background: #ffffff;
          border: 1px solid #cccccc;

          &.active {
            // border: 1px solid #ff3d00;
          }
        }

        .phone {
          margin: 0 15px;
        }

        .address {
        }

        .moren {
          margin-left: 20px;
          min-width: 40px;
          height: 24px;
          line-height: 24px;
          background: #f29f25;
          font-size: 12px;
          color: #ffffff;
        }

        .checked {
          flex: 2;
          color: @theme;
          text-align: right;
        }
      }
    }
  }
}

// 支付配送方式选择

.type-select {
  margin-bottom: 40px;
  text-align: left;
  min-height: 127px;
  background: #ffffff;
  border: 1px solid #cccccc;

  .type-title {
    padding-left: 20px;
    padding-right: 20px;
    height: 48px;
    line-height: 48px;
    background: #f9f9f9;
    border-bottom: 1px solid #cccccc;
    border-top: none;
    font-size: 14px;
    font-weight: bold;
    color: #333333;
  }

  .type-inner {
    padding: 30px 20px;

    .select-1 {
      .flex();

      & + .select-1 {
        margin-top: 30px;
      }

      .title {
        font-size: 14px;
        font-weight: bold;
        color: #333333;
      }

      .list {
        padding-left: 20px;

        button {
          margin-right: 20px;
          min-width: 96px;
          height: 30px;
          line-height: 30px;
          background: #ffffff;
          border: 1px solid #cccccc;

          &.active {
            border: 1px solid @theme;
          }
        }
      }
    }

    .ziti-box {
      padding-top: 10px;

      .title {
        font-weight: bold;
      }

      .ziti-info {
        margin-top: 10px;
      }
    }
  }
}

// 订单优惠等
.order-action {
  background: #f9f9f9;
  background: #fff;
  padding: 0 0;

  .order-action-inner {
    // border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }

  .section-item {
    margin-bottom: 20px;
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
      border: 1px solid #cccccc;
      opacity: 1;
      border-radius: 4px;
      padding-left: 15px;
    }

    textarea {
      border: 1px solid #cccccc;
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
      width: 100%;
    }
  }

  .use-jifen-num {
    margin-top: 10px;
    margin-bottom: 10px;

    b {
      color: @theme;
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

// 新增
.section {
  padding-bottom: 55px;
  text-align: left;

  .section-title {
    padding-bottom: 16px;
    border-bottom: 1px solid #d5d8de;
    font-size: 24px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;
  }

  .section-ctx {
    padding-top: 32px;

    .address-list {
      display: flex;
      flex-wrap: wrap;

      .address-item {
        position: relative;
        margin-top: 20px;
        margin-right: 40px;
        width: 440px;
        min-height: 130px;
        padding: 15px 20px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        border: 2px solid #d5d8de;
        overflow: hidden;
        cursor: pointer;

        &:nth-child(3n) {
          margin-right: 0;
        }

        &:nth-child(-n + 3) {
          margin-top: 0;
        }

        &.active {
          border: 2px solid #ea3200;

          .marker {
            display: block;
          }
        }

        .marker {
          position: absolute;
          right: 0;
          bottom: 0;
          display: none;
        }

        .address-top {
          padding-bottom: 15px;
          border-bottom: 1px solid #d5d8de;
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #000000;
        }

        .address-bottom {
          padding-top: 15px;
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #999999;
        }
      }
    }

    .btn-box {
      margin-top: 32px;

      button {
        min-width: 124px;
        min-height: 32px;
        background: #ffffff;
        border-radius: 2px 2px 2px 2px;
        border: 1px solid #b9b9b9;
        font-size: 14px;
        font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
        font-weight: normal;
        color: #666666;
      }
    }
  }
}

.section-info {
  .input-list {
    display: flex;
    flex-wrap: wrap;

    .input-item {
      width: 440px;
      margin-top: 34px;
      margin-right: 40px;

      &:nth-child(3n) {
        margin-right: 0;
      }

      &:nth-child(-n + 3) {
        margin-top: 0;
      }

      .label {
        margin-bottom: 16px;
        font-size: 14px;
        font-weight: normal;
        color: #666666;

        span {
          color: #ea3200;
        }
      }

      .val {
        .img-address-edit {
          margin-left: 15px;
          width: 16px;
          cursor: pointer;
        }
      }
    }
  }
}

// 支付配送
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

.section-huizong {
  .sub-title {
    .flex();
    padding-left: 30px;
    height: 50px;
    background: #fafbfc;
    cursor: pointer;

    &.expand-0 {
      margin-bottom: 15px;
    }

    .text {
      font-size: 14px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;
    }

    img {
      width: 16px;
      margin-left: 15px;
    }
  }

  .yhq-list {
    display: flex;
    flex-wrap: wrap;
    padding: 15px;

    .yhq-item {
      position: relative;
      margin-right: 24px;
      width: 220px;
      height: auto;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #e5e5e5;
      cursor: pointer;

      &.active {
        border-color: @theme;

        .marker {
          display: block;
        }
      }

      .marker {
        position: absolute;
        right: 0;
        bottom: 0;
        display: none;
      }

      .yhq-top {
        height: auto;
        background: #fdf2ef;
        padding: 10px 15px;

        .yhq-1 {
          .flex();
          align-items: flex-end;

          .text-1 {
            font-size: 24px;
            font-family: Microsoft YaHei-Bold, Microsoft YaHei;
            font-weight: bold;
            color: #ea3200;
          }

          .text-2 {
            margin-left: 5px;
            font-size: 12px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #333333;
          }
        }

        .yhq-2 {
          margin-top: 10px;
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #999999;
        }
      }

      .yhq-bottom {
        height: 32px;
        line-height: 32px;
        padding: 0 15px;
        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #ea3200;
      }
    }
  }

  .yhq-select-info {
    height: 50px;
    line-height: 50px;
    background: #fafbfc;
    padding: 0 30px;

    .number {
      color: @theme;
      margin: 0 10px;
    }
  }

  .remark-box {
    .input-box {
      padding: 15px;
    }
  }
}

.section-ctx-type {
  padding-left: 32px;
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

<style scoped lang="less" src="@/assets/h5css/shop/orderCreate.less"></style>

<style lang="less">
@media screen and (max-width: 1199px) {
  .modal-pay-tip {
    .el-dialog {
      width: 80% !important;

      .el-dialog__header {
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
      }
      .el-dialog__title {
        font-size: 16px;
      }
      .el-dialog__headerbtn {
        top: 10px;
        right: 10px;
      }
      .el-dialog__headerbtn .el-dialog__close {
        font-size: 24px;
      }

      .el-dialog__body {
        padding: 30px 20px;
        font-size: 14px;
      }

      .el-dialog__footer {
        padding-bottom: 25px;
        display: flex;
        justify-content: center;
      }
      .btn-cancel {
        height: 32px;
      }
      .btn-confirm {
        height: 32px;
      }
    }
  }
}
</style>
