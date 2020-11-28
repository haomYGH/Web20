<!-- 结构 -->
<template>
    <div id="App">
        <!-- 路由出口 -->
        <router-view></router-view>
        <Tabbar />
    </div>
</template>
<!-- 逻辑 -->
<script>
    //1.引入组件
    import Tabbar from './components/tab-bar/index.vue'

    export default {
        name:'App',
        data(){
            return {
                
            }
        },
        //2.注册组件
        components: {
            Tabbar
        },
        methods:{
        }
    }
</script>
<!-- 样式 -->
<style>
    #App{
      
    }
</style>
