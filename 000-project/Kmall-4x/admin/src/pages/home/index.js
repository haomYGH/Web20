import React,{ useEffect } from 'react'//代码解析

import './index.css'
//引入UI
import { Card,Row, Col } from 'antd';
import Layout from '@common/layout'
//子UI(引入UI里面的UI)

//使用React-Redux管理数据store
import { connect } from 'react-redux'
import { actionCreator } from './store'

//函数组件
const Demo = (props) => {
	// Similar to componentDidMount and componentDidUpdate:
	useEffect(() => {
		// Update the document title using the browser API
		props.handleCount()
	});	
	return (
		<Layout>
			<Row>
				<Col span={8}>
					<Card title="用户数量" bordered={false} style={{ width: 300 }}>
						{props.usernum}
					</Card>
				</Col>
				<Col span={8}>
					<Card title="商品数据" bordered={false} style={{ width: 300 }}>
						{props.productnum}
					</Card>
				</Col>
				<Col span={8}>
					<Card title="订单数量" bordered={false} style={{ width: 300 }}>
						{props.ordernum}
					</Card>
				</Col>
			</Row>
		</Layout>
	);
  }
  
//映射Store里面的state
const mapStateToProps = (state)=>{
	//这里没有简写省略return是为了方便打印state
	return{
		usernum:state.get('home').get('usernum'),
		productnum:state.get('home').get('productnum'),
		ordernum:state.get('home').get('ordernum'),
	}
}
//映射Store里面的action并派发
const mapDispatchToProps = (dispatch)=>({
	handleCount:()=>{
		const action = actionCreator.getCountAction()
		dispatch(action)
	}
})  

export default connect(mapStateToProps,mapDispatchToProps)(Demo);