<template>
  <div class="page">
    <pageProductArticleTop :cate="cate_info" />

    <div class="page-box">
      <div class="page-inner">
        <div class="page-block">
          <div class="detail-title">
            {{ detail.title }}
          </div>
          <div class="detail-title-line"></div>
          <div class="detail-html">
            <div class="detail-rich html-frag" v-html="detail.content"></div>
          </div>
        </div>

        <div class="silu-box">
          <div class="detail-title">{{ detail.title }}整体思路</div>
          <div class="detail-title-line"></div>
          <div class="silu-list" v-if="detail.thinks && detail.thinks.length">
            <router-link
              :to="'/productArticleDetail/' + item.thinkId"
              class="silu-item"
              v-for="(item, index) in detail.thinks"
              :key="index"
            >
              <div class="img-box scale-box">
                <img :src="item.originalPic" alt="" class="scale-img" />
              </div>
            </router-link>
          </div>
        </div>

        <div class="page-block block-anli">
          <div class="detail-title">{{ detail.title }}产品</div>
          <div class="detail-title-line"></div>
          <div class="anli-list" v-if="detail.channels && detail.channels.length">
            <router-link
              :to="'/productCates?id=' + item.id"
              class="anli-item"
              v-for="(item, index) in detail.channels"
              :key="index"
            >
              <div class="img-box scale-box">
                <img :src="item.originalPic" alt="" class="scale-img" />
              </div>
              <div class="info-box">
                <div class="title">{{ item.title }}</div>
                <div :to="'/productCates?id=' + item.id" class="en-title">
                  <span>查看产品</span>
                  <img src="@img/more.png" alt="" />
                </div>
              </div>
            </router-link>
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

    cate_info() {
      let info =
        this.zhuanti_cates.find((cate) => cate.id == this.$route.params.id) || {};
      return info;
    },
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
      //专题详情
      this.$api("brand_topicInfo", {
        id: this.$route.params.id,
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
    padding-bottom: 0;

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
      .detail-rich {
        font-size: 16px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        line-height: 40px;
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
    .desc-1 {
      font-size: 16px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      line-height: 40px;
    }

    .tech-adv {
      margin-top: 40px;
      img {
        width: 100%;
      }
    }

    .tech-file {
      margin-top: 30px;
      .flex();

      .img-file {
        width: 22px;
        margin-right: 10px;
      }

      a {
        margin-left: 40px;
        .flex-center();
        width: 132px;
        height: 40px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #c2c2c2;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #666666;

        .img-download {
          margin-right: 10px;
          width: 14px;
        }
      }
    }
  }
}

.silu-box {
  margin-top: 80px;
  padding-top: 80px;
  padding-bottom: 80px;
  // background: url(~@img/tech-bg.jpg);
  background: #f5f5f5;

  .silu-list {
    display: flex;
    flex-wrap: wrap;
    width: @width;
    margin: 0 auto;
    padding-top: 30px;

    .silu-item {
      width: 445px;
      margin-right: 32px;
      &:nth-child(3n) {
        margin-right: 0;
      }

      .img-box {
        width: 445px;
        height: 540px;
        img {
        }
      }
    }
  }
}

.block-anli {
  padding-top: 80px;
  padding-bottom: 80px;

  .anli-list {
    margin-top: 50px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .anli-item {
      width: 444px;
      margin-right: 33px;
      margin-top: 30px;
      box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
      border-radius: 4px 4px 4px 4px;
      overflow: hidden;
      transition: 0.3s;

      &:nth-child(3n) {
        margin-right: 0;
      }
      &:nth-child(-n + 3) {
        margin-top: 0;
      }
      &:hover {
        box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.19);
      }
      .img-box {
        width: 444px;
        height: 300px;
        img {
          width: 100%;
          height: 300px;
        }
      }
      .info-box {
        height: 112px;
        padding: 20px 25px;
        .title {
          .line-1();
          font-size: 22px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }
        .en-title {
          .flex();
          margin-top: 10px;
          .line-1();
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #ea3200;

          img {
            margin-left: 10px;
            width: 26px;
          }
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/productArticle.less"></style>
