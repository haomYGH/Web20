/*
* @Author: Chen
* @Date:   2020-07-24 15:14:16
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-04 10:18:01
*/
import React,{ Component,Fragment } from 'react'
import './index.css'
import { Breadcrumb,Table, Divider, Tag } from 'antd'
import axios from 'axios'
import { connect } from 'react-redux'
import moment from 'moment'

import { actionCreators } from './store/index.js'

import AdminLayout from 'common/layout';

//容器组件
class User extends Component{
	componentDidMount(){
		this.props.handlePage(1)
	}
	render(){
		const columns = [
			{
				title: '用户名',
				dataIndex: 'username',
				key: 'username',
				render: username => <a>{username}</a>,
			},
			{
				title: '是否是管理员',
				dataIndex: 'isAdmin',
				key: 'isAdmin',
				render:(isAdmin)=>(isAdmin ? '是' : '否')
			},
			{
				title: '邮箱',
				dataIndex: 'email',
				key: 'email',
			},
			{
				title: '电话',
				key: 'phone',
				dataIndex: 'phone',
			},
			{
				title: '创建时间',
				key: 'createdAt',
				dataIndex: 'createdAt',
			},
		];
		const { list,current,pageSize,total,handlePage,isFetching } = this.props;
		const dataSource = list.map((item)=>{
			// console.log(item)
			return {
				key: item.get('_id'),
			    username: item.get('username'),
			    isAdmin: item.get('isAdmin'),
			    email: item.get('email'),
			    phone: item.get('phone'),
			    createdAt:moment(item.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')
			}
		}).toJS()
 		return (
			<div className="User">
				<AdminLayout>
					<Breadcrumb style={{ margin: '16px 0' }}>
				        <Breadcrumb.Item>首页</Breadcrumb.Item>
				        <Breadcrumb.Item>用户列表</Breadcrumb.Item>
				    </Breadcrumb>
					<div className="content">
						<Table 
							columns={columns} 
							dataSource={dataSource} 
							loading={isFetching}
							pagination={{
								total:total,
								pageSize:pageSize,
								current:current
							}}
							onChange={(page)=>{
								handlePage(page.current)
							}}
						/>
					</div>
				</AdminLayout>
			</div>
		)
	}
}
//将属性映射到组件
const mapStateToProps = (state)=>{
	// console.log(state)
	return {
		list:state.get('user').get('list'),
		current:state.get('user').get('current'),
		pageSize:state.get('user').get('pageSize'),
		total:state.get('user').get('total'),
		isFetching:state.get('user').get('isFetching'),
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handlePage:(page)=>{
			dispatch(actionCreators.getPageAction(page))
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(User)