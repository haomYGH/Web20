/*
* @Author: Chen
* @Date:   2020-08-03 15:20:31
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-18 16:39:01
*/

export const SERVER = 'http://127.0.0.1:3000';
export const UPLAOD_IMAGES = SERVER + '/products/images'
export const UPLOAD_DETAIL_IMAGES = SERVER + '/products/detailImages'
export const UPLOAD_AD_IMAGE = SERVER + '/ads/image'
export const API_CONFIG = {
	login: 						['/sessions/users','post'],
	logout: 					['/sessions/users','delete'],
	//用户列表
	getCounts: 					['/counts','get'],
	getUserList: 				['/users/list','get'],
	//分类管理
	addCategories: 				['/categories','post'],
	getLevelCategories: 		['/categories/levelCategories','get'],
	getCategoriesList: 			['/categories/list','get'],
	updateCategoriesName: 		['/categories/name','put'],
	updateMobileName: 			['/categories/mobileName','put'],
	updateOrder: 				['/categories/order','put'],
	updateIsShow: 				['/categories/isShow','put'],
	//新增商品
	addProducts: 				['/products','post'],
	getProductsList: 			['/products/list','get'],
	updateProductsOrder: 		['/products/order','put'],
	updateProductsIsShow: 		['/products/isShow','put'],
	updateProductsStatus: 		['/products/status','put'],
	updateProductsIsHot: 		['/products/isHot','put'],
	getProductDetail: 			['/products/detail','get'],
	updateProducts: 			['/products','put'],
	//广告api
	getAdsList:                  	["/ads/list","get"],
    getAdsDetail:                	["/ads/detail","get"],
    addAds:                      	["/ads","post"],
    updateAds:                  	["/ads","put"],
    updateAdsOrder:              	["/ads/order","put"],
    updateAdsIsShow:             	["/ads/isShow","put"],
    //订单api
    getOrdersList:               	["/orders/list","get"],
    getOrdersDetail:             	["/orders/detail","get"],
    updateOrdersStatus:          	["/orders/status","put"],
}