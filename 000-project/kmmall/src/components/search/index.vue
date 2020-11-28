<template>
    <van-sticky>
        <van-search 
            v-model="value"
            placeholder="请输入搜索关键词" 
            @focus="toSearch"
        />
    </van-sticky>
</template>
<script>
    export default {
        name:'search',
        /*
        data(){
			return {
				value:'',
			}
        }
        */
        props:{
            value:String
        },
        methods:{
            toSearch(){
                // console.log(this.$route);//当前路由
                // console.log(this.$router);//访问路由器
                // this.$router.replace('/search');//不会留下 history 记录
                this.$router.push('/search');//会留下 history 记录
            }
        }
    }
</script>
<style scoped lang="less">
</style>