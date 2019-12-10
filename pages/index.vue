<template>
  <div class="rx-container">
    <h1>凌峰书架</h1>
    <ArticleItem v-for="article in articles" :article="article" :key="article._id">
    </ArticleItem>
  </div>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import ArticleItem from '~/components/ArticleItem.vue'
  export default {
    // layout: 'app',
    // 在项目中需要在初始化页面前先得到数据，也就是我们常说的异步请求数据。
    // Nuxt.js贴心的为我们扩展了Vue.js的方法，增加了asyncData(){……}。
    // 从名字上就很好理解，这是一个异步的方法。
    // 由于asyncData方法是在组件 初始化 前被调用的，
    // 所以在方法内是没有办法通过 this 来引用组件的实例对象。 
    async asyncData({app}) {
        let ret = await app.$axios.get('/api/article');
        return {
          articles: ret.data.data
        }
    },
    // mounted() {
      // this.getArticles()
    // },
    components: {
      Logo,
      ArticleItem
    },
    methods: {
      // async getArticles() {
      //   let ret = await this.$http.get('/article');
      //   console.log('article ret', ret.data)
      // }
    }
  }
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
