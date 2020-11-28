<template>
    <div class="page">
		<van-tabs v-model="active">
			<van-tab title="密码登录"><AccountLogin /></van-tab>
			<van-tab title="验证码登录">内容 2</van-tab>
			<van-tab title="免费注册">内容 3</van-tab>
		</van-tabs>
    </div>
</template>
<script>
	import AccountLogin from './account.vue'
    export default {
		name:'login',
		data(){
			return {
				active:0
			}
		},
		components:{
			AccountLogin
		},
    }
</script>
<style scoped lang="less">
    .page{
		color: red;
    }
</style>