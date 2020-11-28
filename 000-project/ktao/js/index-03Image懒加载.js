;(function($){
	//抽取共通代码
	function loadHtmlOnce($elem,callBack){
		var loadUrl = $elem.data('load');
		if(!loadUrl) return;
		var isLoaded = $elem.data('isLoaded');
		if(isLoaded) return;
		$.getJSON(loadUrl,function(data){
			typeof callBack == 'function' && callBack($elem,data);
		})		
	}
/*顶部导航逻辑--------------------开始*/
	var $dropdown = $('.top .dropdown');
	$dropdown.dropdown({
		js:true,
		mode:'slideDownUp'
	});
	//监听显示隐藏事件
	$dropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		if(ev.type == 'dropdown-show'){
			loadHtmlOnce($(this),buildMenuLayer);
		}
	});
	function buildMenuLayer($elem,data){
		var html = '';
		for(var i = 0;i<data.length;i++){
			html += '<li><a href="'+data[i].url+'" class="menu-item">'+data[i].name+'</a></li>'
		}
		//模拟网络延时
		setTimeout(function(){
			$elem.find('.dropdown-layer').html(html);
			$elem.data('isLoaded',true);
		},200);
	}	

/*顶部导航逻辑--------------------结束*/

/*头部搜索逻辑--------------------开始*/
	var $search = $('.header .search');
	$search.search({
		mode:'slideLeftRight'
	});
//成功并获取数据
	$search.on('getSearchData',function(ev,data){
		var $elem = $(this);
		var $layer = $elem.find('.search-layer');
		var data = data.result;
		var html = setHTML(data,6);
		 $elem.search('appendHtml',html);
		//控制下拉层显示隐藏
		if(html == ''){
			console.log('html为空');//能走到这里吗
			$elem.search('hideLayer');
		}else{
			$elem.search('showLayer');
		}	
	})
//获取数据失败
	$search.on('getNoData',function(ev){
		console.log('失败');
		$elem.search('appendHtml','');
		$elem.search('hideLayer');
	})


	function setHTML(data,max){
		var html = '';
		for(var i=0;i<data.length;i++){
			if(i >= max) break;
			html += '<li class="search-item">'+data[i][0]+'</li>'
		}
		return html;
	}
/*头部搜索逻辑--------------------结束*/

/*category逻辑--------------------结束*/
	var $category = $('.focus .category .dropdown');
	$category.dropdown({
		js:true,
		mode:'slideDownUp'
	});
	//监听显示隐藏事件
	$category.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		if(ev.type == 'dropdown-show'){
			loadHtmlOnce($(this),buildCategoryLayer)
		}
	});
	function buildCategoryLayer($elem,data){
		var html = '';
		for(var i=0;i<data.length;i++){
			html += '<dl class="category-details">'
			html += '<dt class="category-details-title fl">'
			html += '<a href="#" class="category-details-title-link">'+data[i].title+'</a>'
			html += '</dt>'
			html += '<dd class="category-details-item fl">'
			for(var j=0;j<data[i].items.length;j++){
				html += '<a href="#" class="link">'+data[i].items[j]+'</a>'
			}
			html += '</dd>'
			html += '</dl>					'
		}
		setTimeout(function(){
			$elem.find('.dropdown-layer').html(html);
			$elem.data('isLoaded',true);
		},200)
	}
/*category逻辑--------------------结束*/

/*焦点轮播图逻辑--------------------结束*/
	var $carousel = $('.carousel .carousel-wrap');
	$carousel.on('carousel-show',function(ev,index,elem){
		var $elem=$(elem);
		var $img=$elem.find('.carousel-img');
		var imgUrl=$img.data('src');
		// $img.attr('src',imgUrl);//不推荐直接设置属性方法，容易出现错误(比如网速慢)
		var image = new Image();
		image.onload = function(){
			$img.attr('src',imgUrl);
		}
		image.onerror=function(){
			$img.attr('src','images/focus-carousel/placeholder.png')
		}
		image.src=imgUrl;//相当于浏览器缓存了一张图片，必须放在image事件后，否则会出错

	})
	$carousel.carousel();

/*焦点轮播图逻辑--------------------结束*/

})(jQuery);