<template>
  <div class="machine-details">
    <div class="left_title">{{infoData.name}}</div>
    <div class="main">

      <div class="left">
        <div class="main_list">
          <div class="main_list_title">型号</div>
          <div class="main_list_message">{{infoData.modelName}}</div>
        </div>

        <div class="main_list">
          <div class="main_list_title">行业</div>
          <div class="main_list_message">{{infoData.industry}}</div>
        </div>

        <div class="main_list">
          <div class="main_list_title">客户代码</div>
          <div class="main_list_message">{{infoData.id}}</div>
        </div>

        <div class="main_list compared">
          <div class="main_list_title">检测前/后停机时间对比</div>
          <div class="main_list_message">
            <p>{{infoData.downtimeLeft}}小时</p>
            <span></span>
            <p>{{infoData.downtimeRight}}小时</p>
          </div>
        </div>
        <div class="main_list compared">
          <div class="main_list_title">平稳运行时间对比</div>
          <div class="main_list_message">
            <p>{{infoData.runLeft}}天</p>
            <span></span>
            <p>{{infoData.runRight}}天</p>
          </div>
        </div>

      </div>

      <div class="right">
        <div class="main_list">
          <div class="main_list_title">最近诊断时间</div>
          <div class="main_list_message">{{$GetChangeDate(diagnosticTime)}}</div>
        </div>

        <div class="main_diagnosis">
          <div class="diagnosis" v-if="diagnosis">
            <div class="diagnosis_title">
              正在诊断中<span></span>
            </div>

            <div class="diagnosis_animation">
              <div class="scanning"><span class="mask"></span></div>
            </div>
          </div>

          <div class="diagnosis" v-else>
            <div class="diagnosis_title">
              诊断结果
              <div class="slider">  <!-- 滑块 -->
                <div class="slider_btn" :style="{'left': $GetSliderSchedule(infoData.slider)}"> <!-- 滑块按钮 -->
                  <span :style="{'left':'-'+ $GetSliderSchedule(infoData.slider)}"></span> <!-- 滑块按钮背景 -->
                </div>
                <div class="slider_text"
                     :style="{
                     'left':$GetSliderSchedule(infoData.slider),
                     'color':$GetSliderStatus(infoData.slider)
                     }"
                >{{infoData.slider <= '30%' ? '正常' :
                  infoData.slider > '30%' && infoData.slider <'60%' ? '良好':
                  infoData.slider >= '60%' ? '预警' :''}}</div>
              </div>
            </div>
            <div class="main_list result" style="margin-top: .33rem">
              <div class="main_list_title">设备健康状态</div>
              <div class="main_list_message">{{infoData.status}}</div>
            </div>
            <div class="main_list result">
              <div class="main_list_title">维保建议</div>
              <div class="main_list_message">{{infoData.result}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let dataIndex = 0;
  let infoIndex = 0;
  export default {
    name: "machine-details",
    data(){
      return {
        diagnosis: true,  // 是否开启诊断
        diagnosticTime: '',  // 最近诊断时间
        machineLeftData: [
          {
            name: '1号立辊减速机',
            modelName: 'TC55KW3-1',
            industry: '建材',
            id: 'A01 ',
            downtimeLeft: 20,
            downtimeRight: 15,
            runLeft: 20,
            runRight: 22,
            slider: '12%',  // 滑块距离
            status: '设备状态正常',
            result: '建议保持关注',
          },{
            name: '2号立辊减速机',
            modelName: 'TC55KW3-2',
            industry: '建材',
            id: 'A02 ',
            downtimeLeft: 32,
            downtimeRight: 18,
            runLeft: 16,
            runRight: 21,
            slider: '72%',  // 滑块距离
            status: '状态出现劣化',
            result: '重点关注小齿轮',
          },{
            name: '3号立辊减速机',
            modelName: 'TC55KW3-3',
            industry: '建材',
            id: 'A03 ',
            downtimeLeft: 22,
            downtimeRight: 19,
            runLeft: 18,
            runRight: 19,
            slider: '12%',  // 滑块距离
            status: '设备状态正常',
            result: '建议保持关注',
          },{
            name: '4号立辊减速机',
            modelName: 'TC55KW3-4',
            industry: '建材',
            id: 'A04 ',
            downtimeLeft: 22,
            downtimeRight: 19,
            runLeft: 18,
            runRight: 19,
            slider: '44%',  // 滑块距离
            status: '状态出现波动',
            result: '关注电机驱动端',
          },{
            name: '5号立辊减速机',
            modelName: 'TC55KW3-5',
            industry: '建材',
            id: 'A05 ',
            downtimeLeft: 16,
            downtimeRight: 14,
            runLeft: 22,
            runRight: 26,
            slider: '22%',  // 滑块距离
            status: '设备状态正常',
            result: '建议保持关注',
          }],
        infoData: []
      }
    },
    methods:{
      setData(){
        if(dataIndex === 0){
          this.diagnosis = false;
          this.diagnosticTime = new Date();
          dataIndex = dataIndex +1
        } else if(dataIndex === 1){
          this.diagnosis = true;
          dataIndex = 0
        }
      },
      setInfo(){
        let dataListIndex = this.machineLeftData.length

        if(infoIndex < dataListIndex-1){
          infoIndex = infoIndex+1;
        } else if(infoIndex === dataListIndex -1){
          infoIndex = 0;
        }
        this.infoData = this.machineLeftData[infoIndex]

      }
    },
    mounted() {
      this.diagnosticTime = new Date()
      this.infoData = this.machineLeftData[0]
      setInterval(() =>{
        this.setData();
      },10000)
      setInterval(this.setInfo,20000)
    }
  }
</script>

<style scoped lang="less">
  .machine-details{
    background: url("../../assets/center/machineDetails_backgound.png") no-repeat center center;
    background-size: contain;
    width: 8.84rem;
    height: 2.44rem;
    position: relative;
    &::after{
      content: '';
      position: absolute;
      background: url("../../assets/center/center_icon.png") no-repeat center center;
      background-size: contain;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 3.7rem;
      z-index: 0;
    }
    .main{
      width: 100%;
      height: calc(100% - .5rem);
      padding: 0 .31rem .08rem;
      display: flex;
      margin-right: .39rem;
      position: relative;
      z-index: 1;
      .left{
        width: 3.9rem;
        flex-shrink: 0;
      }
      .right{
        width: 100%;
        position: relative;

      }
      .main_list{
        display: flex;
        align-items: center;
        height: .25rem;
        &:not(:last-child){
          margin-bottom: .1rem;
        }
        &.compared{
          .main_list_title{
            width: 1.9rem;
            margin-right: .05rem;
          }
          .main_list_message{
            display: inline-flex;
            align-items: center;
            p{
              &:first-child{
                font-size: .2rem;
                color:rgba(11,209,142,1);
              }
              &:last-child{
                font-size: .2rem;
                color:rgba(255,141,10,1);
              }
            }
            span{
              background: url("../../assets/center/compare.png") no-repeat;
              background-size: contain;
              width: .3rem;
              height: .3rem;
              display: inline-flex;
              margin: 0 .15rem;
            }
          }
        }
        .main_list_title{
          font-size: .18rem;
          color:rgba(0,255,255,1);
          margin-right: .26rem;
        }
        .main_list_message{
          font-size: .18rem;
          color:rgba(255,255,255,1);
        }
      }
      .main_diagnosis{
        .diagnosis{
          width: 100%;
          height: 100%;
          .diagnosis_title{
            font-size: .22rem;
            color:rgba(255,255,255,1);
            display: flex;
            align-items: center;
            >span{
              display: inline-flex;
              overflow: hidden;
              &::before{
                content: '';
                animation: load infinite ease-in-out 3s;
              }
              @keyframes load {
                0% {content: ''}
                33% {content: '.'}
                66% {content: '..'}
                100% {content: '...'}
              }
            }
            &::before{
              content: '';
              width: .36rem;
              height: .36rem;
              background: url("../../assets/center/diagnosis_title.png") no-repeat;
              background-size: contain;
              display: inline-flex;
              margin-right: .05rem;
            }
            /*滑块*/
            .slider{
              width:2.52rem;
              height: .08rem;
              background:linear-gradient(74deg,rgba(10,226,161,1) 0%,rgba(234,234,38,1) 51%,rgba(255,0,0,1) 100%);
              border-radius: .08rem;
              margin-left: .15rem;
              position: relative;
              display: flex;
              align-items: center;
              transition: all .3s;
              /*滑块按钮*/
              .slider_btn{
                width: .16rem;
                height: .16rem;
                background: transparent;
                box-shadow:0 .03rem .06rem rgba(0,0,0,0.16);
                border-radius:50%;
                position: absolute;
                left: 0;
                transition: all .3s;
                overflow: hidden;
                display: flex;
                align-items: center;
                span{
                  transition: all .3s;
                  position: absolute;
                  width:2.52rem;
                  height: .16rem;
                  left: 0;
                  background:linear-gradient(74deg,rgba(10,226,161,1) 0%,rgba(234,234,38,1) 51%,rgba(255,0,0,1) 100%);
                }
              }
              /*滑块文字*/
              .slider_text{
                transition: all .3s;
                font-size: .16rem;
                position: absolute;
                left: 0;
                top: .18rem;
                margin-left: -.18rem;
                width: .5rem;
                text-align: center;
              }
            }
          }
          .diagnosis_animation{
            background: url("../../assets/center/device.gif") no-repeat;
            background-size: contain;
            width: 2.5rem;
            height: 1.5rem;
            position: absolute;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            .scanning{
              background: url("../../assets/center/scanning.gif") no-repeat center center;
              background-size: contain;
              width: .75rem;
              height: .95rem;
              position: relative;
              left: .15rem;
              top: -.15rem;
              animation:
                animX 2s cubic-bezier(0.36,0,0.64,1) -1s infinite alternate,
                animY 2s cubic-bezier(0.36,0,0.64,1)  0s infinite alternate;
              .mask{
                background: url("../../assets/center/scanning_mask.png") no-repeat;
                background-size: contain;
                width: 0.4rem;
                height: 0.4rem;
                position: absolute;
                left: 0.135rem;
                top: 0.18rem;
              }
              @keyframes animX{
                0% {left: .15rem;}
                100% {left: -.3rem;}
              }
              @keyframes animY{
                0% {top: -.15rem;}
                100% {top: .3rem;}
              }
            }
          }

          /*诊断结果*/
          .result{
            .main_list_title{
              width: 1.1rem;
            }
          }
        }
      }
    }
  }
</style>
