<template>
  <div class="product-box">
    <!-- 底部对比功能 -->
    <div class="fixed-compare" :class="{ shown: show_fixed_compare }">
      <div class="fixed-close" @click="show_fixed_compare = false">关闭</div>
      <div class="compare-inner">
        <div class="compare-list">
          <div
            class="compare-item"
            v-for="(item, index) in product_list_checked"
            :key="index"
          >
            <div class="close-box" @click="productRemove(item)">&times;</div>
            <div class="product-info">
              <div class="title" @click="mix_to_goods(item)">{{ item.skuId }}</div>
              <div class="other" @click="mix_to_goods(item)">{{ item.title }}</div>
            </div>
          </div>
        </div>
        <div class="action-box">
          <div class="btn-box">
            <button
              class="btn-compare btn-ripple"
              :disabled="product_list_checked.length < 2"
              @click="toCompare"
            >
              开始比较
            </button>
          </div>
          <div class="btn-box-clear">
            <button class="btn-clear btn-ripple" @click="productReset">清空</button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="fixed-bottom-huizong" >
      展示对比
    </div> -->

    <div v-if="apiCompleted">
      <!-- 产品列表 列表根据后台产品的多少，来控制使用哪一种列表形式，如果产品数量少用图文的，产品数量多 用表格的 -->
      <div class="product-list" v-if="!isViewProductTable">
        <div class="product-item" v-for="(item, index) in product_list" :key="index">
          <div class="product-left">
            <router-link :to="'/goodsDetail/' + item.skuId" target="_blank" class="title">
              {{ item.title }}
            </router-link>

            <!-- <div class="biaoqian">
              <img src="@img/product-tag.png" alt="" />
            </div> -->
            <div class="shuoming">
              <router-link
                v-if="+item.paper_num"
                :to="'/goodsDetail/' + item.skuId + '?item=3'"
                class="shuoming-item"
                target="_blank"
              >
                <img src="@img/wenxian.png" alt="" />
                <span> 文献引用（{{ item.paper_num }}） </span>
              </router-link>

              <template v-if="is_prod">
                <a
                  target="_blank"
                  :href="
                    item.book_url
                      ? '/productSpecificationPdf/' + item.inventoryId
                      : '/productSpecification/' + item.id + '?ggid=' + item.inventoryId
                  "
                  class="shuoming-item"
                >
                  <img src="@img/pdf.png" alt="" />
                  <span> 说明书 </span>
                </a>
              </template>

              <template v-else>
                <router-link
                  :to="
                    item.book_url
                      ? '/productSpecificationPdf/' + item.inventoryId
                      : '/productSpecification/' + item.id + '?ggid=' + item.inventoryId
                  "
                  class="shuoming-item"
                  target="_blank"
                >
                  <img src="@img/pdf.png" alt="" />
                  <span> 说明书 </span>
                </router-link>
              </template>
            </div>
            <div class="text-box">
              <div class="label">货号：</div>
              <div class="val">
                <router-link :to="'/goodsDetail/' + item.skuId"  target="_blank" >
                  {{ item.skuId }}
                </router-link>
              </div>
            </div>

            <!-- <div class="text-box">
              <div class="label">基因ID:</div>
              <div class="val">4792</div>
            </div>
            <div class="text-box">
              <div class="label">应用：</div>
              <div class="val tags">
                <div class="tag">WB</div>
                <div class="tag">IP</div>
              </div>
            </div> -->

            <div class="loop-tags">
              <div
                class="text-box"
                v-for="(field, field_index) in field_list"
                :key="field_index"
                :data-col="field.field_title"
              >
                <div class="label">{{ field.title }}：</div>
                <div class="val">
                  <!-- {{ getParamsValue(item, field) }} -->
                    <div v-if="field.title=='别名'" class="val">
                    <el-tag
                      v-for="nameTag in getOtherNames(item.param_info.another_name)"
                      :type="nameTag.tagType"
                      effect="light"
                      round
                    >
                          <div v-html="nameTag.titile"></div>
                        </el-tag>
                      <!-- {{ getParamsValue(item, field) }} -->
                    </div>
                      <div v-else-if="field.title=='反应物种'" class="val">
                      <el-tag
                          v-for="nameTag in item.tag_reactionSpecies"
                          :type="nameTag.tagType"
                          effect="dark"
                          round
                        >
                          <div v-html="nameTag.titile"></div>
                        </el-tag>
                    </div>
                    <div v-else-if="field.title=='应用'" class="val">
                      <el-tag
                          v-for="nameTag in getOtherNames(item.param_info.application)"
                          :type="nameTag.tagType"
                          effect="dark"
                          round
                        >
                          <div v-html="nameTag.titile"></div>
                        </el-tag>
                    </div>
                    <div v-else class="val">
                      {{ getParamsValue(item, field) }}
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="product-right">
            <div class="img-box">
              <!-- <img :src="item.img" alt="" /> -->

              <el-image :src="item.img">
                <div slot="error" class="image-slot">
                  <img :src="item.default_img" />
                </div>
              </el-image>
            </div>

            <!-- 不是仪器的产品允许对比 -->
            <div
              v-if="!item.is_yiqi && $route.query.id"
              class="duibi-box"
              :class="{ checked: item.checked }"
              @click="productToggleCheck(item)"
            >
              <img src="@img/check-0.png" alt="" class="check-0" />
              <img src="@img/check-1.png" alt="" class="check-1" />
              <span> 加入对比（最多5个） </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 筛选列表  列表根据后台产品的多少，来控制使用哪一种列表形式，如果产品数量少用图文的，产品数量多 用表格的-->

      <!--  -->
      <div
        title="产品列表"
        class="info-list"
        :class="{ not_scroll: field_list.length <= 1 }"
        v-else
      >
        <div class="product-list" v-if="product_list.length>0">
          <div class="product-box" v-for="(item, index) in product_list" :key="index">
            <div class="product-box-left">
              <div class="product-box-top-img">
                <router-link :to="item.route" target="_blank">
                  <el-image :src="item.img" :alt="item.title" class="el-image__img">
                    <div slot="error" class="image-slot">
                      <img :src="item.default_img" :alt="item.title" />
                    </div>
                  </el-image>
                </router-link>
              </div>
            </div>
            <div class="product-box-right">
              <div class="product-box-table">
                <div class="product-box-table-head">
                  <span>货号</span>
                  <span>名称</span>
                  <span>规格</span>
                  <span>价格</span>
                  <span></span>
                </div>
                <div class="product-box-table-body">
                  <div class="body-row" >
                    <div class="row-huohao">
                        <span v-html="item.skuId"></span>
                      </div>
                      <div class="row-chanpin">
                        <router-link :to="item.route" target="_blank">
                          <span v-html="item.title"></span>
                        </router-link>
                      </div>
                      <div class="row-descript">
                        
                        <template v-if="item.inventorys.length>0" v-for="(inventory, iindex) in item.inventorys">
                          <span  v-html="inventory.key_vals"></span><br></br>
                        </template>
                        <template v-if="item.inventorys.length==0" >
                          <!-- <span>{{ item.key_vals}}</span> -->
                          <div v-html="item.key_vals"></div>
                        </template>
                      </div>
                      <div class="row-price">
                        <template v-if="item.inventorys.length>0" v-for="(inventory, iindex) in item.inventorys" >
                          <span >￥{{ +inventory.price_sale }}</span><br></br>
                        </template>
                         <template v-if="item.inventorys.length==0" >
                           <span>￥{{ item.price_sale }}</span>
                        </template>
                        <!-- <span>￥{{ +item.price_sale }}</span> -->
                      </div>
                      <div 
                      @click="showRowDetail(index)"
                      :class="showDetailIndex===index?'row-operate-active row-operate':'row-operate-shouqi row-operate'" 
                      >
                        <el-button circle icon="el-icon-d-arrow-right"></el-button>
                      </div>
                  </div>
                  <div 
                    :class="showDetailIndex===index?'body-row-detail rowOn':'body-row-detail'" 
                    class="body-row-detail" >
                      <div class="params-box" >
                        <div
                          v-for="(param, pindex) in setInfoParams(item)"
                          :key="pindex"
                          :data-key="param.field_title"
                        >
                        <div v-if="param.val.length!=0" class="params-item">
                            <div  class="params-label">{{ param.title }}</div>
                            <div  class="params-val" v-html="param.val"></div>
                        </div>
                        </div>
                      </div>
                  </div>
                </div>
                <div class="product-box-table-footer">
                  <template v-if="isHasOtherName(item)">
                      <span>其他名称：</span>
                      <el-tag
                        v-for="nameTag in item.tag_otherNames"
                        :type="nameTag.tagType"
                        effect="dark"
                        round
                      >
                      <!-- {{ nameTag }} -->
                      <div v-html="nameTag.titile"></div>
                      </el-tag>
                    </template>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="info-list-inner" :class="{ not_scroll: field_list.length <= 1 }">
          <div
            class="info-item title-item"
            :class="{ not_scroll: field_list.length <= 1 }"
          >
            <div class="item">货号</div>
            <div class="item">名称</div>
            
            <template v-if="$route.name == 'productField'">
              <div class="item">应用</div>
              <div class="item">反应物种</div>
            </template>

            
            <div
              class="item"
              v-for="(field, field_index) in field_list"
              :key="field_index"
            >
              {{ field.title }}
            </div>
          </div>

          
          <div
            class="info-item"
            v-for="(item, index) in product_list"
            :key="index"
            :class="{ not_scroll: field_list.length <= 1 }"
          >
            <div class="item">
              <router-link :to="item.route">
                {{ item.skuId }}
              </router-link>
            </div>

            <div class="item">
              <router-link :to="item.route" target="_blank">
                

                {{ item.title }}
              </router-link>
            </div>

           
            <div
              class="item"
              v-for="(field, field_index) in field_list"
              :key="field_index"
            >
              {{ getParamsValue(item, field) }}
            </div>

            
            <template v-if="$route.name == 'productField'">
              <div class="item" data-key="application">
                {{ (item.param_info && item.param_info.application) || "-" }}
              </div>
              <div class="item" data-key="species">
                <div
                  v-if="
                    item.param_info &&
                    item.param_info.reaction_species &&
                    item.param_info.reaction_species.length
                  "
                >
                  {{ item.param_info.reaction_species.join(",") }}
                 
                </div>
                <div v-else>-</div>
              </div>
            </template>
          </div>
        </div> -->
      </div>

      <div class="pagination-box" style="margin-top: 40px">
        <el-pagination
          background
          layout="total,prev, pager, next"
          :total="count"
          :current-page="pagination.page"
          :page-size="pagination.pagenum"
          @current-change="handleChangePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";

