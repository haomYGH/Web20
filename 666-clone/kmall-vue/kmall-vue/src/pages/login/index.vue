<template>
    <div class="Login">
        <van-tabs :border="false" class="login-tabs" v-model="active">
            <van-tab title="密码登录"><PasswordLogin /></van-tab>
            <van-tab title="验证码登录"><DynamicLogin /> </van-tab>
            <van-tab title="免费注册"><Register /></van-tab>
        </van-tabs>                 
    </div> 
</template>
<script>
    import DynamicLogin from './dynamic-login.vue'
    import PasswordLogin from './password-login.vue'
    import Register from './register.vue'
    export default {
        name: 'Login',
        components:{
            DynamicLogin,
            PasswordLogin,
            Register
        },
          data() {
            return {
              active: 0
            };
          }               
    }
</script>
<style lang="less" scoped>
    .Login{
        position: fixed;
        top:0;
        left:0;
        bottom: 0;
        right: 0;
        z-index: 200;
        background-color: #fff;
        .login-tabs{
            margin-top: 60px;
            background-color: #fff;
        }
    }
</style>