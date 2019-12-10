<template>
  <div class="login-container">
    <!-- rule -->
    <el-form ref="form" :model="form" :rules="rules" class="login-form">
      <div class="title-container">
          <img src="/logo.png" alt="">
      </div>
      <el-form-item prop="email">
          <span class="svg-container">
              <i class="el-icon-mobile"></i>
          </span>
          <el-input
              ref="email"
              v-model="form.email"
              placeholder="邮箱"
              name="email"
              :readonly="readonlyInput" @focus="cancelReadOnly()"
              >
          </el-input>
      </el-form-item>
      <!-- <el-form-item prop="nickname">
          <span class="svg-container">
              <i class="el-icon-user"></i>
          </span>
          <el-input
              ref="nickname"
              v-model="form.nickname"
              placeholder="昵称"
              name="nickname"
              :readonly="readonlyInput" @focus="cancelReadOnly()"
              >
          </el-input>
      </el-form-item> -->
      <!-- svg-captcha验证码 -->
      <!-- <el-form-item prop="captcha" class="email-code">
          <div class="send-email-btn">
              <img :src="code.captcha" @click="resetCptcha"/>
          </div>
          <span class="svg-container">
              <i class="el-icon-user"></i>
          </span>
          <el-input
              ref="captcha"
              v-model="form.captcha"
              placeholder="svg-captcha 验证码"
              name="captcha"
              >
          </el-input>
      </el-form-item> -->
      <el-form-item prop="password">
          <span class="svg-container">
              <i class="el-icon-lock"></i>
          </span>
          <el-input
              ref="password"
              :key="passwordType"
              v-model="form.password"
              placeholder="密码"
              name="password"
              :type="passwordType"
              >
          </el-input>
          <span class="show-pwd" @click="showPwd">
            <i v-if="passwordType=='password'" class="el-icon-lock"></i>
            <i v-else class="el-icon-key"></i>
          </span>
      </el-form-item>
      <el-button @click.native.prevent="handleLogin" type="primary" style="width: 100%; margin-bottom: 30px;">登录</el-button>
    </el-form>
  </div>  
</template>
<script>
  import md5 from 'md5';
  export default {
    layout: 'login',
    data() {
      return {
        form: {
          email: '502740847@qq.com',
          // nickname: '',
          // captcha: '',
          password: '123456'
        },
        // code: {
        //   captcha: '/api/user/captcha'
        // },
        rules: {
          email: [
            {require: true, message: '请输入邮箱'},
            // {type: 'email', message: '请输入正确的邮箱'}
          ],
          password: [
            {require: true, message: '请输入密码'},
          ],
          // captcha: [
          //   {require: true, message: '请输入验证码'}
          // ]
        },
        passwordType: 'password',
        readonlyInput: true,
      }
    },
    methods: {
      handleLogin() {
        // vuex axios拦截器
        this.$refs.form.validate(async valid => {
          if (valid) {
            // 设置loading
            let obj = {
              email: this.form.email,
              password: md5(this.form.password)
            }
            // store 文件夹 > user.js > 异步 actions 中的 login 方法
            let ret = await this.$store.dispatch('user/login', obj)
            if (ret.code === 0) {
              this.$notify({
                title: '登录成功',
                type: 'success'
              })
              setTimeout(() => {
                this.$router.push({ path: '/' })
              })
            }
          }
        })
      },
      showPwd() {
        this.passwordType = this.passwordType === "password" ? 'text' : 'password'
      },
      resetCptcha() {
        this.code.captcha = '/api/user/captcha?_t=' + new Date().getTime()
      },
      cancelReadOnly() {
        this.readonlyInput= false;
      }
    }
  }
</script>