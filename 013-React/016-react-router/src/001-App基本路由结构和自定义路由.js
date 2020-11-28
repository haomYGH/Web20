import React, { Component } from 'react'

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
	Route,
	Switch
 } from 'react-router-dom'

class Home extends React.Component{
	render(){
		return <h2>this is Home</h2>
	}
}
class User extends React.Component{
	render(){
		// console.log(this.props.match.params.id)
		return <h2>this is User, userId : xxx{this.props.match.params.id}</h2>
	}
}
class Admin extends React.Component{
	render(){
		return (
			<Switch>
				<Route exact path="/admin" render={()=><h1>this is admin page</h1>}  />
				<Route exact path="/admin/article" render={()=><h1>this is admin article page</h1>}  />
				<Route path="/admin/:id" render={(props)=>{
					// console.log(props)//不可以通过this.props拿具体路由的参数,因为this.props是整个Switch，及this指的Admin
					return <h1>this is admin id{props.match.params.id} page</h1>
					}} 
				/>
			</Switch>
		)
	}
}
class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			isAdmin:false
		}
	}
    render(){
		/*
		//自定义路由ProtectRoute   ,参数使用对象的结构赋值，并重命名为大写的Component
		const ProtectRoute = ({component:Component,...rest})=>{
			// console.log(Component)//就是下面路由匹配的模板函数
			// console.log(...rest)//就是路由里面的其他参数。需要配置文件来解析代码
			return (
				<Route 
					{...rest}
					// render={()=>{ return <Component />}}//不想用return可以用圆括号代替花括号
					render={()=>(<Component />)}//不想用return可以用圆括号代替花括号
				/>
			)
		}*/
		//以上自定义路由简写为
		const ProtectRoute = ({component:Component,...rest})=>(
			<Route 
				{...rest}
				render={()=>(this.state.isAdmin ? <Component /> : <h2>请使用管理员登陆</h2>)}
			/>
		)
		return( 
			<Router>
				<div>
					<ul>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/todolist">TodoList</Link></li>
						<li><Link to="/user/123">User</Link></li>
						<li><Link to="/admin">Admin</Link></li>
						<li><Link to="/admin/article">Admin/Article</Link></li>
						<li><Link to="/admin/xf001">Admin/id</Link></li>
					</ul>
					{
						//路由匹配的核心↓
						//exact精确匹配
					}
					<div>
						<Route exact path="/" component={Home} />
						<Route path="/TodoList" component={TodoList} />
						<Route path="/user/:id" component={User} />
						<ProtectRoute path="/admin" component={Admin} />
					</div>
				</div>
			</Router>
		)
	}
}
export default connect(null,null)(App);