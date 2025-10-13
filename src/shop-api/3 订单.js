let obj = {
  22: "订单微信支付",
  23: "确认收货",
  24: "贝海--评价商品列表",
  25: "订单列表",
  26: "删除订单",
  27: "根据下单商品获得确认订单信息(运费、促销活动、优惠券等)",
  28: "提货码",
  29: "订单评价",
  30: "下单",
  31: "订单详情",
  32: "订单积分抵现",
  33: "分享订单的详情",
  34: "分享回调(可在客户点击分享的时候调用)",
  35: "取消订单",
  36: "订单余额支付",
  37: "订单微信扫码支付",
};


//"订单微信支付",
this.$api("orders_wxPay", {
  order_id: this.order_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
   
  }
});
//"确认收货",
this.$api("orders_qrshouhuo", {
  orderId: this.order_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    
  }
});
//"贝海--评价商品列表",
this.$api("orders_lists", {
  ...this.pagination,
  scene: '',//0全部 1待支付  2待发货  3待收货  4待评价  5已评价 -1无效
  keyword: '',
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_order = data || [];
  }
});
//"订单列表",
this.$api("orders_lists", {
  ...this.pagination,
  scene: '',//0全部 1待支付  2待发货  3待收货  4待评价  5已评价 -1无效
  keyword: '',
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_order = data || [];
  }
});
//"删除订单",
this.$api("orders_del", {
  order_id: this.order_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    
  }
});

//"根据下单商品获得确认订单信息(运费、促销活动、优惠券等)",
this.$api("orders_getPayInfo", {
  address_id: this.address_id,
  product_info: `[{"inventoryId":3739,"productId":1848,"num":1}]`,
  yushou_id: '',
  tuan_id: '',//团购id
  tuan_type: '',//开团购单时传(1普通团  2社区团)
  shequ_id: '',
  peisong_type: '',//	社区订单配送方式(1站点自提 2社区配送 3普通快递)
  peisong_time: '',//	12:00-16:00
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.payInfo = data || {};
  }
});
//"提货码",
this.$api("orders_tihuoma", {
  order_id: this.order_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.detail_tihuo = data || {};
  }
});
//"订单评价",
this.$api("orders_comment", {
  order_id: this.order_id,
  inventoryId: '1,2',//商品规格id（多个商品用英文逗号,分开）
  star: '',
  content: '',
  uploadedfile1: 'url|url2',
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.detail_goods_code = data || {};
  }
});
//"下单",
this.$api("orders_create", {
  address_id: this.address_id,
  product_info:  `[{"inventoryId":3739,"productId":1848,"num":1}]`,
  yhq_id: '',
  yushou_id: '',
  tuan_id: '',
  remark: '',
  peisong_type: '',//社区购配送方式(1自提 2社区配送 3快递)
  peisong_time: '',//配送时间/提货时间12:00-16:00
  tuan_type: '',//团购类型(开团时调用 1普通团 2社区团)
  shequ_id: '',//社区id（社区购时使用）
  shouhuo_name: '',//自提时填写
  shouhuo_phone: '',//自提时填写
}).then((res) => {
  let { code, order_id } = res;
  if (code == 1) {
    this.order_id = order_id;
  }
});
//"订单详情",
this.$api("orders_detail", {
  id: '',
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.detail_order = data || {};
  }
});
//"订单积分抵现",
this.$api("orders_jifenPay", {
  order_id: this.order_id,
  jifen: this.jifen,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    
  }
});
//"分享订单的详情",
this.$api("orders_shareOrder", {
  id: this.order_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.detail_share = data || {};
  }
});
//"分享回调(可在客户点击分享的时候调用)",
this.$api("orders_shareReturn", {
  order_id: this.order_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.detail_share = data || {};
  }
});
//"取消订单",
this.$api("orders_qxOrder", {
  order_id: this.order_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  
  }
});
//"订单余额支付",
this.$api("orders_yuePay", {
  order_id: this.order_id,
  pay_pass: this.pay_pass,//支付密码
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {

  }
});
//"订单微信扫码支付",
this.$api("orders_wxScanCodePay", {
  order_id: this.order_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {

  }
});