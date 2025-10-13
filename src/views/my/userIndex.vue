<template>
  <div class="page">
    <div class="section-box">
      <div class="section-1">
        <div class="left">
          <div class="img-box">
            <!-- <cusUploader col="uploadimg"> -->
            <div>
              <img v-if="userAvatar" :src="userAvatar" alt />
              <img v-else :src="defaultAvatar" alt />
            </div>
            <!-- </cusUploader> -->
            <div class="name">
              {{ baseInfo.name }}
            </div>
          </div>
        </div>
        <div class="right">
          <div class="text-1">{{ baseInfo.phone }}</div>
          <div class="text-2">
            <img src="@img/level-0.png" alt="" />
            <span>{{ baseInfo.level }}</span>
          </div>
        </div>
      </div>

      <div class="section-2">
        <div class="list">
          <div class="item" @click="$router.push('/myOrder?order_status=1')">
            <div class="val">
              <span>{{ user_index.order_num_1 || "0" }}</span>
            </div>
            <div class="label">待付款</div>
          </div>
          <div class="item" @click="$router.push('/myOrder?order_status=2')">
            <div class="val">
              <span>{{ user_index.order_num_2 || "0" }}</span>
            </div>
            <div class="label">待发货</div>
          </div>
          <div class="item" @click="$router.push('/myOrder?order_status=3')">
            <div class="val">
              <span>{{ user_index.order_num_3 || "0" }}</span>
            </div>
            <div class="label">待收货</div>
          </div>
          <div class="item" @click="$router.push('/myOrder?order_status=4')">
            <div class="val">
              <span>{{ user_index.order_num_4 || "0" }}</span>
            </div>
            <div class="label">待评价</div>
          </div>

          <!-- <div class="item" @click="$router.push('/myRefund')">售后</div> -->
        </div>
      </div>
    </div>

    <div class="section-order">
      <div class="section-title">
        <div class="label">最近订单</div>
        <router-link to="/myOrder" class="action">
          <span>全部订单</span>
          <img src="@img/order-more.png" alt="" />
        </router-link>
      </div>

      <div class="order-box">
        <div class="empty-info" v-if="!list_order.length">
          <div class="empty-img">
            <img src="@img/empty-img.png" alt="" />
          </div>
          <div class="empty-text">您还没有订单，赶快去逛逛吧！</div>
          <router-link to="/productCates" class="empty-action">
            进入产品中心
          </router-link>
        </div>
        <div class="order-info" v-else>
          <orderList :list="list_order" />
        </div>
      </div>
    </div>

    <div class="suggest-goods">
      <div class="section-title">
        <div class="label">我们向您推荐</div>
        <div class="action" @click="changeSugges">
          <img src="@img/product-refresh.png" alt="" style="margin-right: 10px" />
          <span>换一组</span>
        </div>
      </div>

      <div class="list-wrap">
        <listGood :list_goods="list_goods" />
      </div>
    </div>
  </div>
</template>

<script>
import cusUploader from "@/components/uploader/cusUploader.vue"; //上传

import listGood from "@/components/goods/listGood.vue"; //
import orderList from "@/components/order/orderList.vue"; //
import { mapState } from "vuex";

