<template>
  <div class="page-shuomingshu temp-1">
    <div class="page-top">
      <div class="page-bread">
        <div class="bread-box">
          <img src="@img/product-home.png" alt="" />
          <router-link to="/">首页</router-link>
          <span class="bread-divider">&gt;</span>
          <router-link to="/products">产品中心</router-link>
          <span class="bread-divider">&gt;</span>
          <a href="javascirpt:void(0);">产品说明书</a>
        </div>
      </div>
    </div>

    <div class="page-box">
      <div class="page-inner">
        <div class="page-title">
          <div class="text">
            <!-- 人信号调节蛋白α(SIRPa)酶联免疫分析(ELISA)试剂盒使用说明书 -->
            {{ detail[1] }}
          </div>
          <div class="right">
            <!-- <el-select v-model="selectVersion" placeholder="">
              <el-option v-for="item in options_version" :key="item.id" :label="item.title" :value="item.id"> </el-option>
            </el-select> -->
          </div>
        </div>
        <div class="huohao">
          <div class="label">货号：</div>
          <div class="val">
            <!-- HM13296 -->
            {{ detail[0] }}
          </div>
        </div>
        <div class="divider"></div>

        <div class="ctx-box">
          <div class="zhaiyao-box">
            <ul>
              <li>
                本试剂盒用于体外定量检测
                {{ detail[2] }}
                血清、血浆、组织、细胞上清及相关液体样本中
                {{ detail[3] }}
                的含量。 <br />
              </li>
              <li>有效期：6个月<br /></li>
              <li>保存条件：2-8℃</li>
            </ul>
          </div>

          <div class="section-title">使用目的</div>
          <div class="section-desc">
            本试剂盒用于体外定量检测
            <!-- Human SIRPa -->
            {{ detail[4] }}
            在血清、血浆、组织、细胞上清及相关液体样本中的含量。
          </div>

          <div class="section-title">实验原理</div>
          <div class="section-desc">
            本试剂盒应用双抗体夹心法测定标本中
            {{ detail[5] }}
            水平。用纯化的
            {{ detail[6] }}
            抗体包被微孔板，制成固相抗体，往包被单抗的微孔中依次加入
            {{ detail[7] }}， 再与HRP标记的
            {{ detail[8] }}
            抗体结合，形成抗体-抗原-酶标抗体复合物，经过彻底洗涤后加底物TMB显色。
            TMB在HRP酶的催化下转化成蓝色，并在酸的作用下转化成最终的黄色。颜色的深浅和样品中的
            呈正相关。 用酶标仪在450nm波长下测定吸光度（OD值），通过标准曲线计算样品中
            {{ detail[9] }}
            浓度。
          </div>

          <div class="section-title">注意事项</div>
          <div class="section-desc">
            <ul>
              <li>本试剂盒仅用于科研，不得用于医学诊断。</li>
              <li>
                使用试剂盒前，请仔细阅读说明书，以试剂盒内的说明书为准，请务必理解说明书内容。
              </li>
              <li>
                酶标包被板属于可拆型，开封后如未用完，板条应装入铝箔袋密封并2-8°C保存。
              </li>
              <li>加样样本和试剂应尽快完成。</li>
              <li>避免实验过程中酶标板干燥；清洗后尽快加试剂。</li>
              <li>
                实验开始，所有试剂应平衡到室温 (21-26°C)
                后方可进行。温度会影响吸光度值，但不影响样本值。
              </li>
              <li>不要在处理样本或试剂的区域抽烟、吃东西、喝酒或化妆。</li>
              <li>操作时带一次性手套，微生物的污染会影响实验结果的正确性。</li>
              <li>操作应按照国家规定的安全条列进行。</li>
              <li>过期的试剂盒切勿再使用。</li>
              <li>
                TMB
                底物对皮肤有刺激性，不慎入眼，立即用大量水冲洗，皮肤上不慎接触到也应立即用肥皂，并用大量的水冲洗。
                试验中被污染的物品在下次使用前应尽快清洗。
              </li>
            </ul>
          </div>
          <div class="section-title">试剂盒组成</div>
          <div class="section-desc">
            <table class="w-table">
              <thead>
                <tr>
                  <th>中文名称</th>
                  <th>96T配置</th>
                  <th>48T配置</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>说明书</td>
                  <td>1份</td>
                  <td>1份</td>
                </tr>
                <tr>
                  <td>封板膜</td>
                  <td>2张</td>
                  <td>2张</td>
                </tr>
                <tr>
                  <td>酶标包被板</td>
                  <td>12孔×8条</td>
                  <td>12孔×4条</td>
                </tr>
                <tr>
                  <td>标准 {{ detail[10] }}</td>
                  <td>0.6ml×1 瓶</td>
                  <td>0.6ml×1 瓶</td>
                </tr>
                <tr>
                  <td>标准品稀释液</td>
                  <td>2ml×1 瓶</td>
                  <td>2ml×1 瓶</td>
                </tr>
                <tr>
                  <td>
                    生物素标记的抗

                    {{ detail[11] }}

                    抗体
                  </td>
                  <td>1.5ml×1瓶</td>
                  <td>0.7ml×1瓶</td>
                </tr>
                <tr>
                  <td>显色剂A液</td>
                  <td>6ml×1瓶</td>
                  <td>3ml×1瓶</td>
                </tr>
                <tr>
                  <td>显色剂B液</td>
                  <td>6ml×1瓶</td>
                  <td>3ml×1瓶</td>
                </tr>
                <tr>
                  <td>终止液</td>
                  <td>6ml×1瓶</td>
                  <td>3ml×1瓶</td>
                </tr>
                <tr>
                  <td>酶标试剂</td>
                  <td>6ml×1瓶</td>
                  <td>3ml×1瓶</td>
                </tr>
                <tr>
                  <td>浓缩洗涤液</td>
                  <td>(20ml×30倍)×1瓶</td>
                  <td>(20ml×20倍)×1瓶</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="section-title">需要而未提供的试剂和器材</div>
          <div class="section-desc">
            <ul>
              <li>吸光度值在450nm波长下检测的酶标仪。</li>
              <li>1-2ml的加样器。</li>
              <li>100 ml和1L的量筒。</li>
              <li>吸水纸。</li>
              <li>37°C 恒温箱。</li>
              <li>蒸馏水或去离子水。</li>
              <li>数据分析和绘图软件，图纸。</li>
              <li>标准和样品稀释的试管。</li>
            </ul>
          </div>

          <div class="section-title">储存条件</div>
          <div class="section-desc">
            <ul>
              <li>有效期内的试剂如开封后未用完，请2-8°C 保存。</li>
              <li>过期的试剂请不要用，打开后的试剂2-8°C 保存。</li>
              <li>
                酶标包被板必须2-8°C
                保存，如有未用完的酶标包被板，打开的铝箔袋须密封并2-8°C 保存。
              </li>
            </ul>
          </div>

          <div class="section-title">试剂准备</div>
          <div class="section-desc">试剂盒从冷藏环境中取出应在室温平衡后方可使用。</div>

          <div class="section-title">样本处理及要求</div>
          <div class="section-desc">
            <div>
              1. 血清-用采血管收集血液，室温血液自然凝固30分钟，1000
              xg离心15分钟左右，收集上清，尽早进行实验，或者分装后-20°C 或 -80°C 保存。
            </div>
            <div>
              2. 血浆-收集好的血浆根据要求选择EDTA或者柠檬酸钠作为抗凝剂，2-8°C 1000
              xg离心15分钟左右，30分钟内收集好，-20°C 或 -80°C 保存，避免反复冻融。
            </div>
            <div>
              3. 细胞上清及相关液体-收集好的样本离心后应尽快实验，或者分装后-20°C 或 -80°C
              保存，避免反复冻融。
            </div>
          </div>

          <div class="section-title">操作步骤</div>
          <div class="section-desc">
            <div class="sub-title">注意事项</div>
            <div class="sub-desc">
              <ul>
                <li>所有试剂和样本使用前必须在室温下平衡，混匀试剂时不应起泡沫。</li>
                <li>一旦实验开始，各操作步骤都应尽快完成。</li>
                <li>避免重复使用手中的吸头和试管，以免交叉污染。</li>
                <li>一般情况，酶的反应与时间和温度成正比。</li>
              </ul>
            </div>

            <div class="sub-title">操作步骤</div>
            <div class="sub-desc">
              <div>
                1.
                标准品的稀释：准备小试管6只，依次编好号码，先在各小试管中加入标准品稀释液100ul，然后取原浓度标准品100ul加入一只已编好号的试管中，充分混匀;再在该试管中取100ul加入第二支试管中，充分混匀；再在该试
                管中取100ul加入第三只试管中，充分混匀；再在该试管中取100ul加入第四只试管中，充分混匀；再在该试管中取100ul加入第五只试管中，充分混匀；然后在该试管中取100ul，弃掉。第六只试管作为0号标准品。
                稀释 后各管浓度分别是：
                <!-- 10ng/ml,5ng/ml,2.5ng/ml ,1.25ng/ml,0.625ng/ml,0ng/ml。  -->
                {{ detail[12] }}
                在酶标包被板上设标准品孔，依次加入不同浓度的标准品50ul（建议每个浓度做2个平行孔）。
              </div>

              <div class="shijihe-qianru-box">
                <img src="@img/shijihe-qianru.jpg" alt="" />
              </div>

              <div>
                2. 加样：分别设空白孔（空白对照孔不加样品、酶标试剂及生物素标记的抗
                {{ detail[13] }}
                抗体，其余各步操作相同）、待测样品孔。
                在酶标包被板上待测样品孔中先加样品40μl，然后再加生物素标记的抗
                {{ detail[14] }}
                抗体10μl。加样将样 品加于酶标板孔底部，尽量不触及孔壁，轻轻晃动混匀。
              </div>
              <div>3. 加酶：每孔加入酶标试剂50μl，空白孔除外。</div>
              <div>4. 温育：用封板膜封板后置37℃温育30分钟。</div>
              <div>
                5.
                配液：将30倍浓缩洗涤液用蒸馏水30倍稀释后备用（将20倍浓缩洗涤液用蒸馏水20倍稀释后备用）。
              </div>
              <div>
                6.洗涤：小心揭掉封板膜，弃去液体，甩干，每孔加满洗涤液，静置30秒后弃去，如此重复5次，拍干。
              </div>
              <div>
                7.
                显色：每孔先加入显色剂A50μl，再加入显色剂B50μl，轻轻震荡混匀，37℃避光显色10分钟。
              </div>
              <div>8. 终止：每孔加终止液50μl，终止反应（此时蓝色立转黄色）。</div>
              <div>
                9. 测定：以空白孔调零，450nm波长依序测量各孔的吸光度（OD值）。
                测定应在加终止液后15分钟以内进行。
              </div>
              <div>
                10. 检测范围：
                <!-- 0.125ng/ml-10ng/ml.  -->
                {{ detail[15] }}
              </div>
              <div>
                11. 灵敏度：
                <!-- ≤0.025ng/ml -->
                {{ detail[16] }}
                .
              </div>
            </div>
          </div>

          <div class="section-title">实验结果计算</div>
          <div class="section-desc">
            以标准物的浓度为横坐标，OD值为纵坐标，在坐标纸上绘出标准曲线，根据样品的OD值由标准曲线查出相应的浓度；或用标准物的浓度与OD值计算出标准曲线的直线回归方程式，将样品的OD值代入方程式，计算出样品浓度，即为样品的实际浓度。
          </div>

          <div class="code-box">
            <div class="img-box">
              <img :src="webConfig.qrcode_gongzhonghao" alt="" />
            </div>
            <div class="text-box">扫描二维码获取相关的技术支持。</div>
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
  props: ["detail"],
  data() {
    return {
      params: {},
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
      //   let params = res.data.content;
      //   //console.log('规格书说明', params)
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

.shijihe-qianru-box {
  img {
    display: block;
    max-width: 90%;
    margin: 20px auto;
  }
}
.page-shuomingshu {
  line-height: 2.3;
}

.w-921 {
  width: 921px;
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
    font-size: 1.8rem;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;
  }
}

ul {
}
li {
  .flex();
  align-items: flex-start;
  position: relative;
  padding-left: 20px;
  &::before {
    content: "";
    position: absolute;
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 10px;
    background: #333333;
    border-radius: 50%;
    line-height: 2.3;
    // top: 50%;
    top: 1rem;
    left: 0;
    // margin-top: .5rem;

    // transform: translate(0, -50%);
  }
}

.page-top {
  display: none;
  position: relative;
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

        font-size: 1.4rem;
      }
      a {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;

        font-size: 1.4rem;

        &:hover {
          color: @theme;
        }
      }
    }
  }
}

