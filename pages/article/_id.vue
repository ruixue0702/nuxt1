<template>
	<div class="rx-container">
		<UserDisplay :user="article.author">
			<el-button v-if="isFollow" type="success" @click="cancelfollow" :disabled="isDis">已关注</el-button>
			<el-button v-else @click="follow" :disabled="isDis">关注</el-button>
		</UserDisplay>
		<el-divider></el-divider>
		<div class="article" v-html="article.article_html"></div>
		<el-divider></el-divider>
		<el-button @click="likeAction" :type="likeStatus ? 'success' : 'info'" :disabled="isLike">
			<i class="el-icon-thumb"></i>{{article.like}}
		</el-button>
		<el-button @click="dislikeAction" :type="dislikeStatus ? 'success' : 'info'"  :disabled="isDislike">
			<i class="el-icon-thumb rotate180"></i>{{article.dislike}}
		</el-button>
	</div>
</template>
<script>
	import UserDisplay from '~/components/UserDisplay.vue';
	export default {
		data() {
			return {
				article: {
					title: '',
					author: {}
				},
				isFollow: false,
				likeStatus: false,
				dislikeStatus: false,
				isDis: false,
				isLike: false,
				isDislike: false,
			}
		},
		components: {
			UserDisplay
		},
		mounted() {
			let { id } = this.$route.params;
			// id 不放在 data 内，是因为这里的 id 不需要做响应式
			// this.id = id 也会挂载在页面上，但不会做数据的响应式，是对响应友好的一个写法
			this.id = id;
			this.message = '';
			this.getArticle();
			// 用户已登录
			const token = localStorage.getItem('RX_USER_TOKEN');
			this.token = token;
		},
		methods: {
			async getLikeStatus(){
				// 获取喜欢状态
				let ret = await this.$http.get('/user/article/'+this.id)
				if(ret.code==0){
					this.likeStatus = ret.data.like
					this.dislikeStatus = ret.data.dislike
				}
				console.log(ret)
			},
			async likeAction() {
				// 点赞和取消
				this.isLike = true
				let type = this.likeStatus ? 'delete' : 'put';
				let ret = await this.$http[type]('/user/likeArticle/' + this.id);
				if (ret.code === 0) {
					this.getArticle();
					this.$notify({
						title: ret.message,
						type: 'success'
					})
					if (type === 'delete') {
						this.likeStatus = false
					} else {
						this.likeStatus = true
					}
				}
				this.isLike = false
			},
			async dislikeAction() {
				// 点赞和取消
				this.isDislike = true
				let type = this.dislikeStatus ? 'delete' : 'put';
				let ret = await this.$http[type]('/user/dislikeArticle/' + this.id);
				if (ret.code === 0) {
					this.getArticle();
					this.$notify({
						title: ret.message,
						type: 'success'
					})
					if (type === 'delete') {
						this.dislikeStatus = false
					} else {
						this.dislikeStatus = true
					}
				}
				this.isDislike = false
			},
			async getArticle() {
				let ret = await this.$http.get('/article/' + this.id);
				this.article = ret.data;
				if (this.token) {
					  this.checkFollowStatus()
					  this.getLikeStatus()
				}
			},
			async checkFollowStatus() {
				// 获取关注状态
				let ret = await this.$http.get('/user/follow/' + this.article.author._id);
				if(ret.code === 0) {
					this.isFollow = ret.data.isFollow;
					if (this.message !== '') {
						this.$notify({
							title: this.message,
							type: 'success'
						})
					}
				}
				this.isDis = false;
			},
			async follow() {
				this.isDis = true;
				let ret = await this.$http.put('/user/follow/' + this.article.author._id);
				this.message = ret.message;
				this.checkFollowStatus()
			},
			async cancelfollow() {
				this.isDis = true;
				let ret = await this.$http.delete('/user/follow/' + this.article.author._id);
				this.message = ret.message;
				this.checkFollowStatus()
			},
		}
	}
</script>
<style lang="scss">
	.article {
		padding: 10px 0;
		img {
			max-width: 100%;
		}
		pre {
			max-width: 100%;
			overflow-x: auto;
			background: #f8f8f8;
			padding: 20px;
			margin-top: 10px;
			border-radius: 4px;
		}
	}
</style>