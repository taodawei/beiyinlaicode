<template>
  <div class="page">
    <pageTechTop />

    <div class="page-box">
      <div class="page-inner">
        <div class="section-list">
          <div class="section" v-for="(item, index) in study_cates" :key="index">
            <div class="section-title">
              <div class="main-title">{{ item.title }}</div>
              <div class="main-title-en">{{ item.en_title }}</div>
              <div class="main-link hover-link" @click="$router.push(item.route)">
                <span>查看详情</span> <img src="@img/more.png" alt="" />
              </div>
            </div>
            <div class="section-ctx" @click="$router.push(item.route)">
              <div class="img-box scale-box">
                <img
                  :src="study_index_banners[index] && study_index_banners[index].image"
                  alt=""
                  class="scale-img"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="section-list" v-if="false">
          <div class="section">
            <div class="section-title">
              <div class="main-title">在线课堂</div>
              <div class="main-title-en">Online Classroom</div>
              <div class="main-link" @click="$router.push('/technologyOnline')">
                <span>查看详情</span> <img src="@img/more.png" alt="" />
              </div>
            </div>
            <div class="section-ctx">
              <div class="img-box scale-box"></div>
              <div class="img-box"></div>
              <div class="img-box"></div>
            </div>
          </div>
          <div class="section">
            <div class="section-title">
              <div class="main-title">前沿科技</div>
              <div class="main-title-en">Cutting-edge technology</div>
              <div class="main-link" @click="$router.push('/technologyEdge')">
                <span>查看详情</span> <img src="@img/more.png" alt="" />
              </div>
            </div>
            <div class="section-ctx">
              <div class="img-box"></div>
            </div>
          </div>
          <div class="section">
            <div class="section-title">
              <div class="main-title">热门靶点</div>
              <div class="main-title-en">Popular target points</div>
              <div class="main-link" @click="$router.push('/technologyOnline?type=3')">
                <span>查看详情</span> <img src="@img/more.png" alt="" />
              </div>
            </div>
            <div class="section-ctx">
              <div class="img-box"></div>
            </div>
          </div>
          <div class="section">
            <div class="section-title">
              <div class="main-title">技术专题</div>
              <div class="main-title-en">Technical topics</div>
              <div class="main-link" @click="$router.push('/technologyResearch')">
                <span>查看详情</span> <img src="@img/more.png" alt="" />
              </div>
            </div>
            <div class="section-ctx">
              <div class="img-box"></div>
            </div>
          </div>
          <div class="section">
            <div class="section-title">
              <div class="main-title">资料下载</div>
              <div class="main-title-en">Data download</div>
              <div class="main-link" @click="$router.push('/technologyDownload')">
                <span>查看详情</span> <img src="@img/more.png" alt="" />
              </div>
            </div>
            <div class="section-ctx">
              <div class="img-box"></div>
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
  name: "study-index",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["study_index_banners"]),
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

    toDetail() {},
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

.section-list {
  width: @width;
  margin: 0 auto;
}
.section {
  .flex-between();
  width: 1400px;
  height: 262px;
  margin-bottom: 32px;
  background: #eff4fa;

  .section-title {
    width: 368px;
    padding: 55px;
    .flex-center();
    flex-direction: column;
    align-items: flex-start;

    .main-title {
      font-size: 28px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;
    }
    .main-title-en {
      margin-top: 10px;
      font-size: 18px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #999999;
    }
    .main-link {
      .flex();
      margin-top: 60px;
      padding-bottom: 10px;
      border-bottom: 1px solid @theme;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #ea3200;
      cursor: pointer;

      img {
        width: 24px;
        margin-left: 8px;
      }
    }
  }
  .section-ctx {
    flex: 1;
    display: flex;

    .img-box {
      width: 312px;
      width: 100%;
      height: 200px;
      margin-right: 32px;
      margin-right: 0;
      margin-right: 32px;

      &:nth-child(3n) {
        margin-right: 0;
      }

      img {
        width: 100%;
        height: 200px;
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/technology.less"></style>
