<template>
  <div class="page-shuomingshu temp-1">
    <!-- 试剂盒 中文 说明书 -->

    <div class="page-box">
      <div class="page-inner">
        <div class="page-title">
          <div class="text">
            <!-- 人信号调节蛋白α(SIRPa)酶联免疫分析(ELISA)试剂盒使用说明书 -->
            {{ detail[1] }}
            酶联免疫分析（ELISA）
          </div>
          <div class="right"></div>
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
            在血清、血浆、组织、细胞上清及相关液体样本中
            {{ detail[5] }}
            的含量。
          </div>

          <div class="section-title">实验原理</div>
          <div class="section-desc">
            本试剂盒应用双抗体夹心法测定标本中
            {{detail[6]}}
            水平。用纯化的
            {{detail[7]}}
            抗体包被微孔板，制备固相检测抗体，再往包微孔中依次加
            {{detail[8]}}标准品和样本， 然后依次加入生物化的检测抗体抗体和链霉亲和素化的酶标试剂，形成抗体-抗原-抗体-酶复合物， 经过彻底洗涤后加底物TMB显色。TMB在HRP酶的催化下转化成蓝色，并在酸的作用下转化成最终的黄色。颜色的深浅和样品中的
            {{detail[10]}}
            呈正相关。 用酶标仪在450 nm波长下测定吸光度（OD值），通过标准曲线计算样品中
            {{detail[11]}}浓度。
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
              <li>实验过程中注意避免气泡产生，气泡会影响实验结果。</li>
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

          <div style="height: 3rem"></div>

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
                  <td>标准 {{ detail[12] }}</td>
                  <td>0.6 mL×1 瓶</td>
                  <td>0.6 mL×1 瓶</td>
                </tr>
                <tr>
                  <td>标准品稀释液</td>
                  <td>2 mL×1 瓶</td>
                  <td>2 mL×1 瓶</td>
                </tr>
                <tr>
                  <td>
                    生物素标记的抗

                    {{ detail[13] }}

                    抗体
                  </td>
                  <td>1.5 mL×1瓶</td>
                  <td>0.7 mL×1瓶</td>
                </tr>
                <tr>
                  <td>显色剂A液</td>
                  <td>6 mL×1瓶</td>
                  <td>3 mL×1瓶</td>
                </tr>
                <tr>
                  <td>显色剂B液</td>
                  <td>6 mL×1瓶</td>
                  <td>3 mL×1瓶</td>
                </tr>
                <tr>
                  <td>终止液</td>
                  <td>6 mL×1瓶</td>
                  <td>3 mL×1瓶</td>
                </tr>
                <tr>
                  <td>酶标试剂</td>
                  <td>6 mL×1瓶</td>
                  <td>3 mL×1瓶</td>
                </tr>
                <tr>
                  <td>浓缩洗涤液</td>
                  <td>(20 mL×30倍)×1瓶</td>
                  <td>(20 mL×20倍)×1瓶</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="section-title">需要而未提供的试剂和器材</div>
          <div class="section-desc">
            <ul>
              <li>吸光度值在450 nm波长下检测的酶标仪。</li>
              <li>1-2 mL的加样器。</li>
              <li>100 mL和1L的量筒。</li>
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
              <li>如有未用完的酶标包被板，用铝箔袋须密封并2-8°C 保存。</li>
              <li>
                请不要用过期的试剂。
              </li>
            </ul>
          </div>

          <div class="section-title">试剂准备</div>
          <div class="section-desc">
            <div>试剂盒从冷藏环境中取出应在室温平衡后方可使用。</div>
            <div>浓缩洗涤液成分在低温下会因为溶解度降低而析出结晶，不影响正常使用。</div>
            <div>冬季室温较低的情况下，可以将浓缩洗涤液通过37℃水浴促进溶解或者将浓缩洗涤液全部稀释进行溶解。</div>
          </div>

          <div class="section-title">样本处理及要求</div>
          <div class="section-desc">
            <div class="section-desc-sub">1. 血清</div>
            <div>
              用无热源、无内毒素的采集管或离心管采集血液样本，室温放置 2 小时或4°C 过夜，使血清析出。（最好将试管或离心管倾斜放置，使液面横截面增大，能使血清更大程度地析出）4℃ 2500-3500×g 离心 20 分钟，仔细收集上清。建议将血清分装，-20℃或-80℃保存，避免反复冻融，避免使用溶血和高血脂样本。
            </div>
            <div class="section-desc-sub">2. 血浆</div>
            <div>
              用含抗凝剂的采集管或离心管采集血液样本，样本采集后30分钟内4℃ 3000×g离心15分钟，
              取上清即血浆。将上清分装多份，-20°C 或 -80°C 保存，避免反复冻融，避免使用溶血和高血脂样本。
            </div>
            <div class="section-desc-sub">3. 细胞上清</div>
            <div>
              收集好的细胞上清样本，3000×g离心20分钟，除去细胞碎片和杂质，取上清。
              应尽快实验，或者分装后-20°C或 -80°C保存，避免反复冻融。
            </div>
            <div class="section-desc-sub">4. 细胞裂解液</div>
            <div>
              收集细胞悬浮液样本，1000×g离心10分钟弃培养基，用预冷PBS润洗3次；
              加入适量的预冷PBS（可加入蛋白酶抑制剂）重悬细胞；
            </div>
            <div>
              反复冻融破碎：将样品放入-20或-80°C冷冻30分钟，37°C解冻，反复冻融三次，至细胞完全破碎；
            </div>
            <div>
              超声破碎：在冰浴中进行超声破碎，破碎2秒钟间隔3秒钟，反复如此三次，至细胞完全破碎；
            </div>
            <div>
              收集样本4℃ 10000×g离心10分钟，取上清，20°C 或 -80°C保存，避免反复冻融。
            </div>
            <div class="section-desc-sub">5. 组织匀浆液</div>
            <div>
              组织处理好后，加入预冷的0.01M PH7.4的PBS（可加入蛋白酶抑制剂）进行匀浆，建议组织重量与PBS体积比例为1:9，即1 g组织，加入9 mL PBS；匀浆要在冰上或冰浴中进行；收集匀浆液4℃ 10000×g离心5～10分钟，取上清，-20°C或-80°C 保存，避免反复冻融。
            </div>
            <div class="section-desc-sub">6. 尿液、唾液等其他液体生物样本</div>
            <div>
              3000×g离心10分钟，取上清检测或者分装后-20°C或 -80°C保存，避免反复冻融。
            </div>
          </div>

          <div class="section-title">操作步骤</div>
          <div class="section-desc">
            <!-- <div class="sub-title">注意事项</div>
            <div class="sub-desc">
              <ul>
                <li>所有试剂和样本使用前必须在室温下平衡，混匀试剂时不应起泡沫。</li>
                <li>一旦实验开始，各操作步骤都应尽快完成。</li>
                <li>避免重复使用手中的吸头和试管，以免交叉污染。</li>
                <li>一般情况，酶的反应与时间和温度成正比。</li>
              </ul>
            </div> 

            <div class="sub-title">操作步骤</div>-->
            <div class="sub-desc">
              <div>
                1.标准品的稀释：准备小试管6只，依次编好号码，先在各小试管中加入标准品稀释液150 μL，然后取原浓度标准品150 μL加入一只已编好号的试管中， 充分混匀;再在该试管中取150 μL加入第二支试管中，充分混匀；再在该试管中取150 μL加入第三只试管中， 充分混匀；再在该试管中取150 μL加入第四只试管中 ，充分混匀；再在该试管中取150 μL加入第五只试管中，充分混匀； 第六只试管作为0号标准品。稀释后各管浓度分别是：
                <!-- 10ng/ml,5ng/ml,2.5ng/ml ,1.25ng/ml,0.625ng/ml,0ng/ml。  -->
                {{ detail[14] }}
                在酶标包被板上设标准品孔， 依次加入不同浓度的标准品50 μL（建议每个浓度做2个平行孔）。
              </div>

              <div class="shijihe-qianru-box">
                <img src="@img/tl.jpg" alt="" />
              </div>

              <div>
                2. 加样：分别设空白孔（空白对照孔不加样品、酶标试剂及生物素标记的抗
                {{ detail[15] }}
                抗体，其余各步操作相同）、待测样品孔。
                在酶标包被板上待测样品孔中先加样品40 μL，然后再加生物素标记的抗
                {{ detail[16] }}
                抗体10 μL。加样将样 品加于酶标板孔底部，尽量不触及孔壁，轻轻晃动混匀。（注意：标准品中已经预加生物素标记抗体，无需再加。）
              </div>
              <div>3. 加酶：每孔加入酶标试剂50 μL，空白孔除外。</div>
              <div>4. 温育：用封板膜封板后置37℃温育30分钟。</div>
              <div>
                5.
                配液：将30倍浓缩洗涤液用蒸馏水30倍稀释后备用（96T）；将20倍浓缩洗涤液用蒸馏水20倍稀释后备用（48T）。
              </div>
              <div>
                6.洗涤：小心揭掉封板膜，弃去液体，甩干，每孔加满洗涤液，静置30秒后弃去，如此重复5次，拍干。
              </div>
              <div>
                7.
                显色：每孔先加入显色剂A50 μL，再加入显色剂B50 μL，轻轻震荡混匀，37℃避光显色10分钟。
              </div>
              <div>8. 终止：每孔加终止液50 μL，终止反应（此时蓝色立转黄色）。</div>
              <div>
                9. 测定：以空白孔调零，450 nm波长依序测量各孔的吸光度（OD值）。
                测定应在加终止液后15分钟以内进行。
              </div>
              <div>
                10. 检测范围：
                <!-- 0.125ng/ml-10ng/ml.  -->
                {{ detail[17] }}
              </div>
              <div>
                11. 灵敏度：
                <!-- ≤0.025ng/ml -->
                {{ detail[18] }}
                .
              </div>
            </div>
          </div>

          <div class="section-title">实验结果计算</div>
          <div class="section-desc">
            <div class="elisa-box">
              <div class="elisa-left">
                以标准品浓度为横坐标，OD值为纵坐标，通过四参数拟合得出标准曲线，将样品的OD 值代入曲线方程式，计算得出样品的浓度。
              </div>
              <div class="elisa-img-box" v-if="product_poster">
                <img :src="product_poster" alt="" class="elisa-img" />
              </div>
            </div>
          </div>

          <!-- <div class="code-box">
            <div class="img-box">
              <img :src="webConfig.qrcode_gongzhonghao" alt="" />
            </div>
            <div class="text-box">扫描二维码获取相关的技术支持。ewm.png</div>
          </div> -->
          <div  class="code-box">
            <div  class="img-box">
              <img src="https://bio-swamp.oss-cn-nanjing.aliyuncs.com/888/ewm.png" alt="">
            </div>
            <div class="text-wrap">
              <div class="text-box">本产品储存标准：T/QGCML 2328—2023</div>
              <div class="text-box">扫描二维码获取相关的技术支持。</div>
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
  props: ["detail", "product_poster"],
  data() {
    return {
      id: this.$route.query.id, //分类id
      // product_poster: "",
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
    setView() {},
  },
};
</script>

