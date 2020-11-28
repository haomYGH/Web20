<!-- 结构 -->
<template>
    <div id="Tabbar">
        <van-tabbar 
            v-model="active"
            active-color="#07c160" 
            inactive-color="#000"
        >
            <van-tabbar-item 
                icon="home-o"
                replace 
                to="/home"
            >
                首页
            </van-tabbar-item>
            <van-tabbar-item 
                icon="cart-o"
                replace 
                to="/cart"
            >
                购物车
            </van-tabbar-item>
            <van-tabbar-item 
                icon="user-o"
                replace 
                to="/me"
            >
                个人中心
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<!-- 逻辑 -->
<script>
    export default {
        name:'Tabbar',
        data(){
            return {
                active: 0,
            }
        },
    }
</script>
<!-- 样式 -->
<style>
    
</style>