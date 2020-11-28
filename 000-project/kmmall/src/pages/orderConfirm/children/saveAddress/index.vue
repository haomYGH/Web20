<template>
    <div class="save-address">
        <van-nav-bar
            title="添加地址"
            left-text="返回"
            left-arrow
            @click-left="$router.back()"
        />
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-delete
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
        />
    </div>
</template>

<script>
    import areaList from './areaList.js'
    import * as types from './store/types';
    export default {
        name:'saveAddress',
        data() {
            return {
                areaList,
                searchResult: [],
            };
        },
        methods: {
            onSave(payload) {
                this.$store.dispatch(types.SAVE_ADDRESS,payload)
                .then(()=>{
                    this.$router.back();
                })
            },
            onDelete() {
                console.log('delete');
            },
        },
    }
</script>
<style scoped lang="less">
    .save-address{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1000;
        background-color: #f5f5f5;
        .rem(padding-bottom,20);
        .van-nav-bar{
            .rem(margin-bottom,10);
        }
    }
</style>