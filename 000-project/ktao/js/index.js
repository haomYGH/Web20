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

	
	/*
		懒加载共通函数
		options = {
			$elem:$elem,
			totalNum:5,
			eventName:'carousel-show',
			eventPerfix:'carousel'
		}
	 */	
	//懒加载共通函数
	function lazyLoad(options){
		var $elem=options.$elem;
		var totalNum = options.totalNum;
		var eventName=options.eventName;
		var eventPerfix=options.eventPerfix;

		var itemLoad={};
		var totalLoadNum = 0;
		var fnload =null;
		//1.监听事件开始加载		
		$elem.on(eventName,fnload=function(ev,index,elem){
			if(!itemLoad[index]){
				$elem.trigger(eventPerfix+'-load',[index,elem,function(){
					//item加载完毕
					itemLoad[index]='loaded';
					totalLoadNum++;
					if(totalLoadNum == totalNum){
						$elem.trigger(eventPerfix+'-loaded')
					}		
				}])
			}
		})
		//3.加载完毕	
		$elem.on(eventPerfix+'-loaded',function(){
			$elem.off(eventName,fnload)
		})		
	}	
	//楼层：只请求一次HTML数据
	function getDataOnceHtml($elem,url,callback){
		var data=$elem.data('url');
		if(!data){
			$.getJSON(url,function(resData){
				$elem.data('url',resData);
				callback(resData);
			})
		}else{
			callback(data);
		}
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

	lazyLoad({
		$elem:$carousel,
		totalNum:$carousel.find('.carousel-img').length,
		eventName:'carousel-show',
		eventPerfix:'carousel'
	});
	//2.焦点轮播图：执行加载
	$carousel.on('carousel-load',function(ev,index,elem,success){
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
			success();	
		})
	})	
	$carousel.carousel({});

	/*焦点轮播图逻辑--------------------结束*/
/*焦点区域逻辑--------------------结束*/

/*今日热销逻辑--------------------开始*/
	var $todaysCarousel = $('.todays .carousel-wrap');
	
	lazyLoad({
		$elem:$todaysCarousel,
		totalNum: $todaysCarousel.find('.carousel-img').length,
		eventName:'carousel-show',
		eventPerfix:'carousel'
	});
	//2.今日热销图片：执行加载
	$todaysCarousel.on('carousel-load',function(ev,index,elem,success){
		var $elem=$(elem);
		var $imgs=$elem.find('.carousel-img');
		$imgs.each(function(){
			var $img = $(this);
			var imgUrl=$img.data('src');
			lazyLoadImg(imgUrl,function(){
				$img.attr('src',imgUrl);
			},function(){
				$img.attr('src','images/focus-carousel/placeholder.png');
			})
			success();	
		})
	})	
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
	$win.on('load resize scroll',function(){
		clearTimeout($doc.showFloor);
		$doc.showFloor=setTimeout(function(){
			showFloor();
		},300)
	})
	// floorHtmlLazyLoad();
	lazyLoad({
		$elem:$doc,
		totalNum: $floors.find('.carousel-img').length,
		eventName:'floor-show',
		eventPerfix:'floor'
	});	
	//楼层HTML和图片：执行加载
	$doc.on('floor-load',function(ev,index,elem,success){
		var $elem=$(elem);
		getDataOnceHtml($doc,'data/floor/floorData.json',function(data){
			var html = buildFloorHtml(data[index]);
			$elem.find('.container').html(html);
		//3.实现楼层图片懒加载
			lazyLoad({
				$elem:$elem,
				totalNum:$elem.find('.floor-img').length,
				eventName:'tab-show',
				eventPerfix:'tab'
			});
			//2.楼层图片：执行加载
			$elem.on('tab-load',function(ev,index,elem,success){
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
					success();	
				})
			})				
		//4.选项卡切换(只有结构出来了才能使用)
			$(elem).tab({});
		})

		//HTML加载完毕
		success();
	})
	//遍历每个楼层判断是否在可视区
	function showFloor(){
		$floors.each(function(index,elem){
			if(isVisible($(elem))){
				$doc.trigger('floor-show',[index,elem]);
			}
		})
	}
	// 判断是否在可视区
	function isVisible($elem){
		return ($elem.offset().top<$win.height()+$win.scrollTop()) && ($elem.offset().top+$elem.height()>$win.scrollTop());
	}
	//楼层HTML懒加载	
	function floorHtmlLazyLoad($elem){
		var totalNum = $floors.length;
		var itemLoad={};
		var totalLoadNum = 0;
		var fnload =null;
		//1。加载HTML
		$doc.on('floor-show',fnload=function(ev,index,elem){
			if(!itemLoad[index]){
				$doc.trigger('floor-load',[index,elem])
			}
		})
		//2。执行加载
		$doc.on('floor-load',function(ev,index,elem){
			var $elem=$(elem);
			//1.加载HTML数据(jsonp)
			getDataOnceHtml($doc,'data/floor/floorData.json',function(data){
				// console.log(data);
				console.log(data[index]);
				var html = buildFloorHtml(data[index]);
				// console.log(html);
			//2.生成HTML结构并插入到楼层中
				$elem.find('.container').html(html);
			//3.实现楼层图片懒加载
				// floorImgLazyLoad($(elem));
				lazyLoad({
					$elem:$elem,
					totalNum:$elem.find('.floor-img').length,
					eventName:'tab-show',
					eventPerfix:'tab'
				});
				//2.楼层图片：执行加载
				$elem.on('tab-load',function(ev,index,elem,success){
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
						success();	
					})
				})				
			//4.选项卡切换(只有结构出来了才能使用)
				$(elem).tab({});
			})

			//HTML加载完毕
			itemLoad[index]='loaded';
			totalLoadNum++;
			//判断是否需要移除事件
			if(totalLoadNum == totalNum){
				// elem.off('floor-show',fnload)
				$doc.trigger('floor-loaded')
			}		
		})
		//3。加载完毕
		$doc.on('floor-loaded',function(){
			$doc.off('floor-show',fnload)
		})		
	}	
	//生成html
	function buildFloorHtml(oneFloorData){
		var html='';
		html += buildHdHtml(oneFloorData);
		html += buildBdHtml(oneFloorData);
		return html;
	}	
	function buildHdHtml(oneFloorData){
		var html = '';
			html += '<div class="floor-hd">';
				html += '<h2 class="floor-title fl">';
					html += '<span class="floor-title-num">'+oneFloorData.num+'F</span>';
					html += '<span class="floor-title-text">'+oneFloorData.text+'</span>';
				html += '</h2>';
				html += '<ul class="tab-item-wrap fr">';
				for(var i=0;i<oneFloorData.tabs.length;i++){
					html += '<li class="fl">';
						html += '<a class="tab-item" href="javascript:;">'+oneFloorData.tabs[i]+'</a>';
					html += '</li>';
					if(i != oneFloorData.tabs.length-1){
					html += '<li class="fl tab-divider"></li>';
					}
				}
				html += '</ul>';
			html += '</div>	';
		return html;
	}
	function buildBdHtml(oneFloorData){
		// var bdItems = oneFloorData.items;
		var html ='';
		html += '<div class="floor-bd">';
		for(var i=0;i<oneFloorData.items.length;i++){
			html += '<ul class="tab-panel clearfix">';
			for(var j=0;j<oneFloorData.items[i].length;j++){
				html += '<li class="floor-item fl">';
					html += '<p class="floor-item-pic">';
						html += '<a href="#">';
							html += '<img class="floor-img" data-src="images/floor/'+(oneFloorData.num)+'/'+(i+1)+'/'+(j+1)+'.png" src="images/floor/loading.gif" alt="">';
						html += '</a>';
					html += '</p>';
					html += '<p class="floor-item-name">';
						html += '<a class="link" href="#">'+oneFloorData.items[i][j].name+'</a>';
					html += '</p>';
					html += '<p class="floor-item-price">￥'+oneFloorData.items[i][j].price+'</p>';
				html += '</li>';
			}
			html += '</ul>';
		}
		html += '</div>';
		return html;
	}
