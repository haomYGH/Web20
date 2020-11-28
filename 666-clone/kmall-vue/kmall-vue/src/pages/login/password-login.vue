<template>
    <div class="PasswordLogin form-wrap">
        <van-cell-group>
            <van-field
                placeholder="请输入手机号"
                readonly
                clickable
                :value="phone"
                @touchstart.native.stop="show = true" 
                :error-message="phoneErr"               
            />
            <van-number-keyboard
                v-model="phone"
                :show="show"
                :maxlength="11"
                @blur="show = false"
            />
        </van-cell-group>
        <van-cell-group>
          <van-field
            v-model="password"
            type="password"
            clearable
            placeholder="请输入密码"
            :error-message="passwordErr"
          >
          </van-field>
        </van-cell-group>
        <van-cell-group>
          <van-field
            class="captchaInput"
            v-model="captchaCode"
            placeholder="请输入图形验证码"
            clearable
            :error-message="captchaCodeErr"   
          >
            <div slot="button" class="captcha-img" @click="getCaptcha" v-html="captchaSvg">
            </div>
          </van-field>
 
        </van-cell-group>        
        <van-cell-group class="btn-cell">
            <van-button class="btn" type="primary" @click="handleLogin">登录</van-button>
        </van-cell-group>
        <BackHome />        
    </div>
</template>
<script>
    import BackHome from 'components/back-home'
    import api from 'api'
    import { saveUsername } from 'util'
    import { GET_CARTS} from 'pages/cart/store/types.js'    
    export default {
        name: 'PasswordLogin',
        components:{
            BackHome
        },          
        data() {
            return {
              show: false,
              phone: '',
              phoneErr:'',
              password:'',
              passwordErr:'',
              captchaCode:'',
              captchaCodeErr:'',
              captchaSvg:''
            }
        },
        mounted(){
            this.getCaptcha()
        },
        methods:{
            getCaptcha(){
                //获取并设置验证码
                api.getCaptcha()
                .then(result=>{
                    //获取验证码的数据是利用svg画的图
                    if(result.code == 0){
                        this.captchaSvg = result.data
                    }
                    
                })
            },
            handleLogin(){
                //1.验证
                if(!/^1[3589]\d{9}$/.test(this.phone) || !this.phone){
                    this.phoneErr = "请输入正确的手机号"
                    return;
                }else{
                    this.phoneErr = ''
                }
                if(!/^\w{3,6}$/.test(this.password) || !this.password){
                    this.passwordErr = "请输入合法密码"
                    return;
                }else{
                    this.passwordErr = ''
                }
                if(!/^\w{4}$/.test(this.captchaCode) || !this.captchaCode){
                    this.captchaCodeErr = "请输入合法图形验证码"
                    return;
                }else{
                    this.captchaCodeErr = ''
                }                
                //2.发送登陆请求
                api.login({
                    username:this.phone,
                    password:this.password,
                    captchaCode:this.captchaCode
                })
                .then(result=>{
                    if(result.code == 0){
                        //保存用户信息
                        saveUsername(result.data.username)
                        //加载初始化购物车数据
                        this.$store.dispatch(GET_CARTS)                        
                        //跳转到之前的页面
                        this.$router.back()
                    }else{
                        this.$toast.fail(result.message)
                    }
                })
            }
        }              
    }
</script>
<style lang="less" scoped>
    .captcha-img{
        width: 150px;
    }
</style>