<template>
  <div class="page">
    <pageAboutTop />

    <div class="page-inner">
      <div class="detail-title">获奖证书</div>
      <div class="detail-title-line"></div>
      <div class="list-box" v-if="false">
        <div class="zhengshu-list">
          <div class="zhengshu-item" v-for="(item, index) in list_cert" :key="index">
            <div class="img-box scale-box">
              <!-- <img :src="item.originalPic" alt="" class="scale-img"/> -->

              <el-image
                class="scale-img"
                style=""
                :src="item.originalPic"
                :preview-src-list="list_img"
              >
              </el-image>
            </div>
            <div class="title">{{ item.title }}</div>
          </div>
        </div>

        <div v-if="list_cert.length" class="pagination-box" style="margin-top: 40px">
          <el-pagination
            background
            @current-change="changePage"
            :current-page.sync="pagination.page"
            :page-size="pagination.page_num"
            layout="total, prev, pager, next"
            :total="count"
          ></el-pagination>
        </div>
      </div>

      <!-- 证书轮播图 -->
      <div class="lunbo-box">
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
              <img src="@img/product-arrow-right-active.png" alt="" class="img-active" />
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
                      <div
                        target="_blank"
                        :href="item.url"
                        class="wenxian-item"
                        v-for="(item, index) in group"
                        :key="index"
                      >
                        <div class="img-box">
                          <!-- <img :src="item.originalPic" alt="" class="scale-img" /> -->

                          <el-image :src="item.originalPic" :preview-src-list="images">
                          </el-image>
                        </div>
                      </div>
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
</template>

<script>
import { Swiper, SwiperOptions, Pagination, Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";

import { mapState } from "vuex";

export default {
  name: "cert",
  components: {},
  data() {
    return {
      is_h5: false,
      is_pad: false,

      list_cert: [],
      list_img: [],
      pagination: {
        page: 1,
        page_num: 100,
      },
      count: 0,

      group_list_wenxian: [],
      swiper_wenxian: null,
      images: [],
    };
  },
  computed: {
    ...mapState([""]),
  },
  watch: {},

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

    //分页
    changePage() {
      this.setView();
    },
    setView() {
      let items_length = 4;
      if (this.is_h5) {
        items_length = 1;
      }
      if (this.is_pad) {
        items_length = 4;
      }

      this.$api("index_credentials", {
        channel_id: 177,
        ...this.pagination,
      }).then((res) => {
        this.list_img = res.data.list.map((v) => v.originalPic);
        this.list_cert = res.data.list;
        this.count = res.data.count;

        let list = res.data.list;
        if (list.length) {
          let group_list_wenxian = [];

          let images = [];
          list.forEach((v, i) => {
            let group_index = Math.floor(i / items_length);
            if (!group_list_wenxian[group_index]) {
              group_list_wenxian[group_index] = [];
            }
            group_list_wenxian[group_index].push(v);
            images.push(v.originalPic);
          });
          this.images = images;
          // //console.log('文献分组数据', group_list_wenxian)
          this.group_list_wenxian = group_list_wenxian;
        }

        this.init_swiper_wenxian();
      });
    },

    //文献引用

    init_swiper_wenxian() {
      var that = this;

      let list = this.group_list_wenxian;
      if (
        document &&
        document.documentElement &&
        document.documentElement.querySelector(".swiper-wenxian") &&
        list.length
      ) {
        //console.log("文献 swiper");
        Swiper.use([Pagination, Navigation]);

        let slidesPerView = 1;

        //推荐产品轮播图
        this.swiper_zhuanti = new Swiper(".swiper-wenxian", {
          loop: false,
          slidesPerView: slidesPerView,
          // slidesPerGroup: 3,
          spaceBetween: 15,
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
.page {
  .page-inner {
    width: @width;
    margin: 0 auto;
    padding: 80px 0;

    .detail-title {
      font-size: 36px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;
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

.zhengshu-list {
  margin-top: 64px;
  .flex();
  flex-wrap: wrap;

  .zhengshu-item {
    margin-bottom: 40px;
    // margin-right: 32px;
    width: 33.33%;

    &:nth-child(3n) {
      margin-right: 0;
    }
    .img-box {
      /deep/ img {
        width: 445px;
        width: 223px;
        width: auto;
        height: 306px;
      }
    }
    .title {
      margin-top: 15px;
      font-size: 16px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #666666;
    }
  }
}

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

.lunbo-box {
  padding: 50px 0 100px;
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
  padding-bottom: 80px;
}

.wenxian-list {
  display: flex;
  align-items: center;
}
.wenxian-item {
  width: calc((100% - 100px) / 4);
  min-height: 204px;
  margin-right: 33px;
  margin-bottom: 0;
  background: #ffffff;
  border-radius: 0px 0px 0px 0px;
  border: 1px solid #e6e6e6;

  &:nth-child(4n) {
    margin-right: 0;
  }

  .img-box {
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/certificate.less"></style>
