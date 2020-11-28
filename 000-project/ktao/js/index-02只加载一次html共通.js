
;(function($){
	//抽取共通代码
	function loadHtmlOnce($elem,cb){
		var loadUrl = $elem.data('load');
		if(!loadUrl) return;
		var isLoaded = $elem.data('isLoaded');
		if(isLoaded) return;
		$.getJSON(loadUrl,function(data){
			typeof cb == 'function' && cb($elem,data);
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
			/*
			var $elem = $(this);
			// console.log(this);//$dropdown
			var $layer = $elem.find('.dropdown-layer');
			var url = $elem.data('load');
			if(!url) return;
			//只获取一次HTML
			var isLoaded = $elem.data('isLoaded');//添加isLoaded
			if(!isLoaded){
				$.getJSON(url,function(data){
					console.log('1次就好：：：',data);
					//生成HTML
					var html = '';
					for(var i=0;i<data.length;i++){
						html += '<li><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
					}
					//将HTML插入下拉层(利用延迟定时器模拟加载)
					setTimeout(function(){
						$layer.html(html);
						$elem.data('isLoaded',true);
					},200)
				})
			}
			*/
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
var $search = $('.search');

//成功并获取数据
$search.on('getSearchData',function(ev,data){
	var $elem = $(this);
	var $layer = $elem.find('.search-layer');
	console.log(data);
	var data = data.result;
	var html = setHTML(data,6);
	 $elem.search('appendHTML',html);
	//控制下拉层显示隐藏
	if(html == ''){
		$elem.search('hideLayer');
	}else{
		$elem.search('showLayer');
	}	
})
//获取数据失败
$search.on('getNoData',function(ev){
	$elem.search('appendHTML','');
	$elem.search('hideLayer');
})

$search.search({
	mode:'slideLeftRight'
});
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
	var $category = $('.focus .dropdown');
	$category.dropdown({
		js:true,
		mode:'slideDownUp'
	});
	//监听显示隐藏事件
	$category.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		if(ev.type == 'dropdown-show'){
			loadHtmlOnce($(this),buildCategoryLayer)
			/*
			var $elem = $(this);
			var $layer = $elem.find('.dropdown-layer');
			var url = $elem.data('load');
			if(!url) return;
			var isLoaded = $elem.data('isLoaded');//添加isLoaded
			if(!isLoaded){
				$.getJSON(url,function(data){
					//生成HTML
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
					// 将HTML插入下拉层(利用延迟定时器模拟加载)
					setTimeout(function(){
						$layer.html(html);
						$elem.data('isLoaded',true);
					},200)
				})				
			}
			*/
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
$carousel.carousel();
/*焦点轮播图逻辑--------------------结束*/

})(jQuery);