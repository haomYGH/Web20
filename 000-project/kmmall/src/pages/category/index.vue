<template>
    <div class="category">
        <Search />
        <div class="wrap">
            <van-sidebar v-model="activeKey">
                <van-sidebar-item 
                    v-for="(category,index) in categorySide" 
                    :title="category.mobileName"
                    :key="index"
                    @click="handleTabSide(category._id)"
                />
            </van-sidebar>
            <div class="product-list">
                <lazy-component>
                    <div v-if="categoryContent.length > 0" class="product-wrap">
                        <div 
                            class="product-item"
                            v-for="(item,index) in categoryContent" 
                            :key="index"
                        >
                            <img :src="item.icon" alt="">
                            <p>{{item.mobileName}}</p>
                        </div>  
                    </div>
                </lazy-component>
            </div>
        </div>
    </div>
</template>

<script>
    import Search from '@components/search';
    import { mapGetters } from 'vuex'
    import * as types from './store/types'
    export default {
        name:'category',
        data(){
            return {
                value:'',
                activeKey:0
            }
        },
        computed:{
			...mapGetters([
                'categorySide',
                'categoryContent'
			])
        },
        components:{
            Search
        },
        methods:{
            handleTabSide(pid){
                //加载分类对应内容
                this.$store.dispatch(types.GET_CATEGORY_CONTENT,pid)
            }
        },
        mounted(){
            //加载分类导航数据
            this.$store.dispatch(types.GET_CATEGORY_SIDE)
            .then(()=>{
                //加载第一次进入页面的对应分类内容(需要先拿到分类id)
                const pid = this.categorySide[0]._id;
                this.$store.dispatch(types.GET_CATEGORY_CONTENT,pid)
            })
            

        }
    }
</script>

<style scoped lang="less">
    .category{
        .wrap{
            display: flex;
            .van-sidebar{
                width: 30%;
                margin-bottom: 50px;
                font-weight: 800;
            }
            .product-list{
                flex: 5;
                .product-wrap{
                    display: flex;
                    width: 100%;
                    .product-item{
                        width: 30%;
                        overflow: hidden;
                        img{
                            width: 100%;
                        }
                        p{
                            text-align: center;
                            .rem(font-size,12px);
                        }
                    }
                }
            }
        }
    }
</style>