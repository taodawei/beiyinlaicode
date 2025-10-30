<template>
  <div class="page">
    <modalLoading ref="modalLoading" />
    <modalAddSuccess ref="modalAddSuccess" :curr="curr" />
    <!-- 邀请好友 -->
    <!-- <modalYaoqing ref="modalYaoqing" /> -->
    <!-- 添加成功提示 -->
    <!-- 右侧优惠券列表 -->
    <!-- <goodsCouponList ref="goodsCouponList" :list="detail.yhq_list" /> -->
    <!-- <pageProductTop /> -->

    <div class="page-top">
      <div class="page-bread">
        <div class="bread-box">
          <img src="@img/product-home.png" alt="" />
          <router-link to="/">首页</router-link>
          <span class="bread-divider">&gt;</span>
          <router-link to="/products">产品中心</router-link>
          <span class="bread-divider">&gt;</span>
          <!-- <a href="javascirpt:void(0);">产品类型</a> -->
          <router-link :to="activeCate.route">产品类型</router-link>
          <span class="bread-divider">&gt;</span>
          <template v-if="activeCate.title">
            <router-link :to="activeCate.route">{{ activeCate.title }}</router-link>
            <span class="bread-divider">&gt;</span>
          </template>
          <a href="javascirpt:void(0);">{{ detail.title }}</a>
        </div>
      </div>
    </div>

    <div class="page-box">
      <div class="page-box-left">
        <div class="page-inner">
          <div class="main-content">
            <div class="top-info">
              <div class="product-title">
                {{ detail.title }} ({{ detail.skuId }})

                <span class="state-xiajia" v-if="detail.product_status == -1">
                  (该产品已下架)
                </span>
              </div>
              <div class="product-other-action">
                <div v-if="+detail.paper_num" class="action-item" @click="toWenxian">
                  <img src="@img/wenxian.png" alt="" />
                  <span>文献引用（{{ detail.paper_num }}）</span>
                </div>

                <template v-if="is_prod">
                  <a
                    target="_blank"
                    :href="
                      detail.book_url
                        ? '/productSpecificationPdf/' + detail.inventoryId
                        : '/productSpecification/' +
                          detail.productId +
                          '?ggid=' +
                          detail.inventoryId
                    "
                    class="action-item"
                  >
                    <img src="@img/pdf.png" alt="" />
                    <span>说明书</span>
                  </a>
                </template>

                <template v-else>
                  <a
                    v-if="detail.book_url"
                    target="_blank"
                    :href="'/productSpecificationPdf/' + detail.inventoryId"
                    class="action-item"
                  >
                    <img src="@img/pdf.png" alt="" />
                    <span>说明书</span>
                  </a>

                  <router-link
                    v-else
                    :to="
                      '/productSpecification/' +
                      detail.productId +
                      '?ggid=' +
                      detail.inventoryId
                    "
                    class="action-item"
                  >
                    <img src="@img/pdf.png" alt="" />
                    <span> 说明书 </span>
                  </router-link>
                </template>

                <a :href="'mailto:' + webConfig.email" class="action-item">
                  <img src="@img/email.png" alt="" />
                  <span>联系我们</span>
                </a>
                <div class="action-item" @click="favourite_toggle">
                  <img v-if="!if_shoucang" src="@img/fav-0.png" alt="" />
                  <img v-if="if_shoucang" src="@img/fav-1.png" alt="" />

                  <span>{{ if_shoucang ? "已收藏" : "收藏" }}</span>
                </div>
              </div>

              <div class="product-filter">
                <div class="text">筛选：</div>
                <div class="tabs">
                  <!-- <div class="tab-item active">WB</div> -->
                  <div
                    class="tab-item"
                    v-for="(item, index) in tiaojian_shaixuan"
                    :key="index"
                  >
                    {{ item }}
                  </div>
                </div>
                <!-- <div class="fuli">
                  <img src="@img/product-tag.png" alt="" />
                </div> -->
              </div>
            </div>

            <div class="ctx-top">
              <div class="ctx-left">
                <!-- 商品预览 -->
                <carouselComponent :swiperImgs="swiperImgs" />

                <!-- 收藏分享 -->
                <div class="shoucang-box" v-if="false">
                  <div class="shoucang-left" @click="favourite_toggle">
                    <img v-if="if_shoucang" src="@img/yishoucang.png" alt="" />
                    <img v-else src="@img/weishoucang.png" alt="" />
                    <span>{{ if_shoucang ? "取消收藏" : "收藏商品" }}</span>
                  </div>

                  <div class="shoucang-right" @click="show_yaoqing">
                    <img src="@img/fenxiang.png" alt="" />
                    <span>分享</span>
                  </div>
                </div>
              </div>

              <div class="ctx-right">
                <h2 class="huohao">货号：{{ detail.skuId }}</h2>

                <div class="info-box">
                  <div class="price">
                    价格： <span class="number">￥{{ view_info.price_sale }}</span>
                  </div>

                  <div class="sku-list">
                    <!-- 没有库存或者下架状态 -->
                    <button
                      class="sku-item"
                      :disabled="!item.kucun || item.status == -1"
                      v-for="(item, index) in list_specifications"
                      :key="index"
                      :class="{
                        active: item.inventoryId == select_specifications.inventoryId,
                      }"
                      @click="toggleSpecifications(item)"
                    >
                      <div class="img-box">
                        <img src="@img/guige-checked.png" alt="" />
                      </div>
                      <!-- <div class="text" v-if="!detail.is_yiqi">
                        {{ item.key_vals | f_guige }}
                      </div>
                      <div class="text" v-if="detail.is_yiqi">
                        {{ yiqi_guige }}
                      </div> -->

                      <div class="text">
                        {{ item.key_vals | f_guige }}
                      </div>

                      <div class="price">￥ {{ +item.price_sale }}</div>

                      <div class="guige-xiajia" v-if="item.status == -1">(已下架)</div>
                    </button>
                  </div>

                  <div class="shuliang-box">
                    <div class="sel-num-title">数量：</div>

                    <div class="shuliang">
                      <div
                        class="minus"
                        @click="selected_num > 1 ? selected_num-- : (selected_num = 1)"
                      >
                        <img src="@img/shuliang-minus.png" alt="" />
                      </div>
                      <input
                        type="number"
                        v-model="selected_num"
                        @blur="onBlur_selected_num"
                      />
                      <div class="plus" @click="selected_num++">
                        <img src="@img/shuliang-plus.png" alt="" />
                      </div>
                    </div>
                  </div>

                  <div class="btn-box">
                    <div class="huoqi">{{ huoqi_text }}</div>
                    <!-- <button class="btn-buy" @click="payNow">立即购买</button> -->
                    <button class="btn-add-cart btn-ripple" @click="shopcart_add">
                      <!-- <i class="el-icon el-icon-shopping-cart-2"></i> -->
                      加入购物车
                    </button>
                  </div>

                  <div class="phone-tip">
                    <el-popover placement="bottom" trigger="click">
                      <div class="pop-kefu">
                        <div class="pop-kefu-inner">
                          <div class="kefu-tip">请微信扫描下方二维码</div>
                          <!-- <img class="kefu-code" :src="" /> -->
                          <div ref="qrCodeUrl" class="detail-qrcode erweima"></div>
                        </div>
                      </div>
                      <div slot="reference" class="phone-tip-inner">
                        <div class="text">手机购买</div>
                        <img src="@img/phone-buy.png" />
                      </div>
                    </el-popover>
                  </div>
                </div>
              </div>
            </div>

            <div class="ctx-bottom">
              <div class="ctx-bottom-inner">
                <div class="bottom-nav">
                  <div
                    class="nav-item"
                    @click="togglePanel('详情')"
                    :class="active_panel == '详情' ? 'active' : ''"
                  >
                    产品信息
                  </div>
                  <div
                    class="nav-item"
                    @click="togglePanel('文献')"
                    :class="active_panel == '文献' ? 'active' : ''"
                  >
                    文献
                  </div>
                </div>

                <!-- -show="active_panel == '详情'" -->
                <div v-if="active_panel == '详情'" class="detail-content-box">
                  <div class="section-title" data-title="详情">产品信息</div>
                  <!-- 产品参数 -->
                  <div class="params-html" v-if="query_field_done">
                    <div class="params-box" v-if="!detail.is_yiqi">
                      <!-- 非仪器产品 -->
                      <div
                        class="params-item"
                        v-for="(field, index) in param_list"
                        :key="index"
                        :data-key="field.field_title"
                      >
                        <div class="params-label">{{ field.title }}</div>
                        <div class="params-val" v-html="field.val"></div>
                      </div>
                    </div>

                    <div class="params-box" v-if="detail.is_yiqi">
                      <!-- 仪器分类特殊展示规格 -->
                      <!-- <div class="params-item">
                        <div class="params-label">{{ '规格' }}</div>
                        <div class="params-val">
                          {{ yiqi_guige  }}
                        </div>
                      </div> -->

                      <div
                        class="params-item"
                        v-for="(field, index) in param_list"
                        :key="index"
                        :data-key="field.field_title"
                      >
                        <div class="params-label">{{ field.title }}</div>
                        <div class="params-val" v-html="field.val"></div>
                      </div>
                    </div>
                  </div>
                  <!-- 其他内容 -->
                  <div class="rich-html" v-html="detail.content"></div>
                  <div class="rich-html" v-html="detail.cont2"></div>
                  <div class="rich-html" v-html="detail.cont3"></div>
                </div>

                

                <!-- 文献 -->
                <div v-else class="wenxian-box">
                  <div class="section-title" data-title="文献">文献</div>

                  <div class="wenxian-list-wrap" v-if="group_list_wenxian.length">
                    <div class="wenxian-list-inner">
                      <img
                        src="@img/product-arrow-left.png"
                        alt=""
                        class="arrow wenxian-arrow-left"
                      />
                      <img
                        src="@img/product-arrow-right.png"
                        alt=""
                        class="arrow wenxian-arrow-right"
                      />

                      <div class="swiper-container swiper-wenxian">
                        <div class="swiper-wrapper">
                          <div
                            class="swiper-slide"
                            v-for="(group, index) in group_list_wenxian"
                            :key="index"
                          >
                            <div class="inner-box">
                              <div class="wenxian-list">
                                <a
                                  target="_blank"
                                  :href="item.url"
                                  class="wenxian-item"
                                  v-for="(item, index) in group"
                                  :key="index"
                                >
                                  <div class="title">
                                    <div class="text" :title="item.title">
                                      {{ item.title }}
                                    </div>
                                  </div>
                                  <div class="info-box">
                                    <div class="info-item">
                                      <span class="label">发表： </span>
                                      <span class="text"
                                        >{{ item.pubTime && item.pubTime.substr(0, 4) }}年
                                      </span>
                                    </div>
                                    <div class="info-item">
                                      <span class="label">杂志： </span>
                                      <span class="text zazhi" :title="item.journal">{{ item.journal }} </span>
                                    </div>
                                    <div class="info-item">
                                      <span class="label">应用： </span>
                                      <span class="text">- </span>
                                    </div>
                                    <div class="info-item">
                                      <span class="label">IF ： </span>
                                      <span class="text">{{ item.factor }} </span>
                                    </div>
                                    <div class="info-item">
                                      <span class="label">物种：</span>
                                      <span class="text">-</span>
                                    </div>
                                    <div class="info-item">
                                      <span class="label">PMID：</span>
                                      <span class="text">{{ item.pmid }}</span>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="swiper-pagination"></div>
                      </div>
                    </div>
                  </div>

                  <div class="detail-empty" v-else>
                    <el-empty description="没有查询到文献信息..."></el-empty>
                  </div>
                </div>

                <!-- v-show="active_panel == '评价'" -->
                <!-- <div class="comment-box">
                  <div class="section-title" data-title="评论">
                    评论({{ detail.comment_num }})
                  </div>

                  <commentList :list="list_comments" />

                  <div
                    class="pagination-box"
                    style="margin-top: 80px"
                    v-if="list_comments.length"
                  >
                    <el-pagination
                      background
                      layout="total, prev, pager, next"
                      @current-change="changePage_comment"
                      :current-page.sync="pagination.page"
                      :page-size="pagination.pagenum"
                      :total="count_comments"
                    ></el-pagination>
                  </div>

                  <div class="detail-empty" v-if="!list_comments.length">
                    <el-empty description="没有查询到评论信息..."></el-empty>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-box-right">
        <!-- 相关产品 -->
        <div class="xiangguan-box">
          <div class="section-title" data-title="相关产品">相关产品</div>
          <div class="product-list">
            <router-link
              :to="'/goodsDetail/' + item.skuId"
              class="product-item"
              v-for="(item, index) in product_list"
              :key="index"
              target="_blank"
            >
              <div class="img-box scale-box">
                <img :src="item.img" class="scale-img" />
              </div>
              <div class="title">{{ item.title }}</div>
            </router-link>
          </div>
        </div>
      </div>
      
    </div>

    <!-- 右侧悬浮工具 -->
    <!-- <div class="kefu-box" v-if="!is_out_goods">
      <div class="kitem">
        <img src="/index/qq.png" alt />
        <p class="kitem2" v-for="(item, index) in kefu_qq" :key="index">
          <img src="/index/icon-qq.png" alt />
          <span>{{ item.title }}</span>
        </p>
      </div>
      <div class="kitem">
        <img src="/index/weixin.png" alt />
        <p
          class="kitem2 weixin"
          v-for="(item, index) in kefu_weixin"
          :key="index"
        >
          <img :src="item.originalPic" alt class="weixin_img" />
          <span>{{ item.title }}</span>
        </p>
      </div>
      <div class="kitem">
        <img src="/index/phone.png" alt />
        <p class="kitem2" v-for="(item, index) in kefu_phone" :key="index">
          <img src="/index/icon-phone.png" alt />
          <span>{{ item.title }}</span>
        </p>
      </div>
    </div> -->
  </div>
