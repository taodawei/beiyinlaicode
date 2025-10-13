<template>
  <div class="page">
    <modalBindPhone ref="modalBindPhone" />

    <div class="main-title">
      <span>个人资料</span>
    </div>

    <div class="page-ctx">
      <div class="section">
        <div class="section-title">基本信息</div>
        <div class="section-ctx">
          <div class="item upload-box">
            <span class="text">头像：</span>
            <span class="info">
              <el-upload
                class="upload-demo"
                accept="image/*"
                :show-file-list="false"
                :name="upload_col_name"
                :action="uploadAction"
                :on-success="uploadSuccess"
                :before-upload="beforeUpload"
                :data="uploadExtraData"
              >
                <img v-if="user_image" :src="user_image" class="user-avatar" />
                <img v-else :src="defaultAvatar" class="user-avatar" />
              </el-upload>
            </span>
          </div>

          <div class="item">
            <span class="text">手机：</span>
            <span class="info">{{ baseInfo.username }}</span>
            <span class="action" @click="updatePhone">
              <span>修改</span>
            </span>
          </div>

          <!-- <div class="item">
            <span class="text">昵称：</span>
            <span class="info">
              <input type="text" v-model="nickname" class="nickname" />
            </span>
            <span class="action">
        
            </span>
          </div> -->

          <!-- <div class="item">
            <span class="text">密码：</span>
            <span class="info">******</span>
            <span class="action">
              <span @click="$router.push('/retrieve')">修改</span>
            </span>
          </div> 
          <div class="item">
            <span class="text">账号：</span>
            <span class="info" style="visibility: hidden">******</span>
            <span class="action">
              <span @click="mix_logout">退出登录</span>
            </span>
          </div> -->
        </div>
      </div>

      <div class="other">
        <div class="section-title">个人信息</div>
        <div class="section-ctx">
          <div class="item">
            <span class="text">真实姓名：</span>
            <span class="info">
              <input type="text" v-model="form.real_name" class="nickname" />
            </span>
            <span class="action"> </span>
          </div>
          <div class="item">
            <span class="text">所在地区：</span>
            <span class="info">
              <input type="text" v-model="form.address" class="nickname" />
            </span>
            <span class="action"> </span>
          </div>
          <div class="item">
            <span class="text">研究机构：</span>
            <span class="info">
              <input type="text" v-model="form.company" class="nickname" />
            </span>
            <span class="action"> </span>
          </div>
          <div class="item">
            <span class="text">课题组：</span>
            <span class="info">
              <input type="text" v-model="form.u_group" class="nickname" />
            </span>
            <span class="action"> </span>
          </div>
          <div class="item">
            <span class="text">销售工程师：</span>
            <span class="info">
              <input type="text" v-model="form.worker" class="nickname" />
            </span>
            <span class="action"> </span>
          </div>

          <div class="item btn-box">
            <span class="text" style="visibility: hidden">-</span>
            <div class="info">
              <button class="btn-ripple btn-save" @click="userinfo_submit">保存</button>
              <button class="btn-ripple btn-cancel" @click="userinfo_reset">清空</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalBindPhone from "@/components/modals/modalBindPhone.vue";

import { mapState } from "vuex";

export default {
  name: "servicePage",
  components: {
    modalBindPhone,
  },
  data() {
    return {
      user_image: "", //上传的头像

      form: {
        real_name: "",

        address: "",
        company: "",
        u_group: "",
        worker: "",
      },
    };
  },
  computed: {
    ...mapState(["baseInfo"]),
  },
  watch: {
    baseInfo(data) {
      this.user_image = data.user_image || "";

      this.form = {
        real_name: data.real_name || "",

        address: data.address || "",
        company: data.company || "",
        u_group: data.u_group || "",
        worker: data.worker || "",
      };
    },
  },
  created() {
    this.setView();
  },
  methods: {
    updatePhone() {
      this.$refs.modalBindPhone.init();
    },

    setView() {
      this.$store.dispatch("getUserInfo");

      // this.$api("users_userInfo").then((res) => {
      //   //console.log("动态获取用户信息", res);
      //   let { code, data, message } = res;
      //   // debugger
      //   if (code == 1) {

      //   }
      // });
    },

    //上传相关
    //作品相关
    uploadSuccess(res, file) {
      //console.log("上传结果", res);
      let { code, data, message } = res;
      alert(res);
      if (code == 1) {
        this.user_image = data;
      }
    },

    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20; //文件大小
      return isLt2M;
    },

    userinfo_submit() {
      let params = {
        ...this.form,
        image: this.user_image,
      };

      this.$api("users_editInfo", params).then((res) => {
        let { code, message, data } = res;
        alert(res);
        if (code == 1) {
          this.setView();
        }
      });
    },

    userinfo_reset() {
      this.form = {};
    },
  },
};
</script>

<style scoped lang="less">
.user-avatar {
  object-fit: cover;
}
.page {
  text-align: left;
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

  .page-ctx {
    margin-top: 24px;
    padding: 32px 32px 40px 32px;
    background: #fff;
  }
}

.page {
  .page-ctx {
    padding-bottom: 80px;

    .section {
      // padding-bottom: 27px;
      margin-bottom: 40px;
      border-bottom: 1px solid #dbdbdb;
    }

    .section-title {
      font-size: 16px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #666666;
    }
    .section-ctx {
      padding-top: 32px;
    }

    .upload-box {
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }

    .item {
      margin-bottom: 20px;
      display: flex;
      align-items: center;

      .text {
        display: inline-block;
        min-width: 134px;
        text-align: right;
        font-size: 14px;
        color: #666;
      }

      .info {
        padding-left: 10px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        display: inline-block;
        min-width: 120px;

        input {
          width: 400px;
          height: 40px;
          background: #ffffff;
          border-radius: 4px 4px 4px 4px;
          border: 1px solid #d4d4d4;
        }
      }

      .action {
        margin-left: 20px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: @theme;

        span {
          margin-right: 20px;
          cursor: pointer;
        }
      }
    }
  }
}

.nickname {
  border: 1px solid #ddd;
  padding-left: 20px;
  height: 30px;
  line-height: 30px;
}

.btn-box {
  button {
    width: 76px;
    height: 40px;
  }

  .btn-save {
    background: #ea3200;
    border-radius: 4px 4px 4px 4px;
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
  }
  .btn-cancel {
    margin-left: 24px;
    border-radius: 4px 4px 4px 4px;
    border: 1px solid #ea3200;
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #ea3200;
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/user/myInfo.less"></style>
