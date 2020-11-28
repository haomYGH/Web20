<template>
    <div class="userCenter">
        <van-nav-bar
			title="用户中心"
			left-text="返回"
			left-arrow
			@click-left="onClickLeft"
		/>
        <van-button type="default" @click="handleLogout">退出登录</van-button>
    </div>
</template>

<script>
    import {removeUsername} from '@util'
    export default {
        name:'userCenter',

        methods: {
            onClickLeft() {
                this.$router.back()
            },
            handleLogout(){
                removeUsername()
                this.$router.push('/')
            }
        },
    }
</script>
<style scoped lang="less">
    .userCenter{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1000;
        background-color: #f5f5f5;
        .van-button{
            width: 100%;
        }
    }
</style>