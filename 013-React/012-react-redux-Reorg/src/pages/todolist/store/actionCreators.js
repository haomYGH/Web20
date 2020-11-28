//这里是Reducer的第2个参数,action(一般是对象，配置thunck后可以是函数)
import axios from 'axios'
//引入action_type
import { ADD_ITEM,CHANGE_INPUT,DEL_ITEM,LOAD_DATA } from './actionType'

//因为派发action可能需要传递参数，所有不能直接导出一个对象，可以导出一个函数,返回值是对象
export const getChangeInput = (val)=>{
    return {
        type:CHANGE_INPUT,
        payload:val
    }
}
export const getAddItem = ()=>{
    return {
        type:ADD_ITEM
    }
}
export const getDelItem = (index)=>{
    return {
        type:DEL_ITEM,
        payload:index
    }
}
export const loadInitAxiosData = (payload)=>{
	return {
		type:LOAD_DATA,
		payload
	}
}
export const getAxiosData = ()=>{
	return (dispatch)=>{
		axios
		.get('http://127.0.0.1:3000/')
		.then(result=>{
			const action = loadInitAxiosData(result.data);
			dispatch(action)//这里为啥要派发,因为只能派发对象，我们可以在函数里面拿到数据后再真正派发action
		})
	}
}