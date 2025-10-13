let obj = {
  0: "首页数据接口",
  1: "ces",
  2: "获取秒杀列表",
  3: "新闻分类接口",
  4: "新闻列表接口",
  5: "新闻详情接口",
  6: "说明信息接口(积分规则等)",
  7: "上传图片",
  8: "首页分类加商品",
  9: "客服电话",
  10: "首页弹窗接口",
  11: "首页最新购买弹窗",
  12: "小程序直播",
  13: "获取网站信息及版权",
};

// 首页数据接口  index_index
// position 1 pc  ||  2 h5  || 3小程序
this.$api("index_index", {
  position: 1,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    let { banners, adverts } = data;
  }
});

//获取秒杀列表
this.$api("index_miaoshas").then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_miaosha = data;
  }
});

//新闻分类接口
this.$api("index_newsChannel").then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_news_category = data || [];
  }
});

//新闻列表接口
this.$api("index_newsList", {
  channel_id: '3,4,5,6',//分类id（0代表所有）多条用,分隔
  keyword: '',
  content_len: '',
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_news = data || [];
  }
});

//新闻详情接口
this.$api("index_newsDetail", {
  id: this.news_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.detail_news = data || {};
  }
});

//说明信息接口
this.$api("index_article", {
  article_id: this.article_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.detail_article = data || {};
  }
});
//上传图片
function mix_fileUpload(params) {
  //console.log("文件上传 mix_uploadFileApi");
  const formData = new FormData();
  formData.append("action", "index_upload");
  formData.append("com_id", this.com_id);
  formData.append("user_id", localStorage.getItem("user_id"));
  formData.append("token", localStorage.getItem("token"));
  formData.append("img", params.file);
  formData.append("if_touxiang", params.if_touxiang || "");

  const uploaderConfig = {
    headers: {
      "Content-Type": "multipart/form-data;boundary=" + new Date().getTime(),
    },
  };
  return this.$api("index_upload", formData, "post", uploaderConfig);
}

//首页分类加商品
this.$api("index_channelPdts", {
  channel_num: 4,
  pdt_num: 8,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_channelPdts = data || [];
  }
});

//客服电话
this.$api("index_kefu").then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.detail_kefu = data || {};
  }
});
//首页弹窗接口
this.$api("index_tanchuang").then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.detail_kefu_tanchuang = data || {};
  }
});
//首页最新购买弹窗
this.$api("index_buymsg").then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_buymsg = data || [];
  }
});
//小程序直播
this.$api("zhibo_live").then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.detail_zhibo = data || {};
  }
});
//获取网站信息及版权
this.$api("index_config").then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.web_config = data || {};
  }
});