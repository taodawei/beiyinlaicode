<template>
  <div class="page" :class="'temp-' + templateId">
    <div class="logo-box">
      <!-- <img src="@img/logo.png" /> -->
      <img :src="webConfig.com_logo" />
    </div>
    <div class="toggle-lang-box">
      <el-select v-model="selectVersion" placeholder="">
        <el-option
          v-for="item in options_version"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>

    <template v-if="templateId">
      <!-- v-if="templateId == 3 || templateId == 1" -->

      <!-- 试剂盒模板 -->
      <template v-if="templateId == '试剂盒 中文版' || templateId == '试剂盒 英文版'">
        <!-- 模板1  试剂盒 中文版 -->
        <elisa_zh
          :detail="detail"
          :product_poster="product_poster"
          v-if="templateId == '试剂盒 中文版'"
        />
        <!-- 模板3  试剂盒 英文版 -->
        <elisa_en
          :detail="detail"
          :product_poster="product_poster"
          v-if="templateId == '试剂盒 英文版'"
        />
      </template>
      <!-- 试剂盒模板 -->

      <!-- 抗体模板 -->
      <template v-if="templateId == '抗体 中文版' || templateId == '抗体 英文版'">
        <!-- 模板2  抗体 中文版 未提供 -->
        <kangti_zh
          :detail="detail"
          :images="images"
          :texts="texts"
          v-if="templateId == '抗体 中文版'"
        />

        <!-- 模板2  抗体 英文版 -->
        <kangti_en
          :detail="detail"
          :images="images"
          :texts="texts"
          v-if="templateId == '抗体 英文版'"
        />
      </template>

      <!-- 抗体模板 -->

      <!-- 重组蛋白模板 start -->
      <template v-if="templateId == '重组蛋白 中文版' || templateId == '重组蛋白 英文版'">
        <danbai_zh
          :detail="detail"
          :images="images"
          :texts="texts"
          v-if="templateId == '重组蛋白 中文版'"
        />

        <!-- 模板2  抗体 英文版 -->
        <danbai_en
          :detail="detail"
          :images="images"
          :texts="texts"
          v-if="templateId == '重组蛋白 英文版'"
        />
      </template>

      <!-- 重组蛋白模板 end -->
    </template>
    <template v-else>
      <el-empty description="没有查询到相关信息..."></el-empty>
    </template>
  </div>
</template>

<script>
let temp_map = {
  //
  elisa_zh: "试剂盒 中文",
  elisa_en: "试剂盒 英文",
  //
  kangti_zh: "抗体 中文",
  kangti_en: "抗体 英文",
};

import elisa_zh from "@/components/templates/elisa_zh"; //模板1  试剂盒 中文版  已提供
import elisa_en from "@/components/templates/elisa_en"; //模板3  试剂盒 英文版 已提供

import kangti_en from "@/components/templates/kangti_en"; //模板2  抗体 英文版 已提供
import kangti_zh from "@/components/templates/kangti_zh"; //模板4  抗体 中文版 未提供

import danbai_en from "@/components/templates/danbai_en"; //模板5  重组蛋白 英文版 已提供
import danbai_zh from "@/components/templates/danbai_zh"; //模板6  重组蛋白 中文版 已提供

import { Loading } from "element-ui";
import { mapState } from "vuex";

