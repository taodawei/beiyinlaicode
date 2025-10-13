<template>
  <div class="page">
    <pageProductTop />

    <div class="page-box">
      <div class="page-inner">
        <div class="total-box">共54545条数据</div>

        <div class="ctx-box">
          <div class="ctx-left">
            <!-- 筛选 -->
            <div class="filter-box" v-if="false">
              <div class="filter-title">
                <div class="text">条件筛选</div>
                <div class="action">全部清除</div>
              </div>
              <div class="filter-items">
                <div class="filter-item" v-for="(item, index) in 6" :key="index">
                  <div class="item-title">
                    <img src="@img/sanjiao.png" alt="" />
                    <span> 反应物种 </span>
                    <button class="action">重置</button>
                  </div>
                  <div class="sub-child" v-if="index == 0">
                    <div class="search-box">
                      <input type="text" />
                      <img src="@img/product-search.png" alt="" />
                    </div>
                    <div class="sub-item" v-for="(item, sub) in 6" :key="sub">
                      <img src="@img/check-0.png" alt="" />
                      <span>Human(12449)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 分类 -->
            <div class="cate-box">
              <div class="main-title">
                <div class="text">{{ type == 1 ? "仪器耗材中心" : "仪器耗材中心" }}</div>
                <!-- <div class="action">全部清除</div> -->
              </div>
              <div class="cate-items" v-if="options_cates && options_cates.length">
                <div
                  class="cate-item"
                  v-for="(item, index) in options_cates"
                  :key="index"
                >
                  <div
                    class="cate-title level-1"
                    :class="expand_ids.includes(item.id) ? 'expand-1' : 'expand-0'"
                  >
                    <!-- <img src="@img/sanjiao.png" alt="" class="cate-sanjiao" :class="{ child: item.channels && item.channels.length }" @click="toggleExpand(item)" /> -->
                    <span
                      class="sanjiao"
                      :class="{ child: item.channels && item.channels.length }"
                      @click="toggleExpand(item)"
                    ></span>
                    <router-link
                      :to="item.route"
                      :class="{ active: item.id == activeCate.id }"
                    >
                      {{ item.title }}
                    </router-link>
                  </div>
                  <div
                    class="cate-child"
                    :data-id="item.id"
                    v-if="item.channels && item.channels.length"
                  >
                    <div
                      class="child-item"
                      v-for="(sub, index) in item.channels"
                      :key="index"
                    >
                      <div class="cate-title level-2">
                        <!-- <img src="@img/sanjiao.png" alt="" class="cate-sanjiao" :class="{ child: sub.channels && sub.channels.length }" /> -->
                        <span
                          class="sanjiao"
                          :class="{ child: sub.channels && sub.channels.length }"
                        ></span>
                        <router-link
                          :to="sub.route"
                          :class="{ active: sub.id == activeCate.id }"
                          >{{ sub.title }}</router-link
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ctx-right">
            <!-- <div class="top-info">
              <div class="cate-title">{{ activeCate.title }}</div>
              <div class="cate-other">
                <div class="cate-img">
                  <div class="img-box scale-box">
                    <img :src="activeCate.miaoshu_originalPic" alt="" class="scale-img" />
                  </div>
                </div>
                <div class="cate-desc">
                  {{ activeCate.miaoshu }}
                </div>
              </div>
            </div> -->

            <div class="top-info" v-if="activeCate.title">
              <div class="cate-other">
                <div class="cate-img">
                  <div class="img-box scale-box">
                    <img :src="activeCate.miaoshu_originalPic" alt="" class="scale-img" />
                  </div>
                </div>
                <div class="cate-info">
                  <div class="cate-title">
                    <div class="text">{{ activeCate.title }}</div>
                    <div class="line"></div>
                  </div>
                  <div class="cate-desc">
                    {{ activeCate.miaoshu }}
                  </div>
                </div>
              </div>
            </div>

            <div class="bottom-list">
              <pageProductList ref="pageProductList" />
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
  name: "product-cates",
  components: {},
  data() {
    return {
      show_fixed_compare: false,
      activeCate: {},
      expand_ids: [],
      type: this.$route.query.type || "",

      product_list: [
        {
          id: 1,
          checked: true,
        },
        {
          id: 2,
          checked: false,
        },
      ],
    };
  },
  computed: {
    ...mapState([""]),

    options_cates() {
      let options = this.haocai_cates;
      if (this.type == 1) {
        options = this.haocai_cates;
      }

      return options;
    },
  },
  watch: {},

  beforeRouteUpdate(to, from, next) {
    //console.log(this.$route.name, "组件复用 from", from);
    //console.log(this.$route.name, "组件复用 to", to);

    this.type = to.query.type || "";

    next({
      query: to.query,
    });

    this.setView();
  },
  created() {
    this.setView();
  },

  mounted() {
    this.setCateChildHeight();
  },

  methods: {
    updateSelfCount(count) {
      this.count = count;
    },

    setView() {
      this.expand_ids = [+this.$route.query.id];
      // //console.log('this.expand_ids', this.expand_ids)
      this.setActiveCate();

      // this.$api("product_plist", {
      //   channel_id: this.$route.query.id,
      // }).then((res) => {
      //   this.list_product = res.data;
      //   //列表根据后台产品的多少，来控制使用哪一种列表形式，如果产品数量少用图文的，产品数量多 用表格的

      //   this.setCateChildHeight();
      // });
    },

    //设置子节点高度
    setCateChildHeight() {
      return;

      var $nodes = document.querySelectorAll(".cate-child");
      // var $target =
      if ($nodes.length) {
        $nodes.forEach((node) => {
          var rect = node.getBoundingClientRect();
          //console.log("toggleExpand rect", rect);
          var height = rect.height;
          if (rect.height >= 30) {
            node.style.height = height + "px";
          }
        });
      } else {
        setTimeout(() => {
          this.setCateChildHeight();
        }, 200);
      }
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

    setActiveCate() {
      if (this.product_cates_all && this.product_cates_all.length) {
        //实验耗材
        if (this.type == 1) {
          this.activeCate =
            this.haocai_cates_all.find((v) => v.id == this.$route.query.id) ||
            this.haocai_cates_all[0];
        } else {
          //产品分类
          this.activeCate =
            this.haocai_cates_all.find((v) => v.id == this.$route.query.id) ||
            this.haocai_cates_all[0];
        }
        //console.log("activeCate", { ...this.activeCate });

        this.expand_ids = [+this.activeCate.id, +this.activeCate.parentId];
      } else {
        setTimeout(() => {
          this.setActiveCate();
        }, 100);
      }
    },

    toggleExpand(item) {
      //console.log({ ...item });

      let has_expand = this.expand_ids.includes(item.id);
      if (has_expand) {
        let index = this.expand_ids.findIndex((id) => id == item.id);
        this.expand_ids.splice(index, item.id);
      } else {
        this.expand_ids.push(item.id);

        this.setCateChildHeightById(item.id);
      }

      //console.log("切换展示", [...this.expand_ids]);

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
  },
};
</script>

<style scoped lang="less">
.page {
  padding-top: 32px;
  .page-box {
    background: #f7f7f7;
    background: #fff;
  }
  .page-inner {
    width: @width;
    margin: 0 auto;
    padding: 20px 0;
    padding-bottom: 80px;
    text-align: left;

    .page-block {
      width: @width;
      margin: 0 auto;
    }
  }
}

.total-box {
  margin-bottom: 32px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: #808080;
}

.ctx-box {
  display: flex;
  align-items: flex-start;

  .ctx-left {
    margin-right: 40px;
    width: 260px;

    .filter-box {
      margin-bottom: 30px;
      background: #fafbfc;
      border: 1px solid #ebeef5;
    }

    .filter-title,
    .main-title {
      height: 44px;
      padding: 0 20px;
      .flex-between();
      border-bottom: 1px solid #ebeef5;

      .text {
        font-size: 14px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #333333;
      }
      .action {
        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #ea3200;
      }
    }

    .filter-items {
      .filter-item {
        border-bottom: 1px solid #ebeef5;

        &:last-child {
          border-bottom: 0;
        }
        .item-title {
          position: relative;
          .flex();
          height: 43px;
          padding: 0 23px;
          img {
            margin-right: 10px;
          }
          span {
          }

          .action {
            position: absolute;
            right: 20px;
            background: transparent;
            font-size: 12px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #ea3200;
          }
        }

        .sub-child {
          margin: 0 20px;
          padding: 10px 0px;
          border-top: 1px solid #ebeef5;

          .search-box {
            position: relative;
            margin-bottom: 10px;
            input {
              width: 100%;
              height: 100%;
              // width: 200px;
              height: 32px;
              background: #ffffff;
              border-radius: 4px 4px 4px 4px;
              border: 1px solid #b8c4d1;
            }

            img {
              position: absolute;
              z-index: 10;
              top: 7px;
              right: 10px;
              cursor: pointer;
            }
          }

          .sub-item {
            .flex();
            margin-bottom: 5px;
            line-height: 28px;
            font-size: 12px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #808080;

            img {
              width: 13px;
              margin-right: 5px;
            }
          }
        }
      }
    }

    .cate-box {
      background: #fafbfc;
      border: 1px solid #ebeef5;

      .cate-items {
        .cate-item {
          border-bottom: 1px solid #ebeef5;
        }
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
          border: 6px solid #666;
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

        .level-1 {
          .flex();
          height: 43px;
          padding: 0 23px;

          .cate-sanjiao {
            margin-right: 10px;
            visibility: hidden;

            &.child {
              visibility: visible;
              cursor: pointer;
            }
          }

          a {
            font-size: 14px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #666666;

            &.active {
              font-weight: bold;
            }

            &:hover {
              color: @theme;
            }
          }
        }

        .level-1.expand-0 + .cate-child {
          height: 0 !important;
          padding-top: 0;
          padding-bottom: 0;
          // border-top: none;
        }

        .cate-child {
          margin: 0 20px;
          padding: 10px 20px;
          padding: 0 2px;
          border-top: 1px solid #ebeef5;
          transition: all 0.3s ease-in-out;
          transition: all 0.3s linear;
          height: 100%;
          overflow: hidden;

          .child-item {
            // margin-bottom: 12px;

            .level-2 {
              .flex();
              // height: 43px;
              // padding: 0 23px;

              &:first-child {
                margin-top: 6px;
              }
              &:last-child {
                margin-bottom: 6px;
              }

              .cate-sanjiao {
                margin-right: 10px;
                visibility: hidden;

                &.child {
                  visibility: visible;
                  cursor: pointer;
                }
              }
              a {
                display: block;
                width: fit-content;
                line-height: 24px;
                font-size: 12px;
                font-family: Microsoft YaHei-Regular, Microsoft YaHei;
                font-weight: 400;
                color: #808080;

                &.active {
                  font-weight: bold;
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
  .ctx-right {
    flex: 1;
  }
}

.top-info {
  padding-bottom: 50px;

  .cate-other {
    // margin-top: 24px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .cate-img {
      width: 200px;
      height: 200px;
      .flex-center();
      border-radius: 6px 6px 6px 6px;
      border: 1px solid #e5e5e5;

      .img-box {
        width: 188px;
        height: 188px;
        border-radius: 6px;
      }

      img {
        width: 188px;
        height: 188px;
      }
    }

    .cate-info {
      width: calc(100% - 240px);
      margin-left: 40px;

      .cate-title {
        width: fit-content;
        font-size: 16px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        .text {
          width: fit-content;
          font-size: 18px;
          font-family: Microsoft YaHei-Bold, Microsoft YaHei;
          font-weight: bold;
          color: #333333;
        }

        .line {
          margin-top: 5px;
          width: 36px;
          width: 100%;
          height: 3px;
          background: #ea3200;
          border-radius: 3px 3px 3px 3px;
        }
      }

      .cate-desc {
        margin-top: 22px;
        // flex: 1;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        line-height: 30px;
      }
    }
  }
}

.bottom-list {
}

.product-list {
  padding-top: 50px;
  .product-item {
    .flex-between();
    margin-bottom: 24px;
    height: 288px;
    background: #ffffff;
    border-radius: 0px 0px 0px 0px;
    border: 1px solid #e3e3e3;
    padding: 25px;

    &:hover {
      box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.16);
    }

    .product-left {
      .title {
        margin-bottom: 10px;
        font-size: 18px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #333333;
      }
      .biaoqian {
        img {
          height: 24px;
        }
      }
      .shuoming {
        margin: 10px 0;
        .flex();

        .shuoming-item {
          .flex();
        }
      }

      .tags {
        .flex();

        .tag {
          margin-right: 10px;
          text-align: center;
          width: 32px;
          height: 18px;
          line-height: 18px;
          background: #ea3200;
          border-radius: 3px 3px 3px 3px;

          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
        }
      }

      .text-box {
        .flex();

        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #808080;

        line-height: 24px;

        .label {
          min-width: 55px;
        }
        .val {
        }
      }
    }
    .product-right {
      .img-box {
        img {
          width: 184px;
          height: 184px;
        }
      }
      .duibi-box {
        margin-top: 20px;
        .flex-center();
        width: 184px;
        height: 40px;
        background: #f5f5f5;

        img {
          width: 13px;
          margin-right: 10px;
        }
        span {
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #666666;
        }
      }
    }
  }
}

// 信息列表
.info-list {
  .title-item {
    height: 50px;
    background: linear-gradient(180deg, #ea3200 0%, #fe6927 100%) !important;
    .item {
      font-size: 14px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold !important;
      color: #ffffff !important;
    }
  }
  .info-item {
    height: 48px;
    .flex();

    &:nth-child(2n + 1) {
      background: #f0f2f5;
    }

    .item {
      flex: 1;
      text-align: center;
    }
  }
}

// 底部对比功能
.fixed-compare {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 280px;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.2);

  .fixed-close {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 16px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #ea3200;
    cursor: pointer;
  }

  .compare-inner {
    width: @width;
    margin: 0 auto;
    padding: 43px 0;
    .flex-between();

    .compare-list {
      display: flex;
      flex-wrap: wrap;

      .compare-item {
        .flex-center();
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        margin-right: 40px;
        margin-top: 40px;
        width: 348px;
        height: 85px;
        padding: 20px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #e5e5e5;
        text-align: left;

        &:nth-child(3n) {
          margin-right: 0;
        }
        &:nth-child(-n + 3) {
          margin-top: 0;
        }

        .close-box {
          position: absolute;
          right: 10px;
          top: 10px;
          font-size: 20px;
          cursor: pointer;
        }
      }
    }

    .action-box {
      .btn-box-clear {
        margin-top: 24px;
      }
      .btn-compare {
        width: 180px;
        height: 44px;
        background: #ea3200;
        border-radius: 4px 4px 4px 4px;
        font-size: 16px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
      }

      .btn-clear {
        width: 180px;
        height: 44px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #ea3200;
        font-size: 16px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #ea3200;
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/productApparatusesCates.less"></style>
