import React from 'react'
import './App.css'
//引入UI组件
//简写
// import TodoList from './pages/todolist/index.js'
import TodoList from './pages/todolist'
import Home from './pages/home'
class App extends React.Component {
	
    render(){
		return( 
			<div>
				<TodoList />
				<Home />
			</div>
		)
	}
}
export default App;