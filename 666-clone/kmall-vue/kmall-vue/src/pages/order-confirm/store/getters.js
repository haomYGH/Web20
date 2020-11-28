/*
* @Author: TomChen
* @Date:   2019-09-03 19:20:11
* @Last Modified by:   Chen
* @Last Modified time: 2020-09-11 15:48:57
*/
//store 的计算属性
//所有的组件都挂载到this.$store.getters上,所以命名不能冲突
export default {
    shippingList(state){
        return state.shippings.map((shipping,index)=>({
            id:shipping._id,
            name:shipping.name,
            tel:shipping.phone,
            isDefault:index == 0 ? true : false,
            address:shipping.province+shipping.city+ (shipping.county || '') +shipping.address
        }))        
    },
    shippingDetail(state){
        const {_id,name,phone,province,city,county,address,areaCode,zip} = state.shipping
        return {
            id:_id,
            name:name,
            tel:phone,
            province:province,
            city:city,
            county:county,
            addressDetail:address,
            areaCode:areaCode,
            postalCode:zip
        }
    },
    ordersProducts(state){
        return state.ordersProducts
    }
}