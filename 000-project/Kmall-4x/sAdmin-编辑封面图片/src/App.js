import React from 'react'
//引入前端路由
import { BrowserRouter, Route,Redirect,Switch,withRouter } from "react-router-dom";

import { getUserName } from '@util'
import './App.css'
//引入组件
//等价于引入 './@pages/login/index.js'
import Login from '@pages/login'
import Home from '@pages/home'
import User from '@pages/user'
import Category from '@pages/category'
import Product from '@pages/product'
import Err from '@common/err'

class App extends React.Component {
    render(){
		const HomeRoute = ({component:Component,...rest})=>(
			<Route 
				{...rest}
				render={()=>(
					getUserName() ? <Component /> : <Redirect to="/login" />
				)}
			/>
		)
		const LoginRoute = ({component:Component,...rest})=>(
			<Route 
				{...rest}
				render={()=>(
					getUserName() ? <Redirect to="/" /> : <Component />
				)}
			/>
		)	
		return( 
			<BrowserRouter>
				<Switch>
					<HomeRoute exact path="/" component={Home} />
					<HomeRoute path="/user" component={User} />
					<HomeRoute path="/category" component={Category} />
					<HomeRoute path="/product" component={Product} />
					<LoginRoute path="/login" component={Login} /> 
					<Route component={Err} />
				</Switch>
			</BrowserRouter>
		)
	}
}
export default App