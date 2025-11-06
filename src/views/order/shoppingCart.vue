<template>
  <div class="page">
    <div class="inner">
      <div class="main-title">
        <div class="left">
          <span>我的购物车</span>
          <!-- <span class="num">{{ shopcart_count }}</span> -->
        </div>
        <div class="right">
          <!-- <span>配送至：</span>
          <el-select v-model="address" placeholder="请选择">
            <el-option
              v-for="item in list_address"
              :key="item.id"
              :label="item.full_dizhi"
              :value="item.id"
            ></el-option>
          </el-select>-->

          <!-- 步骤条 -->
          <div class="step-box">
            <div class="step step-1 active">1.我的购物车</div>
            <div class="step step-2">2.填写/核对订单信息</div>
            <div class="step step-3">3.成功提交订单</div>
          </div>
        </div>
      </div>

      <div class="search-wrap">
        <div class="search-tip">我知道货号，可直接输入货号快速添加产品..</div>
        <div class="search-box">
          <div class="text-1">请输入货号：</div>
          <div class="input-box">
            <input type="text" v-model="keyword" />
          </div>
          <button class="btn-ripple" @click="searchGoodsAddCart">加入购物车</button>
        </div>
      </div>

      <!-- 商品列表 -->
      <div class="center">
        <div class="list cart-list">
          <div class="cart-list-inner">
            <!-- 标题 -->
            <div class="list-title">
              <div class="title-1">选择</div>
              <div class="title-3">货号</div>
              <div class="title-2" style="text-align: left; padding-left: 0px">产品</div>
              <!-- <div class="title-3">规格</div> -->
              <div class="title-4">单价</div>
              <div class="title-5">数量</div>
              <div class="title-6">小计</div>
              <div class="title-7">操作</div>
            </div>

            <!-- 商品列表 -->
            <div class="item" v-for="(item, index) in list_shopcart" :key="index">
              <div class="item-detail">
                <div class="item-1">
                  <el-checkbox
                    v-model="item.checked"
                    @change="on_change_checked_item"
                  ></el-checkbox>
                </div>
                <div class="item-4" @click="mix_to_goods(item)">{{ item.skuId }}</div>

                <div class="item-2 cover">
                  <!-- <img :src="item.image" @click="mix_to_goods(item)" /> -->
                  <el-image :src="item.image" @click="mix_to_goods(item)">
                    <div slot="error" class="image-slot">
                      <img :src="item.default_img" />
                    </div>
                  </el-image>
                </div>
                <div class="item-3">
                  <div class="goods-title" @click="mix_to_goods(item)">
                    {{ item.title }}
                  </div>
                  <div class="guige-info">
                    {{ item.key_vals }}
                  </div>
                </div>
                <!-- <div class="item-4">
                {{ item.key_vals == "无" ? "默认" : item.key_vals }}
              </div> -->
                <div class="item-5">￥ {{ item.price_sale }}</div>
                <div class="item-6">
                  <button @click="shopcart_goodMinus(item)">-</button>
                  <input
                    type="number"
                    min="1"
                    v-model="item.num"
                    @blur="on_blur_input(item)"
                  />
                  <button @click="shopcart_goodAdd(item)">+</button>
                </div>
                <div class="item-7">￥ {{ (item.price_sale * item.num).toFixed(2) }}</div>
                <div class="item-8">
                  <div class="goods-action-box" v-if="false">
                    <span
                      class="goods-action"
                      v-if="item.if_collect"
                      @click="favouriteDelete(item)"
                    >
                      <img src="@img/other/shopcart-goods-yishoucang.png" alt="" />
                      取消
                    </span>
                    <span class="goods-action" v-else @click="favouriteAdd(item)">
                      <img src="@img/other/shopcart-goods-weishoucang.png" alt="" />
                      收藏</span
                    >
                  </div>
                  <div class="goods-action-box">
                    <span class="goods-action" @click="shopcart_delete(item.inventoryId)">
                      <img src="@img/other/shopcart-goods-delete.png" alt="" />
                      删除</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <el-empty
              v-if="!list_shopcart.length"
              description="购物车是空的..."
            ></el-empty>
            <!-- <div class="empty" v-if="!list_shopcart.length">暂无数据...</div> -->
          </div>
        </div>

        <!-- 底部操作 -->
        <div class="action-box">
          <div class="item-1">
            <el-checkbox v-model="checked_all" @change="on_change_checked_all">{{
              checked_all ? "反选" : "全选"
            }}</el-checkbox>
          </div>
          <div class="item-2">
            <span @click="shopcart_delete_checked">删除选中</span>
          </div>
          <div class="item-3">
            <span @click="shopcart_clear">清空购物车</span>
          </div>
          <div class="item-4">
            已选择
            <b>{{ count_shopcart_checked }}</b>
            件商品
          </div>
          <div class="item-5">
            总价：
            <b>￥ {{ shopcart_money }}</b>
          </div>
          <button
            :disabled="jiesuanDisabled"
            class="item-6 btn-ripple"
            @click="jump_jiesuan"
          >
            去下单
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shopcart from "@/shop-actions/shopcart";

