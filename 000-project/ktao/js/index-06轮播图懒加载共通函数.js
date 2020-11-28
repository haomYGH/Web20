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
		var itemLoad={};//{0:loaded,1:loaded}
		//并且使用事件移除，当所有图片加载完毕后移除事件。(注：只能移除有名函数)
		var totalLoadImg = 0;
		var totalImg = $elem.find('.carousel-img').length;
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
			$carousel.off('carousel-show',fnload)
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

/*焦点区域逻辑--------------------结束*/

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
	/*
	//加载一个图片设置一个状态
	var itemLoad={};//{0:loaded,1:loaded}
	//并且使用事件移除，当所有图片加载完毕后移除事件。(注：只能移除有名函数)
	var totalLoadImg = 0;
	var totalImg = $carousel.find('.carousel-img').length;
	// console.log(totalImg);//4
	var fnload =null;
	//1。加载图片
	$carousel.on('carousel-show',fnload=function(ev,index,elem){
		if(!itemLoad[index]){
			$carousel.trigger('carousel-img',[index,elem])
		}
	})
	//2。执行加载
	$carousel.on('carousel-img',function(ev,index,elem){
		var $elem=$(elem);
		var $img=$elem.find('.carousel-img');
		var imgUrl=$img.data('src');
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
			// $carousel.off('carousel-show',fnload)
			$carousel.trigger('carousel-loaded')
		}		
	})
	//3。加载完毕
	$carousel.on('carousel-loaded',function(){
		$carousel.off('carousel-show',fnload)
	})
	*/
	carouselLazyLoad($carousel);
	$carousel.carousel();

	/*焦点轮播图逻辑--------------------结束*/
/*焦点区域逻辑--------------------结束*/

/*今日热销逻辑--------------------结束*/
	var $todaysCarousel = $('.todays .carousel-wrap');
	/*
	$todaysCarousel.itemLoad={};//{0:loaded,1:loaded}
	//并且使用事件移除，当所有图片加载完毕后移除事件。(注：只能移除有名函数)
	$todaysCarousel.totalLoadImg = 0;
	$todaysCarousel.totalImg = $todaysCarousel.find('.carousel-img').length;
	// console.log(totalImg);//4
	$todaysCarousel.fnload =null;
	//1。加载图片
	$todaysCarousel.on('carousel-show',$todaysCarousel.fnload=function(ev,index,elem){
		if(!$todaysCarousel.itemLoad[index]){
			$todaysCarousel.trigger('carousel-img',[index,elem])
		}
	})
	//2。执行加载
	$todaysCarousel.on('carousel-img',function(ev,index,elem){
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
			$todaysCarousel.itemLoad[index]='loaded';
			$todaysCarousel.totalLoadImg++;
			//判断是否需要移除事件
			if($todaysCarousel.totalLoadImg == $todaysCarousel.totalImg){
				// todaysCarousel.off('carousel-show',fnload)
				$todaysCarousel.trigger('carousel-loaded')
			}		
		})
	})
	//3。加载完毕
	$todaysCarousel.on('carousel-loaded',function(){
		$carousel.off('carousel-show',$todaysCarousel.fnload)
	})
	*/
	carouselLazyLoad($todaysCarousel);
	$todaysCarousel.carousel({
		mode:'slideDownUp'
	});
/*今日热销逻辑--------------------结束*/
})(jQuery);