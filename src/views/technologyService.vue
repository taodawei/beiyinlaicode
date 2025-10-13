<template>
  <div class="page">
    <pageServiceTop />

    <div class="page-box">
      <div class="page-inner">
        <div class="page-block">
          <div class="detail-title">
            {{ service_info.title }}
            <a href="#xunjia" class="btn-xunjia btn-ripple">在线询价</a>
          </div>
          <div class="detail-title-line"></div>

          <div class="detail-html">
            <div class="detail-rich" v-html="detail.content"></div>
          </div>
          <!-- <div class="desc-1">
            
          </div> -->
          <!-- <div class="tech-adv">
            <img src="@img/demo/demo-tech.jpg" alt="" />
          </div> -->

          <template v-if="detail.file_info && detail.file_info.length">
            <div class="tech-file" v-for="(item, index) in detail.file_info" :key="index">
              <img class="img-file" src="@img/tech-file.png" alt="" />
              <span>{{ item.name }}</span>
              <a :href="item.down_url" target="_blank">
                <img class="img-download" src="@img/tech-download.png" alt="" />
                下载附件
              </a>
            </div>
          </template>
        </div>

        <div class="liucheng-box">
          <div class="detail-title">服务流程</div>
          <div class="detail-title-line"></div>

          <div
            class="liucheng-list"
            v-if="detail.channelId == 1 && detail.process && detail.process.length"
          >
            <div
              class="liucheng-item"
              v-for="(item, index) in detail.process"
              :key="index"
              :class="{ active: index == activeIndex }"
              @click="toggleHighlightItem(index, item)"
            >
              <div class="liucheng-title">
                <span class="number">{{ index + 1 }}</span>
              </div>
              <div class="liucheng-desc">
                <div class="img-box">
                  <img
                    :src="
                      item.originalPic ||
                      (serviceIcons[index] && serviceIcons[index].image)
                    "
                  />
                </div>
                <div class="title">
                  {{ item.title }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="liucheng-lists"
            :class="detail.process.length <= 6 ? 'liucheng-list3' : 'liucheng-lists'"
            v-else-if="detail.channelId != 1 && detail.process && detail.process.length"
          >
            <div
              class="liucheng-items"
              :class="detail.process.length <= 6 ? 'liucheng-item3' : 'liucheng-item4'"
              v-for="(item, index) in detail.process"
              :key="index"
            >
              <div class="liucheng-circle">
                <div class="liucheng-inner">
                  <span class="liucheng-title">{{ item.title }}</span>
                </div>
              </div>
              <div class="liucheng-jt">
                <div class="img-box">
                  <img src="@img/other/ico-liucheng.png" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="page-block block-fangan">
          <div class="detail-title">解决方案</div>
          <div class="detail-title-line"></div>
          <div class="fangan-list" v-if="detail.fangan && detail.fangan.length">
            <div class="fangan-item" v-for="(item, index) in detail.fangan" :key="index">
              <div class="fangan-title">
                <span class="title-line"></span>
                <div class="fangan-text">
                  {{ item.title }}
                </div>
                <span class="title-line"></span>
              </div>
              <div class="fangan-desc">
                {{ item.jianjie }}
              </div>
            </div>
          </div>
        </div> -->

        <div class="page-block block-fangan">
          <div class="detail-title">解决方案</div>
          <div class="detail-title-line"></div>
          <!-- <div class="fangan-list">
            <div class="fangan-ctx" v-html="detail.solution"></div>
          </div> -->

          <div
            class="fangan-box"
            :class="{ dingzhi: detail.channelId == 1, daice: detail.channelId == 2 }"
          >
            <div class="fangan-ctx" v-html="detail.solution"></div>
          </div>
        </div>

        <div class="page-block block-anli">
          <div class="detail-title">案例展示</div>
          <div class="detail-title-line"></div>
          <!-- <div class="anli-list" v-if="detail.anli && detail.anli.length">
            <div class="anli-item" v-for="(item, index) in detail.anli" :key="index">
              <div class="img-box scale-box">
                <img :src="item.originalPic" alt="" class="scale-img" />
              </div>
              <div class="info-box">
                <div class="title">{{ item.title }}</div>
                <div class="en-title">{{ item.subtitle }}</div>
              </div>
            </div>
          </div> -->

          <!-- 修改案例为富文本形式 -->
          <div class="anli-ctx">
            <div class="anli-rich" v-html="anli_content"></div>
          </div>
        </div>

        <div id="xunjia"></div>

        <LiuyanForm />
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
      anli_content: "",

      activeIndex: 0,
      timer_highlight: null,
    };
  },
  computed: {
    ...mapState(["serviceIcons"]),

    service_info() {
      let info = "";
      this.service_cates.forEach((level1) => {
        if (level1.skill) {
          if (!info) {
            info = level1.skill.find((v) => v.skill_id == this.$route.params.id);
          }
        }
      });

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
      this.anli_content = "";
      //定制服务详情
      this.$api("skill_info", {
        skill_id: this.$route.params.id,
      }).then((res) => {
        this.detail = res.data;

        if (res.data.anli) {
          if (res.data.anli.length) {
            this.anli_content = res.data.anli[0].content;
          }
        }

        if (this.detail.process && this.detail.process.length) {
          this.hightLight();
        }
        //console.log("定制服务详情", res.data);
      });
    },

    toggleHighlightItem(index, item) {
      this.clearHightlight();
      this.activeIndex = index;
      this.hightLight();
    },

    clearHightlight() {
      clearInterval(this.timer_highlight);
      this.timer_highlight = null;
    },
    hightLight() {
      // this.$nextTick(() => {
      this.timer_highlight = setInterval(() => {
        if (this.activeIndex + 1 == this.detail.process.length) {
          this.activeIndex = 0;
        } else {
          this.activeIndex++;
        }
      }, 3000);
      // });
    },
  },
};
</script>

