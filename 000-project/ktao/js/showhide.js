
;(function($){
	const init = ($elem,hiddenCallback)=>{
		$elem.removeClass('transition');
		if($elem.is(':hidden')){
			$elem.data('status','hidden');
			//处理元素是隐藏状态时将其水平方向值全部归零,为左右卷入卷出动画准备
			typeof hiddenCallback == 'function' && hiddenCallback()
		}else{
			$elem.data('status','shown');
		}
	}
	const show = ($elem,callBack)=>{
		//获取元素的显示隐藏状态信息
		if($elem.data('status') == 'shown') return ;
		if($elem.data('status') == 'show') return ;
		$elem.trigger('show').data('status','show');//在外边监听，来操作这个时候要做什么。常用来加载数据
		callBack();
	}
	const hide = ($elem,callBack)=>{
		//获取元素的显示隐藏状态信息
		if($elem.data('status') == 'hidden') return ;
		if($elem.data('status') == 'hide') return ;
		$elem.trigger('hide').data('status','hide');
		callBack()
	}		
	const slient = {
		init:$elem=>init($elem),
		show:($elem)=>{
			show($elem,()=>{
				$elem.show();
				$elem.trigger('shown').data('status','shown');
			})
		},
		hide:($elem)=>{
			hide($elem,()=>{
				$elem.hide();
				$elem.trigger('hidden').data('status','hidden');
			})
		}			
	}
	const js = {
		fade:{
			init:($elem)=>{
				js._init($elem)
			},
			show:($elem)=>{
				js._show($elem,'fadeIn')
			},
			hide:($elem)=>{
				js._hide($elem,'fadeOut');
			}
		},
		slideDownUp:{
			init:($elem)=>{
				js._init($elem)
			},
			show:($elem)=>{
				js._show($elem,'slideDown')
			},
			hide:($elem)=>{
				js._hide($elem,'slideUp');
			}
		},
		slideLeftRight:{
			init:($elem)=>{
				js._customInit($elem,{
					borderLeftWidth:0,
					paddingLeft:0,
					width:0,
					paddingRight:0,
					borderRightWidth:0
				})
			},
			show:($elem)=>{
				js._customShow($elem);
			},
			hide:($elem)=>{
				js._customHide($elem,{
					borderLeftWidth:0,
					paddingLeft:0,
					width:0,
					paddingRight:0,
					borderRightWidth:0
				})
			}
		},
		fadeSlideLeftRight:{
			init:($elem)=>{
				js._customInit($elem,{
					borderLeftWidth:0,
					paddingLeft:0,
					width:0,
					paddingRight:0,
					borderRightWidth:0,
					opacity:0
				})
			},
			show:($elem)=>{
				js._customShow($elem);
			},
			hide:($elem)=>{
				js._customHide($elem,{
					borderLeftWidth:0,
					paddingLeft:0,
					width:0,
					paddingRight:0,
					borderRightWidth:0,
					opacity:0
				})
			}
		}
	}
	js._init = ($elem)=>{
		init($elem);
	}
	js._show = ($elem,mode)=>{
		show($elem,()=>{
			$elem
			.stop()
			[mode](()=>{
				$elem.trigger('shown').data('status','shown');
			});
		})
	}
	js._hide = ($elem,mode)=>{
		hide($elem,()=>{
			$elem
			.stop()
			[mode](()=>{
				$elem.trigger('hidden').data('status','hidden');
			});
		})
	}	
	js._customInit = ($elem,options)=>{
		//1.获取元素的水平方向的目标值,并且存在元素上
		var style = {}
		for(key in options){
			style[key] = $elem.css(key)
		}
		$elem.data('style',style);
		//2.如果元素是隐藏状态则把水平方向上值全部归0
		init($elem,()=>{
			$elem.css(options)
		})
	}
	js._customShow = ($elem)=>{
		show($elem,()=>{
			$elem.show();//display:block
			var style = $elem.data('style');
			$elem
			.stop()
			.animate(style,()=>{
				$elem.trigger('shown').data('status','shown');
			})
		})
	}
	js._customHide = ($elem,options)=>{
		hide($elem,()=>{
			$elem
			.stop()
			.animate(options,()=>{
				$elem.hide();//display:none
				$elem.trigger('hidden').data('status','hidden');
			})
		})
	}

	var DEFAULT = {
		js:true,
		mode:'fade'
	}

	//获取显示隐藏方法
	const getShowHide = ($elem,options)=>{
		var showHideFn = slient;
		if(options.js){
			showHideFn = js[options.mode];
		}
		//初始化
		showHideFn.init($elem);
		return {
			show:showHideFn.show,
			hide:showHideFn.hide
		}
	}

	$.fn.extend({
		showHide:function(options){
			//1.实现隐式迭代和链式调用
			return this.each(()=>{
				var $elem = $(this);
				var showHideObj = $elem.data('showHideObj');//false true
				//单例模式
				if(!showHideObj){
					//合并配置信息
					options = $.extend({},DEFAULT,options);
					//2.获取显示隐藏的方法
					var showHideObj = getShowHide($elem,options);
					//将显示隐藏方法存到当前dom节点上
					$elem.data('showHideObj',showHideObj);
				}
				//判断当传入的参数是方法时,则调用该方法
				if(typeof showHideObj[options] == 'function'){
					//调用显示隐藏方法时必须传入jQuery对象
					showHideObj[options]($elem);
				}
			})
		}
	})
})(jQuery);