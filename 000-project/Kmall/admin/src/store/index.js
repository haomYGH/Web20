/*
* @Author: Chen
* @Date:   2020-07-27 16:38:20
* @Last Modified by:   Chen
* @Last Modified time: 2020-07-28 17:16:22
*/
import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducer.js'

const middlewares = [];
middlewares.push(thunk)

//自定义配置logger
const logger = createLogger({
  	
})
//logger只在开发环境下显示
if (process.env.NODE_ENV === `development`) {
  	middlewares.push(logger);
}
const store = createStore(reducer,applyMiddleware(...middlewares))

export default store