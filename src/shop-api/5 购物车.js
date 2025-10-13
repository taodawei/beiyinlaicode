let obj = {
  43: "购物车列表",
  44: "添加购物车",
  45: "购物车删除商品",
  46: "修改购物车商品数量",
  47: "清空购物车",
};



//"购物车列表",
this.$api("gouwuche_lists").then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_shopcart = data;


    let count = 0;
    data.forEach((v) => {
      count += v.num * 1;
    });
    this.mix_shopcart_update_count(count);
  }
});
//"添加购物车",
this.$api("gouwuche_add", {
  inventoryId: this.inventoryId,
  num: this.num,
}).then((res) => {
  let { code, count } = res;
  if (code == 1) {
    this.mix_shopcart_update_count(count);
  }
});
//"购物车删除商品",
this.$api("gouwuche_del", {
  inventoryId: this.inventoryId,
}).then((res) => {
  let { code, count } = res;
  if (code == 1) {
    this.mix_shopcart_update_count(count);
  }
});
//"修改购物车商品数量",
this.$api("gouwuche_updateNum", {
  inventoryId: this.inventoryId,
  num: this.num,
}).then((res) => {
  let { code, count } = res;
  if (code == 1) {
    this.mix_shopcart_update_count(count);
  }
});
//"清空购物车",
this.$api("gouwuche_delAll", {
  id: this.refund_id,
}).then((res) => {
  let { code, count } = res;
  if (code == 1) {
    this.mix_shopcart_update_count(count);
  }
});