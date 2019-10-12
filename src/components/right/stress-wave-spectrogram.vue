<template>
    <div class="stress-wave-spectrogram">
      <Background :title="'应力波频谱图'" />
      <div id="stressWaveSpectrogram"></div>
    </div>
</template>

<script>
  let dataIndex = 0;

  export default {
    name: "stress-wave-spectrogram",
    components:{
      'Background': () => import('@/components/right/right-public'),
    },
    data(){
      return {
        spectrogramData: '',
        spectrogramDataX: '',
        spectrogramDataY: '',
      }
    },
    methods:{
      drawChart() {
        let stressWaveSpectrogram = this.$echarts.init(document.getElementById("stressWaveSpectrogram"));

        let option = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
          },
          yAxis: {
            type: 'value',
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle:{
                color: 'rgba(255,255,255,.1)'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#FFFFFF',
                fontSize: '10%',
              },
            }
          },
          series: [
            {
              type:'line',
              smooth:true,
              symbol: 'none',
              sampling: 'average',
              // color: 'rgba(255,255,255,.5)',
              itemStyle: {
                normal: {
                  color: 'transparent'
                }
              },
              areaStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#934BE1'
                  }, {
                    offset: 1,
                    color: '#4D90F4'
                  }])
                }
              },
              data: this.spectrogramDataY
            }
          ]
        };

        stressWaveSpectrogram.setOption(option);
        // window.onresize = function () {
        //   //重置容器高宽
        //   stressWaveSpectrogram.resize();
        // };
      },

      setData(){
        if(dataIndex == 0){
          this.spectrogramDataY = '';
          this.$axios.get('/static/mock/spectrogram_two.json')
              .then(res =>{
                if(res.status === 200){
                  this.spectrogramData = res.data.datas;
                  this.spectrogramDataY = this.spectrogramData.yy;
                  this.drawChart()
                }
              });
          dataIndex = dataIndex+1;
        }else if(dataIndex == 1){
          this.spectrogramDataY = '';
          this.$axios.get('/static/mock/spectrogram_three.json')
              .then(res =>{
                if(res.status === 200){
                  this.spectrogramData = res.data.datas;
                  this.spectrogramDataY = this.spectrogramData.yy;
                  this.drawChart()
                }
              });
          dataIndex = dataIndex+1;
        }else if(dataIndex == 2){
          this.spectrogramDataY = '';
          this.$axios.get('/static/mock/spectrogram.json')
              .then(res =>{
                if(res.status === 200){
                  this.spectrogramData = res.data.datas;
                  this.spectrogramDataY = this.spectrogramData.yy;
                  this.drawChart()
                }
              });
          dataIndex = 0;
        }
      },

    },
    mounted() {
      this.$axios.get('/static/mock/spectrogram.json')
          .then(res =>{
            if(res.status === 200){
              this.spectrogramData = res.data.datas;
              this.spectrogramDataY = this.spectrogramData.yy;
              this.drawChart()
            }
          });
      setInterval(this.setData,15000)
    }
  }
</script>

<style scoped lang="less">
  .stress-wave-spectrogram{
    position: relative;
    width: 4.81rem;
    height: 1.85rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: .2rem;
    overflow: hidden;
    #stressWaveSpectrogram{
      width: 4.5rem;
      height: 2.4rem;
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
