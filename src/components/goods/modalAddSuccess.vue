<template>
  <div class="modal-container">
    <el-dialog
      :title="number + '件商品加入购物车'"
      width="580px"
      custom-class="modal-wrap modal-add-goods"
      :close-on-click-modal="true"
      :visible.sync="showModal"
      :before-close="onModal_close"
    >
      <div class="modal-inner">
        <!-- <div class="img-box">
          <img :src="select_specifications.image" alt />
        </div> -->
        <div class="tip-box">
          <img src="@img/add-success.png" alt />
        </div>
        <div class="text-box-1">该商品已成功加入购物车</div>
        <div class="text-box-2">购物车共{{ shopcart_count }}件商品</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-ripple queding" @click="to_jiesuan">查看购物车</button>
        <button class="btn-ripple quxiao" @click="showModal = false">继续购物</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "commonShare",
  components: {},
  props: ["curr"],
  data() {
    return {
      showModal: false,
      select_specifications: {},
      number: 1,
    };
  },
  computed: {
    ...mapState(["baseInfo"]),

    firstImage() {
      let src = "";
      if (this.curr && this.curr.images && this.curr.images.length) {
        src = this.curr.images[0];
      }

      return src;
    },
  },
  watch: {},

  mounted() {
    // this.creatQrCode();
  },

  beforeDestroy() {
    clearTimeout(this.timer);
    this.timer = null;
  },

  methods: {
    init(select_specifications) {
      //console.log({ ...select_specifications });
      this.number = select_specifications.num;
      this.select_specifications = select_specifications;
      this.showModal = true;
    },

    to_jiesuan() {
      this.$router.push("/shoppingCart");
    },

    onModal_close() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped lang="less">
.modal-wrap {
  .modal-inner {
    padding: 20px;
    // .flex-between();
    .img-box {
      img {
        width: 150px;
        height: 150px;
        object-fit: contain;
      }
    }
    .text-box-1 {
      margin-top: 18px;
      font-size: 24px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #000000;
    }
    .text-box-2 {
      margin-top: 18px;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;
      font-weight: normal;
      color: #000000;
    }

    .text-box {
      flex: 2;
      text-align: center;
      .flex-center();
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 20px;
      color: #333333;

      img {
        width: 25px;
        margin-right: 10px;
      }
    }
  }
}

/deep/ .el-dialog__header {
  border-bottom: 1px solid #eee;
  background: #ff9312;
  background: @theme;
  background: #f7f7f7;
  text-align: left;

  .el-dialog__title {
    color: #fff;
    color: #333;
    text-align: left;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #333;
  }
}

/deep/ .el-dialog__footer {
  text-align: center;

  button {
    width: 170px;
    height: 40px;
    background: #ffffff;
    border: 1px solid #eeeeee;
    font-size: 14px;
  }

  .quxiao {
    margin-left: 25px;
    width: 128px;
    height: 40px;
    background: #ffffff;
    border-radius: 4px 4px 4px 4px;
    border: 1px solid #ea3200;
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #ea3200;
  }
  .queding {
    width: 128px;
    height: 40px;
    background: #ea3200;
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    border-radius: 4px 4px 4px 4px;
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/modals/modalAddSuccess.less"></style>
