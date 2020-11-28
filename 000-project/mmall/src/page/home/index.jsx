import React 		from 'react';
import { Link } 	from 'react-router-dom';

import MUtil 		from 'util/mm.jsx';
import Statistic 	from 'service/statistic-service.jsx';

import './index.scss';

import PageTitle 	from 'component/page-title/index.jsx'

const _mm = new MUtil();
const _statistic = new Statistic();

class Home extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			userCount: '-',
			productCount: '-',
			orderCount: '-'
		}
	}
	componentDidMount () {
		this.getStatisticCount()
	}
	getStatisticCount () {
		_statistic.getHomeCount().then(res => {
			this.setState({
				userCount: res.userCount,
				productCount: res.productCount,
				orderCount: res.orderCount
			})
		}, errMsg => {
			_mm.errorTips(errMsg)
		})
	}
	render () {
		return (
			<div id="page-wrapper">
				<PageTitle title="首页" />
				<div className="row">
					<div className="col-md-4">
						<Link to="/user" className="green count-box">
							<p className="count-num">{ this.state.userCount }</p>
							<p className="desc">
								<i className="fa fa-sitemap"></i>
								<span>用户总数</span>
							</p>
						</Link>
					</div>
					<div className="col-md-4">
						<Link to="/product" className="blue count-box">
							<p className="count-num">{ this.state.productCount }</p>
							<p className="desc">
								<i className="fa fa-sitemap"></i>
								<span>用户总数</span>
							</p>
						</Link>
					</div>
					<div className="col-md-4">
						<Link to="/order" className="red count-box">
							<p className="count-num">{ this.state.orderCount }</p>
							<p className="desc">
								<i className="fa fa-sitemap"></i>
								<span>用户总数</span>
							</p>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;