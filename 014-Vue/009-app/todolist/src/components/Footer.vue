<template>
	<div class="footer">
		<input type="checkbox" v-model="allDone">
		<span>{{totalDone}}/{{total}}</span>
		<button @click="handleDelSelectDone">删除选中</button>
	</div>
</template>
<script>
export default {
	name: 'Footer',
	props:{
		todos:Array,
		selectAllTodo:Function,
		delSelectDone:Function,
	},
	computed:{
		total(){
			return this.todos.length
		},
		totalDone(){
			//https://www.runoob.com/jsref/jsref-reduce.html累加器
			//array.reduce(function(total, currentValue, currentIndex, arr), initialValue)//initial最初的
			return this.todos.reduce((total,item)=>{
				if(item.done){
					total++;
				}
				return total
			},0)
		},
		allDone:{
			get(){
				return this.totalDone == this.total && this.totalDone !=0
			},
			set(v){
				// console.log(v)//true,false
				this.selectAllTodo(v)
			}
		}
	},
	methods:{
		handleDelSelectDone(){
			if(window.confirm('您确定删除选中的任务吗？')){
				this.delSelectDone();
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
