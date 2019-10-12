<template>
  <div class="echarts">
    <div class="myEchart" ref="myEchart"></div>
  </div>
</template>
<script>
  let BJData;
  let dataIndex = 0;
  import 'echarts/map/js/china.js' // 引入中国地图数据
  export default {
    data() {
      return {
        chart: null
      };
    },
    mounted() {
      this.initEchartMap();
      let BJDataIndex = BJData.length -1
      setInterval(() =>{
        if(dataIndex< BJDataIndex){
          dataIndex = dataIndex+1
        } else if(dataIndex === BJDataIndex){
          dataIndex = 0
        }
        this.initEchartMap();
      },20000)
    },
    methods: {
      initEchartMap() {
        let myChart = this.$echarts.init(this.$refs.myEchart, {devicePixelRatio: 2});
        window.addEventListener("resize",function(){
          myChart.resize();

        });
        let geoCoordMap = {
          '重庆': [107.7539, 30.1904],
          '广东': [113.386241,23.86145],
          '湖南': [111.5332,27.3779],
          '青海': [95.2402,35.4199],
          '内蒙': [110.689043,40.486163],
          '广西': [107.7813,23.6426],
          '四川': [101.9199,30.1904],
          '辽宁': [123.100014,41.417738],
          '安徽': [117.2461,32.0361],
          '北京': [116.4551,40.2539],
        };

        BJData = [
          [{
            name: '广东',
            value: 0,
          }, {
            name: '重庆',
          }],
          [{
            name: '湖南',
            value: 0
          }, {
            name: '重庆'
          }],
          [{
            name: '青海',
            value: 0
          }, {
            name: '重庆'
          }],
          [{
            name: '内蒙',
            value: 0
          }, {
            name: '重庆'
          }],
          [{
            name: '广西',
            value: 0
          }, {
            name: '重庆'
          }],
          [{
            name: '四川',
            value: 0
          }, {
            name: '重庆'
          }],
          [{
            name: '天津',
            value: 0
          }, {
            name: '重庆'
          }],
          [{
            name: '辽宁',
            value: 0
          }, {
            name: '重庆'
          }],
          [{
            name: '安徽',
            value: 0
          }, {
            name: '重庆'
          }],
          [{
            name: '北京',
            value: 0
          }, {
            name: '重庆'
          }]
        ];
        BJData[dataIndex].map(res =>{
          if(res.name !== '重庆'){
            res.value = 1
          }
        })

        let convertData = function(data) {
          let res = [];
          for (let i = 0; i < data.length; i++) {
            let dataItem = data[i];
            let fromCoord = geoCoordMap[dataItem[0].name];
            let toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
              res.push([{
                coord: fromCoord,
                value: dataItem[0].value
              }, {
                coord: toCoord
              }]);
            }
          }
          return res;
        };
        let color = ['#00FFFF','#00FFFF','#00FFFF','#00FFFF','#00FFFF','#00FFFF','#00FFFF','#00FFFF','#00FFFF','#00FFFF'];

        let series = [];
        [['重庆', BJData]].forEach((item, i) => {
          series.push(
              {
                symbolSize: 20,

                type: 'map',
                map: 'china',
                aspectScale: 0.85,
                tooltip: {
                  show: false
                },
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff', //地图初始化区域字体颜色
                    fontSize: '14%',
                    backgroundColor: 'rgba(0,0,0,0)'
                  },
                  emphasis: {
                    color: 'rgba(255,255,255,1)',
                  }
                },
                data: [{
                    name: '重庆',
                    selected: true,
                  }],
                roam: false,
                itemStyle: {
                  normal: {
                    borderColor: 'rgba(147, 235, 248, 0.6)',
                    borderWidth: 0.8,
                    areaColor: {
                      type: 'linear-gradient',
                      x: 0,
                      y: 30,
                      x2: 7,
                      y2: 0,
                      colorStops: [{
                        offset: 0,
                        color: '#00FFFF' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: '#1641A7' // 50% 处的颜色
                      }],
                      global: true // 缺省为 false
                    },

                  },
                  emphasis: {
                    areaColor: 'rgba(0, 255, 255, 1)',
                    label: {
                      textStyle: {
                        color: 'rgba(255, 211, 46, 0)', //地图初始化区域字体颜色
                        fontSize: '16%',
                        opacity: 1,
                        position: 'center',
                        top: '10%',
                      },
                    }
                  }
                },
                zlevel:0
              },
              {
                type: 'lines',
                zlevel: 2,
                top: '24%',
                left: '10.8%',
                aspectScale: 0.85,
                roam: false,
                effect: {
                  show: true,
                  period: 4, //箭头指向速度，值越小速度越快
                  trailLength: 0.1, //特效尾迹长度[0,1]值越大，尾迹越长重
                  symbol: 'arrow', //箭头图标
                  symbolSize: 6, //图标大小
                },
                lineStyle: {
                  normal: {
                    color: '#00FFFF',
                    width: 3, //尾迹线条宽度
                    opacity: .1, //尾迹线条透明度
                    curveness: .2 //尾迹线条曲直度
                  }
                },
                data: convertData(item[1])
              }, {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                  period: 2,
                  brushType: 'stroke',
                  scale: 3,
                },
                label: {
                  normal: {
                    color: 'rgba(255, 211, 46, 1)',
                    formatter: function(params) { //圆环显示文字
                      return params.data.name;
                    },
                  },
                  emphasis: {

                  }
                },
                symbol: 'circle',
                symbolSize: function(val) {
                  return 5 + val[2] * 5; //圆环大小
                },
                hoverAnimation: false,
                showEffectOn: 'render',
                itemStyle: {
                  normal: {
                    color: 'rgba(255, 211, 46, 1)'
                  }
                },
                data: item[1].map(dataItem => {
                  return {
                    name: dataItem[0].name,
                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                  };
                })
              },{
                type: 'scatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                  period: 4,
                  brushType: 'stroke',
                  scale: 4
                },
                show: false,
                color: 'rgba(255, 211, 46, 0)',
                label: {
                  normal: {
                    show: true,
                    position: 'right',
                    offset:[0, 0],
                    color: 'rgba(255, 211, 46, 1)',
                    formatter: '{b}',
                    textStyle: {
                      fontSize: '16%',
                      color: 'rgba(255, 211, 46, 1)'
                    }
                  },
                  emphasis: {
                    show: true,
                    color: 'rgba(255, 211, 46, 1)',
                  }
                },
                symbol: 'pin',
                symbolSize: 50,
                data: [{
                  name: item[0],
                  value: geoCoordMap[item[0]].concat([10]),
                }],
              });
        });


        let option ={
          visualMap: { //图例值控制
            min: 0,
            max: 1,
            calculable: false,
            show: false,
            color: ['#FFD32E', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
            textStyle: {
              color: '#fff'
            }
          },
          geo: {
            map: 'china',
            aspectScale: 0.85,
            top: '17%',
            left: '9.5%',
            label: {
              color: 'rgba(255,255,255,0)',
              emphasis:{
                color: 'rgba(255,255,255,0)',
              }
            },

            itemStyle: {
              normal: {
                borderColor: 'rgba(147, 235, 248, 1)',
                borderWidth: 0.5,

                color: {
                  type: 'linear-gradient',
                  x: 0,
                  y: 30,
                  x2: 7,
                  y2: 0,
                  colorStops: [{
                    offset: 0,
                    color: '#00FFFF' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#1641A7' // 50% 处的颜色
                  }],
                  global: true // 缺省为 false
                },
                opacity: 0.5,
              },
              emphasis: {
                areaColor: '#2a333d'
              }
            },
            z: 2
          },
          series: series
        };

        myChart.setOption(option);
      }
    }
  }
</script>
<style lang="less">
  .myEchart{
    width: 10rem;
    height: 8rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
