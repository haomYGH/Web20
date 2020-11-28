/*
* @Author: haom
* @Date:   2020-06-14 21:40:34
* @Last Modified by:   haom
* @Last Modified time: 2020-06-14 23:14:46
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
		console.log(this);
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$searchForm = this.$elem.find('.search-form');
		this.$searchInput = this.$elem.find('.search-input');
		this.$searchBtn = this.$elem.find('.search-btn');
		this.$searchLayer = this.$elem.find('.search-layer');

		this.timer = 0;
		this.jqXHR=null;
		//2.初始化
		this.init();
		//是否显示下拉层
		if(this.options.autocomplete){
			this.autocomplete()
		}
	}
	Search.prototype = {
		constructor:Search,
		init:function(){
			//监听提交按钮
			this.$searchBtn.on('click',function(){
				this.submit();
			}.bind(this))
		},
		submit:function(){
			if(!this.getInputVal()){
				return false;
			}
			this.$searchForm.trigger('submit');
		},
		getInputVal:function(){
			return $.trim(this.$searchInput.val());//去除两边的空格
		}
		,
		autocomplete:function(){
			//初始化显示隐藏插件
			this.$searchLayer.showHide(this.options);
			//监听输入框获取数据(jsonp获取数据解决跨越)
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

		},
		getData:function(){
			//获取数据
			//如果数据为空则阻止发送请求
			if(this.getInputVal()==''){
				this.hideLayer();				
				return;
			}
			$.ajax({
				url:this.options.url+this.getInputVal(),
				dataType:'jsonp',
				jsonp:'callback'//获取数据上面的方法(必须项)
			})
			.done(function(data){
				var data = data.result;
				var html = '';
				for(var i=0;i<data.length;i++){
					html += '<li class="search-item">'+data[i][0]+'</li>'
				}
				console.log(html);
				this.$searchLayer.html(html);
				this.$searchLayer.showHide('show');
			}.bind(this))
			.fail(function(err){
				console.log('获取数据失败')
			})
		}		
	}	
//https://suggest.taobao.com/sug?code=utf-8&q=x&_ksTS=1591847054660_2168&callback=jsonp2169&k=1&area=c2c&bucketid=15
	Search.DEFAULTS = {
		autocomplete:true,
		url:'https://suggest.taobao.com/sug?code=utf-8&q=',
		js:true,
		mode:'slideLeftRight',
		dealyGetData:1000
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