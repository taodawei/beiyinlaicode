<template>
  <div class="page">
    <pageAboutTop />

    <div class="page-inner">
      <div class="detail-title">人才理念</div>
      <div class="detail-title-line"></div>
      <div class="list-box">
        <div class="linian-list">
          <div class="linian-item" v-for="(item, index) in list_linian" :key="index">
            <div class="img-box scale-box">
              <img :src="item.originalPic" alt="" class="scale-img" />
            </div>
            <div class="info-box">
              <div class="title">{{ item.title }}</div>
              <!-- <div class="desc">
                {{ item.jianjie }}
              </div> -->
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
      list_linian: [],
      pagination: {
        page: 1,
        page_num: 10,
      },
      count: 0,
    };
  },
  computed: {
    ...mapState([""]),
  },
  watch: {},

  created() {
    this.setView();
  },
  methods: {
    setView() {
      this.$api("index_newsList", {
        channel_id: 27,
        ...this.pagination,
        language: this.lang,
      }).then((res) => {
        this.list_linian = res.data.list;
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
  }
}

.linian-list {
  margin-top: 64px;
  // .flex();
  // flex-wrap: wrap;

  .linian-item {
    margin-bottom: 104px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;
    &:nth-child(2n) {
      flex-direction: row;
      .info-box {
        padding-left: 92px;
        padding-right: 0 !important;
      }
    }

    .img-box {
      width: 682px;
      height: 406px;
      img {
      }
    }
    .info-box {
      flex: 1;
      text-align: left;
      padding-right: 92px;
      .title {
        font-size: 24px;
        font-size: 30px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
      .desc {
        margin-top: 33px;
        font-size: 16px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #666666;
        line-height: 36px;
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/idea.less"></style>
