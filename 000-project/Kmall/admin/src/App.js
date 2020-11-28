/*
* @Author: Chen
* @Date:   2020-07-24 15:14:16
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-18 16:38:05
*/
import React,{ Component,Fragment } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { getUsername } from 'util';


import { 
	BrowserRouter as Router,
	// HashRouter as Router,
	Route, 
	Link ,
	Switch,
	Redirect
} from "react-router-dom"

import Home from 'pages/home/index.js';
import Login from 'pages/login/index.js';
import User from 'pages/user/index.js';
import Category from 'pages/category/index.js';
import Product from 'pages/product/index.js';
import Ad from 'pages/ad'
import Order from 'pages/order'
import Err from 'common/err';

import apiObj from 'api/index.js';



//容器组件
class App extends Component{
	render(){
		// console.log(apiObj)
		const HomeRoute = ({ component: Component, ...rest }) => (
      		<Route 
      			{...rest} 
      			render={(props) => {
      				return getUsername() ? <Component /> : <Redirect to="/login" />
      			}}
        	/>
		)
		const LoginRoute = ({ component: Component, ...rest }) => (
      		<Route 
      			{...rest} 
      			render={(props) => {
      				return getUsername() ? <Redirect to="/" /> : <Component />
      			}}
        	/>
		)
 		return (
 			<Router forceRefresh={true}>
	 			<div className="App">
	 				<Switch>
						<HomeRoute exact path="/" component={Home} />
						<HomeRoute path="/user" component={User} />
						<HomeRoute path="/category" component={Category} />
						<HomeRoute path="/product" component={Product} />
						<HomeRoute path='/ad' component={Ad} />
						<HomeRoute path='/order' component={Order} />
						<LoginRoute path="/login" component={Login} />
						<Route component={Err} />
					</Switch>
				</div>
			</Router>
		)
	}
}

export default connect(null,null)(App)