</template>

<script>
import QRCode from "qrcodejs2";

import { Swiper, SwiperOptions, Pagination, Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";

import modalLoading from "@/components/modals/modalLoading.vue"; //加载中
import modalAddSuccess from "@/components/goods/modalAddSuccess.vue"; //购物车添加成功
import carouselComponent from "@/components/goods/carouselComponent.vue"; //左侧轮播
import commentList from "@/components/order/commentList.vue"; //评论列表
// import modalYaoqing from "@/components/goods/modalYaoqing.vue"; //折上折邀请好友
// import goodsCouponList from "@/components/goods/goodsCouponList.vue"; //商品关联的优惠券

import { mapState } from "vuex";
import { Loading } from "element-ui";

export default {
  name: "goods-detail",
  components: {
    QRCode,
    modalLoading,
    modalAddSuccess,
    carouselComponent,
    commentList,
    // modalYaoqing,
    // goodsCouponList,
  },
  data() {
    return {
      is_prod: process.env.NODE_ENV == "production",

      Loading,
      loadingInstance: null,

      query_wenxian_done: false,
      activeCate: {
        route: "/",
      },
      product_list: [],
      group_list_wenxian: [],
      list_wenxian: [],
      count_wenxian: 0,
      query_field_done: false, //参数字段
      field_list: [],
      param_list: [],
      all_field: [],

      id: this.$route.params.id || "", //规格id
      product_id: "", //产品id

      //规格数量
      sku_mode: "单规格",
      select_specifications: {}, //选择的规格
      selected_num: 1, //商品数量
      list_specifications: [], //规格列表
      show_sku: false,
      //拆分状态下选择的商品属性
      select_shuxing_list: [],

      //优惠券
      list_coupon: [],
      show_coupon: false,

      // 其他
      active_panel: "详情", //详情

      pagination: {
        page: 1,
        pagenum: 10,
      },
      pagination_relative: {
        page: 1,
        pagenum: 5,
      },

      select_inventory_id: "",

      timer: null, //促销计算
      remaining: "", //促销剩余时间

      coupons: [], //可用的优惠券
      isFavourite: false, //未收藏

      selectedSkuComb: {}, //选择的商品规格信息 立即购买需要金额
      show_sku: false,
      curr: {}, //产品
      detail: {}, //产品
      current: 0, //轮播图指示器
      swiperImgs: [], //轮播图
      activeSwipeIndex: 0, //轮播图指示器

      count_comments: 0, //评价总数
      list_comments: [], //评价详情

      if_shoucang: false,

      tiaojian_shaixuan: [],

      yiqi_guige: "",
    };
  },

  computed: {
    ...mapState(["kefu_qq"]),

    //预览信息
    view_info() {
      let view_info = this.curr;
      if (this.select_specifications.inventoryId) {
        view_info = this.select_specifications;
      }
      return view_info;
    },

    poster() {
      let ret = "";
      if (this.detail.images && this.detail.images.length) {
        ret = this.detail.images[0];
      }
      return ret;
    },

    huoqi_text() {
      let text = "现货";
      if (this.detail.skuDay) {
        let num = parseInt(this.detail.skuDay);
        if (num) {
          text = "货期" + num + "天";
        }
      }
      return text;
    },
  },

  watch: {
    param_list(val) {
      //console.log(" ******** 产品参数 ******** ", val);
    },
  },

  beforeRouteUpdate(to, from, next) {
    //console.log("组件复用");
    //console.log(to, from);

    next(to.params);
    this.id = this.$route.params.id || ""; //规格id
    this.setView();
  },

  // beforeRouteUpdate(to, from, next) {
  //   //console.log("组件复用");
  //   //console.log(to, from);
  //   let inventoryId = sessionStorage.getItem("inventoryId");
  //   this.setView(inventoryId);
  // },

  created() {
    // //console.log("detail 展示loading", this.$refs.modalLoading);

    this.queryAllCateParams();
    this.setView();
  },

  mounted() {
    this.showLoading();
    if (this.$route.query.item == 3) {
      setTimeout(() => {
        this.scrollToTarget(".wenxian-box");
      }, 1000);
    }

    this.watchPageScroll(); //监视滚动
    this.generateImage(); //生成二维码
  },

  beforeDestroy() {
    //console.log("销毁详情页 handleScrollEvent");

    document.removeEventListener("scroll", this.handleScrollEvent);
  },

  methods: {
    showLoading() {
      // this.loadingInstance = Loading.service({
      //   lock: true,
      //   text: "数据查询中...",
      //   spinner: "el-icon-loading",
      //   background: "rgba(0, 0, 0, 0.7)",
      // });
      if (this.$refs.modalLoading) {
        this.$refs.modalLoading.init();
      }
    },
    hideLoading() {
      // this.loadingInstance.close();

      this.$refs.modalLoading.close();

      // this.loadingInstance = Loading.service({
      //   lock: true,
      //   text: "数据查询中...",
      //   spinner: "el-icon-loading",
      //   background: "rgba(0, 0, 0, 0.7)",
      // });
    },

    //生成微信二维码
    generateImage() {
      this.$refs.qrCodeUrl.innerHTML = "";
      let url = location.href;

      let qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: url, // 需要转换为二维码的内容
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
      //console.log(qrcode);
    },

    watchPageScroll() {
      var that = this;
      if (document && document.documentElement) {
        document.addEventListener("scroll", that.handleScrollEvent);
      }
    },
    handleScrollEvent() {
      var that = this;
      var scrollTop = document.documentElement.scrollTop;
      var clientHeight = document.documentElement.clientHeight;
      var screenCenterHeight = clientHeight / 2;
      // var rect_xiangqing = document
      //   .querySelector('.section-title[data-title="详情"]')
      //   .getBoundingClientRect();
      // var rect_chanpin = document
      //   .querySelector('.section-title[data-title="相关产品"]')
      //   .getBoundingClientRect();
      // var rect_wenxian = document
      //   .querySelector('.section-title[data-title="文献"]')
      //   .getBoundingClientRect();
      // var rect_pingjia = document
      //   .querySelector('.section-title[data-title="评论"]')
      //   .getBoundingClientRect();

      // if (rect_xiangqing.top < screenCenterHeight) {
      //   this.active_panel = "详情";
      // }
      // if (rect_chanpin.top < screenCenterHeight) {
      //   this.active_panel = "相关产品";
      // }
      // if (rect_wenxian.top < screenCenterHeight) {
      //   this.active_panel = "文献";
      // }
      // if (rect_pingjia.top < screenCenterHeight) {
      //   this.active_panel = "评价";
      // }

      // //console.log("滚动监听", new Date(), scrollTop);
    },

    footer_action(name) {
      if (!this.select_specifications.inventoryId) {
        this.show_sku = true;
        return;
      }

      this.detail_action(name);
    },

    //商品sku 属性选择
    onSelectShuXing(item) {
      //console.log("商品属性选择", { ...item });

      //当前属性对应商品库存不足
      if (this.if_out_stock(item)) {
        return;
      }

      let key = item.key;
      let index = this.select_shuxing_list.findIndex((v) => v.id == item.id);
      if (index < 0) {
        //已选的属性不包含当前属性
        //需要查询是否已选过当前属性其他属性值
        let prev_item = this.select_shuxing_list.find((v) => v.key == key);
        let prev_item_index = this.select_shuxing_list.findIndex((v) => v.key == key);
        if (prev_item) {
          this.select_shuxing_list.splice(prev_item_index, 1, item);
        } else {
          this.select_shuxing_list.push(item);
        }
      } else {
        this.select_shuxing_list.splice(index, 1, {
          key: key,
        });
      }

      this.set_select_specifications();
    },

    //设置商品选择的规格
    set_select_specifications() {
      if (Object.keys(this.detail.skus).length == this.select_shuxing_list.length) {
        let key_ids = this.select_shuxing_list.map((v) => v.id).join("-");
        this.select_specifications =
          this.list_specifications.find((v) => v.key_ids == key_ids) || {};
      }

      //console.log("已选的商品属性值 select_shuxing_list", this.select_shuxing_list);
      //console.log("商品规格 select_specifications", { ...this.select_specifications });
    },

    //是否已选择当亲属性
    if_shuxing_list_contain(item) {
      return !!this.select_shuxing_list.find((v) => v.id == item.id);
    },

    //当前属性商品库存是否不足
    if_out_stock(item) {
      //拼接目标规格的属性集合
      //比对目标属性是否库存不足
      let key = item.key;
      let id_arr = [];
      this.select_shuxing_list.forEach((v) => {
        if (v.id && key != v.key) {
          id_arr.push(v.id);
        } else if (key == v.key) {
          id_arr.push(item.id);
        }
      });

      //从所有规格中过滤出符合目标属性的规格
      let list_filter = this.list_specifications.filter((v) => {
        let has_pipei = id_arr.every((id) => v.key_ids.includes(id));

        return has_pipei;
      });

      let ret = false;

      if (list_filter.length > 1) {
        ret = false;
      } else if (list_filter.length == 1) {
        let obj = list_filter[0];
        if (+obj.kucun) {
          ret = false;
        } else {
          ret = true;
        }
      } else {
        ret = true;
      }

      return ret;
    },

    setView() {
      this.showLoading();

      //清空文献数据
      this.group_list_wenxian=[];
      //查询商品信息
      this.$api("product_detail", { skuId: this.id }).then((res) => {
        //console.log("商品详情", res);
        let { code, data, message } = res;

        if (code == 1) {
          //elias 试剂分类英文标题展示到顶部
          //中文标题展示到属性列表默认的第一行

          //产品原标题
          //产品导入的属性中文标题
          //产品导入的属性英文标题
          data.origin_title = data.title;
          data.zh_title = data.param_info && data.param_info.chinese_name;
          data.en_title = data.param_info && data.param_info.english_name;

          if (data.is_sj) {
            // if (!data.title) {
            var title = data.title;
            var title_en = (data.param_info && data.param_info.english_name) || title;
            var title_zh = (data.param_info && data.param_info.chinese_name) || title;
            data.title = title_en;
            data.param_info.chinese_name = title || title_zh;
            // }
          }

          this.curr = data;
          this.detail = data;
          this.if_shoucang = data.if_shoucang || 0;
          this.swiperImgs = data.images;
          this.posterSrc = data.images[0];
          this.count_comments = data.comment_num;

          this.set_yiqi_guige();

          this.set_specifications(data);
          this.list_coupon = this.mix_format_list_coupon(data.yhq_list);

          this.query_relative(); //相关产品
          this.query_wenxian(); //文献
          this.query_comments(); //评论

          this.setActiveCate();

          //设置当前产品参数
          this.setInfoParams();

          //设置表格样式
          this.setTableStyle();
        } else {
          if (message == "商品不存在或已下架") {
            this.$router.push("/");
          }
        }

        this.hideLoading();
      });
    },

    setTableStyle() {
      this.$nextTick(() => {
        var $table_td = document.querySelectorAll("table td");
        let device_width =
          document && document.documentElement && document.documentElement.clientWidth;
        this.is_h5 = device_width <= 1365;
        this.is_pad = device_width <= 1365 && device_width >= 768;

        if (this.is_h5) {
          if ($table_td) {
            var columns = document.querySelectorAll("table tr:first-child td").length;

            for (var i = 0; i < $table_td.length; i++) {
              $table_td[i].width = 100 / columns + "%";
            }

            // $table_td.width = 100 / columns + "%";
          }
        }
      });
    },

    set_yiqi_guige() {
      let key_vals = this.detail.key_vals || "";
      this.yiqi_guige = key_vals.replaceAll("|", "/");
    },

    //相关文献
    query_wenxian() {
      this.query_wenxian_done = false;
      // skuId
      this.$api("paper_sku", {
        //
        sku: this.detail.skuId,
        page: 1,
        pagenum: 1000,
      }).then((res) => {
        //console.log("文献引用", res);

        var is_h5 =
          document &&
          document.documentElement &&
          document.documentElement.clientWidth <= 1100;

        let items_length = is_h5 ? 1 : 4;

        if (res.data.length) {
          let group_list_wenxian = [];
          res.data.forEach((v, i) => {
            let group_index = Math.floor(i / items_length);
            if (!group_list_wenxian[group_index]) {
              group_list_wenxian[group_index] = [];
            }

            group_list_wenxian[group_index].push(v);
          });

          // //console.log('文献分组数据', group_list_wenxian)
          this.group_list_wenxian = group_list_wenxian;
        }

        this.list_wenxian = res.data;
        this.count_wenxian = res.count;

        this.query_wenxian_done = true;

        if (res.data.length) {
          this.$nextTick(() => {
            this.init_swiper_wenxian();
          });
        }
      });
    },

    //相关产品
    query_relative() {
      let form = {
        ...this.pagination_relative,
        channel_id: this.detail.channelId || "",
        // is_relative: 1,
        is_relative_id: this.detail.inventoryId,
      };
      var is_h5 =
        document &&
        document.documentElement &&
        document.documentElement.clientWidth <= 1365;
      if (is_h5) {
        form.pagenum = 4;
      }

      this.$api("product_plistNew", form).then((res) => {
        //console.log("产品列表", res);

        let image_list = [];
        res.data.forEach((v) => {
          image_list.push(v.img);
          v.route = "/goodsDetail/" + v.inventoryId;
        });
        this.handleProductImage(image_list);

        this.product_list = res.data;
        // this.count = res.count;
        // this.updateParentCount();
        //列表根据后台产品的多少，来控制使用哪一种列表形式，如果产品数量少用图文的，产品数量多 用表格的
      });
    },

    //处理产品图片
    handleProductImage(image_list) {
      //处理产品图片
      // //console.log("产品列表数据 image_list", image_list);
      var promise_arr = [];
      image_list.forEach((src, index) => {
        var promise = this.loadImageAsync(src);
        promise_arr.push(promise);
      });
      Promise.all(promise_arr).then((resAll) => {
        // //console.log("图片全部加载完成 resAll", resAll);

        //设置产品图片
        this.product_list.forEach((v, index) => {
          if (!resAll[index]) {
            v.img = v.default_img;
          }
        });
      });
      //产品图片处理完成
    },

    //加载图片
    loadImageAsync(url) {
      return new Promise(function (resolve, reject) {
        const image = new Image();

        image.onload = function () {
          resolve(url);
        };

        image.onerror = function () {
          // reject(new Error("Could not load image at " + url));
          resolve("");
        };

        image.src = url;
      });
    },

    //设置分类 面包屑导航需要
    setActiveCate() {
      if (this.product_cates_all && this.product_cates_all.length) {
        //实验耗材
        var cate_id = this.detail.channelId;
        this.activeCate = this.product_cates_all.find((v) => v.id == cate_id) || {};

        //console.log("activeCate", { ...this.activeCate });

        // this.queryCateParams();
        this.queryFilterParams();
      } else {
        setTimeout(() => {
          this.setActiveCate();
        }, 100);
      }
    },

    //设置当前产品展示参数
    setInfoParams() {
      if (this.detail.param_info && this.all_field.length) {
        // //console.log("产品属性参数");
        // //console.table(this.all_field);

        let param_list = [];
        this.all_field.forEach((field) => {
          var val = this.detail.param_info[field.field_title];
          if (val) {
            if (field.title == "基因id") {
              field.title = "基因ID";
              if (+val) {
              } else {
                val = "/";
              }
            }

            //elias 试剂分类英文标题展示到顶部
            //中文标题展示到属性列表默认的第一行
            //属性列表中 隐藏试剂的英文名称
            //属性列表中 属性的中文名称放到首尾;
            if (this.detail.is_sj) {
              if (field.title == "英文名称") {
                val = "/";
              }
            }

            if (val != "/") {
              //elias 试剂分类英文标题展示到顶部
              //中文标题展示到属性列表默认的第一行
              //属性列表中 隐藏试剂的英文名称
              //属性列表中 属性的中文名称放到首尾;
              if (this.detail.is_sj && field.title == "中文名称") {
                if (this.is_real_zh_name(val)) {
                  param_list.unshift({
                    ...field,
                    val: val,
                  });
                }
              }else if (field.title == "蛋白编码") {
                param_list.push({
                  ...field,
                  val: "<a href='https://www.uniprot.org/uniprotkb/"+val+"/entry' style='color: #409eff;' target='_blank'>"+val+"</a>",
                });
              } else if (field.title == "Gene ID") {
                param_list.push({
                  ...field,
                  val: "<a href='https://www.ncbi.nlm.nih.gov/gene/?term="+val+"' style='color: #409eff;' target='_blank'>"+val+"</a>",
                });
              }else {
                if(Array.isArray(val)){
                  param_list.push({
                    ...field,
                    val: val.join(";"),
                  });
                }else{
                  param_list.push({
                    ...field,
                    val: val,
                  });
                }
              }
            }
          }
        });

        // //console.log('所有的参数 param_list', param_list)

        let tongyici_attr_1 = param_list.find((v) => v.field_title == "another_name");
        let tongyici_attr_2 = param_list.find((v) => v.field_title == "synonym");
        //抗体产品同义词相同时 隐藏一个
        if (
          tongyici_attr_1 &&
          tongyici_attr_1.val &&
          tongyici_attr_2 &&
          tongyici_attr_2.val
        ) {
          if (tongyici_attr_1.val == tongyici_attr_2.val) {
            let arr_tongyici = param_list.filter((v) => v.title == "同义词");

            if (arr_tongyici.length == 2) {
              let index_2 = param_list.findIndex(
                (v) => v.field_title == arr_tongyici[1].field_title
              );

              param_list.splice(index_2, 1);
            }
          }
        }

        this.param_list = param_list;
        this.query_field_done = true;
      } else {
        setTimeout(() => {
          this.setInfoParams();
        }, 200);
      }
    },

    is_real_zh_name(title) {
      let ret = false;
      let reg = new RegExp("[\\u4E00-\\u9FA5]", "g");
      ret = reg.test(title);

      return ret;
    },

    //所有产品参数
    queryAllCateParams() {
      this.query_field_done = false;
      //根据分类设置筛选条件
      this.$api("product_allRow", {}).then((res) => {
        //console.log("获取所有分类的字段", res);
        this.all_field = res.data;
      });
    },

    //当前分类需要展示的筛选参数
    queryFilterParams() {
      this.$api("product_getSearch", {
        channel_id: this.activeCate.id,
      }).then((res) => {
        //console.log("当前分类筛选条件", res);

        let params = this.detail.param_info || {};
        let tiaojian_shaixuan = [];

        let groups = res.data;
        groups.forEach((v) => {
          let key = v.field_title;
          if (params[key]) {
            tiaojian_shaixuan.push(params[key]);
          }

          v.keyword = "";
          v.expand = false;
          v.child.forEach((v) => {
            v.checked = false;
          });
        });
        this.tiaojian_groups = groups;
        this.tiaojian_shaixuan = tiaojian_shaixuan;
      });
    },

    init_swiper_wenxian() {
      var that = this;

      if (this.$route.name != "goodsDetail") {
        return;
      }

      //数据未完成查询
      if (!this.query_wenxian_done) {
        setTimeout(() => {
          this.init_swiper_wenxian();
        }, 300);

        return;
      }
      if (!this.list_wenxian.length) {
        return;
      }

      let hasDom =
        document &&
        document.documentElement &&
        document.documentElement.querySelector(".swiper-wenxian");
      if (!hasDom) {
        setTimeout(() => {
          this.init_swiper_wenxian();
        }, 300);

        return;
      }

      //console.log("文献 swiper");
      Swiper.use([Pagination, Navigation]);

      var is_h5 =
        document &&
        document.documentElement &&
        document.documentElement.clientWidth <= 1365;
      //推荐产品轮播图
      this.swiper_zhuanti = new Swiper(".swiper-wenxian", {
        loop: false,
        slidesPerView: !is_h5 ? 1 : 1,
        // slidesPerGroup: 3,
        spaceBetween: 5,
        // slidesPerView: 2,
        // grid: {
        //   fill: "column",
        //   rows: 2,
        // },

        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".wenxian-arrow-right",
          prevEl: ".wenxian-arrow-left",
        },

        on: {
          slideChange(swiper) {
            // //console.log("监视切换", { ...swiper });
            // //console.log("分组", swiper.snapIndex);
            // that.active_swiper_index = swiper.snapIndex;
          },
        },
      });
    },

    //设置规格
    set_specifications(data) {
      //规格列表组
      let list_specifications = [];
      if (data.inventorys && data.inventorys.length) {
        data.inventorys.forEach((v) => {
          list_specifications.push({
            ...v,
            kucun: +v.kucun,
            key_vals: v.key_vals,
          });
        });
      } else {
        list_specifications = [
          {
            status: this.detail.product_status,
            image: this.detail.images[0],
            inventoryId: this.detail.inventoryId,
            key_vals: this.detail.key_vals == "无" ? "默认" : this.detail.key_vals,
            kucun: +this.detail.kucun,
            price_market: this.detail.price_market,
            price_sale: this.detail.price_sale,
            price_shequ_tuan: this.detail.price_shequ_tuan,
            price_tuan: this.detail.price_tuan,
            price_user: this.detail.price_user,
          },
        ];
      }

      //单规格商品 默认勾选
      if (list_specifications.length == 1) {
        this.select_specifications = list_specifications[0];
      } else {
        this.select_specifications = {};
      }
      this.list_specifications = list_specifications;

      //规格拆分
      let skus = data.skus || {};
      if (skus && Object.keys(skus).length) {
        this.sku_mode = "多规格";
        let select_shuxing_list = [];
        Object.keys(skus).forEach((v) => {
          select_shuxing_list.push({
            key: skus[v].key,
          });
        });

        //console.log("商品规格默认 select_shuxing_list", select_shuxing_list);

        this.select_shuxing_list = select_shuxing_list;
      } else {
        this.sku_mode = "单规格";
      }
    },

    //切换规格
    toggleSpecifications(item) {
      if (item.kucun) {
        this.select_specifications = item;
        if (this.selected_num > item.kucun) {
          this.selected_num = item.kucun;
        }
      }
    },

    //底部导航
    detail_action(name) {
      //console.log("======= detail_action 详情操作 =======", name);
      if (name == "首页") {
        this.$router.push("/");
      } else if (name == "购物车") {
        this.$router.push("/shoppingCart");
      } else if (name == "客服") {
        this.$refs.modalKefu.show = true;
      } else if (name == "收藏") {
        this.onGood_collect(this.curr);
      } else {
        var isSelect = this.checkedSelected();
        if (!isSelect) {
          return;
        }
        if (name == "加入购物车") {
          this.mix_shopcart_add_goods({
            inventoryId: this.select_specifications.inventoryId,
            add_num: this.selected_num,
          });
        } else if (name == "立即购买") {
          this.payNow();
        }
      }
    },

    //商品是否选择规格检测
    checkedSelected() {
      //console.log("检测是否选择了商品", this.select_specifications);

      if (!this.select_specifications.inventoryId) {
        alertErr("请选择商品规格");
        return false;
      }

      if (this.select_specifications.kucun < this.selected_num) {
        alertErr("该商品库存不足,无法购买");
        return false;
      }

      return true;
    },

    //立即购买
    payNow() {
      var isSelect = this.checkedSelected();
      if (!isSelect) {
        return;
      }

      var item = this.curr;
      let { productId, images, title } = item;
      let {
        inventoryId,
        key_vals,
        price_sale,
        price_market,
      } = this.select_specifications;
      let num = this.selected_num;

      var list_payment = [
        {
          productId: productId,
          image: images && images[0],
          key_vals: key_vals,
          title: title,
          num, //数量
          inventoryId, //规格
          price_sale: price_sale, //售价
          price_market: price_market, //市场价
        },
      ];

      sessionStorage.setItem("list_payment", JSON.stringify(list_payment));

      this.$router.push({
        path: "/orderCreate",
      });
    },

    onBlur_selected_num() {
      //console.log(this.selected_num + "");

      this.selected_num = parseInt(this.selected_num) || 1;
    },

    //购车添加商品
    shopcart_add() {
      //console.log("shopcart_add 加入购物车");

      if (!this.select_specifications.inventoryId) {
        alertErr("请选择商品规格！");
        return;
      }
      if (this.selected_num > this.select_specifications.kucun) {
        alertErr("当前商品库存不足！");
        return;
      }

      if (this.select_specifications.status == -1) {
        alertErr("当前商品已下架！");
        return;
      }

      // debugger
      this.$api("gouwuche_add", {
        inventoryId: this.select_specifications.inventoryId,
        num: this.selected_num,
        _no_tip: 1,
      }).then((res) => {
        let { code, count } = res;
        if (code == 1) {
          this.$refs.modalAddSuccess.init({
            num: this.selected_num,
            ...this.select_specifications,
          });
          this.mix_shopcart_update_count(count);
        }
      });
    },

    //查询评论列表
    query_comments() {
      //商品评论列表
      this.$api("product_comments", {
        productId: this.detail.productId,
        ...this.pagination,
        // star: 0,
      }).then((res) => {
        this.hideLoading();
        //console.log("评价列表", res);
        let { code, data, count } = res;
        if (code == 1) {
          this.list_comments = data;
          this.count_comments = count;
        }
      });
    },

    remaining_minus() {
      //console.log("子组件接收 剩余促销时间", this.remaining);

      if (this.remaining <= 1000) {
        return;
      }
      this.timer = setInterval(() => {
        let remaining = this.remaining - 1000;
        this.remaining = remaining;
      }, 1000);
    },

    set_remaining(data) {
      //console.log("设置促销时间", { ...data });
      if (data.if_cuxiao) {
        let cuxiao_info = data.cuxiao_info;
        this.remaining = new Date(cuxiao_info.endTime).getTime() - new Date().getTime();
        //console.log("促销时间", this.remaining);
        // this.$nextTick()

        // //console.log("获取子组件促销时间", this.$refs.refPromotion);
        this.remaining_minus();
      }
    },

    //商品评价页面
    go_comments() {
      this.$router.push({
        path: "/comments",
        query: {
          pid: this.productId,
        },
      });
    },

    onClickLeft() {
      this.$router.back();
    },

    onChange_swiper(index) {
      this.current = index;
    },

    onChange(index) {
      this.current = index;
    },

    //预览图片
    previewImage(src, index, swiperImgs) {
      ImagePreview({
        images: swiperImgs,
        startPosition: index,
        closeable: true,
      });
    },

    //商品详情 内含图片
    imageEnlargement(e) {
      if (e.target.nodeName == "IMG") {
        //判断点击富文本内容为img图片
        ImagePreview({
          images: [e.target.currentSrc], //获取当前图片src
          showIndex: false,
          loop: false,
        });
      } else {
        //console.log("点击内容不为img");
      }
    },

    //
    set_isFavourite(ret) {
      this.isFavourite = Boolean(ret);
    },

    //
    favourite_toggle() {
      let collect_type = this.if_shoucang ? 1 : 0;
      this.$api("product_collect", {
        inventoryId: this.detail.inventoryId,
        collect_type: collect_type, //0收藏 1取消收藏
      }).then((res) => {
        let { code, message } = res;
        if (code == 1) {
          this.if_shoucang = this.if_shoucang == 0 ? 1 : 0;
        }
      });
    },

    //
    togglePanel(name) {
      // return;
      this.active_panel = name;
      if (name == "详情") {
        // this.scrollToTarget(".detail-content-box");
      } else if (name == "相关产品") {
        // this.scrollToTarget(".xiangguan-box");
      } else if (name == "文献") {
        // this.scrollToTarget(".wenxian-box");
      } else if (name == "评价") {
        // this.scrollToTarget(".comment-box");
      }
    },

    //
    toggleChecked(id) {
      this.select_inventory_id = id;
      this.selected_guige = {
        id: id,
      };
    },

    //显示右侧可领取的优惠
    show_yhq() {
      // this.$refs.goodsCouponList.showModal = true;
    },

    //商品评价分页
    changePage_comment(page) {
      this.pagination.page = page;
      this.query_comments();
    },

    show_yaoqing() {
      // this.$refs.modalYaoqing.init();
    },

    //文献
    toWenxian() {
      this.scrollToTarget(".wenxian-box");
    },

    //滚动到指定位置
    scrollToTarget(clsName) {
      // var element = document.querySelector(".wenxian-box");
      var element = document.querySelector(clsName);
      element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    },
  },
};
</script>

