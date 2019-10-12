<template>
  <div class="harmonic-trend">
    <Background :title="'谐波劣化趋势图'" />
    <div id="harmonicTrendChart"></div>
  </div>

</template>

<script>
  let dataIndex = 0;

  export default {
    name: "harmonic-trend",
    data(){
      return {
        harmonicData: '',
        data: [],
        data2: [],
      }
    },
    components:{
      'Background': () => import('@/components/right/right-public')
    },
    methods:{
      drawChart() {
        let harmonicTrendChart = this.$echarts.init(document.getElementById("harmonicTrendChart"));
        let xAxisData = [];
        for (let i = 0; i < 40; i++) {
          xAxisData.push(i);
        }
        let option = {
          xAxis: [{
            show: false,
            data: xAxisData
          }, {
            show: false,
            data: xAxisData
          }],
          visualMap: {
            show: false,
            min: 0,
            max: 50,
            dimension: 0,
            inRange: {
              color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']
            }
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#fff',
                fontSize: '10%',
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#08263f'
              }
            },
            axisTick: {
              show: false
            }
          },
          series: [{
            name: 'back',
            type: 'bar',
            data: this.data2,
            z: 1,
            itemStyle: {
              normal: {
                opacity: 0.4,
                barBorderRadius: 5,
                shadowBlur: 3,
                shadowColor: '#111'
              }
            }
          }, {
            name: 'Simulate Shadow',
            type: 'line',
            data: this.data,
            z: 2,
            showSymbol: false,
            animationDelay: 0,
            animationEasing: 'linear',
            animationDuration: 1200,
            lineStyle: {
              normal: {
                color: 'transparent'
              }
            },
            areaStyle: {
              normal: {
                color: '#08263a',
                shadowBlur: 50,
                shadowColor: '#000'
              }
            }
          }, {
            name: 'front',
            type: 'bar',
            data: this.data,
            xAxisIndex: 1,
            z: 3,
            itemStyle: {
              normal: {
                barBorderRadius: 5
              }
            }
          }],
          animationEasing: 'elasticOut',
          animationEasingUpdate: 'elasticOut',
          animationDelay: function (idx) {
            return idx * 20;
          },
          animationDelayUpdate: function (idx) {
            return idx * 20;
          }
        };
        harmonicTrendChart.setOption(option);

        // window.onresize = function () {
        //   //重置容器高宽
        //   harmonicTrendChart.resize();
        // };
      },
      setData(){
        if(dataIndex == 0){
          this.data= [];
          this.data2= [];
          this.$axios.get('/static/mock/harmonic_two.json')
              .then(res =>{
                if(res.status === 200){
                  this.data = res.data.datas.y
                  this.data2 = res.data.datas.z
                  this.drawChart()
                }
              });
          dataIndex = dataIndex+1
        }else if(dataIndex == 1){
          this.data= [];
          this.data2= [];
          this.$axios.get('/static/mock/harmonic_three.json')
              .then(res =>{
                if(res.status === 200){
                  this.data = res.data.datas.y
                  this.data2 = res.data.datas.z
                  this.drawChart()
                }
              });
          dataIndex = dataIndex+1
        }else if(dataIndex == 2){
          this.data= [];
          this.data2= [];
          this.$axios.get('/static/mock/harmonic.json')
              .then(res =>{
                if(res.status === 200){
                  this.data = res.data.datas.y
                  this.data2 = res.data.datas.z
                  this.drawChart()
                }
              });
          dataIndex = 0
        }
      }
    },
    mounted() {
      this.$axios.get('/static/mock/harmonic.json')
          .then(res =>{
            if(res.status === 200){
              this.data = res.data.datas.y
              this.data2 = res.data.datas.z
              this.drawChart()
            }
          });
      setInterval(this.setData,15000)
    }
  }
</script>

<style scoped lang="less">
  .harmonic-trend{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4.81rem;
    height: 1.85rem;
    padding-top: .32rem;
    overflow: hidden;
    #harmonicTrendChart{
      width: 4.5rem;
      height: 2.4rem;
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

</style>
