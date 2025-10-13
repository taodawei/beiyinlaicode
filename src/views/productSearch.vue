<template>
  <div class="page">
    <!-- <pageProductTop /> -->
    <div class="page-top">
      <div class="page-bread">
        <div class="bread-box">
          <img src="@img/product-home.png" alt="" />
          <router-link to="/">首页</router-link>
          <span class="bread-divider">&gt;</span>
          <router-link to="/products">产品中心</router-link>
          <span class="bread-divider">&gt;</span>
          <a href="javascirpt:void(0);">产品搜索</a>
          <!-- <span class="bread-divider">&gt;</span>
          <router-link to="/">{{ activeCate.title }}</router-link> -->
        </div>
      </div>
    </div>

    <div class="page-box">
      <div class="page-inner">
        <div class="total-box">共{{ count }}条数据</div>

        <div class="ctx-box">
          <div class="ctx-left">
            <!-- 筛选 -->
            <div class="filter-box" v-if="tiaojian_groups && tiaojian_groups.length">
              <div class="filter-title">
                <div class="text">条件筛选</div>
                <div class="action" @click="allReset">全部清除</div>
              </div>
              <div class="filter-items">
                <div
                  class="filter-item"
                  v-for="(group, index) in filter_tiaojian_groups"
                  :key="index"
                >
                  <div class="item-title" :class="group.expand ? 'expand-1' : 'expand-0'">
                    <div class="level1-text" @click="group.expand = !group.expand">
                      <img src="@img/sanjiao.png" alt="" class="img-sanjiao" />
                      <span> {{ group.title }} </span>
                    </div>
                    <button v-if="group.expand" class="action" @click="groupReset(group)">
                      重置
                    </button>
                  </div>
                  <!-- v-if="index == 0" -->
                  <div class="sub-child" v-if="group.expand">
                    <div class="search-box">
                      <input v-model="group.keyword" type="text" />
                      <img src="@img/product-search.png" alt="" />
                    </div>
                    <div
                      class="sub-item"
                      v-for="(item, sub) in group.child.filter((v) => v.is_show)"
                      :key="sub"
                      :class="{ checked: item.checked }"
                      @click="toggleItemChecked(item)"
                    >
                      <img src="@img/check-0.png" alt="" class="img-check check-0" />
                      <img src="@img/check-1.png" alt="" class="img-check check-1" />
                      <span>{{ item.title }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 分类 -->
            <div class="cate-box">
              <div class="main-title">
                <div class="text">产品类型</div>
              </div>

              <div class="cate-items" v-if="options_cates && options_cates.length">
                <div
                  class="cate-item"
                  v-for="(item, index) in options_cates"
                  :key="index"
                >
                  <!-- 1级标题 -->
                  <div
                    class="cate-title level-1"
                    :class="
                      expand_ids.includes(item.ids.join('_')) ? 'expand-1' : 'expand-0'
                    "
                  >
                    <span
                      class="sanjiao"
                      :class="{ child: item.channels && item.channels.length }"
                      @click="toggleExpand(item)"
                    ></span>
                    <a
                      href="javascript:void(0)"
                      @click="toggleLevel1(item)"
                      :to="'/productSearch?id=' + item.id"
                      :class="{ active: item.id == activeCate.id }"
                    >
                      {{ item.title }}
                    </a>
                  </div>
                  <!-- 2级列表 -->
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
                      <!-- 2级标题 -->
                      <div
                        class="cate-title level-2"
                        :class="[
                          expand_ids.includes(sub.ids.join('_'))
                            ? 'expand-1'
                            : 'expand-0',
                          { 'has-child': sub.channels && sub.channels.length },
                        ]"
                        @click="toggleExpandLevel2(sub)"
                      >
                        <span
                          class="sanjiao"
                          :class="{ child: sub.channels && sub.channels.length }"
                        ></span>
                        <a
                          href="javascript:void(0)"
                          @click="toggleLevel2(sub)"
                          :to="'/productSearch?id=' + sub.id"
                          :class="{ active: sub.id == activeCate.id }"
                          >{{ sub.title }}</a
                        >
                      </div>
                      <!-- 3级列表 -->
                      <div
                        class="cate-child"
                        :data-id="sub.id"
                        v-if="sub.channels && sub.channels.length"
                      >
                        <div
                          class="child-item"
                          v-for="(level3, level3_index) in sub.channels"
                          :key="level3_index"
                        >
                          <div class="cate-title level-3">
                            <span
                              class="sanjiao"
                              :class="{
                                child: level3.channels && level3.channels.length,
                              }"
                            ></span>

                            <a
                              href="javascript:void(0)"
                              @click="toggleLevel3(level3)"
                              :class="{ active: level3.id == activeCate.id }"
                              >{{ level3.title }}</a
                            >
                          </div>
                        </div>
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
            <div class="top-info"></div>
            <div class="bottom-list">
              <pageProductListForSearch ref="pageProductListForSearch" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

