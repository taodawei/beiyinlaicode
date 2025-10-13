<template>
  <div class="page-box">
    <pageAboutInner />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "about-companyProfile",
  components: {},
  data() {
    return {
      detail: {},
    };
  },
  computed: {
    ...mapState([""]),
  },
  watch: {},

  created() {
  
  },
  methods: {
  
  },
};
</script>


<style scoped lang="less">

</style>
