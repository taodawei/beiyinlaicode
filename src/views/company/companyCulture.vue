<template>
  <div class="page">
    <pageCompanyTop :pageOpt="pageOpt" />
    <div class="inner">
      <h1 class="section-ctx-title">企业文化</h1>

      <div class="section-1">
        <div class="company-desc" v-html="detail.content">
          <!-- <p class="company-desc-p">“和”文化是中国文化— —中庸文化的精髓与核心。“和”文化使古老的中华文明得以炳耀千秋，万邦朝贺。纵观历史，和则邦兴反之邦则衰。因此先人们时刻告诫我们：“家和万事兴、人和万事顺”。</p>
          <p class="company-desc-p">我们是中华文明的传承与发扬者，我们身处日新月异的现代社会，每天都在创造奇迹，每天都在刷新记录，但是“和”文化作为我们的指导思想和我们的智慧源泉却始终没有改变。有“和”就有文明奇迹，没有“和”社会就要停滞甚至倒退，文明就要枯竭。</p>
          <p class="company-desc-p">“和”是我们的灵魂也是我们立世发展的根。</p>
          <p class="company-desc-p">让我们和睦相处、和谐共赢、人生美满，事业欣旺！</p> -->
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
    return {
      detail: {}
    };
  },
  computed: {
    ...mapState(["newsDetail"]),
    pageOpt() {
      let opt = {
        banner: "",

        list_bread: [
          {
            title: '企业文化',
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
        id: 8,
      }).then((res) => {
        //console.log('公司介绍',  res)
        let { code,data } = res;
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

  .company-desc {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 32px;
    color: #333333;

    /deep/ .company-desc-p {
      margin-bottom: 22px;
    }
  }
}
</style>
