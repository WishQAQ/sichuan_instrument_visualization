<template>
  <div class="dynamic-map">
    <div class="monitor_total">
      <div class="total_amount">
        <p>监测设备总量</p>
        <div class="count">
          <IOdometer
              class="iOdometer"
              :value="countVal"
              :format="'d'"
          ></IOdometer>
<!--          <span v-for="(item, index) in $GetNumberType(this.count)" :key="index">{{item}}</span>-->
          <!--          <Flip :deadline="count" :length="length"></Flip>-->
          <!--          <ICountUp class="count_number" :endVal="count" :options="options" @update="uploadData"/>-->
          <!--          <span class="count_back" v-for="index in 5" :key="index"></span>-->
        </div>
      </div>

      <Map id="map"></Map>

      <div class="quantity">
        <div class="quantity_list">
          <div class="number"><ICountUp class="number_big" :endVal="point" :options="options"/><span>个</span></div>
          <p class="list_name">测点在线</p>
        </div>
        <div class="quantity_list">
          <div class="number"><ICountUp class="number_big" :endVal="diagnosis" :options="options"/><span>次</span></div>
          <p class="list_name">智能诊断</p>
        </div>
        <div class="quantity_list">
          <div class="number"><ICountUp class="number_big" :endVal="report" :options="options"/><span>次</span></div>
          <p class="list_name">生成报告</p>
        </div>
        <div class="quantity_list">
          <div class="number"><ICountUp class="number_big" :endVal="access" :options="options"/><span>次</span></div>
          <p class="list_name">报告访问</p>
        </div>

      </div>

    </div>


  </div>
</template>

<script>
  import 'odometer/themes/odometer-theme-default.css';
  import IOdometer from 'vue-odometer';
  export default {
    name: "dynamic-map",
    components:{
      'Map': () => import('@/components/public/map'),
      // 'Number': () => import('@/components/public/number'),
      'ICountUp': () => import('vue-countup-v2'),
      // 'Flip': () => import('vue-flip-number')
      IOdometer
    },
    data(){
      return {
        countVal: 11286,
        length: 5,
        countList: '',

        options: {
          useEasing: true,
          separator: '',
        },

        point: 50325, // 测点在线
        diagnosis: 55312, // 智能诊断
        report: 58771, // 生成报告
        access: 13946, // 报告访问
      }
    },
    mounted() {
      setInterval(()=>{
        this.countVal = 99999
        setTimeout(() =>{
          if( this.countVal === 99999){
            this.countVal = 11286
          }
        },100);
        this.diagnosis +=1;
        this.report +=1;
        this.access +=6;
      },15000);

    }
  }
</script>

<style scoped lang="less">
  .iOdometer {
    font-size: .36rem;
    margin: 0;
  }
  .dynamic-map{
    width: 8.45rem;
    height: 7.05rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    position: relative;
    .monitor_total{
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      padding-top: .35rem;
      padding-bottom: .17rem;
      #map{
        position: absolute;
        top: -15%;
        left: -10%;
      }
      .total_amount{
        >p{
          font-size: .3rem;
          font-family: viewTitleFont,sans-serif;
          font-weight:400;
          color:rgba(0,255,255,1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: .1rem;
        }
        .count{
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          position: relative;
          /deep/.odometer-inside{
            display: flex;
            align-items: center;
            .odometer-digit{
              display: flex;
              align-items: center;
              justify-content: center;
              width: .3rem;
              height: .44rem;
              background:rgba(2,35,84,1);
              opacity:1;
              border-radius: .04rem;
              font-size: .36rem;
              color:rgba(255,255,255,1);
              text-shadow:0 .01rem .01rem rgba(0,0,0,0.16);
              position: relative;
              overflow: hidden;
              /*&::before{*/
              /*  content: '';*/
              /*  width: 100%;*/
              /*  height: 50%;*/
              /*  position: absolute;*/
              /*  background:rgba(2,35,84,1);*/
              /*  top: 0;*/
              /*  left: 0;*/
              /*  z-index: 0;*/
              /*  opacity: 0;*/
              /*}*/
              /*&::after{*/
              /*  position: absolute;*/
              /*  content: '';*/
              /*  width: 100%;*/
              /*  height: .01rem;*/
              /*  background: rgba(0,75,185,1);*/
              /*}*/
              &:not(:last-child){
                margin-right: .08rem;
              }
            }

          }

        }
      }
      .quantity{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1.17rem;
        width: 100%;
        .quantity_list{
          height: 100%;
          width: 1.77rem;
          background: url("../../assets/center/quantity_background.png") no-repeat center center;
          background-size: contain;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-direction: column;
          &:first-child{
            .number {
              color: rgba(234, 234, 38, 1);
            }
          }
          &:nth-child(2){
            .number {
              color: rgba(11, 209, 60, 1);
            }
          }
          &:nth-child(3){
            .number {
              color: rgba(231, 179, 65, 1);
            }
          }
          &:last-child{
            .number {
              color: rgba(254, 86, 86, 1);
            }
          }
          .number{
            display: flex;
            align-items: center;
            height: .45rem;
            /deep/.d-roll-wrapper{
              margin: 0;
            }
            .number_big{
              font-size: .32rem;
              font-weight: 500;
            }
            span{
              font-size: .22rem;
              margin-left: .07rem;
              font-weight: normal;
            }
          }
          .list_name{
            margin-top: .1rem;
            font-size: .2rem;
            color:rgba(255,255,255,1);
          }
        }
      }
    }
  }
</style>
