<template>
  <div class="page">
    <pageCompanyTop :pageOpt="pageOpt" />
    <div class="inner">
      <div class="section-ctx-title"><b>公司</b>简介</div>
      <div class="section-ctx-title-en">Company companyProfile</div>

      <div class="section-1">
        <div class="company-info">
          <div class="company-left">
            <h1 class="company-title">{{ company_title }}</h1>
            <div class="line"></div>
            <div class="company-desc" v-html="detail_company.content">
              <!-- <p class="company-desc-p">武汉贝茵莱生物科技是一家通过国家GMP认证的专业从事动物功能保健品研发、生产及销售的高科技股份制企业。公司坐落于潍坊市寒亭区固堤街道办事处曲范村。</p>
              <p class="company-desc-p">公司一期建筑面积7500平方米，其中生产车间面积4100平方米，办公及研发面积3000平方米，产品化验检测室400平方米。</p>
              <p class="company-desc-p">公司以“服务畜牧业、健康中国人”为发展使命，走“产品品牌化、服务专业化、经营创新化”的发展之路，充分发挥研发优势，不断推出新产品，满足用户需求。推动行业向规范化，专业化的健康方向发展。</p> -->
            </div>
          </div>
          <div class="company-right">
            <img :src="detail_company.originalPic" alt="" class="company-img" />
          </div>
        </div>
      </div>

      <div class="section-2">
        <div class="section-title">五大优势</div>
        <div class="youhui-list">
          <div class="youhui-item" v-for="(item, index) in list_youshi" :key="index">
            <div class="img-box">
              <img :src="item.icon" alt="" />
            </div>
            <div class="title">{{ item.title }}</div>
            <div class="desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>

      <div class="section-3">
        <div class="section-title">技术优势</div>
        <div class="jishu-desc">和美欣认为，人才是企业最宝贵的资源，技术是第一生产力；有了优秀的人才，才有一流的技术</div>
        <div class="team-list">
          <div class="team-item">
            <div class="img-box">
              <img src="@img/company/member-1.png" alt="" />
            </div>
            <div class="name">梁剑平·博士</div>
            <div class="desc">中国农业科学院兰州畜牧与兽药研究所兽药研究室副主任，国家“百人计划”人才，甘肃"555"创新人才，中国农业科学院新兽药工程重点开放实验室副主任。</div>
          </div>
          <div class="team-item">
            <div class="img-box">
              <img src="@img/company/member-2.png" alt="" />
            </div>
            <div class="name">王瑞·博士</div>
            <div class="desc">潍坊学院生物工程学院教授，有机化学理学博士。先后参与多项国家自然科学基金、国家科技支撑计划项目、中科院重要方向性项目等。</div>
          </div>
        </div>
      </div>

      <div class="section-4">
        <div class="list-school">
          <div class="school-item" v-for="(item, index) in opt_companyProfile_school" :key="index" @click="to_school(item)">
            <div class="img-box">
              <img :src="item.image" />
            </div>
            <div class="title">{{ item.title }}</div>
          </div>
        </div>
      </div>

      <div class="section-5">
        <div class="section-title">药材优势</div>
        <div class="yaocai-img">
          <img src="@img/company/yaocai.png" alt="" />
        </div>
        <div class="yaocai-img">
          <img src="@img/company/yaocai-2.png" alt="" />
        </div>
      </div>

      <div class="section-6">
        <div class="section-title">和美欣产学研合作</div>

        <div class="news-box">
          <div class="news-item scale-wrap" to="/" v-for="(item, index) in opt_companyProfile_hezuo" :key="index">
            <div class="img-box scale-inner">
              <img :src="item.image" alt="" class="scale-target" />
            </div>
            <div class="title">{{ item.title }}</div>
          </div>
        </div>
      </div>

      <div class="section-7">
        <div class="section-title">合作客户</div>

        <div class="kehu-box">
          <!-- <img src="@img/company/kehu.png" alt="" /> -->

          <div class="list-friend-link">
            <a class="friend-link" v-for="(item, index) in opt_companyProfile_friend_link" :key="index" :href="item.url" target="_blank">
              <img :src="item.image" alt="" />
            </a>
          </div>
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
      detail_company: {},
      list_youshi: [
        {
          title: "公司简介",
          desc: `以中科院兰研所梁剑平博士为核心，组建了和美欣药业研发中。专注天然植物药物疗效研发，开发出六大系列功能保健精品`,
          icon: require("@img/company/youshi-1.png"),
        },
        {
          title: "生产优势",
          desc: `采用前沿新自动化设备，以 高效率、高质量打造”质量 即生命”的高科技安全生产 体系，不断创新工艺，生产 客户满意的动物保健品`,
          icon: require("@img/company/youshi-2.png"),
        },
        {
          title: "服务优势",
          desc: `以技术人才为基，客户利 益为根，高效服务为本， 打造一流的技术服务体系， 急客户之所急，想客户之 所想，做客户之所需`,
          icon: require("@img/company/youshi-3.png"),
        },
        {
          title: "药材优势",
          desc: `与中外各大道地药材生 产基地紧密合作，从药 材种植、管理、收获进 行全程监管，保证了药 材原料质量和数量`,
          icon: require("@img/company/youshi-4.png"),
        },
        {
          title: "理论优势",
          desc: `抓住动物养殖的本质， 提出“六位一体养殖保 健理论”，简化动物疾 病的防治方案，降低用 药成本，提高饲料转化 率与养殖效益`,
          icon: require("@img/company/youshi-5.png"),
        },
      ],

      list_school: [
        {
          title: "中国农科院兰州兽药研究所",
          icon: require("@img/company/school-1.png"),
        },
        {
          title: "兰州大学",
          icon: require("@img/company/school-2.png"),
        },
        {
          title: "山东农业大学",
          icon: require("@img/company/school-3.png"),
        },
        {
          title: "潍坊学院生物药学院",
          icon: require("@img/company/school-4.png"),
        },
        {
          title: "山东畜牧兽医职业学院",
          icon: require("@img/company/school-5.png"),
        },
      ],

      list_friend_link: [
        {
          href: "",
          icon: require("@img/company/friend-link-1.png"),
        },
        {
          href: "",
          icon: require("@img/company/friend-link-2.png"),
        },
        {
          href: "",
          icon: require("@img/company/friend-link-3.png"),
        },
        {
          href: "",
          icon: require("@img/company/friend-link-4.png"),
        },
        {
          href: "",
          icon: require("@img/company/friend-link-5.png"),
        },
        {
          href: "",
          icon: require("@img/company/friend-link-6.png"),
        },
        {
          href: "",
          icon: require("@img/company/friend-link-7.png"),
        },
        {
          href: "",
          icon: require("@img/company/friend-link-8.png"),
        },
      ],
    };
  },
  computed: {
    ...mapState(["newsDetail", "opt_companyProfile_hezuo", "opt_companyProfile_school", "opt_companyProfile_friend_link"]),
    pageOpt() {
      let opt = {
        banner: "",
        list_bread: [
          {
            title: this.$route.meta.title || "企业文化",
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
    to_school(item) {
      if (item.url) {
        window.open(item.url, "_blank");
      }
    },
    setView() {
      //公司介绍
      this.$api("index_newsDetail", {
        id: this.company_detail_id,
      }).then((res) => {
        //console.log("公司介绍", res);
        let { code, data } = res;
        if (code == 1) {
          this.detail_company = data.info;
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
  font-size: 30px;
  font-family: Microsoft YaHei;
  font-weight: bold;

  b {
    color: #009a44;
  }
}
.section-ctx-title-en {
  margin-top: 5px;
  margin-bottom: 27px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #a9a9a9;
}

.section-1 {
  .company-info {
    width: 1400px;
    margin: 0 auto;
    .flex-between();
    align-items: flex-start;

    .company-left {
      flex: 2;
      padding-right: 47px;
      padding-left: 0;
      color: #333;
      text-align: left;

      .company-title {
        padding-top: 10px;
        font-size: 30px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 30px;
        color: #009a44;
      }

      .line {
        margin-top: 20px;
        margin-bottom: 30px;
        width: 686px;
        border-top: 1px solid #f0f0f0;
      }

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
    .company-right {
      .company-img {
        width: 686px;
        height: 425px;
        border-radius: 0;
      }
    }
  }
}

// 5大优势
.section-2 {
  padding-top: 55px;

  .youshi-title {
    font-size: 36px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 36px;
    color: #212529;
  }
  .youhui-list {
    padding-top: 35px;
    .flex-center();
    align-items: flex-start;

    .youhui-item {
      width: 239px;
      margin-right: 35px;

      &:last-child {
        margin-right: 0;
      }

      .img-box {
        img {
          width: 140px;
          height: 140px;
        }
      }
      .title {
        margin-top: 10px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 18px;
        color: #212529;
      }
      .desc {
        margin-top: 10px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 25px;
        color: #808080;
        text-align: left;
      }
    }
  }
}

.section-3 {
  padding-top: 52px;

  .jishu-title {
    margin-bottom: 35px;
    font-size: 36px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 36px;
    color: #212529;
  }

  .jishu-desc {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 18px;
    color: #212529;
  }

  .team-list {
    .flex-center();
    margin-top: 30px;

    .team-item {
      width: 657px;
      border: 1px solid #ddd;
      padding-top: 17px;
      padding-bottom: 10px;
      margin-right: 30px;

      &:last-child {
        margin-right: 30px;
      }

      .img-box {
        img {
          width: 218px;
          height: 218px;
          background: #ffffff;
          // border: 1px solid #707070;
          opacity: 1;
          border-radius: 50%;
        }
      }
      .name {
        margin-top: 30px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 18px;
        color: #212529;
      }
      .desc {
        margin-top: 10px;
        min-height: 51px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 30px;
        color: #212529;
        opacity: 1;
      }
    }
  }
}

.section-4 {
  width: 1400px;
  margin: 0 auto;
  padding-top: 50px;
  .list-school {
    .flex();
    flex-wrap: wrap;
    .school-item {
      width: 20%;
      cursor: pointer;
      .img-box {
        img {
          width: 176px;
        }
      }

      .title {
        margin-top: 10px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 18px;
        color: #212529;
      }
    }
  }
}

.section-title {
  width: 1400px;
  margin: 0 auto;
  padding-bottom: 18px;
  margin-bottom: 18px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 36px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 36px;
  color: #212529;
}

.section-5 {
  padding-top: 100px;

  .yaocai-img {
    img {
      display: block;
      margin: 0 auto;
      max-width: 100%;
    }
  }
}

.section-6 {
  padding-top: 50px;
  width: 1400px;
  margin: 0 auto;

  .news-box {
    .flex();
    flex-wrap: wrap;
    .news-item {
      width: 438px;
      height: auto;
      margin-right: 29px;
      margin-top: 15px;
      cursor: pointer;
      &:nth-child(3n) {
        margin-right: 0;
      }
      &:nth-child(-n + 3) {
        margin-top: 0;
      }

      .img-box {
        width: 438px;
        height: 314px;
        img {
          width: 438px;
          height: 314px;
        }
      }
      .title {
        margin-top: 5px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #212529;
      }
    }
  }
}

.section-7 {
  padding-top: 70px;

  .list-friend-link {
    width: 1400px;
    margin: 0 auto;
    .flex();
    flex-wrap: wrap;
    .friend-link {
      width: 25%;
      color: pointer;
      padding: 0 30px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
