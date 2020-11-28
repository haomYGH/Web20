<template>
        <div class="Search" >
            <van-icon class="back-icon" name="arrow-left" @click="$router.back()"  />
            <van-search 
                placeholder="请输入搜索关键词" 
                v-model="searchValue"
                @search="onSearch" 
            >
            </van-search>

            <div class="search-histroy-header">
                <span class="title">最近搜索</span>
                <span class="link" @click="cleanHistroy">清除</span>
            </div>
            <div class="search-histroy-body">
                <span 
                    v-for="(item,index) in histroy"
                    :key="index"
                    @click="handleHistoryItem(item)"
                >
                    {{item}}
                </span>
            </div>

        </div>
</template>

<script>
    import {saveHistroy,getHistroy,removeHistroy} from 'util'
    export default {
        name:'Search', 
        data() {
            return { 
                searchValue:'',
                histroy:getHistroy()
            }
        },
        methods:{
            onSearch(){
                saveHistroy(this.searchValue)
                this.histroy = getHistroy()
                this.$router.replace('/list?keyword='+this.searchValue)
            },
            cleanHistroy(){
                removeHistroy()
                this.histroy = []
            },
            handleHistoryItem(item){
                this.$router.replace('/list?keyword='+item)
            }
        }                                 
    }
</script>

<style scoped lang="less" scoped>
    .Search{
        .overlay-page;
        background-color: #fff;
        .back-icon{
            position: absolute;
            top:17px;
            font-size: 18px;
            color: @link-color;
        }
        .van-search{
            margin-left: 15px;
        }
        .search-histroy-header{
            display: flex;
            padding: 10px 10px 0;
            justify-content: space-between;
            .title{
                font-size: 12px;
            }
        }
        .search-histroy-body{
            padding: 5px 10px;
            display: flex;
            flex-wrap: wrap;
            span{
                display: inline-block;
                margin-right: 10px;
                margin-top: 10px;
                padding: 2px 5px;
                background-color: #f2f2f2;
                font-size: 14px;
                color:@text-color-secondary;
            }
        }
    }
</style>