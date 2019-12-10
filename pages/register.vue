<template>
    <div class="login-container">
        <el-form ref="form" :model="form" :rules="registerRule" class="login-form">
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
                    >
                </el-input>
            </el-form-item>
            <!-- 邮箱验证码 -->
            <el-form-item prop="emailcode" class="email-code">
                <div class="send-email-btn">
                    <el-button type="primary" @click="sendCode">发送</el-button>
                </div>
                <span class="svg-container">
                    <i class="el-icon-user"></i>
                </span>
                <el-input
                    ref="emailcode"
                    v-model="form.emailcode"
                    placeholder="邮箱验证码"
                    name="emailcode"
                    >
                </el-input>
            </el-form-item>
            <el-form-item prop="nickname">
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
            </el-form-item>
            <!-- svg-captcha验证码 -->
            <el-form-item prop="captcha" class="email-code">
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
            </el-form-item>
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
            <el-form-item prop="repassword">
                <span class="svg-container">
                    <i class="el-icon-lock"></i>
                </span>
                <el-input
                    ref="repassword"
                    v-model="form.repassword"
                    placeholder="再次输入密码"
                    name="repassword"
                    type="password"
                    >
                </el-input>
            </el-form-item>
            <el-button @click.native.prevent="handleRegister" type="primary" style="width: 100%; margin-bottom: 30px;">注册</el-button>
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
          email: '',
          nickname: '',
          emailcode: '',
          captcha: '',
          password: '',
          repassword: ''
        },
        code: {
          captcha: '/api/user/captcha'
        },
        registerRule: {
          email: [
            {require: true, message: '请输入邮箱'},
            {type: 'email', message: '请输入正确的邮箱'}
          ],
          password: [
            {require: true, message: '请输入密码'},
            {max: 12, message: '密码长度 12 以内'}
          ],
          emailcode: [
            {require: true, message: '请输入邮箱验证码'}
          ],
          captcha: [
            {require: true, message: '请输入验证码'}
          ],
          repassword: [
            {
              require: true,
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (value !== this.form.password) {
                  callback(new Error('两次输入不一致'))
                } else {
                  callback()
                }
              }
            }
          ],
        },
        passwordType: 'password',
        readonlyInput: true,
      }
    },
    methods: {
      handleRegister() {
        this.$refs.form.validate( async valid => {
          if (valid) {
            console.log('loading状态切换')
            let obj = {
              email: this.form.email,
              password: md5(this.form.password),
              emailcode: this.form.emailcode,
              captcha: this.form.captcha,
              nickname: this.form.nickname,
            }
            let ret = await this.$http.post('/user/register', obj)
            console.log('ret', ret)
            if(ret.code === 0) {
              // 注册成功信息提醒
              // 跳转登陆页
              this.$notify({
                title: ret.message,
                type: 'success'
              })
            } else {
              this.$notify({
                title: ret.message,
                type: 'warning'
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
      async sendCode() {
        let ret = await this.$http.get('/user/sendcode?email='+this.form.email)
        console.log('ret', ret)
        if (ret.code === 0) {
          this.$notify({
            title: '发送成功',
            type: 'success'
          })
        }
      },
      cancelReadOnly() {
        this.readonlyInput= false;
      }
    }
  }
</script>
