<template>
  <div class="page">
    <pageAboutTop />

    <div class="page-box">
      <div class="page-inner">
        <div class="detail-title">销售网络</div>
        <div class="detail-title-line"></div>
        <div class="detail-desc">产品询价购买，请联系我们在中国/地区的销售人员。</div>
        <div class="detail-select" v-if="false">
          <div class="select-item">
            <el-select
              clearable
              v-model="sheng"
              placeholder="请选择省"
              @change="change_sheng"
            >
              <el-option
                v-for="item in list_sheng"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="select-item">
            <el-select
              clearable
              v-model="shi"
              placeholder="请选择市"
              @change="change_shi"
            >
              <el-option
                v-for="item in list_shi"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="search-box">
            <button class="btn-ripple" @click="queryBusiness('地区')">
              <img src="@img/search-business.png" alt="" />
              搜索
            </button>
          </div>
        </div>

        <div class="detail-content">
          <div class="groups">
            <!-- 地区，销售人员名字，联系电话，邮箱 -->
            <!-- <div class="group-item" v-for="(group, index) in list_business" :key="index">
              <div class="group-title">
                {{ group.area }}
              </div>
              <div class="user-items">
                <div class="user-item" v-for="(item, index) in group.list" :key="index">
                  <div class="user-name">{{ item.name }}</div>
                  <div class="user-phone">{{ item.phone }}</div>
                  <div class="user-email">{{ item.email }}</div>
                </div>
              </div>
            </div> -->
            <div class="group-item" v-for="(item, index) in list_user" :key="index">
              <div class="group-title">
                {{ item.area }}
              </div>
              <div class="user-items">
                <div class="user-item">
                  <div class="user-name">{{ item.name }}</div>
                  <div class="user-phone">{{ item.phone }}</div>
                  <div class="user-email">{{ item.email }}</div>
                </div>
              </div>
            </div>
          </div>

          <el-empty
            item
            v-if="!list_user.length"
            description="未查询到相关信息..."
          ></el-empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "create-order",
  components: {},
  data() {
    return {
      // loading: false,
      list_business: [],
      list_user: [],

      //id
      sheng: "",
      shi: "",
      qu: "",

      //之前的id
      sheng_prev: "",
      shi_prev: "",
      qu_prev: "",

      //列表
      list_sheng: [],
      list_shi: [],
      list_qu: [],
    };
  },
  computed: {
    ...mapState([""]),
  },
  watch: {
    sheng() {
      this.update_shengshiqu();
    },
    shi() {
      this.update_shengshiqu();
    },
    qu() {
      this.update_shengshiqu();
    },
  },

  created() {
    this.setView();
  },
  methods: {
    //更新父组件省市区
    update_shengshiqu() {
      let obj_sheng = {};
      let obj_shi = {};
      let obj_qu = {};
      if (this.sheng) {
        obj_sheng = this.list_sheng.find((v) => v.id == this.sheng);
      }
      if (this.shi) {
        obj_shi = this.list_shi.find((v) => v.id == this.shi);
      }
      if (this.qu) {
        obj_qu = this.list_qu.find((v) => v.id == this.qu);
      }

      let obj = {
        sheng: obj_sheng,
        shi: obj_shi,
        qu: obj_qu,
      };
      this.$emit("updateAddress", obj);
    },

    //父组件设置当前组件省市区数据
    async set_shengshiqu(data) {
      //console.log("父组件设置当前组件省市区数据", data);
      let { province_name, city_name, area_name, province_id, city_id, area_id } = data;
      // this.sheng = province_id;
      // this.shi = city_id;
      // this.qu = area_id;

      //省
      let obj_sheng = this.list_sheng.find((v) => v.title == province_name) || {};
      this.sheng = obj_sheng.id;

      //市
      let res_shi = await this.$api("users_getAreaList", { parent_id: this.sheng });
      this.list_shi = res_shi.data || [];
      let obj_shi = this.list_shi.find((v) => v.title == city_name) || {};
      this.shi = obj_shi.id;

      //区
      let res_qu = await this.$api("users_getAreaList", { parent_id: this.shi });
      this.list_qu = res_qu.data || [];
      let obj_qu = this.list_qu.find((v) => v.title == area_name) || {};
      this.qu = obj_qu.id;

      //console.log("查询城市数据 res_shi", res_shi);
      //console.log("查询区县数据 res_qu", res_qu);
    },

    //查询城市
    change_sheng(id) {
      //省份被修改了
      if (this.sheng_prev && id != this.sheng_prev) {
        this.shi = "";
        this.qu = "";
      }
      this.sheng_prev = id;

      this.address_getAreaList({
        params: { parent_id: id },
        success: (data) => {
          this.list_shi = data;
        },
      });
    },

    //查询区县
    change_shi(id) {
      //城市被修改了
      if (this.shi_prev && id != this.shi_prev) {
        this.qu = "";
      }
      this.shi_prev = id;

      this.address_getAreaList({
        params: { parent_id: id },
        success: (data) => {
          this.list_qu = data;
        },
      });
    },

    setView() {
      this.queryBusiness();

      //查询省份
      this.address_getAreaList({
        params: {},
        success: (data) => {
          this.list_sheng = data;
        },
      });
    },

    //经销商查询
    queryBusiness(type) {
      // if (type == "地区") {
      //   if (!this.sheng) {
      //   } else {
      //     if (!this.sheng) {
      //       alertErr("请选择省份");
      //       return;
      //     }
      //     if (!this.shi) {
      //       alertErr("请选择城市");
      //       return;
      //     }
      //   }
      // }

      this.$api("index_salesman", {}).then((res) => {
        //console.log("销售列表", res);

        // this.list_business = res.data;

        let list_user = res.data.sort((a, b) => b.ordering - a.ordering);
        //console.log("list_user", list_user);

        this.list_user = list_user;

        // let groups = [];
        // let addressMap = [];
        // res.data.forEach((v) => {
        //   let addr = v.area;

        //   if (!addressMap[addr]) {
        //     addressMap[addr] = [];

        //     groups.push({
        //       title: addr,
        //       items: [],
        //     });
        //   }

        //   let group_item = groups.find((v) => v.title == addr) || {};

        //   addressMap[addr].push({ ...v });
        //   group_item.items.push({ ...v });
        // });
        // //console.log("分组后数据", groups);
      });
    },

    address_getAreaList({ params, success } = opt) {
      this.$api("users_getAreaList", params).then((res) => {
        let { code, data } = res;
        // debugger
        if (code == 1) {
          if (success) {
            success(data);
          }
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.page {
  .page-box {
    background: #f7f7f7;
  }
  .page-inner {
    width: @width;
    margin: 0 auto;
    padding: 80px 0;

    .detail-title {
      font-size: 36px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: bold;
      color: #333333;
    }

    .detail-desc {
      margin-top: 16px;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #999999;
    }

    .detail-select {
      margin-top: 40px;
      .flex-center();

      .select-item {
        width: 490px;
        margin-right: 16px;

        .el-select {
          width: 100%;
          height: 48px;

          /deep/ .el-input__inner {
            height: 48px;
          }
        }
      }

      .search-box {
        width: 144px;

        button {
          .flex-center();
          width: 144px;
          height: 48px;
          background: #ea3200;
          border-radius: 4px 4px 4px 4px;
          font-size: 16px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;

          img {
            width: 22px;
            margin-right: 10px;
          }
        }
      }
    }

    .detail-title-line {
      width: 80px;
      margin: 24px auto;
      height: 5px;
      background: #ea3200;
      border-radius: 3px 3px 3px 3px;
    }

    .business-list {
      margin-top: 48px;
      display: flex;
      flex-wrap: wrap;

      .business-item {
        margin-right: 40px;
        margin-bottom: 40px;
        width: 440px;
        height: 247px;
        padding: 22px;
        background: #ffffff;
        border-radius: 8px 8px 8px 8px;
        text-align: left;
        cursor: pointer;

        &:nth-child(3n) {
          margin-right: 0;
        }

        &:hover {
          box-shadow: 1px 1px 10px 10px #eee;
        }

        .business-title {
          font-size: 20px;
          font-family: Microsoft YaHei-Bold, Microsoft YaHei;
          font-weight: bold;
          color: #333333;
        }

        .business-line {
          margin-top: 13px;
          margin-bottom: 26px;
          width: 48px;
          height: 3px;
          background: #ea3200;
        }

        .business-info {
          .info-item {
            margin-bottom: 15px;
            display: flex;

            .img-box {
              margin-right: 17px;
            }
            img {
              width: 17px;
              height: auto;
            }
          }
        }
      }
    }
  }
}

// 销售人员
.detail-content {
  margin-top: 50px;
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 1px 1px 10px 10px #eee;
}
.groups {
  text-align: left;
  font-size: 16px;
  display: flex;
  flex-wrap: wrap;

  .group-item {
    width: 50%;
    margin-bottom: 40px;
    .group-title {
      font-size: 16px;
      font-weight: bold;
    }

    .user-items {
      // display: flex;
      // flex-wrap: wrap;
    }
    .user-item {
      // width: 50%;
      margin-top: 15px;
      .flex();
      .user-name {
        min-width: 100px;
      }
      .user-phone {
        min-width: 200px;
      }
      .user-email {
        min-width: 200px;
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/page/companySales.less"></style>
