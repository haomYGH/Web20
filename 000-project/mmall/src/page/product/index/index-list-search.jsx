import React 		from 'react';
import { Link } 	from 'react-router-dom';

import './index.scss';

class ListSearch extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			searchType: 'productId', // productId或者productName
			searchKeywords: ''
		}
	}
	// 用户输入改变的时候
	onInputChange (e) {
		let value = e.target.value.trim(),
			name  = e.target.name;
		this.setState({
			[name]: value
		})
	}
	// 用户点击搜索的时候（这个函数是父组件传过来的，因为这个搜索逻辑应该在外部，它不属于内部的变化）
	onSearch () {
		this.props.onSearch(this.state.searchType, this.state.searchKeywords)
	}
	// 用户按回车触发搜索
	onKeyupSearch (e) {
		if (e.keyCode === 13) {
			this.onSearch()
		} 
	}
	render () {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="form-inline search-wrapper">
						<div className="form-group search-box">
						    <select 
						    	className="form-control" 
						    	name="searchType"
						    	onChange={(e) => this.onInputChange(e) }>
						    	<option value="productId">按照商品ID搜索</option>
						    	<option value="productName">按照关键字搜索</option>
						    </select>
						</div>
						<div className="form-group search-box">
						    <input 
						    	type="text" 
						    	className="form-control" 
						    	placeholder="关键字"
						    	name="searchKeywords"
						    	onKeyUp={ (e) => this.onKeyupSearch(e) }
						    	onChange={ (e) => this.onInputChange(e) }/>
						</div>
						<button 
							className="btn btn-primary"
							onClick={(e) => this.onSearch() }>搜索</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ListSearch;