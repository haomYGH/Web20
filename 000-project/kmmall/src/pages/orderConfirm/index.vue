<template>
    <div class="page">
        <van-nav-bar
            title="订单确认"
            left-text="返回"
            left-arrow
            @click-left="$router.back()"
        />
        <van-contact-card
            @click="$router.push('/orderConfirm/saveAddress')"
        />
        <van-cell title="选择地址" is-link :arrow-direction="showList ? 'down' : ''" @click="showList = !showList" />
        <van-address-list
            v-if="showList"
            v-model="chosenAddressId"
            :list="shippings_List"
            @edit="onEdit"
        />
        <van-cell title="选择支付方式" is-link :arrow-direction="showPayment ? 'down' : ''" @click="showPayment = !showPayment" />
        <van-cell title="单元格" icon="alipay" v-if="showPayment">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
                <van-icon name="checked" />
            </template>
        </van-cell>
        <van-cell title="查看所选商品" is-link :arrow-direction="showProducts ? 'down' : ''" @click="showProducts = !showProducts" />
        <div
            v-if="showProducts"
        >
            <van-card
                v-for="(item,index) in products_Data.cartList"
                :key="index"
                :num="item.count"
                :price="item.product.price"
                :desc="item.attr"
                :title="item.product.name"
                :thumb="item.product.mainImage"
            />
        </div>
        <van-submit-bar :price="products_Data.totalCartPrice * 100" button-text="提交订单" @submit="onSubmit" />
        <router-view></router-view>
    </div>
</template>

<script>
    import * as types from './store/types';
    import { mapGetters } from 'vuex';
    export default {
        name:'orderConfirm',
        data() {
            return {
                showList:false,
                showPayment:false,
                showProducts:false,

                chosenAddressId: '1',
                /*
                list: [
                    {
                    id: '1',
                    name: '张三',
                    tel: '13000000000',
                    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                    isDefault: true,
                    },
                    {
                    id: '2',
                    name: '李四',
                    tel: '1310000000',
                    address: '浙江省杭州市拱墅区莫干山路 50 号',
                    },
                ],
                */
            };
        },
        computed:{
			...mapGetters([
                'shippings_List',
                'products_Data',
			])
        },
        methods: {
            onEdit(item,index) {
                console.log('编辑地址',item,index)
            },
            onSubmit(v){
                console.log('提交',v)
            }
        },
        mounted(){
            //加载已填写地址
            this.$store.dispatch(types.GET_SHIPPINGS_LIST)
            //加载已选商品
            this.$store.dispatch(types.GET_PRODUCTS_DATA)
        }
    }
</script>

<style scoped lang="less">
    .page{
        .rem(padding-bottom,20);
        .van-nav-bar{
            .rem(margin-bottom,10);
        }
        .van-address-list{
            .rem(padding,10);
            .van-address-list__bottom{
                display: none;
            }
        }
    }
</style>