<style lang="less">
.pop-kefu-inner {
  padding: 25px;
  .kefu-tip {
    margin-bottom: 20px;
  }
}
.detail-qrcode {
  .flex-center();
  text-align: center;

  img {
    border: 1px solid #ddd;
    width: 150px;
    height: 150px;
  }
}
</style>

<style scoped lang="less">
.page-top {
  position: relative;
  padding-top: 150px;
  .page-top-banner {
    img {
      width: 100%;
    }
  }
  .page-bread {
    width: @width;
    margin: 0 auto;
    height: 44px;
    background: #f5f5f5;
    padding: 0 15px;

    .bread-box {
      height: 44px;
      display: flex;
      align-items: center;

      img {
        width: 15px;
        margin-right: 10px;
      }
      .bread-divider {
        margin: 0 10px;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
      a {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;

        &:hover {
          color: @theme;
        }
      }
    }
  }
}

.pop-kefu {
  .pop-kefu-inner {
    text-align: center;
    .kefu-tip {
      text-align: center;
      font-size: 14px;
    }
    .kefu-code {
    }
    .erweima {
    }
  }
}

.phone-tip-inner {
  .flex();
  cursor: pointer;
}

.page {
  padding-top: 32px;
  min-height: 50vh;
  font-size: 14px;

  .page-box {
    padding-top: 32px;
    display: flex;
    width: 1400px;
    margin: auto;
    justify-content: space-between;
    &-left{
      width: 1070px;
    }
    &-right{
      width: 280px;
    }
  }
  .page-inner {
    // overflow: hidden;
    max-width: @width;
    margin: 0 auto;
    margin-top: 0;
    margin-bottom: 50px;

    .main-content {
      background-color: #fff;

      .top-info {
        .product-title {
          text-align: left;
          font-size: 20px;
          font-family: Microsoft YaHei-Bold, Microsoft YaHei;
          font-weight: bold;
          color: #333333;

          .state-xiajia {
            margin-left: 20px;
            font-weight: normal;
            font-size: 14px;
            color: #999;
            color: #ea3200;
          }
        }
        .product-other-action {
          padding: 25px 0;
          .flex();

          .action-item {
            .flex();
            margin-right: 30px;
            cursor: pointer;

            &:hover {
              span {
                color: @theme;
              }
            }

            img {
              margin-right: 5px;
              max-width: 20px;
              max-height: 20px;
            }
            span {
              font-size: 12px;
              font-family: Microsoft YaHei-Regular, Microsoft YaHei;
              font-weight: 400;
              color: #666666;

              font-size: 16px;
            }
          }
        }

        .product-filter {
          .flex-between();
          padding: 15px 0;
          padding-bottom: 0;
          border: 1px solid #d5d8de;
          border-left: none;
          border-right: none;

          .text {
            margin-bottom: 15px;
          }

          .tabs {
            flex: 1;
            .flex();
            flex-wrap: wrap;

            .tab-item {
              margin-right: 15px;
              margin-bottom: 15px;
              min-width: 32px;
              padding: 0 5px;
              // height: 24px;
              line-height: 24px;
              background: #ffffff;
              border-radius: 3px 3px 3px 3px;
              border: 1px solid #a6a6a6;

              font-size: 12px;
              font-family: Microsoft YaHei-Regular, Microsoft YaHei;
              font-weight: 400;
              color: #999999;
              font-size: 16px;

              &.active {
                background: @theme;
                color: #fff;
                border-color: @theme;
              }
            }
          }

          .fuli {
            img {
              height: 24px;
            }
          }
        }
      }

      .ctx-top {
        padding: 32px 0;
        display: flex;
        justify-content: space-between;

        .ctx-left {
          width: 960px;
          position: relative;
          .promotion-box {
            position: absolute;
            bottom: 0;
            width: 100%;
            .limit-end-box {
              font-size: 0.3rem;
              color: @theme;
              font-weight: bold;
              text-align: center;
              padding-bottom: 0.5rem;
            }
          }

          .shoucang-box {
            margin-top: 20px;
            .flex-between();
            width: 100%;

            .yes {
              color: #f00;
            }
            .no {
              color: #000;
            }

            .shoucang-left {
              cursor: pointer;
              .flex();

              img {
                width: 20px;
                margin-right: 15px;
              }
              span {
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 36px;
                color: #333333;
              }
            }
            .shoucang-right {
              cursor: pointer;
              .flex();

              img {
                width: 20px;
                margin-right: 15px;
              }
              span {
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 36px;
                color: #333333;
              }
            }
          }
        }
        .ctx-right {
          flex: 2;
          min-height: 364px;

          margin-left: 32px;
          text-align: left;
          padding-bottom: 20px;
          color: #999;

          h2 {
            text-align: center;
            height: 40px;
            line-height: 40px;
            background: #e4e4e4;
            font-size: 16px;
            font-family: Microsoft YaHei-Bold, Microsoft YaHei;
            font-weight: bold;
            color: #333333;
          }

          .info-box {
            padding: 25px 30px;
            background: #f7f7f7;

            .price {
              .flex();

              .number {
                font-size: 28px;
                font-family: Microsoft YaHei-Bold, Microsoft YaHei;
                font-weight: bold;
                color: #ea3200;
              }
            }

            .sku-list {
              margin-top: 28px;
              .sku-item {
                .flex-between();
                position: relative;
                width: 100%;
                margin-bottom: 15px;
                padding: 0 15px;
                height: 36px;
                line-height: 36px;
                background: #ffffff;
                font-size: 14px;
                font-family: Microsoft YaHei-Regular, Microsoft YaHei;
                font-weight: 400;
                color: #333333;
                cursor: pointer;
                border: 1px solid transparent;
                transition: 0.3s;

                &:disabled {
                  cursor: not-allowed;
                  opacity: 0.6;
                }

                &.active {
                  border: 1px solid @theme;
                  .img-box {
                    img {
                      visibility: visible !important;
                    }
                  }
                  .text {
                    color: @theme;
                  }
                  .price {
                    color: @theme;
                  }
                }

                .img-box {
                  width: 42px;
                  width: 22px;
                  text-align: center;
                  .flex-center();
                  img {
                    width: 16px;
                    height: 16px;
                    visibility: hidden;
                  }
                }

                .text {
                  text-align: left;
                  flex: 1;
                  font-size: 14px;
                  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
                  font-weight: 400;
                  color: #333333;
                }
                .price {
                  text-align: left;
                  // min-width: 120px;
                  min-width: 50px;
                  // min-width: 90px;
                  font-size: 14px;
                  font-family: Microsoft YaHei-Bold, Microsoft YaHei;
                  font-weight: bold;
                  color: #333333;
                }

                .guige-xiajia {
                  position: absolute;
                  right: 0;
                  font-size: 12px;
                  color: @theme;
                }
              }
            }

            .phone-tip {
              margin-top: 16px;
              display: flex;
              justify-content: flex-end;

              font-size: 14px;
              font-family: Microsoft YaHei-Regular, Microsoft YaHei;
              font-weight: 400;
              color: #808080;

              img {
                margin-left: 10px;
                width: 24px;
              }
            }
          }

          .info {
            margin-top: 20px; /*no*/
            margin-bottom: 20px; /*no*/
            background: #f9f9f9;
            padding: 15px;

            > div {
              margin-bottom: 10px;

              &:last-child {
                margin-bottom: 0;
              }
            }

            .info-1 {
              .flex-between();
              .left {
              }
              .right {
              }

              .currency {
                font-size: 16px;
              }
            }
            .info-2 {
              .flex();
              .left {
              }
              button {
                margin-right: 20px;
                min-width: 68px;
                padding: 0 8px;
                height: 19px;
                line-height: 19px;
                background: url("~@img/other/goods-coupon-bg.png") no-repeat;
                background-position: center;
                background-size: cover;

                font-size: 10px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #f13f17;
              }
            }

            .price {
              color: #f00;
              font-size: 20px;
              padding-left: 10px;
              font-weight: bold;
            }
          }

          .shuliang-box {
            margin-top: 20px;
            .flex();
            .sel-num-title {
              min-width: 100px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #999999;
            }

            .shuliang {
              min-width: 105px;
              .flex();
              div {
                width: 30px;
                height: 30px;
                cursor: pointer;
                user-select: none;
                &:hover {
                  opacity: 0.8;
                }

                img {
                  width: 30px;
                  height: 30px;
                  vertical-align: bottom;
                }
              }
              .minus {
              }
              input {
                outline: none;
                margin: 0 10px;
                display: inline-block;
                border: 1px solid #ccc;

                width: 40px;
                height: 30px;
                line-height: 30px;
                text-align: center;

                font-size: 20px;
                font-family: Arial;
                font-weight: 400;
                color: #4a4a4a;
              }

              input::-webkit-outer-spin-button,
              input::-webkit-inner-spin-button {
                -webkit-appearance: none !important;
              }
              /* chrome */
              input[type="number"] {
                -moz-appearance: textfield; /* firefox */
              }
              .plus {
              }
            }
          }

          .params {
            margin-top: 20px;
            .flex();
            .params-title {
              min-width: 100px;
            }

            .params-list {
              .dan-guige-wrap {
                .guige-list {
                  margin-top: 10px;
                  .flex();
                  flex-wrap: wrap;
                  font-size: 12px;

                  .item {
                    margin-right: 10px;
                    padding: 0 5px;
                    min-width: 100px;
                    height: 40px;
                    line-height: 40px;
                    background: #fff;
                    border-radius: 0;
                    text-align: center;
                    margin-bottom: 10px;
                    cursor: pointer;
                    border: 2px solid #ddd;
                    color: #333;

                    &.active {
                      border-color: @theme;
                      color: #333;
                    }
                  }
                }
              }

              //规格拆分
              .duo-guige-wrap {
                .loop-item {
                  .loop-title {
                    margin-bottom: 10px;
                  }
                  .shuxing-list {
                    .flex();
                    flex-wrap: wrap;
                    margin-bottom: 10px;
                    .shuxing-item {
                      margin-right: 5px;
                      padding: 3px 5px;
                      min-width: 50px;
                      background: #eee;
                      border-radius: 5px;
                      text-align: center;
                      margin-bottom: 5px;

                      &.active {
                        background: @theme;
                        color: #fff;
                      }

                      &.out_stock {
                        background: #f8f8f8;
                        color: #bbb;
                      }
                    }
                  }
                }
              }
            }
          }

          .sel-num-title {
            margin: 20px 0;
          }
          .coupon-box {
            margin: 0.2rem 0;

            .coupon-title {
              margin-bottom: 0.2rem;
            }
            .coupon-list {
              padding: 0.1rem;
              .coupon-item {
                display: flex;
                align-items: center;
                padding: 0.1rem;
                border: 1px dashed #ffe4d0;
                background: #ffe4d0;
                color: coral;
                border-radius: 10px;
                cursor: pointer;
                font-size: 12px;

                &:hover {
                  border-color: @theme;
                }

                .coupon-info {
                  width: 80%;
                }
                .coupon-btn-box {
                  margin-left: 0.2rem;
                }
              }
            }
          }

          .btn-box {
            margin-top: 10px;
            button {
              margin-right: 20px;
              font-size: 16px;
              transition: 0.3s;

              &:hover {
                opacity: 0.8;
              }
            }

            .btn-buy {
              min-width: 142px;
              height: 48px;
              background: #fff7f2;
              border: 1px solid @theme;
              // border-radius: 24px;
              color: @theme;
            }

            .huoqi {
              text-align: center;
              margin-top: 30px;
              margin-top: 10px;
              margin-bottom: 20px;
            }
            .btn-add-cart {
              display: block;
              margin: 0 auto;
              width: 266px;
              height: 36px;
              line-height: 36px;
              background: #ea3200;
              border-radius: 4px 4px 4px 4px;
              font-size: 14px;
              font-family: Microsoft YaHei-Regular, Microsoft YaHei;
              font-weight: 400;
              color: #ffffff;
            }
          }
        }
      }

      .ctx-bottom {
        margin-top: 60px;
      }

      .ctx-bottom-inner {
        width: 100%;
        text-align: left;

        .section-title {
          margin-top: 40px;
          margin-bottom: 24px;
          font-size: 16px;
          font-family: Microsoft YaHei-Bold, Microsoft YaHei;
          font-weight: bold;
          color: #333333;
        }
      }
    }
  }
}

.bottom-nav {
  position: relative;
  // border-bottom: 2px solid @theme;
  display: flex;

  height: 48px; /*no */
  line-height: 48px; /*no */

  .count-num {
    color: @theme;
  }

  .nav-item {
    cursor: pointer;
    text-align: center;
    flex: 1;
    margin-right: 10px;
    background: #f7f7f7;
    font-size: 16px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #000000;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      background-color: @theme !important;
      color: #fff !important;
      font-weight: bold;

      .count-num {
        color: #fff;
      }
    }
  }

  button {
    position: absolute;
    right: 0;
    top: 8px; /*no */
    right: 8px; /*no */
    min-width: 126px; /*no */
    height: 32px; /*no */

    &.contact {
      background: @theme;
      .flex-center();
      right: 20px;

      &:hover {
        opacity: 0.8;
      }
      img {
        width: 20px;
        margin-right: 10px;
        vertical-align: bottom;
      }
      span {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 20px;
        color: #ffffff;
      }
    }
  }
}