export default {
  name: "servicePage",
  components: {
    listGood,
    orderList,
    cusUploader,
  },
  data() {
    return {
      pagination: {
        page: "1",
        pagenum: "8",
      },
      count: 0,

      user_index: {}, //用户首页数据
      list_order: [],
      list_goods: [],

      uploadImg: "",
      youhui_code: "",
      youhui_msg: "",
    };
  },
  computed: {
    ...mapState(["defaultAvatar", "baseInfo"]),
    userAvatar() {
      return this.uploadImg || this.baseInfo.user_image;
    },
  },
  created() {
    this.setView();
  },
  methods: {
    uploadSuccess(col, data) {
      //console.log("父组件接收", col, data);

      if (data.code == 1) {
        this.uploadImg = data.image;
      }
    },

    setView() {
      this.query_userInfo();
      this.query_userIndex();
      this.query_order();
      this.query_goods();
    },
    query_userInfo() {
      this.$store.dispatch("getUserInfo");
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

    //订单查询
    query_order() {
      this.$api("orders_lists", {
        page: 1,
        pagenum: 2,
        scene: 3,
        scene: 0,
      }).then((res) => {
        //console.log("orders_lists", res);
        let { code, data } = res;
        if (code == 1) {
          data.forEach((v) => {
            let count_goods = 0;
            v.products.forEach((product) => {
              count_goods = count_goods + +product.num;
            });
            v.count_goods = count_goods;
          });
          this.list_order = data;
        }
      });
    },

    //商品信息
    query_goods() {
      this.$api("product_plistNew", {
        ...this.pagination,
        // is_tuijian: 1,
      }).then((res) => {
        let { code, data, count } = res;
        if (code == 1) {
          this.list_goods = data;
          this.count = res.count;
        }
      });
    },

    changeSugges() {
      if (this.count > this.pagination.pagenum * this.pagination.page) {
        this.pagination.page++;
        this.query_goods();
      } else {
        alertErr("没有更多了...");
      }
    },
  },
};
</script>

<style scoped lang="less">
/deep/ .box-wrap .list .item:nth-child(4n) {
  margin-right: 0;
}
/deep/ .box-wrap .list .item:nth-child(5n) {
  margin-right: 10px;
}

/deep/ .box-wrap .list .item {
  margin-top: 10px;
}
/deep/ .box-wrap .list .item:nth-child(-n + 4) {
  margin-top: 10px;
}

.section-box {
  .flex();
}

.section-1 {
  // .flex();
  // height: 72px;

  .flex-center();
  // flex-direction: column;
  position: relative;
  background: #faf7f5;
  background: url("~@/assets/img/userindex-bg.png");
  background-size: 100% 100%;
  padding: 0 15px;
  width: 256px;
  height: 210px;

  .left {
    height: calc(100% - 48px);
    .img-box {
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .name {
      margin-top: 10px;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .right {
    .flex-between();
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 48px;
    background: #ffffff;
    text-align: left;
    padding: 0 15px;
    border: 1px solid @theme;
    border-radius: 0 0 11px 11px;

    .text-1 {
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #333333;
    }
    .text-2 {
      .flex();

      img {
        width: 24px;
        margin-right: 5px;
      }
      span {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: @theme;
      }
    }
  }
}
.section-2 {
  flex: 1;
  .list {
    .flex-between();
    height: 185px;
    background: #ffffff;
    border: 1px solid #eee9e4;

    .item {
      width: 25%;
      padding: 10px 0;
      border-right: 1px solid #d5d8de;
      // margin-left: 40px;
      // margin-right: 40px;
      font-size: 16px;
      cursor: pointer;

      &:last-child {
        border-right: none;
      }

      .label {
        margin-top: 20px;
        font-size: 16px;
        font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
        font-weight: normal;
        color: #333333;
      }
      .val {
        span {
          // margin-left: 5px;
          font-size: 32px;
          font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
          font-weight: normal;
          color: @theme;
        }
      }
    }
  }
}

.page {
  padding-bottom: 70px;
}

.section-title {
  border-bottom: 1px solid #dedede;
  .flex-between();
  height: 56px;
  padding: 0 32px;

  .label {
    font-size: 18px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;
  }
  .action {
    .flex();
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: @theme;
    cursor: pointer;
    img {
      width: 14px;
      margin-left: 10px;
    }
  }
}

.section-order {
  margin: 25px 0;
  background: #fff;

  .order-box {
    .empty-info {
      padding: 40px 0;
      border-top: 1px solid #dedede;
      .empty-img {
        text-align: center;
        img {
          width: 190px;
        }
      }
      .empty-text {
        margin-top: 10px;
        margin-bottom: 20px;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }

      .empty-action {
        font-size: 14px;
        color: @theme;
      }
    }
  }
  .order-info {
    padding: 24px 32px;
  }
}

.suggest-goods {
  background: #fff;
  .list-wrap {
    padding: 32px 30px;
  }

  /deep/ .section-list {
    .item {
      // margin-right: 23px;

      &:nth-child(4n) {
        // margin-right: 0;
      }

      &:nth-child(5) {
        // margin-top: 50px;
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/user/userIndex.less"></style>
