<template>
  <div class="page">
    <pageProductArticleTop />

    <div class="page-box">
      <div class="page-inner">
        <div class="page-block">
          <div class="detail-title">
            {{ detail.title }}
            <!-- <a href="#xunjia" class="btn-xunjia btn-ripple">在线询价</a> -->
          </div>
          <div class="detail-title-line"></div>

          <div class="detail-html">
            <div class="detail-left">
              <div class="detail-rich" v-html="detail.content"></div>
            </div>
            <div class="detail-right">
              <div class="img-box scale-box">
                <img :src="detail.originalPic" alt="" class="scale-img" />
              </div>
            </div>
          </div>

          <div class="detail-action">
            <a :href="detail.download" class="btn-ripple" target="_blank">
              <img src="@img/xiazai.png" alt="" />
              <span>下载资料</span>
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
  name: "create-order",
  components: {},
  data() {
    return {
      detail: {},
    };
  },
  computed: {
    ...mapState([""]),
  },

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
      //定制服务详情
      this.$api("brand_thinkInfo", {
        thinkId: this.$route.params.id,
      }).then((res) => {
        this.detail = res.data;
      });
    },
  },
};
</script>

<style scoped lang="less">
.page {
  .page-box {
    background: #f7f7f7;
    background: #fff;
  }
  .page-inner {
    padding: 80px 0;
    text-align: left;

    .page-block {
      width: @width;
      margin: 0 auto;
    }

    .detail-title {
      text-align: center;
      position: relative;
      font-size: 36px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;

      .btn-xunjia {
        display: inline-block;
        position: absolute;
        right: 0;
        top: 20px;

        width: 140px;
        height: 40px;
        line-height: 40px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #ea3200;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #ea3200;
      }
    }

    .detail-title-line {
      width: 80px;
      margin: 24px auto;
      height: 5px;
      background: #ea3200;
      border-radius: 3px 3px 3px 3px;
    }

    .detail-html {
      padding-top: 30px;
      padding-bottom: 30px;
      .flex-between();
      align-items: flex-start;

      .detail-left {
        flex: 1;
      }
      .detail-right {
        width: 550px;
        margin-left: 50px;
        .img-box {
          width: 550px;

          img {
            width: 100%;
          }
        }
      }

      .detail-rich {
        text-align: left;
        font-size: 16px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #666666;
        line-height: 36px;

        text-indent: 2em;
        text-align: justify;

        /deep/ img {
          display: block;
          margin: 10px auto;
          max-width: 100%;
          vertical-align: bottom;
        }
      }
    }

    .detail-action {
      margin-top: 60px;
      a {
        .flex-center();
        width: 132px;
        height: 40px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #ea3200;

        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #ea3200;

        img {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/productArticleDetail.less"></style>
