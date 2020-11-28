<template>
    <!-- 有数据就显示数据，没数据就显示SVG -->
    <div class="cart">
        <div v-if="cartListLength > 0">
            <van-nav-bar
                title="购物车"
                left-text="返回"
                right-text="删除选中"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
            />
            <div>
                <van-checkbox 
                    v-for="(item,index) in cartsDatas.cartList"
                    :key="index"
                    v-model="item.checked"
                    @click='handleChecked(item.checked,item.product._id)'
                >
                    <van-card
                        :num="item.count"
                        :price="item.product.price"
                        :desc="item.attr"
                        :title="item.product.name"
                        :thumb="item.product.mainImage"
                    >
                        <template #footer>
                            <div @click.stop="">
                                <van-stepper 
                                    v-model="item.count" 
                                    integer 
                                    min="1" :max="item.product.stock"
                                    @change="handleCounts(item.count,item.product._id)"
                                />
                            </div>
                        </template>
                    </van-card>
                </van-checkbox>
                <van-submit-bar 
                    :price="cartsDatas.totalCartPrice * 100" 
                    button-text="提交订单" 
                    @submit="onSubmit"
                    :disabled="cartsDatas.totalCartPrice==0"
                >
                    <van-checkbox v-model="cartsDatas.allChecked" @click="handleChoices(cartsDatas.allChecked)">全选</van-checkbox>
                </van-submit-bar>
            </div>
            
        </div>
        <div v-else>
            <van-empty
                class="custom-image"
                image="https://img.yzcdn.cn/vant/custom-empty-image.png"
                description="购物车空空如也"
            />
        </div>
    </div>
</template>

<script>
    import * as types from './store/types';
    import { getUsername } from '@util';
    import { mapGetters } from 'vuex';
    export default {
        name:'cart',
        data(){
            return {
                value:'',//步进器
            }
        },
        computed:{
			...mapGetters([
                'cartsDatas',
                'cartListLength',
			])
        },
        mounted(){
            //1.如果未登录则跳转到登录页
            if(!getUsername()){
                this.$router.push('/login')
            }
            //2.有用户状态则与后台用户状态同步(移除前台用户状态见axios)
            // api.getUserName()//发送请求时即可进行验证//状态信息验证通过，获取me页面数据
            this.$store.dispatch(types.GET_CARTS_DATA)
        },
        methods: {
            onClickLeft(){
                this.$router.back()
            },
            onClickRight(){
                console.log('onClickRight');
                this.$store.dispatch(types.DELETE_CHOICES)
            },
            onSubmit(){
                this.$router.push('/orderConfirm')
            },
            handleChecked(checked,productId){//发送请求，改变后台选中状态
                let payload = {
                    checked,
                    productId
                }
                this.$store.dispatch(types.SET_ITEM_CHECKED,payload)
            },
            handleCounts(count,productId){
                let payload = {
                    count,
                    productId
                }
                this.$store.dispatch(types.SET_ITEM_COUNT,payload)
            },
            handleChoices(choices){
                this.$store.dispatch(types.SET_CHOICES,choices)
            }
        },
    }
</script>
<style lang="less">
    .cart{
        .rem(font-size,12);
        .rem(padding,0,14,90,14);
        .van-nav-bar{
            .rem(margin-bottom,20);
        }
        .van-checkbox{
            .van-checkbox__label{
                width: 100%;
            }
        }
        .custom-image .van-empty__image {
            width: 90px;
            height: 90px;
        }
        .van-submit-bar{
            .rem(margin-bottom,40)
        }
    }
</style>