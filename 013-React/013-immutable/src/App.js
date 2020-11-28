import React from 'react'

import './App.css'
//引入组件
import TodoList from './pages/todolist/index.js'

//使用React-Redux管理数据
import { connect } from 'react-redux'

class App extends React.Component {
	
    render(){
		return( 
			<TodoList />
		)
	}
}
export default connect(null,null)(App);