import React from 'react';
import MUtil 		from 'util/mm.jsx';
import Product 		from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

import './category-selector.scss';

class CategorySelector extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			firstCategoryId: 0,
			firstCategoryList: [],
			secondCategoryId: 0,
			secondCategoryList: []
		}
	}
	componentDidMount () {
		this.loadFisrtCategoryList()
	}
	// 数据回填
	componentWillReceiveProps (nextProps) {
		// 需要定义一个标记位,比较当前的props(this.props)和将要传进来的props(nextProps)有没有发生变化
		// 这里的this.props.categoryId和parentCategoryId始终是默认值,也就是0,所以这个判断没有意义,先放在这里!!!!!!
		let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
			parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;

		// 数据没有发生变化的时候不做处理
		if (!categoryIdChange && !parentCategoryIdChange) {
			return;
		}
		// 如果只有一级品类
		if (nextProps.parentCategoryId === 0) {
			this.setState({
				firstCategoryId: nextProps.categoryId,
			})
		}
		// 如果有二级品类
		else {			
			this.setState({
				firstCategoryId: nextProps.parentCategoryId,
				secondCategoryId: nextProps.categoryId
			}, () => {
				parentCategoryIdChange && this.loadSecondCategoryList();
			})
		}
	}
	// 加载一级品类
	loadFisrtCategoryList () {
		// 传入父品类ID返回它所有的下级品类
		// 传入一个根，他就返回一级品类；传入一级品类，他就返回二级品类
		_product.getCategoryList().then(res => {
			this.setState({
				firstCategoryList: res,
			})
		}, errMsg => {
			_mm.errorTips(errMsg)
		})
	}
	// 选中一级品类
	onFirstCategoryChange (e) {
		if (this.props.readOnly) {
			return false
		}
		let newValue = e.target.value || 0; // 当只有第一项的时候，'请选择一级品了'，这时候e.target.value没有值
		this.setState({
			firstCategoryId: newValue,
			secondCategoryId: 0,
			secondCategoryList: []
		}, () => {
			// 显示/更新二级品类
			this.loadSecondCategoryList();
			this.onPropsCategoryChange();
		})
	}
	// 加载二级品类
	loadSecondCategoryList () {
		_product.getCategoryList(this.state.firstCategoryId).then(res => {
			this.setState({
				secondCategoryList: res,
			})
		}, errMsg => {
			_mm.errorTips(errMsg)
		})
	}
	// 选中二级品类
	onSecondCategoryChange (e) {
		if (this.props.readOnly) {
			return false
		}
		let newValue = e.target.value || 0;
		this.setState({
			secondCategoryId: newValue
		}, () => {
			this.onPropsCategoryChange()
		})
	}
	// 传给父组件选中的结果(如果选了二级分类就用二级分类id覆盖一级分类，最后只会传出一个categoryId)
	onPropsCategoryChange () {
		// 判断父组件有没有传入这个方法
		let categoryChangable = typeof this.props.onCategoryChange === 'function';
		// 如果有二级品类
		if (this.state.secondCategoryId) {
			categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
		}
		// 如果只有一级品类
		else {
			categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0)
		}
	}
	render () {
		return (
			<div className="col-md-5">
				<select
					readOnly={ this.props.readOnly }
					value={ this.state.firstCategoryId } 
					className="form-control cate-select" 
					onChange={(e) => this.onFirstCategoryChange(e)}>
					<option value="">请选择一级分类</option>
					{
						this.state.firstCategoryList.map((category, index) => {
							return <option key={ index } value={ category.id }>{ category.name }</option>
						})
					}
				</select>
				{
					this.state.secondCategoryList.length ?
					<select
						readOnly={ this.props.readOnly }
						value={ this.state.secondCategoryId }
						className="form-control cate-select"
						onChange={(e) => this.onSecondCategoryChange(e)}>
						<option value="">请选择二级分类</option>
						{
							this.state.secondCategoryList.map((category, index) => {
								return <option key={ index } value={ category.id }>{ category.name }</option>
							})
						}

					</select> : null
				}
					
			</div>
		);
	}
}

export default CategorySelector;

