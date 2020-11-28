import React 		from 'react';
import { Link } 	from 'react-router-dom';
import MUtil 		from 'util/mm.jsx';
import Product 		from 'service/product-service.jsx';

import PageTitle 	from 'component/page-title/index.jsx';
import TableList 	from 'util/table-list/index.jsx';

const _mm = new MUtil();
const _product = new Product();

class CategoryList extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			parentCategoryId: this.props.match.params.categoryId || 0, // 显示的是谁下面的列表
			list: [],
		}
	}
	componentDidMount () {
		this.loadCategoryList();
	}
	componentDidUpdate (prevProps, prevState) {
		let oldPath = prevProps.location.pathname,
			newPath = this.props.location.pathname,
			newId	= this.props.match.params.categoryId;

		if (oldPath !== newPath) {
			this.setState({
				parentCategoryId: newId
			}, () => {
				this.loadCategoryList()
			})
		}
	}
	// 加载品类列表
	loadCategoryList () {
		_product.getCategoryList(this.state.parentCategoryId).then(res => {
			this.setState({
				list: res
			})
		}, errMsg => {
			this.setState({
				list: []
			})
			_mm.errorTips(errMsg)
		})
	}

	// 修改品类名称
	onUpdateCategoryName (categoryId, categoryName) {
		// 第二个参数是默认的,就是原来的品类名称
		let newName = window.prompt('请输入品类名称', categoryName);
		if (newName) {
			_product.updateCategoryName({
				categoryId: categoryId,
				categoryName: newName
			}).then(res => {
				_mm.successTips(res)
				this.loadCategoryList();
			}, errMsg => {
				_mm.errorTips(errMsg)
			})
		}
	}
	
	render () {
		// 点击查看子品类,页面不跳转,但是会触发更新
		let tbody = (
			this.state.list.map((category, index) => {
				return (
					<tr key={category.id}>
						<td>{ category.id }</td>
						<td>{ category.name }</td>
						<td>
							<a 
								href="javascript:;"
								onClick={ (e) => this.onUpdateCategoryName(category.id, category.name) }>修改品类名称 </a>
							{
								category.parentId === 0
								? <Link 
									to={`/product-category/index/${category.id}`}>查看子品类</Link>
								: null
							}
						</td>
					</tr>
				);
			})
		);
		
		return (
			<div id="page-wrapper">
				<PageTitle title="品类列表">
					<Link to="/product-category/add" className="page-header-right">
						<button className="btn btn-primary">
							<i className="fa fa-plus "></i>
							<span>添加品类</span>
						</button>
					</Link>
				</PageTitle>
				<div className="row">
					<div className="col-md-10">
						<p>父级品类: { this.state.parentCategoryId || 0 }</p>
					</div>
				</div>
				<TableList tableHeads={['品类ID', '品类名称', '操作']}>					
					{ tbody }
				</TableList>
			</div>
		);
	}
}

export default CategoryList;