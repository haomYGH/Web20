<template>
    <div class="page">
        <div class="search">
            <van-icon 
                name="arrow-left" 
                @click="$router.back()"
            />
            <van-sticky>
                <van-search 
                    v-model="value"
                    placeholder="请输入搜索关键词" 
                    @search="onSearch"
                />
            </van-sticky>
        </div>
        <div class="search-histroy-header">
            <div class="title">最近搜索</div>
            <div class="link">清除</div>
        </div>
        <div class="search-histroy-body"></div>
    </div>
</template>

<script>
    // import { mapGetters } from 'vuex'
    // import * as types from './store/types'
    export default {
        name:'search',
        data(){
            return {
                value:''
            }
        },
        methods:{
            onSearch(val){
                // console.log(val)
                //跳转到list
                //路由/list?keyword=
                const path = '/list?keyword='+val
                this.$router.push(path);
            }
        }
    }
</script>

<style scoped lang="less">
    .page{
        .search{
            display: flex;
            .van-icon{
                .rem(margin-top,8)
            }
            .van-search{
                .rem(width,290)
            }
        }
        .search-histroy-header{
            display: flex;
            justify-content: space-between;
            .rem(padding,10);
            .rem(font-size,12);
            .link{
                color: #1890ff;
            }
        }
        
    }
</style>