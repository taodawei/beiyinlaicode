export default {
  /**
   * 需要用户登录执行的操作  未登录则页面 跳转到登录页
   */
  needAuthApiList: [
    { api: "product_collect", title: "商品收藏/取消收藏" },
    { api: "gouwuche_add", title: "商品加入购物车" },
  ],

  // 接口操作成功后需要展示提示的接口
  needActionSuccessMsgApiList: [
    // {api: 'gouwuche_updateNum', title: '修改购物车商品数量'},
    { api: "orders_create", title: "创建订单" },
    { api: "orders_qxOrder", title: "取消订单" },
  ],
  // 接口操作失败后需要展示提示的接口
  needActionFailMsgApiList: [
    { api: "gouwuche_updateNum", title: "修改购物车商品数量" },
    { api: "orders_create", title: "创建订单" },
    { api: "orders_qxOrder", title: "取消订单" },
  ],
};
