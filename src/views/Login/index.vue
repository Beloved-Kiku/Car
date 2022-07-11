<template>
  <div class="login">
    <div class="login_From">
      <div class="title">
        <img src="@/assets/login_title.png" alt="" />
      </div>
      <div class="sub">
        <el-form
          status-icon
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="用户名"
              prefix-icon="el-icon-user"
              autofocus
            ></el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input
              v-model="ruleForm.passWord"
              placeholder="密码"
              prefix-icon="el-icon-unlock"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-key"
              style="width: 100%"
              @click="hLogin"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
        <div class="bottom">
          <el-checkbox v-model="checked"
            >记住密码</el-checkbox
          >
          <el-link
            type="info"
            style="font-size: 10px; color: black"
            icon="el-icon-right"
            @click="gotoReg"
            >去注册</el-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        name: "",
        passWord: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
          {
            min: 4,
            message: "用户名不能低于4位",
            trigger: "blur",
          },
          {
            max: 10,
            message: "用户名不能大于10位",
            trigger: "blur",
          },
        ],
        passWord: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            pattern: /^\S{6,12}/,
            message: "请输入6-12位非空字符密码",
            trigger: "change",
          },
          {
            max: 12,
            message: "密码不能大于12位",
            trigger: "change",
          },
        ],
      },
      checked: false,
    };
  },
  methods: {
    //兜底验证//发送请求
    hLogin() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return;
        //如果用户点击了记住密码后的处理
        else if(this.checked){
            this.$store.dispatch("LoginApi", {
            username: this.ruleForm.name,
            password: this.ruleForm.passWord,
            checked :this.checked
          });
        }
        //如果用户没有点击或者是之前保存了后面再取消都需要移除缓存
        else{
            localStorage.removeItem('userMessage')
            this.$store.dispatch("LoginApi", {
            username: this.ruleForm.name,
            password: this.ruleForm.passWord,
          });
        }
      });
    },
    //路由跳转 去注册
    gotoReg() {
      this.$router.push("/Reg");
    },
  },
  //页面挂载 传递给Vuex this
  created() {
    this.$store.dispatch("VueThis", this);
    //判断上一位用户是否勾选记住密码 若有的话 则从浏览器缓存取值 直接给到页面
    if(localStorage.getItem('userMessage')){
       const userInfo = JSON.parse(window.atob(localStorage.getItem('userMessage')))
       console.log(userInfo);
       this.ruleForm.name = userInfo.username
       this.ruleForm.passWord = userInfo.password
       this.checked = true
    }
  },
};
</script>

<style lang="less" scoped>
.login {
  background: url(@/assets/zh.png) center;
  background-size: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_From {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 380px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 0 5px #ccc;
    padding: 0 20px;
    box-sizing: border-box;
    .title {
      color: red;
      margin-top: 20px;
    }
    .sub {
      width: 100%;
      height: 100%;
      margin-top: 20px;
      .bottom {
        display: flex;
        justify-content: space-between;
        .el-link {
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>