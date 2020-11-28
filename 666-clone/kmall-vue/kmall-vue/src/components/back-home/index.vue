<template>
    <div class="BackHome">
        <span @click="handleBackHome">返回首页</span>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import {SET_ACTIVE_INDEX} from '../tab-bar/store/types.js'
    export default {
        name:'BackHome', 
        methods:{
            ...mapMutations([SET_ACTIVE_INDEX]),
            handleBackHome(){
                this[SET_ACTIVE_INDEX](0)
                this.$router.push('/')
            }
        }                         
    }
</script>

<style scoped lang="less" scoped>
    .BackHome{
        margin-left: 10px;
        margin-top: 10px;
        .link
    }
</style>