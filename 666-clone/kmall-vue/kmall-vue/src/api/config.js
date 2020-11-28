/*
* @Author: TomChen
* @Date:   2019-08-22 16:20:08
* @Last Modified by:   Chen
* @Last Modified time: 2020-09-04 17:02:07
*/

// var SERVER = process.env.NODE_ENV === 'production' ? 'https://api.mall.kuazhu.com' : ''
var SERVER = process.env.NODE_ENV === 'development' ? 'https://api.mall.kuazhu.com' : ''
var VERSION = 'v1'
var API_CONFIG = {
    getArrayCategories:          ['/categories/arrayCategories','get'],
    getChildArrayCategories:     ['/categories/childArrayCategories','get'],
    getProductsList:             ['/products/list','get'],   
    getPositionAds:              ['/ads/positionAds','get'],
    getFloors:                   ['/floors','get'], 
    
    login:                       ['/users/login','post'],
    dynamicLogin:                ['/users/dynamicLogin','post'],
    logout:                      ['/users/logout','get'],
    register:                    ['/users','post'],
    checkUsername:               ['/users/checkUsername','get'],
    getRegisterVerifyCode:       ['/users/registerVerifyCode','get'],
    getLoginVerifyCode:          ['/users/loginVerifyCode','get'],
    getUserinfo:                 ['/users/info','get'],
    getCaptcha:                  ['/users/captcha','get'],
    getUsername:                 ['/users/username','get'],

    addCarts:                    ['/carts','post'],    
    getCartsCount:               ['/carts/count','get'],    
    getCarts:                    ['/carts','get'],    
    updateCartsChoices:          ['/carts/choices','put'],    
    deleteCarts:                 ['/carts','delete'],    
    updateCartsCounts:           ['/carts/counts','put'],

    addShippings:                ['/shippings','post'],      
    getShippingsList:            ['/shippings/list','get'],      
    deleteShippings:             ['/shippings','delete'],      
    getShippingsDetail:          ['/shippings/detail','get'],      
    updateShippings:             ['/shippings','put'],

    getOrdersProducts:           ['/orders/products','get'],
    addOrders:                   ['/orders','post'],
    getOrdersList:               ['/orders/list','get'],
    getOrdersDetail:             ['/orders/detail','get'],
    updateOrdersStatus:          ['/orders/status','put'],
    updateOrdersPay:             ['/orders/pay','put'], 
    getDeliverDetail:            ["/openapi.html","get"],

    getProductsDetail:           ['/products/detail','get'],            
 
}

module.exports = {
    API_CONFIG,
    SERVER,
    VERSION
}