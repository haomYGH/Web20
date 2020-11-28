<template>
    <div 
        class="item"
        :style="{background:bgColor}"
        @mouseenter="handleShow(true)"
		@mouseleave="handleShow(false)" 
    >
        <input type="checkbox" v-model="todo.done">
        <span>{{todo.task}}</span>
        <button v-show="isShow" @click="delTodo(index)">删除</button>
    </div>
</template>
<script>
import { DEL_TODO } from '../store/types.js'
export default {
    name:'Item',
    data(){
        return {
            bgColor:'#fff',
            isShow:false
        }
    },
    props:{
        todo:Object,
        index:Number,
    },
    methods:{
        handleShow(flag){
            this.bgColor =  flag ?  '#ddd' : '#fff'
            this.isShow = flag
        },
        delTodo(index){
            this.$store.dispatch(DEL_TODO,index)
        }
    }
}
</script>
<style scoped>
    .item{
        width: 100%;
        line-height: 35px;
		border: 1px dashed #ccc;
		margin-bottom: 5px;
	}
	.item input{
        vertical-align: middle;
        margin-right: 10px;
	}
	.item button{
        float: right;
        margin-top: 5px;
	}	
</style>