<template>
  <div class="page">
    <pageAboutTop />

    <div class="page-inner">
      <div class="detail-title">{{ detail.title || $route.meta.title }}</div>
      <div class="detail-title-line"></div>
      <div class="detail-content">
        <div class="detail-rich" v-html="detail.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "create-order",
  components: {},
  data() {
    return {
      detail: {},
    };
  },
  computed: {
    ...mapState([""]),
  },
  watch: {
    $route(curr, prev) {
      this.setView();
    },
  },

  created() {
    this.setView();
  },
  methods: {
    setView() {
      let id_map = {
        companyProfile: "84", //公司简介
        companyServiceNet: "93", //服务网络
        companyAdvantages: "94", //企业优势
        companyCulture: "95", //企业文化
        companyHistory: "96", //发展历程
      };
      let id = id_map[this.$route.name];
      this.$api("index_newsDetail", {
        id: id,
      }).then((res) => {
        this.detail = res.data.info;
      });
    },
  },
};
</script>

<style scoped lang="less">
.page {
  .page-inner {
    width: @width;
    margin: 0 auto;
    padding: 80px 0;

    .detail-title {
      font-size: 36px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;
    }

    .detail-title-line {
      width: 80px;
      margin: 24px auto;
      height: 5px;
      background: #ea3200;
      border-radius: 3px 3px 3px 3px;
    }

    .detail-content {
      margin-top: 40px;
      text-align: left;
      min-height: 50vh;
      font-size: 16px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      line-height: 40px;
      // text-indent: 2em;

      .detail-rich {
        /deep/ img {
          max-width: 100%;
          display: block;
          margin: 10px auto;
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/zujian/pageAboutInner.less"></style>
