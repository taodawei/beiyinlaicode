<template>
  <div class="biaoqing-wrap">
    <img
     
      class="img-add"
      @click="show_biaoqing = !show_biaoqing"
    />
    <div class="biaoqing-box" v-show="show_biaoqing">
      <div class="title">点击表情即可添加</div>
      <div class="list">
        <div
          class="item"
          v-for="(item, index) in list_biaoqing"
          :key="index"
          @click="click_biaoqing(item)"
        >
          <img :src="item.image" :alt="item.title" />
        </div>

   
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "commonTag",
  props: ["fromType"],
  data() {
    return {
      show_biaoqing: false, //显示表情
    };
  },
  computed: {
    ...mapState(["list_biaoqing"]),
  },
  created() {
    this.setView();
  },
  methods: {
    setView() {
 
    },
    //选择表情
    click_biaoqing(item) {
      //console.log('fromType', this.fromType)
      if(this.inputMarker) {

      }
      // debugger
      //console.log("当前表情", { ...item });
      this.show_biaoqing = false;

      if(this.fromType == '私信'){
        //  this.$parent.updateContent(item, this.fromType);
         this.$emit('updateContent', item)
      } else {
        this.$parent.inputAddBiaoqing(item, this.fromType);
      }
      
     
    },
  },
};
</script>


<style lang="less">
.has-emoji {
  /deep/ img {
    width: 30px;
    vertical-align: bottom;
  }
}
</style>

<style scoped lang="less">
.img-add {
  cursor: pointer;
}

.biaoqing-wrap {
  position: relative;
}
.biaoqing-box {
  width: 500px;
  height: 300px;
  box-shadow: 0 2px 6px 0 #aaa;

  position: absolute;
  z-index: 1000;
  background-color: #f9f9f9;

  .title {
    text-align: center;
    padding: 15px;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
  }
  .list {
    display: flex;
    .item {
      border: 1px solid #eee;
      img {
        width: 60px;
        height: 60px;
        cursor: pointer;
      }
    }
  }
}
</style>
