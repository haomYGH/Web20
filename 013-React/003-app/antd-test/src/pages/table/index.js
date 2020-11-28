import React from 'react'//代码解析
//引入UI
import { Table, Tag } from 'antd';
//子UI(引入UI里面的UI)

//函数组件
const Demo = ()=>{
	const columns = [
		{
			title: '用户名',
			dataIndex: 'username',
			key: 'username',
			render: text => <a>{text}</a>,
		},{
			title: '是否管理员',
			dataIndex: 'isAdmin',
			key: 'isAdmin',
		},{
			title: 'email',
			dataIndex: 'email',
			key: 'email',
		},{
			title: '手机',
			key: 'phone',
			dataIndex: 'phone',
			render: phone => (
				<span>
				{phone.map(tag => {
					let color = tag.length > 5 ? 'geekblue' : 'green';
					if (tag === 'loser') {
					color = 'volcano';
					}
					return (
					<Tag color={color} key={tag}>
						{tag.toUpperCase()}
					</Tag>
					);
				})}
				</span>
			),
		},{
			title: '注册时间',
			key: 'createdAt',
			dataIndex: 'createdAt',
		},
	];
	
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
	return (
		<Table columns={columns} dataSource={data} />
	)
}
  
 

export default Demo