export default {
  /**
   * 所有接口
   * successActionTip: 是否需要展示接口调用成功提示
   * successActionTip: 是否需要展示接口调用失败提示
   * api: 接口名
   * title: 接口标题
   */

  ApiList: [
    //1 首页及杂项
    { successActionTip: 0, failActionTip: 0, api: "index_index", title: "首页数据接口" },
    { successActionTip: 0, failActionTip: 0, api: "xxxxxxxxxx", title: "ces" },
    { successActionTip: 0, failActionTip: 0, api: "index_miaoshas", title: "获取秒杀列表" },
    { successActionTip: 0, failActionTip: 0, api: "index_newsChannel", title: "新闻分类接口" },
    { successActionTip: 0, failActionTip: 0, api: "index_newsList", title: "新闻列表接口" },
    { successActionTip: 0, failActionTip: 0, api: "index_newsDetail", title: "新闻详情接口" },
    { successActionTip: 0, failActionTip: 0, api: "index_article", title: "说明信息接口" },
    { successActionTip: 1, failActionTip: 1, api: "index_upload", title: "上传图片" },
    { successActionTip: 0, failActionTip: 0, api: "index_channelPdts", title: "首页分类加商品" },
    { successActionTip: 0, failActionTip: 0, api: "index_kefu", title: "客服电话" },
    { successActionTip: 0, failActionTip: 0, api: "index_tanchuang", title: "首页弹窗接口" },
    { successActionTip: 0, failActionTip: 0, api: "index_buymsg", title: "首页最新购买弹窗" },
    { successActionTip: 0, failActionTip: 0, api: "zhibo_live", title: "小程序直播" },
    { successActionTip: 0, failActionTip: 0, api: "index_config", title: "获取网站信息及版权" },
    //2 商品相关接口
    { successActionTip: 0, failActionTip: 0, api: "product_channel", title: "商品分类" },
    { successActionTip: 0, failActionTip: 0, api: "product_plist", title: "商品列表" },
    { successActionTip: 0, failActionTip: 1, api: "product_detail", title: "商品详情" },
    { successActionTip: 0, failActionTip: 0, api: "product_comments", title: "商品评论列表" },
    { successActionTip: 0, failActionTip: 0, api: "product_getCode", title: "获取商品小程序码" },
    { successActionTip: 1, failActionTip: 1, api: "product_collect", title: "商品(取消)收藏" },
    { successActionTip: 0, failActionTip: 0, api: "product_buyRecord", title: "商品购买记录" },
    { successActionTip: 0, failActionTip: 0, api: "product_brandList", title: "获取品牌列表" },
    //3 订单相关接口
    { successActionTip: 0, failActionTip: 1, api: "orders_wxPay", title: "订单微信支付" },
    { successActionTip: 1, failActionTip: 1, api: "orders_qrshouhuo", title: "确认收货" },
    { successActionTip: 0, failActionTip: 0, api: "orders_lists", title: "贝海--评价商品列表" },
    { successActionTip: 0, failActionTip: 0, api: "orders_lists", title: "订单列表" },
    { successActionTip: 1, failActionTip: 1, api: "orders_del", title: "删除订单" },
    { successActionTip: 0, failActionTip: 1, api: "orders_getPayInfo", title: "根据下单商品获得确认订单信息(运费、促销活动、优惠券等)" },
    { successActionTip: 0, failActionTip: 0, api: "orders_tihuoma", title: "提货码" },
    { successActionTip: 1, failActionTip: 1, api: "orders_comment", title: "订单评价" },
    // { successActionTip: 1, failActionTip: 1, api: "orders_create", title: "下单" },
    { successActionTip: 0, failActionTip: 1, api: "orders_create", title: "下单" },
    { successActionTip: 0, failActionTip: 0, api: "orders_detail", title: "订单详情" },
    // { successActionTip: 1, failActionTip: 1, api: "orders_jifenPay", title: "订单积分抵现" },
    { successActionTip: 0, failActionTip: 0, api: "orders_jifenPay", title: "订单积分抵现" },
    { successActionTip: 0, failActionTip: 0, api: "orders_shareOrder", title: "分享订单的详情" },
    { successActionTip: 0, failActionTip: 0, api: "orders_shareReturn", title: "分享回调(可在客户点击分享的时候调用)" },
    { successActionTip: 1, failActionTip: 1, api: "orders_qxOrder", title: "取消订单" },
    // { successActionTip: 1, failActionTip: 1, api: "orders_yuePay", title: "订单余额支付" },
    { successActionTip: 0, failActionTip: 0, api: "orders_yuePay", title: "订单余额支付" },
    // { successActionTip: 1, failActionTip: 1, api: "orders_wxScanCodePay", title: "订单微信扫码支付" },
    { successActionTip: 0, failActionTip: 0, api: "orders_wxScanCodePay", title: "订单微信扫码支付" },
    //4 退换货相关
    { successActionTip: 0, failActionTip: 0, api: "refund_lists", title: "退换货列表" },
    { successActionTip: 1, failActionTip: 1, api: "refund_add", title: "新增退换货" },
    { successActionTip: 0, failActionTip: 0, api: "refund_detail", title: "退换货详情" },
    { successActionTip: 1, failActionTip: 1, api: "refund_addKuaidi", title: "买家填写快递信息" },
    { successActionTip: 1, failActionTip: 1, api: "refund_qxRefund", title: "取消退换货" },
    //5 购物车相关
    { successActionTip: 0, failActionTip: 0, api: "gouwuche_lists", title: "购物车列表" },
    { successActionTip: 1, failActionTip: 1, api: "gouwuche_add", title: "添加购物车" },
    { successActionTip: 1, failActionTip: 1, api: "gouwuche_del", title: "购物车删除商品" },
    { successActionTip: 0, failActionTip: 0, api: "gouwuche_updateNum", title: "修改购物车商品数量" },
    { successActionTip: 1, failActionTip: 1, api: "gouwuche_delAll", title: "清空购物车" },
    //6 社区购相关
    { successActionTip: 0, failActionTip: 0, api: "shequ_dingwei", title: "根据定位获取市、区、附近站点" },
    { successActionTip: 0, failActionTip: 0, api: "shequ_lists", title: "获取社区列表" },
    { successActionTip: 0, failActionTip: 0, api: "shequ_getShequ", title: "获取申请信息" },
    { successActionTip: 0, failActionTip: 0, api: "shequ_bindShequ", title: "选择社区" },
    { successActionTip: 0, failActionTip: 0, api: "shequ_info", title: "获取社区配送信息" },
    { successActionTip: 1, failActionTip: 1, api: "shequ_applyShequ", title: "申请社区团长" },
    { successActionTip: 0, failActionTip: 0, api: "orders_shequOrders", title: "站长订单列表" },
    { successActionTip: 1, failActionTip: 1, api: "orders_hexiao", title: "站长核销订单" },
    { successActionTip: 1, failActionTip: 1, api: "orders_peisongDone", title: "站长配送完成" },
    { successActionTip: 0, failActionTip: 0, api: "orders_shequOrderNum", title: "社区订单数量(源一拼)" },
    //7 充值提现积分兑换
    { successActionTip: 1, failActionTip: 1, api: "money_jifenOrder", title: "积分兑换下单" },
    { successActionTip: 1, failActionTip: 1, api: "money_updateBankcard", title: "绑定银行卡" },
    { successActionTip: 0, failActionTip: 0, api: "money_getBankcrad", title: "获取绑定银行卡" },
    { successActionTip: 1, failActionTip: 1, api: "money_tixian", title: "提现" },
    { successActionTip: 0, failActionTip: 0, api: "money_jifenPdts", title: "积分兑换商品列表" },
    { successActionTip: 1, failActionTip: 1, api: "money_chongzhi", title: "余额充值" },
    { successActionTip: 0, failActionTip: 0, api: "money_investActivity", title: "充值赠送活动" },
    { successActionTip: 0, failActionTip: 0, api: "orders_peisongDone", title: "测试-提现" },
    //8 会员相关
    { successActionTip: 0, failActionTip: 0, api: "users_chongzhi", title: "贝海--充值额度" },
    { successActionTip: 0, failActionTip: 0, api: "users_jinsheng", title: "贝海--会员晋升" },
    { successActionTip: 0, failActionTip: 0, api: "users_getLevel", title: "贝海--晋升列表" },
    { successActionTip: 0, failActionTip: 0, api: "users_availableJilu", title: "贝海--额度记录" },
    { successActionTip: 0, failActionTip: 0, api: "users_wxLogin", title: "微信登录" },
    { successActionTip: 1, failActionTip: 1, api: "users_sendSms", title: "发送短信" },
    { successActionTip: 1, failActionTip: 1, api: "users_bindWxPhone", title: "微信授权手机号" },
    { successActionTip: 1, failActionTip: 1, api: "users_bindPhone", title: "绑定手机号" },
    { successActionTip: 1, failActionTip: 1, api: "users_editName", title: "修改昵称(用户名)" },
    { successActionTip: 1, failActionTip: 1, api: "users_qiandao", title: "签到" },
    { successActionTip: 0, failActionTip: 0, api: "users_userInfo", title: "动态获取我的信息" },
    { successActionTip: 0, failActionTip: 0, api: "users_myYhqList", title: "我的优惠券列表" },
    { successActionTip: 0, failActionTip: 0, api: "users_yhqList", title: "领券中心列表" },
    { successActionTip: 1, failActionTip: 1, api: "users_yhqLingqu", title: "优惠券领取" },
    { successActionTip: 0, failActionTip: 0, api: "users_teamInfo", title: "团长升级相关" },
    { successActionTip: 1, failActionTip: 1, api: "users_applyTuanzhang", title: "申请团长" },
    { successActionTip: 0, failActionTip: 0, api: "users_applyTuanzhang", title: "会员积分数据" },
    { successActionTip: 0, failActionTip: 0, api: "users_index", title: "会员首页接口" },
    { successActionTip: 0, failActionTip: 0, api: "users_jifenRecord", title: "积分记录" },
    { successActionTip: 0, failActionTip: 0, api: "users_moneyTotal", title: "我的收益汇总" },
    { successActionTip: 0, failActionTip: 0, api: "XXxxxxxxxxxxX", title: "会员粉丝/团长" },
    { successActionTip: 0, failActionTip: 0, api: "users_fansRecord", title: "会员粉丝列表" },
    { successActionTip: 0, failActionTip: 0, api: "users_fansIncome", title: "会员粉丝预估收入" },
    { successActionTip: 0, failActionTip: 0, api: "users_moneyRecord", title: "佣金记录" },
    { successActionTip: 0, failActionTip: 0, api: "users_moneyOrders", title: "佣金订单明细" },
    { successActionTip: 0, failActionTip: 0, api: "users_shareInfo", title: "分享邀请信息" },
    { successActionTip: 0, failActionTip: 0, api: "users_appletReg", title: "小程序外部注册" },
    { successActionTip: 0, failActionTip: 0, api: "userAddress_lists", title: "收货地址列表" },
    { successActionTip: 1, failActionTip: 1, api: "userAddress_add", title: "新增/修改收货地址" },
    { successActionTip: 0, failActionTip: 0, api: "userAddress_detail", title: "收货地址详情" },
    { successActionTip: 1, failActionTip: 1, api: "userAddress_delete", title: "删除收货地址" },
    { successActionTip: 1, failActionTip: 1, api: "userAddress_setDefault", title: "设为默认收货地址" },
    { successActionTip: 1, failActionTip: 1, api: "users_payPass", title: "修改余额支付密码" },
    { successActionTip: 0, failActionTip: 0, api: "users_invite", title: "邀请会员" },
    { successActionTip: 0, failActionTip: 0, api: "users_level1114", title: "蔺式项目会员申请升级接口" },
    // { successActionTip: 1, failActionTip: 1, api: "users_editInfo", title: "提交姓名、电话" },
    { successActionTip: 0, failActionTip: 0, api: "users_getAreaList", title: "获取省市县" },
    { successActionTip: 0, failActionTip: 0, api: "users_getFaPiao", title: "获取发票列表" },
    { successActionTip: 1, failActionTip: 1, api: "users_addFaPiao", title: "新增/修改发票" },
    { successActionTip: 0, failActionTip: 0, api: "users_useryj", title: "意见反馈" },
    //9 卡密兑换
    { successActionTip: 0, failActionTip: 0, api: "orders_cardList", title: "卡券列表" },
    { successActionTip: 1, failActionTip: 1, api: "orders_useCard", title: "兑换卡券" },
    { successActionTip: 1, failActionTip: 1, api: "orders_addCard", title: "添加卡券" },



    //新增
    { successActionTip: 1, failActionTip: 1, api: "index_feedback", title: "投诉" },
    { successActionTip: 0, failActionTip: 0, api: "users_myselfComments", title: "我的订单评价" },
    { successActionTip: 1, failActionTip: 1, api: "users_phoneRegister", title: "手机号验证码注册" },
    { successActionTip: 1, failActionTip: 1, api: "users_phoneLogin", title: "手机号登录" },
    { successActionTip: 1, failActionTip: 1, api: "users_sendSms", title: "手机号发送短信" },
    { successActionTip: 1, failActionTip: 1, api: "users_changePass", title: "忘记密码" },
    { successActionTip: 1, failActionTip: 1, api: "users_bindWxPhone", title: "微信授权手机号" },
    { successActionTip: 1, failActionTip: 1, api: "users_bindPhone", title: "绑定手机号" },
    // { successActionTip: 1, failActionTip: 1, api: "users_editInfo", title: "实名制+个人中心修改" },

    // 发票
    { successActionTip: 1, failActionTip: 1, api: "users_saveFaPiao", title: "用户发票添加和编辑" },
    { successActionTip: 0, failActionTip: 0, api: "users_faPiaoList", title: "用户发票列表" },
    { successActionTip: 0, failActionTip: 0, api: "users_faPiaoInfo", title: "用户发票详情" },
    { successActionTip: 1, failActionTip: 1, api: "users_delFaPiao", title: "用户发票删除" },

    //分销
    { successActionTip: 0, failActionTip: 0, api: "users_fansRecord", title: "个人本月-往前业绩详情" },
    { successActionTip: 0, failActionTip: 0, api: "users_myOrderDetail", title: "个人本月-往前业绩详情" },
    { successActionTip: 0, failActionTip: 0, api: "users_myOrderList", title: "个人往前业绩列表" },
    { successActionTip: 0, failActionTip: 0, api: "users_myFenHongrList", title: "团队往前分润" },
    { successActionTip: 0, failActionTip: 0, api: "users_myFenHongDetail", title: "团队往前分润详情" },

    // 物流查询
    { successActionTip: 0, failActionTip: 1, api: "express_getInfo", title: "物流查询" },

    //支付
    // { successActionTip: 0, failActionTip: 0, api: "orders_jifenPay", title: "积分支付" },

    //售后
    { successActionTip: 1, failActionTip: 1, api: "refund_qrShouHuo", title: "售后-退换货确认收货" },
  ],
  
};