import { mapState } from "vuex";

export default {
  props: ["activeCate"],
  data() {
    return {
      is_prod: process.env.NODE_ENV == "production",

      Loading,
      loadingInstance: null,

      show_fixed_compare: false,
      product_list: [],
      count: 0,
      pagination: {
        page: +this.$route.query.page || 1,
        pagenum: 10,
      },

      query_field_done: false,
      query_list_done: false,

      field_list: [], //当前分类产品列表需要展示的字段
      apiCompleted: false,

      product_images: [],

      other_params: {},

      showDetailIndex:10,

      all_field: [],
    };
  },
  computed: {
    ...mapState(["product_id_map"]),

    cate_title() {
      let title = "";
      if (this.activeCate && this.activeCate.title) {
        title = this.activeCate.title;
      }

      return title;
    },

    product_list_checked() {
      return this.product_list.filter((v) => v.checked);
    },
    checkedLength() {
      return this.product_list_checked.length;
    },

    //是否展示产品
    // showProduct() {
    //   return +this.pdt_max_num;
    // },

    //是否展示产品数据表格
    // isViewProductTable() {
    //   let ret = +this.pdt_max_num && +this.pdt_max_num < this.count;
    //   return ret;
    // },
    //是否展示产品数据表格
    isViewProductTable() {
      let ret = true;
      if (this.product_cates_all.length) {
        if (this.$route.query.id) {
          let cate = this.product_cates_all.find((v) => v.id == this.$route.query.id);
          //console.log("当前分类", { ...cate });

          if (cate) {
            if (cate.plistId == 1) {
              ret = false;
            }
          }
        }
      }
      return ret;
    },
  },

  watch: {
    $route(to, from) {
      //console.log("产品列表组件 to", to);
      //console.log("产品列表组件 from", from);

      this.pagination.page = +to.query.page || 1;
      this.other_params = {};
      if (to.query.page) {
      } else {
        this.queryCateParams();
      }
      this.setView();
    },
  },

  created() {
    this.queryAllCateParams();
    this.queryCateParams();
    this.setView();
  },
  methods: {
    reView(params) {
      console.log("重置搜索");
      this.pagination = {
        ...this.pagination,
        page: 1,
      };

      this.other_params = { ...params };
      this.setView();
    },

    setView() {
      this.showLoading();
      this.image_list = [];
      this.apiCompleted = false;
      this.query_list_done = false;

      let form = {
        channel_id: this.$route.query.id || "",
        ...this.pagination,
        keyword: this.$route.query.keyword || "",
        ...this.other_params,
      };

      if (this.$route.name == "productField") {
        form.channel_id = "";
        form.brand_id = this.$route.query.id;
      }

      //研究领域筛选
      //产品类型 + 条件筛选
      this.$api("product_plistNew", form).then((res) => {
        this.hideLoading();

        // //console.log("产品列表", res);
        let image_list = [];
        res.data.forEach((v) => {
          image_list.push(v.img);
          v.checked = false;
          v.route = "/goodsDetail/" + v.skuId;
          if (v.is_sj) {
            if (!v.title) {
              var title = v.title;
              var title_en = v.param_info && v.param_info.english_name;
              v.title = title_en;
              v.param_info.chinese_name = title;
            }
          }
          if (v.param_info) {
            //1 tag
            v.tag_otherNames=this.getOtherNames(v.param_info.another_name);
          }
        });
        // this.handleProductImage(image_list);

        this.product_list = res.data;
        this.count = res.count;
        this.updateParentCount();
        //列表根据后台产品的多少，来控制使用哪一种列表形式，如果产品数量少用图文的，产品数量多 用表格的
        this.query_list_done = true;

        this.renderHtml();
      });
    },

    handleChangePage(page) {
      console.log("page", page);
      this.pagination.page = page;
      let query = this.$route.query || {};
      let new_query = {
        ...query,
        page: page,
      };
      this.$router.push({
        page: "/productCates",
        query: new_query,
      });
      return;

      let form = {
        channel_id: this.$route.query.id || "",
        ...this.pagination,
        keyword: this.$route.query.keyword || "",
        ...this.other_params,
      };

      if (this.$route.name == "productField") {
        form.channel_id = "";
        form.brand_id = this.$route.query.id;
      }

      this.$api("product_plistNew", form).then((res) => {
        this.hideLoading();

        // //console.log("产品列表", res);
        let image_list = [];
        res.data.forEach((v) => {
          image_list.push(v.img);
          v.checked = false;
          v.route = "/goodsDetail/" + v.skuId;

          //试剂
          if (v.is_sj) {
            if (!v.title) {
              var title = v.title;
              var title_en = v.param_info && v.param_info.english_name;
              v.title = title_en;
              v.param_info.chinese_name = title;
            }
          }
          //6 反应物种
          let reactionSpecies="";
          reactionSpecies=param_info.reaction_species.join(";")
          v.html_reactionSpecies = reactionSpecies.replaceAll(keyword, html_keyword);
          v.tag_reactionSpecies=this.getOtherNames(v.html_reactionSpecies);
          //仪器产品需要展示仪器的类目名称
          // if (v.is_yiqi) {
          //   var title = v.title;
          // }
        });
        // this.handleProductImage(image_list);

        this.product_list = res.data;
        this.count = res.count;
        this.updateParentCount();
        //列表根据后台产品的多少，来控制使用哪一种列表形式，如果产品数量少用图文的，产品数量多 用表格的
        this.query_list_done = true;

        this.renderHtml();
      });

      //

      this.scrollToTarget(".top-info");
    },

    //滚动到指定位置
    scrollToTarget(clsName) {
      // var element = document.querySelector(".wenxian-box");
      var element = document.querySelector(clsName);
      element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    },

    getParamsValue(item, field) {
      let col = field.field_title;
      let params = item.param_info;
      let value = params && params[col];

      //特殊处理别名问题 使用字段为 synonym || another_name
      if (col == "synonym" || col == "another_name") {
        let value_1 = params["synonym"];
        let value_2 = params["another_name"];
        if (value_1 || value_2) {
          value = value_1 || value_2;
        }
      }

      if (value && typeof value == "object") {
        try {
          value = value.join();
        } catch (error) {}
      }

      if (!value) {
        value = "-";
      }

      return value;
    },

    showLoading() {
      this.loadingInstance = Loading.service({
        lock: true,
        text: "数据查询中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      // setTimeout(() => {
      // this.loadingInstance.close();
      // }, 2000);
    },
    hideLoading() {
      this.loadingInstance.close();
    },

    queryCateParams() {
      //产品分类页面
      if (this.$route.name == "productCates") {
        this.query_field_done = false;
        this.$api("product_getRow", {
          channel_id: this.$route.query.id || "",
        }).then((res) => {
          //console.log("获取当前分类产品的展示字段", res);

          let list = res.data;
          list.forEach((field) => {
            if (field.title == "基因id") {
              field.title = "基因ID";
            }
          });
          this.field_list = list;
          this.query_field_done = true;
          this.renderHtml();
        });
      } else if (this.$route.name == "productSearch" && this.$route.query.id) {
        this.query_field_done = false;
        this.$api("product_getRow", {
          channel_id: this.$route.query.id || "",
        }).then((res) => {
          //console.log("获取当前分类产品的展示字段", res);

          let list = res.data;
          list.forEach((field) => {
            if (field.title == "基因id") {
              field.title = "基因ID";
            }
          });
          this.field_list = list;
          this.query_field_done = true;
          this.renderHtml();
        });
      } else {
        this.query_field_done = true;
      }
    },

    //处理产品图片
    handleProductImage(image_list) {
      //处理产品图片
      // //console.log("产品列表数据 image_list", image_list);
      var promise_arr = [];
      image_list.forEach((src, index) => {
        var promise = this.loadImageAsync(src);
        promise_arr.push(promise);
      });
      Promise.all(promise_arr).then((resAll) => {
        // //console.log("图片全部加载完成 resAll", resAll);

        //设置产品图片
        this.product_list.forEach((v, index) => {
          if (!resAll[index]) {
            v.img = v.default_img;
          }
        });
      });
      //产品图片处理完成
    },

    //加载图片
    loadImageAsync(url) {
      return new Promise(function (resolve, reject) {
        const image = new Image();

        image.onload = function () {
          resolve(url);
        };

        image.onerror = function () {
          // reject(new Error("Could not load image at " + url));
          resolve("");
        };

        image.src = url;
      });
    },

    renderHtml() {
      if (this.query_list_done && this.query_field_done) {
        // this.loading = true;
        this.apiCompleted = true;
      }
    },

    updateParentCount() {
      this.$parent.updateSelfCount(this.count);
    },

    toCompare() {
      if (this.product_list_checked.length < 2) {
        alertErr("请至少选择两个产品进行对比");
        return;
      }
      let cate_id = this.product_list_checked[0].channelId;
      // let ids = this.product_list_checked.map((v) => v.inventoryId).join(",");
      let ids = this.product_list_checked.map((v) => v.id).join(",");
      this.$router.push({
        path: "/productComparison",
        query: {
          id: this.$route.query.id || cate_id,
          ids: ids,
        },
      });
    },
    productToggleCheck(item) {
      //console.log("产品对比勾选", { ...item });

      if (this.checkedLength >= 5) {
        alertErr("最多可以选择5个产品进行比较");
        return;
      }

      item.checked = !item.checked;

      this.compareState();
    },

    compareState() {
      let hasCheck = this.product_list.some((v) => v.checked);
      if (hasCheck) {
        this.show_fixed_compare = true;
      } else {
        this.show_fixed_compare = false;
      }

      this.product_list.forEach((v) => {
        v.root_cate_id = this.$route.query.id;
      });

      let checkedList = this.product_list.filter((v) => v.checked);

      let comparison_list = JSON.stringify(checkedList);
      sessionStorage.setItem("comparison_list", comparison_list);
    },

    productRemove(item) {
      item.checked = false;
      this.compareState();
    },

    productReset() {
      this.product_list.forEach((v) => {
        v.checked = false;
      });
      this.compareState();
    },

     //所有产品参数
    queryAllCateParams() {
      // this.query_field_done = false;
      //根据分类设置筛选条件
      this.$api("product_allRow", {}).then((res) => {
        //console.log("获取所有分类的字段", res);
        this.all_field = res.data;
      });
    },

     //设置当前产品展示参数
    setInfoParams(item) {
      if (item.param_info && this.all_field.length) {
        // //console.log("产品属性参数");
        // //console.table(this.all_field);

        let param_list = [];
        this.all_field.forEach((field) => {
          var val = item.param_info[field.field_title];
          if (val) {
            if (field.title == "基因id") {
              field.title = "基因ID";
              if (+val) {
              } else {
                val = "/";
              }
            }
            if (val != "/") {
              if (field.title == "中文名称") {
                if (this.is_real_zh_name(val)) {
                  param_list.unshift({
                    ...field,
                    val: val,
                  });
                }
              }else if (field.title == "蛋白编码") {
                param_list.push({
                  ...field,
                  val: "<a href='https://www.uniprot.org/uniprotkb/"+val+"/entry' style='color: #409eff;' target='_blank'>"+val+"</a>",
                });
              }
              else {
                param_list.push({
                  ...field,
                  val: val,
                });
              }
            }
          }
        });

        // //console.log('所有的参数 param_list', param_list)

        let tongyici_attr_1 = param_list.find((v) => v.field_title == "another_name");
        let tongyici_attr_2 = param_list.find((v) => v.field_title == "synonym");
        //抗体产品同义词相同时 隐藏一个
        if (
          tongyici_attr_1 &&
          tongyici_attr_1.val &&
          tongyici_attr_2 &&
          tongyici_attr_2.val
        ) {
          if (tongyici_attr_1.val == tongyici_attr_2.val) {
            let arr_tongyici = param_list.filter((v) => v.title == "同义词");

            if (arr_tongyici.length == 2) {
              let index_2 = param_list.findIndex(
                (v) => v.field_title == arr_tongyici[1].field_title
              );

              param_list.splice(index_2, 1);
            }
          }
        }

        param_list = param_list;
        return param_list;
        // this.query_field_done = true;
      } else {
        setTimeout(() => {
          this.setInfoParams();
        }, 200);
      }
    },

    showRowDetail(index){
      if(this.showDetailIndex==index){
        this.showDetailIndex=10;
      }else{
        this.showDetailIndex=index;
      }
    },
    isHasOtherName(chanpin){
      var isHas=false;
      var paramInfo=chanpin.param_info
      if(paramInfo.another_name!=undefined&&paramInfo.another_name.length>0){
        isHas=true;
      }
      return isHas;
    },
    randomTag(){
      var tags=["primary","success","info","warning","danger"];
      var radomIndex=Math.floor(Math.random()*6);
      return tags[radomIndex];
    },
    getOtherNames(strNames){
       var otherName=[];
       var nameList=[];
       if(strNames.length>0){
        if(strNames.split(';').length > 1){
          nameList=strNames.split(';');
        }else if(strNames.split(',').length > 1){
          nameList=strNames.split(',');
        }else{
          nameList[0]=strNames
          // HashChangeEvent
        }
        for(var i=0;i<nameList.length;i++){
          if(nameList[i].length>0){
            otherName.push({titile:nameList[i],tagType:this.randomTag()});
          }
        }
        // otherName=nameList
       }

       return otherName;
    }
  },
};
</script>

<style lang="less" scoped>
.el-tag{
  margin-right: 8px;
  margin-bottom: 5px;
}
.product-list {
  // padding-top: 50px;
  padding-top: 0;
  .product-item {
    .flex-between();
    align-items: flex-start;
    margin-bottom: 24px;
    min-height: 288px;
    min-height: auto;
    background: #ffffff;
    border-radius: 0px 0px 0px 0px;
    border: 1px solid #e3e3e3;
    padding: 25px;

    &:hover {
      box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.16);
    }

    .product-left {
      .title {
        display: block;
        margin-bottom: 10px;
        font-size: 18px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #333333;

        &:hover {
          color: @theme;
        }
      }
      .biaoqian {
        img {
          height: 24px;
        }
      }
      .shuoming {
        margin: 10px 0;
        .flex();

        .shuoming-item {
          .flex();
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          cursor: pointer;
          font-size: 1.4rem;

          &:hover {
            color: @theme;
          }

          img {
            width: 16px;
            margin-right: 8px;
          }
        }
      }

      .tags {
        .flex();

        .tag {
          margin-right: 10px;
          text-align: center;
          width: 32px;
          height: 18px;
          line-height: 18px;
          background: #ea3200;
          border-radius: 3px 3px 3px 3px;

          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
        }
      }

      .text-box {
        .flex();
        align-items: flex-start;
        flex-wrap: nowrap;

        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #808080;
        line-height: 24px;

        font-size: 1.4rem;
        line-height: 1.6;

        .label {
          width: 55px;
          width: fit-content;
        }
        .val {
          flex: 1;
          a {
            font-size: 12px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #808080;

            font-size: 1.4rem;

            &:hover {
              color: @theme;
            }
          }
        }
      }
    }
    .product-right {
      .img-box {
        img {
          width: 184px;
          height: 184px;
          object-fit: contain;
        }

        /deep/ img {
          width: 184px;
          height: 184px;
          object-fit: contain;
        }
      }
      .duibi-box {
        margin-top: 20px;
        .flex-center();
        width: 184px;
        height: 40px;
        background: #f5f5f5;
        transition: 0.3s;
        cursor: pointer;
        &:hover {
          background: #ddd;
        }

        &.checked {
          .check-0 {
            display: none;
          }
          .check-1 {
            display: block;
          }
        }

        img {
          width: 13px;
          margin-right: 10px;

          &.check-0 {
            display: block;
          }
          &.check-1 {
            display: none;
          }
        }

        span {
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #666666;
        }
      }
    }
  }
}

// 信息列表
.info-list {
  .title-item {
    height: 50px;
    background: linear-gradient(180deg, #ea3200 0%, #fe6927 100%) !important;
    .item {
      font-size: 14px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold !important;
      color: #ffffff !important;
    }
  }
  .info-item {
    height: 48px;
    .flex();

    &:nth-child(2n + 1) {
      background: #f0f2f5;
    }

    .item {
      .line-2();
      flex: 1;
      text-align: center;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #666666;

      a {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #666666;

        &:hover {
          color: @theme;
        }
      }
    }
  }
}

// 底部对比功能
.fixed-bottom-huizong {
  position: fixed;
  bottom: 15px;
  left: 50%;
  width: fit-content;
  // height: 280px;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  padding: 15px;
  cursor: pointer;

  &:hover {
    background: @theme;
    color: #fff;
  }
}

.fixed-compare {
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  right: 0;
  height: 280px;
  height: auto;
  height: 0;
  background: #ffffff;
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.2);

  &.shown {
    height: auto;
  }

  .fixed-close {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 16px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #ea3200;
    cursor: pointer;
  }

  .compare-inner {
    width: @width;
    margin: 0 auto;
    padding: 43px 0;
    .flex-between();

    .compare-list {
      display: flex;
      flex-wrap: wrap;

      .compare-item {
        .flex-center();
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        margin-right: 40px;
        margin-top: 40px;
        width: 348px;
        height: 85px;
        padding: 20px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #e5e5e5;
        text-align: left;

        &:nth-child(3n) {
          margin-right: 0;
        }
        &:nth-child(-n + 3) {
          margin-top: 0;
        }

        .close-box {
          position: absolute;
          right: 10px;
          top: 10px;
          font-size: 20px;
          cursor: pointer;
        }

        .product-info {
          .title,
          .other {
            cursor: pointer;
            &:hover {
              color: @theme;
            }
          }
        }
      }
    }

    .action-box {
      .btn-box-clear {
        margin-top: 24px;
      }
      .btn-compare {
        width: 180px;
        height: 44px;
        background: #ea3200;
        border-radius: 4px 4px 4px 4px;
        font-size: 16px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;

        &:disabled {
          background: #aaa;
          cursor: not-allowed;
        }
      }

      .btn-clear {
        width: 180px;
        height: 44px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #ea3200;
        font-size: 16px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #ea3200;
      }
    }
  }
}



//新卡片样式 大威 25.10.21
@keyframes rowDetailShow {
  from{
    height: 0px;
  }
  to{
    height: 400px;
  }
}
@keyframes rowDetailHid {
  0%{
    height: 400px;
  }
  100%{
    height: 0px;
  }
}
@keyframes operate-active {
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(90deg);
  }
}
@keyframes operate-on {
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
@keyframes operate-shouqi {
  from{
    transform: rotate(90deg);
  }
  to{
    transform: rotate(0deg);
  }
}
.product-list{
  // margin-top: 50px;
  .product-box:hover{
    background-color: #ea3200;
    opacity: 0.8;
    transform: scale(1.02, 1.02);
    .product-box-top{
      .product-box-top-titile{
        a{
          color: #ffffff;
        }
      }
    }
  }
  .product-box{
    transition: all 0.4s ease;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    box-shadow:0.4rem 0.4rem 1.5rem #bbb8b8;
    border: 1px solid #ebeef5;
    background-color: #f6faff;
    margin-bottom: 20px;


    display: flex;
    padding: 20px;
    align-items: flex-start;
    &-left{
      margin-right: 20px;
      .product-box-top-img{
        width: 132px;
        height: 132px;
        overflow: hidden;
        border-radius: 8px;
        .el-image__img,img{
          border: 1px solid #ebeef5;
          border-radius: 8px;
          width: 100%;
          height: 132px;
          transition: all 0.4s ease;
        }
        .el-image__img:hover{
          transform: scale(1.2, 1.2);
        }
        img:hover{
          transform: scale(1.1, 1.1);
        }
      }
    }
    &-right{
      padding: 10px;
      border-top: 1px solid #ebeef5;
      background-color: #ffffff;
      border-radius: 8px;
      width: 100%;
      .product-box-table{
        &-head{
          padding: 10px 5px;
          border-bottom: 1px solid #ebeef5;
          display: flex;
          color: #000;
          font-weight: 500;
          width: 100%;
          span:first-child{
            width: 10%;
          }
          span:nth-child(2){
            width: 35%;
          }
          span:nth-child(3){
            width: 30%;
          }
          span:nth-child(4){
            width: 15%;
          }
          span:last-child{
            text-align: right;
          }
        }
        &-body{
          // padding-top: 15px;
          overflow: hidden;
          .body-row{
            display: flex;
            // transition: all 1s;
            align-items: baseline;
            padding: 15px 5px 15px 5px;
            .row-descript{
              width: 30%;
            }
            .row-huohao{
              width: 10%;
            }
            .row-chanpin{
              padding-right: 15px;
              width: 35%;
              a{
                font-size: 14px;
                font-family: Microsoft YaHei-Regular, Microsoft YaHei;
                font-weight: 400;
                color: #409eff;
              }
              
            }
            .row-price{
              width: 15%;
            }
            .row-operate{
              // width: 5%;
              transform: rotate(0deg);
            }
            .row-operate-active{
              // width: 5%;
              animation: operate-active 0.5s ease forwards;
            }
            .row-operate-shouqi{
              animation: operate-shouqi 0.5s ease forwards;
            }
            .row-operate:hover{
              // animation: operate-on 0.5s linear backwards;
            }
          }
          // .body-row:hover{
          //   cursor: pointer;
          //   background-color: #fff;
          //   opacity: 0.9;
          //   border: 1px solid #ddd;
          //   .row-operate{
          //     // animation: operate-on 0.5s linear backwards;
          //   }
          // }
          .body-row-detail{
            height: 100%;
            overflow: scroll;
            animation: rowDetailHid 0.3s linear forwards;
          }
          .rowOn{
            animation: rowDetailShow 1s ease forwards;
          }
          .body-row-hid{
            animation: rowDetailHid 0.3s linear forwards;
          }
          .row-active-detail{
            animation: rowDetailShow 1s ease forwards;
            display:flex;
          }
          .params-item:last-child {
            border-bottom: 1px solid #ccc;
          }
          .params-item{
            display: flex;
            align-items: center;
            border: 1px solid #ccc;
            border-bottom: none;
            .params-label{
              display: flex;
              align-items: center;
              align-self: stretch;
              background: #f7f7f7;
              min-height: 5rem;
              line-height: 5rem;
              width: 30rem;
              padding: 0 2.4rem;
              font-size: 1.4rem;
              font-family: Microsoft YaHei-Bold, Microsoft YaHei;
              // font-weight: bold;
              color: #666666;
              font-size: 1.6rem;
            }
            .params-val{
              min-height: 5rem;
              line-height: 5rem;
              padding: 0 2.4rem;
              font-size: 1.4rem;
              font-family: Microsoft YaHei-Bold, Microsoft YaHei;
              // font-weight: bold;
              color: #666666;
              font-size: 1.6rem;
              max-width: 550px;
            }
            
          }
        }
        &-footer{
          padding: 15px 5px;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-content: baseline;
          align-items: baseline;
          .el-tag{
            margin-right: 8px;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
}
</style>

<style scoped lang="less" src="@/assets/h5css/zujian/pageProductList.less"></style>
