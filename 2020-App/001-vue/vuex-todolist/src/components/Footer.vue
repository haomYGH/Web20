<template>
	<div class="footer">
		<input type="checkbox" v-model="allDone">
		<span>{{totalDone}}/{{total}}</span>
		<button @click="handleDelSelectDoneTodo">删除选中</button>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	import { SELECT_ALL_TODO,DEL_SELECT_DONE_TODO } from '../store/types.js'
	export default {
		name: 'Footer',
		computed:{
			/*
			//只读取
			total(){
				return this.$store.getters.total
			},
			totalDone(){
				return this.$store.getters.totalDone
			},
			*/
			//只读取 简写
			...mapGetters([
				'total',
				'totalDone',
			]),
			allDone:{
				get(){
					return this.$store.getters.allDone
				},
				set(v){
					//this.selectAllTodo(v)
					this.$store.dispatch(SELECT_ALL_TODO,v)
				}
			}
		},
		methods:{
			handleDelSelectDoneTodo(){
				if(window.confirm('您确定要删除选中的任务吗?')){
					this.$store.dispatch(DEL_SELECT_DONE_TODO)
				}
			}
		}
		
	}
</script>

<style scoped>
    .footer{
		width: 100%;
		line-height: 40px;
	}
	.footer input{
        vertical-align: middle;
	}
	.footer button{
        float: right;
        margin-top: 5px;
	}		
</style>
