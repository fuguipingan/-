<template>
  <div class="login">
    <div class="login__left"></div>
    <div class="login__loginContainer">
      <h1 class="login__h1">千峰管理系统</h1>
      <div class="login__form">
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="demo-loginForm"
        >
          <el-form-item
            label="用户名"
            prop="username"
            @keyup.enter.native="submitForm('loginForm')"
          >
            <el-input
              type="text"
              v-model="loginForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            @keyup.enter.native="submitForm('loginForm')"
          >
            <el-input
              type="password"
              v-model="loginForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item
            label="验证码"
            prop="captcha"
            @keyup.enter.native="submitForm('loginForm')"
          >
            <el-input
              type="text"
              class="captcha"
              v-model="loginForm.captcha"
              autocomplete="off"
            ></el-input>
            <span
              class="captcha-svg"
              v-html="captchaSvg"
              @click="refreshCaptcha"
            ></span>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <video
      class="bg_video"
      muted
      src="../../assets/viedo/login.mp4"
      autoplay
      loop
      preload="auto"
    ></video>
  </div>
</template>
<script>
//登入逻辑
//1.搜集用户输入的username&password传递给后端
//2.登入通过后，将后端返回的token传入本地,跳转首页
//3.每次请求时，携带token
//4.展示token效验正确的数据
//5.效验不通过，跳转登录页
import { login, getCaptcha, refreshCaptcha, verifyCaptcha } from "@/api";
import { mapMutations } from "vuex";
export default {
  data() {
    /**
     * @param {Object} rule 就是一个表单验证对象
     * @param {String} value 就是输入的值
     * @param {Function} callback 校验通过不传参 效验不通过传参
     *
     * */
    var validateUsername = (rule, value, callback) => {
      // console.log(rule )
      // console.log(value )
      // console.log( callback )
      // /^[a-zA-Z0-9_-]{4,16}$/
      let reg = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!value) {
        callback("4到16位(字母，数字，下划线，减号)");
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9]{5,16}$/;
      if (!value) {
        callback("输入密码");
      } else {
        callback();
      }
    };
    var validateCaptcha = (rule, value, callback) => {
      if (!value) {
        callback("输入验证码");
      } else {
        callback();
      }
    };
    return {
      captchaSvg: "123",
      loginForm: {
        username: "",
        password: "",
        age: "",
        captcha: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        captcha: [{ validator: validateCaptcha, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.set_captcha();
  },
  methods: {
    ...mapMutations(["SET_USERINFO", "SET_USERBUTTON"]),
    //设置验证码
    set_captcha() {
      getCaptcha().then(res => {
        //  console.log(res)

        this.captchaSvg = res.data.img;
        //  console.log(this.captchaSvg )
      });
    },
    refreshCaptcha() {
      //点击验证码，刷新验证码
      this.set_captcha();
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //代表验证通过，发送请求
          //查看验证码是否正确
          let verifyRes = await verifyCaptcha(this.loginForm.captcha);
          // console.log(verifyRes);
          if (!verifyRes.data.state) {
            this.$message.error("验证码错误，请重新输入");
            await this.set_captcha();
            return;
          }

          const loading = this.$loading({
            lock: true,
            text: "正在加载中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });

          let { username, password } = this.loginForm;
          // console.log(username, password);
          // console.log(login);
          login(username, password)
            .then(res => {
              loading.close();
              // console.log(res);
              if (res.data.state) {
                //用户名密码正确
                // alert("用户名密码正确");
                this.$message({
                  message: "登录成功",
                  type: "success"
                });
                localStorage.setItem("qf-2005", res.data.token);
                localStorage.setItem(
                  "qf-userInfo",
                  JSON.stringify(res.data.userInfo)
                ); //服务端传过来的用户信息传入本地，加密
                // console.log( SET_USERINFO )
                this.SET_USERINFO(res.data.userInfo);
                //把用户按钮权限放入本地
                let buttonArr = res.data.permission.buttons;
                localStorage.setItem(
                  "permissionButton",
                  JSON.stringify(buttonArr)
                );
                this.SET_USERBUTTON(buttonArr); //把按钮权限放入vuex

                // console.log(res)
                // console.log(res.data.permission.buttons)
                this.$router.push("/");
              } else {
                //用户名密码错误
                this.$message.error("用户名密码错误");
                return;
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.login {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
}
.login__left {
  left: 0;
  top: 0;
  z-index: 1;
  width: 50%;
  height: 100%;
  background-image: url("../../assets/imgs/login.png");
  background-repeat: no-repeat;
  background-size: 50%;
  position: absolute;
  opacity: 0.7;
  background-position: 60% 65%;
}
.login__loginContainer {
  position: absolute;
  width: 500px;
  height: 450px;

  z-index: 2;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  left: 50%;
  top: 30%;
  right: 30%;
  bottom: 30%;
  margin: auto;
}
.el-input__inner {
  width: 250px;
  transition: all 0.5s;
  height: 40px;
  line-height: 100%;
  overflow: hidden;
  color: #fff;
  border: 0.04761905rem solid #fff;
  background: none;
  padding-left: 0.95238095rem;
  font-size: 0.76190476rem !important;
}
.el-button.el-button--primary {
  width: 100%;
  background: linear-gradient(90deg, #1596fb, #002dff);
}

.login .login__h1 {
  margin: 60px 0px;
  color: white;
  text-align: center;
}
.login .el-form-item__label {
  color: white;
}
.bg_video {
  display: block;
  margin: auto;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.8;
}
</style>