<style scoped lang="less">
@font-face {
  font-family: "numberFont";
  src: url("~@/assets/font/font.ttf");
}

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

.liucheng-box {
  margin-top: 80px;
  padding-top: 80px;
  background: url(~@img/tech-bg.jpg) no-repeat;
  background-size: 100% 100%;

  .liucheng-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: @width;
    margin: 0 auto;
    padding: 80px 0;

    .liucheng-item {
      .flex-center();
      width: 25%;
      cursor: pointer;
      // padding-right: 40px;

      // &:hover {
      //   .number {
      //     color: #ea3200;
      //   }
      // }

      &.active {
        .number {
          color: #ea3200;
        }
      }
    }

    .liucheng-title {
      font-size: 24px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;

      .number {
        font-size: 200px;
        font-family: numberFont;
        font-weight: 400;
        color: #d3d3d3;
        transition: 0.35s linear;
      }
    }

    .liucheng-desc {
      padding-left: 25px;

      .img-box {
        img {
          height: 62px;
        }
      }

      .title {
        margin-top: 25px;
        font-size: 18px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
    }
  }

  .liucheng-list3 {
    padding-left: 260px !important;
    padding-right: 150px !important;
  }

  .liucheng-lists {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: @width;
    margin: 0 auto;
    padding: 80px 0;
    padding-left: 104px;

    .liucheng-item3 {
      width: 33.33%;
    }

    .liucheng-item3:last-child .liucheng-jt {
      display: none;
    }

    .liucheng-item3:nth-child(3n) .liucheng-jt {
      display: none;
    }

    .liucheng-item4 {
      width: 25%;
    }

    .liucheng-item4:nth-child(4n) .liucheng-jt {
      display: none;
    }

    .liucheng-items {
      .flex();

      cursor: pointer;
      margin-bottom: 56px;
      // padding-right: 40px;

      .liucheng-circle {
        width: 215px;
        height: 215px;
        background: #ffffff;
        border-radius: 50%;
        border: 5px solid rgba(234, 50, 0, 0.2);
        .flex-center();

        .liucheng-inner {
          width: 185px;
          height: 185px;
          background: #ffffff;
          border-radius: 50%;
          border: 2px solid rgba(234, 50, 0, 0.2);
          .flex-center();

          .liucheng-title {
            width: 120px;
            text-align: center;
            font-size: 16px;
            color: #333333;
            line-height: 28px;
          }
        }
      }
    }

    .liucheng-jt {
      padding-left: 36px;

      .img-box {
        img {
          height: 40px;
        }
      }

      .title {
        margin-top: 25px;
        font-size: 18px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
    }
  }
}

.block-fangan {
  padding: 80px 0 80px;

  .dingzhi {
    .fangan-ctx {
      padding-top: 50px;

      /deep/ table {
        border-collapse: collapse;
        width: 100%;
        font-size: 16px;
        font-family: SourceHanSansSC-Regular-, SourceHanSansSC-Regular;
        font-weight: normal;
        color: #333333;
        line-height: 48px;

        tr {
          border: 1px solid #aaa;
        }

        td {
          border: 1px solid #aaa;
        }

        // td {
        //   width: 50%;

        //   img {
        //     width: 100%;
        //     height: auto;
        //   }
        // }

        // td:last-child {
        //   padding: 50px;
        // }
      }

      /deep/ img {
        // width: 100%;
        height: auto !important;
        max-width: 100% !important;
        width: auto !important;
        display: block !important;
        margin: 0 auto;
      }
    }
  }

  .daice {
    .fangan-ctx {
      padding-top: 50px;

      /deep/ table {
        border-collapse: collapse;
        width: 100%;
        font-size: 16px;
        font-family: SourceHanSansSC-Regular-, SourceHanSansSC-Regular;
        font-weight: normal;
        color: #333333;
        line-height: 48px;

        td {
          border: 1px solid #ddd;
          padding: 0 20px;

          img {
          }
        }

        td:last-child {
        }
      }
    }
  }

  .fangan-list {
    .flex();
    flex-wrap: wrap;

    .fangan-item {
      margin-top: 32px;
      margin-right: 32px;
      width: 445px;
      min-height: 330px;
      padding: 60px 40px;
      background: #ffffff;
      box-shadow: 0px 0px 54px 1px rgba(18, 42, 81, 0.1);
      border-radius: 0px 0px 0px 0px;
      cursor: pointer;

      &:nth-child(3n) {
        margin-right: 0;
      }

      &:nth-child(-n + 3) {
        margin-top: 0;
      }

      &:hover {
        background: #ea3200;

        .fangan-text {
          color: #fff !important;
        }

        .title-line {
          background: #fff !important;
        }

        .fangan-desc {
          color: #fff !important;
        }
      }

      .fangan-title {
        .flex-center();

        .fangan-text {
          text-align: center;
          min-width: 6em;
          margin: 0 20px;
          font-size: 20px;
          font-family: SourceHanSansSC-Regular-, SourceHanSansSC-Regular;
          font-weight: normal;
          color: #333333;
        }

        .title-line {
          width: 115px;
          width: 100px;
          height: 1px;
          background: #333333;
        }
      }

      .fangan-desc {
        margin-top: 50px;
        font-size: 14px;
        font-family: SourceHanSansSC-Regular-, SourceHanSansSC-Regular;
        font-weight: normal;
        color: #333333;
        line-height: 32px;
      }
    }
  }
}

.block-anli {
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

      &:nth-child(3n) {
        margin-right: 0;
      }

      &:nth-child(-n + 3) {
        margin-top: 0;
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
        height: 86px;
        padding: 15px;

        .title {
          .line-1();
          font-size: 22px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }

        .en-title {
          margin-top: 5px;
          .line-1();
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #ea3200;
        }
      }
    }
  }
}

.anli-rich {
  padding-top: 40px;
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
</style>

<style scoped lang="less" src="@/assets/h5css/page/technologyService.less"></style>
