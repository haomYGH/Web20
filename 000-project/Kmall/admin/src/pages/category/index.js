/*
* @Author: Chen
* @Date:   2020-07-24 15:14:16
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-04 11:16:33
*/
import React,{ Component,Fragment } from 'react'
import './index.css'
import { 
	Route, 
	Link ,
	Switch
} from "react-router-dom"

import CategoryAdd from './add.js';
import CategoryList from './list.js';

//容器组件
class Category extends Component{
	render(){
 		return (
			<div className="Category">
				<Switch>
					<Route path="/category/add" component={CategoryAdd} />
					<Route path="/category" component={CategoryList} />
				</Switch>
			</div>
		)
	}
}

export default Category