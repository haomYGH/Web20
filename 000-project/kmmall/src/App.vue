<template>
    <div class="app">
        <router-view></router-view>
        <Tabbar />
    </div>
</template>

<script>
    import Tabbar from '@components/Tabbar'
    export default {
        name: 'app',//组件首字母大写，用的时候，引入时设置成大写即可
        components: {
            Tabbar,
        }
    }
</script>

<style lang="less">
    
</style>
