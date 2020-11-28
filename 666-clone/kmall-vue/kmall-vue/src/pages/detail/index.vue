<template>
    <div class="Detail">
        <van-nav-bar
          title="商品详情"
          left-text="返回"
          left-arrow
          :fixed="true"
          :z-index="99"          
          @click-left="$router.back()"
        />
        <div class="wrap product">
            <div class="swiper-container"> 
                <div class="swiper-wrapper">
                    <div 
                        class="swiper-slide"
                        v-for="(image,index) in productImags"
                        :key="index"
                    >
                        <img :src="image" alt="">
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
            </div>
            <van-cell-group>
              <van-cell>
                <div class="product-title">{{ product.name }}</div>
                <div class="product-desc">{{ product.description }}</div>
                <div class="product-price">￥{{ product.price | formatPrice }}</div>
              </van-cell>
            </van-cell-group>
            <van-cell-group class="product-cell-group">
              <!-- <van-cell title="查看商品详情" is-link @click="isShowProductDetail = !isShowProductDetail;arrowDirection=isShowProductDetail ? 'down' : '' " :arrow-direction="arrowDirection" /> -->
              <van-cell title="查看商品详情" is-link @click="handleShowProductDetail" :arrow-direction="arrowDirection" />
              
              <div class="product-detail" v-if="isShowProductDetail" v-html="product.detail">
                  
              </div>
            </van-cell-group>            
            <van-goods-action v-if="isShowAction">
              <van-goods-action-icon icon="cart-o" :info="cartCount" @click="goCart">
                购物车
              </van-goods-action-icon>
                <AddCart :product="product" :isActionButton=true /> 
            </van-goods-action> 

        </div>          
    </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import { mapGetters,mapMutations } from 'vuex'
import { GET_PRODUCTS } from './store/types.js'
import AddCart from 'components/add-cart'
import {SET_ACTIVE_INDEX} from 'components/tab-bar/store/types.js'
export default {
    name: 'Detail',
    props:{
        id:{
            type:String
        }
    },
    components:{
        AddCart
    },
    data(){
        return{
            isShowProductDetail:false,
            isShowAction:false,
            arrowDirection:''
        }
    },          
    mounted(){       
        //获取初始化购物车数据和商品详情数据
        this.$store.dispatch({
            type:GET_PRODUCTS,
            payload:{
                id:this.id
            }
        })
        .then(()=>{
            new Swiper ('.swiper-container', {
                // 循环模式选项
                loop: true,
                autoplay:true,
                //分页器
                pagination: {
                  el: '.swiper-pagination',
                  clickable:true
                },
            })
            this.$nextTick(()=>{
                this.isShowAction = true
            })
        })
    },    
    computed: {
        ...mapGetters([
            'product',
            'cartCount',
        ]),
        productImags(){
            if(this.product.images){
                return this.product.images.split(',')
            }else{
                return []
            }
        }
    },

    methods: {
        ...mapMutations([SET_ACTIVE_INDEX]),
        goCart(){
            this[SET_ACTIVE_INDEX](2)
            this.$router.push('/cart')
        },
        //处理点击查看商品详情
        handleShowProductDetail(){
            this.isShowProductDetail = !this.isShowProductDetail;
            //改变箭头指向
            this.arrowDirection = this.isShowProductDetail ? 'down' : ''
        }
     
    }
}
</script>
<style scoped lang="less" scoped>
    .Detail{
        .overlay-page;
        .wrap{
            margin-top: 50px;
            .swiper-slide{
                text-align: center;
            } 
            .swiper-slide img{
                width: 160px;
                height:160px;
            }
            .swiper-container{
                z-index: 0;
            }            
        }
        .product{
            &-title {
                font-size: 16px;
                display: -webkit-box;
                overflow: hidden;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            &-price {
                margin-top: 10px;
                color: #f44;
            }
            &-desc {
                margin-top: 10px;
                color: #ccc;
                display: -webkit-box;
                overflow: hidden;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;                
            }
            &-cell-group {
                margin: 15px 0;
                .van-cell__value {
                  color: #999;
                }
            }
        }
        .van-goods-action{
            .AddCart{
                    color: red;
                    width: 100%;
            }
        }
    }
</style>