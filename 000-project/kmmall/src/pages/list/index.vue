<template>
    <div class="page">
        <van-sticky>
            <div class="search">
            <van-icon 
                name="arrow-left" 
                @click="$router.back()"
            />
            <van-search 
                v-model="value"
                placeholder="请输入搜索关键词" 
            />
            </div>
        </van-sticky>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-card
                v-for="(item,index) in listContent"
                :key="index"
                :price="item.price | formatPrice"
                :title="item.name"
                :thumb="item.mainImage"
            >
                <template #footer>
                    <addCart 
                        :goodsId="item._id"
                        :itemData="item"
                    />
                </template>
            </van-card>
        </van-list>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import addCart from '@components/addCart';
    import * as types from './store/types'
    export default {
        name:'list',
        data(){
            return {
                //搜索框
                value:'',
                //list列表
                list: [],
                loading: false,
                finished: false,
            }
        },
        computed:{
			...mapGetters([
				'listContent',
			])
        },
        components:{
            addCart,
        },
        mounted(){
            // console.log(this.$route.query)
            const keyword = this.$route.query.keyword;
            //根据keyword请求搜索内容
            this.$store.dispatch(types.GET_LIST,keyword);
        },
         methods: {
           onLoad(){
               console.log('加载中...')
           }
        },
    }
</script>

<style scoped lang="less">
    .page{
        .rem(padding-bottom,40);
        .search{
            display: flex;
            .van-icon{
                .rem(margin-top,8)
            }
            .van-search{
                .rem(width,290)
            }
        }
    }
</style>