<template>
  <div class="abnormal-device">
    <div class="left_title min_box">异常设备</div>
    <!--<div id="abnormalDeviceChart"></div>-->
    <div class="abnormal_device_chart">
      <div class="chart">
        {{dataNumber}}
      </div>
    </div>
  </div>
</template>
.
<script>
  let timeIndex = 0;
  let allIndex;
  export default {
    name: "abnormal-device",
    props: ['abnoramlData'],
    components:{
      'Number': () => import('@/components/public/number'),
      'ICountUp': () => import('vue-countup-v2'),
    },
    data(){
      return {
        dataNumber: '',
        dataTime: '',
      }
    },
    methods: {
      setTimeData(){
        for (let i= 0; i< this.abnoramlData.length; i++){
          allIndex = i
        }
        if(timeIndex < allIndex){
          timeIndex = timeIndex + 1;
        } else if(timeIndex === allIndex){
          timeIndex = 0;
        }
        this.dataNumber = this.abnoramlData[timeIndex].abnormal
        this.dataTime = this.abnoramlData[timeIndex].failure.length
      }
    },
    computed: {
      getData(){
        this.dataTime = this.abnoramlData[0].failure.length
        this.dataNumber =this.abnoramlData[0].abnormal
      },
    },
    watch: {
      abnoramlData:function(newVal,oldVal){
        this.dataTime = newVal[0].failure.length
        this.dataNumber =newVal[0].abnormal
      }
    },
    mounted() {
      this.dataTime = this.abnoramlData[0].failure.length
      this.dataNumber =this.abnoramlData[0].abnormal
      setInterval(this.setTimeData,this.dataTime*3000)
    }
  }
</script>

<style scoped lang="less">
  .abnormal-device{
    background: url("../../assets/left/equipmentType_background.png") no-repeat center center;
    background-size: contain;
    width: 2.31rem;
    height: 2.15rem;
    /*#abnormalDeviceChart{*/
    /*  width: 100%;*/
    /*  height: 1.5rem;*/
    /*  margin: 0 auto;*/
    /*}*/
    .abnormal_device_chart{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 1.5rem;
      width: 100%;
      .chart{
        width: 1.24rem;
        height: 1.24rem;
        background:linear-gradient(180deg,rgba(0,114,251,1) 0%,rgba(0,81,179,0.85) 29%,rgba(0,44,97,0) 100%);
        border-radius:50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.35rem;
        color:rgba(255,255,255,1);
      }
    }
  }

</style>