.page {
  padding-top: 32px;
  .page-box {
    background: #f7f7f7;
    background: #fff;
  }
  .page-inner {
    // width: @width;
    // margin: 0 auto;
    // padding: 32px 0;
    // padding-bottom: 80px;
    // text-align: left;

    text-align: left;
    text-align: justify;
  }
}

.page-title {
  .flex-between();

  .text {
    padding-right: 50px;
    font-size: 20px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #333333;

    font-size: 2rem;
  }
  .right {
  }
}

.huohao {
  margin-top: 12px;
  display: flex;
  align-items: flex-end;
  align-items: center;

  .label {
    font-size: 14px;
    color: #333;

    font-size: 1.4rem;
  }
  .val {
    font-size: 20px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #ea3219;

    font-size: 2rem;
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

  font-size: 1.4rem;
}
.section-title {
  margin-bottom: 22px;
  font-size: 16px;
  font-family: Microsoft YaHei-Bold, Microsoft YaHei;
  font-weight: bold;
  color: #ea3200;

  font-size: 1.6rem;
}
.section-desc {
  padding-bottom: 48px;
  margin-bottom: 48px;
  border-bottom: 1px dashed #afafaf;
  font-size: 14px;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: #333333;

  line-height: 2.3;
  font-size: 1.4rem;
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
    td {
      border-bottom: 1px solid #afafaf;
    }
  }
}

.bottom-list {
  & > div {
    margin-bottom: 15px;
  }
}
</style>
