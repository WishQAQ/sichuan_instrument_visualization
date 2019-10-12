<template>
  <div class="right-background">
    <div class="right_title">{{title}}</div>
  </div>
</template>

<script>
  export default {
    name: "right-public",
    props: {
      title: {
        type: String,
        default: () => ''
      },
    }
  }
</script>

<style scoped lang="less">
  .right-background{
    position: absolute;
    width: 4.81rem;
    height: 1.85rem;
    background: url("../../assets/right/right-background.png") no-repeat center center;
    background-size: contain;
    top: 0;
    left: 0;
  }
</style>
