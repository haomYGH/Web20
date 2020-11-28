<template>
        <van-tabbar v-model="active" route>
            <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item replace to="/category" icon="notes-o">分类</van-tabbar-item>
            <van-tabbar-item replace to="/cart" icon="cart-o">购物车</van-tabbar-item>
            <van-tabbar-item replace to="/me" icon="user-o">个人中心</van-tabbar-item>
        </van-tabbar>
</template>

<script>
export default {
    name:'tab-bar',
    data(){
        return {
            active:0,
        }
    }
}
</script>

<style scoped lang="less">
    
</style>