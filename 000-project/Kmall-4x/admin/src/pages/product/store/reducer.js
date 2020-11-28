import { fromJS } from 'immutable';

const defaultState = fromJS({
	list:[],
	total:0,
	pageSize:0,
	current:1,
	isFetching:false,
	categories:[],
	//自定义组件数据
	mainImage:'',
	images:'',
	detail:'',
	//自定义组件验证
	errorInfo:false,
	mainImageValidateStatus:false,
	mainImageHelp:false,
	imagesValidateStatus:false,
	imagesHelp:false,
	//是否为编辑页面
	isEdit:false,
	//编辑商品数据回填
	category:'',
	categoryName:'',
	name:'',
	description:'',
	price:'',
	stock:'',

	keyword:''
})
import * as types from './actionTypes.js'

export default (state=defaultState,action)=>{
	//处理商品列表
	if(action.type == types.SET_PAGE){
		return state.merge({
			list:fromJS(action.payload.list),
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			current:action.payload.current,
			keyword:action.payload.keyword
		})
	}
	else if(action.type == types.REQUEST_START_ACTION){
		return state.set('isFetching',true)
	}
	else if(action.type == types.REQUEST_DONE_ACTION){
		return state.set('isFetching',false)
	}
	//处理设置分类数据
	else if(action.type == types.SET_LEVEL_CATEGORIES){
		return state.set('categories',fromJS(action.payload))
	}
	//处理自定义组件存值
	//只要组定义组件存值则表明上传了商品和封面图片
	else if(action.type == types.SET_MAIN_IMAGE){
		return state.merge({
			mainImage:action.payload,
			mainImageValidateStatus:'',
			mainImageHelp:"",
		})
	}
	else if(action.type == types.SET_IMAGES){
		return state.merge({
			images:action.payload,
			imagesValidateStatus:"",
			imagesHelp:"",
		})
	}
	else if(action.type == types.SET_DETAIL){
		return state.set('detail',action.payload)
	}
	//处理自定义表单错误状态
	else if(action.type == types.SET_ErrorInfo){
		return state.set('errorInfo',fromJS(action.payload))
	}
	//处理自定义组件验证
	else if(action.type == types.SET_MAIN_IMAGE_ERR){
		return state.merge({
			mainImageValidateStatus:'error',
			mainImageHelp:'请添加封面图片!!',
		})
	}
	else if(action.type == types.SET_IMAGES_ERR){
		return state.merge({
			imagesValidateStatus:"error",
			imagesHelp:"请添加商品图片!!",
		})
	}
	//处理商品编辑
	else if(action.type == types.SET_PRODUCT_Edit){
		// console.log(action.payload);
		return state.merge({
			//编辑商品数据回填
			category:action.payload.category._id,
			categoryName:action.payload.category.name,
			name:action.payload.name,
			description:action.payload.description,
			price:action.payload.price,
			stock:action.payload.stock,
			mainImage:action.payload.mainImage,
			images:action.payload.images,
			detail:action.payload.detail,
		})
	}
	
	return state;
}