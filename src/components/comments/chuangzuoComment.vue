<template>
  <div class="list-wrap">
    <div class="pinglun-list">
      <div
        class="pinglun-item"
        v-for="(item, index) in list_comment"
        :key="index"
      >
        <div class="avatar">
          <img :src="item.images || defaultAvatar" />
        </div>
        <div class="pinglun-content">
          <div class="top">
            <span class="name">{{ item.user_nmme }}</span>
            <span style="margin-left: 10px">评论了您的作品</span>
            <span class="date">{{ item.created_at | getFormatTime }}</span>
          </div>
          <div class="center">
            <div class="center-left has-emoji" v-html="item.content"></div>
          </div>

          <!-- 回复评论 -->
          <div class="bottom">
            <span class="wenzhang" @click="onClick_wenzhang(item)">{{
              "<< " + item.record_title + " >>"
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import QRCode from "qrcodejs2";
import { mapState } from "vuex";

export default {
  name: "",
  components: {},
  props: ["list_comment", "activeTab"],
  data() {
    return {
      list: [],
      total: 0,

      id: "", //记录id
      huifu_id: "", //要回复的记录id
      huifu_content: "", //要回复的内容
    };
  },
  computed: {
    ...mapState(["list_biaoqing", "defaultAvatar"]),
  },
  watch: {},
  created() {
    this.setView();
  },

  methods: {
    setView() {
      // this.query_list();
    },

    //查看文章

    onClick_wenzhang(item) {
      //console.log({ ...item }, this.activeTab);

      if (this.activeTab == "主题评论") {
        const { href } = this.$router.resolve({
          name: `writeDetail`,
          query: { id: item.record_id },
        });
        window.open(href, "_blank");
      } else if (this.activeTab == "文章评论") {
        const { href } = this.$router.resolve({
          name: `writeDetail`,
          query: { id: item.record_id, mode: "news" },
        });
        window.open(href, "_blank");
      }
    },

    //展开回复
    onClick_huifu(item) {
      if (item.id == this.huifu_id) {
        this.huifu_id = "";
        return;
      }
      this.huifu_content = "";
      this.huifu_id = item.id;
      this.id = item.record_id;
    },

    //评论点赞
    on_support(item) {
      this.$store
        .dispatch("support", {
          record_id: item.id,
          type: 3, //1主题2观点3评论
        })
        .then((res) => {
          let { code, data, message } = res.data;
          //console.log("点赞", { ...data });
      
          if (code == 0) {
          }
        });
    },

    //提交回复
    onSubmit_huifu() {
      this.$store
        .dispatch("comment", {
          record_id: this.id,
          content: this.huifu_content,
          type: 1, //1主题2观点
          parent_id: this.huifu_id, //回复评论的id
        })
        .then((res) => {
          let { code, data, message } = res.data;
          //console.log("回复内容", { ...data });

          if (code == 0) {
            this.huifu_id = "";
            this.huifu_content = "";
          }
        });
    },
  },
};
</script>


<style scoped lang="less">
.huifu-list {
  margin-top: 30px;
  background-color: #eee;
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 20px;
}

.pinglun-list {
  .pinglun-item {
    padding-bottom: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;

    &:last-child {
      border-bottom: none;
    }

    .avatar {
      margin-right: 18px;
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
    }
    .pinglun-content {
      flex: 2;
      .top {
        .name {
          height: 13px;
          font-size: 15px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #444444;
          line-height: 14px;
        }
        .date {
          margin-left: 20px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #adadad;
          line-height: 14px;
        }
      }
      .center {
        text-align: left;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;

        .center-left {
          font-size: 15px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #666666;
        }
        .center-right {
          min-width: 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #a2a2a2;
          img {
            width: 30px;
            cursor: pointer;
          }
          .dianzan {
            display: flex;
            align-items: center;
            img {
              margin-right: 10px;
            }
          }
        }
      }
      .bottom {
        margin-top: 20px;
        color: #aaa;
        .wenzhang {
          &:hover {
            color: @theme;
            cursor: pointer;
          }
        }

        .huifu-box {
          margin-top: 30px;

          /deep/ textarea {
            background: #f3f3f3;
          }
        }
        .huifu-btn-box {
          margin-top: 20px;
          text-align: right;
          button {
            min-width: 110px;
            height: 43px;
            background: #eeeeee;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
</style>
