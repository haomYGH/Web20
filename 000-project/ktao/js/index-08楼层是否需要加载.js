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
	//图片懒加载
	function lazyLoadImg(imgUrl,success,error){
		var img = new Image();
		img.onload=function(){
			// success();
			typeof success == 'function' && success();
		}
		img.onerror = function(){
			// error();
			typeof error == 'function' && error();
		}
		//模拟网络延迟加载
		setTimeout(function(){
			img.src = imgUrl;
		},200)
	}

	//轮播图懒加载
	function carouselLazyLoad($elem){
		var totalImg = $elem.find('.carousel-img').length;
		var itemLoad={};//{0:loaded,1:loaded}
		//并且使用事件移除，当所有图片加载完毕后移除事件。(注：只能移除有名函数)
		var totalLoadImg = 0;
		// console.log(totalImg);//4
		var fnload =null;
		//1。加载图片
		$elem.on('carousel-show',fnload=function(ev,index,elem){
			if(!itemLoad[index]){
				$elem.trigger('carousel-img',[index,elem])
			}
		})
		//2。执行加载
		$elem.on('carousel-img',function(ev,index,elem){
			var $elem=$(elem);
			var $imgs=$elem.find('.carousel-img');
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl=$img.data('src');//拿到每张图片的地址
				// lazyLoadImg(imgUrl,function(){},function(){})
				lazyLoadImg(imgUrl,function(){
					$img.attr('src',imgUrl);
				},function(){
					$img.attr('src','images/focus-carousel/placeholder.png');
				})
				//加载完毕
				itemLoad[index]='loaded';
				totalLoadImg++;
				//判断是否需要移除事件
				if(totalLoadImg == totalImg){
					// elem.off('carousel-show',fnload)
					$elem.trigger('carousel-loaded')
				}		
			})
		})
		//3。加载完毕
		$elem.on('carousel-loaded',function(){
			$elem.off('carousel-show',fnload)
		})		
	}	
	/*
		懒加载共通函数
		options = {
			$elem:$elem,
			totalImg:5,
			eventName:'carousel-show',
			eventPerfix:'carousel'
		}
	 */		
	//懒加载共通函数
	function lazyLoad(options){

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

/*焦点区域逻辑--------------------开始*/

	/*category逻辑--------------------开始*/
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

	/*焦点轮播图逻辑--------------------开始*/
	var $carousel = $('.carousel .carousel-wrap');

	carouselLazyLoad($carousel);
	$carousel.carousel({});

	/*焦点轮播图逻辑--------------------结束*/
/*焦点区域逻辑--------------------结束*/

/*今日热销逻辑--------------------开始*/
	var $todaysCarousel = $('.todays .carousel-wrap');
	
	carouselLazyLoad($todaysCarousel);
	$todaysCarousel.carousel({
		mode:'slideDownUp',
		autoplay:0
	});
/*今日热销逻辑--------------------结束*/

/*楼层逻辑--------------------开始*/
	// var $floor = $('.floor').eq(0);//事件应该绑定在谁身上
	var $floors=$('.floor');
	var $win=$(window);
	var $doc=$(document);

	//执行单个楼层(测试用)	
	// floorLazyLoad($floor);
	// 遍历所有楼层，并把它包装成jQ对象$(this)
	/*
	$floors.each(function(){
		floorLazyLoad($(this));
	})
	*/
	$win.on('load resize scroll',function(){
		clearTimeout($doc.showFloor);
		$doc.showFloor=setTimeout(function(){
			showFloor();
		},300)
	})
	$floors.tab({});
	//遍历每个楼层判断是否在可视区
	function showFloor(){
		$floors.each(function(index,elem){
			if(isVisible($(elem))){
				console.log(index,elem);//在可视区就去加载
			}
		})
	}
	// 判断是否在可视区
	function isVisible($elem){
		return ($elem.offset().top<$win.height()+$win.scrollTop()) && ($elem.offset().top+$elem.height()>$win.scrollTop());
	}
	function floorLazyLoad($elem){
		var totalImg = $elem.find('.floor-img').length;
		var itemLoad={};//{0:loaded,1:loaded}
		//并且使用事件移除，当所有图片加载完毕后移除事件。(注：只能移除有名函数)
		var totalLoadImg = 0;
		// console.log(totalImg);//4
		var fnload =null;
		//1。加载图片
		$elem.on('tab-show',fnload=function(ev,index,elem){
			if(!itemLoad[index]){
				$elem.trigger('tab-load',[index,elem])
			}
		})
		//2。执行加载
		$elem.on('tab-load',function(ev,index,elem){
			var $elem=$(elem);
			var $imgs=$elem.find('.floor-img');
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl=$img.data('src');//拿到每张图片的地址
				// lazyLoadImg(imgUrl,function(){},function(){})
				lazyLoadImg(imgUrl,function(){
					$img.attr('src',imgUrl);
				},function(){
					$img.attr('src','images/focus-carousel/placeholder.png');
				})
				//加载完毕
				itemLoad[index]='loaded';
				totalLoadImg++;
				//判断是否需要移除事件
				if(totalLoadImg == totalImg){
					// elem.off('tab-show',fnload)
					$elem.trigger('tab-loaded')
				}		
			})
		})
		//3。加载完毕
		$elem.on('tab-loaded',function(){
			$elem.off('tab-show',fnload)
	})		
	}			
/*楼层逻辑--------------------结束*/
})(jQuery);