<template>
	<div class="rx-container">
		<h1>用户中心</h1>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane :label="'关注' + following.length" name="following">
				<div v-for="user in following" :key="user._id">
					<UserDisplay :user="user" />
				</div>
				<div v-if="!following.length">无数据</div>
			</el-tab-pane>
			<el-tab-pane :label="'粉丝' + following.length" name="followers">
				<div v-for="user in followers" :key="user._id">
					<UserDisplay :user="user" />
				</div>
				<div v-if="!followers.length">无数据</div>
			</el-tab-pane>
			<el-tab-pane :lable="'文章' + articles.length" name="articles">文章</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import ArticleItem from '~/components/ArticleItem.vue';
	import UserDisplay from '~/components/UserDisplay.vue';
	export default {
		components: {
			ArticleItem,
			UserDisplay
		},
		data() {
			return {
				activeName: 'following',
				followers: [],
				following: [],
				articles: []
			}
		},
		mounted() {
			let userid = this.$route.params.id;
			this.userid = userid;
			if (userid) {
				this.loadFollowing();
				this.loadFollowers();
			}
		},
		methods: {
			async loadFollowing() {
				// 粉丝
				let ret = await this.$http.get('/user/' + this.userid + '/following');
				if (ret.code === 0) {
					this.following = ret.data;
				}
			},
			async loadFollowers() {
				// 关注
				let ret = await this.$http.get('/user/' + this.userid + '/followers');
				if (ret.code === 0) {
					this.followers = ret.data;
				}
			},
			loadArticle() {

			}, 
			handleClick() {

			}
		}
	}
</script>
<style lang="scss">

</style>