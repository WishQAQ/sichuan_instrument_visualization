<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="less">
  #app{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>

<style>
  @import "../static/style/base.css";
</style>
