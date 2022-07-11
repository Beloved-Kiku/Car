
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
          <el-form-item prop="checkPassWord">
            <el-input
              v-model="ruleForm.checkPassWord"
              placeholder="确认密码"
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
              >立即注册</el-button
            >
          </el-form-item>
          <el-link
            type="info"
            style="font-size: 10px; color: black"
            icon="el-icon-right"
            @click="gotoLogin"
            >去登录</el-link
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reg",
  data() {  
     const checkPassWord = (rule, value, callback) => {
      //此处的Value 就是用输入的参数
      console.log(value,'value');
       if (value !== this.ruleForm.passWord) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      property: "value",
      ruleForm: {
        name: "",
        passWord: "",
        checkPassWord: "",
      },
      //配置校验规则
      rules: {
        //用户名检验
        name: [
          {
            //是否为必填项  //trigger 为该检验条件什么时候触发
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            //Element中表单验证 正则为 pattern
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: "请输入4~10位字母或者数字组成的用户名",
            trigger: "change",
          },
          {
            //Element中表单验证 正则为 pattern
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: "请输入4~10位字母或者数字组成的用户名",
            trigger: "blur",
          },
          {
            //输入长度检测
            min: 4,
            max: 10,
            message: "用户名不能低于四位",
            trigger: "change",
          },
          {
            //输入长度检测
            min: 4,
            max: 10,
            message: "用户名不能低于四位",
            trigger: "blur",
          },
        ],
        passWord: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            pattern: /^\S{6,12}/,
            message: "请输入6-12位非空字符作为密码",
            trigger: "change",
          },
          {
            pattern: /^\S{6,12}/,
            message: "请输入6-12位非空字符作为密码",
            trigger: "blur",
          },
          ,
          {
            max: 12,
            message: "密码超过十二位",
            trigger: "change",
          },
          {
            max: 12,
            message: "密码超过十二位",
            trigger: "blur",
          },
        ],
        checkPassWord: [{
          //v 代表被检测的输入框的值
          validator: checkPassWord, trigger: 'blur'
        }],
      },
    };
  },
  methods: {
    //点击确定注册 实现兜底验证 对之前设置的规定进行逐一检测 如果未通过 则提示哪一项不符合 反之成功 并且发送网络请求
    hLogin() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return;
        else {
          //整理用户输入的数据 使用Vuex 发起注册请求
          console.log(this.ruleForm);
          this.$store.dispatch('RegApi',{
            username:this.ruleForm.name,
            password:this.ruleForm.passWord,
            repassword:this.ruleForm.checkPassWord
          })
        }
      });
    },
    //路由跳转 去登录
    gotoLogin(){
      this.$router.push('/Login')
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
    height: 340px;
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
    }
  }
}
</style>