.detail-content {
  margin-top: 30px;
  .big-img-list {
    .big-img-item {
      margin-bottom: 10px;
      padding: 30px;
      margin: 10px auto;

      img {
        width: 400px;
        height: 300px;
      }
    }
  }
}

.detail-content-box {
  min-height: 10vh;
  padding: 20px;
  padding: 0;
  text-align: left;
  /deep/ img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
  }

  .params-html {
    margin-bottom: 32px;
    .params-box {
      .params-item {
        .flex();
        border: 1px solid #ccc;
        border-bottom: none;
        &:last-child {
          border-bottom: 1px solid #ccc;
        }

        &[data-key="target_backmsg"] {
          display: none;
        }

        .params-label {
          display: flex;
          align-items: center;
          align-self: stretch;
          background: #f7f7f7;
          min-height: 50px;
          line-height: 50px;
          width: 300px;
          padding: 0 24px;
          font-size: 14px;
          font-family: Microsoft YaHei-Bold, Microsoft YaHei;
          font-weight: bold;
          color: #666666;

          font-size: 16px;
        }
        .params-val {
          flex: 1;
          min-height: 50px;
          line-height: 50px;
          padding: 0 24px;
          font-size: 14px;
          font-family: Microsoft YaHei-Bold, Microsoft YaHei;
          font-weight: bold;
          color: #666666;

          font-size: 16px;
        }
      }
    }
  }
}

