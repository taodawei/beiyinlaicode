<template>
  <div class="page">
    <pageProductIndexTop />

    <div class="page-box">
      <div class="page-inner">
        <div class="page-block block-chanpin">
          <div class="detail-title">产品类型</div>
          <div class="detail-title-line"></div>

          <div class="leixing-list">
            <router-link
              :to="'/productCates?id=' + item.id"
              class="leixing-item"
              v-for="(item, index) in view_product_cates"
              :key="index"
            >
              <div class="img-box">
                <img :src="item.originalPic" alt="" class="icon-default" />
                <img :src="item.ext_originalPic" alt="" class="icon-active" />
              </div>
              <div class="info-box">
                <div class="title">{{ item.title }}</div>
                <div class="desc-box">
                  <div class="desc">{{ item.miaoshu }}</div>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <div class="page-block">
          <div class="detail-title">实验室工具及耗材</div>
          <div class="detail-title-line"></div>

          <div class="leixing-list">
            <router-link
              :to="item.route"
              class="leixing-item"
              v-for="(item, index) in haocai_cates"
              :key="index"
            >
              <div class="img-box">
                <img :src="item.originalPic" alt="" class="icon-default" />
                <img :src="item.ext_originalPic" alt="" class="icon-active" />
              </div>
              <div class="info-box">
                <div class="title">{{ item.title }}</div>
                <div class="desc-box">
                  <div class="desc">{{ item.miaoshu }}</div>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <div class="zhuanti-box">
          <div class="detail-title">
            <!-- 外泌体 -->
            产品专题
          </div>
          <div class="detail-title-line"></div>

          <!-- <div class="zhuanti-list">
            <div class="zhuanti-item" v-for="(item, index) in 3" :key="index">
              <div class="img-box">
                <img src="@img/demo/demo-mianyi.jpg" alt="" />
              </div>
              <div class="info-box">
                <div class="zhuanti-title">根瘤起始类蛋白转录因子调控豆科植物根瘤中的豆血红蛋白基因的表达</div>
                <div class="zhuanti-desc">了解更多 <img src="@img/wenxian-arrow-right-active.png" alt="" /></div>
              </div>
            </div>
          </div> -->

          <!-- 专题轮播 -->
          <div class="zhuanti-list-wrap">
            <div class="zhuanti-list-inner">
              <button class="arrow swiper-arrow zhuanti-arrow-left">
                <img src="@img/product-arrow-left.png" alt="" class="img-default" />
                <img src="@img/product-arrow-left-active.png" alt="" class="img-active" />
                <img
                  src="@img/product-arrow-left-disabled.png"
                  alt=""
                  class="img-disabled"
                />
              </button>
              <button class="arrow swiper-arrow zhuanti-arrow-right">
                <img src="@img/product-arrow-right.png" alt="" class="img-default" />
                <img
                  src="@img/product-arrow-right-active.png"
                  alt=""
                  class="img-active"
                />
                <img
                  src="@img/product-arrow-right-disabled.png"
                  alt=""
                  class="img-disabled"
                />
              </button>

              <div class="swiper-container swiper-zhuanti">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="(item, index) in zhuanti_cates"
                    :key="index"
                  >
                    <div class="inner-box">
                      <router-link :to="item.route" class="zhuanti-item">
                        <div class="img-box scale-box">
                          <img src="@img/zhuanti-demo.jpg" alt="" class="scale-img" />
                        </div>
                        <div class="info-box">
                          <div class="zhuanti-title">{{ item.title }}</div>
                          <div class="zhuanti-desc">
                            了解更多
                            <img src="@img/wenxian-arrow-right-active.png" alt="" />
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="page-block block-lingyu">
          <div class="detail-title">研究领域</div>
          <div class="detail-title-line"></div>

          <div class="lingyu-list">
            <router-link
              :to="'/productField?id=' + item.id"
              class="lingyu-item"
              v-for="(item, index) in lingyu_cates"
              :key="index"
            >
              <div class="img-box">
                <img :src="item.originalPic" alt="" class="icon-default" />
                <img :src="item.ext_originalPic" alt="" class="icon-active" />
              </div>
              <div class="info-box">
                <div class="title">{{ item.title }}</div>
              </div>
            </router-link>
          </div>
        </div> -->

        <div class="page-block block-lingyu">
          <div class="detail-title">研究领域</div>
          <div class="detail-title-line"></div>

          <div class="lingyu-list">
            <router-link
              :to="'/productField?id=' + item.id"
              class="lingyu-item"
              v-for="(item, index) in lingyu_cates"
              :key="index"
            >
              <div class="img-box">
                <img :src="item.originalPic" alt="" class="icon-default" />
                <img :src="item.ext_originalPic" alt="" class="icon-active" />
              </div>
              <div class="info-box">
                <div class="title">{{ item.title }}</div>
              </div>
            </router-link>
          </div>
        </div>

        <div class="wenxian-box">
          <div class="detail-title">文献引用</div>
          <div class="detail-title-line"></div>

          <!-- 文献引用 -->
          <div class="wenxian-list-wrap" v-if="group_list_wenxian.length">
            <div class="wenxian-list-inner">
              <!-- <img src="@img/product-arrow-left.png" alt="" class="arrow wenxian-arrow-left" />
              <img src="@img/product-arrow-right.png" alt="" class="arrow wenxian-arrow-right" /> -->

              <button class="arrow swiper-arrow wenxian-arrow-left">
                <img src="@img/product-arrow-left.png" alt="" class="img-default" />
                <img src="@img/product-arrow-left-active.png" alt="" class="img-active" />
                <img
                  src="@img/product-arrow-left-disabled.png"
                  alt=""
                  class="img-disabled"
                />
              </button>
              <button class="arrow swiper-arrow wenxian-arrow-right">
                <img src="@img/product-arrow-right.png" alt="" class="img-default" />
                <img
                  src="@img/product-arrow-right-active.png"
                  alt=""
                  class="img-active"
                />
                <img
                  src="@img/product-arrow-right-disabled.png"
                  alt=""
                  class="img-disabled"
                />
              </button>

              <div class="swiper-container swiper-wenxian">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="(group, index) in group_list_wenxian"
                    :key="index"
                  >
                    <div class="inner-box">
                      <div class="wenxian-list">
                        <a
                          target="_blank"
                          :href="item.url"
                          class="wenxian-item"
                          v-for="(item, index) in group"
                          :key="index"
                        >
                          <div class="title">
                            <div class="text">
                              {{ item.title }}
                            </div>
                          </div>
                          <div class="info-box">
                            <div class="info-item">
                              <span class="label">发表： </span>
                              <span class="text"
                                >{{ item.pubTime && item.pubTime.substr(0, 4) }}年
                              </span>
                            </div>
                            <div class="info-item">
                              <span class="label">杂志： </span>
                              <span class="text zazhi">{{ item.journal }} </span>
                            </div>
                            <div class="info-item">
                              <span class="label">应用： </span>
                              <span class="text">- </span>
                            </div>
                            <div class="info-item">
                              <span class="label">IF ： </span>
                              <span class="text">{{ item.factor }} </span>
                            </div>
                            <div class="info-item">
                              <span class="label">物种：</span>
                              <span class="text">-</span>
                            </div>
                            <div class="info-item">
                              <span class="label">PMID：</span>
                              <span class="text">{{ item.pmid }}</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="swiper-pagination"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperOptions, Pagination, Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";

