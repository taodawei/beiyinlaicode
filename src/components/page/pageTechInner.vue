<template>
  <div class="page">
    <pageTechTop />

    <div class="page-box">
      <div class="page-inner">
        <div class="page-block block-chanpin">
          <div class="ctx-box">
            <!-- 左侧导航 -->
            <pageTechLeftNav />

            <!-- 右侧列表 -->
            <div class="ctx-right">
              <div class="search-box">
                <img class="img-search" src="@img/keyword-search.png" alt="" />
                <input
                  v-model="keyword"
                  type="text"
                  placeholder="输入关键词搜索"
                  @keyup.enter="setView"
                />
                <button class="btn-ripple" @click="setView">搜索</button>
              </div>

              <!-- 视频列表 -->
              <div class="video-box" v-if="showVideo">
                <div class="video-list">
                  <router-link
                    :to="'/technologyVideo?id=' + item.id"
                    class="video-item"
                    v-for="(item, index) in list"
                    :key="index"
                  >
                    <div class="img-box scale-box">
                      <img :src="item.originalPic" alt="" class="scale-img" />
                    </div>
                    <div class="info-box">
                      <div class="date">
                        {{ item.dtTime && item.dtTime.substr(0, 10) }}
                      </div>
                      <div class="title">{{ item.title }}</div>
                      <div class="study">
                        <span>立即学习</span>
                        <img src="@img/more.png" alt="" />
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>

              <!-- 资讯列表 -->
              <div class="news-box" v-if="showNews">
                <div class="news-list">
                  <router-link
                    :to="'/technologyArticle?id=' + item.id"
                    class="news-item"
                    v-for="(item, index) in list"
                    :key="index"
                  >
                    <div class="news-date">
                      <div class="date">
                        {{ item.dtTime && item.dtTime.substr(8, 2) }}
                      </div>
                      <div class="month">
                        {{ item.dtTime && item.dtTime.substr(0, 7) }}
                      </div>
                    </div>
                    <div class="news-right">
                      <div class="title">{{ item.title }}</div>
                      <div class="desc">
                        {{ item.jianjie }}
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>

              <!-- 文献列表 -->
              <div class="file-box" v-if="showFile">
                <div class="file-group-list">
                  <div
                    class="file-group"
                    v-for="(group, index) in group_list"
                    :key="index"
                  >
                    <div class="file-section-title">
                      <div class="text">{{ group.title }}</div>
                      <router-link
                        v-if="false"
                        :to="'/technologyDownload?id=' + group.id"
                        class="more-box"
                      >
                        查看更多
                        <img src="@img/more.png" alt="" />
                      </router-link>
                    </div>
                    <div class="file-section">
                      <div class="file-list">
                        <div
                          class="file-item"
                          v-for="(item, index) in group.list"
                          :key="index"
                        >
                          <div class="img-box">
                            <img :src="item.originalPic" class="poster" />

                            <div class="modal-box">
                              <div class="mask"></div>
                              <div
                                class="btn btn-preview btn-ripple"
                                @click="previewPdf(item, group)"
                              >
                                下载
                              </div>
                              <!-- <div
                                class="btn btn-download btn-ripple"
                                @click="download(item, group)"
                              >
                                立即下载
                              </div> -->
                            </div>
                          </div>
                          <div class="title-box">{{ item.title }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="!showFile" class="pagination-box" style="margin-top: 40px">
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
  name: "tech-inner",
  components: {},
  data() {
    return {
      viewMode: "",
      list: [],
      group_list: [],
      keyword: "",
      count: 0,
      pagination: {
        page: 1,
        pagenum: 10,
      },

      activeCate: {},

      type: this.$route.query.type,
    };
  },
  computed: {
    ...mapState([""]),

    showVideo() {
      return this.type == "technologyOnline";
    },
    showNews() {
      return this.type == "technologyResearch";
    },
    showFile() {
      return this.type == "technologyDownload";
    },
  },
  watch: {
    $route(to, from) {
      //console.log("TechInner watch route");
      this.keyword = "";
      this.type = to.query.type;
      this.setView();
    },
  },

  beforeRouteUpdate(to, from, next) {
    //console.log("TechInner  组件复用 from", from);
    //console.log("TechInner  组件复用 to", to);

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
      this.viewMode = "";
      this.type = this.$route.query.type; // technologyDownload

      if (this.type != "technologyDownload") {
        this.$api("brand_studyList", {
          channel_id: this.$route.query.id,
          ...this.pagination,
          keyword: this.keyword,
        }).then((res) => {
          this.list = res.data;
          this.count = res.count;
        });
      } else {
        //特殊处理资料下载 需要进行数据分组操作
        this.queryCateInfo();
      }
    },

    queryCateInfo() {
      if (!this.study_cates_all.length) {
        setTimeout(() => {
          this.queryCateInfo();
        }, 200);
      } else {
        let download_fisrt = this.study_cates_all.find((v) => v.id == 864) || {};
        this.activeCate =
          this.study_cates_all.find((v) => v.id == this.$route.query.id) ||
          download_fisrt;
        //console.log("technologyDownload 当前分类", { ...this.activeCate });

        if (this.activeCate.level == 1) {
          //资料下载
          this.queryList(this.activeCate.channels);
        } else if (this.activeCate.level == 2) {
          //二级抗体
          this.queryList(this.activeCate.channels);
        } else if (this.activeCate.level == 3) {
          //3级  宣传单页 || 画册 || PPT
          this.queryList([this.activeCate], "单一分类");
        }
      }
    },

    //查询数据列表
    queryList(cateList, viewMode) {
      let promise_list = [];
      cateList.forEach((cate) => {
        let promise = this.$api("brand_studyList", {
          channel_id: cate.id,
          page: 1,
          pagenum: viewMode == "单一分类" ? 100 : 4,
          keyword: this.keyword,
        });

        promise_list.push(promise);
      });

      this.viewMode = viewMode || "";

      Promise.all(promise_list).then((resAll) => {
        //console.log("所有资料数据", resAll);

        let group_list = [];
        cateList.forEach((cate, index) => {
          group_list.push({
            id: cate.id,
            title: cate.title,
            type: cate.type,
            list: resAll[index].data,
          });

          this.group_list = group_list;
        });
      });
    },

    download(item, group) {
      //console.log("资料下载", { ...item });
      //console.log("分类", { ...group });

      //类型：0-视频  1-图文 2-下载链接
      if (group.type == "0") {
        if (item.download) {
          window.open(item.download, "_blank");
        }
      } else if (group.type == "1") {
        if (item.download) {
          window.open(item.download, "_blank");
        }
      } else if (group.type == "2") {
        if (item.download) {
          window.open(item.download, "_blank");
        }
      }
    },

    previewPdf(item) {
      //console.log("pdf 预览", { ...item });

      let download = item.download.toLocaleLowerCase();
      if (item.download.includes(".pdf") || item.download.includes(".PDF")) {
        let { href } = this.$router.resolve({
          path: "/technologyPdf",
          query: {
            title: item.title,
            src: item.download,
          },
        });

        window.open(href, "_blank");
      } else {
        let href = item.download;
        window.open(href, "_blank");
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

  .ctx-right {
    flex: 1;
  }
}

// 左侧导航

// 搜索
.search-box {
  margin-bottom: 32px;
  overflow: hidden;
  position: relative;
  height: 48px;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #c2c2c2;

  .img-search {
    position: absolute;
    left: 32px;
    top: 50%;
    transform: translate(0, -50%);
    width: 26px;
  }
  input {
    padding-left: 70px;
    width: 100%;
    height: 100%;
  }
  button {
    position: absolute !important;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100px;
    background: @theme;
    color: #fff;
  }
}

// 问题列表
.video-list {
  padding-top: 32px;
  .flex();
  flex-wrap: wrap;

  .video-item {
    width: 350px;
    margin-right: 25px;
    margin-bottom: 32px;
    &:nth-child(3n) {
      margin-right: 0;
    }
    .img-box {
      img {
        width: 350px;
        height: 197px;
        object-fit: cover;
      }
    }
    .info-box {
      border-bottom: 1px solid #ededed;
      padding: 15px 0;
      .date {
        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
      .title {
        .line-2();
        margin: 12px 0;
        height: 48px;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        line-height: 24px;
      }
      .study {
        .flex();

        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #ea3200;

        img {
          margin-left: 10px;
          width: 20px;
        }
      }
    }
  }
}

// 新闻列表
.news-list {
  .news-item {
    .flex-between();
    padding: 32px 0;
    border-bottom: 1px solid #d5d8de;

    .news-date {
      .flex-center();
      flex-direction: column;
      width: 177px;
      height: 160px;
      border-right: 1px solid #d5d8de;

      .date {
        font-size: 44px;
        font-family: DIN-Black-, DIN-Black;
        font-weight: normal;
        color: #ea3200;
      }
      .month {
        margin-top: 10px;
        font-size: 18px;
        font-family: MicrosoftYaHei-, MicrosoftYaHei;
        font-weight: normal;
        color: #b1b1b1;
      }
    }

    .news-right {
      flex: 1;
      padding-left: 72px;
      .title {
        .line-1();
        font-size: 20px;
        font-family: MicrosoftYaHei-, MicrosoftYaHei;
        font-weight: normal;
        color: #333333;
      }

      .desc {
        .line-3();
        margin-top: 24px;
        font-size: 14px;
        font-family: MicrosoftYaHei-, MicrosoftYaHei;
        font-weight: normal;
        color: #999999;
        line-height: 32px;
        height: 96px;
      }
    }
  }
}

.file-group-list {
  .file-group {
    margin-bottom: 30px;
    .file-section-title {
      .flex-between();
      padding: 0 20px;
      height: 51px;
      background: #f4f4f4;
      border-radius: 0px 0px 0px 0px;
      margin-bottom: 24px;

      .text {
        font-size: 18px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #333333;
      }

      .more-box {
        .flex();

        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #ea3200;
        img {
          margin-left: 10px;
          width: 20px;
        }
      }
    }
    .file-section {
      .file-list {
        display: flex;
        flex-wrap: wrap;

        .file-item {
          width: 251px;
          margin-right: 32px;
          cursor: pointer;
          &:nth-child(4n) {
            margin-right: 0;
          }

          &:hover {
            .modal-box {
              opacity: 1 !important;
            }
            .title-box {
              background: #f8f8f8 !important;
            }
          }

          .img-box {
            position: relative;
            width: 251px;
            height: 251px;
            .flex-center();

            .poster {
              width: 223px;
              height: 223px;
              object-fit: contain;
            }

            .modal-box {
              opacity: 0;
              position: absolute;
              z-index: 8;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              transition: 0.4s linear;
              .mask {
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.28);
                z-index: 10;
              }
              .btn {
                position: absolute;
                left: 50%;
                transform: translate(-50%);
                bottom: 40px;
                width: 140px;
                height: 36px;
                line-height: 36px;
                text-align: center;
                background: #ea3200;
                border-radius: 4px 4px 4px 4px;
                font-size: 14px;
                font-family: Microsoft YaHei-Regular, Microsoft YaHei;
                font-weight: 400;
                color: #ffffff;

                &.btn-preview {
                  // bottom: 80px;
                }
              }
            }
          }

          .title-box {
            .line-1();
            background: #fff;
            transition: 0.3s;
            padding: 0 20px;
            height: 51px;
            line-height: 51px;
            text-align: center;
            font-size: 14px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #333333;
          }
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/zujian/pageTechInner.less"></style>
