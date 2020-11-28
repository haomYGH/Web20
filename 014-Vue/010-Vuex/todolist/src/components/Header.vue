<template>
	<div class="header">
		<input 
			type="text"
			placeholder="请输入任务,按回车提交" 
			v-model="task"
			@keyup.enter="handleAdd" 
		>
	</div>
</template>
<script>
export default {
	name: 'Header',//导出此文件
	data(){
		return {
			task:''
		}
	},
	props: {//接收父组件传递过来的数据
		addTodo:Function
	},
	methods:{
		handleAdd(){
			//1.判断数据
			const task = this.task.trim();
			if(!task){
				return;
			}
			// 2.生成todo对象
			const todo = {
				task,
				done:false,//默认未选中
			}
			//3.插入
			this.$store.dispatch('addTodo',todo);//=>action.js
			//4.重置输入框
			this.task = '';

		}
	}
}
</script>
<style scoped>
	.header input{
		width: 100%;
		height: 30px;
		padding: 0 10px;
		box-sizing: border-box;
		outline: none;
	}
	.header{

		margin-bottom: 10px;
	}
</style>
