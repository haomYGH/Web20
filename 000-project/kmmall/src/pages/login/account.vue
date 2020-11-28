<template>
    <div class="page">
		<van-cell-group>
            <van-field 
                :value="tel"
                type="tel"
                placeholder="请输入手机号" 
                :error-message="errTel"
                @touchstart.native.stop="show = true"
            />
            <van-number-keyboard
                v-model="tel"
                :show="show"
                @blur="show = false"
            />
        </van-cell-group>
        <van-cell-group>
            <van-field 
                v-model="password" 
                type="password" 
                placeholder="请输入密码" 
                :error-message="errPwd"
            />
        </van-cell-group>
        <van-cell-group>
            <van-field
                v-model="captchaCode"
                center
                clearable
                placeholder="请输入验证码"
                :error-message="errCaptcha"
            >
            <template #button>
                <div class="captchaSvg" @click="newCaptcha" v-html="captchaSvg"></div>
            </template>
            </van-field>
        </van-cell-group>
        <van-button type="primary" @click="handleLogin">登录</van-button>
    </div>
</template>
<script>
    import {validate} from '@util'
    import api from '@api'
    import {saveUsername} from '@util'
	// import { mapGetters } from 'vuex';
	// import * as types from './store/types';
    export default {
		name:'login',
		data(){
			return {
                tel: '',
                show: true,
                password: '',
                errTel:'',
                errPwd:'',
                captchaCode:'',
                captchaSvg:'',
                errCaptcha:''
			}
		},
		methods: {
			handleLogin() {
				//手机号非空验证
                if(!validate(this.tel,'required')){
                    this.errTel = '请输入手机号'
                    return 
                }else{this.errTel = ''}
                //手机号合法性验证
                if(!validate(this.tel,'tel')){
                    this.errTel = '手机号格式不正确'
                    return 
                }else{this.errTel = ''}
                //密码非空验证
                if(!validate(this.password,'required')){
                    this.errPwd = '请输入密码'
                    return 
                }else{this.errPwd = ''}
                //密码合法性验证
                if(!validate(this.password,'password')){
                    this.errPwd = '密码是3-6位任意字符'
                    return 
                }else{this.errPwd = ''}
                //验证码验证(需要发送请求跟后台进行验证，这里依然只做一个简单的合法验证)
                if(!validate(this.captchaCode,'captchaCode')){
                    this.errCaptcha = '验证码为4位字符'
                    return 
                }else{this.errCaptcha = ''}
                //验证通过发送请求
                api.login({
                    username:this.tel,
                    password:this.password,
                    captchaCode:this.captchaCode,
                })
                .then((result)=>{
                    console.log(result);
                    if(result.code == 1){//验证码错误
                        this.errCaptcha = result.message
                    }else if(result.code == 0){//验证通过
                        //保存用户状态
                        saveUsername(result.data.username)
                        //跳转到之前的页面
                        this.$router.back()
                    }
                })
            },
            newCaptcha(){//更新验证码
                api.captcha()
                .then((data)=>{
                    this.captchaSvg=data.data
                })
            }
		},
		mounted(){
			//获取验证码
            api.captcha()
            .then((data)=>{
                this.captchaSvg=data.data
            })
		}
    }
</script>
<style scoped lang="less">
    .page{
		color: red;
    }
</style>