<template>
  <div class="ctx-left">
    <div class="left-title">学习中心</div>
    <div class="navs" v-if="study_cates && study_cates.length">
      <!-- 循环体 -->
      <div class="level1" v-for="(level_1, index_1) in study_cates" :key="index_1">
        <div class="level1-title" :class="expand_ids.includes(level_1.id) ? 'expand-1' : 'expand-0'">
          <!-- <img src="@img/sanjiao.png" alt="" class="cate-sanjiao level-1-sanjiao" /> -->
          <span class="sanjiao" :class="{ child: level_1.channels && level_1.channels.length }" @click="toggleExpand(level_1)"></span>
          <router-link :to="level_1.route" :class="{ active: level_1.id == activeCate.id }">{{ level_1.title }} </router-link>
        </div>
        <div class="cate-child level2-list" v-if="level_1.channels && level_1.channels.length">
          <!-- 循环体 -->
          <div class="level2" v-for="(level_2, index_2) in level_1.channels" :key="index_2">
            <div class="level2-title" :class="expand_ids.includes(level_2.id) ? 'expand-1' : 'expand-0'">
              <!-- <img v-if="level_2.channels && level_2.channels.length" src="@img/sanjiao.png" alt="" class="cate-sanjiao level-2-sanjiao" /> -->
              <span class="sanjiao" :class="{ child: level_2.channels && level_2.channels.length }" @click="toggleExpand(level_2)"></span>
              <router-link :to="level_2.route" :class="{ active: level_2.id == activeCate.id }">{{ level_2.title }}</router-link>
            </div>
            <div class="cate-child level3-list" v-if="level_2.channels && level_2.channels.length">
              <!-- 循环体 -->
              <div class="level3" v-for="(level_3, index_3) in level_2.channels" :key="index_3">
                <div class="level3-title" :class="expand_ids.includes(level_3.id) ? 'expand-1' : 'expand-0'">
                  <!-- <img src="@img/sanjiao.png" alt="" class="cate-sanjiao level-3-sanjiao" /> -->
                  <!-- <span class="sanjiao" :class="{ child: level_2.channels && level_2.channels.length }" @click="toggleExpand(level_2)"></span> -->
                  <router-link :to="level_3.route" :class="{ active: level_3.id == activeCate.id }">{{ level_3.title }}</router-link>
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
  data() {
    return {
      list_nav: [],

      activeCate: {},
      expand_ids: [],
    };
  },
  computed: {
    ...mapState(["vuex_study_active_cate_id"]),
  },
  watch: {
    expand_ids(val) {
      //console.log("学习中心 watch expand_ids ", val);
    },
    study_cates(val) {
      //console.log("学习中心 watch study_cates ", val);
    },
    activeCate(val) {
      //console.log("学习中心 watch activeCate ", {...val});

      if(val.level == 2 && val.parentId == 864) {//资料下载2级分类
        
      }
    },

    $route(val) {
      this.setView();
    },
    // vuex_study_active_cate_id(val) {
    //   // this.expand_ids = [...val];
    //   //console.log('学习中心 watch vuex_study_active_cate_id')
    //   let all_cates = this.study_cates_all;
    //   this.activeCate = all_cates.find((v) => v.id == val) || all_cates[0];
    //   this.expand_ids = [...this.activeCate.ids];
    // },
  },

  // beforeRouteUpdate(to, from, next) {
  //   //console.log(this.$route.name, "组件复用 from", from);
  //   //console.log(this.$route.name, "组件复用 to", to);

  //   debugger
  //   next({
  //     query: to.query,
  //   });

  //   this.setView();
  // },

  created() {
    this.setView();
  },
  methods: {
    exposeSetActiveCate(id) {
      //   //console.log('学习中心 watch vuex_study_active_cate_id')
      let all_cates = this.study_cates_all;
      this.activeCate = all_cates.find((v) => v.id == id) || all_cates[0];
      this.expand_ids = [...this.activeCate.ids];
    },

    setView() {
      //console.log("设置产品分类");
      this.expand_ids = [+this.$route.query.id];
      this.setActiveCate();

      // this.$api("brand_studyChannel").then((res) => {
      //   //console.log("产品中心分类", res);
      //   this.list_nav = res.data;
      // });
    },

    setActiveCate() {
      let all_cates = this.study_cates_all;
      // debugger
      if (all_cates && all_cates.length) {
        this.activeCate = all_cates.find((v) => v.id == this.$route.query.id) || all_cates[0];

        // if (this.vuex_tech_expand_ids && this.vuex_tech_expand_ids.length) {
        //   this.expand_ids = [...this.vuex_tech_expand_ids];
        // } else {

        // }

        this.expand_ids = [...this.activeCate.ids];

        //console.log("activeCate", { ...this.activeCate });
      } else {
        setTimeout(() => {
          this.setActiveCate();
        }, 200);
      }
    },

    toggleExpand(item) {
      //console.log({ ...item });
      //console.log("切换展示 expand_ids prev", [...this.expand_ids]);

      let has_expand = this.expand_ids.includes(item.id);
      if (has_expand) {
        let index = this.expand_ids.findIndex((id) => id == item.id);
        // this.expand_ids.splice(index, item.id);
        this.expand_ids = [...this.expand_ids.slice(0, index)];
      } else {
        this.expand_ids = [...item.ids];
      }

      //console.log("切换展示 expand_ids new", [...this.expand_ids]);

      // var $target = document.querySelector('.cate-child[data-id="' + item.id + '"]');
      // if (!has_expand) {
      //   if ($target) {
      //     var rect = $target.getBoundingClientRect();
      //     //console.log("toggleExpand rect", rect);
      //     var height = rect.height;
      //     $target.style.height = height + "px";
      //   }
      // }

      // setTimeout(() => {
      // }, 200);
    },

    //设置指定节点高度
    setCateChildHeightById(id) {
      return;

      var node = document.querySelector('.cate-child[data-id="' + id + '"]');
      if (node) {
        setTimeout(() => {
          var rect = node.getBoundingClientRect();
          var height = rect.height;
          node.style.height = height + "px";
        }, 100);
      }
    },
  },
};
</script>

