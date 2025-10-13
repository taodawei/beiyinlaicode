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
          <a href="javascirpt:void(0);">产品文献引用</a>
          <!-- <span class="bread-divider">&gt;</span>
          <router-link to="/">{{ activeCate.title }}</router-link> -->
        </div>
      </div>
    </div>

    <div class="page-box">
      <div class="page-inner">
        <!-- <div class="total-box">共{{ count }}条数据</div> -->

        <div class="ctx-box">
          <div class="ctx-left">
            <div class="filter-search">
              <div class="filter-title">
                <div class="text">文献快速搜索</div>
              </div>

              <div class="top-search-box">
                <div class="top-search">
                  <input type="text" placeholder="搜索关键字" class="input-keyword" />
                  <img src="@img/product-search.png" alt="" />
                </div>
              </div>
            </div>

            <!-- 筛选 -->
            <div class="filter-box">
              <div class="filter-title">
                <div class="text">条件筛选</div>
                <button class="action" @click="allReset">全部清除</button>
              </div>
              <div class="filter-items">
                <div
                  class="filter-item"
                  v-for="(group, group_index) in group_list"
                  :key="group_index"
                >
                  <div class="item-title">
                    <!-- <img src="@img/sanjiao.png" alt="" /> -->
                    <div class="text-box" @click="itemExpand(item)">
                      <span class="sanjiao"></span>
                      <span class="text"> {{ group.title }} </span>
                    </div>
                    <button class="action" @click="groupReset(group)">重置</button>
                  </div>

                  <div class="sub-child" v-if="group.child && group.child.length">
                    <div class="search-box">
                      <input
                        v-model="group.keyword"
                        type="text"
                        class="input-keyword"
                        placeholder="搜索关键字"
                        :class="{ active: keyword.length }"
                      />
                      <img
                        src="@img/search-clear.png"
                        alt=""
                        class="img-clear"
                        @click="inputClear(group)"
                      />
                      <img
                        src="@img/product-search.png"
                        alt=""
                        class="img-search"
                        @click="inputSearch()"
                      />
                    </div>
                    <div
                      class="sub-item"
                      v-for="(item, index) in group.child"
                      :key="index"
                      @click="toggleCheck(item)"
                      :class="{ checked: checked_tag.includes(item.title) }"
                    >
                      <img src="@img/check-0.png" alt="" class="img-check check-0" />
                      <img src="@img/check-1.png" alt="" class="img-check check-1" />
                      <span
                        >{{ item.title }}
                        <!-- (12449) -->
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ctx-right">
            <div class="top-title">文献引用</div>

            <div class="bottom-list">
              <div class="wenxian-list">
                <div
                  class="wenxian-item"
                  v-for="(item, index) in wenxian_list"
                  :key="index"
                >
                  <div class="wenxian-title">
                    <div class="text">
                      <a :href="item.url" target="_blank">
                        {{ item.title }}
                      </a>
                    </div>
                    <div class="number-box">
                      <div class="number-item">
                        PMID: <span>{{ item.pmid }}</span>
                      </div>
                      <div class="number-item">
                        IF: <span class="number">{{ item.factor }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="wenxian-desc" v-if="item.summary">
                    {{ item.summary }}
                  </div>
                  <div class="wenxian-source">
                    发表于 《{{ item.journal }}》 {{ item.pubTime }}
                  </div>
                  <div class="wenxian-other" v-if="false">
                    <div class="other-item jiyin">
                      <div class="label">基因ID：</div>
                      <div class="val">2154</div>
                    </div>
                    <div class="other-item wuzhong">
                      <div class="label">物种：</div>
                      <div class="val">Mus musculus</div>
                    </div>
                    <div class="other-item yingyong">
                      <div class="label">应用：</div>
                      <div class="val">WB、IF</div>
                    </div>
                    <div class="other-item chanpin">
                      <div class="label">应用产品：</div>
                      <div class="val">
                        产品标题 [ <span class="product-code">A00001</span> ]
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="pagination-box" style="margin-top: 40px">
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
  name: "products-document",
  components: {},
  data() {
    return {
      count: 0,
      pagination: {
        page: 1,
        pagenum: 10,
      },
      keyword: "",
      wenxian_list: [],
      checked_tag: [],
    };
  },
  computed: {
    ...mapState([""]),

    childDates() {
      return [
        {
          title: "2023",
          id: "",
          start: "2023-01-01",
          end: "2023-12-31",
          checked: false,
        },
        {
          title: "2022",
          id: "",
          start: "2022-01-01",
          end: "2022-12-31",
          checked: false,
        },
        {
          title: "2021",
          id: "",
          start: "2021-01-01",
          end: "2021-12-31",
          checked: false,
        },
      ];
    },

    group_list() {
      let group_list = [
        {
          title: "时间",
          child: this.childDates,
        },
        // {
        //   title: "产品类型",
        //   child: [
        //     {
        //       title: "类型1",
        //       id: "",
        //     },
        //     {
        //       title: "类型2",
        //       id: "",
        //     },
        //   ],
        // },
        // {
        //   title: "应用",
        //   child: [
        //     {
        //       title: "应用1",
        //       id: "",
        //     },
        //     {
        //       title: "应用2",
        //       id: "",
        //     },
        //   ],
        // },
        // {
        //   title: "物种",
        //   child: [
        //     {
        //       title: "物种1",
        //       id: "",
        //     },
        //     {
        //       title: "物种2",
        //       id: "",
        //     },
        //   ],
        // },
      ];

      return group_list;
    },
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
    changePage(page) {
      //console.log("page", page);
      this.pagination.page = page;
      this.setView();

      document.documentElement.scrollTop = 0;
    },
    setView() {
      let times = [];
      if (this.checked_tag.length) {
        this.checked_tag.forEach((title) => {
          let info = this.childDates.find((v) => v.title == title) || {};
          let arr = [info.start, info.end];
          times.push(...arr);
        });
      }

      let start = "";
      let end = "";
      if (times.length) {
        times.sort();
      }

      start = times[0] || "";
      end = times[times.length - 1] || "";

      this.$api("paper_brand", {
        // id: this.$route.query.id,
        ...this.pagination,
        start: start,
        end: end,
      }).then((res) => {
        //console.log("paper_brand 文献查询", res);
        this.wenxian_list = res.data;
        this.count = res.count;
      });
      // this.$api("paper_sku", {
      //   // id: this.$route.query.id,
      // }).then((res) => {
      //   //console.log("paper_sku 文献查询", res);
      //   // this.curr = res.data;
      // });
    },

    itemExpand(item) {
      //console.log({ ...item });
      item.expand = !item.expand;
    },
    itemReset(item) {},
    inputClear(group) {
      group.keyword = "";
      this.setView();
    },
    inputSearch(item) {
      this.setView();
    },
    toggleCheck(item) {
      // item.checked = !item.checked;
      let index = this.checked_tag.findIndex((v) => v == item.title);

      if (index >= 0) {
        this.checked_tag.splice(index, 1);
      } else {
        this.checked_tag.push(item.title);
      }

      this.setView();
    },

    //筛选重置
    groupReset(group) {
      this.checked_tag = [];
      this.setView();
    },

    //全部清除
    allReset() {
      this.checked_tag = [];
      this.setView();
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
    padding-top: 32px;

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

    .input-keyword {
      padding: 0 10px;
      &::-webkit-input-placeholder {
        font-size: 12px;
        color: #cccccc;
        padding: 0 5px;
      }
    }

    .filter-search {
      background: #fafbfc;
      border: 1px solid #ebeef5;

      .top-search-box {
        padding: 20px;
      }
      .top-search {
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
    }

    .filter-box {
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
        // visibility: hidden;

        // &.child {
        //   visibility: visible;
        //   cursor: pointer;
        // }

        &:hover {
          border-color: @theme;
        }
      }

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
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #606266;

          .text-box {
            .flex();
            cursor: pointer;

            &:hover {
              color: @theme;

              .sanjiao {
                border-color: @theme;
              }
            }
          }
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

              &.active:focus {
                & + .img-clear {
                  display: block !important;
                }
              }
            }

            .img-search {
              position: absolute;
              z-index: 10;
              top: 50%;
              right: 10px;
              transform: translate(0, -50%);
              cursor: pointer;
            }

            .img-clear {
              position: absolute;
              z-index: 10;
              top: 50%;
              right: 35px;
              transform: translate(0, -50%);
              cursor: pointer;
              display: none;
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
            transition: 0.3s;

            &:hover {
              background: #eee;
            }

            &.checked {
              .check-0 {
                display: none;
              }
              .check-1 {
                display: block;
              }
            }

            img {
              width: 13px;
              margin-right: 5px;
              &.check-0 {
                display: block;
              }
              &.check-1 {
                display: none;
              }
            }
          }
        }
      }
    }

    .cate-box {
      margin-top: 30px;
      background: #fafbfc;
      border: 1px solid #ebeef5;

      .cate-items {
        .cate-item {
          border-bottom: 1px solid #ebeef5;
        }

        .cate-title {
          .flex();
          height: 43px;
          padding: 0 23px;

          img {
            margin-right: 10px;
          }
          span {
          }
        }

        .cate-child {
          margin: 0 20px;
          padding: 10px 20px;
          border-top: 1px solid #ebeef5;

          .child-item {
            margin-bottom: 5px;
            line-height: 28px;
            font-size: 12px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #808080;
          }
        }
      }
    }
  }
  .ctx-right {
    flex: 1;
  }
}

