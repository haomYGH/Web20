<template>
    <div class="app">
        <router-view></router-view>
        <Tabbar />
    </div>
</template>

<script>
    import Tabbar from '@components/Tabbar/Tabbar.vue'
    export default {
        name: 'App',
        components: {
            Tabbar,
        }
    }
</script>

<style lang="less">
    
</style>
