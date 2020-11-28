<template>
    <div class="Category">
        <Search />
        <div class="wrap">
            <div class="category-list">
                <van-sidebar class="content" v-model="activeKey">
                    <van-sidebar-item
                        v-for="(category,index) in categoryCategories" 
                        :title="category.mobileName"
                        :key="index"
                        @click="handleSidebar(index,category._id)"
                    />
                </van-sidebar>
            </div>
            <div class="child-list">
                <div class="content">
                    <div v-if="categoryChildCategories.length > 0" class="child-wrap">
                           <div 
                            class="child-item"  
                            v-for="(category,index) in categoryChildCategories" 
                            :key="index"
                            @click="handleCategory(category._id)"
                            >
                               <img :src="category.icon" alt="">
                               <p>{{category.mobileName}}</p>
                           </div>                     
                    </div>
                    <div>
                        <van-loading 
                            type="spinner"
                            color="#52c41a"
                            :vertical="true" 
                            size="24px" 
                            v-if="isLoading"
                        >
                            商品拼命加载中...
                        </van-loading>
                        <Empty v-if="categoryChildCategories.length == 0" />
                        <!-- <Empty /> -->
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import Search from 'components/search'
import Empty from 'components/empty'
import Login from 'pages/login'
import {GET_CHILD_CATEGORIES,GET_CATEGORIES} from './store/types.js'  
import { mapGetters } from 'vuex'
export default {
    name: 'Category',
    components: {
        Search,
        Login,
        Empty,
    },
    mounted(){
        //获取分类
        this.$store.dispatch(GET_CATEGORIES)
        .then(()=>{
            const initCategory = this.categoryCategories[0]._id
            //获取第一个分类的子分类
            this.$store.dispatch({
                type:GET_CHILD_CATEGORIES,
                payload:{
                    limit:20,
                    pid:initCategory,
                }
            })
            .then(()=>{
                this.$nextTick(()=>{
                    //设置better scroll
                    //父容器的第一个子元素，它的高度会随着内容的大小而撑高。那么，当 子元素的高度不超过父容器的高度，是不能滚动的，而它一旦超过了父容器的高度，我们就可以滚动内容区了，这就是 better-scroll 的滚动原理
                    new BScroll('.category-list',{probeType:3,click:true})
                    //保存对象内容更新时需要刷新
                    this.childListScroll = new BScroll('.child-list',{probeType:3,click:true})
                })
            })               
        })            
    },
    data() {
        return {
          activeKey: 0,
          isLoading:false
        };
    },        
    computed:{
        ...mapGetters([
            'categoryChildCategories',
            'categoryCategories',
        ])
    },
    methods:{
        handleSidebar(index,category){
            this.isLoading = true
            this.activeKey = index
            this.$store.dispatch({
                type:GET_CHILD_CATEGORIES,
                payload:{
                    limit:20,
                    pid:category,
                }
            })
            .then(()=>{                    
                this.isLoading = false
                //vm.$nextTick(callBack)方法:将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
                this.$nextTick(()=>{
                    //获取最新分类数据则页面DOM会重新渲染
                    //如果子元素或者父元素 DOM 结构发生改变的时候，必须重新调用 scroll.refresh() 方法重新计算来确保滚动效果的正常。
                    this.childListScroll.refresh()                        
                })
            })
        },
        handleCategory(categoryId){
            this.$router.push('/list?categoryId='+categoryId)
        }        
    }        
}
</script>
<style lang="less" scoped>
    .wrap{
        display: flex;
    }
    .category-list{
        flex: 2;
        height: 465px;
        overflow: hidden;
    }
    .child-list{
        flex: 5;
        height: 465px;
        overflow: hidden;
        background-color: #fff;
        padding: 10px;
        .content{
            padding-bottom: 40px;
        }
        .child-wrap{
            display: flex;
            flex-wrap: wrap;
            .child-item{
                width: 33.3%;
                text-align: center;
                /*
                border: 1px solid #ccc;
                box-sizing: border-box;
                padding: 8px;
                */
                img{
                    width: 80px;
                    height: 80px;
                    /*
                    width: 80%;
                    height: 80%;
                    */
                }
                p{
                    font-size: 12px;
                    font-weight: 400;
                }
            }
        }
        

    }
    .van-loading{
        text-align: center;
        padding: 100px 0;
    }
</style>