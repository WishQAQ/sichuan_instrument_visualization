<template>
    <div class="stress-wave-histogram">
      <Background :title="'应力波直方图'" />
      <div id="stressWaveHistogram"></div>
    </div>
</template>

<script>
  let dataList = 0;

  export default {
    name: "stress-wave-histogram",
    components:{
      'Background': () => import('@/components/right/right-public'),
    },
    data(){
      return {
        histogramData: '',
        histogramDataX: '',
        histogramDataY: '',
      }
    },
    methods:{
      drawChart() {
        let stressWaveHistogram = this.$echarts.init(document.getElementById("stressWaveHistogram"));

        let option = {
          color: '#E16D64',
          xAxis: {
            type: 'category',
            boundaryGap: false,
          },
          yAxis: {
            splitArea: {
              show: true,
              areaStyle:{
                color: ['rgba(255,255,255,0.05)','transparent'],
              }
            },
            axisLabel:{
              fontSize: '10%',
              color: '#fff',
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "dotted"
              }
            }
          },
          series: [{
            type: 'bar',
            data: this.histogramDataY,
            large: true
          }]
        };

        stressWaveHistogram.setOption(option);
        // window.onresize = function () {
        //   //重置容器高宽
        //   stressWaveHistogram.resize();
        // };
      },
      setData(){
        if(dataList == 0){
          this.histogramDataY= '';
          this.$axios.get('/static/mock/histogram_two.json')
              .then(res =>{
                if(res.status === 200){
                  this.histogramData = res.data.datas;
                  this.histogramDataX = this.histogramData.xx;
                  this.histogramDataY = this.histogramData.yy;
                  this.drawChart();
                }
              });
          dataList = dataList+1
        }else if(dataList == 1){
          this.histogramDataY= '';
          this.$axios.get('/static/mock/histogram_three.json')
              .then(res =>{
                if(res.status === 200){
                  this.histogramData = res.data.datas;
                  this.histogramDataX = this.histogramData.xx;
                  this.histogramDataY = this.histogramData.yy;
                  this.drawChart();
                }
              });
          dataList = dataList+1
        }else if(dataList == 2){
          this.histogramDataY= '';
          this.$axios.get('/static/mock/histogram.json')
              .then(res =>{
                if(res.status === 200){
                  this.histogramData = res.data.datas;
                  this.histogramDataX = this.histogramData.xx;
                  this.histogramDataY = this.histogramData.yy;
                  this.drawChart();
                }
              });
          dataList = 0
        }
      }
    },
    mounted() {
      this.$axios.get('/static/mock/histogram.json')
          .then(res =>{
            if(res.status === 200){
              this.histogramData = res.data.datas;
              this.histogramDataX = this.histogramData.xx;
              this.histogramDataY = this.histogramData.yy;
              this.drawChart();
            }
          });
     setInterval(this.setData,15000)
    }
  }
</script>

<style scoped lang="less">
  .stress-wave-histogram{
    position: relative;
    width: 4.81rem;
    height: 1.85rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: .2rem;
    overflow: hidden;
    #stressWaveHistogram{
      width: 4.5rem;
      height: 2.4rem;
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
