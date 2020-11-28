/*
* @Author: Chen
* @Date:   2020-07-24 15:14:16
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-08 10:22:56
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
class ProductSave extends Component{
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			productId:this.props.match.params.productId
		}
	}
	componentDidMount(){
		//加载最新商品分类
		this.props.handleLevelCategories()
		//根据页面是否有ID判断是新增商品还是编辑商品
		if(this.state.productId){
			this.props.handleProductDetail(this.state.productId)
		}
	}
	handleSubmit(e){
    	e.preventDefault();
		this.props.form.validateFields((err, values) => {
	        // console.log('Received values of form: ', values);
	        values.id = this.state.productId;
	        this.props.handleSave(err,values)
		});
	}
	render(){
		const { getFieldDecorator } = this.props.form
		const { 
			categories,

			handleMainImage,
			handleImages,
			handleDetail,

			mainImageValidateStatus,
			mainImageHelp,
			imagesValidateStatus,
			imagesHelp,

			category,
			name,
			description,
			price,
			stock,
			mainImage,
			images,
			detail,

		} = this.props
		//处理封面图片回传
		let mainImageList = [];
		if(mainImage){
			mainImageList.push({
				uid: '0',
		        name: 'image.png',
		        status: 'done',
		        url:mainImage,
		        response:{
		        	url:mainImage
		        }
			})
		}
		//处理商品图片回传
		let imagesList = [];
		if(images){
			imagesList = images.split(',').map((url,index)=>{
				return {
					uid: index,
			        name: 'image.png',
			        status: 'done',
			        url:url,
			        response:{
			        	url:url
			        }
				}
			})
		}
		// console.log(imagesList)
 		return (
			<div className="ProductSave">
				<AdminLayout>
					<Breadcrumb style={{ margin: '16px 0' }}>
				        <Breadcrumb.Item>首页</Breadcrumb.Item>
				        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
				        {
				        	this.state.productId ? <Breadcrumb.Item>编辑商品</Breadcrumb.Item> : <Breadcrumb.Item>新增商品</Breadcrumb.Item>
				        }
				    </Breadcrumb>
					<div className="content">
						<Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
					        <Form.Item label="商品分类">
					          {getFieldDecorator('category', {
					            rules: [{ required: true, message: '请选择商品分类!!' }],
					            initialValue:category
					          })(
					            <Select placeholder="商品分类">
					              {
					              	categories.map((category)=>{
					              		return <Option key={category.get('_id')} value={category.get('_id')}>{category.get('name')}</Option>
					              	})
					              }
					            </Select>,
					          )}
					        </Form.Item>
					        <Form.Item label="商品名称">
					          {getFieldDecorator('name', {
					            rules: [{ required: true, message: '请填写商品名称!!' }],
					          	initialValue:name
					          })(<Input />)}
					        </Form.Item>
					        <Form.Item label="商品描述">
					          {getFieldDecorator('description', {
					            rules: [{ required: true, message: '请填写商品描述!!' }],
					          	initialValue:description
					          })(<Input />)}
					        </Form.Item>
					        <Form.Item label="商品价格">
					          {getFieldDecorator('price', {
					            rules: [{ required: true, message: '请填写商品价格!!' }],
					          	initialValue:price
					          })(<InputNumber min={0} />)}
					        </Form.Item>
					        <Form.Item label="商品库存">
					          {getFieldDecorator('stock', {
					            rules: [{ required: true, message: '请填写商品库存!!' }],
					          	initialValue:stock
					          })(<InputNumber min={0} />)}
					        </Form.Item>
					        <Form.Item 
					        	label="封面图片"
					        	required={true}
					        	validateStatus={mainImageValidateStatus}
					        	help={mainImageHelp}
					        >
								<UploadImages 
									action={UPLAOD_IMAGES}
									max={1}
									getFileList = {(fileList)=>{
										handleMainImage(fileList)
									}}
									fileList = {mainImageList}
								/>
					        </Form.Item>
					        <Form.Item 
					        	label="商品图片"
					        	required={true}
					        	validateStatus={imagesValidateStatus}
					        	help={imagesHelp}
					        >
					        	<UploadImages 
									action={UPLAOD_IMAGES}
									max={8}
									getFileList = {(fileList)=>{
										handleImages(fileList)
									}}
									fileList = {imagesList}
								/>
					        </Form.Item>
					        <Form.Item label="商品详情">
					        	<RichEditor 
					        		url={UPLOAD_DETAIL_IMAGES}
					        		getValues={(values)=>{
					        			handleDetail(values)
					        		}}
					        		values ={ detail }
					        	/>
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
const WrappedProductSave = Form.create({ name: 'coordinated' })(ProductSave)
//将属性映射到组件
const mapStateToProps = (state)=>{
	// console.log(state)
	return {
		categories:state.get('product').get('categories'),
		mainImageValidateStatus:state.get('product').get('mainImageValidateStatus'),
		mainImageHelp:state.get('product').get('mainImageHelp'),
		imagesValidateStatus:state.get('product').get('imagesValidateStatus'),
		imagesHelp:state.get('product').get('imagesHelp'),
		//获取商品详情
		category:state.get('product').get('category'),
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
		handleSave:(err,values)=>{
			dispatch(actionCreators.getSavePrductsAction(err,values))
		},
		handleLevelCategories:()=>{
			dispatch(actionCreators.getLevelCategoriesAction())
		},
		handleMainImage:(mainImage)=>{
			dispatch(actionCreators.getMainImageAction(mainImage))
		},
		handleImages:(images)=>{
			dispatch(actionCreators.getImagesAction(images))
		},
		handleDetail:(values)=>{
			dispatch(actionCreators.getDetailAction(values))
		},
		handleProductDetail:(id)=>{
			dispatch(actionCreators.getProductDetailAction(id))
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(WrappedProductSave)