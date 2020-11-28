<template>
    <div class="OrderDetail">
        <van-nav-bar
          title="订单详情"
          left-text="返回"
          left-arrow
          :fixed="true"
          :z-index="99"          
          @click-left="$router.back()"
        />
        <div class="wrap">
            <van-cell 
                class="top-bar" 
                icon="todo-list-o" 
                :title="order.statusDesc"
                :label="'订单号:'+order.orderNo"  
            />
            <van-cell 
                icon="location-o" 
                :title="shipping.name+'('+shipping.phone+')'"
                :label="shipping.province+shipping.city+(shipping.county || '')+shipping.address" 
            />
            <van-cell 
                is-link 
                :arrow-direction="isShowOrderDetail ? '' : 'down'" 
                value="订单信息"
                @click="isShowOrderDetail = !isShowOrderDetail" 
            />          
            <div class="detail" v-if="isShowOrderDetail">
                <p>订单状态:{{order.statusDesc}}</p>
                <p>订单金额:<span class="price">{{order.payment | formatPrice}}</span></p>
                <p>支付方式:{{order.paymentTypeDesc}}</p>
                <p>下单时间:{{order.createdAt | formatDate}}</p>
            </div>              
            <van-cell 
                is-link 
                :arrow-direction="isShowDelivery ? '' : 'down'" 
                value="物流信息"
                @click="isShowDelivery = !isShowDelivery" 
            />
            <div v-if="isShowDelivery">
                <van-steps direction="vertical" :active="0">
                  <van-step v-for="(item,index) in expressData" :key="index">
                    <h3>{{item.context}}</h3>
                    <p>{{item.time}}</p>
                  </van-step>
                </van-steps>
                <p class="exp-err-msg" v-if="expressErrMsg">
                    {{expressErrMsg}}
                </p>
            </div>
            <van-cell 
                is-link 
                :arrow-direction="isShowProduct ? '' : 'down'" 
                value="商品信息"
                @click="isShowProduct = !isShowProduct" 
            />
            <div class="product" v-if="isShowProduct">
                <van-card
                    v-for="product in order.productList"
                    :key="product._id"
                    :num="product.count"
                    :price="product.price | formatPrice"
                    :desc="product.attr"  
                    :title="product.name"
                    :thumb="product.mainImage"
                />                
            </div>                                                            
        </div>
        <van-cell class="bottom-bar" v-if="isShowBottomBar">
            <van-button @click="handleBtn1" type="primary" size="small" v-if="btnTxt1">{{btnTxt1}}</van-button>
            <van-button @click="handleBtn2" type="primary" size="small" v-if="btnTxt2">{{btnTxt2}}</van-button>
        </van-cell>
    </div>
</template>
<script>
    import api from 'api'
    import { GET_ORDERS_DETAIL,UPDATE_ORDERS_STATUS } from 'pages/me/store/types.js'  
    export default {
        name: 'OrderDetail',
        props:{
            orderNo:{
                type:String
            }
        },
        data(){
            return{
                isShowOrderDetail:false,
                isShowDelivery:false,
                isShowProduct:false,
                btnTxt1:'',
                btnTxt2:''
            }
        },
        mounted(){
            //初始化加载数据
            this.$store.dispatch({
                type:GET_ORDERS_DETAIL,
                payload:{
                    orderNo:this.orderNo
                }
            })
            .then(()=>{
                //根据订单的状态决定
                //按钮的文本
                if(this.order.status == '10'){
                    this.btnTxt1 = '取消'
                    this.btnTxt2 = '付款' 
                }else if(this.order.status == '40'){
                    this.btnTxt1 = '确认收货'
                }            
            }) 
        },
        computed:{
            order(){
                return this.$store.state.me.order
            },
            shipping(){
                if(this.$store.state.me.order.shipping){
                    return this.$store.state.me.order.shipping
                }else{
                    return {}
                }
            },
            isShowBottomBar(){
                if(this.order.status == '10' || this.order.status == '40'){
                    return true
                }else{
                    return false
                }               
            },
            expressData(){
                const expressInfo = this.$store.state.me.order.expressInfo
                if(expressInfo){
                    if(expressInfo.code == 0){
                        return expressInfo.data
                    }else{
                        return []
                    }
                }else{
                    return []
                }
            },
            expressErrMsg(){
                const expressInfo = this.$store.state.me.order.expressInfo
                if(expressInfo){
                    if(expressInfo.code == 1){
                        return expressInfo.message
                    }else{
                        return ''
                    }
                }else{
                    return '暂无物流信息'
                }                
            }
        },
        methods:{
            handleBtn1(){
                let status = ''
                let title = ''
                if(this.order.status == '10'){
                    status = '20'
                    title = '您确认取消订单?'
                }else if(this.order.status == '40'){
                    status = '50'
                    title = '您确认已经收到商品?'
                }
                if(status){
                    this.$dialog.confirm({
                      title: title,
                    })
                    .then(() => {
                        this.$store.dispatch({
                            type:UPDATE_ORDERS_STATUS,
                            payload:{
                                orderNo:this.order.orderNo,
                                status:status
                            }
                        })
                        .then(()=>{
                            this.$toast.success('操作成功')
                        })                      
                    })
                    .catch(() => {
                    });                    
                }                           
            },
            handleBtn2(){
                if(this.order.status == '10'){
                    api.updateOrdersPay({
                        orderNo:this.order.orderNo,
                        channel:'wap'
                    })
                    .then(result=>{
                        if(result.code == 0){
                            this.$toast.success('订单提交成功,正在跳转到支付页面')
                            window.location.href = result.data.url
                        }
                    })
                }
            }
        }                        
    }
</script>
<style lang="less" scoped>
    .OrderDetail {
        .overlay-page;
        .wrap{
            margin-top: 50px;
            .top-bar{
                background-color: @primary-color;
                color:#fff;
                opacity: 0.8;
                font-weight: 300;
                .van-cell__label{
                   color:#fff; 
                }
            }
        }
        .detail{
            box-sizing: border-box;
            width: 100%;
            padding: 10px 16px;
            overflow: hidden;
            color: #323233;
            font-size: 12px;
            line-height: 24px;
            background-color: #fff;
            .price{
                color: @primary-color;
            }
        }
        .exp-err-msg{
            padding: 10px 16px;
            color: #323233;
            font-size: 12px;
            line-height: 24px;
        }
        .bottom-bar{
            position: fixed;
            bottom: 0;
            z-index: 9999;
            .van-button{
                float: right;
                margin-right: 10px;
            }
        }
    }
</style>