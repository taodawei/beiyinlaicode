let obj = {
  58: "积分兑换下单",
  59: "绑定银行卡",
  60: "获取绑定银行卡",
  61: "提现",
  62: "积分兑换商品列表",
  63: "余额充值",
  64: "充值赠送活动",
  65: "测试-提现",
};

//"积分兑换下单",
this.$api("money_jifenOrder", {
  inventoryId: this.inventoryId,
  num: this.num,
  address_id: this.address_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"绑定银行卡",
this.$api("money_updateBankcard", {
  name: this.name,
  cardId: this.cardId,
  bank_name: this.bank_name,
  bank_cardId: this.bank_cardId,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"获取绑定银行卡",
this.$api("money_getBankcrad").then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.detail_bind = data;
  }
});
//"提现",
this.$api("money_tixian", {
  money: this.money,
  type: this.type, //0提现到银行卡  1提现到零钱
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"积分兑换商品列表",
this.$api("money_jifenPdts", {
  ...this.pagination,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_duihuan = data;
  }
});
//"余额充值",
this.$api("money_chongzhi", {
  money: this.money,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"充值赠送活动",
this.$api("money_investActivity").then((res) => {
  let { code, data } = res;
  if (code == 1) {
    let { type, rules } = data;
    this.list_rules = rules;
  }
});
//"测试-提现",
this.$api("orders_peisongDone", {
  order_id: this.order_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
