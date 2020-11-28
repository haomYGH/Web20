<template>
    <div class="OrderConfirm">
        <van-nav-bar
          title="订单确认"
          left-arrow
          @click-left="$router.back()"
          :fixed="true"
          :z-index="99"
        />
        <div class="wrap">
            <van-contact-card
              type="add"
              add-text="添加联系人地址"
              @click="handleAddAddress"
            />
            <van-cell 
                is-link 
                :arrow-direction="isShowAddressList ? 'down' : ''" 
                value="选择地址"
                @click="isShowAddressList = !isShowAddressList" 
            />
            <van-address-list
              v-if="isShowAddressList"
              v-model="chosenAddressId"
              :list="this.shippingList"
              @edit="handleEditAddress"
              default-tag-text="默认"
            />
            <van-cell 
                is-link 
                :arrow-direction="isShowPayWay ? 'down' : ''" 
                value="选择支付方式"
                @click="isShowPayWay = !isShowPayWay" 
            />
            <van-radio-group v-model="payWay" v-if="isShowPayWay">
              <van-cell-group>
                <van-cell title="支付宝" clickable @click="payWay = '10'">
                  <van-radio slot="right-icon" name="10" />
                </van-cell>
                <!--
                    todo:等待后台接口开发完毕
                <van-cell title="微信" clickable @click="payWay = '20'">
                  <van-radio slot="right-icon" name="20" />
                </van-cell>
                -->
              </van-cell-group>
            </van-radio-group>
            <van-cell 
                is-link 
                :arrow-direction="isShowProductList ? 'down' : ''" 
                value="查看所选商品"
                @click="isShowProductList = !isShowProductList" 
            />            
            <van-card
                v-if="isShowProductList"
                v-for="item in ordersProducts.cartList"
                :key="item._id"
                :num="item.count"
                :price="item.product.price"
                :desc="item.attr"  
                :title="item.product.name"
                :thumb="item.product.mainImage"
            />
            <van-submit-bar
              :price="ordersProducts.totalCartPrice*100"
              button-text="提交订单"
              :loading="isSubmitLoading"
              @submit="handleSubmitOrder"
            />                        
        </div>
        <transition name="page-slide">
            <router-view></router-view>
        </transition>                
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import api from 'api'
    import { getUsername } from 'util'
    import { GET_SHIPPINGS,GET_ORDERS_PRODUCTS } from './store/types.js'
    export default {
        name: 'OrderConfirm',
        data() {
            return {
                chosenAddressId:'',
                isShowAddressList:false,
                isShowPayWay:true,
                isShowProductList:false,
                payWay:"10",
                isSubmitLoading:false,
            }
        },
        mounted(){
            var _this = this;
            if(!getUsername()){
                this.$router.push('login')
                return
            }
            this.$store.dispatch(GET_SHIPPINGS)
            .then(()=>{
                //设置默认地址
                if(_this.shippingList[0]){
                   _this.chosenAddressId = _this.shippingList[0].id 
                }
            })
            //获取订单列表信息
            this.$store.dispatch(GET_ORDERS_PRODUCTS)
        },
        computed:{
            ...mapGetters([
                'shippingList',
                'ordersProducts',
            ])
        },        
        methods:{
            handleAddAddress(){
                if(this.shippingList.length==5){
                    this.$toast.fail('地址最多为5个')
                }else{
                    this.$router.push('/orderConfirm/saveAddress') 
                }
            },
            handleEditAddress(item){
                this.$router.push('/orderConfirm/saveAddress/'+item.id) 
            },
            handleSubmitOrder(item){
                // console.log(this.shippingList)
                // console.log(this.chosenAddressId)

                if(this.ordersProducts.cartList.length == 0){
                    this.$toast.fail('购物车中没有选择商品')
                    return;                    
                }
                if(!this.chosenAddressId){
                    this.$toast.fail('请选择地址')
                    return;
                }
                this.isSubmitLoading = true
                api.addOrders({
                    shippingId:this.chosenAddressId,
                    paymentType:this.payWay,
                    channel:'wap'
                })
                .then(result=>{
                    this.isSubmitLoading = false
                    if(result.code == 0){
                        this.$toast.success('订单提交成功,正在跳转到支付页面')
                        // console.log(result.data)
                        window.location.href = result.data.url
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .OrderConfirm {
        .overlay-page;
        .wrap{
            margin-top: 50px;
            padding-bottom: 80px;
        }
        .van-address-list{
            padding-bottom: 0;
        }
        .van-address-list__add{
            display: none;
        }
        .van-submit-bar{
            bottom: 0;
        }
    }
</style>