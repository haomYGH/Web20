// const urlBase = 'https://api.mall.kuazhu.com'

export const API_CONFIG = {
	//登录-注册-退出
	login: 						['/users/login','post'],
	logout: 					['/sessions/users','delete'],
	//获取验证码
	captcha: 					['/users/captcha','get'],
	//获取用户状态
	getUserName: 				['users/username','get'],
	//获取用户数据
	getUserInfo: 				['users/info','get'],
	//首页
	getHomeAds: 				['/ads/positionAds?position=2','get'],
	getHotCategories: 			['/categories/arrayCategories?limit=10','get'],
    getHomeFloors: 				['/floors?limit=10','get'],
    //分类页面
    getCategorySide: 			['/categories/arrayCategories?limit=20','get'],
	getCategoryContent: 		['/categories/childArrayCategories?limit=20&','get'],
	//列表页
	getListContent: 			['/products/list?limit=4&start=0&','get'],
	//详情页
	getDetailData: 				['/products/detail','get'],
	//购物车
	getCartsData: 				['/carts','get'],
	addCart:					['/carts','post'],
	choices:					['/carts/choices','put'],
	counts:						['/carts/counts','put'],
	carts:						['/carts','delete'],
	//订单确认
	getShippingsList:			['/shippings/list','get'],
	getProductsData:			['/orders/products','get'],
	//添加地址
	saveAddress:			['/shippings','post'],
}