.rich-html {
  line-height: 2;
  // overflow-x: auto;

  /deep/ table {
    width: 100%;
    margin: 0 auto;
    table-layout: auto;

    td {
      border: 1px solid #aaa;
      border-bottom: none;
      border-right: none;
      min-height: 3.6rem;
      height: auto !important;
      line-height: 3rem;

      p,
      span,
      strong,
      i {
        font-size: 1.2rem;
      }
    }

    tr {
      height: auto !important;
      &.firstRow {
        td {
          p,
          span,
          strong,
          i {
            font-size: 1.4rem;
          }
        }
      }
    }

    tr td:last-child {
      border-right: 1px solid #aaa;
    }

    tr:last-child {
      td {
        border-bottom: 1px solid #aaa;
      }
    }
  }
}

.pagation-box {
  margin-top: 20px;
  margin-bottom: 20px;
}

.comment-box {
  min-height: 10vh;
  margin-top: 20px;

  .comment-title {
    display: flex;
    background-color: #eee;
    align-items: center;
    color: #fff;
    width: 100%;

    color: #000;

    .comment-title-text {
      padding: 5px 30px;
      margin-right: 20px;
      background-color: @theme;
      color: #fff;
    }
  }
  label {
    width: 70px;

    input {
      margin-right: 10px;
    }
  }

  .comment-list {
    margin-top: 20px;
    font-size: 14px;
    color: #000;
    text-align: left;

    .comment-item {
      background-color: #eee;
      padding: 20px;
      min-height: 50px;
      margin-bottom: 20px;

      .comment-bottom {
        margin-top: 10px;
        display: flex;
        align-items: center;

        .left {
          flex: 3;

          .img-list {
            display: flex;

            .img-item {
              padding: 10px;
            }

            img {
              width: 80px;
              height: 80px;
              padding: 10px;
              background-color: #fff;
              margin-right: 10px;
            }
          }
        }
        .right {
          flex: 1;
        }
      }
    }
  }
}

