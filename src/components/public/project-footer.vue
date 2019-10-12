<template>
  <footer class="footer">Copyright &copy; 重庆川仪软件有限公司版权所有</footer>
</template>

<script>
  export default {
    name: "project-footer"
  }
</script>

<style scoped lang="less">
  .footer{
    background: url("../../assets/public/footer_background.png") no-repeat center center;
    background-size: contain;
    width: 100%;
    height: .41rem;
    font-size: .16rem;
    color:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
