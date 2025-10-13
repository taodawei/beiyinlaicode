<template>
  <div class="page">
    <div class="section">
      <!-- <h1>pdf.js</h1> -->
      <div class="pdf-box">
        <iframe :src="iframeSrc" frameborder="0"></iframe>
      </div>
    </div>

    <div class="section" v-if="false">
      <h1>iframe</h1>
      <div class="iframe-box">
        <iframe src="http://web.bio-swamp.com/demo.pdf" frameborder="0"></iframe>
        <!-- <iframe src="/demo.pdf" frameborder="0"></iframe> -->
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

      //

      show: true,
      pdfList: [
        "",
        "https://cdn.mozilla.net/pdfjs/tracemonkey.pdf",
        "https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/freeculture.pdf",
        "https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/annotation-link-text-popup.pdf",
        "https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/calrgb.pdf",
        "https://cdn.rawgit.com/sayanee/angularjs-pdf/68066e85/example/pdf/relativity.protected.pdf",
        "data:application/pdf;base64,JVBERi0xLjUKJbXtrvsKMyAwIG9iago8PCAvTGVuZ3RoIDQgMCBSCiAgIC9GaWx0ZXIgL0ZsYXRlRGVjb2RlCj4+CnN0cmVhbQp4nE2NuwoCQQxF+/mK+wMbk5lkHl+wIFislmIhPhYEi10Lf9/MVgZCAufmZAkMppJ6+ZLUuFWsM3ZXxvzpFNaMYjEriqpCtbZSBOsDzw0zjqPHZYtTrEmz4eto7/0K54t7GfegOGCBbBdDH3+y2zsMsVERc9SoRkXORqKGJupS6/9OmMIUfgypJL4KZW5kc3RyZWFtCmVuZG9iago0IDAgb2JqCiAgIDEzOAplbmRvYmoKMiAwIG9iago8PAogICAvRXh0R1N0YXRlIDw8CiAgICAgIC9hMCA8PCAvQ0EgMC42MTE5ODcgL2NhIDAuNjExOTg3ID4+CiAgICAgIC9hMSA8PCAvQ0EgMSAvY2EgMSA+PgogICA+Pgo+PgplbmRvYmoKNSAwIG9iago8PCAvVHlwZSAvUGFnZQogICAvUGFyZW50IDEgMCBSCiAgIC9NZWRpYUJveCBbIDAgMCA1OTUuMjc1NTc0IDg0MS44ODk3NzEgXQogICAvQ29udGVudHMgMyAwIFIKICAgL0dyb3VwIDw8CiAgICAgIC9UeXBlIC9Hcm91cAogICAgICAvUyAvVHJhbnNwYXJlbmN5CiAgICAgIC9DUyAvRGV2aWNlUkdCCiAgID4+CiAgIC9SZXNvdXJjZXMgMiAwIFIKPj4KZW5kb2JqCjEgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzCiAgIC9LaWRzIFsgNSAwIFIgXQogICAvQ291bnQgMQo+PgplbmRvYmoKNiAwIG9iago8PCAvQ3JlYXRvciAoY2Fpcm8gMS4xMS4yIChodHRwOi8vY2Fpcm9ncmFwaGljcy5vcmcpKQogICAvUHJvZHVjZXIgKGNhaXJvIDEuMTEuMiAoaHR0cDovL2NhaXJvZ3JhcGhpY3Mub3JnKSkKPj4KZW5kb2JqCjcgMCBvYmoKPDwgL1R5cGUgL0NhdGFsb2cKICAgL1BhZ2VzIDEgMCBSCj4+CmVuZG9iagp4cmVmCjAgOAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDA1ODAgMDAwMDAgbiAKMDAwMDAwMDI1MiAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAyMzAgMDAwMDAgbiAKMDAwMDAwMDM2NiAwMDAwMCBuIAowMDAwMDAwNjQ1IDAwMDAwIG4gCjAwMDAwMDA3NzIgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6ZSA4CiAgIC9Sb290IDcgMCBSCiAgIC9JbmZvIDYgMCBSCj4+CnN0YXJ0eHJlZgo4MjQKJSVFT0YK",
      ],
      src: "",
      loadedRatio: 0,
      page: 1,
      numPages: 0,
      rotate: 0,
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
      this.showLoading();

      this.$api("product_detail", { inventoryId: this.id }).then((res) => {
        let data = res.data;
        this.pdfSrc = data.book_url;
        //console.log("说明书 pdf", this.pdfSrc);

        // this.iframeSrc = `/web/viewer.html?file=http://web.bio-swamp.com/demo.pdf`;
        this.iframeSrc = `/web/viewer.html?file=${this.pdfSrc}`;
        // this.iframeSrc = `/web/viewer.html?file=https://bio-swamp.oss-cn-nanjing.aliyuncs.com/888/888_2023032115543956815.pdf`;

        document.title = document.title + "-" + data.skuId + "-" + data.title;
        this.hideLoading();
      });
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
