/*
* @Author: Administrator
* @Date:   2020-06-09 17:14:26
* @Last Modified by:   haom
* @Last Modified time: 2020-06-12 03:40:10
*/
;(function($){
	function Search($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$searchInput = this.$elem.find('.search-input');
		this.$searchBtn = this.$elem.find('.search-btn');
		this.$searchLayer = this.$elem.find('.search-layer');
		this.$searchForm = this.$elem.find('.search-form');

		this.timer = 0;
		this.jqXHR=null;
		//2.初始化
		this.init();
		//3.判断是否显示下拉层
		if(this.options.autocomplete){
			this.autocomplete()
		}
	}
	Search.prototype = {
		constructor:Search,
		init:function(){
			//监听提交按钮事件
			this.$searchBtn.on('click',$.proxy(this.submit,this));
		},
		submit:function(){
			if(!this.getInputVal()){
				return false;
			}
			this.$searchForm.trigger('submit');
		},
		getInputVal:function(){
			return $.trim(this.$searchInput.val());//去除两边的空格
		},

		autocomplete:function(){
			//1初始化显示隐藏插件:初始化后才能在后面调用
			this.$searchLayer.showHide(this.options);
			//2监听输入框输入数据(jsonp获取对应数据)
			// this.$searchInput.on('input',$.proxy(this.getData,this));
			if(this.options.dealyGetData){
				this.$searchInput.on('input',function(){
					clearTimeout(this.timer);
					this.timer = setTimeout(function(){
						this.getData();
					}.bind(this),this.options.dealyGetData)
				}.bind(this))
			}else{
				this.$searchInput.on('input',$.proxy(this.getData,this));//为啥里面这个不用加()执行
			}
			//3.点击页面别的地方隐藏下拉层
			$(document).on('click',function(){
				this.hideLayer();
			}.bind(this));
			//4阻止冒泡
			this.$searchInput.on('click',function(ev){
				ev.stopPropagation();
			})
			//5点击其他地方再点击输入框时依然显示下拉层
			this.$searchInput.on('focus',function(){
				if(this.getInputVal() == '') return;
				this.showLayer()
			}.bind(this))
			//6.(实际委托)问点击下拉列表每一项完成提交
			var _this = this;
			this.$elem.on('click','.search-item',function(){
				//1获取点击项的内容
				var val = $(this).html();//获取的是值
				//2.将获取的内容设置到输入框
				_this.setInputVal(val);
				//3.提交数据
				_this.submit();
			})
		},
		getData:function(){
			//获取数据
			//如果数据为空则阻止发送请求
			if(this.getInputVal()==''){
				return;
			}

			//始终获取最新数据
			if(this.jqXHR){
				this.jqXHR.abort();
			}
			//因为ajax是异步执行的，所以如果数据没有返回
			var jqXHR = $.ajax({
				url:this.options.url+this.getInputVal(),
				dataType:'jsonp',
				jsonp:'callback'
			})
			.done(function(data){
				this.$searchLayer.trigger('getSearchData',[data])
			}.bind(this))
			.fail(function(err){
				this.$searchLayer.trigger('getNoData')
			}.bind(this))
			.always(function(){
				this.jqXHR = null;//那jqXHR不就一直是空了吗？
			}.bind(this))
		},
		appendHTML:function(html){
			this.$searchLayer.html(html);
		},
		showLayer:function(){
			this.$searchLayer.showHide('show');
		},
		hideLayer:function(){
			this.$searchLayer.showHide('hide');
		},
		setInputVal:function(val){
			this.$searchInput.val(val);
		}
	}
//https://suggest.taobao.com/sug?code=utf-8&q=x&_ksTS=1591847054660_2168&callback=jsonp2169&k=1&area=c2c&bucketid=15
	Search.DEFAULTS = {
		autocomplete:true,
		url:'https://suggest.taobao.com/sug?code=utf-8&q=',
		js:true,
		mode:'fade',
		dealyGetData:500
	}

$.fn.extend({
	search:function(options,val){
		return this.each(function(){
			var $elem = $(this);
			var search = $elem.data('search');
			if(!search){
				options = $.extend({},Search.DEFAULTS,options);
				search = new Search($elem,options);
				$elem.data('search',search);
			}
			if(typeof search[options] == 'function'){
				search[options](val);
			}

		});
	}
})
})(jQuery);