export default {
  name: "product-duibi",
  components: {
    elisa_zh,
    elisa_en,

    kangti_en,
    kangti_zh,

    danbai_en,
    danbai_zh,
  },
  data() {
    return {
      Loading,
      loadingInstance: null,

      selectVersion: "en",
      id: this.$route.query.id, //产品id
      ggid: this.$route.query.ggid || "", //规格id

      templateId: "", //说明书类型

      detail: [],
      images: [],
      texts: [],
      templateMap: {
        1: "模板1",
        2: "模板2",
        3: "模板3",
        4: "模板4",
      },

      resAll: [],

      // is_test: true,
      is_test: false,
      has_zh_txt: true, //当前分类是否有中文说明书

      has_query_detail: false, //
      product_poster: "",
    };
  },
  computed: {
    ...mapState([""]),

    options_version() {
      let options_version = [
        {
          id: "zh", //试剂盒中文版
          title: "中文",
          hide: !this.has_zh_txt,
        },
        {
          id: "en", // 试剂盒英文版
          title: "English",
        },
      ];

      return options_version.filter((v) => !v.hide);
    },
  },
  watch: {
    selectVersion(val) {
      if (val == "zh") {
        // this.templateId = 1;
      } else if (val == "en") {
        // this.templateId = 3;
      }

      this.setData(val);
    },
  },

  beforeRouteUpdate(to, from, next) {
    //console.log("组件复用 from", from);
    //console.log("组件复用 to", to);

    next({
      query: to.query,
    });

    this.setView();
  },
  created() {
    this.setView();
  },
  mounted() {
    this.setPrintWidth();
  },
  methods: {
    setPrintWidth() {},

    showLoading() {
      this.loadingInstance = Loading.service({
        lock: true,
        text: "数据查询中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      // setTimeout(() => {
      // this.loadingInstance.close();
      // }, 2000);
    },
    hideLoading() {
      this.loadingInstance.close();
    },

    setView() {
      this.showLoading();

      this.images = [];
      this.texts = [];
      this.detail = [];

      this.queryDetail();
    },

    async queryDetail() {
      let promise_en = this.$api("brand_book", {
        productId: this.$route.params.id,
        type: 0, //0 英文 1 中文
      });

      let promise_zh = this.$api("brand_book", {
        productId: this.$route.params.id,
        type: 1, //0 英文 1 中文
      });

      let resAll = await Promise.all([promise_en, promise_zh]);
      let res_en = resAll[0];
      let res_zh = resAll[1];

      this.resAll = resAll;

      //console.log("英文版说明书 res_en", res_en);
      //console.log("中文版说明书 res_zh", res_zh);

      this.hideLoading();

      this.setData();
    },

    setData(lang) {
      let resAll = this.resAll;

      let res_en = resAll[0];
      let res_zh = resAll[1];

      if (res_en.code != 1 && res_zh.code != 1) {
        alertErr("未上传产品说明书");
        this.detail = {};
        this.templateId = "";
        return;
      }

      //设置说明书默认为英文说明书
      if (!lang || lang == "en") {
        let res = res_en;
        if (res && res.code == 1) {
          this.selectVersion = "en";
          let data = res.data;
          let { templateId, images, info } = data;

          this.templateId = templateId;

          //没有中文文档 先展示英文文档
          if (res.code == 1) {
            if (info) {
              this.detail = info.content || [];
            }
            if (images) {
              this.images = images || [];
            }

            let module_name = this.templateId.split(" ")[0];
            console.log("module_name", module_name);

            if (module_name == "抗体") {
              this.texts = (this.detail[17] || "").split("|"); //抗体需要
              this.has_zh_txt = false;
            } else if (module_name == "重组蛋白") {
              this.texts = (this.detail[12] || "").split("|"); //抗体需要
            } else if (module_name == "试剂盒") {
              this.queryGoodsDetail();
            }
          }

          // // 测试用
          // if (this.is_test) {
          //   // this.templateId = "danbai_zh";
          //   this.templateId = "danbai_en";
          // }
        } else {
          alertErr("未上传产品英文说明书");
        }
      } else if (lang == "zh") {
        let res = res_zh;
        if (res && res.code == 1) {
          this.selectVersion = "zh";
          let data = res.data;
          let { templateId, images, info } = data;

          this.templateId = templateId;

          //没有中文文档 先展示英文文档
          if (res.code == 1) {
            if (info) {
              this.detail = info.content || [];
            }
            if (images) {
              this.images = images || [];
            }

            let module_name = this.templateId.split(" ")[0];
            console.log("module_name", module_name);

            if (module_name == "抗体") {
              this.texts = (this.detail[17] || "").split("|"); //抗体需要
              this.has_zh_txt = false;
            } else if (module_name == "重组蛋白") {
              this.texts = (this.detail[12] || "").split("|"); //抗体需要
            } else if (module_name == "试剂盒") {
              this.queryGoodsDetail();
            }
          }

          // // 测试用
          // if (this.is_test) {
          //   // this.templateId = "danbai_zh";
          //   this.templateId = "danbai_en";
          // }
        } else {
          alertErr("未上传产品中文说明书");
          this.selectVersion = "en";
        }
      }
    },

    queryGoodsDetail() {
      console.log("产品详情查询");
      if (this.has_query_detail) {
        return;
      }

      this.has_query_detail = true;
      this.$api("product_detail", { inventoryId: this.ggid }).then((res) => {
        console.log("商品详情", res);

        if (res.code == 1) {
          if (res.data.images) {
            let poster = res.data.images[0] || "";
            if (
              poster ==
              "https://bio-swamp.oss-cn-nanjing.aliyuncs.com/888/888_2023021609571281603.jpg"
            ) {
              poster = "";
            }

            this.product_poster = poster;
          }
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.logo-box {
  position: absolute;
  right: 30px;
  top: 30px;

  img {
    // width: 220px;
    height: 3.5rem;
    height: 5rem;
  }
}

@media print {
  .toggle-lang-box {
    display: none;
  }
  .logo-box {
    img {
      // width: 220px;
      height: 5rem;
    }
  }
}

.toggle-lang-box {
  position: absolute;
  right: 30px;
  top: 30px;
  top: 8rem;
  top: 10rem;
}
.page {
  position: relative;
  min-height: 50vh;
  text-align: left;
  line-height: 2.3;
  padding: 20px;
  width: 210mm;
  margin: 0 auto;

  .page-box {
    background: #f7f7f7;
    background: #fff;
  }
  .page-inner {
    width: @width;
    margin: 0 auto;
    padding: 32px 0;
    padding-bottom: 80px;
    text-align: left;
  }
}

.page-title {
  .flex-between();

  .text {
    padding-right: 50px;
    font-size: 20px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #333333;
  }
  .right {
  }
}

/deep/ .huohao {
  margin-top: 2rem;
}
.divider {
  margin: 20px auto;
  background: #ccc;
  height: 1px;
}
.ctx-box {
}

.zhaiyao-box {
  margin-bottom: 43px;
  font-size: 14px;
  font-family: Microsoft YaHei-Bold, Microsoft YaHei;
  font-weight: bold;
  color: #333333;
  line-height: 32px;

  ul {
  }
  li {
    .flex();
    position: relative;
    &::before {
      content: "";
      position: absolute;
      display: inline-block;
      width: 8px;
      height: 8px;
      margin-right: 10px;
      background: #333333;
      border-radius: 50%;
      line-height: 2.3;
      // top: 50%;
      top: 0.8rem;
      left: 0;
      // margin-top: .5rem;

      // transform: translate(0, -50%);
    }
  }
}
.section-title {
  margin-bottom: 22px;
  font-size: 16px;
  font-family: Microsoft YaHei-Bold, Microsoft YaHei;
  font-weight: bold;
  color: #ea3200;
}
.section-desc {
  padding-bottom: 48px;
  margin-bottom: 48px;
  border-bottom: 1px dashed #afafaf;
  font-size: 14px;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  line-height: 32px;
}

.w-table {
  width: 100%;
  table-layout: fixed;
  border-spacing: 0;
  border: none;
  tr:first-child{
    background: #ddd;
  }
  tr {
    td,
    th {
      min-height: 48px;
      height: 48px;
      border: 1px solid #afafaf;
      border-right: none;
      border-bottom: none;
      padding-left: 2em;
    }

    td:last-child,
    th:last-child {
      border-right: 1px solid #afafaf;
    }
  }

  tr:last-child {
    td {
      border-bottom: 1px solid #afafaf;
    }
  }
}
</style>

<style
  scoped
  lang="less"
  src="@/assets/h5css/templates/productSpecification.less"
></style>
