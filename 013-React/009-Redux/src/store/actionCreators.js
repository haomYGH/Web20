//引入action_type
import { ADD_ITEM,CHANGE_INPUT,DEL_ITEM } from './actionType'

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