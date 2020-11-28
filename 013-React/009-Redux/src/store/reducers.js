//引入action_type
import { ADD_ITEM,CHANGE_INPUT,DEL_ITEM } from './actionType'
const defaultState = {
    list:['吃饭','睡觉','敲代码xxx'],
    task:''
}

export default (state=defaultState,action)=>{
    const newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case CHANGE_INPUT :
            newState.task = action.payload;
            return newState;
            break;
        case ADD_ITEM :
            newState.list.push(state.task);
            newState.task = '';
            return newState;
            break;
        case DEL_ITEM :
            newState.list.splice(action.payload,1)
            return newState;
            break;
        default:
            return state;
            break;
    }
}