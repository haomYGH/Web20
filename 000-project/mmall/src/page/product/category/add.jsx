import React 		from 'react';
import MUtil 		from 'util/mm.jsx';
import Product 		from 'service/product-service.jsx';
import PageTitle 	from 'component/page-title/index.jsx';

const _mm = new MUtil();
const _product = new Product();

class CategoryList extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			parentId: 0, 
			categoryName: '',
			categoryList: [],
		}
	}
	componentDidMount () {
		this.loadCategoryList();
	}
	// 表单发生变化
	onValueChange (e) {
		let value = e.target.value,
			name  = e.target.name;
		this.setState({
			[name]: value
		})
	}
	// 加载品类列表
	loadCategoryList () {
		_product.getCategoryList().then(res => {
			this.setState({
				categoryList: res
			})
		}, errMsg => {
			_mm.errorTips(errMsg);
		})
	}

	onSubmit (e) {
		let categoryName = this.state.categoryName;
		// 如果存在品类名称就提交
		if (categoryName) {
			_product.addCategory({
				parentId: this.state.parentId,
				categoryName: this.state.categoryName
			}).then(res => {
				_mm.successTips(res.msg);
				this.props.history.push('/product-category/index');
			}, errMsg => {
				_mm.errorTips(errMsg);
			})
		}
		// 否则, 提示
		else {
			_mm.errorTips('请输入品类名称');
		}
	}

	render () {
		return (
			<div id="page-wrapper">
				<PageTitle title="添加品类" />
				<div className="form-horizontal">
					<div className="form-group">
					    <label className="col-md-2 control-label">品类名称</label>
					    <div className="col-md-5">
					        <select
								value={ this.state.firstCategoryId } 
								className="form-control"
								name="parentId" 
								onChange={ (e) => this.onValueChange(e) }>
								<option value="">根品类/</option>
								{
									this.state.categoryList.map((category, index) => {
										return <option key={ index } value={ category.id }>根品类/{ category.name }</option>
									})
								}
							</select>
					    </div>
					</div>
					<div className="form-group">
					    <label className="col-md-2 control-label">品类名称</label>
					    <div className="col-md-5">
					        <input 
					        	type="text" 
					        	className="form-control" 
					        	placeholder="请输入品类名称"
					        	name="categoryName"
					        	value={ this.state.name }
					        	onChange={ (e) => this.onValueChange(e) } />
					    </div>
					</div>
					<div className="form-group">
					    <div className="col-md-offset-2 col-md-10">
					      <button className="btn btn-default" onClick={ (e) => this.onSubmit(e)}>提交</button>
					    </div>
					</div>
				</div>
			</div>
		);
	}
}

export default CategoryList;