<template>
  <div class="page-index">
    <div class="inner-content">
      <div class="inner">
        <div class="index-top-video">
          <div class="video-mask"></div>

          <!-- <video
            muted
            loop
            autoplay
            :src="webConfig.index_video"
            poster="@img/home-top.jpg"
            controlsList="nodownload"
          ></video> -->

          <div id="dplayer">
            <img v-if="is_h5 || is_pad" :src="video_poster" alt="" class="video-poster" />
          </div>
        </div>

        <div class="section-search">
          <div class="main-title">“茵”科研而生，为健康而“莱”</div>
          <div class="search-wrap center-search">
            <div class="left-select">
              <el-select v-model="selectCate" placeholder="">
                <el-option
                  v-for="item in options_product_cates"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div class="search-box">
              <input
                v-model="keyword"
                type="text"
                placeholder="请输入要搜索的关键词"
                @keyup.enter="toSearch"
              />
              <button @click="toSearch">
                <img class="img-search" src="@img/home-search.png" alt="" />
              </button>
            </div>
          </div>
          <div class="hot-words">
            热卖产品：
            <!-- <router-link :to="'/productCates?keyword=' + item" class="words" v-for="(item, index) in hotSearchWords" :key="index">
              {{ item }}
            </router-link> -->
            <a
              :href="item.url"
              target="_blank"
              class="words"
              v-for="(item, index) in index_hotSearchWords"
              :key="index"
            >
              {{ item.title }}
            </a>
          </div>
        </div>

        <!-- 主营业务 -->
        <div class="section-yewu">
          <div class="section-title">
            <div class="section-left">主营业务</div>
            <router-link to="/products" class="section-right hover-link">
              <div class="text">更多产品</div>
              <img class="arrow" src="@img/home-more.png" alt="" />
            </router-link>
          </div>

          <div class="section-ctx">
            <!-- :style="{'background-image': `url('~@img/cate-bg.jpg')`}" -->
            <div
              class="main-poster"
              @click="$router.push('/productCates?id=' + active_cate.id)"
            >
              <div
                class="poster-box img-bg-ani"
                :style="{ 'background-image': `url('${active_cate.backimg}')` }"
              ></div>

              <div class="info-box">
                <div class="cate-title">
                  {{ active_cate.title }}
                </div>
                <div class="cate-desc-box">
                  <div class="cate-desc">
                    {{ active_cate.miaoshu }}
                  </div>
                </div>

                <div class="cate-btn">
                  <router-link
                    class="btn-ripple"
                    :to="'/productCates?id=' + active_cate.id"
                  >
                    <span>探索详情</span>
                    <img src="@img/arrow-right-t.png" alt="" />
                  </router-link>
                </div>
              </div>
            </div>
            <div class="main-cates">
              <div
                class="cate-item"
                v-for="(item, index) in index_show_cates"
                :key="index"
                :class="{ active: item.id == active_cate.id }"
                @click="clickCate(item, index)"
                @mouseover="toggleCate(item, index)"
              >
                <img :src="item.originalPic" alt="" class="cate-img cate-img-0" />
                <img :src="item.ext_originalPic" alt="" class="cate-img cate-img-1" />
                <div class="title">
                  {{ item.title }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 广告 -->
        <!-- <div class="adv-box">
          <img src="@img/home-adv.jpg" alt="" />
        </div> -->

        <!--1  顶部banner 分类  -->
        <div class="banner-box">
          <div class="lunbo-wrap">
            <div class="lunbo-box">
              <el-carousel trigger="click" :autoplay="true">
                <el-carousel-item
                  v-for="(item, index) in index_banners"
                  :key="index"
                  @click.native="bannerClick(item)"
                >
                  <!-- <img :src="item.image" /> -->
                  <img :src="item.image" alt="" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>

        <!-- 文献收录与精选 -->
        <div class="section-wenxian">
          <div class="section-title">
            <div class="section-left">文献收录与精选</div>
            <router-link to="/productDocument" class="section-right hover-link">
              <div class="text">更多文献</div>
              <img class="arrow" src="@img/home-more.png" alt="" />
            </router-link>
          </div>

          <div class="section-ctx">
            <!-- <div class="wenxian-list">
              <router-link to="" class="wenxian-item" v-for="(item, index) in 4" :key="index">
                <img src="@img/demo/wenxian.png" alt="" class="wenxian-img" />
                <div class="wenxian-title">
                  {{ "新冠疫苗在患有高血压、糖尿病老年人群中免疫原性与安全性数据发布数据发 全性数据发布" }}
                </div>
              </router-link>
            </div> -->

            <div class="swiper-container swiper-wenxian" v-if="list_wenxian.length">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(item, index) in list_wenxian"
                  :key="index"
                >
                  <!-- @click="$router.push(`/goodsDetail/${item.inventoryId}?mid=${item.mid}`)" -->
                  <div class="inner-box">
                    <a target="_blank" :href="item.url" class="wenxian-item">
                      <div class="img-box scale-box">
                        <img
                          :src="item.originalPic"
                          alt=""
                          class="wenxian-img scale-img"
                        />
                      </div>
                      <div class="wenxian-title-box">
                        <div class="wenxian-title">
                          {{ item.title }}
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="wenxian-fenye">
              <div class="fenye-left">
                <div class="arrow-left hover-link" @click="swiperSlidePrev">
                  <img
                    v-if="active_swiper_index == 0"
                    src="@img/wenxian-arrow-left.png"
                    alt=""
                    class="img-0"
                  />
                  <img
                    v-else
                    src="@img/wenxian-arrow-left-active.png"
                    alt=""
                    class="img-1"
                  />
                </div>
                <div class="arrow-center"></div>
                <div class="arrow-right hover-link" @click="swiperSlideNext">
                  <img
                    v-if="active_swiper_index == group_length - 1"
                    src="@img/wenxian-arrow-right.png"
                    alt=""
                    class="img-0"
                  />
                  <img
                    v-else
                    src="@img/wenxian-arrow-right-active.png"
                    alt=""
                    class="img-1"
                  />
                </div>
              </div>

              <div class="fenye-center"></div>

              <div class="fenye-right">
                <span class="page-curr">{{ active_swiper_index + 1 }}</span>
                <span class="page-divider">/</span>
                <span class="page-total">{{ group_length }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DPlayer from "dplayer";

import { Swiper, SwiperOptions, Pagination, Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";

import { mapState } from "vuex";

export default {
  name: "index",
  components: {},
  data() {
    return {
      is_h5: false,
      is_pad: false,
      index_timer: null,
      video_dp: null,
      video_poster: require("@img/home-top.jpg"),
      // selectCate: 853,
      selectCate: "",

      keyword: "",
      // active_cate: {},
      active_cate_index: 0,

      activeBannerIndex: 0,
      pagination: {
        page: "1",
        pagenum: "20",
      },
      list_news: [],
      list_wenxian: [],

      active_swiper_index: 0,
      swiper_wenxian: null,
      group_length: 1,

      index_show_cates: [],
    };
  },
  computed: {
    ...mapState(["hotSearchWords", "index_banners"]),

    index_hotSearchWords() {
      let arr = [];

      if (this.hotSearchWords && this.hotSearchWords.length) {
        this.hotSearchWords.forEach((v) => {
          let info = { ...v };
          if (info.inventory_id) {
            info.url = `/goodsDetail/` + info.inventory_id;
          }
          arr.push(info);
        });
      }

      return arr;
    },

    active_cate() {
      return this.index_show_cates[this.active_cate_index] || {};
    },

    options_product_cates() {
      if (!this.product_cates.length) {
        return [
          {
            title: "抗体",
            id: 853,
          },
        ];
      } else {
        return [
          {
            id: "",
            title: "所有产品",
          },
          ...this.product_cates,
        ];
      }
    },
  },

  watch: {},

  created() {
    this.setMobileInfo();

    this.setView();
  },

  mounted() {
    this.setHeaderTheme();
    this.watchPageScroll();
    this.mobileToggleCate();

    this.initVideo();
  },

  beforeDestroy() {
    //console.log("销毁index handleScrollEvent");

    document.removeEventListener("scroll", this.handleScrollEvent);

    this.clearIndexTimer();

    this.destroyVideo();
  },

  methods: {
    destroyVideo() {
      this.video_dp.destroy();
    },
    initVideo() {
      this.$api("index_config").then((res) => {
        console.log("获取配置信息", res);
        this.$nextTick(() => {
          if (this.is_h5 || this.is_pad) {
          } else {
            this.video_dp = new DPlayer({
              container: document.getElementById("dplayer"),
              autoplay: true,
              loop: true,
              lang: "zh-cn",
              // screenshot: true,
              // hotkey: true,
              preload: "auto",
              // logo: "logo.png",
              volume: 0,
              mutex: true,
              video: {
                url: res.data.index_video,
                pic: this.video_poster,
                thumbnails: "thumbnails.jpg",
                type: "auto",
              },
            });
          }

          //x5-video-player-type="h5"
          // var $video = document.querySelector("video");
          // $video.setAttribute("x5-video-player-type", "h5");
          // $video.setAttribute("playsinline", false);
        });
      });
    },

    clearIndexTimer() {
      clearInterval(this.index_timer);
      this.index_timer = null;
    },
    setMobileInfo() {
      let device_width =
        document && document.documentElement && document.documentElement.clientWidth;
      this.is_h5 = device_width <= 1365;
      this.is_pad = device_width <= 1365 && device_width >= 768;

      //console.log("Index is_h5", this.is_h5);
    },

    mobileToggleCate() {
      if (this.is_h5) {
        this.index_timer = setInterval(() => {
          if (this.active_cate_index == this.index_show_cates.length - 1) {
            this.active_cate_index = 0;
          } else {
            this.active_cate_index++;
          }
        }, 4000);
      }
    },

    setHeaderTheme() {
      //console.log("index mounted", this.$route.name);
      this.$store.commit("set_header_theme", "transparent");
    },

    watchPageScroll() {
      var that = this;

      let $target = document.querySelector("#app-wrap");
      if (!this.is_h5 && !this.is_pad) {
        $target = document;
      }
      if ($target) {
        document.addEventListener("scroll", that.handleScrollEvent);
      }
    },

    handleScrollEvent() {
      var that = this;
      let $target = document.querySelector("#app-wrap");
      if (!this.is_h5 && !this.is_pad) {
        $target = document.documentElement;
      }

      var scrollTop = $target.scrollTop;

      if (scrollTop) {
        // $header.classList.add('theme-white');
        that.$store.commit("set_header_theme", "white");
      } else {
        that.$store.commit("set_header_theme", "transparent");
        // $header.classList.remove('theme-white');
      }
      // //console.log("滚动监听", new Date(), scrollTop);
    },

    setView() {
      this.$api("product_channel").then((res) => {
        let cate_product = res.data.find((v) => v.id == 852);
        let index_show_cates = cate_product.channels.filter((v) => v.is_show && v.is_hot);

        index_show_cates.forEach((v) => {
          if (v.id == 863) {
            //仪器耗材分类特殊修改
            v.id = 855;
          }
          v.route = "/productCates?id=" + v.id;
        });

        this.index_show_cates = index_show_cates;

        //console.log("首页分类展示", res.data);
      });

      //文献精选查询

      var is_h5 =
        document &&
        document.documentElement &&
        document.documentElement.clientWidth <= 1365;

      let items_length = 4;

      if (this.is_h5) {
        items_length = 1;
      }
      if (this.is_pad) {
        items_length = 4;
      }

      this.$api("index_getLiteratures", {
        ...this.pagination,
      }).then((res) => {
        // //console.log("首页文献查询", res);
        this.list_wenxian = res.data;
        this.count = res.data.length;
        this.group_length = Math.ceil(this.count / items_length);
        this.init_wenxian_swiper();
      });
    },

    //推荐产品轮播图
    init_wenxian_swiper() {
      var that = this;

      var list = this.list_wenxian;
      if (
        document &&
        document.documentElement &&
        document.documentElement.querySelector(".swiper-wenxian") &&
        list.length
      ) {
        // //console.log("首页推荐产品 满足swiper 初始化条件 1");
        Swiper.use([Pagination, Navigation]);

        let slidesPerView = 4;
        let slidesPerGroup = 4;

        if (this.is_h5) {
          slidesPerView = 1;
          slidesPerGroup = 1;
        }
        if (this.is_pad) {
          slidesPerView = 4;
          slidesPerGroup = 4;
        }

        //推荐产品轮播图
        this.swiper_wenxian = new Swiper(".swiper-wenxian", {
          loop: false,
          slidesPerView: slidesPerView,
          slidesPerGroup: slidesPerGroup,
          spaceBetween: 23,
          // pagination: {
          //   el: ".swiper-pagination",
          // },
          // navigation: {
          //   nextEl: ".hot-lunbo .swiper-button-next",
          //   prevEl: ".hot-lunbo .swiper-button-prev",
          // },

          on: {
            slideChange(swiper) {
              // //console.log("监视切换", { ...swiper });
              // //console.log("分组", swiper.snapIndex);

              that.active_swiper_index = swiper.snapIndex;
            },
          },
        });
      } else {
        // //console.log("首页推荐产品 不满足swiper 初始化条件 2");
        setTimeout(() => {
          this.init_wenxian_swiper();
        }, 100);
      }
    },

    swiperSlidePrev() {
      this.swiper_wenxian.slidePrev();
    },
    swiperSlideNext() {
      this.swiper_wenxian.slideNext();
    },

    toSearch() {
      if (!this.keyword) {
        alertErr("请输入搜索关键字");
        return;
      }

      let query = {};
      if (this.selectCate) {
        query.id = this.selectCate;
      }

      query.keyword = this.keyword.trim() || "";
      query.ms = new Date().getTime();

      this.$router.push({
        path: "/productSearch",
        query: query,
      });

      // this.toProductSearchPage(params);
    },

    toggleCate(item) {
      // //console.log("toggle 分类", { ...item });
      // this.active_cate = item;
      let index = this.index_show_cates.findIndex((v) => v.id == item.id);
      this.active_cate_index = index;
    },

    clickCate(item, index) {
      //console.log("clickCate 分类", { ...item });
      //console.log("clickCate 分类 index", index);

      if (!this.is_h5) {
        this.$router.push("/productCates?id=" + item.id);
      } else {
        this.clearIndexTimer();
        this.active_cate_index = index;
      }
    },

    bannerClick(item) {
      //console.log({ ...item });

      if (item.url) {
        window.open(item.url, "_blank");
      } else if (item.inventory_id) {
        this.$router.push("/goodsDetail/" + item.inventory_id);
      }
    },
  },
};
</script>

<style lang="less">
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background: #ea3200;
  color: #fff !important;
}

.el-select-dropdown__item.selected {
  color: @theme;
}
</style>

<style scoped lang="less">
.index-top-video {
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 772px;

  .video-poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /deep/ #dplayer {
    width: 100%;
    height: 100%;

    > div {
      display: none !important;
    }

    .dplayer-video-wrap {
      display: block !important;

      > div {
        display: none !important;
      }
    }
  }

  /deep/ .dplayer-notice-list {
    display: none !important;
  }
  /deep/ .dplayer-controller {
    display: none !important;
  }
  /deep/ .dplayer-mobile-play {
    display: none !important;
  }
  /deep/ .dplayer-video-wrap .dplayer-video-current {
    object-fit: cover;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  video::-internal-media-controls-download-button {
    display: none;
  }
  video::-webkit-media-controls-enclosure {
    overflow: hidden;
  }

  .video-mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.05);
  }
}

