/*
* @Author: TomChen
* @Date:   2019-09-03 19:59:22
* @Last Modified by:   Tom
* @Last Modified time: 2019-11-08 15:34:24
*/
//所有模型都用this.$store.dispatch() 去派发action,所以命名时加上模型名称作为签字
export const GET_CARTS = 'cart_get_carts'
export const CLEAN_CARTS = 'cart_clean_carts'
export const ADD_CARTS = 'cart_add_carts'
export const UPDATE_CARTS_CHOICES = 'cart_update_carts_choices'
export const UPDATE_CARTS_COUNTS = 'cart_update_carts_counts'
export const DELETE_CARTS = 'cart_delete_carts'

