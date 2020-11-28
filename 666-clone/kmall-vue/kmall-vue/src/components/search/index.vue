<template>
    <van-sticky>
        <div class="Search" >
            <van-search 
                placeholder="请输入搜索关键词" 
                v-model="searchValue" 
                @focus="$router.push('/search')"
            />
        </div>
    </van-sticky>
</template>
 
<script>
    export default {
        name:'Search',
        props:{
            value:{
                type:String
            }
        }, 
        data() {
            return {
                searchValue:this.value,
            }
        },                                 
    }
</script>

<style scoped lang="less" scoped>
    .Search{
        background-color: #fff;
    }
    .van-search{
        margin-left: 15px;
    }
</style>