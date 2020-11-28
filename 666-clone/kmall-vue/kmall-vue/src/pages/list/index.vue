<template>
        <div class="List" >
            <van-sticky>
                <van-icon class="back-icon" name="arrow-left" @click="$router.back()"  />
                <Search :value="keyword" />
            </van-sticky>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :offset=50
            >
                <van-card
                    v-for="(product,index) in products" 
                    :key="index"
                    icon="photo-o"
                    :price="product.price | formatPrice"
                    :desc="product.description"  
                    :title="product.name"
                    :thumb="product.mainImage"
                    :centered="true"
                    :lazy-load="true"
                    @click="$router.push('/detail/'+product._id)"
                >
                <div slot="footer">
                    <AddCart :product="product" />
                </div>
                </van-card>
            </van-list>            
        </div>
</template> 

<script>
    import {saveHistroy} from 'util'
    import AddCart from 'components/add-cart'
    import Search from 'components/search'
    import {GET_PRODUCTS} from './store/types.js'  
    import { mapGetters } from 'vuex'    
    export default {
        name:'List',
        components: {
            AddCart,
            Search
        },         
        props:{
            keyword:{
                type:String
            },
            categoryId:{
                type:String
            }
        },       
        data() {
            return {
                loading: false,
                finished: false,
                limit:4,//每次请求订单数据数量
                start:0,//请求的开始值
                products:[]//所有订单                
            }
        },
        computed:{
            ...mapGetters([
                'listProducts',
            ])
        },                
        methods:{
            onLoad(){
                this.loading = true
                this.$store.dispatch({
                    type:GET_PRODUCTS,
                    payload:{
                        limit:this.limit,
                        start:this.start,
                        category:this.categoryId,
                        keyword:this.keyword,
                        channel:'wap'
                    }
                })
                .then(()=>{
                    this.start = this.start + this.listProducts.length
                    this.products = this.products.concat(this.listProducts)
                    this.loading = false                    
                    if(this.listProducts.length < this.limit){//当请求的长度不足limit时，没有更多了
                        this.finished = true
                    }              
                })
            }
        }                                 
    }
</script>

<style scoped lang="less" scoped>
    .List{
        .overlay-page;
        background-color: #fff;
        .back-icon{
            position: absolute;
            top:17px;
            font-size: 18px;
            color: @link-color;
        }    
    }
</style>