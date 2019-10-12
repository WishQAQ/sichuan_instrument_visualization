<template>
  <div class="number-grow-warp">
    <span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">0</span>
  </div>
</template>

<script>
  export default {
    name: "number",
    props:{
      time: {
        type: Number,
        default: () => 0
      },
      value: {
        type: Number,
        default: () => 0
      }
    },
    methods: {
      numberGrow (ele) {
        console.log(ele);
        let _this = this;

        let step = (_this.value * 10) / (_this.time * 1000);
        let current = 0;
        let start = 0;
        let t = setInterval(function () {
          start += step;
          if (start > _this.value) {
            clearInterval(t);
            start = _this.value;
            t = null
          }
          if (current === start) {
            return
          }
          current = start;
          ele.innerHTML = current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
        }, 10)
      }
    },
    watch:{

    },
    mounted () {
      this.numberGrow(this.$refs.numberGrow)
    }
  }
</script>

<style scoped lang="less">
  .number-grow-warp{
    transform: translateZ(0);
  }
</style>