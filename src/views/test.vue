<template>
<div class="magnifier">
    <el-carousel height="360px" indicator-position="none" :autoplay="false" @change="changeshop">
        <el-carousel-item v-for="item in swiperImgs" :key="item">
            <div class="magnifier">
                <div class="small-box" @mouseover="handOver"  @mousemove="handMove" @mouseout="handOut">
                    <img class="smallPic" :src="item" />
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
            </div>
           
        </el-carousel-item>
    </el-carousel>
     <div class="magnifier-layer" 
                v-show="showMagnifier"
                :style="{ 
                    width: configs.width + 'px', 
                    height: configs.height + 'px', 
                    left: configs.width + 20 + 'px' 
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
                        src="https://bio-swamp.oss-cn-nanjing.aliyuncs.com/img/PAB33042/PAB33042_1.jpg"
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
  computed: {
      bigWidth(){
           return this.configs.scale * this.configs.width;
       },
       bigHeight(){
           return this.configs.scale * this.configs.height;
       }
   },
   mounted () {
       this.$init()
   },
  data(){
      return {
          configs:{
            width:570,//放大区域
            height:360,//放大区域
            maskWidth:210,//遮罩
            maskHeight:210,//遮罩
            maskColor:'rgba(25,122,255,0.5)',//遮罩样式
            maskOpacity:0.6,
            scale:2,//放大比例
          },
          imgObj: {},
          moveLeft: 0,
          moveTop: 0,
          transformMask:`translate(0px, 0px)`,
          showMagnifier:false,
          showMask:false,
          swiperImgs:["https://bio-swamp.oss-cn-nanjing.aliyuncs.com/img/PAB33042/PAB33042_1.jpg","https://bio-swamp.oss-cn-nanjing.aliyuncs.com/img/PAB33042/PAB33042_2.jpg","https://bio-swamp.oss-cn-nanjing.aliyuncs.com/img/PAB33042/PAB33042_3.jpg"]
      }
    },  
     methods: {
        $init(){
            setTimeout(() => {
                  this.imgObj = this.$el.getElementsByClassName('small-box')[0].getBoundingClientRect();
            }, 500);
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
            let imgRectNow = this.imgObj;
            let objX = e.clientX - imgRectNow.left;
            let objY = e.clientY - imgRectNow.top;
            
            // 计算初始的遮罩左上角的坐标
            let maskX = objX - this.configs.maskWidth / 2;
            let maskY = objY - this.configs.maskHeight / 2;
            
            // 判断是否超出界限,并纠正
            maskY = maskY < 0 ? 0 : maskY; 
            maskX = maskX < 0 ? 0 : maskX; 
            if(maskY + this.configs.maskHeight >= imgRectNow.height) {
            maskY = imgRectNow.height - this.configs.maskHeight;
            }
            if(maskX + this.configs.maskWidth >= imgRectNow.width) {
            maskX = imgRectNow.width - this.configs.maskWidth;
            }
            
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
.small-box{
    position: relative;

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
    z-index: 1000;
    overflow: hidden;
    background-color: #fff;
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
    width: 580px;
    height: 360px;
    border-radius: 8px;
}
</style>