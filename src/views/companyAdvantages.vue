<template>
  <div class="page-box">
    <!-- <pageAboutInner /> -->

    <div class="page">
      <pageAboutTop />

      <div class="page-inner">
        <div class="detail-title">{{ cate_title || $route.meta.title }}</div>
        <div class="detail-title-line"></div>
        <div class="detail-content">
          <!-- <div class="detail-rich" v-html="detail.content"></div> -->

          <div class="youshi-box">
            <div class="youshi-list">
              <div class="youshi-item" v-for="(item, index) in list_youshi" :key="index">
                <div class="title">
                  {{ item.title }}
                </div>
                <div class="line"></div>
                <div class="desc-box">
                  <div class="desc">{{ item.jianjie }}</div>
                </div>
                <div class="img-wrap">
                  <div class="img-box">
                    <img :src="item.originalPic" alt="" class="scale-img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      detail: {},
      cate_title: "企业优势",
      list_youshi: [],
    };
  },
  computed: {
    ...mapState([""]),
  },
  watch: {
    $route(curr, prev) {
      this.setView();
    },
  },

  created() {
    this.setView();
  },
  methods: {
    setView() {
      // let id_map = {
      //   companyProfile: "84", //公司简介
      //   companyServiceNet: "93", //服务网络
      //   companyAdvantages: "94", //企业优势
      //   companyCulture: "95", //企业文化
      //   companyHistory: "96", //发展历程
      // };
      // let id = id_map[this.$route.name];
      // this.$api("index_newsDetail", {
      //   id: id,
      // }).then((res) => {
      //   this.detail = res.data.info;
      // });

      this.$api("index_newsList", {
        channel_id: 42,
      }).then((res) => {
        this.list_youshi = res.data.list;
      });
    },
  },
};
</script>

<style scoped lang="less">
.page {
  background: #f5f5f5;
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

      .detail-rich {
        /deep/ img {
          max-width: 100%;
          display: block;
          margin: 10px auto;
        }
      }
    }
  }
}

// 发展历程
.youshi-box {
  position: relative;
  width: @width;
  margin: 0 auto;
  padding-top: 60px;

  .youshi-list {
    .flex();
    flex-wrap: wrap;

    .youshi-item {
      position: relative;
      margin-right: 40px;
      margin-bottom: 40px;
      width: calc((100% - 40px) / 2);
      height: 430px;
      background: #ffffff;
      padding: 50px 40px;
      cursor: pointer;
      transition: 0.3s;

      &:nth-child(2n) {
        margin-right: 0;
      }

      &:hover {
        box-shadow: 2px 2px 10px 10px #ccc;
      }

      .title {
        text-align: left;
        font-size: 28px;
        font-family: SourceHanSansSC-Medium-, SourceHanSansSC-Medium;
        font-weight: normal;
        color: #ea3200;
      }
      .line {
        margin-top: 24px;
        margin-bottom: 30px;
        width: 80px;
        height: 3px;
        background: #ea3200;
      }
      .desc {
        text-align: left;
        margin: 24px 0;
        font-size: 18px;
        font-family: SourceHanSansSC-Regular-, SourceHanSansSC-Regular;
        font-weight: normal;
        color: #666666;
        line-height: 36px;
        white-space: pre;
      }

      .img-wrap {
        position: absolute;
        bottom: 50px;
        right: 40px;
        display: flex;
        justify-content: flex-end;
      }
      .img-box {
        img {
          max-width: 120px;
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/companyAdvantages.less"></style>
