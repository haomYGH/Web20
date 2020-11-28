<template>
    <div class="OrderList">
        <van-nav-bar
          :title="title"
          left-text="返回"
          left-arrow
          :fixed="true"
          :z-index="99"          
          @click-left="$router.back()"
        />
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :offset=100
        >
            <van-cell
                v-for="item in orders"
                :key="item.orderNo"
                :title="'订单号:'+item.orderNo"
                @click="handleClickOrder(item.orderNo)"
                is-link
            >
                <van-image
                  slot="icon"
                  :src="item.productList[0].mainImage"
                />
                <div slot="label">
                    <p>订单状态:{{item.statusDesc}}</p>
                    <p>订单金额:<span class="price">{{item.payment | formatPrice}}</span></p>
                    <p>下单时间:{{item.createdAt | formatDate}}</p>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>
<script>
    import { GET_ORDERS_LIST } from 'pages/me/store/types.js'  
    export default {
        name: 'OrderList',
        props:{
            status:{
                type:String
            }
        },
        data(){
            return{
                title:'',
                loading: false,
                finished: true,
                limit:15,//每次请求订单数据数量
                start:0,//请求的开始值
                orders:[]//所有订单
            }
        },
        mounted(){
            //初始化标题
            //10-未支付 20-取消 30-已支付 40-已发货 50-完成
            switch(this.status){
                case '10':
                    this.title = '待付款'
                    break
                case '30':
                    this.title = '待发货'
                    break
                case '40':
                    this.title = '已发货'
                    break
                case '50':
                    this.title = '已完成'
                    break
                default:
                    this.title = '所有订单'
                    break     
            }

            //初始化加载数据
            const payload = {
                channel:'wap',
                start:0,
                limit:this.limit,
            }
            if(this.status){
                payload.status = this.status
            }
            this.loading = true
            this.$store.dispatch({
                type:GET_ORDERS_LIST,
                payload:payload
            })
            .then(()=>{
                this.orders = this.$store.state.me.orders
                this.start = this.orders.length + 1
                this.loading = false
                if(this.orders.length == this.limit){
                    this.finished = false
                }else{
                    this.finished = true
                }
            }) 
        },
        methods:{
            onLoad(){
                const payload = {
                    channel:'wap',
                    start:this.start,
                    limit:this.limit,
                }
                if(this.status){
                    payload.status = this.status
                }
                // console.log(payload)
                this.loading = true
                this.$store.dispatch({
                    type:GET_ORDERS_LIST,
                    payload:payload
                })
                .then(()=>{
                    this.start = this.start + this.$store.state.me.orders.length + 1
                    this.orders = this.orders.concat(this.$store.state.me.orders)
                    this.loading = false                    
                    if(this.$store.state.me.orders.length == this.limit){
                        this.finished = false
                    }else{
                        this.finished = true
                    }            
                })  
            },
            handleClickOrder(orderNo){
                this.$router.push('/me/orderDetail/'+orderNo)
            }
        }                        
    }
</script>
<style lang="less" scoped>
    .OrderList {
        .overlay-page;
        .van-list{
            margin-top: 50px;
            .van-image{
                width: 50px;
                height: 50px;
                margin-right: 10px;
            }
            .price{
                color: @primary-color;
            }
        }
    }
</style>