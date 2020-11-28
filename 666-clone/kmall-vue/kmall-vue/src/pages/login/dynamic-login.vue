<template>
    <div class="DynamicLogin form-wrap">
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
            v-model="verifyCode"
            center
            clearable
            placeholder="请输入短信验证码"
            :error-message="verifyCodeErr"
        >
            <van-button 
                slot="button" 
                size="small" 
                type="primary" 
                @click="getVerifyCode"
                :disabled="verifyCodeDisabled"
            >
                {{verifyCodeText}}
            </van-button>
        </van-field>
        <CaptchaDialog 
            :handleShowDialog="handleShowDialog"
            :handleCaptchaSuccess="handleCaptchaSuccess"
            :showDialog="showDialog"
        />
        </van-cell-group>
        <van-cell-group class="btn-cell">
            <van-button class="btn" type="primary" @click="handleLogin">登录</van-button>
        </van-cell-group>
        <BackHome />       
    </div>
</template>
<script>
    import BackHome from 'components/back-home'
    import CaptchaDialog from 'components/captcha-dialog'
    import api from 'api'
    import { saveUsername } from 'util'
    import { GET_CARTS} from 'pages/cart/store/types.js'

    export default {
        name: 'DynamicLogin', 
        components:{
            BackHome,
            CaptchaDialog
        },          
        data() {
            return {
              show: false,
              showDialog:false,
              phone: '',
              phoneErr:'',
              verifyCode:'',
              verifyCodeErr:'',
              verifyCodeText:'发送验证码',
              verifyCodeDisabled:false,             
            }
        },
        mounted(){
            this.handleTimer()
        },
        methods:{           
            getVerifyCode(){
                //1.验证
                if(!/^1[3589]\d{9}$/.test(this.phone) || !this.phone){
                    this.phoneErr = "请输入正确的手机号"
                    return;
                }else{
                    this.phoneErr = ''
                }
                //显示图形验证码输入框
                this.showDialog = true
            },
            //控制显示对话框的方法,该方法传递到子组件中
            handleShowDialog(isShow){
                this.showDialog = isShow
            },
            //图形验证码输入正确后的处理,该方法传递到子组件中处理,子组件会把用户输入的验证码传递到改方法
            handleCaptchaSuccess(captchaCode){
                api.getLoginVerifyCode({
                    phone:this.phone,
                    captchaCode:captchaCode
                })
                .then(result=>{
                    if(result.code == 0){
                        this.$toast.success(result.message)
                        
                        this.verifyCodeDisabled = true
                        window.localStorage.setItem('getLoginVerifyCodeTime',Date.now())
                        this.handleTimer()                         
                    }else{
                        this.$toast.fail(result.message)
                    }                    
                })
            },
            handleTimer(){
                var getLoginVerifyCodeTime = window.localStorage.getItem('getLoginVerifyCodeTime')
                if(getLoginVerifyCodeTime){
                    var totalSeconds = 60
                    var leaveSeconds = parseInt(( Date.now() - getLoginVerifyCodeTime) / 1000)
                    if(leaveSeconds <= totalSeconds){
                        //刷新页面时添加(60s内无法重复点击获取手机验证码)
                        this.verifyCodeDisabled = true
                        //可重新获取验证码倒计时
                        this.verifyCodeText = (totalSeconds - leaveSeconds)+'s后重发'
                        clearInterval(this.timer)
                        //开启定时器
                        this.timer = setInterval(()=>{
                            this.handleTimer()
                        },1000)
                    }else{
                        clearInterval(this.timer)
                        this.verifyCodeDisabled = false
                        this.verifyCodeText = '获取验证码'
                        window.localStorage.removeItem('getLoginVerifyCodeTime')
                    }
                }
            },
            handleLogin(){
                //1.验证
                if(!/^1[3589]\d{9}$/.test(this.phone) || !this.phone){
                    this.phoneErr = "请输入正确的手机号"
                    return;
                }else{
                    this.phoneErr = ''
                }
                if(!/^\d{6}$/.test(this.verifyCode) || !this.verifyCode){
                    this.verifyCodeErr = "请输入6位数字验证码"
                    return;
                }else{
                    this.verifyCodeErr = ''
                }
                //2.发送登陆请求
                api.dynamicLogin({
                    phone:this.phone,
                    verifyCode:this.verifyCode
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