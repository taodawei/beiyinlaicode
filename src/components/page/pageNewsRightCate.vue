<template>
  <div class="news-right">
    <div class="right-title">
      新闻分类
      <span></span>
    </div>

    <div class="right-cates">
      <div class="cate-item" v-for="(item, index) in opt_news_cate" :key="index">
        <router-link :to="'/news/' + item.id" :class="checkClass(item)">
          {{ item.title }}
        </router-link>
      </div>
    </div>

    <div class="suggest-box">
      <div class="suggest-tags">
        <div class="tabs">
          <div
            class="tab-item"
            v-for="(item, index) in tab_list"
            :key="index"
            :class="{ active: active_tab.id == item.id }"
            @click="toggleTab(item)"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
      <div class="suggest-list">
        <div class="suggest-item" v-for="(item, index) in list_news" :key="index">
          <router-link :to="'/newsDetail/' + item.id"> {{ item.title }} </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["cate_id"],
  data() {
    return {
      news_cate_id: this.$route.params.id || "", //当前新闻分类id

      tab_list: [
        {
          title: "最新文章",
          id: "1",
        },
        {
          title: "热点文章",
          id: "2",
        },
        {
          title: "随机文章",
          id: "3",
        },
      ],
      active_tab: { title: "最新文章", id: 1 },

      list_news: [],
      count: 0,
      pagination: {
        page: 1,
        page_num: 6,
      },
    };
  },
  computed: {
    ...mapState(["active_news_right_id"]),
  },

  watch: {
    $route(curr, prev) {
      //console.log("监视路由", curr, prev);

      if (this.$route.name == "newsDetail") {
        this.news_cate_id = this.active_news_right_id || "";
      }

      this.active_tab = { title: "最新文章", id: 1 };

      this.setView();
    },
  },

  created() {
    this.setView();
  },
  methods: {
    checkClass(item) {
      let obj = {};
      if (this.$route.name == "newsDetail" && this.active_news_right_id == item.id) {
        obj = { active: true };
      }

      return obj;
    },

    toggleTab(item) {
      this.active_tab = item;

      this.setView();
    },

    setView() {
      // debugger
      let params = {
        channel_id: this.cate_id || this.news_cate_id,
        content_len: 50,
        order1: "dtTime", //根据权重 ordering  根据创建日期 dtTime
        order2: "desc", //升序 asc  降序 desc
        if_index: "0", //是否推荐：0-全部  1-推荐
        ...this.pagination,
        keyword: this.keyword || "",
      };

      let other_params_map = {
        1: {
          order1: "id",
          order2: "desc",
        }, //最新文章
        2: {
          order1: "views",
          order2: "desc",
        }, //热点文章
        3: {}, //随机文章
      };
      let other_params = other_params_map[this.active_tab.id];
      params = {
        ...params,
        ...other_params,
      };

      this.$api("index_newsList", params).then((res) => {
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

<style lang="less" scoped>
.news-right {
  .right-title {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    width: 307px;
    height: 104px;
    background: #ea3200;
    border-radius: 0px 16px 0px 0px;
    padding-left: 33px;
    font-size: 24px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;

    span {
      margin-top: 15px;
      display: inline-block;
      width: 21px;
      height: 2px;
      background: #ffffff;
    }
  }

  .right-cates {
    .cate-item {
      border: 1px solid #e6e6e6;
      border-top: none;
      height: 48px;
      line-height: 48px;
      padding: 0 30px;

      a {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #666666;

        &.router-link-active,
        &.active {
          color: @theme;
          font-weight: bold;
        }
      }
    }
  }

  .suggest-box {
    margin-top: 25px;
    width: 307px;
    min-height: 371px;
    padding: 10px 30px;
    background: #ffffff;
    border-radius: 0px 0px 0px 0px;
    border: 1px solid #e6e6e6;

    .suggest-tags {
      .tabs {
        display: flex;
        justify-content: center;
        border-bottom: 1px solid #eee;
        .tab-item {
          position: relative;
          flex: 1;
          margin: 0 0;
          padding: 15px 0;

          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #b1b1b1;
          text-align: center;
          cursor: pointer;

          &.active {
            &::after {
              position: absolute;
              content: "";
              height: 3px;
              background: #ea3200;
              width: 100%;
              left: 0;
              right: 0;
              bottom: 0;
            }
          }
        }
      }
    }
    .suggest-list {
      .suggest-item {
        margin-top: 28px;
        .line-1();

        a {
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;

          &:hover {
            color: @theme;
          }
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/zujian/pageNewsRightCate.less"></style>
