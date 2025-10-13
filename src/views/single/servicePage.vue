<template>
  <div class="page">
    <div class="inner">
      <!-- <div class="title">{{curr.title}}</div> -->
      <div class="detail-content" v-html="curr.content"></div>
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
      curr: {},
    };
  },
  computed: {
    ...mapState([""]),
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
    this.setView();
  },
  methods: {
    setView() {
      this.$api("index_newsDetail", {
        id: this.$route.query.id,
      }).then((res) => {
        //console.log("index_newsDetail", res);
        let { code, data } = res;
        if (code == 1) {
          this.curr = data;
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

  .inner {
    width: @width;
    margin: 0 auto;
    padding: 20px 0 80px;

    .title {
      font-size: 16px;
    }
    .detail-content {
      margin-top: 20px;
      text-align: left;
      min-height: 50vh;

      /deep/ img {
        max-width: 100%;
        display: block;
        margin: 0 auto;
      }
    }
  }
}
</style>
