/*
* @Author: Chen
* @Date:   2020-07-27 16:59:44
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-18 16:38:29
*/
// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'

import { reducer as loginReducer } from 'pages/login/store/index.js'
import { reducer as homeReducer } from 'pages/home/store/index.js'
import { reducer as userReducer } from 'pages/user/store/index.js'
import { reducer as categoryReducer } from 'pages/category/store/index.js'
import { reducer as productReducer } from 'pages/product/store/index.js'
import {reducer as adReducer} from 'pages/ad/store/index.js'
import {reducer as orderReducer} from 'pages/order/store/index.js'

export default combineReducers({
	login:loginReducer,
	home:homeReducer,
	user:userReducer,
	category:categoryReducer,
	product:productReducer,
	ad:adReducer,
	order:orderReducer,
})