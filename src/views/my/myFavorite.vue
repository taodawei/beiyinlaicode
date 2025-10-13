<template>
  <div class="page">
    <div class="main-title">
      <div class="left">我的收藏</div>
    </div>

    <div class="page-ctx">
      <!-- <div class="wrap">
        <div class="inner">
          <div class="goods-list">
            <div class="item scale-wrap" v-for="(item, index) in list" :key="index" @click="mix_to_goods(item)">
              <div class="action-box" @click.stop="favourite_cancel(item)">
                <img src="@img/other/goods-delete.png" alt="" />
              </div>
              <div class="img-box cover scale-inner">
                <img :src="item.img" alt class="scale-target" />
              </div>
              <div class="info">
                <div class="title">{{ item.title }}</div>
                <div class="price-box">
                  <div class="price">￥{{ item.price_sale }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <div class="fav-box">
        <div class="fav-titles">
          <div
            class="fav-check"
            @click="toggleCheckedAll"
            :class="{ checked: checkedAll }"
          >
            <img src="@img/check-0.png" alt="" class="img-check check-0" />
            <img src="@img/check-1.png" alt="" class="img-check check-1" />
            <span>全选</span>
          </div>
          <div class="fav-delete" @click="deleteChecked">移除选中</div>
        </div>

        <div class="fav-data-box" v-if="list.length">
          <div class="fav-list">
            <div class="fav-item" v-for="(item, index) in list" :key="index">
              <div
                class="fav-check"
                @click.stop="toggleCheckedItem(item)"
                :class="{ checked: item.checked }"
              >
                <img src="@img/check-0.png" alt="" class="img-check check-0" />
                <img src="@img/check-1.png" alt="" class="img-check check-1" />
              </div>
              <div class="goods-img" @click="mix_to_goods(item)">
                <!-- <img :src="item.img" alt="" /> -->

                <el-image :src="item.img">
                  <div slot="error" class="image-slot">
                    <img :src="item.default_img" />
                  </div>
                </el-image>
              </div>

              <div class="goods-title">
                <div class="text-1" @click="mix_to_goods(item)">
                  {{ item.title }}
                </div>
                <div class="text-2">￥{{ item.price_sale }}</div>
              </div>
              <div class="goods-actions">
                <button class="btn btn-cancel" @click.stop="favourite_cancel(item)">
                  取消收藏
                </button>
                <button class="btn btn-detail btn-ripple" @click="mix_to_goods(item)">
                  查看详情
                </button>
              </div>
            </div>
          </div>

          <div style="margin-top: 40px">
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
        <div class="fav-empty" v-if="!list.length">
          <el-empty description="没有查询到收藏信息..."></el-empty>
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
        pagenum: 10,
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
        alertErr("请选择要移除收藏的商品");
        return;
      }
      let ids = this.checkedList.map((v) => v.inventoryId).join();
      // let ids = this.checkedList.map(v => v.inventoryId);
      // this.checkedList.forEach((item) => {
      //   this.$api("product_collect", {
      //     inventoryId: item.inventoryId,
      //     collect_type: 1,
      //     _no_tip: 1,
      //   }).then((res) => {
      //     let { code, message } = res;
      //     if (code == 1) {
      //       setTimeout(() => {
      //         alert(res);
      //         this.setView();
      //       }, 1000);
      //     }
      //   });
      // });

      this.$api("product_delcollect", {
        inventoryId: ids,
      }).then((res) => {
        let { code, message } = res;
        alert(res);
        if (code == 1) {
          // setTimeout(() => {
          this.setView();
          // }, 1000);
        }
      });
    },

    setView() {
      this.$api("product_plistNew", {
        shoucang: 1,
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

    //收藏 取消
    favourite_cancel(item) {
      this.$api("product_collect", {
        inventoryId: item.inventoryId,
        collect_type: 1,
      }).then((res) => {
        let { code, message } = res;
        if (code == 1) {
          this.setView();
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

  .page-ctx {
    margin-top: 24px;
    padding: 24px 32px 40px 32px;
    background: #fff;
  }
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

.fav-box {
  .fav-titles {
    // margin-bottom: 20px;
    padding: 0 24px;
    .flex();
    border: 1px solid #e5e5e5;
    height: 44px;
    background: #f5f5f5;
    color: #666666;
    font-size: 14px;
    .fav-check {
      .flex();

      img {
        width: 13px;
        margin-right: 8px;
      }
    }

    .fav-delete {
      margin-left: 64px;
      cursor: pointer;
    }
  }
  .fav-list {
    border: 1px solid #e5e5e5;
    border-top: none;
    .fav-item {
      display: flex;
      align-items: center;
      padding: 24px;
      border-bottom: 1px solid #e5e5e5;

      &:last-child {
        border-bottom: none;
      }

      .fav-check {
        width: 52px;
        text-align: left;
        img {
          width: 13px;
        }
      }

      .goods-img {
        cursor: pointer;
        img {
          width: 104px;
          height: 104px;
        }
        /deep/ img {
          width: 104px;
          height: 104px;
        }
      }

      .goods-title {
        flex: 1;
        text-align: left;
        padding-left: 15px;
        .text-1 {
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
        }
      }

      .goods-actions {
        min-width: 230px;

        button {
          width: 104px;
          height: 32px;
          background: #ffffff;
          border-radius: 4px;
          font-size: 14px;

          &.btn-cancel {
            color: #999999;
          }
          &.btn-detail {
            border: 1px solid #ea3200;
            color: #ea3200;
          }
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/user/myFavourite.less"></style>
