<template>
    <div class="home">
		<Search />
        <van-swipe class="swipe-wrapper" :autoplay="3000">
			<van-swipe-item v-for="(data, index) in homeAds" :key="index">
				<img :src="data.image" v-lazy="data.image" />
			</van-swipe-item>
		</van-swipe>
		<van-grid class="home-categories-wrap" column-num="5" icon-size="55" :border="false">
			<van-grid-item v-for="(data,index) in homeHotCategories" :key="index" :icon="data.icon" :text="data.mobileName" />
		</van-grid>
		<ul class="product-wrap">
            <li class="product-floor" v-for="(item,index) in homeFloors" :key="index">
                <h3 class="floor-title">{{item.title}}</h3>
                <ul class="product-list" >
                    <li class="product-item" v-for="(item,index) in item.products" :key="index">
                        <img class="product-image" :src="item.mainImage" @click="toDetail(item._id)" alt="">
                        <div class="product-content">
                            <h4 class="product-name">{{item.name}}</h4>
                            <p class="product-price">
                                {{item.price | formatPrice}}
                                <addCart 
                                    class="homeAddCart" 
                                    :goodsId="item._id"
                                    :itemData="item" 
                                />
                            </p>
                        </div>
                    </li>           
                </ul>
            </li>       
        </ul>
    </div>
</template>

<script>
    import Search from '@components/search';
    import addCart from '@components/addCart';
	import { mapGetters } from 'vuex';
	import * as types from './store/types';
    export default {
		name:'home',
		computed:{
			...mapGetters([
				'homeAds',
				'homeHotCategories',
				'homeFloors'
			])
        },
        components:{
            Search,
            addCart,
        },
        methods:{
            toDetail(id){
                const url = '/detail/'+id;
                this.$router.push(url);
                
            }
        },
        mounted(){//当组件挂载完毕
			//加载首页广告
            this.$store.dispatch(types.GET_ADS)
			//加载首页热门分类
			this.$store.dispatch(types.GET_HOT_CATEGORIES)
			//加载首页楼层数据
			this.$store.dispatch(types.GET_HOME_FLOORS)
		}
    }
</script>

<style scoped lang="less">
    .home{
        background-color: #eee;
		.rem(margin-bottom,20);
		.swipe-wrapper img{
			width: 100%;
			.rem(height,160px);
		}
		.home-categories-wrap{
			width: 100%;
		}
		.product-wrap{
            display: flex;
            flex-direction: column;
            .rem(padding,0,10,30,10);
            .product-floor{
                margin-bottom: 10px;
                .floor-title{
                    text-align: center;
                    margin-bottom: 5px;
                    .rem(line-height,30);
                    .rem(font-size,18);
                }
                .product-list{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    .product-item{
                        box-sizing: border-box;
                        text-align: center;
                        background-color: #fff;
                        margin-top: 10px;
                        .rem(padding,10);
                        .product-image{
                            .rem(width,100);
                            .rem(height,100);
                        }
                        .product-content{
                            .rem(height,60);
                            .rem(width,125);
                            .product-name{
                                .rem(height,40);
                                .rem(line-height,20);
                                .rem(font-size,12);
								overflow: hidden;
								text-overflow: ellipsis;
                                text-align: left;
								color: #111;
								font-weight: 400;
                            }
                            .product-price{
                                .rem(line-height,20);
                                .rem(font-size,12);
                                text-align: left;
                                color: #f21;
								.homeAddCart{
                                    .rem(margin-top,-20)
                                }
							}
                        }
                    }
                }
            }
        }           
		
	}
</style>