.kefu-box {
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  top: 40%;
  .kitem {
    cursor: pointer;
    position: relative;
    // height: 60px;
    // width: 60px;
    // border: 1px solid;
    // background: #f9f9f9;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // color: #ccc;
    // margin-top: 3px;

    img {
    }
  }
  .kitem2 {
    // height: 68px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    // padding: 15px;
    box-shadow: 0px 2px 8px #ccc;
    position: absolute;
    bottom: 0px;
    right: 0px;
    z-index: 9;
    background: #f9f9f9;
    opacity: 0;
    padding: 22px 0;
    span {
      font-size: 16px;
      color: #999;
      font-weight: bold;
      margin-left: 8px;
    }
    img {
      width: 25px;
      display: none;
    }
    .weixin_img {
      width: 128px;
    }
    .close {
      width: 16px;
      margin-left: 20px;
    }
  }
  .weixin {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    span {
      font-size: 12px;
      margin-top: 10px;
    }
  }
  .kitem:hover {
    .kitem2 {
      opacity: 1;
      // display: flex;
      transition: 0.5s;
    }
    .kitem2 {
      img {
        display: block;
      }
    }
  }
}

// 相关产品
.xiangguan-box {
  margin-top: 75px;
  .product-list {
    display: flex;
    flex-direction: column;
    .product-item {
      // width: 252px;
      // margin-right: 33px;
      cursor: pointer;
      border: 1px solid #d5d8de;
      overflow: hidden;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }

      &:hover {
        .title {
          color: @theme;
        }
      }

      .img-box {
        // width: 252px;
        height: 250px;
        img {
          vertical-align: bottom;
        }
      }
      .title {
        .line-1();
        padding-left: 5px;
        padding-right: 5px;
        text-align: center;

        border-top: none;
        height: 52px;
        line-height: 52px;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
    }
  }
}

