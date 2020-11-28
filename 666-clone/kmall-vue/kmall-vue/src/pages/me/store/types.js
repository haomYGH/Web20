/*
* @Author: TomChen
* @Date:   2019-09-03 19:59:22
* @Last Modified by:   Tom
* @Last Modified time: 2019-11-07 10:41:07
*/
//所有模型都用this.$store.dispatch() 去派发action,所以命名时加上模型名称作为签字
export const GET_USERINFO = 'me_get_userinfo'
export const GET_ORDERS_LIST = 'me_get_orders_list'
export const GET_ORDERS_DETAIL = 'me_get_orders_detail'
export const UPDATE_ORDERS_STATUS = 'me_update_orders_status'
export const UPDATE_ORDERS_PAY = 'me_update_orders_pay'

