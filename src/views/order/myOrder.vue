<template>
  <div class="page">
    <div class="main-title">我的订单</div>

    <div class="page-ctx">
      <div class="tab-box">
        <div class="tab-list">
          <div
            v-for="(item, index) in list_status"
            :key="index"
            class="tab-item"
            :class="order_status == item.status ? 'active' : ''"
            @click="order_status = item.status"
          >
            {{ item.title }}
            <span class="number" v-if="item.num">{{ item.num }}</span>
          </div>
        </div>
        <div class="search-box">
          <input type="text" placeholder="输入商品名称、订单号" v-model="keyword" />
          <button @click="click_order_search">搜索</button>
          <button @click="onReset">重置</button>
        </div>
      </div>
      <div class="center">
        <orderList :list="list_order" />

        <div v-if="list_order.length" class="pagination-box" style="margin-top: 40px">
          <el-pagination
            background
            layout="total, prev, pager, next"
            @current-change="changePage"
            :current-page.sync="pagination.page"
            :page-size="pagination.pagenum"
            :total="count"
          ></el-pagination>
        </div>

        <el-empty
          v-if="!list_order.length"
          description="没有查询到订单信息..."
        ></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import orderList from "@/components/order/orderList.vue"; //订单列表
import { mapState } from "vuex";

export default {
  name: "servicePage",
  components: {
    orderList,
  },
  data() {
    return {
      order_status: 0,
      list_order: [],
      keyword: "",
      pagination: {
        page: 1,
        pagenum: 10,
      },
      count: 0,
      user_index: {},
    };
  },
  computed: {
    ...mapState([""]),

    list_status() {
      let user_index = this.user_index;
      let list_status = [
        { status: 0, title: "全部订单" },
        { status: 1, title: "待付款", num: user_index.order_num_1 || 0 },
        { status: 6, title: "待审核", num: user_index.order_num_6 || 0 },
        { status: 2, title: "待发货", num: user_index.order_num_2 || 0 },
        { status: 3, title: "待收货", num: user_index.order_num_3 || 0 },
        { status: 4, title: "待评价", num: user_index.order_num_4 || 0 },
      ];

      return list_status;
    },
  },
  created() {
    this.setView();
  },
  watch: {
    order_status() {
      // 0全部 1待支付  2待发货  3待收货  4待评价  5已评价 -1无效
      this.orders_lists();
    },
  },
  methods: {
    setView() {
      this.order_status = this.$route.query.order_status || 0;

      this.query_userIndex();
      this.orders_lists();
    },

    //用户主页数据
    query_userIndex() {
      this.$api("users_index").then((res) => {
        //console.log("users_index", res);
        let { code, data } = res;
        if (code == 1) {
          this.user_index = data;
        }
      });
    },

    //订单列表
    orders_lists() {
      this.$api("orders_lists", {
        keyword: this.keyword,
        scene: this.order_status,
        ...this.pagination,
      }).then((res) => {
        let { code, data, message, count } = res;
        if (code == 1) {
          data.forEach((order) => {
            order.isPay = order.status >= 0;
            order.actions = this.getOrderActions({
              ...order,
            });

            let count_goods = 0;
            order.products.forEach((product) => {
              count_goods = count_goods + +product.num;
            });
            order.count_goods = count_goods;
          });

          this.list_order = data;
          this.count = count;
        }
      });
    },

    //根据订单状态获取订单操作结果
    getOrderActions(order) {
      let { status, status_info, ifpingjia } = order;
      let actions = [];
      // let actions = [
      //   { name: "取消订单",type: 'quxiao' },
      //   { name: "立即支付",type: 'zhifu' },
      //   { name: "确认收货",type: 'shouhuo' },
      //   { name: "评价订单",type: 'pingjia' },
      //   { name: "申请售后",type: 'shouhou' },
      //   { name: "删除订单",type: 'shanchu' },
      //   { name: "再次购买",type: 'goumai' },
      // ];

      if (status == -5) {
        //待支付
        if (status_info == "无效") {
          actions = [{ name: "取消订单", type: "quxiao" }];
        } else if (status_info == "待支付") {
          actions = [
            { name: "立即支付", type: "zhifu" },
            { name: "取消订单", type: "quxiao" },
          ];
        }
      } else if (status == -3) {
        //-3售后处理中
        actions = [{ name: "删除订单", type: "shanchu" }];
      } else if (status == -1) {
        //无效
        actions = [{ name: "删除订单", type: "shanchu" }];
      } else if (status == 0) {
        //0待成团
        actions = [{ name: "取消订单", type: "quxiao" }];
      } else if (status == 2) {
        //2待发货
        actions = [
          // { name: "取消订单", type: "quxiao" }
        ];
      } else if (status == 3) {
        //3待收货
        actions = [
          { name: "确认收货", type: "shouhuo" },
          { name: "查看物流", type: "wuliu" },
        ];
      } else if (status == 4) {
        //4已收货
        if (ifpingjia) {
          actions = [
            // { name: "删除订单", type: "shanchu" },
            // { name: "查看物流", type: "wuliu" },
            { name: "售后", type: "shouhou" },
          ];
        } else {
          actions = [
            // { name: "删除订单", type: "shanchu" },
            // { name: "查看物流", type: "wuliu" },
            { name: "售后", type: "shouhou" },
            //  { name: "评价订单", type: 'pingjia' }
          ];
        }
      }
      return actions;
    },

    //分页
    changePage() {
      this.orders_lists();
    },

    //搜索
    click_order_search() {
      this.orders_lists();
    },

    //重置
    onReset() {
      this.keyword = "";
      this.pagination.page = 1;
      this.orders_lists();
    },

    updateView() {
      this.orders_lists();
    },
  },
};
</script>

<style scoped lang="less">
/deep/ .order-list-wrap {
  margin-top: 30px;
}

.page {
  padding-bottom: 50px;
  .main-title {
    margin-bottom: 20px;
    padding: 0 32px;
    text-align: left;
    height: 56px;
    line-height: 56px;
    background: #ffffff;
    font-size: 16px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #333333;
  }

  .page-ctx {
    padding: 24px 32px;
    background: #fff;
  }
  .tab-box {
    padding-right: 20px;
    .flex-between();
    background: #ffffff;
    // border: 1px solid #cccccc;

    .tab-list {
      .flex();
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 20px;
      color: #7d7d7d;

      .tab-item {
        position: relative;
        // min-width: 96px;
        height: 48px;
        line-height: 48px;
        cursor: pointer;
        margin-right: 40px;

        .number {
          color: @theme;
        }

        &.active {
          // background: @theme;
          // color: #fff;
          font-weight: bold;
          color: @theme;
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: @theme;
          }
        }
      }
    }

    .search-box {
      .flex();
      min-width: 260px;
      height: 32px;
      background: #f9f9f9;

      input {
        background: #f9f9f9;
        flex: 2;
        height: 100%;
        border: 1px solid #e2e2e2;
        border-right: none;
        outline: none;
        padding-left: 10px;
        font-size: 12px;
      }
      button {
        width: 50px;
        height: 32px;
        background: #ffffff;
        border: 1px solid #e2e2e2;
        color: #7d7d7d;

        &:last-child {
          border-left: 0;
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/shop/myOrder.less"></style>
