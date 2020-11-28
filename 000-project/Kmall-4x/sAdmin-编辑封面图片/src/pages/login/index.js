import React from 'react'

import './index.css'
//引入UI
import { Form, Input, Button, Checkbox } from 'antd';
//使用React-Redux管理数据
import { connect } from 'react-redux'
import { actionCreator } from './store'
//组件开始
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 8 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 8 },
};

const Demo = (props) => {
	const onFinish = values => {
		props.handleLogin(values);
	};
	const onFinishFailed = errorInfo => {
		console.log('验证不通过failed::', errorInfo.values);
	};

	return (
	<Form
		{...layout}
		name="basic"
		initialValues={{ remember: true }}
		onFinish={onFinish}
		onFinishFailed={onFinishFailed}
	>
		<Form.Item
			label="Username"
			name="username"
			rules={[
				{ required: true, message: 'Please input your username!' },
				{ pattern: /^[a-z][a-z0-9_]{2,5}$/i, message: '用户名是以字母开头的3-6位字符' }
			]}
		>
		<Input />
		</Form.Item>

		<Form.Item
			label="Password"
			name="password"
			rules={[
				{ required: true, message: 'Please input your password!' },
				{ pattern: /^\w{3,6}$/i, message: '密码是3-6位任意字符' }
			]}
		>
		<Input.Password />
		</Form.Item>
		<Form.Item {...tailLayout}>
		<Button type="primary" htmlType="submit" loading={props.isFetching}>
			登录
		</Button>
		</Form.Item>
	</Form>
	);
};
//映射Store里面的state
const mapStateToProps = (state)=>{
	return{
		isFetching:state.get('login').get('isFetching')
	}
}
//映射Store里面的action并派发
const mapDispatchToProps = (dispatch)=>({
    handleLogin:(values)=>{
		//1.派发登录的action
		//2.其实这个登录的action是一个能够发送ajax请求的函数
		//3.dispatch能够派发函数是因为引用了redux-thunk
		//4.使用redux-thunk派发一个函数action的时候,会把dispatch方法自身传递到该函数action中
		const action = actionCreator.getLoginAction(values);
		dispatch(action)
	}
})  

export default connect(mapStateToProps,mapDispatchToProps)(Demo);