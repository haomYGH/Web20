<template>
    <div class="app">
        <h3>ToDo List</h3>
        <Header 
            :addTodo="addTodo"
        />
        <List 
            :todos="todos"
            :delTodo="delTodo"
        />
        <Footer 
            :todos="todos"
            :selectAllTodo="selectAllTodo"
            :delSelectDone="delSelectDone"
        />
    </div>
</template>

<script>
import Header from './components/Header.vue'
import List from './components/List.vue'
import Footer from './components/Footer.vue'

export default {
    name: 'App',
    data(){
        return {
            todos:[
                {task:'睡觉',done:true},
                {task:'吃饭',done:false},
                {task:'敲代码',done:false},
            ]
        }
    },
    methods:{
        addTodo(todo){
            this.todos.unshift(todo)
        },
        delTodo(index){
            if(window.confirm('您确定要删除吗？')){
                this.todos.splice(index,1)
            }
        },
        selectAllTodo(v){
            this.todos.forEach(function(item){
                item.done = v
            })
        },
        delSelectDone(){
            // this.todos = this.todos.filter(item=>item.done != true)
            this.todos = this.todos.filter(item=>!item.done)
        }
    },
    components: {
        Header,
        List,
        Footer,
    }
}
</script>

<style>
    .app{
		width: 600px;
		margin: 100px auto;
	}
	.app h3{
		width: 100%;
		text-align: center;
		line-height: 30px;
	}
</style>
