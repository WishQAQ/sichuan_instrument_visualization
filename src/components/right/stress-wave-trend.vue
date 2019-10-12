<template>
  <div class="stress-wave-trend">
    <Background :title="'应力波趋势图'" />

    <div id="stressWaveTrend"></div>

  </div>
</template>

<script>
  let dataIndex = 0;

  export default {
    name: "stress-wave-trend",
    components:{
      'Background': () => import('@/components/right/right-public')
    },
    data(){
      return {
        trendData: '',
        trendDataList: []
      }
    },
    methods:{
      drawChart() {
        let stressWaveTrend = this.$echarts.init(document.getElementById("stressWaveTrend"));

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
                color: '#fff',
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
                    color: '#0058C2'
                  }, {
                    offset: 1,
                    color: '#3DCAFF'
                  }])
                }
              },
              data: this.trendDataList
            }
          ]
        };

        stressWaveTrend.setOption(option);
        // window.onresize = function () {
        //   //重置容器高宽
        //   stressWaveTrend.resize();
        // };
      },

      setData(){
        if(dataIndex == 0){
          this.trendDataList= []
          this.$axios.get('/static/mock/trend_two.json')
              .then(res =>{
                if(res.status === 200){
                  this.trendData = res.data.datas;
                  for (let i = 0; i < this.trendData.length; i++){
                    this.trendDataList.push(this.trendData[i].swe)
                  }
                  this.drawChart();
                }
              });
          dataIndex = dataIndex+1
        }else if(dataIndex == 1){
          this.trendDataList= []
          this.$axios.get('/static/mock/trend.json')
              .then(res =>{
                if(res.status === 200){
                  this.trendData = res.data.datas;
                  for (let i = 0; i < this.trendData.length; i++){
                    this.trendDataList.push(this.trendData[i].swe)
                  }
                  this.drawChart();
                }
              });
          dataIndex = dataIndex+1
        }else if(dataIndex == 2){
          this.trendDataList= []
          this.$axios.get('/static/mock/trend.json')
              .then(res =>{
                if(res.status === 200){
                  this.trendData = res.data.datas;
                  for (let i = 0; i < this.trendData.length; i++){
                    this.trendDataList.push(this.trendData[i].swe)
                  }
                  this.drawChart();
                }
              });
          dataIndex = 0
        }
      }

    },

    mounted() {
      this.$axios.get('/static/mock/trend.json')
          .then(res =>{
            if(res.status === 200){
              this.trendData = res.data.datas;
              for (let i = 0; i < this.trendData.length; i++){
                this.trendDataList.push(this.trendData[i].swe)
              }
              this.drawChart();
            }
          });

      setInterval(this.setData,15000)
    }

  }
</script>

<style scoped lang="less">
  .stress-wave-trend{
    position: relative;
    width: 4.81rem;
    height: 1.85rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: .32rem;
    overflow: hidden;
    #stressWaveTrend{
      width: 4.5rem;
      height: 2.4rem;
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
