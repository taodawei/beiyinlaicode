let obj = {
  106: "卡券列表",
  107: "兑换卡券",
  108: "添加卡券",
};

//"卡券列表",
this.$api("orders_cardList", {
  ...this.pagination,
  status: this.status,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_card = data;
  }
});

//"兑换卡券",
this.$api("orders_useCard", {
  ...this.form
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});

//"添加卡券",
this.$api("orders_addCard", {
  ...this.form
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});