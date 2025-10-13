<template>
  <div class="page">
    <iframe class="media-pdf" :src="detail.book_url" type=""></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "goods-detail",
  components: {},
  data() {
    return {
      is_prod: process.env.NODE_ENV == "production",
      detail: {},
    };
  },

  computed: {
    ...mapState(["kefu_qq"]),
  },

  created() {
    this.setView();
  },

  methods: {
    setView() {
      this.$api("product_detail", { inventoryId: this.$route.params.id }).then((res) => {
        //console.log("商品详情", res);
        let { code, data, message } = res;

        if (code == 1) {
          this.curr = data;
          this.detail = data;
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.media-pdf {
  width: 100%;
  height: 100%;
}
</style>
