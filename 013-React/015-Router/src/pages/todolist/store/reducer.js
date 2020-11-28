const { fromJS } = require('immutable');
//引入action_type
import { ADD_ITEM,CHANGE_INPUT,DEL_ITEM,LOAD_DATA } from './actionType'
const defaultState = fromJS({
    list:['吃饭','睡觉','敲代码xxx'],
    task:''
})

export default (state=defaultState,action)=>{
    // const newState = JSON.parse(JSON.stringify(state));//使用immutable来代替
    switch(action.type){
        case CHANGE_INPUT :
            // newState.task = action.payload;
            // return newState;
            return state.set('task',action.payload)
            break;
        case ADD_ITEM :
            // newState.list.push(state.task);
            // newState.task = '';
            // return newState;
            //既要修改又要list,又要置空task。多处修改用merge
            var list = [...state.get('list')]
            list.push(state.get('task'))
            return state.merge({
                list,
                task:''
            })
            break;
        case DEL_ITEM :
            // newState.list.splice(action.payload,1)
            // return newState;
            var list = [...state.get('list')]
            list.splice(action.payload,1)
            return state.set('list',list)
            break;
        case LOAD_DATA :
            // newState.list = action.payload
            // return newState;
            return state.set('list',action.payload)
            break;
        default:
            return state;
            break;
    }
}