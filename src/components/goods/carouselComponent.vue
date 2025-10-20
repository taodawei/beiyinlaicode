<template>
  <div class="lunbo-box">
    <!-- 主图 -->
    <div
      class="carousel-wrap magnifier"
      @mouseover="showMaskModal = true"
      @mouseout="showMaskModal = false"
    >
      <el-carousel
        ref="carousel"
        :autoplay="false"
        :interval="4000"
        @change="onCarouseChange"
      >
        <el-carousel-item v-for="item in swiperImgs" :key="item">
          <!-- <div class="img-box">
            <el-image :src="item" :preview-src-list="swiperImgs"> </el-image>
          </div> -->
          <div class="small-box" @mouseover="handOver"  @mousemove="handMove" @mouseout="handOut">
              <!-- <img class="smallPic" :src="item" /> -->
              <div class="img-box smallPic">
                <el-image :src="item" :preview-src-list="swiperImgs"> </el-image>
              </div>
              <div class="magnifier-zoom" 
                  v-show="showMask"
                  :style="{
                  background: configs.maskColor,
                  height: configs.maskWidth + 'px',
                  width: configs.maskHeight + 'px', 
                  opacity: configs.maskOpacity, 
                  transform: transformMask
                  }"
              ></div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 缩略图 -->
    <div class="lunbo-img-list">
      <div
        class="lunbo-img-item cover"
        :class="index == activeSwipeIndex ? 'active' : ''"
        v-for="(item, index) in swiperImgs"
        :key="index"
        @click="onClickSwipeItem(index)"
      >
        <img :src="item" />
      </div>
    </div>

    <!--大图展示-->
    <div class="magnifier-layer" 
        v-show="showMagnifier"
        :style="{ 
            width: configs.width + 'px', 
            height: configs.height + 'px', 
            // left: configs.width + 520 + 'px' 
        }">
        <div class="big-box"
            :style="{ 
            width: bigWidth + 'px',
            height: bigHeight + 'px',
            left: moveLeft,
            top: moveTop
            }">
            <div class="big-box-img"
            :style="{ 
                width: bigWidth - 2  + 'px', 
                height: bigHeight - 2 + 'px' 
            }">
            <img
                :src="bigImgSrc"
                :style="{ 
                minWith: bigWidth - 2 + 'px', 
                minHeight: bigHeight -2 + 'px' ,
                }"/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "carouselComponent",
  components: {},
  props: ["swiperImgs"],

  data() {
    return {
      showMaskModal: false, //是否展示模态框
      activeSwipeIndex: 0, //轮播图指示器


      configs:{
        width:728,//放大区域
        height:350,//放大区域
        maskWidth:120,//遮罩
        maskHeight:120,//遮罩
        maskColor:'rgba(25,122,255,0.5)',//遮罩样式
        maskOpacity:0.6,
        scale:2.5,//放大比例
      },
      imgObj: {},
      moveLeft: 0,
      moveTop: 0,
      transformMask:`translate(0px, 0px)`,
      showMagnifier:false,
      showMask:false,
      bigImgSrc:"",
    };
  },
  computed: {
      bigWidth(){
           return this.configs.scale * this.configs.width;
       },
       bigHeight(){
           return this.configs.scale * this.configs.height;
       }
   },
  mounted () {
    // this.$init()
    // this.imgObj = this.$el.getElementsByClassName('small-box')[0].getBoundingClientRect();
    this.bigImgSrc=this.swiperImgs[0];
  },
  methods: {
    //幻灯片切换
    onCarouseChange(index_curr, index_prev) {
      //console.log(index_curr, index_prev);
      this.activeSwipeIndex = index_curr;
    },

    //手段切换幻灯片
    onClickSwipeItem(index) {
      this.$refs.carousel.setActiveItem(index);
      this.bigImgSrc=this.swiperImgs[index];
    },

    $init(){
        setTimeout(() => {
              this.imgObj = this.$el.getElementsByClassName('is-active small-box')[0].getBoundingClientRect();
              this.bigImgSrc=this.swiperImgs[0];
        }, 2000);
    },
    changeshop(e){
        this.showMagnifier = false;
        this.showMask = false;
        this.transformMask = `translate(0px, 0px)`
        this.moveLeft = 0
        this.moveTop = 0
    },
    handMove(e) {
        // 动态获取小图的位置（或者监听 scroll ）
        let BoxList= this.$el.getElementsByClassName('is-active');
        let imgRectNow = BoxList[0].getBoundingClientRect();
        let objX = e.clientX - imgRectNow.left;
        let objY = e.clientY - imgRectNow.top;
        // 计算初始的遮罩左上角的坐标
        let maskX = objX - this.configs.maskWidth / 2;
        let maskY = objY - this.configs.maskHeight / 2;
        console.log("eX:"+e.clientX+"|eY"+e.clientY);
        console.log("imgRectNowX:"+imgRectNow.left+"|imgRectNowY"+imgRectNow.top);
        // 判断是否超出界限,并纠正
        maskY = maskY < 0 ? 0 : maskY; 
        maskX = maskX < 0 ? 0 : maskX; 
        if(maskY + this.configs.maskHeight >= imgRectNow.height) {
          maskY = imgRectNow.height - this.configs.maskHeight;
        }
        if(maskX + this.configs.maskWidth >= imgRectNow.width) {
          maskX = imgRectNow.width - this.configs.maskWidth;
        }
        console.log("maskX:"+maskX+"|maskY"+maskY);
        // 遮罩移动
        this.transformMask = `translate(${maskX}px, ${maskY}px)`;
        
        // 背景图移动
        this.moveLeft = - maskX * this.configs.scale + "px";
        this.moveTop = - maskY * this.configs.scale + "px";
    },
    handOut() {
        this.showMagnifier = false;
        this.showMask = false;
    },
    handOver() {
        this.showMagnifier = true;
        this.showMask = true;
    }
  },
};
</script>

