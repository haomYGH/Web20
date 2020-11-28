/*
* @Author: Chen
* @Date:   2020-07-24 15:14:16
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-08 10:44:33
*/
import React,{ Component,Fragment } from 'react'
import './index.css'
import { 
	Route, 
	Link ,
	Switch
} from "react-router-dom"

import ProductSave from './save.js';
import ProductList from './list.js';
import ProductDetail from './detail.js';

//容器组件
class Category extends Component{
	render(){
 		return (
			<div className="Category">
				<Switch>
					<Route path="/product/save/:productId?" component={ProductSave} />
					<Route path="/product/detail/:productId?" component={ProductDetail} />
					<Route path="/product" component={ProductList} />
				</Switch>
			</div>
		)
	}
}

export default Category