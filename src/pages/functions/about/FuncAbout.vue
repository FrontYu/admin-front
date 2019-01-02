<template>
  <el-card class="m-page-box" id="aboutProject">
    <div style="text-align: center">
      <img src="@/assets/img/about/my-logo.png" width="100px" height="100px" />
    </div>
    <div>
      <h4>{{$t('about.author')}}</h4>
      <p>{{$t('about.authorName')}}</p>
    </div>
    <div>
      <h4>{{$t('about.mail')}}</h4>
      <p>TauCrus@163.com</p>
    </div>
    <div>
      <h4>{{$t('about.code')}}</h4>
      <p>
        <a style="color: #409eff" href="https://github.com/linjinze999/vue-llplatform" target="_blank">
          https://github.com/linjinze999/vue-llplatform
        </a>
      </p>
    </div>
  </el-card>
</template>
<script>
</script>
<style scoped lang="scss">
  .m-page-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;

    h4 {
      border-bottom: 1px solid #e6e6e6;
      padding: 6px;
    }

    p {
      padding: 6px;
    }
  }

</style>
