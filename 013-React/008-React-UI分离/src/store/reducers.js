import { ADD_ITEM,CHANGE_INPUT,DEL_ITEM } from './actionType'
const defaultState = {
    list:['吃饭','睡觉','敲代码xxx'],
    task:''
}

export default (state=defaultState,action)=>{
    if(action.type == CHANGE_INPUT){
        // state.task = action.payload;//错误写法，不能直接修改Store里面的数据，需要深度克隆后。修改克隆后的值,
        //newState会和原来的state对比，然后改变state。state一旦发生改变,就会触发store.subscribe修改state中的值,从而重新render
        const newState = JSON.parse(JSON.stringify(state));
        newState.task = action.payload;
        return newState
    }
    else if(action.type == ADD_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.push(state.task);
        console.log(newState.task);
        newState.task = '';
        return newState
    }
    else if(action.type == DEL_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.payload,1)
        return newState
    } 
    return state
}