/*
* @Author: Chen
* @Date:   2020-08-01 17:24:15
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-03 15:41:06
*/
import React,{ Component,Fragment } from 'react'
import './index.css'
import { Layout, Menu, Breadcrumb, Icon, Dropdown } from 'antd'
import { getUsername,removeUsername } from 'util';
import axios from 'axios'
import apiObj from 'api/index.js'


const { SubMenu } = Menu;
const { Header } = Layout
//容器组件
class AdminHeader extends Component{
	constructor(props){
		super(props)
		this.handleLogout = this.handleLogout.bind(this);
	}
	handleLogout(){
		apiObj.logout()
		.then(result=>{
			// console.log(result)
			const data = result.data;
			if(data.code == 0){//登录成功
				//1.清除前台用户状态信息
				removeUsername()
				//2.返回登录页面
				window.location.href = '/login';
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			console.log(err);
			message.error('请求失败,请稍后再试!!')
		})
		/*
		axios({
			method: 'delete',
			url: 'http://127.0.0.1:3000/sessions/users'
		})
		.then(result=>{
			// console.log(result)
			const data = result.data;
			if(data.code == 0){//登录成功
				//1.清除前台用户状态信息
				removeUsername()
				//2.返回登录页面
				window.location.href = '/login';
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			console.log(err);
			message.error('请求失败,请稍后再试!!')
		})
		*/

	}
	render(){
		const menu = (
			<Menu>
				<Menu.Item key="0" onClick = {this.handleLogout}>
				  	<Icon type="logout" />退出
				</Menu.Item>
			</Menu>
		)
 		return (
			<div className="AdminHeader">
				<Header className="header">
					<div className="logo">
						KMALL 后台管理系统
					</div>
					<div className="dropdown">
						<Dropdown overlay={menu} trigger={['click']}>
						    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
						      { getUsername() } <Icon type="down" />
						    </a>
						</Dropdown>
					</div>
			    </Header>
			</div>
		)
	}
}

export default AdminHeader