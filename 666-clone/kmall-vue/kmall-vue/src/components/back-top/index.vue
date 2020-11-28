<template>
    <div class="BackTop" @click="scrollToTop" v-if="isShow">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ccc" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up-circle"><circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line></svg>
    </div>
</template>

<script>
    export default {
        name:'BackTop', 
        data() {
            return {
                isShow: false
            }
        },
        mounted(){
            const body = document.documentElement || document.body
            const setIsShow = ()=>{
                if(body.scrollTop > 200){
                    this.isShow = true
                }else{
                    this.isShow = false
                }
            }
            //1.监听滚动事件
            document.addEventListener('scroll',setIsShow,false)
            //2.监听触摸
            //.passive 会告诉浏览器你不想阻止事件的默认行为,尤其能够提升移动端的性能
            document.addEventListener('touchstart',setIsShow,{passive:true})
            document.addEventListener('touchmove',setIsShow,{passive:true})
            document.addEventListener('touchend',setIsShow,{passive:true})
        },
        methods:{
            scrollToTop(){
                const body = document.documentElement || document.body
                const back = ()=>{
                    //修改位置
                    body.scrollTop = body.scrollTop - 80
                    if(body.scrollTop > 0){
                        //在动画没有结束前，递归渲染
                        requestAnimationFrame(back)
                    }
                }
                /*第一帧渲染
                requestAnimationFrame的步伐跟着系统的刷新步伐走。
                它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，
                这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题
                */
                requestAnimationFrame(back)
            }
        }                         
    }
</script>

<style scoped lang="less" scoped>
    .BackTop{
        width: 40px;
        height: 40px;
        position: fixed;
        bottom: 20px;
        right: 5px;
        z-index: 999;
    svg{
       width: 100%; 
       height: 100%;
    }
    
    }  
</style>