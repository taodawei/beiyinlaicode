<template>
  <div class="page">
    <!-- 图片预览 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>

    <div class="main-title">意见反馈</div>

    <div class="select-box">
      <div class="info-title">投诉项目</div>
      <div class="info-ctx">
        <el-checkbox-group v-model="checkList">
          <el-checkbox v-for="(item, index) in opt_reason" :key="index" :label="item">
            {{ item }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <div class="comment-box">
      <div class="form-box">
        <div class="title">反馈与建议</div>
        <div class="input-box">
          <el-input type="textarea" placeholder="请您写出对平台的意见和建议！" v-model="content" maxlength="500" :autosize="{ minRows: 6 }" show-word-limit />
        </div>

        <div class="upload-box">
          <el-upload class="upload-demo" list-type="picture-card" multiple accept="image/*" :limit="upload_limit_number" :name="upload_col_name" :action="uploadAction" :on-success="uploadSuccess_pingjia" :before-upload="beforeUpload_pingjia" :data="uploadExtraData">
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
        <button class="btn" @click="submit_feedback">提交</button>
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
      checkList: [],
      content: "",

      images: [], //评价图片
      upload_limit_number: 6,

      //图片预览
      dialogVisible: false,
      dialogImageUrl: "",
    };
  },
  computed: {
    ...mapState([""]),

    opt_reason() {
      return this.webConfig.feed_type;
    },
  },
  created() {
    this.setView();
  },
  methods: {
    setView() {},

    form_init() {
      this.checkList = [];
      this.content = "";
      this.images = [];
    },

    //提交评价
    submit_feedback() {
      let { checkList, content } = this;
      let feed_type = checkList.join();
      if (!this.checkList.length) {
        alertErr("请选择投诉项目");
        return;
      }
      if (!content) {
        alertErr("请输入反馈内容");
        return;
      }

      let urlArrStr = "";
      if (this.images) {
        urlArrStr = this.images.join("|");
      }
      let params = {
        feed_type: feed_type,
        content: content,
        originalPic: urlArrStr,
      };
      //console.log("商品评价数据", params);

      this.$api("index_feedback", params).then((res) => {
        let { code, data, count } = res;
        if (code == 1) {
          this.form_init();
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
/deep/.btn-box {
  display: none;
}

/deep/ .el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}

/deep/ .el-upload-list--picture-card .el-upload-list__item {
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
    font-size: 24px;
    color: #222222;
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

.page {
  padding-bottom: 80px;
  .main-title {
    margin-bottom: 20px;
    text-align: left;

    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 20px;
    color: #333333;
  }
}

.select-box {
  border: 1px solid #ddd;
  margin-bottom: 40px;
  .info-title {
    .flex-between();
    height: 48px;
    line-height: 48px;
    padding: 0 20px;
    background: #f9f9f9;
    border-bottom: 1px solid #cccccc;
    font-size: 14px;
    color: #333333;
  }

  .info-ctx {
    text-align: left;
    min-height: 60px;
    padding: 20px;
  }
}

.comment-box {
  .form-box {
    min-height: 327px;
    background: #ffffff;
    border: 1px solid #cccccc;

    .title {
      .flex();
      height: 48px;
      padding: 0 20px;
      background: #f9f9f9;
      border-bottom: 1px solid #cccccc;
      font-size: 14px;
      color: #333333;
    }

    .input-box {
      /deep/ textarea {
        border: none;
        border-bottom: 1px solid #ddd;
        padding-top: 20px;
        font-size: 14px;

        &:focus {
          border-color: #ccc !important;
        }
      }
    }
  }

  .submit-box {
    margin-top: 40px;
    .btn {
      width: 240px;
      line-height: 40px;
      height: 40px;
      width: 240px;
      height: 60px;
      line-height: 60px;
      background: linear-gradient(90deg, #ff9312 0%, #eb5d53 100%);
      background: @theme;
      border-radius: 45px;
      border-radius: 0;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
      transition: 0.3s;

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
