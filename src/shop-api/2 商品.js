let obj = {
  14: "商品分类",
  15: "商品列表",
  16: "商品详情",
  17: "商品评论列表",
  18: "获取商品小程序码",
  19: "商品(取消)收藏",
  20: "商品购买记录",
  21: "获取品牌列表",
};

// "商品分类",
this.$api("product_channel").then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_category = data || [];
  }
});

// "商品列表",
this.$api("product_plist", {
  channel_id: '',
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_goods = data || [];
  }
});
// "商品详情",
this.$api("product_detail", {
  inventoryId: this.id
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.detail_goods = data || {};
  }
});
// "商品评论列表",
this.$api("product_comments", {
  productId: this.productId,
  ...this.pagination,
  star: '',//	0全部 1好评 2中评 3差评
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_reviews = data || [];
  }
});
// "获取商品小程序码",
this.$api("product_getCode", {
  inventoryId: this.inventoryId,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.detail_goods_code = data || {};
  }
});
// "商品(取消)收藏",
this.$api("product_collect", {
  inventoryId: this.inventoryId,
  collect_type: 0,//0收藏 1取消收藏
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    
  }
});
// "商品购买记录",
this.$api("product_buyRecord", {
  ids: '1,2'//商品规格id(多个用,分开)
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_buyRecord = data || [];
  }
});
// "获取品牌列表",
this.$api("product_brandList",{
  ...this.pagination
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_brand = data || [];
  }
});