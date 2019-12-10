<template>
	<div class="user">
		<nuxt-link :to="url">
			<img :src="user.avatar" alt="" class="user-avatar">
			<span class="user-nickname">{{ user.nickname }}</span>
		</nuxt-link>
		<slot>
		</slot>
	</div>
</template>
<script>
export default {
	props: ['user'],
	computed: {
		url() {
			return '/user/' + ( this.user._id || this.user.id);
		}
	}
}
</script>
<style lang="scss" scoped>
	.user {
		display: inline-block;
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
</style>