import { mapState } from "vuex";

export default {
  name: "create-order",
  components: {},
  data() {
    return {
      is_h5: false,
      is_pad: false,
      swiper_zhuanti: null,
      swiper_wenxian: null,

      // list_zhuanti: [],
      list_wenxian: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],

      count: 0,
      pagination: {
        page: 1,
        pagenum: 20,
      },

      group_list_wenxian: [],
    };
  },
  computed: {
    ...mapState([""]),

    view_product_cates() {
      return this.product_cates.filter((v) => v.is_show);
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
    this.setMobileInfo();

    this.setView();
  },

  methods: {
    setMobileInfo() {
      let device_width =
        document && document.documentElement && document.documentElement.clientWidth;
      this.is_h5 = device_width <= 1365;
      this.is_pad = device_width <= 1365 && device_width >= 768;

      //console.log("Index is_h5", this.is_h5);
    },
    setView() {
      //专题
      this.init_swiper_zhuanti();

      let items_length = 4;

      if (this.is_h5) {
        items_length = 1;
      }

      if (this.is_pad) {
        items_length = 4;
      }

      //文献
      let start = "";
      let end = "";
      this.$api("paper_brand", {
        // id: this.$route.query.id,
        ...this.pagination,
        start: start,
        end: end,
      }).then((res) => {
        //console.log("paper_brand 文献查询", res);

        if (res.data.length) {
          let group_list_wenxian = [];
          res.data.forEach((v, i) => {
            let group_index = Math.floor(i / items_length);
            if (!group_list_wenxian[group_index]) {
              group_list_wenxian[group_index] = [];
            }

            group_list_wenxian[group_index].push(v);
          });

          // //console.log('文献分组数据', group_list_wenxian)
          this.group_list_wenxian = group_list_wenxian;
        }

        this.list_wenxian = res.data;
        this.count = res.count;
        this.init_swiper_wenxian();
      });
    },

    init_swiper_zhuanti() {
      var that = this;
      let list = this.zhuanti_cates || [];
      if (
        document &&
        document.documentElement &&
        document.documentElement.querySelector(".swiper-zhuanti") &&
        list.length
      ) {
        //console.log("专题 满足swiper 初始化条件 1");
        Swiper.use([Pagination, Navigation]);

        //推荐产品轮播图
        this.swiper_zhuanti = new Swiper(".swiper-zhuanti", {
          loop: false,
          slidesPerView: !this.is_h5 ? 3 : 1,
          slidesPerGroup: 3,
          spaceBetween: 30,
          // pagination: {
          //   el: ".swiper-pagination",
          // },
          navigation: {
            nextEl: ".zhuanti-arrow-right",
            prevEl: ".zhuanti-arrow-left",
          },

          on: {
            slideChange(swiper) {
              // //console.log("监视切换", { ...swiper });
              // //console.log("分组", swiper.snapIndex);
              // that.active_swiper_index = swiper.snapIndex;
            },
          },
        });
      } else {
        //console.log("专题 不满足swiper 初始化条件 2");
        setTimeout(() => {
          this.init_swiper_zhuanti();
        }, 100);
      }
    },

    //文献引用

    init_swiper_wenxian() {
      var that = this;

      let list = this.list_wenxian;
      if (
        document &&
        document.documentElement &&
        document.documentElement.querySelector(".swiper-wenxian") &&
        list.length
      ) {
        //console.log("文献 swiper");
        Swiper.use([Pagination, Navigation]);

        //推荐产品轮播图
        this.swiper_zhuanti = new Swiper(".swiper-wenxian", {
          loop: false,
          slidesPerView: !this.is_h5 ? 1 : 1,
          // slidesPerGroup: 3,
          spaceBetween: 5,
          // slidesPerView: 2,
          // grid: {
          //   fill: "column",
          //   rows: 2,
          // },

          pagination: {
            el: ".swiper-pagination",
          },
          navigation: {
            nextEl: ".wenxian-arrow-right",
            prevEl: ".wenxian-arrow-left",
          },

          on: {
            slideChange(swiper) {
              // //console.log("监视切换", { ...swiper });
              // //console.log("分组", swiper.snapIndex);
              // that.active_swiper_index = swiper.snapIndex;
            },
          },
        });
      } else {
        //console.log("文献 不满足swiper 初始化条件 2");
        setTimeout(() => {
          this.init_swiper_wenxian();
        }, 100);
      }
    },
  },
};
</script>

