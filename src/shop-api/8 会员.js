var obj = {
  66: "贝海--充值额度",
  67: "贝海--会员晋升",
  68: "贝海--晋升列表",
  69: "贝海--额度记录",
  70: "微信登录",
  71: "发送短信",
  72: "微信授权手机号",
  73: "绑定手机号",
  74: "修改昵称(用户名)",
  75: "签到",
  76: "动态获取我的信息",
  77: "我的优惠券列表",
  78: "领券中心列表",
  79: "优惠券领取",
  80: "团长升级相关",
  81: "申请团长",
  82: "会员积分数据",
  83: "会员首页接口",
  84: "积分记录",
  85: "我的收益汇总",
  86: "会员粉丝/团长",
  87: "会员粉丝列表",
  88: "会员粉丝预估收入",
  89: "佣金记录",
  90: "佣金订单明细",
  91: "分享邀请信息",
  92: "小程序外部注册",
  93: "收货地址列表",
  94: "新增/修改收货地址",
  95: "收货地址详情",
  96: "删除收货地址",
  97: "设为默认收货地址",
  98: "修改余额支付密码",
  99: "邀请会员",
  100: "蔺式项目会员申请升级接口",
  101: "提交姓名、电话",
  102: "获取省市县",
  103: "获取发票列表",
  104: "新增/修改发票",
  105: "意见反馈",
};

//"贝海--充值额度",
this.$api("users_chongzhi", {
  money: this.money,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"贝海--会员晋升",
this.$api("users_jinsheng", {
  id: this.id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"贝海--晋升列表",
this.$api("users_getLevel").then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"贝海--额度记录",
this.$api("users_availableJilu", {
  ...this.pagination,
  type: this.type, //类型1是充值，2是消费
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"微信登录",
this.$api("users_wxLogin", {
  code: this.code, //微信授权code
  invite_id: this.invite_id, //邀请人id
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    //设置用户信息
  }
});
//"发送短信",
this.$api("users_sendSms", {
  phone: this.phone,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"微信授权手机号",
this.$api("users_bindWxPhone", {}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"绑定手机号",
this.$api("users_bindPhone", {
  phone: this.phone,
  code: this.code,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"修改昵称(用户名)",
this.$api("users_editName", {
  name: this.name,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"签到",
this.$api("users_qiandao").then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"动态获取我的信息",
this.$api("users_userInfo").then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"我的优惠券列表",
this.$api("users_myYhqList", {
  ...this.pagination,
  scene: this.scene, //0全部  1未使用  2已使用  3已过期
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_my_coupon = data;
  }
});
//"领券中心列表",
this.$api("users_yhqList", {
  ...this.pagination,
  scene: this.scene, //0全部  1未使用  2已使用  3已过期
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_coupon = data;
  }
});
//"优惠券领取",
this.$api("users_yhqLingqu", {
  id: this.id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"团长升级相关",
this.$api("users_teamInfo").then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"申请团长",
this.$api("users_applyTuanzhang").then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"会员积分数据",
this.$api("users_applyTuanzhang").then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"会员首页接口",
this.$api("users_index").then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"积分记录",
this.$api("users_jifenRecord", {
  ...this.pagination,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_jifen_record = data;
  }
});
//"我的收益汇总",
this.$api("users_moneyTotal").then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"会员粉丝/团长",
this.$api("XXX", {
  order_id: this.order_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"会员粉丝列表",
this.$api("users_fansRecord", {
  ...this.pagination,
  scene: this.scene, //类型(0全部   1直属粉丝   2推荐粉丝)
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_fans = data;
  }
});
//"会员粉丝预估收入",
this.$api("users_fansIncome", {
  id: this.fans_id, //粉丝会员id
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"佣金记录",
this.$api("users_moneyRecord", {
  ...this.pagination,
  type: this.type, //类型(0所有   1消费   2收入    3提现)
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_yongjin = data;
  }
});
//"佣金订单明细",
this.$api("users_moneyOrders", {
  ...this.pagination,
  scene: this.scene, //订单状态(0全部   1已付款   2已结算   3无效)
  keyword: this.keyword,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_order = data;
  }
});
//"分享邀请信息",
this.$api("users_shareInfo").then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"小程序外部注册",
this.$api("users_appletReg", {
  openid: this.openid,
  session_key: this.session_key,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"收货地址列表",
this.$api("userAddress_lists", {
  ...this.pagination,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_address = data;
  }
});
//"新增/修改收货地址",
this.$api("userAddress_add", {
  ...this.form,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"收货地址详情",
this.$api("userAddress_detail", {
  id: this.address_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.detail_address = data;
  }
});
//"删除收货地址",
this.$api("userAddress_delete", {
  id: this.address_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"设为默认收货地址",
this.$api("userAddress_setDefault", {
  id: this.address_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"修改余额支付密码",
this.$api("users_payPass", {
  paypass: this.paypass, //支付密码
  code: this.code, //手机验证码
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"邀请会员",
this.$api("users_invite").then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"蔺式项目会员申请升级接口",
this.$api("users_level1114", {}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"提交姓名、电话",
this.$api("users_editInfo", {
  name: this.name,
  phone: this.phone,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
//"获取省市县",
this.$api("users_getAreaList", {
  parent_id: this.parent_id,
}).then((res) => {
  let { code, data } = res;
  if (code == 1) {
    if (this.queryType == "省") {
      this.list_sheng = data;
    } else if (this.queryType == "市") {
      this.list_shi = data;
    } else if (this.queryType == "区") {
      this.list_qu = data;
    }
  }
});
//"获取发票列表",
this.$api("users_getFaPiao").then((res) => {
  let { code, data } = res;
  if (code == 1) {
    this.list_fapiao = data;
  }
});
//"新增/修改发票",
this.$api("users_addFaPiao", this.form).then((res) => {
  let { code, data } = res;
  if (code == 1) {

  }
});
//"意见反馈",
this.$api("users_useryj", this.form).then((res) => {
  let { code, data } = res;
  if (code == 1) {
  }
});
