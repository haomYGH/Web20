import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class Product {
	// 获取商品列表/搜索商品
	getProductList (listParam) {
		let url = '',
			data = {};

		if (listParam.listType === 'list') {
			url = '/manage/product/list.do';
			data.pageNum = listParam.pageNum
		} else if (listParam.listType === 'search') {
			url = '/manage/product/search.do';
			data[listParam.searchType] = listParam.keyword;
		}

		return _mm.request({
			type	: 'post',
			url		: url,
			data	: data
		})
	}

	// 商品上下架
	toggleSaleStatus (productInfo) {
		return _mm.request({
			type	: 'post',
			url		: '/manage/product/set_sale_status.do',
			data	: productInfo
		})
	}

	// 验证表单的产品数据
	checkProduct (product) {
		let result = {
			status: true,
		}

		// 验证商品名称
		if (typeof product.name !== 'string' || product.name === '') {
			return {
				status: 0,
				msg: '商品名称不能为空'
			}
		}

		// 验证商品描述
		if (typeof product.subtitle !== 'string' || product.subtitle === '') {
			return {
				status: 0,
				msg: '商品描述不能为空'
			}
		}

		// 验证商品id, 数字且不为0, 0表示没有选择品类 
		// (这里如果不取非,用另一种写法product.categoryId < 0 Nan,就是无法验证, 会出问题, 取反就没问题了)
		if (typeof product.categoryId !== 'number' || !(product.categoryId > 0)) {
			return {
				status: 0,
				msg: '请选择商品品类'
			}
		}

		// 验证商品价格
		if (typeof product.price !== 'number' || !(product.price >= 0)) {
			return {
				status: 0,
				msg: '请输入商品价格'
			}
		}

		// 验证商品库存
		if (typeof product.stock !== 'number' || !(product.stock >= 0)) {
			return {
				status: 0,
				msg: '请输入商品库存'
			}
		}

		return result;
	}

	// 保存商品
	saveProduct (product) {
		return _mm.request({
			type	: 'get',
			url		: '/manage/product/save.do',
			data	: product
		})
	}

	// 获取商品详情
	getProduct (productId) {
		return _mm.request({
			type	: 'get',
			url		: '/manage/product/detail.do',
			data	:  {
				productId: productId || 0
			}
		})
	}
	

	/*
	* 获取品类列表
	*/
	getCategoryList (parentCategoryId) {
		return _mm.request({
			type	: 'get',
			url		: '/manage/category/get_category.do',
			data	: {
				categoryId: parentCategoryId || 0
			}
		})
	}

	// 添加品类
	addCategory (product) {
		return _mm.request({
			type	: 'get',
			url		: '/manage/category/add_category.do',
			data	: product
		})
	}

	// 修改品类名称
	updateCategoryName (product) {
		return _mm.request({
			type	: 'get',
			url		: '/manage/category/set_category_name.do',
			data	: product
		})
	}
}

export default Product;