<style scoped lang="less">
.swiper-arrow {
  background: transparent;
  img {
    width: 72px;
    display: block;
  }

  .img-default {
  }
  .img-active {
    display: none;
  }
  .img-disabled {
    display: none;
  }

  &:not(:disabled):hover {
    .img-default {
      display: none;
    }
    .img-active {
      display: block;
    }
  }
}

.page {
  .page-box {
    background: #f7f7f7;
    // background: #fff;
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

.leixing-list {
  margin-top: 64px;
  .flex();
  flex-wrap: wrap;
  .leixing-item {
    width: calc((100% - 66px) / 3);
    height: 133px;
    margin-right: 33px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    border: 1px solid #e5e5e5;
    padding: 20px;
    background: #fff;
    transition: 0.3s;

    &:nth-child(3n) {
      margin-right: 0;
    }

    &:hover {
      background: @theme;
      .icon-default {
        display: none !important;
      }
      .icon-active {
        display: block !important;
      }

      .title {
        color: #fff !important;
      }
      .desc {
        color: #fff !important;
      }
    }

    .img-box {
      img {
        width: 72px;
        height: 72px;

        &.icon-active {
          display: none;
        }
      }
    }
    .info-box {
      padding-left: 27px;
      .title {
        font-size: 18px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #666666;
      }
      .desc {
        .line-2();
        margin-top: 16px;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        line-height: 32px;
      }
    }
  }
}

// 专题
.zhuanti-box {
  margin-top: 80px;
  padding-top: 80px;
  padding-bottom: 80px;
  // background: url(~@img/tech-bg.jpg);
  background: #fff;

  .zhuanti-list {
    display: flex;
    flex-wrap: wrap;
    width: @width;
    margin: 0 auto;
    padding: 50px 0;

    .zhuanti-item {
      overflow: hidden;
      margin-right: 33px;
      width: 443px;
      height: 371px;
      background: #ffffff;
      box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.16);
      border-radius: 0px 0px 0px 0px;

      &:nth-child(3n) {
        margin-right: 0;
      }

      .img-box {
        img {
          width: 445px;
          height: 251px;
        }
      }

      .info-box {
        padding: 15px 20px;
        .zhuanti-title {
          .line-2();
          font-size: 16px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          line-height: 28px;
          height: 55px;
        }
        .zhuanti-desc {
          .flex();
          margin-top: 10px;
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #ea3200;

          img {
            width: 26px;
            margin-left: 10px;
          }
        }
      }
    }
  }
}

.zhuanti-list-inner {
  width: @width;
  margin: 0 auto;
  position: relative;

  .arrow {
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translate(0, -50%);
    width: 72px;
    height: 72px;
    cursor: pointer;
    background: transparent;
  }

  .zhuanti-arrow-left {
    left: -100px;
  }

  .zhuanti-arrow-right {
    right: -100px;
  }
}

.swiper-zhuanti {
  padding: 10px 2px;

  .zhuanti-item {
    display: block;
    overflow: hidden;
    // margin-right: 33px;
    width: 100%;
    height: 371px;
    background: #ffffff;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.16);
    border-radius: 0px 0px 0px 0px;

    &:nth-child(3n) {
      margin-right: 0;
    }

    .img-box {
      width: 100%;
      height: 251px;
      img {
        width: 100%;
        height: 251px;
      }
    }

    .info-box {
      padding: 15px 20px;
      .zhuanti-title {
        .line-2();
        font-size: 16px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        line-height: 28px;
        height: 55px;
      }
      .zhuanti-desc {
        .flex();
        margin-top: 10px;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #ea3200;

        img {
          width: 26px;
          margin-left: 10px;
        }
      }
    }
  }
}

.block-lingyu {
  padding: 80px 0;
  background: #f5f5f5;

  .lingyu-list {
    overflow: hidden;
    // display: flex;
    // flex-wrap: wrap;
    .lingyu-item {
      float: left;
      .flex-center();
      flex-direction: column;
      width: 223px;
      height: 221px;
      margin-right: 13px;
      margin-bottom: 13px;
      background: #ffffff;
      border-radius: 0px 0px 0px 0px;
      border: 1px solid #e5e5e5;
      transition: 0.3s;

      &:nth-child(1) {
        width: 456px;
        height: 455px;
      }
      &:nth-child(5) {
        margin-right: 0;
      }
      &:nth-child(9) {
        margin-right: 0;
      }

      &:hover {
        background: @theme;
        .icon-default {
          display: none !important;
        }
        .icon-active {
          display: block !important;
        }

        .title {
          color: #fff !important;
        }
        .desc {
          color: #fff !important;
        }
      }

      .img-box {
        img {
          width: 56px;

          &.icon-default {
            display: block;
          }
          &.icon-active {
            display: none;
          }
        }
      }
      .info-box {
        margin-top: 12px;
        .title {
          font-size: 16px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #000000;
        }
      }
    }
  }
}

// 文献
.wenxian-box {
  background: #fff;
  padding: 80px 0;
  .wenxian-list {
    padding-top: 40px;
    width: @width;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  }
}

.wenxian-list-inner {
  width: @width;
  margin: 0 auto;
  position: relative;

  .arrow {
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translate(0, -50%);
    width: 72px;
    height: 72px;
    cursor: pointer;
  }

  .wenxian-arrow-left {
    left: -100px;
  }

  .wenxian-arrow-right {
    right: -100px;
  }
}

/deep/ .swiper-pagination-bullet-active {
  background: @theme;
}

.swiper-wenxian {
  padding: 10px 2px;
  padding-bottom: 40px;
}

.wenxian-item {
  width: 680px;
  min-height: 204px;
  margin-right: 32px;
  margin-bottom: 25px;
  background: #ffffff;
  border-radius: 0px 0px 0px 0px;
  border: 1px solid #e6e6e6;

  &:nth-child(2n) {
    margin-right: 0;
  }

  &:hover {
    .title {
      color: @theme;
    }
  }

  .title {
    padding: 15px 25px;
    height: 80px;
    background: #f7f7f7;
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    line-height: 28px;
    .text {
      .line-2();
    }
  }
  .info-box {
    padding: 24px;
    display: flex;
    flex-wrap: wrap;

    .info-item {
      .flex();
      width: 50%;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      line-height: 28px;

      &:nth-child(2n + 1) {
        width: 40%;
      }
      &:nth-child(2n) {
        width: 60%;
      }

      .label {
        display: inline-block;
        min-width: 60px;
      }
      .text {
        .line-1();

        &.zazhi {
          font-size: 12px;
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/products.less"></style>
