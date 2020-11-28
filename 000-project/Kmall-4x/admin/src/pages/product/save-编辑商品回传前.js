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
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        // console.log(this.props)
        this.state = {
			productId:this.props.match.params.productId
		}
    }
    componentDidMount(){
		//加载最新商品分类
        this.props.handleLevelCategories()
        //如果有id传过来则为编辑商品,我们需要获取该id下的商品信息然后回传
		if(this.state.productId){
            // console.log(this.state.productId)
			this.props.handleProductEdit(this.state.productId)
		}
	}
    formRef = React.createRef();
    handleSubmit(){
        // console.log(this.formRef.current);
        let valuesForm = '';
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
                this.props.handleSave(valuesForm)
            })
    }
    render() {
        const { 
            categories,

            handleMainImage,
			handleImages,
            handleDetail,
            
            mainImageValidateStatus,
            mainImageHelp,
            imagesValidateStatus,
            imagesHelp,
        } = this.props
        // console.log(this.formRef.current)
        return (
            <Layout>
                <Form {...layout} ref={this.formRef} >
                    <Form.Item
                        name="category"
                        label="商品分类"
                        rules={[
                            {
                                required: true,
                                message: '请选择商品分类!' 
                            },
                        ]}
                    >
                        <Select
                            placeholder="商品分类"
                        >
                            {
                                categories.map((category)=>{
                                    return <Option key={category.get('_id')} value={category.get('_id')}>{category.get('name')}</Option>
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
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        // name='productMainImage'//这里不用name，因为没有动态校验,而且提交表单时，这里的值是从store上拿的
                        label="主 图"
                        //动态设置validateStatus,help
                        validateStatus={mainImageValidateStatus}
                        help={mainImageHelp}
                    >
                        <UploadImgs 
                            action={UPLAOD_IMAGES}
                            getFileList = {(fileList)=>{
                                // console.log(fileList)//我们是在这个组件里面把数据发送到后台并存到数据库中的，所以所有的值都要回传到这里
                                handleMainImage(fileList)//将值保存到store上，下面同理
                            }}
                            max={1}
                        />
                    </Form.Item>
                    <Form.Item
                        label="商品图"
                        validateStatus={imagesValidateStatus}
                        help={imagesHelp}        
                    >
                        <UploadImgs 
                            action={UPLAOD_IMAGES}
                            getFileList = {(fileList)=>{
                                //fileList就是子组件UploadImgs处理过后的值
                                handleImages(fileList)
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="商品详情"
                    >
                        <RichEditor 
                            url={UPLAOD_PRODUCT_DETAIL_IMAGES}
                            getValues={(values)=>{
                                // console.log(values)
                                handleDetail(values)
                            }}
                        />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Layout>
        );
    }
}
//将属性映射到组件
const mapStateToProps = (state)=>{
    // console.log(state.get('product').get('errorInfo'))
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
        //修改状态值errorInfo
        handleErrorInfo(errState){
            dispatch(actionCreators.getErrorInfoPrductsAction(errState))
        },
        //提交新增商品数据到后台
        handleSave(values){
            dispatch(actionCreators.getSavePrductsAction(values))
        },
        //自定义组件数据 保存到store
        handleMainImage:(mainImage)=>{
			dispatch(actionCreators.getMainImageAction(mainImage))
		},
		handleImages:(images)=>{
			dispatch(actionCreators.getImagesAction(images))
		},
		handleDetail:(values)=>{
			dispatch(actionCreators.getDetailAction(values))
        },
        //编辑商品页，数据回传
        handleProductEdit:(id)=>{
			dispatch(actionCreators.getProductEditAction(id))
		}
})
export default connect(mapStateToProps,mapDispatchToProps)(Demo)