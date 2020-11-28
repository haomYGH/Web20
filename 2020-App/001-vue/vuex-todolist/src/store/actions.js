import {
	ADD_TODO,
    DEL_TODO,
    SELECT_ALL_TODO,
    DEL_SELECT_DONE_TODO,
} from './types.js'

//组件中用由this.$store.dispatch方法来派发action,action中用commit来提交mutation
//action中可以包含异步操作
export default {
    [ADD_TODO]({commit},todo){
        commit(ADD_TODO,todo);//=>mutations.js
    },
    [DEL_TODO]({commit},index){
        commit(DEL_TODO,index);
    },
    [SELECT_ALL_TODO]({commit},v){
        commit(SELECT_ALL_TODO,v);
    },
    [DEL_SELECT_DONE_TODO]({commit}){
        commit(DEL_SELECT_DONE_TODO);
	},
}