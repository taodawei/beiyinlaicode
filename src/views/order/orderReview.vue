<template>
  <div class="page">
    <!-- 图片预览 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>

    <div class="main-title">
      <span>评价</span>
      <button class="btn-ripple" @click="$router.back()">返回</button>
    </div>

    <div class="page-ctx">
      <div class="order-product">
        <div class="info-title">
          <div class="date">{{ order.dtTime }}</div>
          <div class="order-code">
            订单号：
            <span>{{ order.order_id }}</span>
          </div>
          <div class="order-state">{{ order.statusInfo }}</div>
        </div>
        <div class="info-good">
          <div class="list-good">
            <div class="item" v-for="(item, index) in order.products" :key="index">
              <div class="item-good" @click="mix_to_goods(item)">
                <div class="img-box">
                  <img :src="item.image" alt />
                </div>
                <div class="title">
                  <div class="text" @click="mix_to_goods(item)">{{ item.title }}</div>
                  <div class="guige" @click="mix_to_goods(item)">{{ item.key_vals }}</div>
                </div>
                <div class="num">x {{ item.num }}</div>
                <div class="price">￥ {{ item.price_sale }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="comment-box">
        <div class="form-box">
          <div class="title">
            <div class="text">总体评分</div>
            <div>
              <el-rate v-model="rate"></el-rate>
            </div>
          </div>
          <div class="input-box">
            <el-input
              type="textarea"
              placeholder="分享购物心得..."
              v-model="content"
              maxlength="500"
              :autosize="{ minRows: 8 }"
              show-word-limit
            />
          </div>

          <div class="upload-box">
            <el-upload
              class="upload-demo"
              list-type="picture-card"
              multiple
              accept="image/*"
              :limit="upload_limit_number"
              :name="upload_col_name"
              :action="uploadAction"
              :on-success="uploadSuccess_pingjia"
              :before-upload="beforeUpload_pingjia"
              :data="uploadExtraData"
            >
              <i class="el-icon-plus"></i>

              <div class="el-upload__tip" slot="tip">
                <div class="tip-text-1">添加图片</div>
                <div class="tip-text-2">
                  最多
                  <b class="number">6</b>
                  张
                </div>
              </div>
            </el-upload>
          </div>
        </div>
        <div class="submit-box">
          <button class="btn btn-ripple" @click="submit_pingjia">发表评价</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "order-info",
  components: {},
  data() {
    return {
      inventoryId: this.$route.query.inventoryId || "", //商品规格
      order_id: this.$route.query.order_id || "", //订单id
      orderObj: {}, //订单信息
      order: {}, //订单信息
      rate: 0,
      content: "",
      upload_limit_number: 6,

      images: [], //评价图片

      //图片预览
      dialogVisible: false,
      dialogImageUrl: "",
    };
  },
  computed: {
    ...mapState([""]),
  },
  created() {
    this.setView();
  },
  methods: {
    setView() {
      this.$api("orders_detail", {
        id: this.order_id,
      }).then((res) => {
        let { code, data, message } = res;
        if (code == 1) {
          data.actions = this.getOrderActionsByStatus({
            ...data,
          });

          data.products = data.products.filter((v) => v.id == this.inventoryId);
          this.orderObj = data;
          this.order = data;
        }
      });
    },

    //提交评价
    submit_pingjia() {
      let { content, rate } = this;
      if (!rate) {
        alertErr("请选择总体评分");
        return;
      }
      if (!content) {
        alertErr("请输入评价内容");
        return;
      }

      let inventoryId = this.orderObj.products.map((v) => v.id).join();
      let urlArrStr = "";
      if (this.images) {
        urlArrStr = this.images.join("|");
      }
      let params = {
        order_id: this.order_id,
        inventoryId: inventoryId,
        star: this.rate, ///评分（1 2 3 4 5）
        content: this.content,
        uploadedfile1: urlArrStr,
      };
      //console.log("商品评价数据", params);

      this.$api("orders_comment", params).then((res) => {
        let { code, data } = res;
        if (code == 1) {
          // this.$router.push("/myReview");
          this.$router.back();
        }
      });
    },

    //上传相关
    //作品相关
    uploadSuccess_pingjia(res, file) {
      //console.log("上传结果", res);
      let { code, data, message } = res;
      alert(res);
      if (code == 1) {
        this.images.push(data);
      }
    },

    beforeUpload_pingjia(file) {
      const isLt2M = file.size / 1024 / 1024 < 20; //文件大小
      return isLt2M;
    },
  },
};
</script>