import pageProductListForSearch from "@/components/page/pageProductListForSearch.vue";
import { mapState } from "vuex";

export default {
  name: "product-search",
  components: {
    pageProductListForSearch,
  },
  data() {
    return {
      // activeCate: {},
      expand_ids: [],
      type: this.$route.query.type || "",
      count: 0,

      // 筛选项
      tiaojian_groups: [],
      tiaojian_child_all: [], //所有筛选项目
    };
  },
  computed: {
    ...mapState([""]),

    activeCate() {
      let info = {};
      if (this.$route.query.id) {
        info = this.product_cates_all.find((v) => v.id == this.$route.query.id);
        // debugger;
      }

      return info;
    },

    options_cates() {
      let options = _.cloneDeep(this.product_cates);

      if (this.$route.query.ms) {
        if (this.search_cate_id) {
          // debugger
          // let cate_item = this.product_cates_all.find((v) => v.id == this.search_cate_id);
          // let level_1_id = cate_item.ids[0];
          // console.log("当前分类", { ...cate_item });
          // options = options.filter((v) => v.id == level_1_id);

          options = options;
        } else {
          options = options;
        }
      }

      // if (this.type == 1) {
      //   options = this.haocai_cates;
      // }

      return options;
    },

    //产品分类的筛选条件
    filter_tiaojian_groups() {
      let tiaojian_groups = this.tiaojian_groups;
      tiaojian_groups.forEach((group) => {
        group.child.forEach((v) => {
          v.is_show = true;
          if (group.keyword) {
            //搜索模式下
            v.is_show = v.title.includes(group.keyword);
          }
        });
      });

      return tiaojian_groups;
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

    this.init();
    this.setView();
  },
  created() {
    if (this.$route.query.id) {
      this.search_cate_id = this.$route.query.id;
    }

    this.setView();
  },

  mounted() {},

  methods: {
    updateSelfCount(count) {
      this.count = count;
    },

    init() {
      this.expand_ids = [];

      //分类
      if (this.$route.query.id) {
        this.search_cate_id = this.$route.query.id;
      } else {
        this.search_cate_id = "";
        this.tiaojian_groups = [];
      }

      console.log("初始化 init", this.search_cate_id);
    },

    setView() {
      this.setActiveCate();

      if (this.$route.query.id) {
        //根据分类设置筛选条件
        this.$api("product_getSearch", {
          channel_id: this.$route.query.id,
        }).then((res) => {
          //console.log("当前分类筛选条件", res);
          let groups = res.data;
          let tiaojian_child_all = [];
          groups.forEach((group) => {
            group.keyword = "";
            group.expand = false;
            group.expand = true;
            group.child.forEach((v) => {
              v.checked = false;
              v.group_field_title = group.field_title;
              tiaojian_child_all.push(v);
            });
          });

          this.tiaojian_groups = groups;
          this.tiaojian_child_all = tiaojian_child_all;
        });
      }
    },

    setActiveCate() {
      if (this.product_cates_all && this.product_cates_all.length) {
        // if (this.$route.query.id) {
        // this.activeCate =
        //   this.product_cates_all.find((v) => v.id == this.$route.query.id) ||
        //   this.product_cates_all[0];

        let arr = [];
        this.product_cates_all.forEach((v) => {
          arr.push(v.ids.join("_"));
        });

        console.log("需要展开的数据 arr", arr);
        this.expand_ids = arr;
        // this.expand_ids = [...this.activeCate.ids];
        // }
      } else {
        setTimeout(() => {
          this.setActiveCate();
        }, 100);
      }
    },

    toggleExpand(item) {
      //console.log({ ...item });
      let ids = item.ids.join("_");
      let has_expand = this.expand_ids.includes(ids);
      if (has_expand) {
        let index = this.expand_ids.findIndex((v) => v == ids);
        this.expand_ids.splice(index, 1);
      } else {
        this.expand_ids.push(ids);
      }
    },

    //切换1级分类
    toggleExpandLevel2(item) {
      //console.log({ ...item });
      let ids = item.ids.join("_");
      let has_expand = this.expand_ids.includes(ids);
      if (has_expand) {
        let index = this.expand_ids.findIndex((v) => v == ids);
        this.expand_ids.splice(index, 1);
      } else {
        this.expand_ids.push(ids);
      }
    },

    //选项勾选
    toggleItemChecked(item) {
      item.checked = !item.checked;
      this.getSearchParams();
    },

    //筛选重置
    groupReset(group) {
      group.keyword = "";
      group.child.forEach((v) => {
        v.checked = false;
      });

      this.getSearchParams();
    },

    //全部清除
    allReset() {
      this.tiaojian_groups.forEach((group) => {
        group.keyword = "";
        group.expand = false;
        group.child.forEach((v) => (v.checked = false));
      });

      this.getSearchParams();
    },

    //获取筛选字段
    getSearchParams() {
      let params = {};

      let checked_list = this.tiaojian_child_all.filter((v) => v.checked);

      let checked_map = {};
      checked_list.forEach((v) => {
        let key = v.group_field_title;
        if (!checked_map[key]) {
          checked_map[key] = [];
        }

        checked_map[key].push(v.title);
      });

      for (var key in checked_map) {
        params[key] = checked_map[key].join();
      }

      //console.log("已勾选的筛选项", checked_map);
      //console.log("获取筛选字段 params", params);

      this.$refs.pageProductListForSearch.reView(params);
    },

    toggleLevel1(item) {
      let ms = new Date().getTime();
      let url =
        "/productSearch?id=" +
        item.id +
        "&ms=" +
        ms +
        "&keyword=" +
        this.$route.query.keyword;
      this.$router.push(url);
    },
    toggleLevel2(item) {
      let ms = new Date().getTime();
      let url =
        "/productSearch?id=" +
        item.id +
        "&ms=" +
        ms +
        "&keyword=" +
        this.$route.query.keyword;
      this.$router.push(url);
    },
    toggleLevel3(item) {
      let ms = new Date().getTime();
      let url =
        "/productSearch?id=" +
        item.id +
        "&ms=" +
        ms +
        "&keyword=" +
        this.$route.query.keyword;
      this.$router.push(url);
    },
  },
};
</script>

<style scoped lang="less">
.img-check {
  cursor: pointer;
  &.check-0 {
    display: block;
  }
  &.check-1 {
    display: none;
  }
}

.checked {
  cursor: pointer;
  .check-0 {
    display: none !important;
  }
  .check-1 {
    display: block !important;
  }
}

.page-top {
  position: relative;
  .page-top-banner {
    img {
      width: 100%;
    }
  }
  .page-bread {
    width: @width;
    margin: 0 auto;
    height: 44px;
    background: #f5f5f5;
    padding: 0 15px;

    .bread-box {
      height: 44px;
      display: flex;
      align-items: center;

      img {
        width: 15px;
        margin-right: 10px;
      }
      .bread-divider {
        margin: 0 10px;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
      a {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;

        &:hover {
          color: @theme;
        }
      }
    }
  }
}

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

        font-size: 1.4rem;
      }
      .action {
        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #ea3200;
        cursor: pointer;
      }
    }

    .filter-items {
      .filter-item {
        border-bottom: 1px solid #ebeef5;

        &:last-child {
          border-bottom: 0;
        }

        .expand-1 .img-sanjiao {
          transform: rotate(90deg);
          top: 3px;
        }

        .item-title {
          position: relative;
          .flex();
          height: 43px;
          padding: 0 23px;

          font-size: 1.4rem;

          .level1-text {
            .flex();
            cursor: pointer;
            user-select: none;

            &:hover {
              .img-sanjiao {
              }
            }
          }

          .img-sanjiao {
            margin-right: 10px;
            transition: 0.3s;
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
              padding: 0 15px;
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
              top: 50%;
              right: 10px;
              transform: translate(0, -50%);
              cursor: pointer;
              width: 18px;
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
            cursor: pointer;

            font-size: 1.4rem;

            &:hover {
              background: #eee;
            }

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
          left: -4px;
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

            font-size: 1.4rem;

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
        .level-2.expand-0 + .cate-child {
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
          // transition: all 0.3s ease-in-out;
          // transition: all 0.3s linear;
          height: 100%;
          overflow: hidden;

          .child-item {
            // margin-bottom: 12px;

            .level-2 {
              .flex();
              // height: 43px;
              // padding: 0 23px;

              &:first-child {
                margin-top: 0.6rem;
              }
              &:last-child {
                margin-bottom: 0.6rem;
              }

              &.has-child {
                margin-left: 10px;
              }

              & + .cate-child {
                margin-right: 0;
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

                font-size: 1.4rem;

                &.active {
                  font-weight: bold;
                }

                &:hover {
                  color: @theme;
                }
              }
            }

            .level-3 {
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
  .cate-title {
    font-size: 16px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;
  }

  .cate-other {
    margin-top: 24px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .cate-img {
      margin-right: 30px;
      width: 240px;
      height: 200px;
      .flex-center();
      border-radius: 6px 6px 6px 6px;
      border: 1px solid #e5e5e5;

      .img-box {
        width: 228px;
        height: 188px;
        border-radius: 6px;
      }

      img {
        width: 228px;
        height: 188px;
      }
    }
    .cate-desc {
      flex: 1;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      line-height: 24px;
    }
  }
}
.bottom-list {
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/productSearch.less"></style>
