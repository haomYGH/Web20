import React from 'react'//代码解析
import moment from 'moment'

//引入UI
import Layout from '@common/layout'
import { Table, Tag,Pagination } from 'antd';
//子UI(引入UI里面的UI)

//使用React-Redux管理数据store
import { connect } from 'react-redux'
import { actionCreator } from './store'

//类组件 
class Demo extends React.Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.handlePage(this.props.current,this.props.pageSize)
	}
	render(){
		const { list,current,pageSize,total,handlePage,isFetching,handleSetPageSize } = this.props;
		const columns = [
			{
				title: '用户名',
				dataIndex: 'username',
				key: 'username',
				render: username => <a>{username}</a>,
			},{
				title: '是否管理员',
				dataIndex: 'isAdmin',
				key: 'isAdmin',
				render:(isAdmin)=>(isAdmin ? '是' : '否')
			},{
				title: 'email',
				dataIndex: 'email',
				key: 'email',
			},{
				title: '手机',
				key: 'phone',
				dataIndex: 'phone',
			},{
				title: '注册时间',
				key: 'createdAt',
				dataIndex: 'createdAt',
			},
		];
		
		/*
		const data = [
			{
				key: '1',
				username: 'John Brown',
				isAdmin: 32,
				email: 'New York No. 1 Lake Park',
				phone: ['nice', 'developer'],
				createdAt:111
			},{
				key: '2',
				username: 'Jim Green',
				isAdmin: 42,
				email: 'London No. 1 Lake Park',
				phone: ['loser'],
				createdAt:111
			},{
				key: '3',
				username: 'Joe Black',
				isAdmin: 32,
				email: 'Sidney No. 1 Lake Park',
				phone: ['cool', 'teacher'],
				createdAt:111
			},
		];
		*/
		const data = list.map(user=>{
			return {
				key:user.get('_id'),
				username: user.get('username'),
				isAdmin: user.get('isAdmin'),
				email: user.get('email'),
				phone:user.get('phone'),
				createdAt:moment(user.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')
			}
		}).toJS()
		return (
			<Layout>
				<Table 
					columns={columns} 
					dataSource={data} 
					loading={isFetching}
					pagination={{
						total:total,
						pageSize:pageSize,
						current:current,
						hideOnSinglePage:true,
						pageSizeOptions:['5','10','15'],
						onChange: (page, pageSize) => {
							handlePage(page,pageSize)
						},
						onShowSizeChange: (current, pageSize) => {
							handlePage(current,pageSize)
						},
					}}
				/>
			</Layout>
		)
	}
}
  
//映射Store里面的state
const mapStateToProps = (state)=>{
	return{
		list:state.get('user').get('list'),
		current:state.get('user').get('current'),
		pageSize:state.get('user').get('pageSize'),
		total:state.get('user').get('total'),	
		isFetching:	state.get('user').get('isFetching'),	
	}
}
//映射Store里面的action并派发
const mapDispatchToProps = (dispatch)=>({
	handlePage:(page,pageSize)=>{
		const action = actionCreator.getPageAction(page,pageSize)
		dispatch(action)
	}
})  

export default connect(mapStateToProps,mapDispatchToProps)(Demo);