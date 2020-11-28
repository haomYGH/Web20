/*
* @Author: Chen
* @Date:   2020-07-24 15:14:16
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-06 11:06:31
*/
import React,{ Component,Fragment } from 'react'
import './index.css'
import { Breadcrumb,Form, Select, Input, Button } from 'antd'
import axios from 'axios'
import { connect } from 'react-redux'
import moment from 'moment'

import { actionCreators } from './store/index.js'

const { Option } = Select

import AdminLayout from 'common/layout';

//容器组件
class CategoryAdd extends Component{
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount(){
		//加载最新父级分类
		this.props.handleLevelCategories()
	}
	handleSubmit(e){
    	e.preventDefault();
		this.props.form.validateFields((err, values) => {
		    if (!err) {
		        // console.log('Received values of form: ', values);
		        this.props.handleAddCategories(values)
		    }
		});
	}
	render(){
		const { getFieldDecorator } = this.props.form
		const { categories } = this.props
 		return (
			<div className="CategoryAdd">
				<AdminLayout>
					<Breadcrumb style={{ margin: '16px 0' }}>
				        <Breadcrumb.Item>首页</Breadcrumb.Item>
				        <Breadcrumb.Item>分类管理</Breadcrumb.Item>
				        <Breadcrumb.Item>新增分类</Breadcrumb.Item>
				    </Breadcrumb>
					<div className="content">
						<Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
					        <Form.Item label="父级分类">
					          {getFieldDecorator('pid', {
					            rules: [{ required: true, message: '请选择父级分类!!' }],
					          })(
					            <Select placeholder="父级分类">
					              <Option value="0">根分类</Option>
					              {
					              	categories.map((category)=>{
					              		return <Option key={category.get('_id')} value={category.get('_id')}>{category.get('name')}</Option>
					              	})
					              }
					            </Select>,
					          )}
					        </Form.Item>
					        <Form.Item label="分类名称">
					          {getFieldDecorator('name', {
					            rules: [{ required: true, message: '请选择分类名称!!' }],
					          })(<Input />)}
					        </Form.Item>
					        <Form.Item label="手机分类名称">
					          {getFieldDecorator('mobileName', {
					            rules: [{ required: true, message: '请选择手机分类名称!!' }],
					          })(<Input />)}
					        </Form.Item>
					        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
								<Button 
									type="primary"
									onClick={this.handleSubmit}
								>
								提交
								</Button>
					        </Form.Item>
					    </Form>
					</div>
				</AdminLayout>
			</div>
		)
	}
}
const WrappedCategoryAdd = Form.create({ name: 'coordinated' })(CategoryAdd)
//将属性映射到组件
const mapStateToProps = (state)=>{
	// console.log(state)
	return {
		categories:state.get('category').get('categories')
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handleAddCategories:(values)=>{
			dispatch(actionCreators.getAddCategoriesAction(values))
		},
		handleLevelCategories:()=>{
			dispatch(actionCreators.getLevelCategoriesAction())
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(WrappedCategoryAdd)