.banner-box {
  margin-top: 80px;
}

.lunbo-box {
  position: relative;
  width: 100%;
  height: 355px;

  /deep/ .el-carousel__container {
    height: 355px;
  }

  /deep/ img {
    width: 100%;
    height: 355px;
    cursor: pointer;
  }
}

/deep/ .banner-box .lunbo-box {
  position: relative;
  width: 100%;
  height: 355px;

  /deep/ .el-carousel__container {
    height: 355px;
  }

  /deep/ img {
    width: 100%;
    height: 355px;
    cursor: pointer;
  }
}

// 搜索框

.section-search {
  padding-top: 200px;
  padding-top: 332px;
  padding-bottom: 200px;
  text-align: center;
  position: relative;
  z-index: 10;

  .main-title {
    margin-bottom: 45px;
    font-size: 40px;
    font-family: Alibaba PuHuiTi 2-85 Bold, Alibaba PuHuiTi 20;
    font-weight: normal;
    color: #ffffff;
  }

  .hot-words {
    margin-top: 24px;
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;

    .words {
      margin-right: 20px;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;

      &:hover {
        color: @theme;
      }
    }
  }

  .center-search {
    .flex();

    width: 1038px;
    height: 60px;
    background: #ffffff;
    border-radius: 4px 4px 4px 4px;
    margin: 0 auto;
    border: 1px solid #c2c2c2;
    border-radius: 5px;
    position: relative;
    overflow: hidden;

    .left-select {
      width: 152px;
      height: 60px;

      .el-select {
        width: 152px;
        height: 100%;

        /deep/ .el-input {
          height: 100%;
        }
        /deep/ .el-input__inner {
          border: none !important;
          background: #f2f2f2;
          padding: 0 10px;
          height: 100%;
          text-align: center;
        }
      }
    }
    .search-box {
      .flex();
      flex: 1;
      align-self: stretch;

      input {
        width: 100%;
        display: inline-block;
        height: 100%;
        padding-left: 20px;

        &::-webkit-input-placeholder {
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #a6a6a6;
        }
      }

      button {
        position: absolute;
        right: 0;
        top: 0;
        width: 80px;
        height: 60px;
        .flex-center();
        .img-search {
          width: 24px;
          cursor: pointer;
          transition: 0.3s;
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }
}

.section-title {
  .flex-between();
  .section-left {
    font-size: 46px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #333333;
  }
  .section-right {
    .flex();

    .text {
      padding-bottom: 10px;
      position: relative;
      font-size: 18px;
      font-family: Alibaba PuHuiTi 2-55 Regular, Alibaba PuHuiTi 20;
      font-weight: normal;
      color: #ea3200;

      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        width: 35px;
        height: 1px;
        background: #000;
      }
    }
    .arrow {
      width: 24px;
      margin-left: 30px;
    }
  }
}

.section-yewu {
  width: @width;
  margin: 0 auto;
  padding-top: 80px;

  .section-ctx {
    margin-top: 48px;

    .main-poster {
      cursor: pointer;
      margin-bottom: 10px;
      position: relative;
      overflow: hidden;
      height: 600px;
      border-radius: 16px 16px 0 0;
      .poster-box {
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-size: 100% 100%;
        background-position: center;
      }

      .info-box {
        position: relative;
        z-index: 2;
        height: 600px;
        background: transparent;
        padding: 123px 110px;
        text-align: left;
        border-radius: 16px 16px 0px 0px;
      }

      .cate-title {
        font-size: 32px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
      }
      .cate-desc {
        .line-4();
        max-width: 700px;
        margin-top: 55px;
        min-height: 160px;
        font-size: 18px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        line-height: 40px;
      }
      .cate-btn {
        margin-top: 40px;
        width: 192px;
        background: rgba(255, 255, 255, 0);
        border-radius: 0px 31px 0px 31px;
        border: 2px solid #ffffff;

        a {
          .flex-center();
          width: 192px;
          height: 62px;

          font-size: 18px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          img {
            margin-left: 25px;
            width: 24px;
          }
        }
      }
    }
    .main-cates {
      display: flex;
      justify-content: space-between;

      .cate-item {
        .flex-center();
        flex-direction: column;
        flex: 1;
        height: 124px;
        background: #eff4fa;
        margin-right: 10px;
        cursor: pointer;
        transition: 0.4s linear;

        &:first-child {
          border-radius: 0px 0px 0px 16px;
        }
        &:last-child {
          border-radius: 0px 0px 16px 0px;
          margin-right: 0;
        }

        &.active {
          background: @theme;
          .title {
            color: #fff;
          }

          .cate-img-0 {
            display: none !important;
          }
          .cate-img-1 {
            display: inline-block !important;
          }
        }

        .cate-img {
          max-width: 56px;
          height: auto;
        }

        .cate-img-1 {
          display: none;
        }
        .title {
          transition: 0.4s linear;
          margin-top: 10px;
          font-size: 16px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #000000;
        }
      }
    }
  }
}

.adv-box {
  margin-top: 80px;
  img {
    width: 100%;
    vertical-align: bottom;
  }
}

// 文献列表
.section-wenxian {
  width: @width;
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 80px;

  .section-ctx {
    margin-top: 68px;
    .wenxian-list {
      display: flex;
      .wenxian-item {
        overflow: hidden;
        width: 333px;
        height: 510px;
        margin-right: 23px;
        background: #ffffff;
        box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.1);
        border-radius: 8px 8px 8px 8px;

        &:nth-child(4n) {
          margin-right: 0;
        }

        &:hover {
        }

        .wenxian-img {
          width: 333px;
          height: 400px;
        }
        .wenxian-title {
          .line-2();
          text-align: left;
          overflow: hidden;

          height: 110px;
          padding: 20px 20px;
          font-size: 18px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          line-height: 2.2;
        }
      }
    }

    .swiper-wenxian {
      padding-bottom: 10px;
      .wenxian-item {
        display: block;
        box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        border-radius: 8px;

        &:hover {
          .wenxian-title {
            color: @theme;
          }
        }

        .wenxian-img {
          width: 100%;
          height: 400px;
        }
        .wenxian-title {
          overflow: hidden;

          .line-2();
          height: 110px;
          padding: 20px 20px;
          font-size: 18px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          line-height: 2.2;
        }
      }
    }

    // 文献分页
    .wenxian-fenye {
      margin-top: 35px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;

      .fenye-left {
        .flex();
        width: 305px;
        height: 79px;
        background: #ffffff;
        box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.08);
        border-radius: 8px 8px 8px 8px;

        .arrow-left {
          flex: 1;
        }
        .arrow-right {
          flex: 1;
        }

        img {
          cursor: pointer;

          &.img-0 {
            cursor: not-allowed;
          }
        }

        .arrow-center {
          width: 1px;
          height: 20px;
          background: #c5c5c5;
        }
      }
      .fenye-center {
        flex: 1;
        height: 1px;
        background: #d9ded5;
      }
      .fenye-right {
        .flex();
        width: 76px;
        padding-bottom: 20px;

        align-items: flex-end;
        justify-content: flex-end;
        font-size: 24px;
        font-family: Microsoft YaHei-Light, Microsoft YaHei;
        font-weight: 300;
        color: #87888a;

        .page-curr {
          color: #ea3200;
          // font-weight: BOLD;
          font-size: 32px;
        }
        .page-divider {
        }
        .page-total {
        }
      }
    }
  }
}

.page-index {
  // background: #fff;

  .inner {
    padding-top: 0;
    // width: @width;
    margin: 0 auto;

    position: relative;
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/index.less"></style>
