<template>
  <div class="page">
    <div class="main-title">
      <div class="left">我的足迹</div>
    </div>

    <div class="page-ctx">
      <div class="product-box">
        <div class="product-titles">
          <div
            class="product-check"
            @click="toggleCheckedAll"
            :class="{ checked: checkedAll }"
          >
            <img src="@img/check-0.png" alt="" class="img-check check-0" />
            <img src="@img/check-1.png" alt="" class="img-check check-1" />
            <span>全选</span>
          </div>
          <div class="product-delete" @click="deleteChecked">删除选中</div>
        </div>

        <div class="product-data-box" v-if="list.length">
          <div class="product-list">
            <div class="product-item" v-for="(item, index) in list" :key="index">
              <div
                class="img-check-box"
                @click.stop="toggleCheckedItem(item)"
                :class="{ checked: item.checked }"
              >
                <img src="@img/check-0.png" alt="" class="img-check check-0" />
                <img src="@img/check-1.png" alt="" class="img-check check-1" />
              </div>

              <div class="goods-img scale-box" @click="mix_to_goods(item)">
                <!-- <img :src="item.img" alt="" class="scale-img" /> -->

                <el-image :src="item.img">
                  <div slot="error" class="image-slot">
                    <img :src="item.default_img" />
                  </div>
                </el-image>
              </div>
              <div class="goods-title" @click="mix_to_goods(item)">
                <div class="text-1">
                  {{ item.title }}
                </div>
                <div class="text-2">
                  <span> ￥ </span>
                  <b>{{ item.price_sale }}</b>
                </div>
              </div>
            </div>
          </div>
          <div class="pagination-box" style="margin-top: 40px">
            <el-pagination
              background
              layout="total, prev, pager, next"
              @current-change="changePage"
              :current-page.sync="pagination.page"
              :page-size="pagination.pagenum"
              :total="count"
            ></el-pagination>
          </div>
        </div>
        <div class="product-empty" v-if="!list.length">
          <el-empty description="没有查询到相关信息..."></el-empty>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "favourite-jilu",
  components: {},
  data() {
    return {
      list: [],
      checkedAll: false,

      pagination: {
        page: 1,
        pagenum: 8,
      },
      count: 0,
    };
  },
  computed: {
    checkedList() {
      return this.list.filter((v) => v.checked);
    },
    checkedLen() {
      return this.checkedList.length;
    },
  },
  created() {
    this.setView();
  },

  methods: {
    toggleCheckedAll() {
      this.checkedAll = !this.checkedAll;

      this.list.forEach((v) => (v.checked = this.checkedAll));
    },

    toggleCheckedItem(item) {
      //console.log("切换勾选", { ...item });

      item.checked = !item.checked;

      let hasNotChecked = this.list.some((v) => !v.checked);
      if (hasNotChecked) {
        this.checkedAll = false;
      } else {
        this.checkedAll = true;
      }
    },
    deleteChecked() {
      if (!this.checkedLen) {
        alertErr("请选择要删除的商品记录");
        return;
      }
      let ids = this.checkedList.map((v) => v.inventoryId).join();
      // let ids = this.checkedList.map(v => v.inventoryId);
      // this.checkedList.forEach((item) => {

      // });

      this.$api("product_delhistory", {
        // inventoryId: item.inventoryId,
        inventoryId: ids,
      }).then((res) => {
        //console.log("商品列表组件", res);
        let { code, data, message, count } = res;
        alert(res);
        if (code == 1) {
          // setTimeout(() => {
          //   alert(res);
          this.setView();
          // }, 1000);
        }
      });
    },

    setView() {
      this.$api("product_plistNew", {
        history: 1,
        ...this.pagination,
      }).then((res) => {
        //console.log("商品列表组件", res);
        let { code, data, message, count } = res;
        if (code == 1) {
          data.forEach((v) => {
            v.checked = false;
          });
          this.list = data;
          this.count = count;
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.img-check {
  cursor: pointer;
  &.check-0 {
    display: block;
  }
  &.check-1 {
    display: none;
  }
}

.checked {
  cursor: pointer;
  .check-0 {
    display: none !important;
  }
  .check-1 {
    display: block !important;
  }
}

.product-item {
}

.page {
  padding-bottom: 80px;
  .main-title {
    .flex-between();
    padding: 0 32px;
    text-align: left;
    height: 56px;
    line-height: 56px;
    background: #ffffff;
    font-size: 16px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #333333;

    button {
      min-width: 96px;
      height: 30px;
      line-height: 30px;
      background: @theme;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
  }
}

.page-ctx {
  margin-top: 24px;
  padding: 24px 32px 40px 32px;
  background: #fff;
}

.wrap {
  .inner {
    padding: 0;
  }
}

.bottom-info {
  margin-top: 20px;
  margin-bottom: 50px;
}
.goods-list {
  .flex();
  flex-wrap: wrap;
  .item {
    position: relative;
    cursor: pointer;
    background: #ffffff;
    margin-top: 30px;
    margin-right: 23px;

    &:nth-child(4n) {
      margin-right: 0;
    }
    &:nth-child(-n + 4) {
      margin-top: 0;
    }

    .action-box {
      .flex-center();
      position: absolute;
      z-index: 10;
      right: 0;
      top: 0;
      width: 50px;
      height: 50px;
      background: rgba(0, 0, 0, 0.5);

      img {
        width: 27px;
      }
    }

    .img-box {
      overflow: hidden;
      width: 228px;
      height: 228px;
      img {
        width: 228px;
        height: 228px;
      }
    }
    .info {
      text-align: left;
      margin-top: 12px;
      .title {
        width: 228px;
        .line-1();
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 40px;
        color: #222222;
      }
      .price-box {
        .flex();
        margin-top: 8px;
        .price {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;

          color: #ea5959;
        }
        .xiaoliang {
          margin-left: 15px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;

          color: #a5a5a5;
        }
      }
    }
  }
}

.product-box {
  .product-titles {
    margin-bottom: 20px;
    padding: 0 24px;
    .flex();
    border: 1px solid #e5e5e5;
    height: 44px;
    background: #f5f5f5;
    color: #666666;
    font-size: 14px;
    .product-check {
      .flex();
      cursor: pointer;
      &.checked {
        color: @theme;
      }

      img {
        width: 13px;
        margin-right: 8px;
      }
    }

    .product-delete {
      margin-left: 64px;
      cursor: pointer;
    }
  }
  .product-list {
    border-top: none;
    display: flex;
    flex-wrap: wrap;
    .product-item {
      position: relative;
      margin-right: 32px;
      margin-top: 32px;
      width: 249px;
      border: 1px solid #e5e5e5;
      overflow: hidden;

      &:nth-child(4n) {
        margin-right: 0;
      }
      &:nth-child(-n + 4) {
        margin-top: 0;
      }

      .img-check-box {
        .flex-center();
        position: absolute;
        z-index: 10;
        left: 10px;
        top: 10px;
        width: 35px;
        height: 35px;
        cursor: pointer;

        .img-check {
          width: 13px;
        }
      }

      .goods-img {
        cursor: pointer;
        img {
          width: 249px;
          height: 249px;
        }
        /deep/ img {
          width: 249px;
          height: 249px;
        }
      }

      .goods-title {
        flex: 1;
        text-align: left;
        padding: 15px;
        .text-1 {
          .line-1();
          cursor: pointer;
          margin-bottom: 15px;
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          line-height: 24px;
        }
        .text-2 {
          font-size: 14px;
          font-family: Microsoft YaHei-Bold, Microsoft YaHei;
          font-weight: bold;
          color: #ea3200;

          b {
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/user/myBrowse.less"></style>
