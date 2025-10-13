<template>
  <div class="page">
    <div class="inner">
      <div class="detail-content">
        <div class="goods-box">
          <router-link
            v-for="(item, index) in list_news"
            :key="index"
            class="goods-item"
            :to="`newsDetail?id=${item.id}`"
          >
            <!-- <div class="img-box">
              <img :src="item.originalPic || defaultAvatar" alt />
            </div> -->
            <div class="info-box">
              <div class="title">{{ item.title || "标题" }}</div>
              <div class="date">{{ item.dtTime || "时间" }}</div>
              <div class="content">
                <div class="cont" v-html="item.content"></div>
              </div>
            </div>
          </router-link>
        </div>

        <el-row class="pagation-box" style="margin-top:20px">
          <el-pagination
            @current-change="onClickPagination"
            @prev-change="onClickPagination"
            @next-change="onClickPagination"
            background
            layout="prev, pager, next"
            :total="totalCount"
          ></el-pagination>
        </el-row>
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
      list_news: [],
      pagination: {
        page: 1,
        page_num: 10,
      }, //分页器

      totalCount: 0,
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
    //分页内容
    onClickPagination(page) {
      //console.log("当前页", page);

      this.pagination.page = page;
      // this.pagination = { ...this.pagination, page: page };

      this.setView();
    },

    async setView() {
      // 异步业务逻辑 读取服务端的数据
      //console.log("asyncData");

      this.$api('index_newsList', {
         action: "index_newsList",
          page: this.pagination.page,
          pagenum: this.pagination.pagenum,
          content_len: 200,
          channel_id: 3
      }).then((res) => {
        //console.log('新闻列表', res);
        this.list_news = res.data;
        this.totalCount = res.count;
      });
    },
  },
};
</script>


<style scoped lang="less">
.pagation-box {
  text-align: center;
}

.page {
  text-align: center;
  font-size: 14px;

  .inner {
    width: @width;
    margin: 0 auto;
    padding: 20px 0 80px;
  }
}

.goods-box {
  .goods-item {
    display: flex;
    cursor: pointer;
    padding: 20px 0;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    transition: 1s;

    &:hover {
    }

    .img-box {
      position: relative;
      img {
        width: 160px;
        height: 100px;
        border: 1px solid #eee;
      }
    }

    .info-box {
      flex: 2;
      width: 100%;
      padding-left: 20px;
      min-height: 100px;
      text-align: left;
      color: #999;
      font-size: 12px;

      .title {
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 15px;
        color: #000;
        font-weight: bold;
      }
      .date {
        margin-bottom: 15px;
      }
      .content {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}
</style>
