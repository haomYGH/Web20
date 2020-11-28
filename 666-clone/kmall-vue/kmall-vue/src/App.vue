<!--模版-->
<template>
    <div id="app">
        <div class="page">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
        <TabBar />
    </div>
</template>

<!--逻辑-->
<script>
    import api from 'api'
    import { saveUsername } from 'util'
    import { GET_CARTS} from 'pages/cart/store/types.js'
    //1.引入组件
    import TabBar from './components/tab-bar'
    export default {
        name:'App',
        //2.注册组件
        components:{
            TabBar
        },
        created(){
            api.getUsername()
            .then(result=>{
                if(result.code == 0){//用户已经登陆
                    //设置用户名
                    saveUsername(result.data.username)
                    //加载初始化购物车数据
                    this.$store.dispatch(GET_CARTS)
                }
            })
        }
    }
</script>

<!--样式-->
<style lang="less">

</style>