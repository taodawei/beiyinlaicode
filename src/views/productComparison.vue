<template>
  <div class="page">
    <div class="page-top">
      <div class="page-bread">
        <div class="bread-box">
          <img src="@img/product-home.png" alt="" />
          <router-link to="/">首页</router-link>
          <span class="bread-divider">&gt;</span>
          <router-link to="/products">产品中心</router-link>
          <span class="bread-divider">&gt;</span>
          <router-link :to="'/productCates?id=' + activeCate.id">{{
            activeCate.title
          }}</router-link>
          <span class="bread-divider">&gt;</span>
          <a href="javascirpt:void(0);">产品对比</a>
        </div>
      </div>
    </div>

    <div class="page-box">
      <div class="page-inner">
        <div class="total-box">您选择了{{ id_arr.length }}个产品进行对比</div>

        <!-- 表格对比 -->
        <div
          class="ctx-table-box"
          :class="{ 'open-hide-same': hideSame, 'open-hight-light-diff': hightlightDiff }"
        >
          <table v-if="group_info.length" :style="tableStyle">
            <thead>
              <tr>
                <td>
                  <div class="filter-item filter-actions">
                    <div class="filter-text">产品对比</div>
                    <div class="checks">
                      <div
                        class="check-item"
                        :class="{ checked: hightlightDiff }"
                        @click="hightlightDiff = !hightlightDiff"
                      >
                        <img src="@img/check-0.png" alt="" class="check-0" />
                        <img src="@img/check-1.png" alt="" class="check-1" />
                        <span>高亮不同项</span>
                      </div>
                      <div
                        class="check-item"
                        :class="{ checked: hideSame }"
                        @click="hideSame = !hideSame"
                      >
                        <img src="@img/check-0.png" alt="" class="check-0" />
                        <img src="@img/check-1.png" alt="" class="check-1" />
                        <span>隐藏相同项</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  v-for="(item, index) in product_list"
                  :key="index"
                  :class="'td-' + product_list.length"
                >
                  <div class="top-box">
                    <div class="img-box">
                      <router-link class="img-link" :to="item.route">
                        <img :src="item.img" alt="" />
                      </router-link>
                    </div>
                    <div class="title">
                      <router-link :to="item.route"> {{ item.title }} </router-link>
                    </div>
                    <div class="number">
                      <router-link :to="item.route"> {{ item.skuId }} </router-link>
                    </div>
                  </div>
                </td>
              </tr>
            </thead>

            <!-- 内容体 -->
            <tbody>
              <tr v-for="(group, group_index) in group_info" :key="group_index">
                <td :class="{ same: group.isSame, diff: !group.isSame }">
                  <div class="text-box">
                    {{ group.params_title }}
                  </div>
                </td>
                <td
                  v-for="(item, index) in group.params_values"
                  :key="index"
                  :class="[
                    { same: group.isSame, diff: !group.isSame },
                    'td-' + product_list.length,
                  ]"
                >
                  <div class="text-box">
                    {{ item }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";

import { mapState } from "vuex";

export default {
  name: "product-duibi",
  components: {},
  data() {
    return {
      Loading,
      loadingInstance: null,

      activeCate: {},

      hightlightDiff: false,
      hideSame: false,
      id: this.$route.query.id, //分类id
      ids: this.$route.query.ids, //勾选的产品
      product_list: [],

      diff_items: [],

      query_field_done: false,
      field_list: [], //需要对比的字段列表

      group_info: [],

      tableStyle: {},
    };
  },
  computed: {
    ...mapState([""]),

    id_arr() {
      return this.ids.split(",");
    },
  },
  watch: {},

  beforeRouteUpdate(to, from, next) {
    //console.log("组件复用 from", from);
    //console.log("组件复用 to", to);

    next({
      query: to.query,
    });

    this.setView();
  },
  created() {
    this.showLoading();

    this.setActiveCate();
    this.queryField();
    this.setView();
  },
  methods: {
    showLoading() {
      this.loadingInstance = Loading.service({
        lock: true,
        text: "数据查询中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    hideLoading() {
      this.loadingInstance.close();
    },

    setActiveCate() {
      let list = this.product_cates_all;
      if (list && list.length) {
        //实验耗材
        this.activeCate = list.find((v) => v.id == this.$route.query.id) || {};
        //console.log("activeCate", { ...this.activeCate });
      } else {
        setTimeout(() => {
          this.setActiveCate();
        }, 100);
      }
    },

    //查询需要对比的字段 和 产品列表展示的字段相同
    queryField() {
      this.$api("product_getRow", {
        channel_id: this.$route.query.id || "",
      }).then((res) => {
        //console.log("获取当前分类产品的展示字段", res);
        this.field_list = res.data;
        this.query_field_done = true;
        this.renderHtml();
      });
    },

    //查询产品
    setView() {
      let ids = this.$route.query.ids || "";
      let id_arr = ids.split(",");
      if (id_arr.length >= 3) {
        let divice_width =
          document && document.documentElement && document.documentElement.clientWidth;
        var is_h5 = divice_width <= 1365;
        var is_pad = divice_width <= 1365 && divice_width >= 768;
        if (is_h5 && !is_pad) {
          this.tableStyle = { width: 150 * id_arr.length + "px" };
        }
      }

      this.$api("brand_compar", {
        productIds: ids || "",
      }).then((res) => {
        //console.log("对比产品", res);
        let list = res.data;
        let image_list = [];
        list.forEach((v) => {
          v.route = "/goodsDetail/" + v.inventoryId;
          image_list.push(v.img);

          if (v.is_sj) {
            var title = v.title;
            var title_en = v.param_info && v.param_info.english_name;
            v.title = title_en;
            v.param_info.chinese_name = title;
          }
        });
        this.handleProductImage(image_list);

        this.product_list = list;
        this.renderHtml();
      });
    },

    renderHtml() {
      let group_info = [
        // {
        //   params_title: '',
        //   values: []
        // }
      ];

      this.field_list.forEach((field) => {
        var key = field.field_title;
        let values = [];
        this.product_list.forEach((product) => {
          let params = product.param_info || {};
          let val = params[key] || "";
          values.push(val);
        });
        let values_quchong = [...new Set(values)];
        //console.log("去重后的参数值", key, values_quchong);
        if (values_quchong.length == 1) {
          //属性值相同
          field.isSame = 1;
        } else {
          field.isSame = 0;
        }

        field.values = values;

        // 添加分组信息
        let group_item = {
          params_key: field.field_title,
          params_title: field.title,
          params_values: values,
          isSame: field.isSame,
        };
        group_info.push(group_item);
      });

      //console.log("对比产品按参数分组 group_info", group_info);

      this.group_info = group_info;
      this.hideLoading();
    },

    //处理产品图片
    handleProductImage(image_list) {
      //处理产品图片
      // //console.log("产品列表数据 image_list", image_list);
      var promise_arr = [];
      image_list.forEach((src, index) => {
        var promise = this.loadImageAsync(src);
        promise_arr.push(promise);
      });
      Promise.all(promise_arr).then((resAll) => {
        // //console.log("图片全部加载完成 resAll", resAll);

        //设置产品图片
        this.product_list.forEach((v, index) => {
          if (!resAll[index]) {
            v.img = v.default_img;
          }
        });
      });
      //产品图片处理完成
    },

    //加载图片
    loadImageAsync(url) {
      return new Promise(function (resolve, reject) {
        const image = new Image();

        image.onload = function () {
          resolve(url);
        };

        image.onerror = function () {
          // reject(new Error("Could not load image at " + url));
          resolve("");
        };

        image.src = url;
      });
    },
  },
};
</script>

<style scoped lang="less">
//隐藏相同项目
.open-hide-same {
  .same {
    display: none !important;
  }
}

// 高亮不同项目
.open-hight-light-diff {
  .diff {
    background: #e6a23c;
  }
}

.page-top {
  position: relative;
  padding-top: 150px;
  .page-top-banner {
    img {
      width: 100%;
    }
  }

  .page-bread {
    width: @width;
    margin: 0 auto;
    height: 44px;
    background: #f5f5f5;
    padding: 0 15px;

    .bread-box {
      height: 44px;
      display: flex;
      align-items: center;

      img {
        width: 15px;
        margin-right: 10px;
      }

      .bread-divider {
        margin: 0 10px;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }

      a {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;

        &:hover {
          color: @theme;
        }
      }
    }
  }
}

.page {
  padding-top: 32px;

  .page-box {
    background: #f7f7f7;
    background: #fff;
  }

  .page-inner {
    width: @width;
    margin: 0 auto;
    padding: 20px 0;
    padding-bottom: 80px;
    text-align: left;

    .page-block {
      width: @width;
      margin: 0 auto;
    }
  }
}

.total-box {
  margin-bottom: 32px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 24px;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}

.ctx-box {
  display: flex;
  align-items: flex-start;

  // min-height: 470px;
  background: #ffffff;
  border-radius: 0px 0px 0px 0px;
  border: 1px solid #d5d8de;

  .ctx-left {
    width: 155px;
    height: 470px;
    height: auto;
    background: #f5f5f5;

    .filter-item {
      background: #f5f5f5;
      border-top: 1px solid #d5d8de;
      // line-height: 50px;
      text-align: left;
      padding: 0 20px;

      .text {
        line-height: 50px;
        font-size: 14px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #666666;
      }
    }

    .filter-actions {
      border-top: none;
      height: 320px;

      padding-top: 100px;
    }

    .checks {
      .check-item {
        margin-bottom: 13px;
        .flex();
        cursor: pointer;
        user-select: none;

        .check-0 {
          display: block;
        }

        .check-1 {
          display: none;
        }

        &.checked {
          .check-0 {
            display: none;
          }

          .check-1 {
            display: block;
          }
        }

        img {
          width: 13px;
          margin-right: 10px;
        }

        span {
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #666666;
        }
      }
    }
  }

  .ctx-right {
    // flex: 1;
    width: calc(100% - 155px);

    .product-list {
      width: 100%;
      display: flex;

      .product-item {
        flex: 1;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #666666;
        border-left: 1px solid #d5d8de;
        text-align: center;

        .top-box {
          height: 320px;

          a {
            .line-2();
            font-size: 14px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #666666;

            &:hover {
              color: @theme;
            }
          }

          .img-box {
            padding: 10px;

            .img-link {
              display: block;
            }

            img {
              width: 180px;
              height: 180px;
            }
          }

          .title {
            margin: 10px 0;
          }

          .number {
          }
        }

        .info-item {
          border-top: 1px solid #d5d8de;
          // min-height: 50px;
          // line-height: 1.5;
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #666666;

          .text {
            min-height: 50px;
            .flex-center();
          }
        }
      }
    }
  }
}

.ctx-table-box {
  min-height: 400px;
  img {
    max-width: 150px;
  }

  .filter-actions {
    border-top: none;
    height: 320px;

    padding-top: 100px;

    .filter-text {
      margin-bottom: 20px;
    }
  }

  .checks {
    .check-item {
      margin-bottom: 13px;
      .flex();
      cursor: pointer;
      user-select: none;

      .check-0 {
        display: block;
      }

      .check-1 {
        display: none;
      }

      &.checked {
        .check-0 {
          display: none;
        }

        .check-1 {
          display: block;
        }
      }

      img {
        width: 13px;
        margin-right: 10px;
      }

      span {
        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #666666;
      }
    }
  }

  table {
    margin-top: 30px;
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;

    thead {
    }

    tbody {
    }

    tr {
    }

    td {
      border: 1px solid #d5d8de;

      &:first-child {
        background: #f5f5f5;
        padding-left: 20px;
        text-align: left;
        width: 10%;

        .text-box {
          justify-content: flex-start;
          font-weight: bold;
          text-align: left;
        }
      }

      &.td-1 {
        width: 90%;
      }

      &.td-2 {
        width: 45%;
      }

      &.td-3 {
        width: 30%;
      }

      &.td-4 {
        width: 22.5%;
      }

      &.td-5 {
        width: 18%;
      }

      .text-box {
        min-height: 50px;
        padding: 0 10px;
        .flex-center();
        word-break: break-all;
        text-align: center;
      }

      .top-box {
        height: 320px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        a {
          .line-2();
          text-align: center;
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #666666;

          &:hover {
            color: @theme;
          }
        }

        .img-box {
          padding: 10px;

          .img-link {
            display: block;
          }

          img {
            width: 180px;
            height: 180px;
          }
        }

        .title {
          margin: 10px 0;
        }

        .number {
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/productComparison.less"></style>
