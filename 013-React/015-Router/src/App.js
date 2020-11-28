import React from 'react'

import './App.css'
//引入组件
import TodoList from './pages/todolist/index.js'

//使用React-Redux管理数据
import { connect } from 'react-redux'
//引入路由
import { 
	// HashRouter as Router,
	BrowserRouter as Router,
	Link,
	Route
 } from 'react-router-dom'

class Home extends React.Component{
	render(){
		return <h2>this is Home</h2>
	}
}
class App extends React.Component {
    render(){
		return( 
			<Router>
				<div>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/todolist">TodoList</Link>
						</li>
					</ul>
					{
						//路由匹配的核心↓
						//exact精确匹配
					}
					<div>
						<Route path="/TodoList" component={TodoList} />
						<Route exact path="/" component={Home} />
					</div>
				</div>
			</Router>
		)
	}
}
export default connect(null,null)(App);