/*楼层逻辑--------------------结束*/

/*电梯逻辑--------------------结束*/
	var $elevator=$('#elevator');
	var $elevatorItems=$('.elevator-item');
	//监听显示电梯
	$win.on('load resize scroll',function(){
		clearTimeout($elevator.setElevatorShowTimer);
		$elevator.setElevatorShowTimer=setTimeout(setElevator,300);
	})
	//监听点击电梯到达指定楼层(事件代理)
	$elevator.on('click','.elevator-item',function(){
		var index = $elevatorItems.index(this);
		$('html,body').animate({
			scrollTop:$floors.eq(index).offset().top
		})
	})	

	//获取当前当前显示电梯号
	function getElevator(){
		var num=-1;//没有显示楼层时，隐藏电梯
		$floors.each(function(index,elem){
			console.log(index,elem);
			num = index;//最后一层：楼层上边距不大$win.scrollTop()+$win.height()/2时，
			// console.log(index);//为啥打印2次
			// console.log('楼层上边距',$(elem).offset().top);
			// console.log('滑动距离',$win.scrollTop());
			// console.log('视口高度',$win.height()/2);
			if($(elem).offset().top > $win.scrollTop()+$win.height()/2){//除以2是偏移量
				num = index - 1;//思路：通过判断下一层不在显示区来推断上一层在可视区
				return false;//终止each循环
			}
		});

		return num;
	}
	// console.log(getElevator());
	// 设置电梯
	function setElevator(){
		var num = getElevator();
		console.log('监听显示的楼层号：：',num);
		if(num == -1){
			$elevator.fadeOut();
		}else{
			$elevator.fadeIn();
			//移除所有选中状态
			$elevatorItems.removeClass('elevator-active');
			//显示当前选中状态
			$elevatorItems.eq(num).addClass('elevator-active');
		}
	}

/*电梯逻辑--------------------结束*/

/*工具条逻辑--------------------结束*/
	//共具条-回到顶部
	$('#backToTop').on('click',function(){
		$('html,body')
		.animate({
			scrollTop:0
		})		
	})
/*工具条逻辑--------------------结束*/

})(jQuery);