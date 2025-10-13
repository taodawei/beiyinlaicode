<template>
  <div class="page">
    <pageNewsTop />

    <div class="inner">
      <div class="ctx-news">
        <div class="ctx-left">
          <div class="search-box">
            <img class="img-search" src="@img/keyword-search.png" alt="" />
            <input
              v-model="keyword"
              type="text"
              placeholder="请输入要搜索的关键词"
              @keyup.enter="setView"
            />
            <button class="btn-ripple" @click="setView">搜索</button>
            <!-- <div class="img-clear-box"><img class="img-clearable" src="//custproj00042-1.ceydz.com/cus-js/2022-10/xinyang/qianduan_html/imgs/img-clearable.png" /></div> -->
          </div>
          <div class="cate-title">{{ curr_news_cate.title }}</div>

          <template v-if="count">
            <div class="news-list">
              <router-link
                v-for="(item, index) in list_news"
                :key="index"
                :to="`/newsDetail/${item.id}`"
                class="news-item"
              >
                <div class="img-box scale-box">
                  <!-- <img :src="item.originalPic" alt="" /> -->
                  <img :src="item.originalPic" alt="" class="scale-img" />
                </div>

                <div class="info-box">
                  <div class="news-title">{{ item.title }}</div>
                  <h2 class="desc">
                    {{ item.jianjie }}
                  </h2>
                  <p class="news-date">{{ item.dtTime?.substr(0, 10) }}</p>
                </div>
              </router-link>
            </div>

            <div class="pagination-box" style="margin-top: 40px">
              <el-pagination
                background
                layout="total,prev, pager, next"
                :total="count"
                :current-page="pagination.page"
                :page-size="pagination.pagenum"
                @current-change="changePage"
              >
              </el-pagination>
            </div>
          </template>
          <template v-else>
            <el-empty description="没有查询到相关信息..."></el-empty>
          </template>
        </div>
        <div class="ctx-right">
          <pageNewsRightCate />
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
      keyword: "",
      news_cate_id: this.$route.params.id || "", //当前新闻分类id
      count: 0,
      pagination: {
        page: 1,
        page_num: 10,
      },
      list_news: [],
    };
  },
  computed: {
    ...mapState([""]),

    curr_news_cate() {
      let cate = this.opt_news_cate.find((v) => v.id == this.news_cate_id) || {};

      return cate;
    },
  },

  watch: {
    $route(curr, prev) {
      //console.log("news 监视路由", curr, prev);
      this.news_cate_id = curr.params.id || "";

      this.setView();
    },
  },

  created() {
    this.setView();
  },

  methods: {
    // changePage(page) {
    //   this.pagination.page = page;
    //   this.setView();
    // },

    setView() {
      //console.log("setView");
      this.$api("index_newsList", {
        channel_id: this.news_cate_id,
        content_len: 50,
        order1: "dtTime", //根据权重 ordering  根据创建日期 dtTime
        order2: "desc", //升序 asc  降序 desc
        if_index: "0", //是否推荐：0-全部  1-推荐
        ...this.pagination,
        keyword: this.keyword,
      }).then((res) => {
        let { code, data } = res;
        if (code == 1) {
          this.list_news = data.list;
          this.count = data.count;
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

.ctx-news {
  padding-top: 80px;
  display: flex;
  align-items: flex-start;

  .ctx-left {
    flex: 1;
    .search-box {
      overflow: hidden;
      position: relative;
      height: 48px;
      background: #ffffff;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #c2c2c2;

      img {
        position: absolute;
        left: 32px;
        top: 50%;
        transform: translate(0, -50%);
        width: 24px;
      }
      input {
        padding-left: 70px;
        width: 100%;
        height: 100%;
      }
      button {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100px;
        background: @theme;
        color: #fff;
      }
    }

    .cate-title {
      margin-top: 40px;
      font-size: 24px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      padding-bottom: 24px;
      border-bottom: 1px solid #eee;
    }
    .news-list {
      .news-item {
        .flex();
        padding: 32px 0;
        border-bottom: 1px solid #eee;

        .img-box {
          width: 427px;
          height: 240px;
          img {
          }
        }
        .info-box {
          flex: 1;
          padding: 26px 32px;
          .news-title {
            .line-1();
            font-size: 20px;
            font-family: MicrosoftYaHei-, MicrosoftYaHei;
            font-weight: normal;
            color: #333333;
          }
          .desc {
            margin-top: 32px;
            .line-3();
            font-size: 14px;
            font-family: MicrosoftYaHei-, MicrosoftYaHei;
            font-weight: normal;
            color: #999999;
            line-height: 32px;
          }
          .news-date {
            margin-top: 16px;
            font-size: 14px;
            font-family: MicrosoftYaHei-, MicrosoftYaHei;
            font-weight: normal;
            color: #999999;
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

<style scoped lang="less" src="@/assets/h5css/page/newsSearch.less"></style>
