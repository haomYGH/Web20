import React 		from 'react';
import { Link } 	from 'react-router-dom';
import MUtil 		from 'util/mm.jsx';
import Order 		from 'service/order-service.jsx';

import PageTitle 	from 'component/page-title/index.jsx';
import ListSearch 	from 'page/order/index-list-search.jsx';
import TableList 	from 'util/table-list/index.jsx';
import Pagination 	from 'util/pagination/index.jsx';

const _mm = new MUtil();
const _order = new Order();

class OrderList extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			pageNum: 1,
			list: [],
			listType: 'list' // 判断是通过列表加载的数据还是通过搜索加载的数据，当onSearch时候把它变成search
		}
	}
	componentDidMount () {
		this.loadOrderList();
	}
	// 加载订单列表(把加载订单列表和搜索封装在一起)
	loadOrderList () {
		let listParam = {};
		listParam.pageNum = this.state.pageNum;
		listParam.listType = this.state.listType;
		// 如果是搜索，传入搜索类型和搜索关键字
		if (this.state.listType === 'search') {
			listParam.orderNumber = this.state.orderNumber;
		}

		_order.getOrderList(listParam).then(res => {
			this.setState(res)
		}, errMsg => {
			this.setState({
				list: []
			})
			_mm.errorTips(errMsg)
		})
	}
	// 点击搜索
	onSearch (orderNumber) {
		let listType = orderNumber === '' ? 'list' : 'search';
		// 按照新条件加载列表
		this.setState({
			pageNum: 1,
			listType,			
			orderNumber
		}, () => this.loadOrderList()) 
	}
	// 页面改变
	onPageNumChange(pageNum) {
		this.setState({
			pageNum: pageNum
		}, () => {
			this.loadOrderList()
		})	
	}
	
	render () {	
		let tbody = (
			this.state.list.map((order, index) => (
				<tr key={index}>
					<td>
						<Link to={`/order/detail/${ order.orderNo }`} className="detail-button">{ order.orderNo}</Link>
					</td>
					<td>{ order.receiverName}</td>
					<td>{ order.statusDesc}</td>
					<td>¥{ order.payment}</td>
					<td>¥{ order.createTime}</td>
					<td>
						<Link to={`/order/detail/${ order.orderNo }`} className="detail-button">查看</Link>
					</td>
				</tr>
			))
		);
		let tableHeads = ['订单号', '收件人', '订单状态', '订单总价', '创建时间', '操作']
		return (
			<div id="page-wrapper">
				<PageTitle title="订单列表" />
				<ListSearch onSearch={ (orderNumber) => {this.onSearch(orderNumber) } } />
				<TableList tableHeads={ tableHeads }>{ tbody }</TableList>
				<Pagination 
					current={ this.state.pageNum } 
					total={ this.state.total }
					onChange={ pageNum => this.onPageNumChange(pageNum)} />
			</div>
		);
	}
}

export default OrderList;