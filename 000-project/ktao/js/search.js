/*
* @Author: Administrator
* @Date:   2020-06-09 17:14:26
* @Last Modified by:   haom
* @Last Modified time: 2020-06-17 21:21:22
*/
;(function($){
//缓存数据
var cache = {
	data:{},
	count:0,
	addData:function(key,val){
		this[key] = val;
		this.count++;
	},
	getData:function(key){
		return this[key];
	}
}

	function Search($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$searchInput = this.$elem.find('.search-input');
		this.$searchBtn = this.$elem.find('.search-btn');
		this.$searchLayer = this.$elem.find('.search-layer');
		this.$searchForm = this.$elem.find('.search-form');

		this.isLoadedHTML=false;//状态信息，是否已经加载html
		this.timer = null;
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
			
			this.$searchInput.on('input',function(){
				if(this.options.dealyGetData){
					clearTimeout(this.timer);
					this.timer=setTimeout(function(){
						this.getData();
					}.bind(this),this.options.dealyGetData)
				}else{
					this.getData();
				}
			}.bind(this));

			//3.点击页面别的地方隐藏下拉层
			//如果下拉框显示
			// if()
			$(document).on('click',$.proxy(this.hideLayer,this));
			//4阻止冒泡
			this.$searchInput.on('click',function(ev){
				ev.stopPropagation();
			})
			//5点击其他地方再点击输入框时依然显示下拉层
			this.$searchInput.on('focus',function(){
				if(!this.getInputVal()) return;
				this.showLayer()
			}.bind(this))
			//6.(事件委托)问点击下拉列表每一项完成提交
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
				console.log('如果数据为空则不发送请求');
				this.hideLayer();				
				return;
			}

			//始终获取最新数据
			if(this.jqXHR){
				this.jqXHR.abort();
			}
			//每一次发送请求前查询是否有缓存
			if(cache.getData(this.getInputVal())){//如果有缓存
				var cacheData = cache.getData(this.getInputVal());
				this.$searchLayer.trigger('getSearchData',cacheData);//显示下拉层,第2个是参数
				return;
			}
			//因为ajax是异步执行的，所以如果数据返回慢，用户又多次请求了ajax则需要abort
			var jqXHR = $.ajax({
				url:this.options.url+this.getInputVal(),
				dataType:'jsonp',
				jsonp:'callback'//提交地址里的一个方法名
			})
			.done(function(data){
				this.$searchLayer.trigger('getSearchData',[data])//data本来就是个数组
				//将数据缓存起来
				cache.addData(this.getInputVal(),data);
			}.bind(this))
			.fail(function(err){
				this.$searchLayer.trigger('getNoData')
			}.bind(this))
			.always(function(){
				this.jqXHR = null;
			}.bind(this))
		},
		appendHtml:function(html){
			//插入html内容
			this.$searchLayer.html(html);
			this.isLoadedHTML = !!html;
		},
		showLayer:function(){
			if (!this.isLoadedHTML) return ;
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