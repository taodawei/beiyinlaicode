<template>
  <div class="page">
    <div class="main-title">
      <span>修改密码</span>
    </div>

    <div class="page-ctx">
      <div class="other">
        <!-- <div class="section-title">个人信息</div> -->
        <div class="section-ctx">
          <!-- <div class="item">
            <span class="text">旧密码：</span>
            <span class="info">
              <input type="text" v-model="form.old_pass" class="nickname" />
            </span>
            <span class="action"> </span>
          </div> -->

          <div class="item">
            <span class="text">新密码：</span>
            <span class="info">
              <input type="password" v-model="form.pass" class="nickname" />
            </span>
            <span class="action"> </span>
          </div>
          <div class="item">
            <span class="text">确认密码：</span>
            <span class="info">
              <input type="password" v-model="form.confirm_pass" class="nickname" />
            </span>
            <span class="action"> </span>
          </div>
          <div class="item btn-box">
            <span class="text" style="visibility: hidden">-</span>
            <div class="info">
              <button class="btn-ripple btn-save" @click="userinfo_submit">确认</button>
              <button class="btn-ripple btn-cancel" @click="clearInput">清空</button>
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
  name: "servicePage",
  components: {},
  data() {
    return {
      form: {
        old_pass: "",
        pass: "",
        confirm_pass: "",
      },
    };
  },
  computed: {
    ...mapState(["baseInfo"]),
  },
  watch: {},
  created() {
    this.setView();
  },
  methods: {
    setView() {
      this.$store.dispatch("getUserInfo");
    },

    clearInput() {
      this.form = {
        old_pass: "",
        pass: "",
        confirm_pass: "",
      };
    },

    userinfo_submit() {
      // if (!this.form.old_pass) {
      //   alertErr("请输入旧密码");
      //   return;
      // }
      if (!this.form.pass) {
        alertErr("请输入新密码");
        return;
      }
      if (!this.form.confirm_pass) {
        alertErr("请输入确认密码");
        return;
      }
      if (this.form.pass != this.form.confirm_pass) {
        alertErr("两次密码不一致");
        return;
      }

      this.$api("users_changePass", {
        source: 2,
        ...this.form,
      }).then((res) => {
        let { code, message, data } = res;
        if (code == 1) {
          // this.$router.back();

          this.clearInput();
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
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
    min-height: 400px;
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

<style scoped lang="less" src="@/assets/h5css/user/updatePass.less"></style>
