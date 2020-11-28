/*
* @Author: Chen
* @Date:   2020-08-17 10:34:58
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-17 17:20:02
*/
var api = require('api');
var _util = require('util');
var _city = require('util/city');
var modalTpl = require('./modal.tpl');


var formDataMsg = {
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)
	},
	hide:function(){
		$('.error-item')
		.hide()
		.find('.error-msg')
		.text('')
	}
}
module.exports = {
	show:function(shipping){
		//缓存编辑地址回传的数据
		this.shipping = shipping;
		this.modalBox = $('.modal-box');
		//加载地址弹出层
		this.loadModal();
		//监听事件
		this.bindEvent();
		//加载省份
		this.loadProvinces();
	},
	loadProvinces:function(){
		//加载省份信息
		var provinces = _city.getProvinces();
		var provincesSelectOptions = this.getSelectOption(provinces)
		var provincesSelect = this.modalBox.find('.province-select');
		provincesSelect.html(provincesSelectOptions);

		//处理编辑地址
		if(this.shipping){
			provincesSelect.val(this.shipping.province)
			this.loadCities(this.shipping.province)
		}
	},
	loadCities:function(province){
		//加载省份信息
		var cities = _city.getCities(province);
		var citiesSelectOptions = this.getSelectOption(cities)
		var citiesSelect = this.modalBox.find('.city-select');
		citiesSelect.html(citiesSelectOptions)

		//处理编辑地址
		if(this.shipping){
			citiesSelect.val(this.shipping.city)
		}
	},
	getSelectOption:function(arr){
		var html = '<option value="">请选择</option>'
			for(var i = 0;i<arr.length;i++){
				html += '<option value="'+arr[i]+'">'+arr[i]+'</option>'
			}
		return html;
	},
	loadModal:function(){
		var html = _util.render(modalTpl,this.shipping)
		this.modalBox.html(html)
	},
	bindEvent:function(){
		var _this = this;
		//1.点击关闭按钮关闭地址弹出层
		this.modalBox.on('click','.close',function(ev){
			_this.hideModal();
		});
		this.modalBox.on('click','.modal-container',function(ev){
			//阻止事件冒泡防止点击表单时关闭地址弹出层
			ev.stopPropagation();
		})
		//2.监听事件根据省份加载具体城市信息
		this.modalBox.on('change','.province-select',function(ev){
			var province = $(this).val();
			_this.loadCities(province)
		})
		//3.点击新增地址提交数据
		this.modalBox.find('#btn-submit').on('click',function(){
			_this.submit();
		})
		//监听键盘事件提交表单
		$('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submit()
			}
		})
	},
	hideModal:function(){
		this.modalBox.empty();
	},
	//表单提交验证
	submit:function(){
		var _this = this
		//1.获取数据
		var formData = {
			name:$.trim($('[name="name"]').val()),
			province:$.trim($('[name="province"]').val()),
			city:$.trim($('[name="city"]').val()),
			address:$.trim($('[name="address"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			zip:$.trim($('[name="zip"]').val()),
		}
		//2.验证数据合法性
		var validateFormData = this.validate(formData)
		//3.验证通过发送请求
		if(validateFormData.status){//验证通过
			//隐藏错误提示
			formDataMsg.hide();
			//发送ajax请求
			var request = api.addShippings
			var action = '新增'
			//处理编辑地址
			if(_this.shipping){
				request = api.updateShippingsDetail;
				formData.id = _this.shipping._id
				action = '编辑'
			}
			request({
				data:formData,
				success:function(data){
					// console.log(data)
					//1.关闭弹出层
					_this.hideModal()
					//2.重新渲染地址列表
					$('.shipping-box').trigger('get-shippings',[data])
					//3.成功提示信息
					_util.showSuccessMsg(action+'地址成功')
				},
				error:function(msg){
					formDataMsg.show('新增地址失败,请稍后再试!!');
				}
			})
		}else{
			formDataMsg.show(validateFormData.msg);
		}
	},
	validate:function(formData){
		var result = {
			status:false,
			msg:''
		}
		//用户名非空验证
		if(!_util.validate(formData.name,'required')){
			result.msg = '请输入用户名'
			return result
		}
		//省份非空验证
		if(!_util.validate(formData.province,'required')){
			result.msg = '请选择省份'
			return result
		}
		//城市非空验证
		if(!_util.validate(formData.city,'required')){
			result.msg = '请选择城市'
			return result
		}
		//地址非空验证
		if(!_util.validate(formData.address,'required')){
			result.msg = '请填写详细地址'
			return result
		}
		//手机号非空验证
		if(!_util.validate(formData.phone,'required')){
			result.msg = '请输入手机号'
			return result
		}
		//手机号合法性验证
		if(!_util.validate(formData.phone,'phone')){
			result.msg = '手机号格式不正确'
			return result
		}

		result.status = true;
		return result;
	}
}