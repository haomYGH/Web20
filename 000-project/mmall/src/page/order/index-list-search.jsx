import React 		from 'react';
import { Link } 	from 'react-router-dom';

class ListSearch extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			orderNumber: ''
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
	// 用户点击搜索的时候
	onSearch () {
		this.props.onSearch(this.state.orderNumber)
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
						    	className="form-control">
						    	<option value="productName">按订单号查询</option>
						    </select>
						</div>
						<div className="form-group search-box">
						    <input 
						    	type="text" 
						    	className="form-control" 
						    	placeholder="请输入订单号"
						    	name="orderNumber"
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