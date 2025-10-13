<template>
  <div class="liuyan-box">
    <div class="block-xunjia">
      <div class="detail-title">{{ formTitle }}</div>
      <div class="detail-title-line"></div>
      <div class="page-block">
        <div class="xunjia-box">
          <div class="input-item mr24">
            <div class="label">姓名：</div>
            <div class="input-box">
              <el-input v-model="form.name" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="input-item">
            <div class="label">电子邮箱：</div>
            <div class="input-box">
              <el-input v-model="form.email" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="input-item mr24">
            <div class="label">电话：</div>
            <div class="input-box">
              <el-input v-model="form.phone" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="input-item">
            <div class="label">所在省份：</div>
            <div class="input-box">
              <el-select v-model="form.address" placeholder="请选择">
                <el-option
                  v-for="item in list_sheng"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="input-item full">
            <div class="label">院校/机构</div>
            <div class="input-box">
              <el-input v-model="form.institution" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="input-item full">
            <div class="label">{{ contentLable }}</div>
            <div class="input-box">
              <el-input
                type="textarea"
                :autosize="{ minRows: 6 }"
                placeholder="请输入内容"
                v-model="form.content"
              >
              </el-input>

              <div class="upload-box">
                <el-upload
                  class="upload-demo"
                  multiple
                  :limit="6"
                  name="file"
                  :data="uploadExtraData"
                  :action="uploadAction"
                  :on-success="onSuccess_upload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <button class="btn-ripple btn-upload">
                    <img src="@img/upload.png" alt="" />
                    <span>上传附件</span>
                  </button>
                  <div slot="tip" class="el-upload__tip">
                    (上传附件文件格式xls、doc、txt、pdf、jpg、png 每个文件最大1M)
                  </div>
                </el-upload>
              </div>
              <div class="desc-box"></div>
            </div>
          </div>
        </div>

        <div class="submit-box">
          <button class="btn-ripple" @click="submit_form">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "liuyan-form",
  components: {},
  data() {
    return {
      fileList: [
        // { name: "food2.jpeg", url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100" }
      ],
      form: {
        name: "",
        email: "",
        phone: "",
        address: "",
        institution: "",
        content: "",
        file_info: "",
      },
      list_sheng: [],

      uploadList: [],
    };
  },
  computed: {
    ...mapState([""]),

    formTitle() {
      return this.$route.name == "questions" ? "问题留言" : "在线询价";
    },
    contentLable() {
      return this.$route.name == "questions" ? "问题描述" : "询价内容描述";
    },
  },

  watch: {
    uploadList(list, prev) {
      //console.log("询价咨询 watch, uploadList", list);
      this.form.file_info = list.map((v) => v.data).join("|");
    },
  },

  created() {
    this.setView();
  },
  methods: {
    setView() {
      //查询省份
      this.address_getAreaList({
        params: {},
        success: (data) => {
          this.list_sheng = data;
        },
      });
    },

    address_getAreaList({ params, success } = opt) {
      this.$api("users_getAreaList", params).then((res) => {
        let { code, data } = res;

        if (code == 1) {
          if (success) {
            success(data);
          }
        }
      });
    },

    submit_form() {
      let reg_phone = /^1[3-9]\d{9}$/;
      let reg_email = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;

      if (!this.form.name) {
        alertErr("请填写姓名");
        return;
      }
      if (!reg_email.test(this.form.email)) {
        alertErr("请填写正确的电子邮箱");
        return;
      }
      if (!reg_phone.test(this.form.phone)) {
        alertErr("请填写正确的电话号码");
        return;
      }
      if (!this.form.address) {
        alertErr("请选择所在省份");
        return;
      }
      if (!this.form.institution) {
        alertErr("请填写院校/机构");
        return;
      }
      if (!this.form.content) {
        alertErr("请填写询价内容描述");
        return;
      }

      let params = {
        skill_id: this.$route.params.id || 0,
        ...this.form,
      };

      //console.log("要提交的表单", params);

      this.$api("skill_consult", params).then((res) => {
        if (res.code == 1) {
          this.emptyFrom();
        }
      });
    },

    emptyFrom() {
      this.form = {
        name: "",
        email: "",
        phone: "",
        address: "",
        institution: "",
        content: "",
        file_info: "",
      };

      this.uploadList = [];
      this.fileList = [];
    },

    onSuccess_upload(res, file) {
      // debugger
      //console.log("onSuccess_upload 上传结果 res", res);
      //console.log("onSuccess_upload 上传结果 file", file);
      let { code, data, message } = res;

      if (code == 1) {
        // this.$parent.uploadSuccess(this.col, res);
        // this.form.file_info = res.data;
        let info = {
          ...res,
          name: file.name,
        };
        this.uploadList.push(info);
        //console.log("onSuccess_upload uploadList", this.uploadList);
      }
    },

    handleRemove(file, fileList) {
      //console.log(file, fileList);

      let index = this.uploadList.findIndex((v) => v.name == file.name);
      this.uploadList.splice(index, 1);

      //console.log("handleRemove uploadList", this.uploadList);
    },

    handlePreview(file) {
      //console.log(file);
    },

    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },

    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

<style scoped lang="less">
.page-block {
  width: @width;
  margin: 0 auto;
}

.detail-title {
  text-align: center;
  position: relative;
  font-size: 36px;
  font-family: Microsoft YaHei-Bold, Microsoft YaHei;
  font-weight: bold;
  color: #333333;

  .btn-xunjia {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 20px;

    width: 140px;
    height: 40px;
    line-height: 40px;
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

.block-xunjia {
  min-height: 950px;
  padding-top: 75px;
  padding-bottom: 65px;
  background: #f7f7f7;

  .xunjia-box {
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    .input-item {
      width: calc((100% - 28px) / 2);
      margin-bottom: 18px;

      &.mr24 {
        margin-right: 24px;
      }
      &.full {
        width: 100%;
      }
      .label {
        margin-bottom: 15px;
      }
      .input-box {
        .el-select {
          width: 100%;
        }
      }
    }

    .upload-box {
      margin-top: 30px;
    }
  }

  .submit-box {
    margin-top: 50px;
    text-align: center;
    button {
      width: 480px;
      height: 56px;
      background: #ea3200;
      border-radius: 4px 4px 4px 4px;

      font-size: 22px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
    }
  }
}

.btn-upload {
  .flex-center();
  min-width: 128px;
  height: 40px;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #ea3200;
  font-size: 14px;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: #ea3200;

  img {
    margin-right: 10px;
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/zujian/LiuyanForm.less"></style>
