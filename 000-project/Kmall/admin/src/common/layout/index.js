/*
* @Author: Chen
* @Date:   2020-08-01 17:24:15
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-01 17:38:17
*/
import React,{ Component,Fragment } from 'react'
import './index.css'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'

import AdminHeader from 'common/header'
import AdminSider from 'common/sider'


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout

//容器组件
class AdminLayout extends Component{
	render(){
 		return (
			<div className="AdminLayout">
				<Layout>
				    <AdminHeader />
				    <Layout>
				      <AdminSider />
				      <Layout style={{ padding: '0 24px 24px' }}>
				        <Content
				          style={{
				            background: '#fff',
				            padding: 24,
				            margin: 0,
				            minHeight: 280,
				          }}
				        >
				          {this.props.children}
				        </Content>
				      </Layout>
				    </Layout>
				</Layout>
			</div>
		)
	}
}

export default AdminLayout