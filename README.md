# nuxt1

> my first nuxt project

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


npm install lodash --save 节流防抖
npm install marked --save 把 markdown 解析成 html



- 注册的信息 组件内部调用
- 登录会返回一个 token 需要我们自己管理，而且是全局的
- - 登录的请求，要走 axios 的拦截器，和 vue 管理数据
- 登录返回的 token，需要存储在本地
- - 如果接口显示 token 过期
- - 我们要能清理 token，跳转登陆页
- - - 接口信息返回 token 过期，我们就执行清理逻辑
- - - 要在 axios 的拦截器里做

model 是数据库的定义

一个系统里，有多个 token：
- 用户子系统 24小时
- 安全子系统 6小时
- 交易子系统 3小时
- - 三个 token 有效期不太一样
- - 管理 3 个 token，有 token 自动续期的逻辑

前后端分离，域名不一样，cookie可能会有问题
cookie 每次请求都会带上，性能不行


一个用户可以写多个文章
1对多关系，新建一个新的 model - Article

一个人可以喜欢多个文章
一个文章可以被多个人喜欢
多对多的关系

一个人可以关注多个人
一个人可以被多个人关注

用户页面 (可以参考掘金)
- 基本个人信息
- 关注的人
- 粉丝
- 文章等
文章页面
- 关注用户 (多对多)
- 赞和踩 (多对多)
思考题

