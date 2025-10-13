<template>
  <div class="page">
    <pageCompanyTop :pageOpt="pageOpt" />
    <div class="inner">
      <h1 class="section-ctx-title">胆汁酸介绍</h1>

      <div class="section-1" v-html="detail.content">
        <!-- <p>
          <img src="https://omo-oss-image.site.cn/shop/NEW2022030414350760133/cms/image/967d614a-f226-4438-adeb-41e6c3ff6d1b.jpg" style="max-width: 100%" /><img src="https://omo-oss-image.site.cn/shop/NEW2022030414350760133/cms/image/6f19c79f-ef4d-46a2-808e-e07e5c8e22e7.jpg" style="max-width: 100%" /><img src="https://omo-oss-image.site.cn/shop/NEW2022030414350760133/cms/image/5f45f1bf-4607-421b-8efd-f1027bc74efc.jpg" style="max-width: 100%" /><img src="https://omo-oss-image.site.cn/shop/NEW2022030414350760133/cms/image/4f4288d2-5e52-4bee-972b-a0fd2ea895eb.jpg" style="max-width: 100%" /><img src="https://omo-oss-image.site.cn/shop/NEW2022030414350760133/cms/image/85fbc142-46d4-40fb-b89d-dfba3d9fefa8.jpg" style="max-width: 100%" /><img src="https://omo-oss-image.site.cn/shop/NEW2022030414350760133/cms/image/a9a38301-9e7b-485b-bc42-0930596aed6b.jpg" style="max-width: 100%" /><img
            src="https://omo-oss-image.site.cn/shop/NEW2022030414350760133/cms/image/eb22cc74-fe76-45f3-8c06-1ee2c65ad53d.jpg"
            style="max-width: 100%"
          /><img src="https://omo-oss-image.site.cn/shop/NEW2022030414350760133/cms/image/0e2aa337-a356-4ba4-ade0-1248b4968553.jpg" style="max-width: 100%" /><img src="https://omo-oss-image.site.cn/shop/NEW2022030414350760133/cms/image/9fc388b4-755c-4c7c-bc96-362123914173.jpg" style="max-width: 100%" /><img src="https://omo-oss-image.site.cn/shop/NEW2022030414350760133/cms/image/9f904dd0-e08e-449d-b792-0e3d15f17f59.jpg" style="max-width: 100%" /><img src="https://omo-oss-image.site.cn/shop/NEW2022030414350760133/cms/image/a73f911e-9321-496e-a4e3-aca80d8b04c0.jpg" style="max-width: 100%" /><img src="https://omo-oss-image.site.cn/shop/NEW2022030414350760133/cms/image/14934314-19d8-468c-8021-570c15e66dd6.jpg" style="max-width: 100%" /><img src="https://omo-oss-image.site.cn/shop/NEW2022030414350760133/cms/image/b3115bed-41fc-4064-a194-18cf86d210f2.jpg" style="max-width: 100%" />
        </p> -->
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
    return {
      detail: {},
    };
  },
  computed: {
    ...mapState(["newsDetail"]),
    pageOpt() {
      let opt = {
        banner: "",
        list_bread: [
          {
            title: "胆汁酸介绍",
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
    setView() {
      //公司介绍
      this.$api("index_newsDetail", {
        id: 9,
      }).then((res) => {
        //console.log("产品", res);
        let { code, data } = res;
        if (code == 1) {
          this.detail = data.info;
        }
      });
    },
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
  width: 1300px;
  margin: 0 auto;
  text-align: left;

  /deep/ img {
    max-width: 100%;
    vertical-align: bottom;
  }
}
</style>
