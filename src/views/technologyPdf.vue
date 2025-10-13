<template>
  <div class="page">
    <div class="section">
      <div class="pdf-box">
        <iframe :src="iframeSrc" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import pdf from "vue-pdf";

import { Loading } from "element-ui";

import { mapState } from "vuex";

export default {
  name: "product-duibi",
  components: {
    pdf,
  },
  data() {
    return {
      Loading,
      loadingInstance: null,
      id: this.$route.params.id,
      pdfSrc: "",

      iframeSrc: "",
    };
  },
  computed: {
    ...mapState([""]),
  },

  created() {
    this.setView();
  },

  methods: {
    password: function (updatePassword, reason) {
      updatePassword(prompt('password is "test"'));
    },
    error: function (err) {
      //console.log(err);
    },

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
      // this.showLoading();

      let title = this.$route.query.title || "";
      this.pdfSrc = this.$route.query.src || "";
      this.iframeSrc = `/web/viewer.html?file=${this.pdfSrc}`;
      // this.iframeSrc = `/web/viewer.html?file=http://web.bio-swamp.com/demo.pdf`;
      // this.iframeSrc = `/web/viewer.html?file=https://bio-swamp.oss-cn-nanjing.aliyuncs.com/888/888_2023032115543956815.pdf`;

      document.title = document.title + "-" + title;
      // this.hideLoading();
    },
  },
};
</script>

<style scoped lang="less">
.pdf-box {
  width: 100%;
  // height: 40vh;
  // overflow: auto;

  iframe {
    width: 100%;
    height: 100vh;
    // height: 40vh;
    overflow: auto;
  }
}

// .iframe-box {
//   iframe {
//     width: 100%;
//     height: 40vh;
//     overflow: auto;
//   }
// }

.section {
  // border: 2px solid #000;
  width: 100%;
  margin: 0 auto;
}
</style>
