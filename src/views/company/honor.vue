<template>
  <div class="page">
    <pageCompanyTop :pageOpt="pageOpt" />
    <div class="inner">
      <h1 class="section-ctx-title">资质荣誉</h1>

      <div class="section-1">
        <div class="img-list">
          <div class="img-item" v-for="(item, index) in opt_honor_images" :key="index">
            <el-image  :src="item.image" :preview-src-list="srcList"> </el-image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "index",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["opt_honor_images"]),
    srcList() {
      return this.opt_honor_images.map((v) => v.image);
    },

    pageOpt() {
      let opt = {
        banner: "",
        list_bread: [
          {
            title: "资质荣誉",
            route: "",
          },
        ],
      };

      return opt;
    },
  },

  watch: {},

  created() {
    this.setView();
  },

  methods: {
    setView() {},
  },
};
</script>

<style scoped lang="less">
.page {
  .inner {
    padding-top: 80px;
    padding-bottom: 70px;
  }
}

.section-ctx-title {
  margin-bottom: 35px;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 24px;
  color: #000000;
}

.section-1 {
  width: 1400px;
  margin: 0 auto;
  text-align: left;

  .img-list {
    .flex();
    flex-wrap: wrap;

    .img-item {
      margin-right: 26.6666px;
      margin-bottom: 15px;
      width: 330px;
      height: auto;

      &:nth-child(4n) {
        margin-right: 0;
      }

      .el-image {
        width: 100% !important;
        height: auto !important;
      }
    }
  }
}
</style>
