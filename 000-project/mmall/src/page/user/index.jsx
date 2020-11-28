import React 		from 'react';
import { Link } 	from 'react-router-dom';
import MUtil 		from 'util/mm.jsx';
import User 		from 'service/user-service.jsx';

import PageTitle 	from 'component/page-title/index.jsx';
import TableList 	from 'util/table-list/index.jsx';
import Pagination 	from 'util/pagination/index.jsx';

const _mm = new MUtil();
const _user = new User();

class UserList extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			pageNum: 1,
			list: [],
		}
	}
	componentDidMount () {
		this.loadUserList();
	}
	// 加载用户列表
	loadUserList () {
		_user.getUserList(this.state.pageNum).then(res => {
			this.setState(res)
		}, errMsg => {
			this.setState({
				list: []
			})
			_mm.errorTips(errMsg)
		})
	}
	// 页码改变
	onPageNumChange(pageNum) {
		this.setState({
			pageNum: pageNum
		}, () => {
			this.loadUserList()
		})	
	}
	render () {
		let tbody = (
			this.state.list.map((item, index) => {
				return (
					<tr key={item.id}>
						<td>{ item.id }</td>
						<td>{ item.username }</td>
						<td>{ item.email }</td>
						<td>{ item.phone }</td>
						<td>{ new Date(item.createTime).toLocaleString() }</td>
					</tr>
				);
			})
		);
		
		return (
			<div id="page-wrapper">
				<PageTitle title="用户列表" />
				<TableList tableHeads={['ID', '用户名', '邮箱', '电话', '注册时间']}>					
					{ tbody }
				</TableList>
				<Pagination 
					current={ this.state.pageNum } 
					total={ this.state.total } 
					onChange={ pageNum => this.onPageNumChange(pageNum)} />
			</div>
		);
	}
}

export default UserList;