<template>
    <div class="UserCenter">
        <van-nav-bar
          title="用户中心"
          left-text="返回"
          left-arrow
          @click-left="$router.back()"
        />
        <van-button type="default" size="large" @click="hanleLogout">退出登录</van-button>
    </div>
</template>
<script>
    import api from 'api'
    import { removeUsername } from 'util'
    import { mapMutations } from 'vuex'
    import {SET_ACTIVE_INDEX} from 'components/tab-bar/store/types.js'
    import { CLEAN_CARTS} from 'pages/cart/store/types.js'    
    export default {
        name: 'UserCenter',
        methods:{
            ...mapMutations([SET_ACTIVE_INDEX,CLEAN_CARTS]),
            hanleLogout(){
                api.logout()
                .then(()=>{
                    removeUsername()
                    this[CLEAN_CARTS]()
                    this[SET_ACTIVE_INDEX](0)
                    this.$router.push('/')
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .UserCenter {
        .overlay-page
    }
</style>