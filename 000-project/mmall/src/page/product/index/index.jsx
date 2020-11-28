import React 		from 'react';
import { Link } 	from 'react-router-dom';
import MUtil 		from 'util/mm.jsx';
import Product 		from 'service/product-service.jsx';

import PageTitle 	from 'component/page-title/index.jsx';
import ListSearch 	from 'page/product/index/index-list-search.jsx';
import TableList 	from 'util/table-list/index.jsx';
import Pagination 	from 'util/pagination/index.jsx';


import './index.scss';

const _mm = new MUtil();
const _product = new Product();

class ProductList extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			pageNum: 1,
			list: [],
			listType: 'list' // 判断是通过列表加载的数据还是通过搜索加载的数据，当onSearch时候把它变成search
		}
	}
	componentDidMount () {
		this.loadProductList();
	}
	// 加载商品列表(把加载商品列表和搜索封装在一起)
	loadProductList () {
		let listParam = {};
		listParam.pageNum = this.state.pageNum;
		listParam.listType = this.state.listType;
		// 如果是搜索，传入搜索类型和搜索关键字
		if (this.state.listType === 'search') {
			listParam.searchType = this.state.searchType;
			listParam.keyword = this.state.searchKeywords;
		}

		_product.getProductList(listParam).then(res => {
			this.setState(res)
		}, errMsg => {
			this.setState({
				list: []
			})
			_mm.errorTips(errMsg)
		})
	}
	// 点击搜索
	onSearch (searchType, searchKeywords) {
		let listType = searchKeywords === '' ? 'list' : 'search';
		// 按照新条件加载列表
		this.setState({
			pageNum: 1,
			listType,			
			searchType,
			searchKeywords
		}, () => this.loadProductList()) 
	}
	// 页面改变
	onPageNumChange(pageNum) {
		this.setState({
			pageNum: pageNum
		}, () => {
			this.loadProductList()
		})	
	}
	// 商品上下架
	changeStatus (e, productId, currentStatus) {
		let newStatus  	= currentStatus == 1 ? 2 : 1,
			confirmTips = currentStatus == 1 ? '确定下架该商品？' : '确定上架该商品？' ;
		if (window.confirm(confirmTips)) {
			_product.toggleSaleStatus({
				productId: productId,
				status: newStatus
			}).then(res => {
				_mm.successTips(res);
				this.loadProductList()			
			}, errMsg => {
				_mm.errorTips(errMsg)
			})
		}			
	}

	render () {	
		let tbody = (
			this.state.list.map((product, index) => (
				<tr key={index}>
					<td>{ product.id}</td>
					<td>{ product.name}</td>
					<td>{ product.subtitle}</td>
					<td>¥{ product.price}</td>
					<td>
						<p>{ product.status === 1 ? '在售' : '已下架'}</p>
						<button 
							className="btn btn-xs btn-warning"
							onClick={ (e) => this.changeStatus(e, product.id, product.status)}
							>{ product.status === 1 ? '下架' : '上架' }</button>
					</td>
					<td>
						<Link to={`/product/detail/${ product.id }`} className="detail-button">查看</Link>
						<Link to={`/product/save/${ product.id }`}>编辑</Link>
					</td>
				</tr>
			))
		);
		let tableHeads = [
			{ name: '商品ID', width: '10%' },
			{ name: '商品名称', width: '10%' },
			{ name: '商品描述', width: '40%' },
			{ name: '价格', width: '10%' },
			{ name: '状态', width: '15%' },
			{ name: '操作', width: '15%' }
		]
		return (
			<div id="page-wrapper">
				<PageTitle title="商品列表">
					<Link to="/product/save" className="page-header-right">
						<button className="btn btn-primary">
							<i className="fa fa-plus "></i>
							<span>添加商品</span>
						</button>
					</Link>
				</PageTitle>
				<ListSearch onSearch={ (searchType, searchKeywords) => {this.onSearch(searchType, searchKeywords) } } />
				<TableList tableHeads={ tableHeads }>{ tbody }</TableList>
				<Pagination 
					current={ this.state.pageNum } 
					total={ this.state.total }
					onChange={ pageNum => this.onPageNumChange(pageNum)} />
			</div>
		);
	}
}

export default ProductList;