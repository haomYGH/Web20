<template>
    <div class="CaptchaDialog">
        <van-dialog
          v-model="showCaptchaDialog"
          show-cancel-button
          @confirm="requestVerifyCode"
          :before-close="handleBeforeClose"
        >
          <van-field
            v-model="captchaCode"
            placeholder="请输入图形验证码"
            clearable
            :error-message="captchaCodeErr"   
          >
            <div slot="button" class="captcha-img" @click="getCaptcha" v-html="captchaSvg">
            </div>
          </van-field>
        </van-dialog>
    </div>
</template>

<script>
    import api from 'api'
    export default {
        name:'CaptchaDialog',
        props:{
            handleShowDialog:Function,
            handleCaptchaSuccess:Function,
            showDialog:Boolean
        },          
        data() {
            return {
              captchaCode:'',
              captchaCodeErr:'',
              captchaSvg:'',
            }
        },
        computed:{
            showCaptchaDialog:{
                get(){
                   return this.showDialog 
                },
                set(isShow){
                    this.handleShowDialog(isShow)
                }
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
                    if(result.code == 0){
                        this.captchaSvg = result.data
                    }
                    
                })
            },
            handleBeforeClose(action, done){
                // console.log(action)
                if(action == 'confirm'){
                    done(!this.captchaCodeErr)
                }else{
                    done()
                }
            },
            requestVerifyCode(){
                //1.验证
                if(!/^\w{4}$/.test(this.captchaCode) || !this.captchaCode){
                    this.captchaCodeErr = "请输入正确的图像验证码"
                    return;
                }else{
                    this.captchaCodeErr = ''
                }                
                //2.处理请求
                // console.log(this.captchaCode)
                this.handleCaptchaSuccess(this.captchaCode)
            },            
        }                         
    }
</script>

<style scoped lang="less" scoped>
    .CaptchaDialog{
        .captcha-img{
            width: 150px;
        }
    }
</style>