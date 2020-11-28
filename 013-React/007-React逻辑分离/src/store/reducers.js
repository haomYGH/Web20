import store from ".";
const defaultState = {
    list:['吃饭','睡觉','敲代码xxx'],
    task:''
}

export default (state=defaultState,action)=>{
    if(action.type == 'chenge_input'){
        // state.task = action.payload;//错误写法，不能直接修改Store里面的数据，需要深度克隆后。修改克隆后的值
        const newState = JSON.parse(JSON.stringify(state));
        newState.task = action.payload;
        return newState
    }
    else if(action.type == 'add_item'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.push(state.task);
        newState.task = '';
        return newState
    }
    else if(action.type == 'del_item'){
        const newState = JSON.parse(JSON.stringify(state));
        console.log(action.payload);
        newState.list.splice(action.payload,1)
        return newState
    }    
    return state
}