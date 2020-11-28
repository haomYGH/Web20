import React,{ Component } from 'react'
import { connect } from 'react-redux'
import Layout from '@common/layout'
import './style.css'

import {Link} from 'react-router-dom'
import { Table,Button,Input,InputNumber,Switch,Divider } from 'antd';
import {actionCreators} from './store'

class Demo extends Component{
    componentDidMount(){
		this.props.handlePage(this.props.current)
	}
    render(){
        const columns = [
			{
				title: '商品名称',
				dataIndex: 'name',
				key: 'name',//查看详情通过点击name直接跳转到详情页
				// render:(name,record)=>{
				// 	return (
				// 		<a href={'/product/detail/'+record._id}>{name}</a>
				// 	)
				// }
			},
			{
				title: '是否首页显示',
				dataIndex: 'isShow',
                key: 'isShow',
                render:(isShow,record)=>{
					// console.log(isShow,record);//其中record是该条数据的所有数据
					return (
						<Switch 
							checkedChildren="是" 
							unCheckedChildren="否" 
							// loading={isFetching}//不能同名,我们这里只需要table有加载就行了
							defaultChecked={isShow=='0' ? false : true}
							onChange={(checked,ev)=>{
								// console.log(checked)
								const newIsShow = checked ? '1' : '0';
								handleUpdateIsShow(record._id,newIsShow)
							}}
						/>
					)
				}
			},
			{
				title: '上架/下架',
				dataIndex: 'status',
                key: 'status',
                render:(status,record)=>{
					return (
						<Switch 
							checkedChildren="上架" 
							unCheckedChildren="下架" 
							defaultChecked={status=='0' ? false : true}
							onChange = {(status,ev)=>{
								const newStatus = status ? '1' : '0';
								handleUpdateStatus(record._id,newStatus)
							}}
						/>
					)
				}
            },
            {
				title: '是否热卖',
				key: 'isHot',
                dataIndex: 'isHot',
                render:(isHot,record)=>{
					return (
						<Switch 
							checkedChildren="YES" 
							unCheckedChildren="NO" 
							defaultChecked={isHot=='0' ? false : true}
							onChange = {(isHot,ev)=>{
								const newIsHot = isHot ? '1' : '0';
								handleUpdateIsHot(record._id,newIsHot)
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
							min={0}
							onChange={(newOrder)=>{
								// console.log(newOrder)
								handleUpdateOrder(record._id,newOrder)
							}}
						/>
					)
				}
			},
			{
				title:'操作',
				render:(name,record)=>{
					return (
						<span>
							<Link to={'/product/save_edit/'+record._id}>编辑</Link>
							<Divider type="vertical"/>
							<Link to={'/product/detail/'+record._id}>详情</Link>
						</span>
					)
				}
			}
        ];
        const { 
			list,
			current,
			pageSize,
			total,
			keyword,
			handlePage,
			isFetching,

			handleUpdateIsShow,
			handleUpdateStatus,
			handleUpdateIsHot,
			handleUpdateOrder,
        } = this.props;
        const dataSource = list.toJS();
        dataSource.forEach((item,index)=>{
			item.key = index
        })
        // console.log(dataSource)
        return(
           <Layout>
                <Link to="/product/save_edit">
                    <Button type="primary" shape="round" size={'large'}>新增</Button>
                </Link>
                <Table
					className="listTable"
                    columns={columns}
                    dataSource={dataSource}
                    bordered
					loading={isFetching}
					pagination={{
						total:total,
						pageSize:pageSize,
						current:current,
						onChange:(page)=>{
							// console.log(page)
							handlePage(page)
						}
					}}
                />
           </Layout>
        )
    }
}
//将属性映射到组件
const mapStateToProps = (state)=>{
	return {
		list:state.get('product').get('list'),
		//分页
		current:state.get('product').get('current'),
		pageSize:state.get('product').get('pageSize'),
		total:state.get('product').get('total'),
		//搜索
		keyword:state.get('product').get('keyword'),
		//loading
		isFetching:state.get('product').get('isFetching'),
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>({
    handlePage:(page,keyword)=>{
        dispatch(actionCreators.getPageAction(page,keyword))
	},
	handleUpdateIsShow:(id,newIsShow)=>{
		// actionCreators.getUpdateIsShowAction(id,newIsShow)
		dispatch(actionCreators.getUpdateIsShowAction(id,newIsShow))
	},
	handleUpdateStatus:(id,newStatus)=>{
		dispatch(actionCreators.getUpdateStatusAction(id,newStatus))
	},
	handleUpdateIsHot:(id,newIsHot)=>{
		dispatch(actionCreators.getUpdateIsHotAction(id,newIsHot))
	},
	handleUpdateOrder:(id,newOrder)=>{
		dispatch(actionCreators.getUpdateOrderAction(id,newOrder))
	},
})

export default connect(mapStateToProps,mapDispatchToProps)(Demo)