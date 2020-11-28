import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';//使action可以是函数
import { createLogger } from 'redux-logger';
//分离逻辑
import reducer from './reducer'
//1.store是负责整个数据的管理(获取最新的state,派发action,监听state的改变)
//2.整个应用只有一个store
//3.创建store时第一个参数需要传入一个函数(reducer)

const middleware = [thunk];//Actions must be plain objects. Use custom middleware for async actions
/*
if(process.env.NODE_ENV != 'production'){
	const logger = createLogger({});//自定义配置,作用是在控制台显示action状态
	middleware.push(logger);//将此配置加到middleware数组里面
}
*/
//store
const store = createStore(reducer,applyMiddleware(...middleware))

export default store