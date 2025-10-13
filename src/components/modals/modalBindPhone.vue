<template>
  <div class="modal-container">
    <el-dialog
      title="修改手机号"
      width="596px"
      custom-class="modal-record modal-bind-phone"
      :close-on-click-modal="false"
      :visible.sync="show"
      :before-close="onModalClose"
    >
      <!-- <div class="top-actions">
        <button class="queding" @click="form_save">暂存</button>
        <button class="queding" @click="form_submit">确认提交</button>
      </div> -->

      <div class="modal-inner">
        <div class="modall-ctx">
          <!-- <div class="tip">密码要求至少包含字母，符号或数字中的两项且长度超过6位，</div> -->

          <div class="input-box flex">
            <div class="label">新手机号</div>
            <div class="input-item">
              <el-input type="text" v-model="phone" placeholder="手机号"> </el-input>
              <button class="btn-send" @click="onSendPhoneCode" :disabled="disabledBtn">
                获取验证码
                <span>（{{ time }}）</span>
              </button>
            </div>
          </div>
          <div class="input-box flex">
            <div class="label">验证码</div>
            <div class="input-item">
              <el-input type="text" v-model="code" placeholder="验证码"> </el-input>
              <!-- <SmsLogin :form="form" /> -->
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <button class="queding" @click="form_save">暂存</button> -->
        <button class="btn-ripple cancel" @click="show = false">取消</button>
        <button class="btn-ripple queding" @click="form_submit">修改</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SmsLogin from "@/components/login/SmsLogin.vue"; //短信验证码

import { mapState } from "vuex";

export default {
  name: "modal-hetong",
  components: {
    SmsLogin,
  },
  props: ["curr"],
  data() {
    return {
      show: false,

      phone: "",
      code: "",

      disabledBtn: false, //按钮是否可点击
      timer: null, //定时器 验证码
      timeTotal: 120, //验证码总时长
      time: 120, //验证码倒计时
    };
  },
  computed: {},
  watch: {
    show(val) {
      if (!val) {
        this.phone = "";
        this.code = "";
      }
    },
  },

  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },

  methods: {
    onSendPhoneCode() {
      //console.log("发送验证码");
      let phone = this.phone;
      if (this.timer) {
        alertErr("验证码发送频繁，请稍后再试");
        return;
      }
      let phoneReg = /^1[3-9]\d{9}$/;
      if (!phoneReg.test(phone)) {
        alertErr("请先输入正确的手机号码");
        return;
      }
      this.countdown();

      this.$api("users_sendSms", {
        phone: phone,
      }).then((res) => {
        //console.log("验证码", res);
        let { code, message } = res;

        if (code == 1) {
          // this.$emit("updateCode", data);
        }
      });
    },

    //倒计时
    countdown() {
      let that = this;
      this.disabledBtn = true;

      this.timer = setInterval(() => {
        if (that.time > 0) {
          that.time--;
        } else {
          that.time = that.timeTotal;
          clearInterval(that.timer);
          that.timer = null;
          this.disabledBtn = false;
        }
      }, 1000);
    },

    init(text) {
      this.show = true;
    },
    onModalClose() {
      this.show = false;
    },

    onConfirm() {
      this.show = false;
      this.$router.back();
    },

    form_submit() {
      let reg_phone = /^1[3-9]\d{9}$/;
      let reg_email = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;
      let is_true_phone = reg_phone.test(this.phone);

      if (!is_true_phone) {
        alertErr("请输入正确的手机号码");
        return;
      }
      if (!this.code) {
        alertErr("请输入验证码");
        return;
      }

      this.$api("users_changePhone", {
        phone: this.phone,
        code: this.code,
        source: 0,
      }).then((res) => {
        //console.log("修改密码", res);
        let { code, data } = res;
        if (code == 1) {
          this.$parent.parentHandleModalAction({ type: "修改绑定" });
          this.show = false;
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.upload-plus {
  width: 140px;
}

/deep/ .el-upload {
  display: block;
  width: 200px;
  margin: 0 auto;
  margin: 0;

  .empty {
    .flex-center();
  }
}

/deep/ .modal-record {
  // margin-top: 80px !important;
  .top-actions {
    .flex();
    height: 64px;
    padding-left: 20px;
    background: #cce9ff;

    button {
      margin-right: 40px;
      text-align: center;
      width: 113px;
      height: 40px;
      line-height: 40px;
      background: #0060fa;
      border-radius: 4px;
      font-size: 16px;
      font-family: PingFang SC;
      color: #ffffff;
      opacity: 1;
    }
  }
  .modal-inner {
    padding: 0;
  }

  .el-dialog__header {
    .flex-between();
    border-bottom: 1px solid #eee;
    background: #a98c4d;
    background: #f7f7f7;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    font-size: 18px;
    color: #333;

    .el-dialog__title {
      color: #000;
    }
    .el-dialog__headerbtn {
      // top: 0;
      .el-dialog__close {
        color: #000;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }

  .el-dialog__body {
    padding: 0;
  }

  .el-dialog__footer {
    text-align: center;

    button {
      width: 104px;
      height: 40px;
      border-radius: 4px 4px 4px 4px;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      border: 1px solid @theme;

      & + button {
        margin-left: 20px;
      }
    }

    .cancel {
      color: @theme;
      background: #fff;
    }
    .queding {
      color: #fff;
      background: @theme;
    }
  }
}

.modall-ctx {
  padding: 30px 50px;
  max-height: 60vh;
  overflow-y: auto;
  border-bottom: 1px solid #ddd;

  .tip {
    margin-bottom: 20px;
    color: #444;
    font-size: 14px;
  }

  .input-box {
    margin-bottom: 15px;
    position: relative;

    &.flex {
      display: flex;
      align-items: center;

      .label {
        margin-bottom: 0;
      }
    }

    .label {
      min-width: 80px;
      // margin-right: 20px;
      margin-bottom: 20px;
      font-size: 14px;
      color: #6e7285;
    }

    .input-item {
      display: flex;
      align-items: center;
    }

    .el-input {
      width: 220px;
    }
  }
}

.upload-ctx {
  margin: 20px 0;
}

.btn-send {
  // position: absolute;
  // right: -50px;
  // top: 10px;
  min-width: 90px;
  padding: 0 10px;
  height: 40px;
  background: #fff;
  color: @theme;
  font-size: 14px;
  margin-left: 15px;
  border-radius: 5px;
  &:disabled {
    background: #eee;
    color: #999;
    cursor: not-allowed;
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/modals/modalBindPhone.less"></style>
