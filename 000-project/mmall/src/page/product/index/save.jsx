import React 				from 'react';
import MUtil 				from 'util/mm.jsx';
import Product 				from 'service/product-service.jsx';
import PageTitle 			from 'component/page-title/index.jsx';
import CategorySelector 	from 'page/product/index/category-selector.jsx';
import FileUploader 		from 'util/file-uploader/index.jsx';
import RichEditor 			from 'util/rich-editor/index.jsx';

import './save.scss';

const _mm = new MUtil();
const _product = new Product();

class ProductSave extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			id 					: this.props.match.params.pid,
			name 				: '',
			subtitle			: '',
			categoryId 			: 0,
			parentCategoryId	: 0,
			subImages 			: [],
			price 				: '',
			stock 				: '',
			detail 				: '', 
			status 				: 1   // 商品状态为1表示在售
		}
	}
	componentDidMount () {
		this.loadProduct()
	}
	// 编辑的时候加载商品详情(数据回填)
	loadProduct () {
		if (this.state.id) {
			_product.getProduct(this.state.id).then(res => {
				res.subImages = res.subImages.split(',').map(imgUri => ({
					uri: imgUri,
					url: res.imageHost + imgUri
				}))
				// 用一个变量缓存起来,加载的时候就是defautlDetail在变,其他的时候是detail在变
				res.defaultDetail = res.detail;
				this.setState(res);
			}, errMsg => {
				_mm.errorTips(errMsg);
			})
		}
	}
	// 普通字段的改变: 商品名称,描述,价格,库存
	onValueChange (e) {
		let value = e.target.value.trim(),
			name  = e.target.name;
		this.setState({
			[name]: value
		})
	}
	// 分类选择器
	onCategoryChange (categoryId, parentCategoryId) { 
		this.setState({
			categoryId 		: categoryId,
			parentCategoryId: parentCategoryId
		})
	}
	// 图片上传成功
	onUploadSuccess (res) {
		let subImages = this.state.subImages;
		subImages.push(res)
		this.setState({
			subImages: subImages
		})
	}
	// 图片上传失败
	onUploadError (err) {
		_mm.errorTips(err)
	}
	// 删除图片
	onImageDelete (e) {
		let subImages = this.state.subImages,
			index = parseInt(e.target.getAttribute('index'));
		subImages.splice(index, 1);
		this.setState({
			subImages: subImages
		})
	}
	// 富文本改变
	onDetailValueChange (value) {
		this.setState({
			detail: value
		})
	}
	// 图片数组转字符串
	getSubImagesString () {
		return this.state.subImages.map(img => img.uri).join(',')
	}
	// 提交
	onSubmit () {
		let product = {
			name 		: this.state.name,
			subtitle 	: this.state.subtitle,
			categoryId 	: parseInt(this.state.categoryId),
			price 		: parseFloat(this.state.price),
			stock 		: parseInt(this.state.stock),
			subImages 	: this.getSubImagesString(),
			detail 		: this.state.detail,
			status 		: this.state.status,
		}
		let productCheckResult = _product.checkProduct(product);
		if (this.state.id) {
			product.id = this.state.id
		}
		// 表单验证成功
		if (productCheckResult.status) {
			_product.saveProduct(product).then(res => {
				_mm.successTips(res);
				this.props.history.push('/product/index');
			}, errMsg => {
				_mm.errorTips(errMsg)
			})
		}
		// 表单验证失败
		else {
			_mm.errorTips(productCheckResult.msg);
		}
	}
	render () {
		return (
			<div id="page-wrapper">
				<PageTitle title={ this.state.id ? "编辑商品" : "添加商品"} />
				<div className="form-horizontal">
					<div className="form-group">
					    <label className="col-md-2 control-label">商品名称</label>
					    <div className="col-md-5">
					        <input 
					        	type="text" 
					        	className="form-control" 
					        	placeholder="请输入商品名称"
					        	name="name"
					        	value={ this.state.name }
					        	onChange={ (e) => this.onValueChange(e) } />
					    </div>
					</div>
					<div className="form-group">
					    <label className="col-md-2 control-label">商品描述</label>
					    <div className="col-md-5">
					        <input 
					        	type="text" 
					        	className="form-control" 
					        	placeholder="请输入商品描述"
					        	name="subtitle"
					        	value={ this.state.subtitle }
					        	onChange={ (e) => this.onValueChange(e) } />
					    </div>
					</div>
					<div className="form-group">
					    <label className="col-md-2 control-label">所属分类</label>
					    <CategorySelector
					    	categoryId={ this.state.categoryId }
					    	parentCategoryId={ this.state.parentCategoryId } 
					    	onCategoryChange={
					    		(categoryId, parentCategoryId) => this.onCategoryChange(categoryId, parentCategoryId)
					    	}/>
					</div>
					<div className="form-group">
					    <label className="col-md-2 control-label">商品价格</label>
					    <div className="col-md-3">
					    	<div className="input-group">
							  	<input 
							  		type="number" 
							  		className="form-control" 
							  		placeholder="价格"
							  		name="price"
							  		value={ this.state.price }
					        		onChange={ (e) => this.onValueChange(e) } />
							  	<span className="input-group-addon">元</span>
							</div>
					    </div>
					</div>
					<div className="form-group">
					    <label className="col-md-2 control-label">商品库存</label>
					    <div className="col-md-3">
					    	<div className="input-group">
							  	<input 
							  		type="number" 
							  		className="form-control" 
							  		placeholder="库存"
							  		name="stock"
							  		value={ this.state.stock }
					        		onChange={ (e) => this.onValueChange(e) } />
							  	<span className="input-group-addon">件</span>
							</div>
					    </div>
					</div>
					<div className="form-group">
					    <label className="col-md-2 control-label">商品图片</label>
					    <div className="col-md-10">
					        {
					        	this.state.subImages.length 
					        	? this.state.subImages.map((img, index) => {
					        		return (
					        			<div  key={index} className="img-con">
					        				<img className="img" src={img.url} />
					        				<i 
					        					className="fa fa-close"
					        					index={index}
					        					onClick={ (e) => this.onImageDelete(e)}>x</i>
					        			</div>
					        		)
					        	})
					        	: (<div>请上传图片</div>)
					        }
					    </div>
					    <div className="col-md-10 col-md-offset-2 file-uploader-con">
					        <FileUploader 
					        	onSuccess={ (res) => this.onUploadSuccess(res)}
					        	onError={ (err) => this.onUploadError(err)}/>
					    </div>
					</div>
					<div className="form-group">
					    <label className="col-md-2 control-label">商品详情</label>
					    <div className="col-md-10">
					        <RichEditor 
					        	detail={ this.state.detail }
					        	defaultDetail={ this.state.defaultDetail }
					        	onValueChange={ (value) => this.onDetailValueChange(value) } />
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

export default ProductSave;