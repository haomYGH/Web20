import React from 'react'//代码解析
import { connect } from 'react-redux'
import { 
	Link ,
} from "react-router-dom"
import Layout from '@common/layout'
import { Table,Button,Input,InputNumber,Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { actionCreators } from '../store/index.js'

class Demo extends React.Component{
	componentDidMount(){
		this.props.handlePage(this.props.current)
	}
    render(){
        const columns = [
			{
				title: '分类名称',
				dataIndex: 'name',
				key: 'name',
				render: (name,record) => 
					<Input 
						style={{width:"60%"}}
						defaultValue={name}
						onBlur={(ev)=>{
							// console.log(record,ev.target.value)
							handleUpdateName(ev.target.value,record._id)
						}}
					/>
			},
			{
				title: '手机分类',
				dataIndex: 'mobileName',
				key: 'mobileName',
				render: (mobileName,record) => 
					<Input 
						style={{width:"40%"}}
						defaultValue={mobileName}
						onBlur={(ev)=>{
							// console.log(record,ev.target.value)
							handleUpdateMobileName(ev.target.value,record._id)
						}}
					/>
			},
			{
				title: '是否显示',
				dataIndex: 'isShow',
				key: 'isShow',
				render:(isShow,record)=>
					<Switch
						checkedChildren="开启" unCheckedChildren="关闭" 
						defaultChecked={isShow=='0' ? false : true}
						onChange={(checked)=>{
							// console.log(checked)
							const isShow = checked ? '1' : '0';
							// console.log(isShow)
							handleUpdateIsShow(isShow,record._id)
						}}
					/>
			},
			{
				title: '排序',
				
				key: 'order',
				dataIndex: 'order',
				render:(order,record)=>
					<InputNumber 
						defaultValue={order}
						min={0}
						max={10}
						onBlur={(ev)=>{
							// console.log(ev.target.value,record._id)
							handleUpdateOrder(ev.target.value,record._id)
						}}
					/>
			},
		];
		const { 
			list,
			current,
			pageSize,
			total,
			handlePage,
			isFetching,

			handleUpdateName,
			handleUpdateMobileName,
			handleUpdateOrder,
			handleUpdateIsShow
		} = this.props;
		const dataSource = list.toJS();
		dataSource.forEach((item,index)=>{
			item.key = index
        })
        return (
            <Layout>
                <Link to="/category/add">
                    <Button type="primary" shape="round" icon={<PlusOutlined />} size={'large'}></Button>
                </Link>
                <Table 
					dataSource={dataSource}
					columns={columns} 
					loading={isFetching}
					pagination={{
						total:total,
						pageSize:pageSize,
						current:current,
						onChange:(page)=>{
							handlePage(page)
						}
					}}
				/>
            </Layout>
        )
    }
}
//将属性映射到组件
const mapStateToProps = (state)=>{
	return {
		list:state.get('category').get('list'),
		current:state.get('category').get('current'),
		pageSize:state.get('category').get('pageSize'),
		total:state.get('category').get('total'),
		isFetching:state.get('category').get('isFetching'),
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>({
	handlePage:(page)=>{
		dispatch(actionCreators.getPageAction(page))
	},
	handleUpdateName:(newName,id)=>{
		// console.log(newName,id)
		const action = actionCreators.getUpdateNameAction(newName,id)
		dispatch(action)            
	},
	handleUpdateMobileName:(newName,id)=>{
		// console.log(newName,id)
		const action = actionCreators.getUpdateMobileNameAction(newName,id)
		dispatch(action)
	},
	handleUpdateOrder:(newOrder,id)=>{
		// console.log(newOrder,id)
		const action = actionCreators.getUpdateOrderAction(newOrder,id)
		dispatch(action)
	},
	handleUpdateIsShow:(newIsShow,id)=>{
		// console.log(newIsShow,id)
		const action = actionCreators.getUpdateIsShowAction(newIsShow,id)
		dispatch(action)
	},
})
export default connect(mapStateToProps,mapDispatchToProps)(Demo)