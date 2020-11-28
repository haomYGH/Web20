// store里面的第一个参数是个函数,这个函数的第一参数是state（用来处理数据）；第二个参数是action（用来派发action）
//引入state
import reducer from './reducer'
//引入action
import * as actionTodoList from './actionCreators.js'
//
//导出state和action
export {
	reducer,
	actionTodoList//当action过多时，可以导出所有，并自定义名称
}