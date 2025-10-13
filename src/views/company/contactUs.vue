<template>
  <div class="page">
    <pageCompanyTop :pageOpt="pageOpt" />
    <div class="inner">
      <div class="section-1">
        <div class="info-box">
          <h1 class="main-title">{{ company_title }}</h1>
          <div class="other-info" v-html="detail.content">
            <!-- <p>地址：潍坊市寒亭区固堤街道办事处曲范村</p>
            <p>电话：13953659060</p>
            <p>座机：0536-7375615</p>
            <p>传真：0536-4966668</p>
            <p>邮箱：13953659060@163.com</p> -->
          </div>
        </div>
        <div class="map-box">
          <div id="map">
            <commonMap />
          </div>
        </div>
      </div>

      <div class="section-2">
        <div class="form-box">
          <h2 class="form-title">留言咨询</h2>

          <div class="input-item">
            <div class="label">描述</div>
            <textarea type="text" v-model="form.content" placeholder="请输入描述"> </textarea>
          </div>
          <div class="input-item">
            <div class="label required">姓名</div>
            <input type="text" v-model="form.name" placeholder="请输入姓名" />
          </div>
          <div class="input-item">
            <div class="label required">手机</div>
            <input type="text" v-model="form.phone" placeholder="请输入手机号" />
          </div>
          <div class="input-item">
            <div class="label required">邮箱</div>
            <input type="text" v-model="form.email" placeholder="请输入邮箱" />
          </div>
          <div class="input-item">
            <div class="label required">验证码</div>
            <input class="vali-code" type="text" v-model="form.code" placeholder="请输入验证码" />

            <imageCaptcha :form="form" />
          </div>

          <div class="btn-box">
            <button class="btn" @click="form_submit">提交</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import commonMap from "@/components/map/commonMap.vue";
import imageCaptcha from "@/components/account/imageCaptcha.vue"; //表单提交的信息发布规则勾选

import { mapState } from "vuex";

export default {
  name: "index",
  components: {
    commonMap,
    imageCaptcha,
  },
  data() {
    return {
      detail: {},
      form: {
        // feed_type: "",
        content: "",
        name: "",
        phone: "",
        email: "",
        code: "",
        _code_captcha: "", //图形验证码
      },
    };
  },
  computed: {
    ...mapState([""]),

    pageOpt() {
      let opt = {
        banner: "",
        list_bread: [
          {
            title: "联系我们",
            route: "",
          },
        ],
      };

      return opt;
    },
  },

  watch: {},

  created() {
    this.setView();
  },

  methods: {
    setView() {
      //联系我们
      this.$api("index_newsDetail", {
        id: 10,
      }).then((res) => {
        //console.log("联系我们", res);
        let { code, data } = res;
        if (code == 1) {
          this.detail = data.info;
        }
      });
    },

    form_submit() {
      let reg_phone = /^1[3-9]\d{9}$/;
      let reg_email = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;

      let { content, name, phone, email, code, _code_captcha } = this.form;
      let is_true_phone = reg_phone.test(phone);
      let is_true_email = reg_email.test(email);

      if (!content) {
        alertErr("请输入描述内容");
        return;
      }
      if (!name) {
        alertErr("请输入姓名");
        return;
      }
      if (!is_true_phone) {
        alertErr("请输入正确的手机号");
        return;
      }
      if (!is_true_email) {
        alertErr("请输入正确的邮箱");
        return;
      }
      if (code != _code_captcha) {
        alertErr("请输入正确的验证码");
        return;
      }

      this.$api("index_feedback", {
 
        content,
        name,
        phone,
        email,
      }).then((res) => {
        let { code, data } = res;
        if (code == 1) {
          this.form = {
          
            content: "",
            name: "",
            phone: "",
            email: "",
            code: "",
          };
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.page {
  .inner {
    padding-top: 70px;
    padding-bottom: 70px;
  }
}

.section-1 {
  .flex-between();
  align-items: flex-start;
  width: 1344px;
  margin: 0 auto;
  text-align: left;

  .info-box {
    .main-title {
      padding-top: 60px;
      padding-bottom: 67px;

      font-size: 30px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #009a44;
    }
    .other-info {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 18px;
      color: #333333;

      /deep/ p {
        margin-bottom: 20px;
      }
    }
  }
}

#map {
  width: 728px;
  height: 451px;
  background: #eee;
}

.section-2 {
  width: 1390px;
  margin: 0 auto;
  margin-top: 50px;

  .form-box {
    min-height: 400px;
    background: #f2f2f2;
    padding: 30px 50px;

    .form-title {
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: normal;
    }

    .input-item {
      margin-bottom: 15px;
      .flex();
      .label {
        min-width: 120px;
        text-align: right;
        padding-right: 15px;
        font-size: 14px;
        color: #999;

        &.required {
          &::before {
            content: "*";
            color: #f00;
            margin-right: 5px;
          }
        }
      }

      input,
      textarea {
        flex: 2;
        height: 38px;
        padding-left: 15px;
        border: none;
        outline: none;

        &::-webkit-input-placeholder {
          color: #999;
        }

        &.vali-code {
          flex: none;
          width: 250px;
          margin-right: 10px;
        }
      }

      textarea {
        padding: 15px;
        height: auto;
        min-height: 65px;
      }
    }
    .btn-box {
      .btn {
        width: 120px;
        height: 36px;
        background: #029060;
        opacity: 1;
        border-radius: 4px;

        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 28px;
        color: #ffffff;
      }
    }
  }
}
</style>
