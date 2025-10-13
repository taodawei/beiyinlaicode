let obj = {
  38: "退换货列表",
  39: "新增退换货",
  40: "退换货详情",
  41: "买家填写快递信息",
  42: "取消退换货",
};




//"退换货列表",
this.$api("refund_lists", {
  ...this.pagination,
  status: this.status,//	  当前状态(0待处理  1已完成  -1无效)
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_refund = data;
  }
});
//"新增退换货",
this.$api("refund_add", {
  order_id: this.order_id,
  type: this.type,//退换货类型(2退货退款  3换货)
  reason: this.reason,//退换货原因
  remark: this.remark,//详细说明
  product_info: '[{"inventoryId":3739,"num":1}]',//换货(type=3)时传，退款不用传
  uploadedfile1: 'url|url2',//
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {

  }
});
//"退换货详情",
this.$api("refund_detail", {
  id: this.refund_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.detail_refund = data;
  }
});
//"买家填写快递信息",
this.$api("refund_addKuaidi", {
  id: this.refund_id,
  kuaidi_company: '',
  kuaidi_orderId: '',
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {

  }
});
//"取消退换货",
this.$api("refund_qxRefund", {
  id: this.refund_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {

  }
});