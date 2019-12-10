<template>
  <div>
    <el-container>
      <el-header>
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="0">
            <!-- <img class="logo" src="/logo.png" alt=""> -->
            <img class="logo" src="/logo.jpg" alt="">
          </el-menu-item>
          <el-menu-item index="1">
            <nuxt-link to="/">首页</nuxt-link>
          </el-menu-item>
          <el-menu-item @click="logout" v-if="userinfo.id" index="4" class="pull-right">
            <span>退出</span>
          </el-menu-item>
          <el-menu-item v-if="userinfo.id" index="5" class="pull-right userinfoItem">
            <UserDisplay :user="userinfo"  class="pad0" />
            <!-- <nuxt-link to="/user">{{userinfo.nickname}}</nuxt-link> -->
          </el-menu-item>
          <el-menu-item v-if="userinfo.id" index="6" class="pull-right">
            <nuxt-link to="/editor/new">
              <el-button type='primary'>写文章</el-button>
            </nuxt-link>
          </el-menu-item>
          <el-menu-item v-if="!userinfo.id" index="2" class="pull-right">
            <nuxt-link to="/register">注册</nuxt-link>
          </el-menu-item>
          <el-menu-item v-if="!userinfo.id" index="3" class="pull-right">
            <nuxt-link to="/login">登录</nuxt-link>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <nuxt />
      </el-main>
      <!-- <el-footer> -->
        <!-- 凌峰科技 -->
      <!-- </el-footer> -->
    </el-container>
  </div>
</template>
<script>
  import UserDisplay from '~/components/UserDisplay.vue'
  export default {
    components: {
      UserDisplay
    },
    mounted() {
      this.getUserInfo()
    },
    computed: {
      userinfo() {
        return this.$store.state.user
      }
    },
    methods: {
      getUserInfo() {
        // 获取用户个人信息，如果有登录状态
        // let token = localStorage.getItem('RX_USER_TOKEN');
        this.$store.dispatch('user/detail')
      },
      async logout() {
        // this.$store.commit('user/LOGOUT')
        let ret = await this.$store.dispatch('user/logout')
        if (ret.code === 0) {
            window.localStorage.removeItem('RX_USER_TOKEN')
            this.$store.commit('user/LOGOUT');
            this.$notify({
              title: '退出成功',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({ path: '/login' })
            })
        }
      }
    }
  }
</script>
<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: #eee;
}
.el-header {
  padding: 0;
}
.pull-right {
  float: right !important;
}
.logo {
  height: 37px;
}
a {
  text-decoration: none;
}
.rx-container {
  width: 1200px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}


i.rotate180 {
  transform: rotate(180deg);
}

.ml20 {
  margin-left: 20px;
}
.el-icon-thumb {
  letter-spacing: 5px;
}
.pull-right.userinfoItem {
  .user.pad0 {
    padding: 0;
    display: inline;
    a {
      vertical-align: text-bottom;
    }
  }
  &.is-active {
    border-bottom: 0;
  }
}
</style>
