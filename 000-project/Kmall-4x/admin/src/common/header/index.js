import React from 'react'
import axios from 'axios'

import { getUserName,removeUserName } from '@util'
import './index.css'

//引入UI
import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined,LogoutOutlined } from '@ant-design/icons';
//子UI(引入UI里面的UI)
const { Header } = Layout;
const handleLogout = ()=>{
	axios({
		method:'delete',
		url:' http://127.0.0.1:3000/sessions/users',
		withCredentials:true//开启withCredentials后，服务器才能拿到你的cookie，当然后端服务器也要设置允许你获取
	})
	.then(result=>{
		const data = result.data;
		//退出成功
		if(data.code == 0){//后台session清除成功
			//1.清除本地存储的用户信息
			removeUserName()
			//2.页面跳转到登录页面
			window.location.href = '/login'
		}
	})
}
const menu = (
	<Menu>
		<Menu.Item 
			key="0"
			onClick={handleLogout}
		>
			<LogoutOutlined />退出
		</Menu.Item>
	</Menu>
);
const AdminHeader = (props)=>{
	return (
		<Header className="header">
			<div className="logo">Kmall管理页面</div>
			<Dropdown overlay={menu} trigger={['click']}>
				<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
					{getUserName()} <DownOutlined />
				</a>
			</Dropdown>
		</Header>
	)
}
export default AdminHeader