import { mapState } from "vuex";

export default {
  name: "servicePage",
  components: {},
  data() {
    return {
      address: "", //选择的地址
      checked_all: false, //是否全选
      list_shopcart: [], //购物车商品列表
      list_address: [], //地址列表
      keyword: "",
    };
  },
  computed: {
    ...mapState(["defaultAvatar", "shopcart_count", "webConfig"]),

    canSubmit() {
      return this.form.name;
    },

    //购物车商品总金额
    shopcart_money() {
      let money = 0;
      this.list_shopcart
        .filter((v) => v.checked)
        .forEach((v) => {
          money += v.num * v.price_sale;
        });
      return money.toFixed(2);
    },

    //购物车被选择的商品
    list_shopcart_checked() {
      return this.list_shopcart.filter((v) => v.checked);
    },
    //购物车被选择的商品
    count_shopcart_checked() {
      let count = 0;
      if (this.list_shopcart_checked.length) {
        this.list_shopcart_checked.forEach((v) => {
          count += +v.num;
        });
      }
      return count;
    },

    jiesuanDisabled() {
      return !this.list_shopcart_checked.length;
    },
  },
  watch: {
    address(val) {
      //console.log("当前地址", val);
    },
  },
  created() {
    this.setView();
  },
  methods: {
    setView() {
      this.mix_shopcart_get_list((data) => {
        data.forEach((v) => {
          v.checked = true;
        });
        this.list_shopcart = data;
        if (data.length) {
          this.checked_all = true;
        }
      });
    },

    favouriteDelete(item) {
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
    favouriteAdd(item) {
      this.$api("product_collect", {
        inventoryId: item.inventoryId,
        collect_type: 0,
      }).then((res) => {
        let { code, message } = res;

        if (code == 1) {
          this.setView();
        }
      });
    },

    //购物车 删除选中
    shopcart_delete_checked() {
      if (!this.list_shopcart_checked.length) {
        alertErr("请先选择要删除的商品");
        return;
      }
      let ids = this.list_shopcart_checked.map((v) => v.inventoryId);
      //console.log("要删除的商品id", ids);
      let id = ids.join();
      this.shopcart_delete(id);
    },

    //购车车 删除商品
    shopcart_delete(id) {
      shopcart.delete({
        params: {
          inventoryId: id,
        },
        success: () => {
          // debugger
          let list = this.list_shopcart;
          let ids = (id + "").split(",");
          //可能删除多项商品
          ids.forEach((inventoryId) => {
            let index = list.findIndex((v) => v.inventoryId == inventoryId);
            list.splice(index, 1);
          });
        },
      });
    },

    //购物车商品数量减少
    shopcart_goodMinus(item) {
      if (item.num == 1) {
        return;
      }
      item.num = --item.num;
      this.shopcart_updateNum(item);
    },

    //购物车商品数量增加
    shopcart_goodAdd(item) {
      item.num = ++item.num;
      this.shopcart_updateNum(item);
    },
    //购物车修改数量
    shopcart_updateNum(item) {
      let { inventoryId, num } = item;

      shopcart.updateNum({
        params: {
          inventoryId,
          num,
        },
        success: () => {
          let list = this.list_shopcart;
          let index = list.findIndex((v) => v.inventoryId == inventoryId);
          list.splice(index, 1, item);
        },
      });
    },

    // 购物车商品更新数量

    //清空购物车
    shopcart_clear() {
      if (!this.list_shopcart.length) {
        alertErr("购物车是空的！");
        return;
      }

      shopcart.clear({
        params: {},
        success: () => {
          this.list_shopcart = [];
        },
      });
    },

    //商品勾选 全选与取消
    on_change_checked_all(val) {
      //console.log("更新后的值", val);
      this.list_shopcart.forEach((v) => {
        v.checked = val;
      });
    },

    //商品勾选 单项选择
    on_change_checked_item() {
      // //console.log('监视单项选择', item)
      let checkLength = this.list_shopcart_checked.length;
      if (checkLength == this.list_shopcart.length) {
        this.checked_all = true;
      } else {
        this.checked_all = false;
      }
    },

    //去结算
    jump_jiesuan() {
      if (!this.list_shopcart.length) {
        alertErr("您的购物车是空的，快去选购商品吧！");
        return;
      }

      if (!this.list_shopcart_checked.length) {
        alertErr("请选择要结算的商品");
        return;
      }

      let list_payment = this.list_shopcart_checked;
      sessionStorage.setItem("list_payment", JSON.stringify(list_payment));

      this.$router.push({
        path: "/orderCreate",
        query: {
          from: "shoppingCart",
        },
      });
    },

    on_blur_input(item) {
      if (item.num < 1) {
        item.num = 1;
      }
      this.shopcart_updateNum(item);
    },

    searchGoodsAddCart() {
      if (!this.keyword) {
        alertErr("请输入货号");
        return;
      }

      this.$api("gouwuche_add", {
        skuId: this.keyword,
        num: 1,
      }).then((res) => {
        //console.log("通过货号加入购物车", res);
        if (res.code == 1) {
          this.setView();
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
/deep/ .order-list-wrap {
  margin-top: 30px;
}

.page {
  text-align: center;
  font-size: 14px;
  margin-top: 92px;
  .inner {
    width: @width;
    margin: 0 auto;
    padding: 48px 0 80px;

    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 20px;
    color: #333333;
  }

  .main-title {
    padding-bottom: 16px;
    border-bottom: 1px solid #d5d8de;

    .flex-between();
    margin-bottom: 20px;
    text-align: left;

    .left {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;

      .num {
        margin-left: 10px;
        color: #ff9312;
      }
    }
    .right {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 24px;
      color: #333333;

      .el-select {
        width: 250px;
      }

      .step-box {
        width: 500px;
        margin: 0 auto;
        font-size: 14px;
        .flex();
        .step {
          flex: 1;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background: #eee;
          cursor: pointer;
          transition: 0.3s;
          &:hover {
            opacity: 0.75;
          }

          &.step-1 {
            clip-path: polygon(0% 0%, 97% 0%, 100% 50%, 97% 100%, 0% 100%);
          }
          &.step-2 {
            clip-path: polygon(0% 0%, 97% 0%, 100% 50%, 97% 100%, 0% 100%, 3% 50%);
          }
          &.step-3 {
            clip-path: polygon(0% 0%, 97% 0%, 100% 50%, 97% 100%, 0% 100%, 3% 50%);
          }

          &.active {
            background: @theme;
            color: #fff;
          }
        }
      }
    }
  }

  .search-wrap {
    text-align: left;

    .search-tip {
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #999999;
    }
    .search-box {
      margin-top: 20px;
      margin-bottom: 40px;
      .flex();
      .text-1 {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #666666;
      }
      .input-box {
        input {
          padding: 0 15px;
          display: inline-block;
          width: 256px;
          height: 36px;
          background: #ffffff;
          border-radius: 4px 4px 4px 4px;
          border: 1px solid #d5d8de;
        }
      }
      button {
        margin-left: 10px;
        display: inline-block;
        width: 128px;
        height: 36px;
        background: #ea3200;
        border-radius: 4px 4px 4px 4px;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }

  .center {
    .list {
      border: 1px solid #ddd;
      .list-title {
        text-align: center;
        height: 48px;
        background: #f9f9f9;
        padding: 15px;

        .flex();
        border-bottom: 1px solid #ddd;
        .title-1 {
          width: 58px;
          text-align: center;
        }
        .title-2 {
          // width: 150px;
          flex: 2;
        }
        .title-3 {
          width: 200px;
        }
        .title-4 {
          width: 100px;
        }
        .title-5 {
          width: 200px;
        }
        .title-6 {
          width: 150px;
        }
        .title-7 {
          width: 150px;
        }
      }
      .item {
        border-bottom: 1px solid #eee;
        &:last-child {
          border-bottom: none;
        }

        .item-title {
          .flex();
          text-align: left;
          padding: 12px 40px;
          border-bottom: 1px solid #eee;

          .tag {
            img {
              width: 45px;
            }
          }
          .desc {
            margin: 0 10px;
            font-size: 12px;
            color: #6c6c6c;
          }
          .action {
            font-size: 12px;
            color: #333333;
            cursor: pointer;
          }
        }
        .item-detail {
          padding: 15px;
          .flex();

          .item-1 {
            width: 58px;
          }
          .item-2 {
            img {
              width: 100px;
              height: 100px;
              margin-right: 10px;
              cursor: pointer;
            }
            /deep/ img {
              width: 100px;
              height: 100px;
              margin-right: 10px;
              cursor: pointer;
            }
          }
          .item-3 {
            flex: 2;
            text-align: left;

            div {
              &:hover {
                color: @theme;
              }
            }

            .goods-title {
              width: fit-content;
              cursor: pointer;
              height: 40px;
              .line-2();
              font-size: 12px;
              font-family: Microsoft YaHei-Regular, Microsoft YaHei;
              font-weight: 400;
              color: #666666;
            }
            .guige-info {
              width: fit-content;
              cursor: pointer;
              margin-top: 10px;
              font-size: 12px;
              font-family: Microsoft YaHei-Regular, Microsoft YaHei;
              font-weight: 400;
              color: #999999;
            }
          }
          .item-4 {
            width: 200px;
          }
          .item-5 {
            width: 100px;
            color: @theme;
          }
          .item-6 {
            width: 200px;
            .flex-center();

            input {
              width: 48px;
              height: 30px;
              border: 1px solid #d5d8de;
              text-align: center;
              border-left: 0;
              border-right: 0;

              &::-webkit-outer-spin-button,
              &::-webkit-inner-spin-button {
                -webkit-appearance: none;
              }
            }

            button {
              width: 30px;
              height: 30px;
              border: 1px solid #d5d8de;
            }
          }
          .item-7 {
            width: 150px;
            font-size: 16px;
            color: @theme;
          }
          .item-8 {
            width: 150px;
            font-size: 16px;

            div {
              & + div {
                margin-top: 10px;
              }
              span {
                cursor: pointer;

                &:hover {
                  color: @theme;
                }
              }
            }
          }
        }
      }
    }
  }
}

.goods-action-box {
  text-align: center;
  font-size: 14px;
  font-weight: normal;
  color: #666666;

  .goods-action {
    .flex-center();

    img {
      width: 20px;
    }
  }
}

.action-box {
  .flex();
  height: 60px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.08);
  opacity: 1;
  margin-top: 40px;

  .item-1 {
    width: 100px;
    font-size: 14px;
    color: #333333;
  }
  .item-2 {
    width: 100px;

    span {
      font-size: 14px;
      color: #333333;
      cursor: pointer;
      &:hover {
        color: @theme;
      }
    }
  }
  .item-3 {
    flex: 2;
    text-align: left;

    span {
      font-size: 14px;
      color: #333333;
      cursor: pointer;
      &:hover {
        color: @theme;
      }
    }
  }
  .item-4 {
    width: 200px;
    color: #999999;

    b {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 20px;
      color: #f13f17;
    }
  }
  .item-5 {
    width: 200px;
    color: #999999;

    b {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 20px;
      color: #f13f17;
    }
  }
  .item-6 {
    cursor: pointer;
    width: 150px;
    height: 60px;
    line-height: 60px;
    background: #ff9312;
    background: @theme;

    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #ffffff;
    transition: 0.3s;
    user-select: none;

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }
}

.tip-box {
  margin-top: 30px;
  text-align: left;
  font-size: 14px;
  color: #999999;

  b {
    color: #e6170b;
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/shop/shoppingCart.less"></style>
