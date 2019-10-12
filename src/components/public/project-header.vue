<template>
  <header class="header">
    设备健康监测与诊断中心
  </header>
</template>

<script>
  export default {
    name: "project-header"
  }
</script>

<style scoped lang="less">
  .header{
    width: 100%;
    height: .61rem;
    background: url("../../assets/public/header_background.png") no-repeat center center;
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "viewTitleFont",sans-serif;
    font-size: .36rem;
    color: #fff;
    text-align: center;
    position: relative;
    &::before{
      content: '';
      background: url("../../assets/public/logo.png") no-repeat center center;
      background-size: contain;
      width: .76rem;
      height: .44rem;
    }
  }
</style>
