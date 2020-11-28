/*
* @Author: Chen
* @Date:   2020-07-24 15:14:16
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-07 11:44:26
*/
import React,{ Component,Fragment } from 'react'
import './index.css'
import { Breadcrumb,Table, Divider, Tag,Button,Input,InputNumber,Switch } from 'antd'
import axios from 'axios'
import { connect } from 'react-redux'
import moment from 'moment'
import { 
	Link ,
} from "react-router-dom"

import { actionCreators } from './store/index.js'

import AdminLayout from 'common/layout';

//容器组件
class CategoryList extends Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.handlePage(1)
	}
	render(){
		const columns = [
			{
				title: '分类名称',
				dataIndex: 'name',
				width:"40%",
				key: 'name',
				render: (name,record) => {
					return (
						<Input 
							style={{width:"60%"}}
							defaultValue={name}
							onBlur={(ev)=>{
								// console.log(record)
								if(name != ev.target.value){
									handleUpdateCategories(record._id,ev.target.value)
								}
							}}
						/>
					)
				}
			},
			{
				title: '手机分类',
				dataIndex: 'mobileName',
				width:"30%",
				key: 'mobileName',
				render: (mobileName,record) => {
					return (
						<Input 
							defaultValue={mobileName}
							style={{width:"60%"}}
							onBlur={(ev)=>{
								if(name != ev.target.value){
									handleUpdateMobileName(record._id,ev.target.value)
								}
							}}
						/>
					)
				}
			},
			{
				title: '是否显示',
				dataIndex: 'isShow',
				key: 'isShow',
				render:(isShow,record)=>{
					return (
						<Switch 
							checkedChildren="显示" 
							unCheckedChildren="隐藏" 
							defaultChecked={isShow=='0' ? false : true}
							onChange={(checked)=>{
								const isShow = checked ? '1' : '0'
								handleUpdateIsShow(record._id,isShow)
							}}
						/>
					)
				}
			},
			{
				title: '排序',
				key: 'order',
				dataIndex: 'order',
				render: (order,record) => {
					return (
						<InputNumber 
							defaultValue={order}
							onBlur={(ev)=>{
								if(name != ev.target.value){
									handleUpdateOrder(record._id,ev.target.value)
								}
							}}
						/>
					)
				}
			},
		];
		const { 
			list,
			current,
			pageSize,
			total,
			handlePage,
			isFetching ,
			handleUpdateCategories,
			handleUpdateMobileName,
			handleUpdateOrder,
			handleUpdateIsShow
		} = this.props;
		const dataSource = list.toJS()
		// console.log(dataSource)
 		return (
			<div className="CategoryList">
				<AdminLayout>
					<Breadcrumb style={{ margin: '16px 0' }}>
				        <Breadcrumb.Item>首页</Breadcrumb.Item>
				        <Breadcrumb.Item>分类管理</Breadcrumb.Item>
				        <Breadcrumb.Item>分类列表</Breadcrumb.Item>
				    </Breadcrumb>
				    <div className="btn">
				    	<Link to="/category/add"><Button type="primary btn-add">新增分类</Button></Link>
				    </div>
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
		list:state.get('category').get('list'),
		current:state.get('category').get('current'),
		pageSize:state.get('category').get('pageSize'),
		total:state.get('category').get('total'),
		isFetching:state.get('category').get('isFetching'),
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handlePage:(page)=>{
			dispatch(actionCreators.getPageAction(page))
		},
		handleUpdateCategories:(id,newName)=>{
			dispatch(actionCreators.getUpdateCategoriesAction(id,newName))
		},
		handleUpdateMobileName:(id,newMobileName)=>{
			dispatch(actionCreators.getUpdateMobileNameAction(id,newMobileName))
		},
		handleUpdateOrder:(id,newOrder)=>{
			dispatch(actionCreators.getUpdateOrderAction(id,newOrder))
		},
		handleUpdateIsShow:(id,newIsShow)=>{
			dispatch(actionCreators.getUpdateIsShowAction(id,newIsShow))
		},
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)