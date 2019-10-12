<template>
  <div class="state-feature">
    <div class="left_title">状态特征记录图</div>

    <div id="stateFeatureChart"></div>
  </div>
</template>

<script>
  import Highcharts from 'highcharts/highstock';
  import Highcharts3D from 'highcharts/highcharts-3d';
  Highcharts3D(Highcharts);
  export default {
    name: "state-feature",
    data(){
      return {
        recording: 100,  // 状态特征记录
        library: 100.00, // 状态特殊库
        exchangeData: 5760,  // 每日交换数据
        exchangeVolume: 500,  // 每日交换量
      }
    },
    methods:{
      moreChart() {
        let colors = ['rgba(140,198,63,.8)','rgba(29,119,186,1)','rgba(225,211,46,1)','rgba(255,146,46,1)'];
        let colorsTwo = ['rgba(7,171,115,.1)','rgba(0,171,119,.1)','rgba(225,212,49,.1)','rgba(255,206,162,.1)'];
        Highcharts.getOptions().colors = Highcharts.map(colors, function(color) {
          return {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, color],
              [1, colorsTwo] // darken
            ],
          };
        });
        let chart = new Highcharts.chart('stateFeatureChart', {
          chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            options3d: {
              enabled: true,
              alpha: 70
            },
          },
          plotOptions: {
            pie: {
              innerSize: 90,
              depth: 60,
              dataLabels: {
                padding: 0,
                connectorPadding: 0,
                softConnector: false,
                enabled: true,
                connectorColor: 'rgba(255,255,255,.5)',
                distance: '10',
                style: {
                  color: '#fff',
                  fontSize: '90%',
                  fontWeight: '0'
                },
                formatter: function() {
                  return '<span class="'+'chartsTitle'+this.colorIndex+'">'+this.key+'</span>'+'<br />'+'<span>'+this.key+'</span>';
                }
              }
            }
          },
          title: {
            text: null
          },
          tooltip: false,
          credits: {
            enabled: false
          },
          series: [{
            data: [
              ['状态特征库', 2],
              ['每日数据交换增加', 1],
              ['每日数据交换个数', 1],
              ['状态特征记录', 3]
            ]
          }]
        });
        chart.reflow();
      }
    },
    mounted() {
      this.moreChart();
      document.getElementsByClassName('chartsTitle3')[0].innerHTML = this.recording + 'W条';
      document.getElementsByClassName('chartsTitle0')[0].innerHTML = this.library + 'G';
      document.getElementsByClassName('chartsTitle2')[0].innerHTML = this.exchangeData + '条';
      document.getElementsByClassName('chartsTitle1')[0].innerHTML = this.exchangeVolume + 'M';
    }
  }
</script>

<style scoped lang="less">
  .state-feature{
    background: url("../../assets/left/stateFeature_background.png") no-repeat center center;
    background-size: contain;
    width: 4.81rem;
    height: 2.4rem;
    #stateFeatureChart{
      width: 5rem;
      height: 2.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      /deep/.highcharts-container{
        top: -.55rem;
      }
      /deep/.highcharts-text-outline{
        display: none;
      }
      /deep/.chartsTitle3{
        fill: #FF922E;
        font-size: .2rem;
      }
      /deep/.chartsTitle0{
        fill: #0BF5AC;
        font-size: .2rem;
      }
      /deep/.chartsTitle1{
        fill: #2CA9FF;
        font-size: .2rem;
      }
      /deep/.chartsTitle2{
        fill: #FFD32E;
        font-size: .2rem;
      }
    }
  }
</style>