<style scoped lang="less">
@media print {
  .code-box {
    .img-box {
      img {
        width: 30rem !important;
      }
    }
  }

  .elisa-box {
    .elisa-img-box {
      img {
        // width: 30rem !important;
      }
    }
  }
}

.elisa-box {
  // display: flex;
  // align-items: flex-start;
  // flex-direction: column;

  .elisa-left {
    flex: 1;
  }
  .elisa-img-box {
    // margin-left: 50px;
    margin-left: 0;
    img {
      // width: 640px;
      // width: 400px;
      height: auto;
      max-width: 100%;
      display: block;
      margin: 0 auto;
    }
  }
}

//手机端
@media screen and (max-width: 767px) {
  .elisa-box {
    // flex-direction: column;

    .elisa-img-box {
      // margin-left: 0;

      img {
        // width: 100%;
      }
    }
  }
}

// pad端
@media screen and (max-width: 1199px) and (min-width: 768px) {
  .elisa-box {
    // flex-direction: column;

    .elisa-img-box {
      // margin-left: 50px;
      // margin-left: 0;

      img {
        // width: auto;
        // max-width: 100%;
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
      width: 100%;
    }
  }
  .text-wrap {
    display: flex;
    justify-content: space-between;
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
  width: calc(100% - 24rem);

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
  margin: 40px auto;
  background: #ccc;
  height: 1px;
}
.ctx-box {
}

.zhaiyao-box {
  margin-bottom: 43px;
  margin-bottom: 60px;
  font-size: 14px;
  font-family: Microsoft YaHei-Bold, Microsoft YaHei;
  font-weight: bold;
  color: #333333;
  line-height: 2.3;

  font-size: 1.4rem;
}
.section-title {
  margin-bottom: 22px;
  margin-bottom: 30px;
  font-size: 16px;
  font-family: Microsoft YaHei-Bold, Microsoft YaHei;
  font-weight: bold;
  color: #ea3200;

  font-size: 1.6rem;
}
.section-desc {
  padding-bottom: 28px;
  margin-bottom: 28px;
  margin-bottom: 68px;
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
thead {
  background: #ddd;
}
.section-desc-sub {
    font-weight: 700;
}
</style>
