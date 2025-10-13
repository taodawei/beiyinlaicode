<template>
  <div class="page">
    <pageTechTop />

    <div class="page-box">
      <div class="page-inner">
        <div class="page-block block-chanpin">
          <!-- <div class="detail-title">FAQ</div>
          <div class="detail-title-line"></div> -->

          <div class="ctx-box">
            <!-- 左侧导航 -->
            <pageTechLeftNav ref="pageTechLeftNav" />

            <div class="ctx-right">
              <div class="detail-info">
                <div class="detail-title">{{ detail.title }}</div>
                <div class="detail-desc">
                  <span
                    >发布时间：{{ detail.dtTime && detail.dtTime.substr(0, 10) }}
                  </span>
                  <span class="divider"></span>
                  <span
                    >技术专题：
                    <router-link :to="cate.route || '/'">
                      {{ cate.title }}
                    </router-link>
                  </span>
                </div>
              </div>

              <div class="news-ctx">
                <div class="news-html" v-html="detail.content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DPlayer from "dplayer";

import { mapState } from "vuex";

export default {
  name: "video-detail",
  components: {},
  data() {
    return {
      showVideoJifen: false,
      detail: {},
    };
  },
  computed: {
    ...mapState([""]),

    cate() {
      let info = this.study_cates_all.find((v) => v.id == this.detail.channelId) || {};
      //console.log("当前视频分类", { ...info });
      return info;
    },
  },
  watch: {
    cate(data) {
      //console.log("watch techArticle cate", data);
      // this.$store.commit('set_vuex_data', {
      //   key: 'vuex_study_active_cate_id',
      //   val: data.id
      // })

      if (this.$refs.pageTechLeftNav) {
        //console.log("exposeSetActiveCate 切换分类");
        this.$refs.pageTechLeftNav.exposeSetActiveCate(data.id);
      }
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

  mounted() {
    this.initVideo();
  },
  methods: {
    setView() {
      this.$api("brand_studyInfo", {
        id: this.$route.query.id,
      }).then((res) => {
        this.detail = res.data || {};

        this.initVideo();
      });
    },

    queryVideoJifen() {
      //console.log("查询当前视频是否可以获得积分");
      that.showVideoJifen = true;
    },

    initVideo() {
      var that = this;
      var $player = document.querySelector("#dplayer");

      if (!this.detail.video || !$player) {
        setTimeout(() => {
          this.initVideo();
        }, 200);
      } else {
        const dp = new DPlayer({
          container: document.getElementById("dplayer"),
          video: {
            url: this.detail.video,
          },
        });

        dp.on("ended", function () {
          //console.log("player ended");
          that.queryVideoJifen();
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.page {
  padding-bottom: 80px;
  .page-box {
    background: #f7f7f7;
    background: #fff;
  }
  .page-inner {
    padding-top: 32px;
    text-align: left;
    padding-bottom: 0;

    .page-block {
      width: @width;
      margin: 0 auto;
    }

    .block-chanpin {
      margin-bottom: 50px;
    }

    .detail-title {
      text-align: center;
      position: relative;
      font-size: 36px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;

      .btn-xunjia {
        position: absolute;
        right: 0;
        top: 20px;

        width: 140px;
        height: 40px;
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
  }
}

.ctx-box {
  .flex-between();
  align-items: flex-start;

  .ctx-left {
    width: 260px;

    margin-right: 40px;
    background: #fafbfc;
    border: 1px solid #ebeef5;

    .left-title {
      border-bottom: 1px solid #eee;
      padding-left: 20px;
      height: 53px;
      line-height: 53px;
      font-size: 14px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;
    }
  }
  .ctx-right {
    flex: 1;
  }
}

.detail-info {
  padding-bottom: 24px;
  margin-bottom: 50px;
  border-bottom: 1px solid #ddd;

  .detail-title {
    margin-bottom: 32px;
    text-align: center;
    font-size: 24px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;
  }

  .detail-desc {
    .flex-center();
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #999999;

    .divider {
      margin: 0 20px;
      display: inline-block;
      width: 1px;
      height: 16px;
      background: #999999;
    }

    a {
      cursor: pointer;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #999999;

      &:hover {
        color: @theme;
      }
    }
  }
}

.news-ctx {
  padding: 40px 0;

  .news-html {
    text-indent: 2em;
    text-align: justify;

    /deep/ img {
      max-width: 100%;
      display: block;
      margin: 10px auto;
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/technologyArticle.less"></style>
