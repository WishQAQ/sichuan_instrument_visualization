<template>
  <div class="index">
    <!-- 头部 -->
    <Header-Div></Header-Div>
    <!-- 主体内容 -->
    <div class="main">

      <!-- 左侧列表 -->
      <div class="main_left">
        <StateFeature-Div></StateFeature-Div> <!-- 状态特征 -->
        <!-- 左侧-小盒子 -->
        <div class="main_left_minBox">
          <EquipmentType-Div :equipmentData="equipmentData" v-if="showChild"></EquipmentType-Div> <!-- 设备种类 -->
          <AbnormalDevice-Div :abnoramlData="equipmentData" v-if="showChild"></AbnormalDevice-Div> <!-- 异常设备 -->
        </div>
        <FaultType-Div :faultData="equipmentData" v-if="showChild"></FaultType-Div> <!-- 故障类型 -->
        <EquipmentRanking-Div></EquipmentRanking-Div> <!-- 设备诊断率排名 -->
      </div>

      <!-- 中部数据 -->
      <div class="main_center">
        <Map-Div></Map-Div> <!-- 地图 -->
        <MachineDetails-Div></MachineDetails-Div> <!-- 机器的名称 -->
      </div>

      <!-- 右侧 -->
      <div class="main_right">
        <StressWaveTrend-Div></StressWaveTrend-Div> <!-- 应力波趋势图 -->
        <StressWaveHistogram-Div></StressWaveHistogram-Div> <!-- 应力波直方图 -->
        <StressWaveSpectrogram-Div></StressWaveSpectrogram-Div> <!-- 应力波频谱图 -->
        <HarmonicTrend-Div></HarmonicTrend-Div> <!-- 谐波劣化趋势图 -->
        <VibrationTrend-Div></VibrationTrend-Div> <!-- 振动趋势图 -->
      </div>

    </div>
    <!-- 底部 -->
    <Footer-Div></Footer-Div>
  </div>
</template>

<script>
  export default {
    name: "index",
    components:{
      // public
      'HeaderDiv': () => import('@/components/public/project-header'),  // 头部
      'FooterDiv': () => import('@/components/public/project-footer'),  // 页脚
      // left
      'StateFeatureDiv': () => import('@/components/left/state-feature'),  // 状态特征
      'FaultTypeDiv': () => import('@/components/left/fault-type'),  // 故障类型
      'EquipmentTypeDiv': () => import('@/components/left/equipment-type'),  // 设备种类
      'AbnormalDeviceDiv': () => import('@/components/left/abnormal-device'),  // 异常设备
      'EquipmentRankingDiv': () => import('@/components/left/equipment-ranking'),  // 设备智能诊断信息
      // center
      'MapDiv': () => import('@/components/center/dynamic-map'),  // 地图
      'MachineDetailsDiv': () => import('@/components/center/machine-details'),  // 机器的名称
      // right
      'StressWaveTrendDiv': () => import('@/components/right/stress-wave-trend'),  // 应力波趋势图
      'StressWaveHistogramDiv': () => import('@/components/right/stress-wave-histogram'),  // 应力波直方图
      'StressWaveSpectrogramDiv': () => import('@/components/right/stress-wave-spectrogram'),  // 应力波频谱图
      'HarmonicTrendDiv': () => import('@/components/right/harmonic-trend'),  // 谐波劣化趋势图
      'VibrationTrendDiv': () => import('@/components/right/vibration-trend'),  // 振动趋势图
    },
    data(){
      return {
        equipmentData: [],  // 设备种类列表
        showChild: false
      }
    },
    created(){
      this.$axios.get('/static/mock/devtype.json')
          .then(res =>{
            this.equipmentData = res.data
            this.showChild = true
          })
    }
  }
</script>

<style scoped lang="less">
  .index{
    width: 100%;
    height: 100%;
    background: url("../assets/public/background.png") no-repeat center center #061B3B;
    background-size: cover;
    overflow: hidden;
    user-select: none;
    position: relative;
    &::before{
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 999;
    }
    .main{
      width: 100%;
      height: calc(100% - 1.02rem);
      padding: 0 .2rem;
      display: flex;
      justify-content: space-between;

      /*左侧*/
      .main_left{
        width:4.81rem;
        >div{
          &:not(:last-child){
            margin-bottom: .19rem;
          }
        }
        /*小盒子*/
        .main_left_minBox{
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }

      /*中部*/
      .main_center{
        padding: .18rem .17rem 0;
        >div{
          &:not(:last-child){
            margin-bottom: .03rem;
          }
        }
      }

      /*右侧*/
      .main_right{
        >div{
          &:not(:last-child){
            margin-bottom: .11rem;
          }
        }
      }

    }
  }
</style>
