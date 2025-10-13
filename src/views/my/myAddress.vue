<template>
  <div class="page">
    <!-- 新增收货地址 -->
    <addressAdd ref="addressAdd" />

    <div class="main-title">
      <span>地址管理</span>
      <button @click="show_add('新增')">
        <img src="@img/address-add.png" alt="" />
        <span>添加收货地址</span>
      </button>
    </div>

    <div class="page-ctx">
      <div class="center">
        <div class="wrap-address">
          <div class="address-item" v-for="(item, index) in list_address" :key="index">
            <div class="top">
              <div>
                <span>收货人：</span>
                {{ item.name }}
              </div>
              <div>
                <span>所在地区：</span>
                {{ item.areaName }}
              </div>
              <div>
                <span>详细地址：</span>
                {{ item.address }}
              </div>
              <div>
                <span>手机号码：</span>
                {{ item.phone }}
              </div>
            </div>
            <div class="bottom">
              <div class="left">
                <span v-if="item.if_default" class="moren">默认地址</span>
              </div>
              <div class="right">
                <span
                  class="action"
                  v-if="!item.if_default"
                  @click="address_setDefault(item.id)"
                  >设为默认</span
                >
                <span class="action" @click="address_edit(item)">编辑</span>
                <span class="action" @click="address_delete(item.id)">删除</span>
              </div>
            </div>
          </div>
        </div>

        <el-empty v-if="!list_address.length" description="尚未添加地址"></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import addressAdd from "@/components/address/addressAdd.vue"; //新增地址

import address from "@/shop-actions/address";

import { mapState } from "vuex";
export default {
  name: "servicePage",
  components: {
    addressAdd,
  },
  data() {
    return {
      pagination: {
        page: 1,
        pagenum: 500,
      },
      list_address: [],
    };
  },
  computed: {
    ...mapState(["defaultAvatar"]),
  },
  created() {
    this.setView();
  },
  methods: {
    setView() {
      this.mix_address_list();
    },

    show_add(type, id) {
      // debugger;
      this.$refs.addressAdd.showAdd = true;
      if (type == "编辑") {
        //console.log("编辑地址", id);
        this.$refs.addressAdd.address_id = id;
      } else if (type == "新增") {
        //console.log("新增地址");
      }
    },

    address_edit(item) {
      //console.log({ ...item });
      this.show_add("编辑", item.id);
    },

    //地址删除
    address_delete(id) {
      this.$api("userAddress_delete", {
        id: id,
      }).then((res) => {
        let { code } = res;
        if (code == 1) {
          this.setView();
        }
      });
    },

    //设置默认地址
    address_setDefault(id) {
      address.setDefault({
        params: { id },
        success: () => {
          this.setView();
        },
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
      .flex();
      min-width: 96px;
      height: 30px;
      line-height: 30px;
      background: @theme;
      color: #fff;
      background: #fff;
      color: @theme;
      font-size: 14px;
      // font-weight: bold;

      img {
        width: 20px;
        margin-right: 5px;
      }
    }
  }

  .page-ctx {
    margin-top: 24px;
    padding: 32px 32px 55px 32px;
    background: #fff;
  }
}

// 地址列表
.wrap-address {
  text-align: left;
  .address-item {
    min-height: 190px;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    padding: 20px;
    margin-bottom: 20px;
    .top {
      padding-bottom: 20px;
      > div {
        margin-bottom: 10px;
        color: #333333;
        &:last-child {
          margin-bottom: 0;
        }

        span {
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #666666;
        }
      }
    }
    .bottom {
      .flex-between();
      border-top: 1px solid #eeeeee;
      padding-top: 20px;

      .left {
        .moren {
          display: inline-block;
          width: 104px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          // background: rgba(255, 90, 0, 0.68);
          background: @theme;
          font-size: 14px;
          color: #ffffff;
        }
      }

      .right {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 20px;
        color: @theme;

        .action {
          margin-left: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/user/myAddress.less"></style>
