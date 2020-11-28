<template>
    <div class="page">
		<van-nav-bar
			title="商品详情"
			left-text="返回"
			left-arrow
			@click-left="onClickLeft"
		/>
		<van-swipe :autoplay="3000">
			<van-swipe-item v-for="(img, index) in productImages" :key="index">
				<img :src="img" v-lazy="img" />
			</van-swipe-item>
		</van-swipe>
		<van-cell-group>
			<van-cell :title="detailData.name" :label="detailData.description" />
			<van-cell :title="detailData.price | formatPrice" />
		</van-cell-group>
		<van-cell-group>
			<van-cell title="查看商品详情" is-link />
		</van-cell-group>
    </div>
</template>
<script>
	import { mapGetters } from 'vuex';
	import * as types from './store/types';
    export default {
		name:'detail',
		computed:{
			...mapGetters([
				'detailData',
				'productImages',
			])
        },
		methods: {
			onClickLeft() {
				this.$router.back()
			},
		},
		mounted(){
			//获取参数
			const id = this.$route.params.id;
			//加载详情页数据数据
			this.$store.dispatch(types.GET_DETAIL,id)
		}
    }
</script>
<style scoped lang="less">
    .page{
		.van-swipe{
			justify-items: center;
			.van-swipe-item{
				display: flex;
				justify-content: center;
				img{
					.rem(width,200)
				}
			}
		}
    }
</style>