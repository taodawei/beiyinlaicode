<template>
  <div class="modal-container">
    <el-dialog
      class="modal-address"
      title="新增地址"
      width="500px"
      :visible.sync="showAdd"
      :before-close="onModal_close"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      custom-class="modal-sixin"
    >
      <div class="modal-inner">
        <div class="item">
          <span class="text">收货人</span>
          <el-input v-model="form.name" placeholder="收货人姓名"></el-input>
        </div>
        <div class="item">
          <span class="text">联系电话</span>
          <el-input v-model="form.phone" placeholder="联系电话"></el-input>
        </div>
        <!-- <div class="item">
          <span class="text">邮编</span>
          <el-input v-model="form.postCode" placeholder="收货人邮编"></el-input>
        </div> -->

        <div class="item">
          <span class="text">所在地区</span>
          <shengshiqu ref="shengshiqu" @updateAddress="updateAddress" />
        </div>
        <div class="item">
          <span class="text">详细地址</span>
          <el-input v-model="form.address" placeholder="详细地址"></el-input>
        </div>
        <div class="item">
          <span class="text">默认地址</span>
          <el-switch v-model="if_moren" active-color="#13ce66" inactive-color="#ddd">
          </el-switch>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <button class="btn-ripple quxiao" @click="showAdd = false">取 消</button>
        <button class="btn-ripple queding" @click="onSubmit">保 存</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import shengshiqu from "@/components/address/shengshiqu.vue"; //新增地址

import { mapState } from "vuex";
export default {
  name: "address-add",
  components: {
    shengshiqu,
  },
  props: [],
  data() {
    return {
      address_id: "",
      showAdd: false,
      if_moren: false,

      form: {
        name: "",
        phone: "",
        area_id: "",

        province_name: "",
        city_name: "",
        area_name: "",

        address: "",
        moren: "0",
        id: "0",
        postCode: "",
      },
    };
  },
  computed: {
    ...mapState(["baseInfo"]),
  },
  watch: {
    address_id(id) {
      //console.log("要编辑的地址信息");
      this.form.id = id;
      this.address_getDetail(id);
    },
  },

  methods: {
    //设置子组件省市区数据
    set_shengshiqu(data) {
      //console.log("set_shengshiqu", { ...data });
      this.$refs.shengshiqu.set_shengshiqu(data);
    },
    //更新当前父组件数据
    updateAddress(data) {
      //console.log("更新省市区数据", data);
      let { sheng, shi, qu } = data;
      this.form.province_name = sheng.title;
      this.form.city_name = shi.title;
      this.form.area_name = qu.title;
      this.form.area_id = qu.id;
      // debugger
    },

    //获取地址详情
    address_getDetail(id) {
      this.$api("userAddress_detail", { id }).then((res) => {
        let { code, data, message } = res;
        if (code == 1) {
          this.setFormData(data);
        }
      });
    },

    //设置表单数据
    setFormData(data) {
      //console.log("获取地址信息 data", data);
      let {
        name,
        phone,
        area_id,
        city_id,
        province_name,
        city_name,
        area_name,
        address,
        if_default,
        postCode,
      } = data;
      let formData = {
        name,
        phone,
        area_id: area_id,
        province_name,
        city_name,
        area_name,
        // postCode,
        address,
        moren: if_default,
        id: this.address_id,
      };

      this.form = formData;

      if (formData.moren == 1) {
        this.if_moren = true;
      } else {
        this.if_moren = false;
      }

      //设置省市区
      this.set_shengshiqu(data);
    },

    // 新建地址 / 编辑地址
    onSubmit() {
      let reg_phone = /^1[3-9]\d{9}$/;
      let is_true_phone = reg_phone.test(this.form.phone);

      if (this.if_moren) {
        this.form.moren = 1;
      } else {
        this.form.moren = 0;
      }

      let form_data = {
        name: this.form.name,
        phone: this.form.phone,
        area_id: this.form.area_id || 0, //所在区id

        province_name: this.form.province_name,
        city_name: this.form.city_name,
        area_name: this.form.area_name,

        address: this.form.address,
        // moren: this.form.isDefault ? 1 : 0,
        moren: this.form.moren || 0,
        id: this.form.id || 0, //0 为新增
        // postCode: this.form.postCode,
      };
      //console.log("要保存的信息", form_data);

      if (!form_data.name) {
        alertErr("请输入收货人姓名");
        return;
      }

      // if (!is_true_phone) {
      //   alertErr("请输入正确的收货人电话");
      //   return;
      // }
      if (!this.form.phone) {
        alertErr("请输入收货人电话");
        return;
      }

      if (!form_data.city_name) {
        alertErr("请选择所在地区");
        return;
      } else if (!form_data.address) {
        alertErr("请输入收货人详细地址");
        return;
      }

      this.$api("userAddress_add", form_data).then((res) => {
        let { code, data, message } = res;
        if (code == 1) {
          this.$parent.setView();
          this.showAdd = false;
        }
      });
    },

    onModal_close() {
      this.showAdd = false;
      //console.log("关闭前的回调");
      Object.keys(this.form).forEach((key) => {
        this.form[key] = "";
      });
    },
  },
};
</script>

<style scoped lang="less">
/*私信 */
/deep/ .modal-sixin {
  min-width: 40vw;
  .modal-inner {
    padding: 20px;
    .item {
      margin-bottom: 20px;
      .flex();
      .text {
        min-width: 120px;
        text-align: left;
      }
    }
    .send {
      margin-top: 30px;
    }
  }
}

/deep/ .el-dialog__header {
  border-bottom: 1px solid #eee;
}

/deep/ .el-textarea {
  .el-textarea__inner {
    // background-color: #f5f5f5;
  }
}
/deep/ .el-input {
  .el-input__inner {
    // background: #f9f9f9;
    &:disabled {
      // background-color: #eee;
      color: #666;
    }
  }
}

/deep/ .el-dialog__footer {
  text-align: center;

  button {
    width: 104px;
    height: 40px;
    border-radius: 4px 4px 4px 4px;
    border: 1px solid #ea3200;
    border: 1px solid transparent;
  }
  .queding {
    margin-left: 20px;
    background: @theme;
    border-radius: 3px;
    font-size: 14px;
    color: #ffffff;
    border: 1px solid #ea3200;
  }
  .quxiao {
    background: #fff;
    border-radius: 3px;
    font-size: 14px;
    color: @theme;
    border: 1px solid #ea3200;
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/user/addressAdd.less"></style>
