/*
* @Author: Chen
* @Date:   2020-07-24 15:14:16
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-08 11:03:43
*/
import React,{ Component,Fragment } from 'react'
import './index.css'
import { Breadcrumb,Form, Select, Input, Button,InputNumber } from 'antd'
import axios from 'axios'
import { connect } from 'react-redux'
import moment from 'moment'


import { actionCreators } from './store/index.js'
import {UPLAOD_IMAGES,UPLOAD_DETAIL_IMAGES} from 'api/config.js' 

const { Option } = Select

import AdminLayout from 'common/layout';
import UploadImages from 'common/upload-images/'
import RichEditor from 'common/rich-editor'

//容器组件
class ProductDetail extends Component{
	constructor(props){
		super(props)
		this.state = {
			productId:this.props.match.params.productId
		}
	}
	componentDidMount(){
		//获取商品详情信息
		if(this.state.productId){
			this.props.handleProductDetail(this.state.productId)
		}
	}
	render(){
		const { getFieldDecorator } = this.props.form
		const { 
			categoryName,
			name,
			description,
			price,
			stock,
			mainImage,
			images,
			detail,

		} = this.props
		//处理商品图片回传
		let imagesList = [];
		if(images){
			imagesList = images.split(',').map((url,index)=>{
				return <li key={index}><img src={url} /></li>
			})
		}
 		return (
			<div className="ProductDetail">
				<AdminLayout>
					<Breadcrumb style={{ margin: '16px 0' }}>
				        <Breadcrumb.Item>首页</Breadcrumb.Item>
				        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
				        <Breadcrumb.Item>商品详情</Breadcrumb.Item>
				    </Breadcrumb>
					<div className="content">
						<Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
					        <Form.Item label="商品分类">
					           <Input value={categoryName} disabled={true} />
					        </Form.Item>
					        <Form.Item label="商品名称">
					          <Input value={name} disabled={true} />
					        </Form.Item>
					        <Form.Item label="商品描述">
					          <Input value={description} disabled={true} />
					        </Form.Item>
					        <Form.Item label="商品价格">
					          <InputNumber value={price} disabled={true} min={0} />
					        </Form.Item>
					        <Form.Item label="商品库存">
					          <InputNumber value={stock} disabled={true} min={0} />
					        </Form.Item>
					        <Form.Item label="封面图片">
								{
									mainImage ? <ul className="imageBox"><li><img src={mainImage} /></li></ul> : null
								}
					        </Form.Item>
					        <Form.Item label="商品图片">
					        	<ul className="imageBox">{imagesList ? imagesList : null}</ul>
					        </Form.Item>
					        <Form.Item label="商品详情">
					        	<div dangerouslySetInnerHTML={{__html: detail}} />
					        </Form.Item>
					    </Form>
					</div>
				</AdminLayout>
			</div>
		)
	}
}
const WrappedProductDetail = Form.create({ name: 'coordinated' })(ProductDetail)
//将属性映射到组件
const mapStateToProps = (state)=>{
	// console.log(state)
	return {
		//获取商品详情
		categoryName:state.get('product').get('categoryName'),
		name:state.get('product').get('name'),
		description:state.get('product').get('description'),
		price:state.get('product').get('price'),
		stock:state.get('product').get('stock'),
		mainImage:state.get('product').get('mainImage'),
		images:state.get('product').get('images'),
		detail:state.get('product').get('detail'),
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handleProductDetail:(id)=>{
			dispatch(actionCreators.getProductDetailAction(id))
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(WrappedProductDetail)