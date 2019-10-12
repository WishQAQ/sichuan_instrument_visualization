<template>
  <div class="equipment-ranking">
    <div class="left_title" @click="add">设备智能诊断信息<span class="switch_btn" @click="switchBtn"></span></div>

    <div class="main">
      <div class="main_title" @click="remove">
        <p>客户代码</p>
        <p>设备名称</p>
        <p>设备种类</p>
        <p>智能诊断</p>
      </div>

      <div class="main_box">
        <div class="box_list" v-for="(item , i) in rankingList" :key="i">
            <p>{{item.code}}</p>
            <p>{{item.device}}</p>
            <p>{{item.category}}</p>
            <p :style="{color:
              item.percentage === '正常'? 'rgba(105,255,52,1)':
              item.percentage === '良好'? '#eaea26':
              item.percentage === '预警'? 'rgb(247, 86, 14)': ''
              }">{{item.percentage}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "equipment-ranking",
    data(){
      return {
        ranking:[{
            code: 'A01',
            device: '1号立辊减速机',
            category: '减速机',
            percentage: '正常'
          }, {
            code: 'A02',
            device: '2号立辊减速机',
            category: '减速机',
            percentage: '预警'
          }, {
            code: 'A03',
            device: '3号立辊减速机',
            category: '减速机',
            percentage: '正常'
          }, {
            code: 'A04',
            device: '4号立辊减速机',
            category: '减速机',
            percentage: '良好'
          }, {
            code: 'A05',
            device: '5号立辊减速机',
            category: '减速机',
            percentage: '正常'
          }],
        listLength: 0,
        rankingList: [],
        rankingIndex: 0,

      }
    },
    methods:{
      add() {
        this.ranking.splice( this.ranking.length, 0, this.ranking[0])
      },
      remove() {
        this.ranking.splice(0, 1)
      },
      switchBtn(){
        console.log('点击切换按钮');
      },
    },
    created(){

    },
    mounted() {
      for (let i=0; i< this.ranking.length; i++){
        this.listLength = i
      }
      setTimeout(() =>{
        this.rankingList.push(this.ranking[0])
        setInterval(() =>{
          this.rankingIndex = this.rankingIndex+1
          if(this.rankingIndex > this.listLength){
            this.rankingIndex = 0
          }
          if(this.rankingList.length > 4){
            this.rankingList.splice(0, 1)
          }
          this.rankingList.push(this.ranking[this.rankingIndex])

        },20000)
      },10000)


    }
  }
</script>

<style scoped lang="less">
  .equipment-ranking{
    background: url("../../assets/left/equipmentRanking_background.png") no-repeat center center;
    background-size: contain;
    width: 4.81rem;
    height: 2.43rem;
    .left_title{
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .switch_btn{
        width: .2rem;
        height: .2rem;
        background: url("../../assets/left/switchBtn.png") no-repeat;
        background-size: contain;
        position: relative;
        right: .2rem;
        top: -.1rem;
        cursor: pointer;
        z-index: 1000;
        transition: all .3s;
        /*&:hover{*/
        /*  transform: rotate(180deg);*/
        /*}*/
      }
    }
    .main{
      padding: 0 .22rem 0 .17rem;
      /*标题*/
      .main_title{
        display: flex;
        white-space:nowrap;
        flex-wrap: nowrap;
        align-items: center;
        text-align: center;
        justify-content: space-between;
        margin-bottom: .06rem;
        width: 100%;
        height: .29rem;
        background:rgba(0,104,219,.5);
        font-size: .14rem;
        color:rgba(255,255,255,1);
        >p{
          white-space:nowrap;
          position: relative;
        }
        >p:nth-child(1){
          padding-left: .05rem;
        }
        >p:nth-child(3){
          left: .1rem;
        }
        >p:last-child{
          padding-right: .05rem;
        }
      }
      /*列表*/
      .main_box{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        .box_list{
          width: 100%;
          display: flex;
          align-items: center;
          text-align: center;
          font-size: .14rem;
          color:rgba(255,255,255,1);
          height: .24rem;
          &:not(:last-child){
            margin-bottom: 0.05rem;
          }
          &:nth-child(2n){
            background:rgba(0,104,219,.3);
          }
          >p{
            &:nth-child(1){
              width: .7rem;
              margin-right: .2rem;
            }
            &:nth-child(2){
              width: 1.4rem;
              margin-right: .2rem;
            }
            &:nth-child(3){
              width: .9rem;
              margin-right: .2rem;
              padding-left: .1rem;
            }
            &:last-child{
              width: 0.9rem;
            }
          }
        }
      }
    }
  }
</style>
