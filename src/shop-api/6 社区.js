let obj = {
  48: "根据定位获取市、区、附近站点",
  49: "获取社区列表",
  50: "获取申请信息",
  51: "选择社区",
  52: "获取社区配送信息",
  53: "申请社区团长",
  54: "站长订单列表",
  55: "站长核销订单",
  56: "站长配送完成",
  57: "社区订单数量(源一拼)",
};



//"根据定位获取市、区、附近站点",
this.$api("shequ_dingwei", {
  latitude: this.latitude,
  longitude: this.longitude,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {

  }
});
//"获取社区列表",
this.$api("shequ_lists", {
  shi_id: this.shi_id,
  area_id: this.area_id,
  longitude: this.longitude,
  latitude: this.latitude,
  keyword: this.keyword,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_shequ = data;
  }
});
//"获取申请信息",
this.$api("shequ_getShequ", {
  order_id: this.order_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.detail_shequ = data;
  }
});
//"选择社区",
this.$api("shequ_bindShequ", {
  shequ_id: this.shequ_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {

  }
});
//"获取社区配送信息",
//获取配送相关信息，注意站点自提的成单限制金额与社区配送的金额不同，站点自提的订单没有配送费
this.$api("shequ_info", {
  order_id: this.order_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {

  }
});
//"申请社区团长",
this.$api("shequ_applyShequ", {
  name: '',
  phone: '',
  title: '',
  address: '',
  weixin: '',
  tuijianren: '',
  remark: '',
  shenfenzheng: '',
  originalPic: '',
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {

  }
});
//"站长订单列表",
this.$api("orders_shequOrders", {
  ...this.pagination,
  keyword: '',
  scene: '',//状态(0所有  1代配送   2待核销  3完成  4提醒取货)
  uid: '',//团员id(用于扫码查看该用户所有待核销的订单)
  peisong_time: '',//配送（提货）时间
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {

  }
});
//"站长核销订单",
this.$api("orders_hexiao", {
  hexiaoma: this.hexiaoma,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {

  }
});
//"站长配送完成",
this.$api("orders_peisongDone", {
  order_id: this.order_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {

  }
});
//"社区订单数量(源一拼)",
this.$api("orders_shequOrderNum").then((res) => {
  let { code, data } = res;
  if (code == 1) {

  }
});