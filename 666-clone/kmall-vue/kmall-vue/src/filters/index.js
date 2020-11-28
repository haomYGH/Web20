/*
* @Author: TomChen
* @Date:   2019-09-04 20:51:24
* @Last Modified by:   Tom
* @Last Modified time: 2019-11-06 18:10:59
*/
export default {
    formatPrice(price=0){
        return parseFloat(price).toFixed(2)
    },
    formatDate(date){
        return new Date(date).toLocaleString()
    }
}