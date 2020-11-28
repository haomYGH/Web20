<template>
    <div class="page">
        <div class="header" @click="$router.push('/me/userCenter')">
            <van-image :src="userInfo.avatar" />
            <span class="username">{{userInfo.username}}</span>
        </div>
        <van-row>
            <van-col span="6">
                <van-icon name="pending-payment" />
                待付款
            </van-col>
            <van-col span="6">
                <van-icon name="tosend" />
                待发货
            </van-col>
            <van-col span="6">
                <van-icon name="logistics" />
                已发货
            </van-col>
            <van-col span="6">
                <van-icon name="records" />
                待付款
            </van-col>
        </van-row>
        <van-cell icon="orders-o" title="全部订单" is-link @click="handleOrderList" size="large" />
        <router-view></router-view>
    </div>
</template>

<script>
    import { getUsername } from '@util'
    import api from '@api'
    export default {
        name:'me',
        data(){
            return {
                userInfo:{}
            }
        },
        mounted(){
            //1.如果未登录则跳转到登录页
            if(!getUsername()){
                this.$router.push('/login')
            }
            //2.有用户状态则与后台用户状态同步(移除前台用户状态见axios)
            api.getUserName()//发送请求时即可进行验证
            .then(()=>{//状态信息验证通过，获取me页面数据
                api.getUserInfo()
                .then((result)=>{
                    if(result.code == 0){
                        // console.log(result.data)
                        this.userInfo = result.data
                    }
                })
            })
        },
        methods:{
            handleOrderList(){
                console.log('hh')
            }
        }
    }
</script>

<style scoped lang="less">
    .page{
        .header{
            .rem(margin-bottom,15);
            display: flex;
            background-color: #52c41a;
            .rem(padding,20,5);
            .van-image{
                .rem(width,50);
                .rem(height,50);
                overflow: hidden;
                border-radius: 50%;
            }
            .username{
                .rem(font-size,20);
                align-self: center;
                .rem(margin-left,10);
            }
        }
        .van-row{
            .rem(margin-bottom,15);
            .van-col{
                .rem(font-size,13);
                text-align: center;
                .van-icon{
                    display: block;
                    .rem(font-size,24);
                }
            }
        }
        .van-cell{
            .van-icon{
                .rem(font-size,15)
            }
        }
    }
</style>