// 相关文献
.wenxian-box {
  .wenxian-list {
    // padding-top: 40px;
    width: @width;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  }
}

// 文献引用

// 文献引用

.wenxian-list-inner {
  width: 1070px;
  margin: 0 auto;
  position: relative;

  height: 100%;
  .arrow {
    position: absolute;
    z-index: 9;
    top: 45%;
    transform: translate(0, -50%);
    width: 52px;
    height: 52px;
    cursor: pointer;
  }

  .wenxian-arrow-left {
    left: -60px;
  }

  .wenxian-arrow-right {
    right: -40px;
  }
}

/deep/ .swiper-pagination-bullet-active {
  background: @theme;
}

.swiper-wenxian {
  padding: 10px 2px;
  padding-bottom: 40px;
}

.wenxian-item {
  width: 510px;
  min-height: 204px;
  margin-right: 30px;
  margin-bottom: 25px;
  background: #ffffff;
  border-radius: 0px 0px 0px 0px;
  border: 1px solid #e6e6e6;

  &:nth-child(2n) {
    margin-right: 0;
  }

  &:hover {
    .title {
      color: @theme;
    }
  }

  .title {
    padding: 15px 25px;
    height: 80px;
    background: #f7f7f7;
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    line-height: 28px;
    .text {
      .line-2();
    }
  }
  .info-box {
    padding: 24px;
    display: flex;
    flex-wrap: wrap;

    .info-item {
      .flex();
      width: 50%;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      line-height: 28px;

      &:nth-child(2n + 1) {
        width: 40%;
      }
      &:nth-child(2n) {
        width: 60%;
      }

      .label {
        display: inline-block;
        min-width: 60px;
      }
      .text {
        .line-1();

        &.zazhi {
          font-size: 12px;
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/goodsDetail.less"></style>
