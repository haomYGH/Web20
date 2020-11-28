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
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

class Demo extends React.Component {
    componentDidMount(){
		//加载最新商品分类
		this.props.handleLevelCategories()
	}
    formRef = React.createRef();
    onFinish = values => {
        // console.log(values)
        // this.props.handleSave(values)
    };
    render() {
        const { 
            categories,

            handleMainImage,
			handleImages,
            handleDetail,
            
            mainImageValidateStatus,
            mainImageHelp
        } = this.props
        return (
            <Layout>
                <Form {...layout} ref={this.formRef} onFinish={this.onFinish}>
                    <Form.Item
                        name="productCategory"
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
                        name="productName"
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
                        name="productDescription"
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
                        name="productPrice"
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
                        name="productStock"
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
                        name='productMainImage'
                        label="主图"
                        rules={[
                            {
                                required: true,
                                // message: '请上传商品主图!' //无法动态校验
                            },
                        ]}
                        // validateStatus={mainImageValidateStatus}
                        // help={mainImageHelp}
                    >
                        <UploadImgs 
                            action={UPLAOD_IMAGES}
                            getFileList = {(fileList)=>{
                                // console.log(fileList)//我们是在这个组件里面把数据发送到后台并存到数据库中的，所以所有的值都要回传到这里
                                handleMainImage(fileList)
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name='productImages'
                        label="商品图"
                        rules={[
                            {
                                required: true,
                                // message: '请上传商品展示图!' //无法动态校验
                            },
                        ]}
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
                        name='productDetail'
                        label="商品详情"
                        rules={[
                            {
                                required: true,
                                // message: '请添加商品详情!' //无法动态校验
                            },
                        ]}
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
                        <Button type="primary" htmlType="submit">
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
	return {
        categories:state.get('category').get('categories'),
        
        mainImageValidateStatus:state.get('product').get('mainImageValidateStatus'),
		mainImageHelp:state.get('product').get('mainImageHelp'),
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
})
export default connect(mapStateToProps,mapDispatchToProps)(Demo)