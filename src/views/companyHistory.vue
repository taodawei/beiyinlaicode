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

          <div class="licheng-box">
            <div class="time-line"></div>
            <div class="date-box">
              <div class="date-item" v-for="(item, index) in list_licheng" :key="index">
                <div class="title">
                  <div class="dot">
                    <div class="dot-inner"></div>
                  </div>
                  <div class="number">
                    {{ item.title }}
                  </div>
                </div>
                <div class="desc">
                  {{ item.jianjie }}
                </div>
                <div class="img-wrap">
                  <div class="img-box scale-box">
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
      cate_title: "发展历程",
      list_licheng: [],
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
        channel_id: 41,
        page: 1,
        page_num: 100,
      }).then((res) => {
        this.list_licheng = res.data.list;
      });
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
.licheng-box {
  position: relative;
  width: @width;
  margin: 0 auto;
  padding-top: 60px;

  .time-line {
    left: 50%;
    position: absolute;
    height: 100%;
    border-left: 1px dashed #aaa;
  }

  .date-box {
    padding-top: 50px;

    .date-item {
      &:not(:first-child) {
        // transform: translate(0, -132.5px);
        position: relative;
        top: -132.5px;
      }

      &:nth-child(2n + 1) {
        padding-left: calc(50% + 50px);
        // width: calc(50% - 50px);
        text-align: left;

        .img-wrap {
          display: flex;
          justify-content: flex-start;
        }

        .dot {
          left: -50px;
          transform: translate(-50%);
        }
      }
      &:nth-child(2n) {
        padding-right: calc(50% + 50px);
        text-align: right;

        .img-wrap {
          display: flex;
          justify-content: flex-end;
        }

        .dot {
          right: -50px;
          transform: translate(50%);
        }
      }

      &:hover {
        .desc {
          color: @theme;
        }
      }

      .title {
        position: relative;
        .dot {
          position: absolute;

          .flex-center();
          width: 40px;
          height: 40px;
          background: #ffffff;
          border: 1px solid #e3e3e3;
          border-radius: 50%;
          .dot-inner {
            border-radius: 50%;
            width: 18px;
            height: 18px;
            background: rgba(234, 50, 0, 0.3);
          }
        }
        .number {
          font-size: 32px;
          font-family: Microsoft YaHei-Bold, Microsoft YaHei;
          font-weight: bold;
          color: #ea3200;
        }
      }
      .desc {
        margin: 24px 0;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        line-height: 32px;
        white-space: pre;
      }
      .img-box {
        width: 400px;
        height: 225px;
        overflow: visible;
        img {
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/companyHistory.less"></style>
