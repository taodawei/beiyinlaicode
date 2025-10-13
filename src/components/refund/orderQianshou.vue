<template>
  <div class="modal-container">
    <el-dialog
      title="操作提示"
      width="500px"
      custom-class="modal-wrap"
      :close-on-click-modal="true"
      :visible.sync="showModal"
      :before-close="onModal_close"
    >
      <div class="modal-inner">
        <div class="img-box">
          <img v-for="(item, index) in imgs" :key="index" :src="item" alt />
        </div>
        <div class="text-box">
          <img src="@img/goods/add-success.png" alt />
          是否确认收货？请仔细检查到货商品。
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="quxiao" @click="showModal = false">取消</button>
        <button class="queding" @click="orders_qrshouhuo">确认</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import order from "@/shop-actions/order";

import { mapState } from "vuex";

export default {
  name: "commonShare",
  components: {},
  props: ["curr"],
  data() {
    return {
      showModal: false,
      order: {}
    };
  },
  computed: {
    ...mapState(["baseInfo"]),

    imgs() {
      let imgs = [];
      if (this.order && this.order.products) {
        imgs = this.order.products.map(v => v.image);
      }

      return imgs;
    }
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
    onModal_close() {
      this.showModal = false;
    },
    //确认收货
    orders_qrshouhuo() {
      this.$api("orders_qrshouhuo", {
        orderId: this.order.id
      }).then(res => {
        let { code, data, message } = res;
        if (code == 1) {
          this.$parent.updateView();
          this.showModal = false;
        }
      });

      // debugger
      // order.orders_qrshouhuo({
      //   params: {
      //     orderId: this.order.id
      //   },
      //   success: () => {
      //     this.$parent.updateView();
      //     this.showModal = false;
      //   }
      // });
    }
  }
};
</script>


<style scoped lang="less">
.modal-wrap {
  .modal-inner {
    padding: 20px;
    .img-box {
      img {
        width: 150px;
        height: 150px;

        & > img {
          margin-left: 20px;
        }
      }
    }
    .text-box {
      margin-top: 20px;
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
  background: @theme;

  .el-dialog__title {
    color: #fff;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
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
    margin-right: 20px;
  }
  .queding {
    background: @theme;
    color: #fff;
  }
}
</style>
