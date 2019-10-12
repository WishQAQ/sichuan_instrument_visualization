<template>
  <div class="equipment-type">
    <div class="left_title min_box">设备种类</div>
    <div class="equipment-type_box">
      <div id="equipmentTypeChart"></div>
    </div>
  </div>
</template>

<script>
  let childIndex=0;  // 子级长度
  export default {
    name: "equipment-type",
    props: ['equipmentData'],

    data(){
      return {
        dataListIndex: 0,
        dataList: [],
        dataListItemIndex: '',  // 当前列表下标
        dataListLength: '',  // 当前列表长度
      }
    },

    methods:{
      drawChart() {
        let equipmentTypeChart = this.$echarts.init(document.getElementById("equipmentTypeChart"));

        let option = {
          color: ["#EAEA26", "#906BF9", "#FE5656", "#01E17E", "#3DD1F9", "#FFAD05", '#fe5656'],
          grid: {
            left: '10%',
            top: 50,
            bottom: 10,
            right: 10,
            containLabel: true
          },
          polar: {},
          angleAxis: {
            interval: 1,
            type: 'category',
            data: [],
            z: 10,
            axisLine: {
              show: false,
              lineStyle: {
                color: "#0B4A6B",
                width: 1,
                type: "solid"
              },
            },
            axisLabel: {
              interval: 0,
              show: true,
              color: "#0B4A6B",
              margin: 8,
              fontSize: 16
            },
          },
          radiusAxis: {
            min: 40,
            max: 120,
            interval: 20,
            axisLine: {
              show: false,
              lineStyle: {
                color: "#0B3E5E",
                width: 1,
                type: "solid"
              },
            },
            axisLabel: {
              formatter: '{value} %',
              show: false,
              padding: [0, 0, 20, 0],
              color: "#0B3E5E",
              fontSize: '16%'
            },
            splitLine: {
              lineStyle: {
                color: "#0B3E5E",
                width: 2,
                type: "solid"
              }
            }
          },
          calculable: true,
          series: [{

            // 内圈
            type: 'pie',
            radius: ["2%", "7%"],
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false
              }
            },
            data: [{
              name: '',
              value: 0,
              itemStyle: {
                normal: {
                  color: "#0B4A6B"
                }
              }
            }]
          },{
            type: 'pie',
            radius: ["75%", "80%"],
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: false,
                length: 10,
                length2: 55
              },
              emphasis: {
                show: false
              }
            },
            name: "",
            data: [{
              name: '',
              value: 0,
              itemStyle: {
                normal: {
                  color: "#0B4A6B"
                }
              }
            }]
          },{
            stack: 'a',
            type: 'pie',
            radius: ['15%', '67%'],
            roseType: 'area',
            zlevel:10,
            label: {
              normal: {
                show: false,
                formatter: "{b}",
                textStyle: {
                  fontSize: '14%',
                  color: '#fff'
                },
                position: 'outside'
              },
              emphasis: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: false,
                length: 10,
                length2: 10
              },
              emphasis: {
                show: true
              }
            },
            data: this.dataList
          }]
        };
        equipmentTypeChart.setOption(option);

        window.onresize = function(){
          window.onresize = equipmentTypeChart.resize;
        }

        equipmentTypeChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 2,
          dataIndex: this.dataListIndex
        });
        equipmentTypeChart.on('mouseover', function(e) {
          //当检测到鼠标悬停事件，取消默认选中高亮
          equipmentTypeChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 2,
            dataIndex: this.dataListIndex
          });
          //高亮显示悬停的那块
          equipmentTypeChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 2,
            dataIndex: this.dataLeftIndex
          });
        });
        //检测鼠标移出后显示之前默认高亮的那块
        equipmentTypeChart.on('mouseout', function(e) {
          equipmentTypeChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 2,
            dataIndex: this.dataListIndex
          });
        });

      },

      uploadData(){
        if(this.dataListIndex < this.dataList.length - 1){
          this.dataListIndex +=1
        } else{
          this.dataListIndex = 0
        }
      },

      uploadChildData(){
        for (let i= 0; i < this.dataList.length; i++){
          this.dataListItemIndex =i
        }
        if(childIndex < this.dataListItemIndex){
          childIndex = childIndex+1
        } else if(childIndex === this.dataListItemIndex){
          childIndex = 0
        }
        this.dataListLength = this.dataList[childIndex].failure.length;
      },
    },
    computed: {
      getData(){
        this.dataList = this.equipmentData.slice(0,6);
        this.dataListLength = this.dataList[childIndex].failure.length;
      },
    },
    watch: {
      equipmentData:function(newVal,oldVal){
        this.dataList = newVal.slice(0,6);
        this.dataListLength = this.dataList[childIndex].failure.length;
      }
    },

    mounted() {
      this.dataList = this.equipmentData.slice(0,6);
      this.dataListLength = this.dataList[childIndex].failure.length;
      let allNum;
      let startNum = 0;
      let endNum = 6;
      for (let i= 0; i< this.equipmentData.length; i++){
        allNum = i
      }
      this.drawChart();
      setInterval(()=>{
        if(endNum <= allNum){
          startNum = startNum+6;
          endNum = endNum+6;
        }else if(endNum > allNum){
          startNum = 0;
          endNum = 6;
        }
        this.dataList = this.equipmentData.slice(startNum,endNum);
        this.drawChart();
      },this.dataListLength*3000*6);

      setInterval(() =>{
        this.uploadData();
        this.drawChart();
        this.uploadChildData()
      },this.dataListLength*3000)

    }
  }
</script>

<style scoped lang="less">
  .equipment-type{
    background: url("../../assets/left/equipmentType_background.png") no-repeat center center;
    background-size: contain;
    width: 2.31rem;
    height: 2.15rem;
    .equipment-type_box{
      width: 2.31rem;
      height: 2.15rem;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      top: -0.4rem;
      #equipmentTypeChart{
        position: absolute;
        width: 2.4rem;
        height: 1.4rem;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

  }
</style>
