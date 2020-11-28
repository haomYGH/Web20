/*
* @Author: Chen
* @Date:   2020-07-24 15:14:16
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-03 11:23:03
*/
import React,{ Component,Fragment } from 'react'
import './index.css'
import {  Breadcrumb, Icon,Card,Row, Col } from 'antd'
import axios from 'axios'
import { connect } from 'react-redux'

import { actionCreators } from './store/index.js'

import AdminLayout from 'common/layout';

//容器组件
class AdminHome extends Component{
	componentDidMount(){
		//发送请求获取统计数据
		this.props.handleCount();
	}
	render(){
		const { usernum,productnum,ordernum } = this.props;
 		return (
			<div className="AdminHome">
				<AdminLayout>
					<Breadcrumb style={{ margin: '16px 0' }}>
				        <Breadcrumb.Item>首页</Breadcrumb.Item>
				    </Breadcrumb>
					<div className="content">
						<Row>
					      	<Col span={8}>
					      		<Card title="用户数" style={{ width: 300 }}>
									<p>{usernum}</p>
							    </Card>
					      	</Col>
					      	<Col span={8}>
					      		<Card title="商品数" style={{ width: 300 }}>
									<p>{productnum}</p>
							    </Card>
					      	</Col>
					      	<Col span={8}>
					      		<Card title="订单数" style={{ width: 300 }}>
									<p>{ordernum}</p>
							    </Card>
					      	</Col>
					    </Row>
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
		usernum:state.get('home').get('usernum'),
		productnum:state.get('home').get('productnum'),
		ordernum:state.get('home').get('ordernum'),
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handleCount:()=>{
			dispatch(actionCreators.getCountsAction())
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(AdminHome)