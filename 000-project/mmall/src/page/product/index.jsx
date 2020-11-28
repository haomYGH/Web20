import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom'

// 页面
import ProductList 		from 'page/product/index/index.jsx';
import ProductSave 		from 'page/product/index/save.jsx';
import ProductDetail 	from 'page/product/index/detail.jsx';
import CategoryList 	from 'page/product/category/index.jsx';
import CategoryAdd 		from 'page/product/category/add.jsx';

class ProductRoute extends React.Component {
	render () {
		return (
			<Switch>
				<Route path="/product/save/:pid?" component={ ProductSave } />
				<Route path="/product/detail/:pid" component={ ProductDetail } />
				<Route path="/product" component={ ProductList } />

				<Route path="/product-category/index/:categoryId?" component={ CategoryList } />
				<Route path="/product-category/add" component={ CategoryAdd } />

				<Redirect exact from="/product/index" to="/product" />
				<Redirect exact from="/product-category" to="/product-category/index" />
			</Switch>
		);
	}
}

export default ProductRoute;

