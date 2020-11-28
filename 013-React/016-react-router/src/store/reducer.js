// import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutable';
//引入组件数据
// import {reducer as todolistReducer} from '../pages/todolist/store/index.js'
import {reducer as todolistReducer} from '../pages/todolist/store'
//合并state
/*
const App = combineReducers({
    todolist:todolistReducer
})
export default App;
*/
export default combineReducers({
    todolist:todolistReducer
})