<template>
  <div class="page">
    <pageNewsTop />

    <div class="inner">
      <div class="ctx-news">
        <div class="ctx-left">
          <div class="news-title">{{ detail.title }}</div>
          <div class="news-desc">
            发布时间：{{ detail.dtTime && detail.dtTime.substr(0, 10) }} | 新闻分类：
            <router-link :to="'/news/' + detail.channel_id">
              {{ detail.channel_title }}
            </router-link>

            <button
              v-if="detail.is_coupon"
              class="btn-ripple btn-lingquan"
              @click="$router.push('/couponCenter')"
            >
              <img src="@img/coupon-pick.png" alt="" />
              领券中心
            </button>
          </div>
          <div class="news-line"></div>
          <div class="news-ctx">
            <div class="news-html html-frag" v-html="detail.content"></div>
          </div>
          <div class="news-nav">
            <div class="news-nav-item news-prev">
              <span>上一篇：</span>
              <router-link v-if="last_news.id" :to="'/newsDetail/' + last_news.id">
                {{ last_news.title }}</router-link
              >
              <span v-else>无</span>
            </div>
            <div class="news-nav-item news-next">
              <span>下一篇：</span>
              <router-link v-if="next_news.id" :to="'/newsDetail/' + next_news.id">
                {{ next_news.title }}</router-link
              >
              <span v-else>无</span>
            </div>
          </div>
        </div>
        <div class="ctx-right">
          <pageNewsRightCate v-if="detail.channel_id" :cate_id="detail.channel_id" />
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
      // news_id: this.$route.params.id || "", //当前新闻分类id
      detail: {},
      last_news: {},
      next_news: {},
    };
  },
  computed: {
    ...mapState([""]),
  },

  watch: {
    $route(curr, prev) {
      //console.log("监视路由", curr, prev);

      this.setView();
    },
  },

  created() {
    this.setView();
  },

  methods: {
    changePage(page) {
      this.pagination.page = page;
      this.setView();
    },
    setView() {
      this.$api("index_newsDetail", {
        id: this.$route.params.id,
      }).then((res) => {
        let { code, data } = res;
        if (code == 1) {
          //优惠券分类
          if (data.info.channel_id == 36) {
            data.info.is_coupon = true;
          }

          this.detail = data.info;
          this.last_news = data.last_news || {};
          this.next_news = data.next_news || {};

          this.$store.commit("set_vuex_data", {
            key: "active_news_right_id",
            val: data.info.channel_id,
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.page {
  .inner {
    width: @width;
    margin: 0 auto;
    padding-top: 0;
    padding-bottom: 70px;
    text-align: left;
  }
}

.btn-lingquan {
  .flex-center();
  position: absolute !important;
  top: 0;
  right: 0;
  width: 160px;
  height: 40px;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #ea3200;

  font-size: 14px;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: #ea3200;

  img {
    margin-right: 8px;
  }
}

.ctx-news {
  padding-top: 80px;
  display: flex;
  align-items: flex-start;

  .ctx-left {
    flex: 1;
    .news-title {
      text-align: center;
      font-size: 24px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #333333;
    }
    .news-desc {
      position: relative;
      margin: 40px 0 28px;
      text-align: center;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #999999;

      a {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;

        &:hover {
          color: @theme;
        }
      }
    }

    .news-line {
      border-bottom: 1px solid #d9d9d9;
    }
    .news-ctx {
      padding: 40px 0;

      .news-html {
        text-indent: 2em;
        text-align: justify;

        /deep/ img {
          max-width: 100%;
          display: block;
          // margin: 10px auto;
          margin: 0 auto;
          vertical-align: bottom;
        }
      }
    }
    .news-nav {
      border-top: 1px solid #ddd;
      padding-top: 40px;

      .news-nav-item {
        .flex();
        margin-bottom: 30px;

        a {
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #666666;
          &:hover {
            color: @theme;
          }
        }
      }
    }
  }

  .ctx-right {
    margin-left: 40px;
    width: 307px;
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/newsDetail.less"></style>
