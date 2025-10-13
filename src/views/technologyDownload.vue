<template>
  <div class="page-wrap">
    <pageTechInner />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "page-tech",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState([""]),
  },
  watch: {},

  // beforeRouteUpdate(to, from, next) {
  //   //console.log("组件复用 from", from);
  //   //console.log("组件复用 to", to);

  //   next({
  //     query: to.query,
  //   });

  //   this.setView();
  // },

  created() {},

  methods: {},
};
</script>


<style scoped lang="less"></style>
