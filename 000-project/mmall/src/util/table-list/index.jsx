import React 		from 'react';

class TableList extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isFirstLoad: true
		}
	}
	componentWillReceiveProps () {
		// 列表只有在第一次加载的时候isFirstLoad为true -> 表示正在加载，其他为false
		this.setState({
			isFirstLoad: false
		})
	}
	render () {
		// 表头信息
		let tableHeader = (			
			<tr>
				{	
					this.props.tableHeads.map(
						(tableHead, index) => {
							if (typeof tableHead === 'string') {
								return <th key={ tableHead } >{ tableHead }</th>
							}
							else if (typeof tableHead === 'object') {
								return <th key={ index } width={ tableHead.width }>{ tableHead.name }</th>
							}
						}
					)
				}
			</tr>
		);
		let listBody = this.props.children;

		// 列表加载信息
		let listInfo = (
			<tr>
				<td colSpan={ this.props.tableHeads.length } className="text-center">
					{ this.state.isFirstLoad ? '正在加载...' : '没有找到相应的结果～' }
				</td>
			</tr>
		);
		
		return (
			<div className="row">
				<div className="col-md-12">
					<table className="table table-striped table-bordered">
						<thead>{ tableHeader }</thead>
						<tbody>
							{
								listBody.length ? listBody : listInfo
							}
						</tbody>
					</table>							
				</div>
			</div>					
		);
	}
}

export default TableList;