<style scoped lang="less">
/deep/ .el-rate__icon {
  color: @theme !important;
}

.page {
  padding-bottom: 80px;
  .main-title {
    .flex-between();
    padding: 0 32px;
    text-align: left;
    height: 56px;
    line-height: 56px;
    background: #ffffff;
    font-size: 16px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #333333;

    button {
      min-width: 96px;
      height: 30px;
      line-height: 30px;
      background: @theme;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
  }
}

.page-ctx {
  margin-top: 24px;
  padding: 24px 32px;
  background: #fff;
}

/deep/.btn-box {
  display: none;
}

/deep/ .el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.el-upload__tip {
  margin-top: 0;
  height: 100px;
  padding-left: 20px;
  display: inline-flex;
  // align-items: center;
  justify-content: center;
  flex-direction: column;

  .tip-text-1 {
    font-size: 16px;
    color: #777;
  }
  .tip-text-2 {
    margin-top: 20px;
    font-size: 14px;
    color: #888888;

    .number {
      color: #e6170b;
    }
  }
}

.order-product {
  border: 1px solid #e5e5e5;
  margin-bottom: 25px;
  .info-title {
    .flex-between();
    height: 48px;
    padding: 0 15px;
    background: #f5f5f5;
    border-bottom: 1px solid #e5e5e5;

    font-size: 14px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #333333;

    .date {
    }
    .order-code {
      flex: 2;
      text-align: left;
      padding-left: 20px;

      span {
      }
    }
    .order-state {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 20px;
      color: #999999;
    }
  }
  .info-good {
    .list-good {
      .item-good {
        padding: 20px;
        border-bottom: 1px dashed #e5e5e5;
        .flex();

        &:last-child {
          border: none;
        }

        .img-box {
          width: 100px;
          img {
            width: 100px;
            height: 100px;
          }
        }
        .title {
          cursor: pointer;
          text-align: left;
          padding-left: 20px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 20px;
          color: #333333;

          flex: 2;

          .guige {
            margin-top: 15px;
            cursor: pointer;
          }
        }
        .num {
          width: 100px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 20px;
          color: #999999;
        }
        .price {
          text-align: right;
          width: 150px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 20px;
          color: #333333;
        }
      }

      .goods-action {
        .flex();
        justify-content: flex-end;
        padding: 10px;
        .btn-goods-action {
          padding-left: 10px;
          padding-right: 10px;
          margin-left: 10px;
          min-width: 96px;
          height: 30px;
          background: @theme;
          font-size: 14px;
          font-family: Microsoft YaHei;
          color: #ffffff;
          border-radius: 14px;
          transition: 0.3s;

          &:hover {
            opacity: 0.8;
          }
          &.disabled {
            background: #e5e5e5;
          }
        }
      }
    }
  }
}

.comment-box {
  .form-box {
    min-height: 327px;
    background: #ffffff;
    border: 1px solid #e5e5e5;

    .title {
      .flex();
      height: 48px;
      padding-left: 20px;
      background: #f5f5f5;
      border-bottom: 1px solid #e5e5e5;

      .text {
        margin-right: 20px;
      }
    }

    .input-box {
      /deep/ textarea {
        border: none;
        border-bottom: 1px solid #e5e5e5;
        padding-top: 20px;
        font-size: 14px;

        &:focus {
          border-color: #e5e5e5 !important;
        }
      }
    }
  }

  .submit-box {
    margin-top: 40px;
    padding-bottom: 20px;
    .btn {
      width: 320px;
      height: 48px;
      background: #ea3200;
      border-radius: 4px 4px 4px 4px;
      transition: 0.3s;
      font-size: 16px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;

      &:hover {
        opacity: 0.75;
      }
    }
  }
}

.upload-box {
  padding: 20px 20px;
  text-align: left;
}
</style>

<style scoped lang="less" src="@/assets/h5css/shop/orderReview.less"></style>
