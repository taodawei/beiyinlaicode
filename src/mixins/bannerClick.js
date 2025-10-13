
//banner 时间  混入
export default {
  name: "mixin-banner",
  components: {},

  data() {
    return {
      activeBannerIndex: 0,
    };
  },

  methods: {
    change_banner(index_curr, index_prev) {
      this.activeBannerIndex = index_curr;
    },

    onClickBanner(list_banner) {
      let item = list_banner[this.activeBannerIndex];
      //console.log("点击幻灯片", this.activeBannerIndex);
      //console.log({ ...item });
      if (item.url) {
        this.jump_link(item.url);
      }
    },


    //自定义 banner跳转
    jump_link(url) {
      window.open(url, "_blank");
    },
  },
};
