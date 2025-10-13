<template>
  <div class="page">
    <pageTechTop />

    <div class="page-box">
      <div class="page-inner">
        <div class="page-block block-chanpin">
          <!-- <div class="detail-title">FAQ</div>
          <div class="detail-title-line"></div> -->

          <div class="ctx-box">
            <div class="ctx-left">
              <div class="left-title">学习中心</div>
              <div class="navs">
                <!-- 循环体 -->
                <div class="level1" v-for="(level_1, index_1) in 4" :key="index_1">
                  <div class="level1-title">1级分类</div>
                  <div class="level2-list">
                    <!-- 循环体 -->
                    <div class="level2" v-for="(level_2, index_2) in 2" :key="index_2">
                      <div class="level2-title">2级分类</div>
                      <div class="level3-list">
                        <!-- 循环体 -->
                        <div
                          class="level3"
                          v-for="(level_3, index_3) in 2"
                          :key="index_3"
                        >
                          <div class="level3-title">3级分类</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="ctx-right">
              <div class="search-box">
                <img class="img-search" src="@img/icon-search.png" alt="" />
                <input v-model="keyword" type="text" placeholder="输入关键词搜索" />
                <button class="btn-ripple" @click="setView">搜索</button>
              </div>

              <!-- 视频列表 -->
              <div class="video-list">
                <div class="video-item" v-for="(item, index) in 2" :key="index">
                  <div class="img-box">
                    <!-- <img src="@img/demo/demo-tech.png" alt="" /> -->
                  </div>
                  <div class="info-box">
                    <div class="date">10/17/2022</div>
                    <div class="title">
                      根瘤起始类蛋白转录因子调控豆科植物根瘤中根瘤起始类蛋白转录因子调控豆科植物根瘤中
                    </div>
                    <div class="study">
                      <span>立即学习</span>
                      <img src="@img/more.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- 资讯列表 -->
              <div class="news-list">
                <div class="news-item" v-for="(item, index) in 2" :key="index">
                  <div class="news-date">
                    <div class="date">28</div>
                    <div class="month">2022/12</div>
                  </div>
                  <div class="news-right">
                    <div class="title">根瘤起始类蛋白转录因子调控豆科植物根瘤中…</div>
                    <div class="desc">
                      题目：Rice stripe virus suppresses jasmonic acid-mediated resistance
                      by hijacking brassinosteroid signaling pathway in rice 期刊：Plos
                      Pathogens 影响因子：6.18 客户单位：南京农业大学
                      文章作者：胡金龙，黄捷共同第一作者 通讯作南京农业大学
                      文章作者：胡金龙，黄捷共同第一作者 通讯作……
                    </div>
                  </div>
                </div>
              </div>

              <!-- 资料列表 -->
              <div class="file-group-list">
                <div class="file-group" v-for="(item, index) in 2" :key="index">
                  <div class="file-section-title">
                    <div class="text">宣传单页</div>
                    <div class="more-box">
                      查看更多
                      <img src="@img/more.png" alt="" />
                    </div>
                  </div>
                  <div class="file-section">
                    <div class="file-list">
                      <div class="file-item" v-for="(item, index) in 4" :key="index">
                        <div class="img-box">
                          <!-- <img src="@img/demo/demo-ziliao.png" class="poster" /> -->

                          <div class="modal-box">
                            <div class="mask"></div>
                            <div class="btn">立即下载</div>
                          </div>
                        </div>
                        <div class="title-box">
                          资料标题资料标题资料标题资料标题资料标题资料标题资料标题资料标题
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
  name: "create-order",
  components: {},
  data() {
    return {
      tab_list: [
        {
          title: "抗体",
          id: "",
        },
        {
          title: "蛋白",
          id: "",
        },
        {
          title: "分类3",
          id: "",
        },
        {
          title: "分类4",
          id: "",
        },
      ],
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
    setView() {
      // this.$api("index_newsDetail", {
      //   id: this.$route.query.id,
      // }).then((res) => {
      //   this.curr = res.data;
      // });
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

// 左侧导航
.navs {
  padding: 0;

  .level1 {
    border-top: 1px solid #ebeef5;
    padding-left: 20px;

    &:first-child {
      border-top: none;
    }

    .level1-title {
      padding-left: 18px;
      border-bottom: 1px solid #ebeef5;

      height: 43px;
      line-height: 43px;

      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #606266;
    }
    .level2-list {
      .level2 {
        .level2-title {
          padding-left: 41px;
          line-height: 36px;
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #808080;
        }

        .level3-list {
          .level3 {
          }
          .level3-title {
            padding-left: 61px;
            font-size: 12px;
            line-height: 30px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #808080;
          }
        }
      }
    }
  }
}

// 搜索
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

        .file-item {
          width: 251px;
          margin-right: 32px;
          cursor: pointer;
          &:nth-child(4n) {
            margin-right: 0;
          }

          .img-box {
            position: relative;
            width: 251px;
            height: 251px;
            .flex-center();

            .poster {
              width: 223px;
              height: 223px;
            }

            .modal-box {
              position: absolute;
              z-index: 8;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
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
              }
            }
          }

          .title-box {
            .line-1();
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
