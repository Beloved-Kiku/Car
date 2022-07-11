<template>
<div style="height:100%">
<router-view></router-view>
</div>
</template>

<script>
export default {
  name:'app',
  data() {
    return {
      property: 'value',
    };
  },
  mounted(){
    console.log(this);
  }
}
</script>

<style lang="less">
/*初始化 配置 该项目特殊APP只是用来挂载各路由 可以在App里进行全局Css 初始化*/
html ,body{
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: bold;
  .el-button{
    font-size: 12px;
    font-weight: bold;
  }

}

</style>