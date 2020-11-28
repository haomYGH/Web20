import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Select } from 'antd';
import Layout from '@common/layout'

import { actionCreators } from '../store/index.js'

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
		this.props.handleLevelCategories()
	}
    formRef = React.createRef();

    onFinish = values => {
        this.props.handleAddCategories(values)
    };
    render() {
        const { categories } = this.props
        return (
            <Layout>
                <Form {...layout} ref={this.formRef} onFinish={this.onFinish}>
                    <Form.Item
                        name="pid"
                        label="父级分类"
                        rules={[
                            {
                            required: false,
                            },
                        ]}
                    >
                        <Select
                            placeholder="父级分类"
                        >
                            {/* <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option> */}
                            <Option value="0">根分类</Option>
                            {
                                categories.map((category)=>{
                                    return <Option key={category.get('_id')} value={category.get('_id')}>{category.get('name')}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="分类名称"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="mobileName"
                        label="手机分类名称"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                    >
                        <Input />
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
		categories:state.get('category').get('categories')
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>({
    //添加分类
    handleAddCategories:(values)=>{
        dispatch(actionCreators.getAddCategoriesAction(values))
    },
    //加载最新父级分类
    handleLevelCategories:()=>{
        dispatch(actionCreators.getLevelCategoriesAction())
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(Demo)