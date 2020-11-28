<template>
    <div class="Home"> 
        <Search />
        <!--首页轮播图-->
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div 
                    class="swiper-slide"
                    v-for="(ad,index) in homeAds"
                    :key="index"
                >
                <router-link :to="perfix+ad.link">
                    <img :src="ad.image" alt="">
                </router-link>
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>  
        <!--分类导航-->
        <van-grid :column-num="5" class="home-categories-wrap">
          <van-grid-item
            v-for="(category,index) in homeCategories"
            :key="index"
          >
                <van-image
                  round
                  width="1.5rem"
                  height="1.5rem"
                  :src="category.icon"
                  @click="handleCategory(category._id)"
                />
                <div class="text">{{category.mobileName}}</div>
            </van-grid-item>
        </van-grid>       
        <!--商品楼层-->
        <ul class="product-wrap" v-if="homeFloors.length > 0">
            <li class="product-floor" v-for="(floor,floorIndex) in homeFloors" :key="floorIndex">
                <h3 class="floor-title">{{floor.title}}</h3>
                <ul class="product-list">
                    <li class="product-item" v-for="(product,productIndex) in floor.products" :key="productIndex" >
                        <van-card
                            icon="photo-o"
                            :price="product.price | formatPrice"
                            :desc="product.description"  
                            :title="product.name"
                            :thumb="product.mainImage"
                            :centered="true"
                            :lazy-load="true"
                            @click="$router.push('/detail/'+product._id)"
                        >
                            <!-- <teplmate #footer></template> 利用template标签实现插槽也可以 -->
                          <div slot="footer">
                            <AddCart :product="product" />
                          </div>
                        </van-card>     
                    </li>
                </ul>
            </li>       
        </ul>
        <van-loading class="floor-loading" :vertical="true" size="24px" v-else>商品楼层拼命加载中...</van-loading>           
        <BackTop />       
    </div>
</template>

<script>
    import BackTop from 'components/back-top'
    import Search from 'components/search'
    import AddCart from 'components/add-cart'
    import { mapGetters } from 'vuex'
    //集成swiper时安装5x版本,最新版本有问题
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'
    import { GET_ADS,GET_FLOORS,GET_CATEGORIES } from './store/types.js'  
    export default {
        name:'Home',
        components:{
            BackTop,
            Search,
            AddCart
        },         
        mounted(){
            //获取首页广告
            this.$store.dispatch(GET_ADS)
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
            })
            //获取分类数据
            this.$store.dispatch(GET_CATEGORIES)            
            //获取楼层数据
            this.$store.dispatch(GET_FLOORS)      
        },
        data(){
            return {
                perfix:'detail/'
            }
        },
        computed:{
            //利用计算属性将state数据映射到组件中,代替(this.$store.state.home)
            ...mapGetters([
                'homeAds',
                'homeFloors',
                'homeCategories'
            ])
        },
        methods:{
            handleCategory(categoryId){
                this.$router.push('/list?categoryId='+categoryId)
            }
        }              
    }
</script>

<style scoped lang="less">
    .Home{
        .swiper-slide img{
            width: 100%;
            height:160px;
        }
        .product-wrap{
            display: flex;
            flex-direction: column;
            padding:0 10px;
            .product-floor{
                margin-bottom: 10px;
                border-radius: 1px;
                .floor-title{
                    text-align: center;
                    margin-bottom: 5px;
                    line-height:30px;
                    font-size:18px;
                }
            }
        }           
    }
    .home-categories-wrap{
        margin-bottom: 10px;
        .text{
            margin-top: 5px;
            color: @grid-item-text-color;
            font-size: 12px;
            text-align: center;
        }
        .van-grid-item__content{
            padding: 5px;
            background-color: transparent;
        }
    }
    .product-list{
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        .product-item{
            box-sizing: border-box;
            width:145px;
            height: 220px;
            background-color: #fff;
            margin-bottom: 10px;
            padding: 5px;
        }
        .van-card{
            width: 100%;
            height: 100%;
            padding: 0;
            &__header{
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            &__thumb{
                width: 100%;
                height: 135px;
            }
            &__content{
                display: block;
                // height: 70px;
                min-height: 70px;
                box-sizing: border-box;
                margin-top: 10px;
            }
            &__title{
                height: 40px;
                max-height: 40px;
                line-height: 20px;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
                -webkit-line-clamp: 2;
                vertical-align: baseline;
                font-weight: normal;
            }
            &__footer{
                position: relative;
                bottom: 32px;
                right: 5px;
            }
        }
    }
    .floor-loading{
        padding: 10px 0;
    }
    
</style>