.top-title {
  font-size: 16px;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}

.bottom-list {
  padding-top: 30px;
  .wenxian-item {
    margin-bottom: 25px;
    min-height: 271px;
    min-height: 211px;
    padding: 28px 30px;
    background: #ffffff;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.16);
    border-radius: 8px 8px 8px 8px;
    opacity: 1;
    border: 1px solid #d5d8de;

    .wenxian-title {
      .flex-between();
      align-items: flex-start;

      .text {
        margin-right: 30px;
        flex: 1;
        font-size: 16px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #333333;
        line-height: 1.5;

        a {
          color: #333333;
          font-weight: bold;
          line-height: 1.5;

          &:hover {
            color: @theme;
          }
        }
      }

      .number-box {
        .flex();
        width: 240px;

        .number-item {
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #666666;
          &:first-child {
            width: 150px;
          }
          &:last-child {
            flex: 1;
          }
          .number {
            color: @theme;
          }
        }
      }
    }

    .wenxian-desc {
      .line-3();
      width: calc(100% - 250px);
      margin-top: 10px;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #999999;
      line-height: 2;
    }

    .wenxian-source {
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #999999;
      line-height: 2;
    }

    .wenxian-other {
      width: calc(100% - 220px);
      .flex();
      flex-wrap: wrap;

      .other-item {
        .flex();
        margin-top: 15px;
        width: 33.33%;

        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #383838;

        &:nth-child(4) {
          width: 100%;
        }

        .label {
          font-weight: bold;
        }
        .val {
          flex: 1;
        }

        .product-code {
          color: @theme;
        }
      }
    }
  }
}
</style>
<style scoped lang="less" src="@/assets/h5css/page/productDocument.less"></style>
