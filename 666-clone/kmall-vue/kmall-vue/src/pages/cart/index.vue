<template>
    <div class="Cart">
        <van-nav-bar
          title="购物车"
          :fixed="true"
          :z-index="99"
        >
            <span 
                class="link" 
                slot="right" 
                @click="handeDeleteSelected"
                v-if="cartCount > 0"
            >
                删除所选
            </span>
        </van-nav-bar>
        <!-- 
            <div v-if="carts.cartList.length > 0"> 
            会报错：原因
            后台在返回数据时是需要时间的 不管多快 都是需要时间的 但是在初始化时，并没有给一个空的数组 注意 是数组形式 所以当调用 .length 方法时 这时后台数据还没有返回回来 此时它不是数组 就会报错        
        -->
        <div v-if="cartCount > 0">        
            <div class="card-products">
                <van-checkbox
                    class="card-products__item" 
                    v-for="item in carts.cartList" 
                    v-model="item.checked"
                    :key="item.id"
                    @click="handleChoices(item.checked,item.product._id)" 
                >
                    <van-card 
                        :title="item.product.name"
                        :desc="item.attr"  
                        :num="item.count" 
                        :price="item.product.price" 
                        :thumb="item.product.mainImage" 
                    >
                        <div slot="footer" @click.stop="">
                            <van-stepper v-model="item.count" @change="handleCounts(item.count,item.product._id)" />
                        </div>
                    </van-card>
                </van-checkbox>
            </div>
            <van-submit-bar 
                :price="carts.totalCartPrice*100"
                :disabled="carts.totalCartPrice==0" 
                button-text="去结算" 
                @submit="onSubmit" 
            >
            <van-checkbox v-model="carts.allChecked" class="select-all" @click="handleChoices(carts.allChecked)">全选</van-checkbox>
            </van-submit-bar>
        </div>
        <div v-else>
            <Empty />
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { GET_CARTS,UPDATE_CARTS_CHOICES,UPDATE_CARTS_COUNTS,DELETE_CARTS} from './store/types.js'
import Empty from 'components/empty'    
import { getUsername } from 'util'
import api from 'api'
export default {
    name: 'Cart',
    components:{
        Empty,
    },    
    mounted(){
        if(!getUsername()){
            this.$router.push('login')
            return;
        }            
        //获取初始化购物车数据
        this.$store.dispatch(GET_CARTS)
    },    
    computed: {
        ...mapGetters([
            'carts',
            'cartCount'
        ])
    },

    methods: {
        //处理选择
        handleChoices(checked,productId){
            let payload = {
                checked:!checked
            }
            //如果有productid则是选择单个
            if(productId){
                payload.productId = productId
            }
            this.$store.dispatch({
                type:UPDATE_CARTS_CHOICES,
                payload:payload
            })
        },
        //处理个数
        handleCounts(count,productId){
            this.$store.dispatch({
                type:UPDATE_CARTS_COUNTS,
                payload:{
                    productId:productId,
                    count:count
                }
            })            
        },
        //删除所选
        handeDeleteSelected() {
            this.$store.dispatch(DELETE_CARTS)
        },           
        onSubmit() {
            this.$router.push('/orderConfirm')
        },
     
    }
}
</script>
<style lang="less">
.van-submit-bar{
    bottom: 50px;
}
.Cart{
    padding-bottom: 50px;
    background-color: #fff;
    .select-all{
        margin-left: 10px;
    }
}
.card-products {
    margin-top: 60px;
    &__item {
        position: relative;
        background-color: #fafafa;
        margin-bottom: 15px;
        .van-card__content{
            height: 100px;
        }
        .van-checkbox__label {
            width: 100%;
            height: auto; // temp
            padding: 0 10px 0 15px;
            box-sizing: border-box;
        }

        .van-checkbox__icon {
            top: 50%;
            left: 10px;
            z-index: 1;
            position: absolute;
            margin-top: -10px;
        }

        .van-card__price {
            color: #f44;
        }
    }
    .van-stepper{
        position: absolute;
        top: 80px;
        right: 82px;
    }
}
</style>