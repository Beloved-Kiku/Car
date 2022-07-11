<template>
  <el-container>
    <!----头部-->
    <el-header>
      <img src="../../assets/logo.png" alt="" />
      <!---头部用户区域-->
      <div class="user">
        <el-image
          :src="USER_INFO_LIST.user_pic"
          @click="updatePicFn"
        ></el-image>
        <input type="file" v-show="false" ref="File" @change="SendPicFn" />
        <el-menu
          mode="horizontal"
          background-color="#409eff"
          text-color="#fff"
          active-text-color="#ffffff"
        >
          <el-submenu index="1">
            <template slot="title">个人中心</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
        <el-button type="primary" icon="el-icon-switch-button" @click="loginOut"
          >退出</el-button
        >
      </div>
    </el-header>
    <el-container>
      <el-aside width="210px">
      <router-view name="Menus"></router-view>
      </el-aside>
      <el-main><router-view name="Main"></router-view>
      </el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "index",
  data() {
    return {
      property: "value",
    };
  },
  created() {
    //获取用户信息
    this.getUserInfo();

  },
  methods: {
    //用户退出事件
    loginOut() {
      this.$confirm("确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //清空Token  因为若用户退出登录清除Token 则不能进入后台页面
          localStorage.removeItem('Token')
          this.$router.replace("/Login");
          this.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "那就再玩一会",
          });
        });
    },
    //用户信息接口
    getUserInfo() {
      this.$store.dispatch("getMsg");
    },
    //点击图片调取隐藏Input 使用原生click事件
    updatePicFn() {
      this.$refs.File.click();
    },
    //change事件 监测用户是否传入图片
    SendPicFn(e) {
      if (e.target.files[0] === undefined) {
        return;
      }
    },
    //发送图片给后台完成更新
  },
  computed: {
    //简化拿到用户信息数据
    ...mapState(["USER_INFO_LIST"]),
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    display: flex;
    justify-content: space-between;
    background-color: rgba(97, 199, 238, 1);
    .user {
      display: flex;
      .el-image {
        width: 60px;
        height: 60px;
        margin-right: -10px;
        z-index: 999;
      }
    }
    .el-image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
  .el-aside {
    height: 600px;
    background-color: red;
  }
  .el-footer {
    height: 100px;
    background-color: red;
  }
  .el-main {
  
  }
}
</style>