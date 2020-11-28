;(function($){
	//新增评论
	$('#btn-sub-comment').on('click',function(){
		//1.获取评论输入框信息
		var val = $('#text-comment').val().trim();
		var $err = $('#comment .err')
		//2.验证输入框信息
		if(!val){
			$err.html('请输入评论后再提交!!!')
			return false;
		}
		else if(val.length > 100){
			$err.html('评论内容不超过100个字符')
			return false;
		}
		else{
			$err.html('')
		}

		//3.验证通过发送ajax请求
		//由于存储评论需要知道当前评论的是哪一篇文章
		//所以需要把当前文章ID传递给后台
		var articleId = $(this).data('id');
		$.ajax({
			url:'/comment/add',
			type:'post',
			dataType:'json',
			data:{
				content:val,
				articleId
			}
		})
		.done(function(result){
			if(result.code == 0){
				$('#text-comment').val('');
				$('#comment-page').trigger('get-data',result.data);
			}
		})
		.fail(function(err){
			console.log($err);
			$err.html('请求失败，请稍后再试！')
		})
	})
})(jQuery);