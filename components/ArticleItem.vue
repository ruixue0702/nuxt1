<template>
    <div :key="article._id" class="article-item">
        <nuxt-link :to="'/article/' + article._id">
            <h2 style="width: 700px;">{{ article.title }}</h2>
        </nuxt-link>
        <div class="pull-right">
            <span class="user">
                <span>{{ article.author.nickname }}</span>
                <img class="user-avatar" :src="article.author.avatar" alt="">
            </span>
            <span class="action">
                <i class="el-icon-view"></i>{{article.views}}
            </span>
            <span class="action">
                <i class="el-icon-thumb"></i>{{article.like}}
            </span>
            <span class="action">
                <i class="el-icon-thumb rotate180"></i>{{article.dislike}}
            </span>
        </div>
    </div>
</template>
<script>
export default {
    props: ['article']
}
</script>
<style lang="scss" scoped>
    .article-item {
        padding: 20px 15px;
        border-bottom: 2px solid #eee;
        a {
            color: #67c23a;
            display: inline-block;
        }
        .action {
            display: inline-block;
            width: 50px;
            i {
                letter-spacing: 5px;
            }
        }
        .user {
            display: inline-block;
            width: 150px;
            padding: 5px;
            a { 
                color: #67c23a;
            }
            .user-avatar {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                vertical-align: middle;
            }
            .user-nickname {
                vertical-align: middle;
            }
        }
    }
    .pull-right {
        float: right !important;
    }
</style>