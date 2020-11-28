<template>
    <div class="SaveAddress">
        <van-nav-bar
          :title="isEdit ? '编辑地址' : '添加地址'"
          left-arrow
          @click-left="$router.back()"
          :fixed="true"
          :z-index="99"
        />
        <div class="address-wrap">
            <van-address-edit
              :area-list="areaList"
              :address-info="addressInfo"
              show-postal
              :show-delete="isEdit"
              :area-columns-placeholder="['请选择', '请选择','请选择']"
              @save="onSave"
              @delete="onDelete"
            />
            <!--
                :area-columns-placeholder="['请选择', '请选择','请选择']"
                这一配置信息在v2.2.5版本及以上才能使用
            -->
        </div>
    </div>
</template>
<script>
import api from 'api'
import areaList from './area.js'
import { ADD_SHIPPINGS,GET_SHIPPINGS_DETAIL,UPDATE_SHIPPINGS,DELETE_SHIPPINGS } from 'pages/order-confirm/store/types.js'  
export default {
    name: 'SaveAddress',
    props:{
        id:{
            type:String
        }
    },
    data() {
        return {
            isEdit:!!this.id,
            areaList:areaList,
            addressInfo:{},
            searchResult: [],
        }
    },
    mounted(){
        if(this.id){//获取需要编辑的地址
            this.$store.dispatch({
                type:GET_SHIPPINGS_DETAIL,
                payload:{
                    id:this.id
                }
            })
            .then(()=>{
                this.addressInfo = this.$store.getters.shippingDetail
            })
        }else{
            this.addressInfo = {}
        }
    },
    methods: {
        onSave(content) {
            // console.log(content)
            // return 
            const {name,province,city,addressDetail,tel,postalCode,county,areaCode} = content 
            let payload = {
                name:name,
                province:province,
                city:city,
                county:county,
                areaCode:areaCode,                    
                address:addressDetail,
                phone:tel,
                zip:postalCode
            }
            let actionType = ADD_SHIPPINGS   
            if(this.id){
                actionType = UPDATE_SHIPPINGS
                payload.id = this.id
            }

            this.$store.dispatch({
                type:actionType,
                payload:payload
            })
            .then(()=>{
                this.$toast.success({
                    message: this.isEdit ? '编辑地址成功' : '添加地址成功',
                    onClose:()=>{
                        this.$router.back()
                    }
                })                
            })
        },
        onDelete(content){
            this.$store.dispatch({
                type:DELETE_SHIPPINGS,
                payload:{
                    id:content.id
                }
            })
            .then(()=>{
                this.$toast.success({
                    message: '删除地址成功',
                    onClose:()=>{
                        this.$router.back()
                    }
                })                
            })
        }
    }
}

</script>
<style lang="less" scoped>
    .SaveAddress {
        .overlay-page;
        .address-wrap{
            margin-top: 50px;
        }
    }
</style>