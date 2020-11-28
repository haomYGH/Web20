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
			// console.log('hh')
			const task = this.task.trim();
			if(!task){
				return;
			}
			const todo = {
				task,
				done:false,//默认未选中
			}
			//插入
			this.addTodo(todo)
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