<style lang="less" scoped>
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

.navs {
  padding: 0;

  .expand-1 .sanjiao {
    transform: rotate(90deg);
    top: 3px;
  }
  .sanjiao {
    margin-right: 5px;
    position: relative;
    top: 0;
    width: 0;
    height: 0;
    border: 5px solid #666;
    border-top-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    cursor: pointer;
    transition: 0.3s;
    visibility: hidden;

    &.child {
      visibility: visible;
      cursor: pointer;
    }

    &:hover {
      border-color: @theme;
    }
  }

  .expand-0 + .cate-child {
    height: 0 !important;
    padding-top: 0;
    padding-bottom: 0;
    // border-top: none;
  }
  .cate-child {
    transition: all 0.3s linear;
    height: 100%;
    overflow: hidden;
  }

  .level1 {
    border-top: 1px solid #ebeef5;
    padding-left: 20px;

    &:first-child {
      border-top: none;
    }

    .level1-title {
      .flex();
      padding-left: 0;
      border-bottom: 1px solid #ebeef5;
      height: 43px;
      line-height: 43px;
      font-size: 14px;

      color: #606266;

      .level-1-sanjiao {
        // width: 20px;
        margin-right: 5px;
      }

      a {
        font-size: 14px;
        color: #606266;
        &.active {
          font-weight: bold;
          color: @theme;
        }

        &:hover {
          color: @theme;
        }
      }
    }
    .level2-list {
      .level2 {
        &:first-child {
          margin-top: 6px;
        }
        &:last-child {
          margin-bottom: 6px;
        }

        .level2-title {
          .flex();
          padding-left: 10px;
          line-height: 28px;
          font-size: 12px;
          color: #808080;

          .level-2-sanjiao {
            // width: 20px;
            margin-right: 5px;
          }
          a {
            font-size: 12px;
            color: #606266;

            &.active {
              font-weight: bold;
              color: @theme;
            }

            &:hover {
              color: @theme;
            }
          }
        }

        .level3-list {
          .level3 {
          }
          .level3-title {
            .flex();
            padding-left: 43px;
            // padding-left: 20px;
            font-size: 12px;
            line-height: 30px;

            color: #808080;

            .level-3-sanjiao {
              // width: 20px;
              margin-right: 5px;
            }
            a {
              font-size: 12px;
              color: #606266;

              &.active {
                font-weight: bold;
                color: @theme;
              }

              &:hover {
                color: @theme;
              }
            }
          }
        }
      }
    }
  }
}
</style>
