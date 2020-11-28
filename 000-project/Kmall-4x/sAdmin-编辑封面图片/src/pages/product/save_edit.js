import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Select,InputNumber } from 'antd';
import Layout from '@common/layout'
import UploadImgs from '@common/upload-image'
import RichEditor from '@common/rich-editor'

import { actionCreators } from './store/index.js'
import { UPLAOD_IMAGES,UPLAOD_PRODUCT_DETAIL_IMAGES } from '@api'

const { Option } = Select;
const layout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 5,
        span: 16,
    },
};

class Demo extends React.Component {
    formRef = React.createRef();
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            productId:this.props.match.params.productId,
        }
    }
    componentDidMount(){
		//加载最新商品分类
        this.props.handleLevelCategories()
        //如果有id传过来则为编辑商品,我们需要获取该id下的商品信息然后回传
		if(this.state.productId){
            this.props.handleProductEdit(this.state.productId);
        }
    }
    componentDidUpdate(prevProps, prevState,snapshot){
        /*
        if(this.state.productId){
            this.formRef.current.setFieldsValue({
                "category":this.props.category,
                "name":this.props.name,
                "description":this.props.description,
                "price":this.props.price,
                "stock":this.props.stock,

                // "productDetail":this.props.detail,
            })
        }
        */
        // console.log(this.props)
    }
    handleSubmit(){
        let valuesForm = null;
        this.formRef.current.validateFields()
        .then(values => {
            // this.props.handleSave(values)
            valuesForm=values;
            this.props.handleErrorInfo(false)//如果表单修改后正确，则更新状态
        })
        .catch(err => {
            // console.log('Validate Failed:', err)
            //如果表单<Input/>验证有错误，修改状态errorSave为true
            this.props.handleErrorInfo(true)
        })
        .finally(()=>{
            //我们希望同步验证,自定义组件也能一起显示错误提示
            // console.log('valuesForm',valuesForm)
            valuesForm.id = this.state.productId;
            this.props.handleSave(valuesForm)
        })
    }
    render() {
        let { 
            categories,

            category,
			name,
			description,
			price,
			stock,
        } = this.props;
        console.log(this.props)
        return (
            
            <Layout>
                <Form {...layout} ref={this.formRef}>
                    <Form.Item
                        name="category"
                        label="商品分类"
                        rules={[
                            {
                                required: true,
                                message: '请选择商品分类!' 
                            },
                        ]}
                        initialValue={category}
                    >
                        <Select
                            placeholder="商品分类"
                        >
                            {
                                categories.map((item)=>{
                                    return <Option key={item.get('_id')} value={item.get('_id')}>{item.get('name')}</Option>
                                    //value={item.get('_id')}当新增商品时，我们在保存商品到数据库时需要获取该商品属于哪个分类
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="商品名称"
                        rules={[
                            {
                                required: true,
                                message: '请输入商品名称!' 
                            },
                        ]}
                        initialValue={name}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="商品描述"
                        rules={[
                            {
                                required: true,
                                message: '请输入商品描述!' 
                            },
                        ]}
                        initialValue={description}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="商品价格"
                        rules={[
                            {
                                required: true,
                                message: '请输入商品价格!' 
                            },
                        ]}
                        // initialValue={price}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="stock"
                        label="商品库存"
                        rules={[
                            {
                                required: true,
                                message: '请输入商品库存!' 
                            },
                        ]}
                        // initialValue={stock}
                    >
                        <InputNumber />
                    </Form.Item>
                </Form>
            </Layout>
        );
    }
}
//将属性映射到组件
const mapStateToProps = (state)=>{
    // console.log(state.get('product').get('name'))
	return {
        //获取商品分类
        categories:state.get('product').get('categories'),
        //自定义错误状态
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
const mapDispatchToProps = (dispatch)=>({
        //获取商品分类
		handleLevelCategories:()=>{
			dispatch(actionCreators.getLevelCategoriesAction())
        },
        //提交新增商品数据到后台
        handleSave(values){
            dispatch(actionCreators.getSavePrductsAction(values))
        },
        //编辑商品页，数据回传
        handleProductEdit:(id)=>{
            // console.log(id);
			dispatch(actionCreators.getProductEditAction(id))
		}
})
export default connect(mapStateToProps,mapDispatchToProps)(Demo)