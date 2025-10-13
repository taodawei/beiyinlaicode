<template>
  <div class="page">
    <pageAboutTop />

    <div class="page-inner">
      <div class="detail-title">{{ curr.title || "公司简介" }}</div>
      <div class="detail-title-line"></div>
      <div class="detail-content">
        <p>
          武汉贝茵莱生物科技有限公司是专业提供科研用生物试剂、检测试剂盒、抗体等产品的供应商，公司坐落在武汉光谷国际生物医药企业加速器三期25栋四层。Bioswamp为贝茵莱公司定位国内中高端市场的试剂耗材品牌。公司按照国际标准，高品质要求，打造一个高性价比，通行全球的高端试剂盒、抗体产品。
        </p>

        <p>
          在生物医学的研究中，质量不仅是生产一个高一致性、高可靠性和高活性的产品，更是一种将科学研究的需求置于首位的思维习惯。在BioswampTM的生产总部，这种思维已渗透于我们的文化，从我们聘请的高级科学家，从我们的严格的产品生产和检测标准，从我们的产品被引用于优秀文献，和我们周围的热情生物医学研究环境都能够充分地展现出来。
        </p>

        <p>
          更重要的是，客户的反馈已被贯彻于产品研发、生产、质量的各个流程，以保证每一个产品都满足客户对于高质量的需求。这一切都是推动我
          们发展，传承这一精神，激励我们保持高质量生命科学试剂行业领头羊的动力。
        </p>

        <div class="img-box"></div>
      </div>
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
      // this.$api("index_newsDetail", {
      //   id: this.$route.query.id,
      // }).then((res) => {
      //   this.curr = res.data;
      // });
    },
  },
};
</script>

<style scoped lang="less">
.page {
  .page-inner {
    width: @width;
    margin: 0 auto;
    padding: 80px 0;

    .detail-title {
      font-size: 36px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;
    }

    .detail-title-line {
      width: 80px;
      margin: 24px auto;
      height: 5px;
      background: #ea3200;
      border-radius: 3px 3px 3px 3px;
    }

    .detail-content {
      margin-top: 40px;
      text-align: left;
      min-height: 50vh;

      font-size: 16px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      line-height: 40px;
      // text-indent: 2em;

      /deep/ img {
        max-width: 100%;
        display: block;
        margin: 10px auto;
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/about.less"></style>
