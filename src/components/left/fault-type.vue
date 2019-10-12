<template>
  <div class="fault-type">
    <div class="left_title">故障类型统计图</div>
    <div class="main">
      <div class="main_left">
        <div id="faultTypeLeftChart"></div>
      </div>
      <div class="main_right">
        <div id="faultTypeRightChart"></div>
      </div>
    </div>
  </div>
</template>

<script>
  let allIndex;  // 左侧表长度
  let timeIndex = 0;  // 左侧表index
  let rightIndex; // 右侧表长度
  let rightItemIndex = 0;  // 右侧表列表index
  export default {
    name: "fault-type",
    props: ['faultData'],
    data(){
      return {
        leftData: [],
        dataLeftIndex: 0,
        rightData: [],
        rightDataName: '',
      }
    },
    methods:{
      drawChartLeft() {
        let faultTypeLeftChart = this.$echarts.init(document.getElementById("faultTypeLeftChart"));

        let option = {
          color : ['rgba(175,163,245,1)', 'rgba(0,212,136,1)', 'rgba(63,238,212,1)', 'rgba(59,175,255,1)', 'rgba(241,187,76,1)'],

          legend: {
            show:false,
            orient: 'vertical',
            top: "middle",
            // right: "20%",
            textStyle: {
              color: '#f2f2f2',
              fontSize: 25,
            },
          },
          series: [
            // 主要展示层的
            {
              radius: ['40%', '70%'],
              center: ['50%', '50%'],
              type: 'pie',

              itemStyle:{
                normal:{
                  opacity: .7,
                },
                emphasis:{
                  opacity: 1,
                  boxShadow:'2px 4px 8px rgba(0,0,0,0.38)',
                }
              },

              labelLine: {
                normal: {
                  show: false,
                  length: 5,
                  length2: 12,
                },
                color: "#000",
                emphasis: {
                  show: true
                }
              },
              label:{
                normal: {
                  show: false,
                  textStyle: {
                    color: '#fff',
                    fontSize: '16%',
                  },
                },
                emphasis: {
                  show: true,
                }
              },
              data: this.leftData,
            },
            // 边框的设置
            {
              color: ['rgba(175,163,245,.2)', 'rgba(0,212,136,.2)', 'rgba(63,238,212,.2)', 'rgba(59,175,255,.2)', 'rgba(241,187,76,.2)'],
              radius: ['70%', '84%'],
              center: ['50%', '50%'],
              type: 'pie',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              animation: false,
              tooltip: {
                show: false
              },
              data: [
                {value:17},
                {value:23},
                {value:27},
                {value:33},
                {value:9}
              ],
            }
          ]
        };

        faultTypeLeftChart.setOption(option);
        faultTypeLeftChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.dataLeftIndex
        });
        faultTypeLeftChart.on('mouseover', function(e) {
          //当检测到鼠标悬停事件，取消默认选中高亮
          faultTypeLeftChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: this.dataLeftIndex
          });
          //高亮显示悬停的那块
          faultTypeLeftChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: this.dataLeftIndex
          });
        });
        //检测鼠标移出后显示之前默认高亮的那块
        faultTypeLeftChart.on('mouseout', function(e) {
          faultTypeLeftChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: this.dataLeftIndex
          });
        });
        window.onresize = function () {
          //重置容器高宽
          faultTypeLeftChart.resize();
        };
      },

      drawChartRight(){
        let faultTypeRightChart = this.$echarts.init(document.getElementById("faultTypeRightChart"));

        let originaldata = [{
          "value": this.rightData.length*10,
          "name": this.rightDataName,
          "children": this.rightData
        }, {
          "value": 35,
        }, {
          "value": 35,
        }];
        let color0 = ['rgba(0,233,149,1)', 'rgba(0,233,149,.4)', 'rgba(0,233,149,.4)'];
        let data0 = [];
        for (let i = 0; i < originaldata.length; i++) {
          let obj = originaldata[i];
          data0.push({
            value: obj.value,
            name: obj.name,
            itemStyle: {
              color: color0[i],
            },
          });
        }

        let color1 = ['rgba(46, 164, 121, .8)', 'rgba(46, 164, 121, 1)', 'rgba(46, 164, 121, .6)'];
        let data1 = [];
        for (let i = 0; i < originaldata.length; i++) {
          let obj = originaldata[i];
          let kids = obj.children;
          if (typeof(kids) === 'undefined') {
            data1.push({
              value: obj.value,
              name: obj.name,
              itemStyle: {
                color: 'transparent',
              },
            });
          } else {
            for (let k = 0; k < kids.length; k++) {
              let kid = kids[k];
              data1.push({
                value: kid.value,
                name: kid.name,
                itemStyle: {
                  color: color1[k]
                },
                label: {
                  normal: {
                    position: 'outside',
                    color: '#fff'
                  }
                },
                labelLine: {
                  length: 2,
                  length2: 5,
                }
              });
            }
          }
        }

        let option = {
          series: [{
            type: 'pie',
            animation: false,
            radius: ['30%', '65%'],
            label: {
              normal: {
                position: 'center',
                color: '#fff',
                fontSize: '16%',
              }
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: data0
          }, {
            type: 'pie',
            radius: ['65%', '84%'],
            animation: false,
            data: data1,
            label: {
              textStyle: {
                color: '#fff',
                fontSize: '14%',
              },
            }
          }
          ],
        };

        faultTypeRightChart.setOption(option);

        window.onresize = function () {
          //重置容器高宽
          faultTypeRightChart.resize();
        };
      },

      allDataUpload(){
        for (let i= 0; i < this.faultData.length; i++){
          allIndex = i;
        }
        if(timeIndex < allIndex){
          timeIndex = timeIndex+ 1
        } else if(timeIndex === allIndex-1){
          timeIndex = 0
        }
        this.leftData = this.faultData[timeIndex].failure
      },

      rightDataList(){
        for (let i= 0; i < this.leftData.length; i++){
          rightIndex = i;
        }
        if(rightItemIndex < rightIndex){
          rightItemIndex = rightItemIndex+1
        }else if(rightItemIndex === rightIndex){
          rightItemIndex = 0
        }
        if(!this.leftData[rightItemIndex].fson){
          rightItemIndex = 0
        }
        this.rightData = this.leftData[rightItemIndex].fson;
        this.rightDataName = this.leftData[rightItemIndex].name;
      },


      LeftDataUpload(){
        if(this.dataLeftIndex < this.leftData.length - 1){
          this.dataLeftIndex +=1
        } else{
          this.dataLeftIndex = 0
        }
      },

    },
    watch: {
      faultData:function(newVal,oldVal){
        this.rightData = newVal[0].failure[0].fson;
        this.leftData = newVal[0].failure;
      }
    },
    computed: {
      getData(){
        this.rightData = this.faultData[0].failure[0].fson;
        this.leftData = this.faultData[0].failure;
      },
    },
    mounted() {
      this.rightData = this.faultData[0].failure[0].fson;
      this.leftData = this.faultData[0].failure;

      this.rightDataName = this.leftData[0].name;
      this.drawChartLeft();
      this.drawChartRight();
      setInterval(()=>{  // 左侧块
        this.LeftDataUpload();
        this.drawChartLeft();
      },3000);
      setInterval(()=>{  // 右侧图
        this.rightDataList();
        this.drawChartRight();
      },3000);
      setInterval(() =>{  // 左侧图
        this.allDataUpload();
        this.drawChartLeft();
      },this.leftData.length*3000)
    }
  }
</script>

<style scoped lang="less">
  .fault-type{
    background: url("../../assets/left/faultType_background.png") no-repeat center center;
    background-size: contain;
    width: 4.81rem;
    height: 2.15rem;
    .main{
      width: 4.81rem;
      height: 1.5rem;
      display: flex;
      align-items: center;
      position: relative;
      .main_left{
        width: 4.81rem;
        height: 1.5rem;
        position: absolute;
        left: -1.2rem;
        #faultTypeLeftChart{
          width: 4.81rem;
          height: 1.5rem;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .main_right{
        position: absolute;
        right: -1rem;
        width: 4.81rem;
        height: 1.5rem;
        #faultTypeRightChart{
          width: 4.81rem;
          height: 1.5rem;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          right: .3rem;
        }
      }
    }
  }
</style>
