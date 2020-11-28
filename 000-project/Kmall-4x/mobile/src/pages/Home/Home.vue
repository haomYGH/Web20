<template>
    <div class="home">
        <div class="swiper-container">
			<div class="swiper-wrapper">
				<div 
                    class="swiper-slide" 
                    v-for="(data,index) in this.$store.state.home.carouselImg"
                    :key = "index"
                >
                    <img :src="data.image" alt="">
                </div>
			</div>
			<!-- 如果需要分页器 -->
			<div class="swiper-pagination"></div>
		</div>
    </div>
</template>

<script>
    import { GET_CAROUSEL_IMG } from './store/types.js'
	import Swiper from 'swiper';
	import '@node_modules/swiper/css/swiper.min.css';
    export default {
        name:'home',
        mounted(){
            //
            this.$store.dispatch(GET_CAROUSEL_IMG)
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
            
		}
    }
</script>

<style scoped lang="less">
    .home{
		.swiper-slide img{
			width: 100%;
			.rem(height,160);
		}
		.product-wrap{
			display: flex;
			flex-direction: column;
			.rem(padding,0,10);
			.product-floor{
				margin-bottom: 10px;
				.floor-title{
					text-align: center;
					margin-bottom: 5px;
					.rem(line-height,30);
					.rem(font-size,24);
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
							.rem(height,100);
							.rem(width,125);
							.product-name{
								.rem(height,40);
								.rem(line-height,20);
								.rem(font-size,12);
								overflow: hidden;
								text-align: left;
								color: #111;
							}
							.product-price{
								.rem(line-height,20);
								.rem(font-size,18);
								text-align: left;
								color: #f21;
							}
							.btn-buy{
								display: block;
								.rem(line-height,20);
								.rem(width,60);
								.rem(font-size,16);
								.rem(padding,5);
								background-color: #f21;
								color: #fff;
								border-radius: 5px;
								margin-top: 10px;
							}
						}
					}
				}
			}
		}			
	}
</style>