<style scoped lang="less">
/deep/ .el-carousel {
  width: 400px;
  width: 730px;
  height: 400px;
  border: 1px solid #eee;
}
/deep/ .el-carousel__container {
  height: 100%;
}
/deep/ .el-carousel__indicators {
  display: none;
}

.lunbo-box {
  position: relative;

  .img-box {
    .flex-center();
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: move;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    background: #f8f8f8;
    padding: 20px;

    img {
      max-width: 100%;
      max-height: 100%;
      max-width: 450px;
      max-height: 450px;
      // visibility: hidden;
    }

    .el-image {
      max-width: 100%;
      max-height: 100%;
      max-width: 450px;
      max-height: 360px;

      /deep/ img {
        max-width: 450px;
        max-height: 450px;
      }
    }
  }

  .mask-modal {
    position: absolute;
    z-index: 10000;
    left: 401px;
    top: 0;
    background-color: #eee;
    border: 1px solid #bbb;

    .mask-inner {
      width: 700px;
      height: 700px;
      img {
        width: 100%;
        max-height: 100%;
      }
    }
  }

  .lunbo-img-list {
    width: 100%;
    margin-top: 55px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .lunbo-img-item {
      width: 100px;
      height: 100px;
      padding: 0.02rem;
      cursor: pointer;
      border: 1px solid transparent;
      margin-right: 20px;

      &.active {
        border: 1px solid @theme;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}



.small-box{
    position: relative;

    display: flex;
    flex: 1;
    // align-items: center;
    justify-content: center;
    // background-size: contain;
    // background-repeat: no-repeat;
    // background-position: 50%;
    cursor: move;
    // margin: 0 auto;
    // width: 100%;
    // height: 100%;
    // background: #f8f8f8;
    // padding: 2rem;

}
.magnifier-zoom{
    position: absolute;
    top: 0;
    left: 0;
    
}
.magnifier-layer{
    position: absolute;
    top: 0;
    right: 0;
    left: 750px;
    z-index: 1000;
    overflow: hidden;
    background-color: #fff;
    border:1px solid #bbb;
}
.big-box{
    position: absolute;
}
 .magnifier{
    position: relative;
    width: 580px;
    height: 360px;
    border-radius: 8px;
}
.smallPic{
    // width: 580px;
    // height: 360px;
    // border-radius: 8px;
}
</style>

<style scoped lang="less" src="@/assets/h5css/zujian/carouselComponent.less"></style>
