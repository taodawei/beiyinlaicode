<template>
  <div class="page-shuomingshu temp-3">
    <!-- 试剂盒  英文  说明书 -->

    <div class="page-box">
      <div class="page-inner">
        <div class="page-title">
          <div class="text">
            <!-- Human Signal Regulatory Protein Alpha (SIRPa) ELISA Kit -->
            {{ detail[1] }}
          </div>
          <div class="right"></div>
        </div>
        <div class="huohao">
          <div class="label">Catalog Number：</div>
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
                <!-- 本试剂盒用于体外定量检测人血清、血浆、组织、细胞上清及相关液体样本中信号调节蛋白α(SIRPa)的含量。 -->
                To quantitatively detect

                <!-- SIRPa -->
                {{ detail[2] }}
                in
                <!-- Human -->
                {{ detail[3] }}
                culture supernates, serum, plasma and tissue in vitro.
                <br />
              </li>
              <li>
                <!-- 有效期：6个月 -->
                Expiration date：6 months .
                <br />
              </li>
              <li>
                <!-- 保存条件：2-8℃ -->
                Storage： 2-8℃.
              </li>
            </ul>
          </div>

          <div class="section-title">
            <!-- 使用目的 -->
            INTENDED USE
          </div>
          <div class="section-desc">
            <!-- 本试剂盒用于体外定量检测人血清、血浆、组织、细胞上清及相关液体样本中信号调节蛋白α(SIRPa)的含量。 -->
            This kit is designed to quantitatively detect {{ detail[4] }} in culture supernates, serum, plasma and tissue in vitro

            <!-- Human SIRPa -->
            <!-- {{ detail[4] }}

            supernates, serum, plasma and tissue. -->
          </div>
          <div class="section-title">
            <!-- 实验原理 -->
            PRINCIPLE
          </div>
          <div class="section-desc">
            <!-- 本试剂盒应用双抗体夹心法测定标本中人信号调节蛋白α(SIRPa)水平。用纯化的人信号调节蛋白α(SIRPa)抗体包被微孔板，制成固相抗体，往包被单抗的微孔中依次加入信号调节蛋白α(SIRPa)，再与HRP标记的信号调节蛋白α(SIRPa)抗体结合，形成抗体-抗原-酶标抗体复合物，经过彻底洗涤后加底物TMB显色。TMB在HRP酶的催化下转化成蓝色，并在酸的作用下转化成最终的黄色。颜色的深浅和样品中的信号调节蛋白α(SIRPa)呈正相关。用酶标仪在450nm波长下测定吸光度（OD值），通过标准曲线计算样品中人信号调节蛋白α(SIRPa)浓度。 -->
            The kit evaluates
            <!-- Human SIRPa -->
            {{ detail[5] }}
            levels in the samples by sandwich-assay, solid-phase captured antibody have been prepared by coating purified

            <!-- Human SIRPa -->
           {{ detail[6] }}
           antibody onto the miroplate. Then the 
           {{ detail[7] }} 
           standards and samples were added into the wells, subsequetly, 
           biotinylated detection antibody and streptavidin-HPR also were added into the wells, and the 
           antibody--antigen-antibody-enzyme complex was formed. After washing, the TMB sbustrate solution was added, 
           and the solution color changed to blue. Finally，the sulphuric acid was added to stop the enzymatic reaction 
           with a color change to yellow. Measured OD value at 450 nm wavelength, the concentration of

            <!-- SIRPa -->
            {{ detail[9] }}
            can be calculated by standard curve.
          </div>

          <div class="section-title">
            <!-- 注意事项 -->
            WARNINGS AND PRECAUTIONS
          </div>

          <div class="section-desc">
            <!-- 本试剂盒仅用于科研，不得用于医学诊断。 使用试剂盒前，请仔细阅读说明书，以试剂盒内的说明书为准，请务必理解说明书内容。 酶标包被板属于可拆型，开封后如未用完，板条应装入铝箔袋密封并2-8°C保存。 加样样本和试剂应尽快完成。 避免实验过程中酶标板干燥；清洗后尽快加试剂。 实验开始，所有试剂应平衡到室温 (21-26°C) 后方可进行。温度会影响吸光度值，但不影响样本值。 不要在处理样本或试剂的区域抽烟、吃东西、喝酒或化妆。 操作时带一次性手套，微生物的污染会影响实验结果的正确性。 操作应按照国家规定的安全条列进行。 过期的试剂盒切勿再使用。 TMB 底物对皮肤有刺激性，不慎入眼，立即用大量水冲洗，皮肤上不慎接触到也应立即用肥皂，并用大量的水冲洗。试验中被污染的物品在下次使用前应尽快清洗。 -->
            <ul>
              <li>
                This kit is for research use only , and can not be used as a clinical diagnosis.
              </li>
              <li>
                Before the assay, read the instructions completely and carefully. Be sure that everything is understood.
              </li>
              <li>
                The microplate contains detachable strips. Unused wells must be stored at 2 °C to 8 °C in the sealed foil pouch.
              </li>
              <li>
                Add samples and reagents as quickly as possible.
              </li>
              <li>
                Rebalance all reagents in the kit to room temperature (21-26°C) before the assay. Temperature affects the OD values of the assay,but does not affecte evaluating target protein levels in the samples.
              </li>
              <li>
                Add samples and reagents as quickly as possible.
              </li>
              <li>
                Watch out bubbles formation during the assay, bubbles can affect accuracy of the assay.
              </li>
              <li>
                Do not smoke, eat, drink, or make-up during the assay.
              </li>
              <li>
                Please wear gloves, in case of microbial contamination.
              </li>
              <li>
                TMB is irritating to skin and mucosa. If eyes contact, rinse immediately with plenty of water, also under the eyelids. If skin contact, wash off with soap and water.
              </li>
            </ul>
          </div>
          <div class="section-title">
            <!-- 试剂盒组成 -->

            COMPONENT
          </div>
          <div class="section-desc">
            <table class="w-table w-921">
              <thead>
                <tr>
                  <th>
                    <!-- 中文名称 -->
                    Item
                  </th>
                  <th>
                    <!-- 96T配置 -->
                    96T Quantity
                  </th>
                  <th>
                    <!-- 48T配置 -->
                    48T Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Instruction</td>
                  <td>1</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>Sealing Film</td>
                  <td>2</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>Microplate</td>
                  <td>12wells×8strips</td>
                  <td>12wells×4strips</td>
                </tr>
                <tr>
                  <td>
                    Standard 
                    <!-- 20ng/ml -->
                    {{ detail[10] }}
                  </td>
                  <td>0.6 mL×1 bottle</td>
                  <td>0.6 mL×1 bottle</td>
                </tr>
                <tr>
                  <td>Standard Diluent</td>
                  <td>2 mL×1 bottle</td>
                  <td>2 mL×1 bottle</td>
                </tr>
                <tr>
                  <td>
                    Biotinlated
                    <!-- SIRPa -->
                    {{ detail[11] }}
                    Antibody
                  </td>
                  <td>1.5 mL×1 bottle</td>
                  <td>0.7 mL×1 bottle</td>
                </tr>
                <tr>
                  <td>Chromogen Solution A</td>
                  <td>6 mL×1 bottle</td>
                  <td>3 mL×1 bottle</td>
                </tr>
                <tr>
                  <td>Chromogen Solution B</td>
                  <td>6 mL×1 bottle</td>
                  <td>3 mL×1 bottle</td>
                </tr>
                <tr>
                  <td>Stop Solution</td>
                  <td>6 mL×1 bottle</td>
                  <td>3 mL×1 bottle</td>
                </tr>
                <tr>
                  <td>HRP-Conjugated Reagent</td>
                  <td>6 mL×1 bottle</td>
                  <td>3 mL×1 bottle</td>
                </tr>
                <tr>
                  <td>Wash Buffer Concentrate</td>
                  <td>(20 mL×30 fold)×1bottle</td>
                  <td>(20 mL×20 fold)×1bottle</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="section-title">
            <!-- 需要而未提供的试剂和器材 -->

            MATERIALS REQUIRED BUT NOT PROVIDED
          </div>
          <div class="section-desc">
            <!-- 吸光度值在450nm波长下检测的酶标仪。 1-2ml的加样器。 100 ml和1L的量筒。 吸水纸。 37°C 恒温箱。 蒸馏水或去离子水。 数据分析和绘图软件，图纸。 标准和样品稀释的试管。 -->

            <ul>
              <li>Microplate reader that can measure absorbance at 450 nm.</li>
              <li>Precision pipettes that deliver 2 mL to 1 mL.</li>
              <li>100 mL and 1 L graduated cylinders.</li>
              <li>Absorbent paper.</li>
              <li>Incubator.</li>
              <li>Distilled or deionized water.</li>
              <li>Tubes for standards and samples dilution.</li>
              <li>Date analysis and plotting software.</li>
            </ul>
          </div>

          <div class="section-title">
            <!-- 储存条件 -->
            STORAGE
          </div>
          <div class="section-desc">
            <!-- 有效期内的试剂如开封后未用完，请2-8°C 保存。 过期的试剂请不要用，打开后的试剂2-8°C 保存。 酶标包被板必须2-8°C 保存，如有未用完的酶标包被板，打开的铝箔袋须密封并2-8°C 保存。 -->
            <ul>
              <li>
                The reagents that have not been used up should be stored at 2-8°C.
              </li>
              <li>
                The miropaltes that have not been used up should be sealed in the foil pouch, and stored at 2-8°C.
              </li>
              <li>
                Please do not use expired kit.
              </li>
            </ul>
          </div>

          <div class="section-title">
            <!-- 试剂准备 -->

            REAGENT PREPARATION
          </div>
          <div class="section-desc">
            <!-- 试剂盒从冷藏环境中取出应在室温平衡后方可使用。 -->
            Rebalance all reagents to room temperature before use
          </div>

          <div class="section-title">
            <!-- 样本处理及要求 -->
            SAMPLE COLLECTION AND PREPARATION
          </div>
          <div class="section-desc">
            <!-- -用采血管收集血液，室温血液自然凝固30分钟，1000 xg离心15分钟左右，收集上清，尽早进行实验，或者分装后-20°C 或 -80°C 保存。 2. -->

            <div>
              <div><b>1. Serum</b></div>
              Collect blood sample with a serum separator tube, let blood sample clot for 2 hours at room 
              temperature or over-night at 4°C, then centrifuge for 20 minutes at 2500-3500 ×g at 4°C. Collect
               the serum, and assay it immediately, otherwise, store at -20°C or -80°C and avoid repeated 
               freeze-thaw cycles.
            </div>
            <div>
              <div><b>2. Plasma</b></div>
              Collect blood sample with a anticoagulant(EDTA or Citric acid sodium) tube. Centrifuge for 15 
              minutes at 3000 x g within 30 minutes of collection, and assay it immediately, otherwise, store 
              at -20°C or -80°C and avoid repeated freeze-thaw cycles.
            </div>
            <div>
              <div><b>3. Cell Culture Supernates</b></div>
              Collect cell culture supernates, and remove particulates by 3000 ×g centrifugation for 20 
              minutes at 4°C. Then collect supernate, and assay it immediately, otherwise, store at -20°C 
              or -80°C and avoid repeated freeze-thaw cycles.
            </div>
             <div>
              <div><b>4. Cell Lysis Solution</b></div>
              Collect cells sample, centrifuge at 1000×g for 10 minutes, discard the supernate, and wash 3 
              times with pre-cooling PBS, then resuspend cells with pre-cooling PBS or cell lysis 
              buffer(adding protease inhibitor).
              <div>
                <b>Freeze-thaw cycles lysis :</b>
                freeze sample at -20°C or -80°C 
                for 30 minutes, then thaw at 37°C, repeat the cycle 3 times, untill cells are lysed completely.
              </div> 
              <div>
                <b>Ultrasonic lysis :</b>
                the process of ultrasonic lysis is in an ice-bath, put cells in ultrasonic 
                for 2 seconds, then wait for 3 senconds, repeat the cycle 3 times, untill cells are lysed completely.
              </div>
              Colllect cells lysis solution, centrifuge at 1000×g for 10 minutes at 4°C.Then collect supernate, 
                and assay it immediately, otherwise, store at -20°C or -80°C and avoid repeated freeze-thaw cycles.
            </div>
             <div>
              <div><b>5. Tissue homogenate</b></div>
              Prepare tissue sample, perform the tissue homogenate in an ice-bath with pre-cooling 0.01M PH7.4 
              PBS(adding protease inhibitor), suggest the ratio of tissue weight to PBS volume is 1:9, that is, 
              1 g tissue should add 9 mL PBS. Collect homogenate, centrifuge at 10000×g for 10 minutes at 4°C. 
              Then collect supernate, and assay it immediately, otherwise, store at -20°C or -80°C and avoid 
              repeated freeze-thaw cycles.
            </div>
             <div>
              <div><b>6. Urine, Saliva and other liquid biological samples</b></div>
              Centrifuge at 3000×g for 10 minutes at 4°C. Then collect supernate, and assay it immediately, 
              otherwise, store at -20°C or -80°C and avoid repeated freeze-thaw cycles.
            </div>
          </div>

          <div class="section-title">
            <!-- 操作步骤 -->
            ASSAY PROCEDURE
          </div>
          <div class="section-desc">
            <!-- <div class="sub-title">
              General Remarks
            </div>
            <div class="sub-desc">
              <ul>
                <li>
                  All reagents and specimens must be allowed to come to room temperature
                  before use. All reagents must be mixed without foaming.
                </li>
                <li>
                  Once the test has been started, all steps should be completed without
                  interruption.
                </li>
                <li>
                  Use new disposal plastic pipette tips for each standard, control or
                  sample in order to avoid cross contamination.
                </li>
                <li>
                  Absorbance is a function of the incubation time and temperature. Before
                  starting the assay, it is recommended that all reagents are ready, caps
                  removed, all needed wells secured in holder, etc. This will ensure equal
                  elapsed time for each pipetting step without interruption.
                </li>
                <li>
                  As a general rule the enzymatic reaction is linearly proportional to
                  time and temperature.
                </li>
                <li>
                  Determine absorption with an ELISA reader at 450 nm against 630 nm as
                  reference. If no reference wavelength is available, read only at 450nm.
                  If the extinction of the highest standard exceeds the measurement range
                  of the photometer, absorption must be measured immediately at 450 nm
                  against 630 nm as reference.
                </li>
              </ul>
            </div> -->

            <!-- <div class="sub-title">
              Assay Procedure
            </div> -->
            <div class="sub-desc">
              <!-- 1. 标准品的稀释：准备小试管6只，依次编好号码，先在各小试管中加入标准品稀释液100ul，然后取原浓度标准品100ul加入一只已编好号的试管中，充分混匀;再在该试管中取100ul加入第二支试管中，充分混匀；再在该试 管中取100ul加入第三只试管中，充分混匀；再在该试管中取100ul加入第四只试管中，充分混匀；再在该试管中取100ul加入第五只试管中，充分混匀；然后在该试管中取100ul，弃掉。第六只试管作为0号标准品。稀释 后各管浓度分别是：10ng/ml,5ng/ml,2.5ng/ml ,1.25ng/ml,0.625ng/ml,0ng/ml。 在酶标包被板上设标准品孔，依次加入不同浓度的标准品50ul（建议每个浓度做2个平行孔）。 2. 加样：分别设空白孔（空白对照孔不加样品、酶标试剂及生物素标记的抗SIRPa抗体，其余各步操作相同）、待测样品孔。在酶标包被板上待测样品孔中先加样品40μl，然后再加生物素标记的抗SIRPa抗体10μl。加样将样 品加于酶标板孔底部，尽量不触及孔壁，轻轻晃动混匀。 3. 加酶：每孔加入酶标试剂50μl，空白孔除外。 4. 温育：用封板膜封板后置37℃温育30分钟。 5. 配液：将30倍浓缩洗涤液用蒸馏水30倍稀释后备用（将20倍浓缩洗涤液用蒸馏水20倍稀释后备用）。 6.
              洗涤：小心揭掉封板膜，弃去液体，甩干，每孔加满洗涤液，静置30秒后弃去，如此重复5次，拍干。 7. 显色：每孔先加入显色剂A50μl，再加入显色剂B50μl，轻轻震荡混匀，37℃避光显色10分钟。 8. 终止：每孔加终止液50μl，终止反应（此时蓝色立转黄色）。 9. 测定：以空白孔调零，450nm波长依序测量各孔的吸光度（OD值）。 测定应在加终止液后15分钟以内进行。 10. 检测范围：0.125ng/ml-10ng/ml. 11. 灵敏度：≤0.025ng/ml . -->

              <div class="step-list">
                <div>
                  1. Standard dilution: prepare 6 tubes, mark them with Number 0-5 successively. Add 150 μL 
                  standard diluent to each tube, then add 150 μL Standard to No.1 tube and mix. Take 150 μL 
                  solution from No.1 tube, add it to No.2 tube, and mix gently.Repeat this procedure from 
                  No.2 to No.5 tube.(as shown in the figure). And the No.0 tube serves as a blank standard 
                  tube Therefore, each concentration of the tube is 
                  <!-- 10ng/ml,5ng/ml,2.5ng/ml ,1.25ng/ml,0.625ng/ml,0ng/ml -->

                  {{ detail[12] }}

                  , respectively.
                </div>
                <div class="shijihe-qianru-box">
                  <img src="@img/tl.jpg" alt="" />
                </div>

                <div>
                  2.  Samples adding:wells are classified as standard wells, blank wells, and sample wells. 
                  Add 50 μL of each concentration standard to the standard wells, respectively(recommend 
                  to do 2 parallel wells for each concentration). Do not add sample to blank wells, but 
                  add 10 μL biotinylated antibody. Add 40 μL sample and 10 μL biotinylated antibody to sample 
                  wells.Shake and mix gently, do not touch the walls.(Note:biotinylated antibody has been 
                  added into the standard, no more adding to standard wells)
                </div>
                <div>
                  3. Enzyme adding: add 50 μL HRP-conjugated reagent to every wells, except blank wells.
                </div>
                <div>
                  4.  Incubation: seal the microplate, and incubate it at 37℃ for 30 minutes.
                </div>
                <div>
                  5.  Wash buffer preparation: dilute 30-fold wash buffer concentrate with 30 fold distilled water(96T); 
                  dilute 20-fold wash buffer concentrate with 20 fold distilled water(48T).
                </div>
                <div>
                  6.  Wash: unseal the microplate,discard liquids,and pat the micropalte dry with absorbent paper,
                   then add 300 μL wash buffer to every wells, wait for 30 seconds,discard liuquids.Repeat the procedure 5 times, pat dry.
                </div>
                <div>
                  7.  Chromogenic reaction: add chromogen solution A 50 μL and chromogen solution B 50 μL to every wells. 
                  Shake and mix gently, incubate away from light for 10 minutes.
                </div>
                <div>
                  8. Reaction stop: add 50 μL stop solution to every wells, the color changes from blue to yellow, 
                  that suggests the reactions have stopped.
                </div>
                <div>
                  9. Analysis: use the blank wells as a basis for zero setting, measure OD values within 15 minutes after reaction stop.
                </div>
                <div>
                  10.  Linearity range: 
                  <!-- 0.125ng/ml-10ng/ml -->
                  {{ detail[15] }}
                  .
                </div>
                <div>
                  11.  Sensitivity：
                  <!-- 0.025ng/ml -->
                  {{ detail[16] }}
                  .
                </div>
              </div>
            </div>
          </div>

          <div class="section-title">
            <!-- 实验结果计算 -->

            CALCULATION OF RESULTS
          </div>
          <div class="section-desc">
            <!-- 以标准物的浓度为横坐标，OD值为纵坐标，在坐标纸上绘出标准曲线，根据样品的OD值由标准曲线查出相应的浓度；或用标准物的浓度与OD值计算出标准曲线的直线回归方程式，将样品的OD值代入方程式，计算出样品浓度，即为样品的实际浓度。 -->

            <div class="elisa-box">
              <div class="elisa-left">
                <ul>
                  <li>
                   1. Take standard concentration as X-axis, and OD value as Y-axis, and plot a standard curve(recommend to use 4 parameter logistics for curve fitting).
                  </li>
                  <li>
                    2. Calculate the fitting equation for the standard curve.
                  </li>
                  <li>
                    3. Plug the OD value of a sample into the fitting equation to calculate the concentrations of the sample.
                  </li>
                  <li>
                    4. If the calculated concentration is higher than linearity range, the sample must be diluted , then plug the dilution multiple into the calculation.
                  </li>
                </ul>
              </div>
              <div class="elisa-img-box" v-if="product_poster">
                <img :src="product_poster" alt="" class="elisa-img" />
              </div>
            </div>
          </div>

          <!-- <div class="section-title">
            REFERENCES
          </div>
          <div class="section-desc bottom-list">
            <div>
              REF : Cat.-No.: / Kat.-Nr.: / No.- Cat.: / Cat.-No.: / N.º Cat.: / N.–Cat
            </div>
            <div>
              LOT : Lot-No.: / Chargen-Bez.: / No. Lot: / Lot-No.: / Lote N.º: / Lotto n.:
            </div>
            <div>
              <img src="@img/shuomingshu-icon-1.png" alt="" />
              : No. of Tests: / Kitgröße: / Nb. de Tests: / No. de Determ.: / N.º de
              Testes: / Quantità dei tests:
            </div>
            <div>
              <img src="@img/shuomingshu-icon-2.png" alt="" />
              : Keep away from heat or direct sun light. / Vor Hitze und direkter
              Sonneneinstrahlung schützen. /Garder à l’abri de la chaleur et de toute
              exposition lumineuse. / Manténgase alejado del calor o la luz solar directa.
              / Manter longe do calor ou luz solar directa. / Non esporre ai raggi solari.
              : Read instructions before use. / Arbeitsanleitung lesen. / Lire la fiche
              technique avant emploi. /Lea las instrucciones antes de usar. / Ler as
              instruções antes de usar. / Leggere le istruzioni prima dell’uso.
            </div>
            <div>
              <img src="@img/shuomingshu-icon-3.png" alt="" /> : Store at: / Lagern bei: /
              Stocker à: / Almacene a :/ Armazenar a :/ Conservare a:
            </div>
          </div>

          <div class="code-box">
            <div class="img-box">
              <img :src="webConfig.qrcode_gongzhonghao" alt="" />
            </div>
            <div class="text-box">
              Scan the QR code to get Technical Suppoprt Request Form.
            </div>
          </div> -->
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
  mounted(){
    setTimeout(() => {
      window.print();
    }, 1800);
  },
  // beforeUpdate(){
  //   setTimeout(() => {
  //     window.print();
  //   }, 1000);
  // },
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
        width: 75rem !important;
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
  line-height: 2.3;
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
  margin-bottom: 48px;
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
</style>

<style scoped lang="less" src="@/assets/h5css/templates/elisa_en.less"></style>
