import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'

// 页面
import Home 				from 'page/home/index.jsx';
import Login 				from 'page/login/index.jsx';
import UserList 			from 'page/user/index.jsx';
import ErrorPage 			from 'page/error/index.jsx';
import ProductRoute 		from 'page/product/index.jsx';
import Layout 				from 'component/layout/index.jsx';
import OrderList 			from 'page/order/index.jsx';
import OrderDetail 			from 'page/order/detail.jsx';

class App extends React.Component {
	render () {
		let LayoutRouter = (
			<Layout>
				<Switch>
					<Route exact path="/" component={ Home } />
					<Route path="/product" component={ ProductRoute } />
					<Route path="/product-category" component={ ProductRoute } />
					<Route path="/order/index" component={ OrderList } />
					<Route path="/order/detail/:orderNumber" component={ OrderDetail } />
					<Route path="/user/index" component={ UserList } />
					<Redirect exact from="/user" to="/user/index" />
					<Redirect exact from="/order" to="/order/index" />
					<Route component={ ErrorPage } />
				</Switch>
			</Layout>	
		);
		return (
			<Router>
				<Switch>
					{/*login是没有侧边导航的路由*/}
					<Route exact path="/login" component={ Login } /> 
					<Route path="/" render={ (props) => LayoutRouter }/> 	
				</Switch>			
			</Router>
		);
	}
}

ReactDOM.render(
	<App />,
  document.getElementById('app')
)
