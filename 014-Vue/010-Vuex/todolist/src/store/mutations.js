import {
    ADD_TODO,
    DEL_TODO,
    SELECT_ALL_TODO,
    DEL_SELECT_DONE_TODO,
} from './types.js'
//拿到action.js处理后的结果去操作数据
export default {
    //ADD_TODO用中括号包裹起来的原因：？
	[ADD_TODO](state,todo){
		state.todos.unshift(todo);//=>修改state里面的数据
    },
    [DEL_TODO](state,index){
		state.todos.splice(index,1)
	},
	[SELECT_ALL_TODO](state,v){
		state.todos.forEach(item=>{
			item.done = v
		})
	},
	[DEL_SELECT_DONE_TODO](state){
		state.todos = state.todos.filter(item=>!item.done)
	},
	
}