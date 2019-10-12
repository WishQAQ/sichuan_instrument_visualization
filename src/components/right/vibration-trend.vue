<template>
  <div class="vibration-trend">
    <Background :title="'振动趋势图'" />

    <div id="vibrationTrendChart"></div>

  </div>
</template>

<script>
  let dataIndex = 0;

  export default {
    name: "vibration-trend",
    data(){
      return {
        vibrationData: '',
      }
    },
    components:{
      'Background': () => import('@/components/right/right-public')
    },
    methods:{
      drawChart(){
        let vibrationTrendChart = this.$echarts.init(document.getElementById("vibrationTrendChart"));

        let option ={
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              axisLabel: {
                show: false
              },
              axisLine:{
                show:false,
              },
              axisTick:{
                show:false,
              },
              splitLine:{
                show:true,
                lineStyle:{
                  color: 'rgba(0,111,231,0.1)'
                }
              },
              data : ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19']
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  color: '#fff',
                  fontSize: '10%',
                },
              },
              axisLine:{
                lineStyle:{
                  color: 'rgba(0,111,231,0.1)'
                }
              },
              axisTick:{
                show:false,
              },
              splitLine:{
                show:true,
                lineStyle:{
                  color: 'rgba(0,111,231,0.1)'
                }
              }
            },
          ],
          series : [
            {
              type:'line',
              symbol:'circle',
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color:'#00FFFF',
                  lineStyle: {
                    color: "transparent",
                    width:0
                  },
                  areaStyle: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1.5, [{
                      offset: 0,
                      color: 'rgba(0,255,255,1)'
                    }, {
                      offset: 1,
                      color: 'rgba(7,116,130,0)'
                    }]),
                  }
                }
              },
              data:this.vibrationData
            },
          ]
        };

        vibrationTrendChart.setOption(option);
        // window.onresize = function () {
        //   //重置容器高宽
        //   vibrationTrendChart.resize();
        // };
      },
      setData(){
        if(dataIndex == 0){
          this.vibrationData= ''
          this.$axios.get('/static/mock/vibration_two.json')
              .then(res =>{
                if(res.status === 200){
                  this.vibrationData = res.data.datas
                  this.drawChart()
                }
              });
          dataIndex = dataIndex+1
        }else if(dataIndex == 1){
          this.vibrationData= ''
          this.$axios.get('/static/mock/vibration_three.json')
              .then(res =>{
                if(res.status === 200){
                  this.vibrationData = res.data.datas
                  this.drawChart()
                }
              });
          dataIndex = dataIndex+1
        }else if(dataIndex == 2){
          this.vibrationData= ''
          this.$axios.get('/static/mock/vibration.json')
              .then(res =>{
                if(res.status === 200){
                  this.vibrationData = res.data.datas
                  this.drawChart()
                }
              });
          dataIndex = 0
        }
      }
    },
    mounted() {
      this.$axios.get('/static/mock/vibration.json')
          .then(res =>{
            if(res.status === 200){
              this.vibrationData = res.data.datas
              this.drawChart()
            }
          });
      setInterval(this.setData,15000)
    }
  }
</script>

<style scoped lang="less">
  .vibration-trend{
    position: relative;
    width: 4.81rem;
    height: 1.85rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: .32rem;
    overflow: hidden;
    #vibrationTrendChart{
      width: 4.5rem;
      height: 2.4rem;
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
