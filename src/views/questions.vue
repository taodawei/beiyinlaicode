<template>
  <div class="page">
    <pageTechTop />

    <div class="page-box">
      <div class="page-inner">
        <div class="page-block block-chanpin">
          <div class="detail-title">FAQ</div>
          <div class="detail-title-line"></div>
          <div class="tabs">
            <div
              :class="{
                'tab-item': true,
                active: item.channel_id == active_cate.channel_id,
              }"
              v-for="(item, index) in cate_list"
              :key="index"
              @mouseover="mouseoverCate(item)"
              @click="$router.push(`/questionscate?id=${item.channel_id}`)"
            >
              {{ item.title }}
            </div>
          </div>

          <div class="ques-list">
            <div
              class="ques-item"
              v-for="(item, index) in active_cate.child"
              :key="index"
              :class="{ expand: expand_ids.includes(item.id) }"
            >
              <div class="ques-title" @click="expandQues(item)">
                <div class="text">Q{{ index + 1 }}：{{ item.question }}</div>
                <div class="img-box">
                  <!-- <img src="@img/ques-plus.png" alt="" class="expand expand-0" /> -->
                  <!-- <img src="@img/ques-minus.png" alt="" class="expand expand-1" /> -->
                  <span class="expand-marker expand-0">+</span>
                  <span class="expand-marker expand-1">-</span>
                </div>
              </div>
              <div class="ques-anwser">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </div>

        <div class="page-block block-buzhou">
          <div class="detail-title">实验步骤</div>
          <div class="detail-title-line"></div>

          <div class="buzhou-list">
            <a
              class="buzhou-item"
              v-for="(item, index) in buzhou_list"
              :key="index"
              @click="download_pdf(item)"
              :href="item.download"
              target="_blank"
            >
              <div class="title">{{ item.title }}</div>
              <div class="img-box">
                <img src="@img/step-download.png" alt="" />
                下载附件
              </div>
            </a>
          </div>
        </div>

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
      cate_list: [],
      active_cate: {},

      list_sheng: [],

      expand_ids: [], //展开项目
      buzhou_list: [],
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
      //技术问题
      this.$api("brand_faqChannel", {
        id: this.$route.query.id,
      }).then((res) => {
        //console.log("技术中心  技术问题 分类+问答", res);
        this.cate_list = res.data.channels;

        res.data.channels.forEach((level1, index) => {
          if (level1.child && level1.child.length) {
            level1.child.forEach((item, child_index) => {
              item.expand = false;
              if (child_index == 0) {
                item.expand = true;

                this.expand_ids.push(item.id);
              }
            });
          }
        });

        this.active_cate = res.data.channels[0] || {};
      });

      //实验步骤

      this.$api("brand_stepList", {
        channel_id: this.$route.query.id || "",
      }).then((res) => {
        //console.log("技术中心  技术问题 实验步骤", res);
        this.buzhou_list = res.data;
      });
    },

    expandQues(item) {
      let has_expand = this.expand_ids.find((id) => id == item.id);

      //console.log({ ...item });
      //console.log(has_expand);
      if (has_expand) {
        let index = this.expand_ids.findIndex((id) => id == item.id);
        this.expand_ids.splice(index, 1);
      } else {
        this.expand_ids.push(item.id);
      }
    },

    mouseoverCate(item) {
      //console.log("鼠标悬浮");
      this.active_cate = item;
    },

    download_pdf(item) {
      // if (item.url) {
      //   window.open(item.url, "_blank");
      // }
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
    padding: 80px 0;
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

.tabs {
  margin-top: 64px;
  display: flex;
  justify-content: center;
  .tab-item {
    text-align: center;
    margin-left: 10px;
    width: 192px;
    height: 42px;
    line-height: 42px;
    background: #f4f4f4;
    border-radius: 4px 4px 4px 4px;
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    cursor: pointer;

    &:first-child {
      margin-left: 0;
    }

    &.active {
      background: #ea3200;
      color: #fff;
    }
  }
}

// 问题列表
.ques-list {
  padding-top: 32px;
  .ques-item {
    margin-bottom: 15px;
    &.expand {
      .ques-title {
        background: @theme !important;
        .text {
          color: #fff !important;
        }

        .img-box {
          .expand-0 {
            display: none !important;
          }
          .expand-1 {
            display: block !important;
            color: #fff !important;
          }
        }
      }

      .ques-anwser {
        padding: 25px;
        height: auto !important;
      }
    }

    .ques-title {
      padding: 0 25px;
      height: 50px;
      background: #f4f4f4;
      transition: 0.3s;
      .flex-between();
      cursor: pointer;

      &:hover {
        background: @theme;
        color: #fff;

        .text {
          color: #fff;
        }
      }

      .text {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
      .img-box {
        width: 25px;
        .expand-marker {
          width: 16px;
          text-align: center;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;

          &.expand-0 {
            display: block;
          }
          &.expand-1 {
            display: none;
          }
        }
      }
    }

    .ques-anwser {
      padding: 0 25px;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      line-height: 32px;
      height: 0 !important;
      overflow: hidden;
      transition: all 0.3s ease-in-out;

      &.shown {
      }
    }
  }
}

// 步骤列表
.buzhou-list {
  padding-top: 40px;
  display: flex;
  flex-wrap: wrap;

  .buzhou-item {
    .flex-between();
    width: 692px;
    height: 50px;
    padding: 0 25px;
    margin-right: 16px;
    margin-bottom: 16px;
    background: #f4f4f4;
    border-radius: 0px 0px 0px 0px;
    cursor: pointer;
    transition: 0.3s;

    &:nth-child(2n) {
      margin: 0;
    }

    &:hover {
      background: #eee;
    }

    .title {
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #333333;
    }
    .img-box {
      .flex-center();
      cursor: pointer;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #666666;

      img {
        margin-right: 5px;
      }
    }
  }
}

// 文献
.block-buzhou {
  padding-bottom: 80px;
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/questions.less"></style>
