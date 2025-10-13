<template>
  <div class="page">
    <div class="main-title">
      <span>我的评价</span>
    </div>

    <div class="page-ctx">
      <div class="wrap-comments" v-if="list_comment.length">
        <div class="comment-item" v-for="(item, index) in list_comment" :key="index">
          <div class="avatar-info">
            <div class="left">
              <img :src="item.touxiang || defaultAvatar" alt />
              <span>{{ item.username }}</span>
            </div>
            <div class="right">
              <el-rate
                v-model="item.star"
                disabled
                :colors="['#EA3200', '#EA3200', '#EA3200']"
              ></el-rate>
            </div>
          </div>

          <div class="info-box">
            <div class="content">{{ item.content }}</div>
            <div class="img-list cover">
              <!-- <img v-for="(url, index) in item.imgs" :key="index" :src="url" alt /> -->

              <div class="img-item" v-for="(url, index) in item.imgs" :key="index" alt>
                <el-image
                  style="width: 70px; height: 70px"
                  :src="url"
                  :preview-src-list="item.imgs"
                >
                </el-image>
              </div>
            </div>
            <div class="date">{{ item.dtTime }}</div>

            <div
              class="goods-info"
              @click="mix_to_goods({ inventoryId: item.inventory_id })"
            >
              <div class="goods-img cover">
                <img :src="item.guige_img" alt="" />
              </div>
              <div class="goods-title">
                <div class="text">{{ item.title }}</div>
                <div class="gugie">{{ item.key_vals }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="pagination-box" style="margin-top: 80px">
          <el-pagination
            background
            layout="total, prev, pager, next"
            @current-change="changePage"
            :current-page.sync="pagination.page"
            :page-size="pagination.pagenum"
            :total="count"
          ></el-pagination>
        </div>
      </div>

      <el-empty v-if="!list_comment.length" description="评论列表为空..."></el-empty>
    </div>
  </div>
</template>

<script>
import commentList from "@/components/order/commentList.vue"; //

import { mapState } from "vuex";

export default {
  name: "servicePage",
  components: {
    commentList,
  },
  data() {
    return {
      orderStatus: 0,
      pagination: {
        page: 1,
        pagenum: 10,
      },
      list_comment: [],
      count: 0,
    };
  },
  computed: {
    ...mapState(["defaultAvatar"]),
  },
  created() {
    this.setView();
  },
  methods: {
    setView() {
      this.$api("users_myselfComments", {
        ...this.pagination,
      }).then((res) => {
        let { code, data, message, count } = res;
        if (code == 1) {
          let { list, count, pages } = data;
          this.count = count;
          this.list_comment = list;
        }
      });
    },

    //分页
    changePage() {
      this.setView();
    },
  },
};
</script>

<style scoped lang="less">
.page {
  text-align: left;
  padding-bottom: 80px;
  .main-title {
    .flex-between();
    padding: 0 32px;
    text-align: left;
    height: 56px;
    line-height: 56px;
    background: #ffffff;
    font-size: 16px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #333333;

    button {
      min-width: 96px;
      height: 30px;
      line-height: 30px;
      background: @theme;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
  }

  .page-ctx {
    margin-top: 24px;
    padding: 32px 32px 40px 32px;
    background: #fff;
  }
}

.wrap-comments {
  .comment-item {
    padding: 15px 20px;
    border-bottom: 1px solid #ddd;
    .avatar-info {
      .flex-between();
      .left {
        min-width: 127px;
        .flex-center();
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }
        span {
          flex: 2;
          margin-left: 30px;
          display: inline-block;
          // min-width: 100px;
          text-align: left;

          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }
      }

      .right {
      }
    }

    .info-box {
      padding-left: 90px;

      .content {
        margin: 10px 0;
        margin-top: 0;

        text-align: left;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 30px;
        color: #222222;
      }
      .img-list {
        .flex();
        flex-wrap: wrap;
        text-align: left;
        .img-item {
          margin-right: 15px;
        }

        img {
          width: 80px;
          height: 80px;
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }

      .date {
        text-align: left;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 19px;
        color: #999999;
      }

      .goods-info {
        margin-top: 10px;
        background: #f8f8f8;
        padding: 10px;
        .flex-between();
        cursor: pointer;

        .goods-img {
          img {
            width: 70px;
            height: 70px;
          }
        }
        .goods-title {
          text-align: left;
          flex: 2;
          padding-left: 30px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/user/myReview.less"></style>
