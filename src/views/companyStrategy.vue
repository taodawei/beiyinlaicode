<template>
  <div class="page">
    <pageAboutTop />

    <div class="page-inner">
      <div class="detail-title">全球战略布局</div>
      <div class="detail-title-line"></div>
      <div class="detail-content">
        <div class="bg-img-box">
          <img src="@img/map.png" alt="" class="bg-img" />
        </div>

        <div class="float-box">
          <div class="point-list">
            <div class="point-item point-item-1">
              <div class="dot"></div>
              <div class="point"></div>
            </div>
            <div class="point-item point-item-2">
              <div class="dot"></div>
              <div class="point"></div>
            </div>
          </div>

          <div class="imgs">
            <div class="img-item img-item-1">
              <img src="@img/map-site-1.png" alt="" />
            </div>
            <div class="img-item img-item-2">
              <img src="@img/map-site-2.png" alt="" />
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
  name: "create-order",
  components: {},
  data() {
    return {
      curr: {},
    };
  },
  computed: {
    ...mapState([""]),
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
    setView() {
      // this.$api("index_newsDetail", {
      //   id: this.$route.query.id,
      // }).then((res) => {
      //   this.curr = res.data;
      // });
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

    .detail-content {
      position: relative;
      margin-top: 60px;
      text-align: left;
      // min-height: 50vh;

      font-size: 16px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      line-height: 40px;
      // text-indent: 2em;

      .bg-img {
        max-width: 100%;
        display: block;
        vertical-align: bottom;
      }
    }
  }
}

.float-box {
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  .point-list {
    .point-item {
      position: absolute;
    }
    .point-item-1 {
      left: 1080px;
      top: 190px;
    }
    .point-item-2 {
      left: 1180px;
      top: 200px;
    }

    .dot {
      // left: 32px;
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      content: "";
      background-color: @theme;
    }
    .point {
      position: absolute;
    }

    .point::before,
    .point::after {
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      content: "";
      background-color: rgba(234, 50, 0, 0.9);
    }

    .point::before {
      animation: scale 2s infinite;

      // transform: scale(3);
      // opacity: 0.7;
    }

    .point::after {
      animation: scale2 2s infinite;

      // transform: scale(5);
      // opacity: 0.5;
    }
  }

  .imgs {
    .img-item {
      &.img-item-1 {
        position: absolute;
        left: 705px;
        top: 70px;

        img {
          width: 376px;
          height: auto;
        }
      }

      &.img-item-2 {
        position: absolute;
        left: 1080px;
        top: 207px;

        img {
          width: 320px;
          height: auto;
        }
      }

      img {
      }
    }
  }
}

@keyframes scale {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}
@keyframes scale2 {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(5);
    opacity: 0;
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/companyStrategy.less"></style>
