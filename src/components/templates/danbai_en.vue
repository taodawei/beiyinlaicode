<template>
  <div class="page-shuomingshu">
    <!-- 2: "重组蛋白 英文", -->

    <div class="page-box">
      <div class="page-inner">
        <div class="page-title">
          <div class="text">
            <!-- Recombinant Human IFNG Protein -->
            {{ detail[1] }}
          </div>
          <div class="right"></div>
        </div>
        <div class="huohao">
          <div class="label">Catalog Number：</div>
          <div class="val">
            <!-- RPH00001 -->
            {{ detail[0] }}
          </div>
        </div>
        <div class="size-box">
          <div class="label">Size：</div>
          <div class="val">
            <!-- 20 µl / 50 µl / 100 µl -->
            {{ detail[2] }}
          </div>
        </div>

        <div class="divider"></div>

        <div class="ctx-box">
          <div class="section-title">Product Information：</div>
          <div class="section-desc">
            <table class="w-table-2 w-900">
              <tbody>
                <tr>
                  <th>Product name</th>
                  <td>
                    <!-- Recombinant Human Interferon gamma Protein -->
                    {{ detail[3] }}
                  </td>
                </tr>
                <tr>
                  <th>Gene ID (NCBI)</th>
                  <td>
                    <!-- 3458 -->

                    {{ detail[4] }}
                  </td>
                </tr>
                <tr>
                  <th>Species Reactivity</th>
                  <td>
                    <!-- Homo sapiens (Human) -->

                    {{ detail[5] }}
                  </td>
                </tr>
                <tr>
                  <th>Expression Host</th>
                  <td>
                    <!-- E. coli -->
                    {{ detail[6] }}
                  </td>
                </tr>
                <tr>
                  <th>Purity</th>
                  <td>
                    <!-- ≥90% as analyzed by reducing SDS‐PAGE. -->
                    {{ detail[7] }}
                  </td>
                </tr>
                <tr>
                  <th>Predicted N Terminal</th>
                  <td>
                    <!-- 6×His -->

                    {{ detail[8] }}
                  </td>
                </tr>
                <tr>
                  <th>Molecular Mass</th>
                  <td>
                    <!-- Refer to figures -->

                    {{ detail[9] }}
                  </td>
                </tr>
                <tr>
                  <th>Alternative Names</th>
                  <td>
                    <!-- IFN immune; IFN-gamma; IFNG; Immune interferon; Interferon gamma; Type
                    II Interferon -->

                    {{ detail[10] }}
                  </td>
                </tr>
                <tr>
                  <th>Storage instructions</th>
                  <td>
                    <!-- Store at -20℃. Avoid freeze / thaw cycles.Buffer: PBS with 0.02%
                    sodium azide, 50% glycerol, pH7.3. -->
                    {{ detail[11] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <template v-if="images && images.length">
            <div class="section-title">SDS-PAGE：</div>

            <div class="section-desc">
              <div class="application-img-box" v-if="false">
                <div class="img-list" v-if="images && images.length">
                  <div class="img-item" v-for="(url, index) in images" :key="index">
                    <!-- <img :src="item" alt="" /> -->
                    <el-image style="" :src="url" :preview-src-list="images"> </el-image>
                  </div>
                </div>
                <!-- <img src="@img/spec-img-1.png" alt="" /> -->
                <!-- <img v-if="detail[17]" :src="detail[17]" alt="" /> -->
              </div>

              <div class="div" v-if="false">
                <!-- Western blot analysis of extracts of various cell lines, using NR1H3 antibody. -->
                <!-- {{ detail[18] }} -->
                {{ detail[17] }}
              </div>

              <!-- detail[12] -->
              <div class="application-img-box">
                <div class="info-items" v-if="images && images.length">
                  <div class="info-item" v-for="(url, index) in images" :key="index">
                    <div class="info-img-box">
                      <el-image style="" :src="url" :preview-src-list="images">
                      </el-image>
                    </div>
                    <div class="info-text">
                      {{ texts[index] }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div class="application-img-box">
    <div class="info-items">
      <div class="info-item">
        <div class="info-img-box">
          <img src="@img/temp-danbai.png" alt="" />
        </div>
        <div class="info-text">
          Recombinant Human Interferon Gamma Protein was determined by SDS-PAGE
          with Coomassie Blue, showing a band at 17 kDa.
        </div>
      </div>
    </div>
  </div> -->
            </div>
          </template>

          <div class="section-title">Background：</div>

          <div class="section-desc">
            <!-- Human Interferon gamma (hIFN-γ) is amacrophage‐activating factor and the lone
            member of Interferon type II.The active form of IFN-γ is an antiparallel dimer
            that interacts with the receptor IFN-γR1 and sets off IFN-γ/JAK/STAT pathway.
            IFN-γ signaling does diverse biological functions primarily related to host
            defense and immune regulation, including antiviral and antibacterial defense,
            apoptosis, inflammation, and innate and acquired immunity. While IFN-γ–induced
            inflammatory cascade summons a variety of immune‐related cell types, such as
            macrophages, natural killer (NK) cells and cytotoxic T lymphocytes (CTLs),
            IFN-γ is also implicated in resistance to NK cell and CTL responses and in
            immune escape in a variety of cancers. -->

            {{ detail[13] }}
          </div>

          <div class="section-title">Services & Support：</div>
          <div class="section-desc">
            <div>1. Please do not hesitate to contact us if you have any questions.</div>
            <div>
              2. Please fill in the Technical Suppoprt Request Form and email the form to
              {{ webConfig.email }} within 3 months of receipt of the goods, and we will
              response to your inquiry within 24 hours.
            </div>
            <div>3. The after-sale service channel will be shut down after 3 months.</div>
          </div>

          <div class="code-box">
            <div class="img-box">
              <img :src="webConfig.qrcode_gongzhonghao" alt="" />
            </div>
            <div class="text-box">
              Scan the QR code to get Technical Suppoprt Request Form.
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
  name: "product-duibi",
  components: {},
  props: ["detail", "images", "texts"],
  data() {
    return {
      options_version: [
        {
          id: "zh",
          title: "中文版说明书",
        },
        {
          id: "en",
          title: "英文版说明书",
        },
      ],
      selectVersion: "zh",

      id: this.$route.query.id, //分类id
    };
  },
  computed: {
    ...mapState([""]),

    bili_list() {
      let arr = [];
      let bili_list = [];
      if (this.detail && this.detail[16]) {
        // arr = this.detail[16].split("<br>");

        let arr = [];
        let text_str = this.detail[16] || "";
        if (text_str.includes("<br>")) {
          arr = this.detail[16].split("<br>");
        } else {
          arr = this.detail[16].split("|");
        }

        // if (arr.length) {
        //   arr.forEach((v) => {
        //     var text = v.replace("1:", "__");
        //     var infos = text.split("__");
        //     var key = infos[0];
        //     var val = v.replace(key, "");
        //     // debugger
        //     bili_list.push({
        //       key: key,
        //       val: val,
        //     });
        //   });
        // }

        if (arr.length) {
          arr.forEach((v) => {
            if (v.includes(":") || v.includes("：")) {
              var text = v.replace("1:", "__");
              var infos = text.split("__");
              var key = infos[0];
              var val = v.replace(key, "");
              // debugger
              bili_list.push({
                key: key,
                val: val,
              });
            } else {
              //特殊处理 类似于 IHC-P/IHC-Fr/Immunomicroscopy Use at an assay dependent dilution的数据
              let letter_arr = v.trim().split("");
              let first_space_index = letter_arr.findIndex((v) => v == " ");

              if (first_space_index > 0) {
                letter_arr.splice(first_space_index, 1, "__");
              }

              console.log("第一个空格 first_space_index", first_space_index);

              let text = letter_arr.join("");
              var infos = text.split("__");
              var key = infos[0];
              var val = v.replace(key, "");
              // debugger
              bili_list.push({
                key: key,
                val: val,
              });
            }
          });
        }
      }

      //console.log("比例数据", arr);

      return bili_list;
    },
  },
  watch: {},

  beforeRouteUpdate(to, from, next) {
    //console.log("组件复用 from", from);
    //console.log("组件复用 to", to);

    next({
      query: to.query,
    });

    this.setView();
  },
  created() {
    this.setView();
  },
  methods: {
    setView() {
      // this.$api("brand_book", {
      //   productId: this.$route.params.id,
      // }).then((res) => {
      //   // this.curr = res.data;
      //   if(res.code != 1) {
      //     alert(res)
      //   }
      //   let params = res.data.content;
      //   //console.log("规格书说明", params);
      // });
    },
  },
};
</script>

<style scoped lang="less">
@media print {
  .code-box {
    .img-box {
      img {
        width: 17rem !important;
      }
    }
  }
}

.img-list {
  .flex();
  flex-wrap: wrap;
  .img-item {
    width: calc((100% - 33px) / 2);
    margin-right: 33px;
    margin-bottom: 33px;

    &:nth-child(2n) {
      margin-right: 0;
    }

    img {
      width: 250px;
      height: auto;
      display: block;
    }

    .el-image {
      width: 100%;
      height: 100%;
      height: auto;
    }
  }
}

.page-top {
  display: none;
  position: relative;
  padding-top: 150px;
  .page-top-banner {
    img {
      width: 100%;
    }
  }
  .page-bread {
    width: @width;
    margin: 0 auto;
    height: 44px;
    background: #f5f5f5;
    padding: 0 15px;

    .bread-box {
      height: 44px;
      display: flex;
      align-items: center;

      img {
        width: 15px;
        margin-right: 10px;
      }
      .bread-divider {
        margin: 0 10px;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;

        font-size: 16px;
      }
      a {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;

        font-size: 16px;

        &:hover {
          color: @theme;
        }
      }
    }
  }
}

.page-shuomingshu {
}

.page-title {
  .flex-between();
  width: calc(100% - 24rem);

  .text {
    padding-right: 50px;
    font-size: 20px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #333333;
  }
  .right {
  }
}

.huohao {
  margin-top: 12px;
  display: flex;
  align-items: flex-end;
  .label {
    font-size: 14px;
    color: #333;

    font-size: 16px;
  }
  .val {
    font-size: 20px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #ea3219;
  }
}
.size-box {
  margin-top: 12px;
  display: flex;
  align-items: flex-end;
  .label {
    font-size: 14px;
    color: #333;

    font-size: 16px;
  }
  .val {
    font-size: 14px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #333333;

    font-size: 16px;
  }
}

.divider {
  margin: 20px auto;
  background: #ccc;
  height: 1px;
}
.ctx-box {
}

.zhaiyao-box {
  margin-bottom: 43px;
  font-size: 14px;
  font-family: Microsoft YaHei-Bold, Microsoft YaHei;
  font-weight: bold;
  color: #333333;
  line-height: 2.3;

  font-size: 16px;

  ul {
  }
  li {
    .flex();
    position: relative;
    &::before {
      content: "";
      display: inline-block;
      width: 8px;
      height: 8px;
      margin-right: 10px;
      background: #333333;
      border-radius: 50%;
      line-height: 2.3;
    }
  }
}
.section-title {
  padding-bottom: 22px;
  border-bottom: 1px solid #afafaf;
  margin-bottom: 22px;
  font-size: 16px;
  font-family: Microsoft YaHei-Bold, Microsoft YaHei;
  font-weight: bold;
  color: #ea3200;
}
.section-title-desc {
  margin-top: 10px;
  font-size: 14px;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  line-height: 2.3;

  font-size: 16px;
}

.section-desc {
  margin-bottom: 48px;
  font-size: 14px;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  line-height: 2.3;

  font-size: 16px;
}

.w-table {
  width: 100%;
  table-layout: fixed;
  border-spacing: 0;
  border: none;

  tr {
    td,
    th {
      min-height: 48px;
      height: 48px;
      border: 1px solid #afafaf;
      border-right: none;
      border-bottom: none;
      padding-left: 2em;
    }

    td:last-child,
    th:last-child {
      border-right: 1px solid #afafaf;
    }
  }

  tr:last-child {
    th {
      border-bottom: 1px solid #afafaf;
    }
    td {
      border-bottom: 1px solid #afafaf;
    }
  }
}

.w-table-2 {
  width: 900px;
  width: 100%;
  table-layout: fixed;
  border-spacing: 0;
  border: none;

  tr {
    // display: flex;
    width: 100%;

    td,
    th {
      min-height: 48px;
      height: 48px;
      border: 1px solid #afafaf;
      border-right: none;
      border-bottom: none;
      padding-left: 2em;

      &:first-child {
        // width: auto;
        width: 30%;
        width: 19em;
        line-height: 1.7;
        font-weight: bold;
      }
    }

    td:last-child,
    th:last-child {
      border-right: 1px solid #afafaf;
    }
  }

  tr:last-child {
    th {
      border-bottom: 1px solid #afafaf;
    }
    td {
      border-bottom: 1px solid #afafaf;
    }
  }
}

// 表格媒体查询设置

@media screen and(max-width: 1440px) {
  .w-table-2 {
    tr {
      td,
      th {
        &:first-child {
          width: 22em;
        }
      }
    }
  }
}

// 表格媒体查询设置
@media screen and(max-width: 1200px) {
  .w-table-2 {
    tr {
      td,
      th {
        &:first-child {
          width: 25em;
        }
      }
    }
  }
}

.w-900 {
  width: 900px;
  width: 100%;
}

.code-box {
  text-align: right;
  padding-bottom: 30px;
  .img-box {
    img {
      width: 200px;
    }
  }

  .text-box {
    margin-top: 15px;
    font-size: 18px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;
  }
}

.info-items {
  margin-top: 50px;
  .info-item {
    .flex();
    align-items: flex-start;
    margin-bottom: 50px;
    .info-img-box {
      width: 200px;
      img {
        max-width: 100%;
      }
    }
    .info-text {
      flex: 1;
      margin-left: 50px;
      font-size: 14px;
      color: #333333;
      line-height: 2.3;

      font-size: 16px;
    }
  }
}
</style>
