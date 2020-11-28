/*
* @Author: Administrator
* @Date:   2020-07-04 17:21:09
* @Last Modified by:   haom
* @Last Modified time: 2020-07-07 00:53:26
*/
;(function($){
	//添加
	$('.todo-input').on('keydown',function(ev){
		// console.log(ev.keyCode)
		if(ev.keyCode == 13){
			$.ajax({
				url:'/add',
				type:'post',
				dataType:'json',//若出现跨域请求请使用'jsonp'
				data:{
					task:$('.todo-input').val()
				},
				success:function(res){//Response里面的东西
					//根据后台Response返回数据做出不同处理
					if(res.code == 0 ){
						const data = res.data;
						let $dom = $(`<li class="todo-item" data-id="${data.id}">${data.task}</li>`);
						$('.todo-list').append($dom);
						$('.todo-input').val('');//添加后将输入框值置空
					}else{//code == 1
						console.log(res.message)
					}
				},
				error:function(err){
					console.log(err)
				}
			})
		}
	})
	//删除
	//通过事件代理监听。(监听到动态生成的元素上的话，当后期新生成数据，不会监听得到)
	$('.todo-list').on('click','.todo-item',function(){
		$this = $(this);
		let id = $this.data('id');
		// console.log(id);
		$.ajax({
			url:'/del',
			type:'get',
			dataType:'json',
			data:{
				id:id
			},
			success:function(res){
				if(res.code == 0){
					$this.remove();
				}else{
					console.log(res.message);
				}
			},
			error:function(err){
				console.log(err)
			}
		})
	})
})(jQuery);