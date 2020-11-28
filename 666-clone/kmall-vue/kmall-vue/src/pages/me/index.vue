<template>
    <div class="Me">
        <van-row class="header" @click="$router.push('/me/userCenter')">
            <van-image
              round
              :src="userInfo.avatar"
            />
            <span class="username">{{userInfo.username}}</span>
        </van-row>    
        <van-row class="links">
            <van-col span="6">
                <van-icon name="pending-payment" @click="goOrderList(10)" />
                待付款
            </van-col> 
            <van-col span="6">
                <van-icon name="tosend" @click="goOrderList(30)" />
                待发货
            </van-col>
            <van-col span="6">
                <van-icon name="logistics" @click="goOrderList(40)" />
                已发货
            </van-col>            
            <van-col span="6">
                <van-icon name="records" @click="goOrderList(50)" />
                已完成
            </van-col>            
        </van-row>
        <van-cell-group class="group">
            <van-cell icon="records" title="全部订单" is-link @click="goOrderList('')" />
        </van-cell-group>
        <transition name="page-slide">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import { GET_USERINFO} from './store/types.js'
    import { getUsername } from 'util'
    export default {
        name: 'Me',
        mounted(){
            if(!getUsername()){
                this.$router.push('login')
                return
            }
            this.$store.dispatch(GET_USERINFO)
        },
        computed:{
            userInfo(){
                // console.log(this.$store.state.me.userInfo)
                return this.$store.state.me.userInfo
            }
        },
        methods:{
            goOrderList(status){
                //10-未支付 20-取消 30-已支付 40-已发货 50-完成
                this.$router.push('/me/orderList/'+status)
            }
        }
    }
</script>
<style lang="less" scoped>
    .Me {
        .header{
            background-color: @primary-color;
            padding: 20px 5px;
            display: flex;
            .van-image{
                width: 50px;
                height: 50px;
            }
            .username{
                margin-left: 10px;
                font-size: 18px;
                align-self:center;
                color:@text-color;
            }
        }
        .group {
            margin-bottom: 15px;
        }
        .links {
            padding: 15px 0;
            font-size: 12px;
            text-align: center;
            background-color: #fff;
            .van-icon {
                display: block;
                font-size: 24px;
            }
        }
    }
</style>