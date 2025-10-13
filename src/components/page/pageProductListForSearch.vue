<template>
  <div class="product-box">
    <div class="product-inner" v-if="apiCompleted">
      <!-- 卡片形式的展示形式 v-if="!isViewProductTable" -->
      <div class="card-wrap" v-if="!isViewProductTable">
        <div class="product-list">
          <div class="product-item" v-for="(item, index) in product_list" :key="index">
            <div class="product-left">
              <router-link :to="'/goodsDetail/' + item.inventoryId" class="title">
                {{ item.title }}
              </router-link>

              <div class="shuoming">
                <router-link
                  v-if="+item.paper_num"
                  :to="'/goodsDetail/' + item.inventoryId + '?item=3'"
                  class="shuoming-item"
                >
                  <img src="@img/wenxian.png" alt="" />
                  <span> 文献引用（{{ item.paper_num }}） </span>
                </router-link>

                <template v-if="is_prod">
                  <a
                    target="_blank"
                    :href="
                      item.book_url
                        ? '/productSpecificationPdf/' + item.inventoryId
                        : '/productSpecification/' + item.id + '?ggid=' + item.inventoryId
                    "
                    class="shuoming-item"
                  >
                    <img src="@img/pdf.png" alt="" />
                    <span> 说明书 </span>
                  </a>
                </template>

                <template v-else>
                  <router-link
                    :to="
                      item.book_url
                        ? '/productSpecificationPdf/' + item.inventoryId
                        : '/productSpecification/' + item.id + '?ggid=' + item.inventoryId
                    "
                    class="shuoming-item"
                  >
                    <img src="@img/pdf.png" alt="" />
                    <span> 说明书 </span>
                  </router-link>
                </template>
              </div>
              <div class="text-box">
                <div class="label">货号：</div>
                <div class="val">
                  <router-link :to="'/goodsDetail/' + item.inventoryId">
                    {{ item.skuId }}
                  </router-link>
                </div>
              </div>

              <div class="loop-tags">
                <div
                  class="text-box"
                  v-for="(field, field_index) in field_list"
                  :key="field_index"
                  :data-col="field.field_title"
                >
                  <div class="label">{{ field.title }}：</div>
                  <div class="val">
                    {{ getParamsValue(item, field) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="product-right">
              <div class="img-box">
                <!-- <img :src="item.img" alt="" /> -->

                <el-image :src="item.img">
                  <div slot="error" class="image-slot">
                    <img :src="item.default_img" />
                  </div>
                </el-image>
              </div>

              <!-- 不是仪器的产品允许对比 -->
              <!-- <div
                v-if="!item.is_yiqi && $route.query.id"
                class="duibi-box"
                :class="{ checked: item.checked }"
                @click="productToggleCheck(item)"
              >
                <img src="@img/check-0.png" alt="" class="check-0" />
                <img src="@img/check-1.png" alt="" class="check-1" />
                <span> 加入对比（最多5个） </span>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <!-- 表格形式数据 -->
      <!-- v-if="isViewProductTable" -->
      <div class="info-list" v-else>
        <div class="info-list-inner">
          <!-- 货号，名称，同义词，基因ID，应用 -->
          <div class="info-item title-item">
            <div class="item">货号</div>
            <div class="item">名称</div>
            <div class="item">规格</div>
            <div class="item">价格</div>
            <!-- <div class="item">同义词</div>
          <div class="item">基因ID</div>
          <div class="item">应用</div> -->
            <!-- 其他属性参数 -->
            <!-- <div class="item" v-for="(field, field_index) in field_list" :key="field_index">
            {{ field.title }}
          </div> -->
          </div>
          <div class="info-item" v-for="(item, index) in product_list" :key="index">
            <div class="item">
              <router-link :to="item.route">
                <div v-html="item.html_skuId"></div>
              </router-link>
            </div>
            <div class="item">
              <router-link :to="item.route">
                <div v-html="item.html_title"></div>
              </router-link>
            </div>
            <div class="item">
              <div v-html="item.key_vals"></div>
            </div>
            <div class="item">
              <div>￥{{ +item.price_sale }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination-box" style="margin-top: 40px">
        <el-pagination
          background
          layout="total,prev, pager, next"
          :total="count"
          :current-page="pagination.page"
          :page-size="pagination.pagenum"
          @current-change="handleChangePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";

import { mapState } from "vuex";

export default {
  props: ["activeCate"],
  data() {
    return {
      is_prod: process.env.NODE_ENV == "production",

      Loading,
      loadingInstance: null,

      show_fixed_compare: false,
      product_list: [],
      count: 0,
      pagination: {
        page: 1,
        pagenum: 10,
      },

      query_field_done: false,
      query_list_done: false,

      field_list: [], //当前分类产品列表需要展示的字段
      apiCompleted: false,

      product_images: [],

      params: {},
    };
  },
  computed: {
    ...mapState(["product_id_map"]),

    cate_title() {
      let title = "";
      if (this.activeCate && this.activeCate.title) {
        title = this.activeCate.title;
      }

      return title;
    },

    product_list_checked() {
      return this.product_list.filter((v) => v.checked);
    },
    checkedLength() {
      return this.product_list_checked.length;
    },

    //是否展示产品
    // showProduct() {
    //   return +this.pdt_max_num;
    // },

    //是否展示产品数据表格
    // isViewProductTable() {
    //   let ret = +this.pdt_max_num && +this.pdt_max_num < this.count;
    //   return ret;
    // },
    //是否展示产品数据表格
    isViewProductTable() {
      let ret = true;
      if (this.product_cates_all.length) {
        if (this.$route.query.id) {
          let cate = this.product_cates_all.find((v) => v.id == this.$route.query.id);
          //console.log("当前分类", { ...cate });

          if (cate) {
            if (cate.plistId == 1) {
              ret = false;
            }
          }
        }
      }
      return ret;
    },
  },

  watch: {
    $route(to, from) {
      //console.log("产品列表组件 to", to);
      //console.log("产品列表组件 from", from);

      this.queryCateParams();

      this.init();
      this.setView();
    },
  },

  created() {
    this.queryCateParams();
    this.setView();
  },
  methods: {
    init() {
      this.pagination.page = 1;
      this.params = {};
    },

    handleChangePage(page) {
      //console.log("page", page);
      this.pagination.page = page;

      this.setView();

      this.scrollToTarget(".top-info");
    },

    //滚动到指定位置
    scrollToTarget(clsName) {
      // var element = document.querySelector(".wenxian-box");
      var element = document.querySelector(clsName);
      element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    },

    getParamsValue(item, field) {
      let col = field.field_title;
      let params = item.param_info;
      let value = params && params[col];

      //特殊处理别名问题 使用字段为 synonym || another_name
      if (col == "synonym" || col == "another_name") {
        let value_1 = params["synonym"];
        let value_2 = params["another_name"];
        if (value_1 || value_2) {
          value = value_1 || value_2;
        }
      }

      if (value && typeof value == "object") {
        try {
          value = value.join();
        } catch (error) {}
      }

      if (!value) {
        value = "-";
      }

      return value;
    },

    showLoading() {
      // this.loadingInstance = Loading.service({
      //   lock: true,
      //   text: "数据查询中...",
      //   spinner: "el-icon-loading",
      //   background: "rgba(0, 0, 0, 0.7)",
      // });
      // setTimeout(() => {
      // this.loadingInstance.close();
      // }, 2000);
    },
    hideLoading() {
      // this.loadingInstance.close();
    },

    queryCateParams() {
      //产品分类页面
      if (this.$route.name == "productCates") {
        this.query_field_done = false;
        this.$api("product_getRow", {
          channel_id: this.$route.query.id || "",
        }).then((res) => {
          //console.log("获取当前分类产品的展示字段", res);

          let list = res.data;
          list.forEach((field) => {
            if (field.title == "基因id") {
              field.title = "基因ID";
            }
          });
          this.field_list = list;
          this.query_field_done = true;
          this.renderHtml();
        });
      } else if (this.$route.name == "productSearch" && this.$route.query.id) {
        this.query_field_done = false;
        this.$api("product_getRow", {
          channel_id: this.$route.query.id || "",
        }).then((res) => {
          //console.log("获取当前分类产品的展示字段", res);

          let list = res.data;
          list.forEach((field) => {
            if (field.title == "基因id") {
              field.title = "基因ID";
            }
          });
          this.field_list = list;
          this.query_field_done = true;
          this.renderHtml();
        });
      } else {
        this.query_field_done = true;
      }
    },

    reView(params) {
      this.pagination.page = 1;

      this.params = params;
      this.setView();
    },

    setView() {
      this.showLoading();

      this.apiCompleted = false;
      this.query_list_done = false;

      //研究领域筛选
      //产品类型 + 条件筛选
      this.$api("product_plistNew", {
        channel_id: this.$route.query.id || "",
        ...this.pagination,
        keyword: this.$route.query.keyword || "",
        ...this.params,
      }).then((res) => {
        this.hideLoading();

        let keyword = this.$route.query.keyword || "";

        res.data.forEach((v) => {
          v.checked = false;
          v.route = "/goodsDetail/" + v.inventoryId;
          if (v.is_sj) {
            if (!v.title) {
              var title = v.title;
              var title_en = v.param_info && v.param_info.english_name;
              v.title = title_en;
              v.param_info.chinese_name = title;
            }
          }

          var html_keyword = `<span class="highlight">${keyword}</span>`;
          if (keyword) {
            //1 货号
            v.html_skuId = v.skuId.replaceAll(keyword, html_keyword);

            //2 名称
            // let title = !v.is_yiqi ? v.title : this.product_id_map[v.channelId] ;
            let title = v.title;
            title = title || "";

            v.html_title = title.replaceAll(keyword, html_keyword);

            if (v.param_info) {
              let param_info = v.param_info;

              // 3 同义词
              let tongyici = param_info.another_name || param_info.synonym || "";
              v.html_tongyiqi = tongyici.replaceAll(keyword, html_keyword);

              // 4 基因ID
              let gene_id = param_info.gene_id || "";
              v.html_gene_id = gene_id.replaceAll(keyword, html_keyword);

              // 5 应用
              let application = param_info.application || "";
              v.html_application = application.replaceAll(keyword, html_keyword);
            }
          }
        });

        this.product_list = res.data;
        this.count = res.count;
        this.updateParentCount();
        //列表根据后台产品的多少，来控制使用哪一种列表形式，如果产品数量少用图文的，产品数量多 用表格的
        this.query_list_done = true;

        this.renderHtml();
      });
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

    renderHtml() {
      if (this.query_list_done && this.query_field_done) {
        // this.loading = true;
        this.apiCompleted = true;
      }
    },

    updateParentCount() {
      this.$parent.updateSelfCount(this.count);
    },

    toCompare() {
      if (this.product_list_checked.length < 2) {
        alertErr("请至少选择两个产品进行对比");
        return;
      }
      let cate_id = this.product_list_checked[0].channelId;
      // let ids = this.product_list_checked.map((v) => v.inventoryId).join(",");
      let ids = this.product_list_checked.map((v) => v.id).join(",");
      this.$router.push({
        path: "/productComparison",
        query: {
          id: this.$route.query.id || cate_id,
          ids: ids,
        },
      });
    },
    productToggleCheck(item) {
      //console.log("产品对比勾选", { ...item });

      if (this.checkedLength >= 5) {
        alertErr("最多可以选择5个产品进行比较");
        return;
      }

      item.checked = !item.checked;

      this.compareState();
    },

    compareState() {
      let hasCheck = this.product_list.some((v) => v.checked);
      if (hasCheck) {
        this.show_fixed_compare = true;
      } else {
        this.show_fixed_compare = false;
      }

      this.product_list.forEach((v) => {
        v.root_cate_id = this.$route.query.id;
      });

      let checkedList = this.product_list.filter((v) => v.checked);

      let comparison_list = JSON.stringify(checkedList);
      sessionStorage.setItem("comparison_list", comparison_list);
    },

    productRemove(item) {
      item.checked = false;
      this.compareState();
    },

    productReset() {
      this.product_list.forEach((v) => {
        v.checked = false;
      });
      this.compareState();
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .highlight {
  color: @theme;
}

// 信息列表
.info-list {
  .title-item {
    height: 50px;
    background: linear-gradient(180deg, #ea3200 0%, #fe6927 100%) !important;
    .item {
      font-size: 14px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold !important;
      color: #ffffff !important;
    }
  }
  .info-item {
    height: 48px;
    .flex();

    &:nth-child(2n + 1) {
      background: #f0f2f5;
    }

    .item {
      .line-2();
      flex: 1;
      text-align: center;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #666666;

      &:nth-child(1) {
        flex: 1;
      }
      &:nth-child(2) {
        flex: 3;
        // flex: 1;
      }
      &:nth-child(3) {
        flex: 1;
        flex: 0.5;
      }
      &:nth-child(4) {
        flex: 0.5;
        // flex: 1;
      }
      &:nth-child(5) {
        flex: 0.5;
        // flex: 1;
      }

      a {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #666666;

        &:hover {
          color: @theme;
        }
      }
    }
  }
}

// 商品表格展示列表

.product-list {
  // padding-top: 50px;
  padding-top: 0;
  .product-item {
    .flex-between();
    align-items: flex-start;
    margin-bottom: 24px;
    min-height: 288px;
    min-height: auto;
    background: #ffffff;
    border-radius: 0px 0px 0px 0px;
    border: 1px solid #e3e3e3;
    padding: 25px;

    &:hover {
      box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.16);
    }

    .product-left {
      .title {
        display: block;
        margin-bottom: 10px;
        font-size: 18px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #333333;

        &:hover {
          color: @theme;
        }
      }
      .biaoqian {
        img {
          height: 24px;
        }
      }
      .shuoming {
        margin: 10px 0;
        .flex();

        .shuoming-item {
          .flex();
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          cursor: pointer;
          font-size: 1.4rem;

          &:hover {
            color: @theme;
          }

          img {
            width: 16px;
            margin-right: 8px;
          }
        }
      }

      .tags {
        .flex();

        .tag {
          margin-right: 10px;
          text-align: center;
          width: 32px;
          height: 18px;
          line-height: 18px;
          background: #ea3200;
          border-radius: 3px 3px 3px 3px;

          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
        }
      }

      .text-box {
        .flex();
        align-items: flex-start;
        flex-wrap: nowrap;

        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #808080;
        line-height: 24px;

        font-size: 1.4rem;
        line-height: 1.6;

        .label {
          width: 55px;
          width: fit-content;
        }
        .val {
          flex: 1;
          a {
            font-size: 12px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #808080;

            font-size: 1.4rem;

            &:hover {
              color: @theme;
            }
          }
        }
      }
    }
    .product-right {
      .img-box {
        img {
          width: 184px;
          height: 184px;
          object-fit: contain;
        }

        /deep/ img {
          width: 184px;
          height: 184px;
          object-fit: contain;
        }
      }
      .duibi-box {
        margin-top: 20px;
        .flex-center();
        width: 184px;
        height: 40px;
        background: #f5f5f5;
        transition: 0.3s;
        cursor: pointer;
        &:hover {
          background: #ddd;
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

          &.check-0 {
            display: block;
          }
          &.check-1 {
            display: none;
          }
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
}
</style>

<style
  scoped
  lang="less"
  src="@/assets/h5css/zujian/pageProductListForSearch.less"
></style>
