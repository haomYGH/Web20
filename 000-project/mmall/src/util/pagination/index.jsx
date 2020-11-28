import React 			from 'react';
import { Link } 		from 'react-router-dom';
import RcPagination  	from 'rc-pagination';

import 'rc-pagination/assets/index.css';

// 通用分页组件
class Error extends React.Component {
	constructor (props) {
		super(props);
	}
	render () {
		return (
			<div className="row">
				<div className="col-md-12">
					<RcPagination {...this.props} 
						hideOnSinglePage
						showQuickJumper/>
				</div>
			</div>
		);
	}
}

export default Error;