/*
* @Author: Administrator
* @Date:   2020-07-14 11:04:38
* @Last Modified by:   Administrator
* @Last Modified time: 2020-07-16 09:57:49
*/
;(function($){
	$goRegister = $('#go-register');
	$goLogin = $('#go-login');

	//登录 => 注册
	$goRegister.on('click',function(){
		$('#login').hide();
		$('#register').show();
	})
	//注册 => 登录
	$goLogin.on('click',function(){
		$('#register').hide();
		$('#login').show();
	})
	//前台数据验证(共通出来，因为不光这里需要验证)
	// 验证规则
	// 用户名：用户名以字母开头包含数字或下划线的3-10字符
	var usernameReg = /^[a-z][a-z0-9_]{2,9}$/i;
	// 密码：不能为空，任意字符3到6位。
	var passwordReg = /^\w{3,6}$/;

	//注册
	$register = $('#register');
	$('#sub-register').on('click',function(){
		var username = $register.find("[name='username']").val();
		var password = $register.find("[name='password']").val();
		var repassword = $register.find("[name='repassword']").val();
		// 前台验证
		var errMsg = '';
		//提示信息errMsg通过html方法插入页面
		var $err = $register.find('.err');
		if(!usernameReg.test(username)){//test是正则上的方法
			errMsg = '用户名是以字母开头，包含数字或者下划线的3到10位字符';
		}
		else if(!passwordReg.test(password)){
			errMsg = '密码是4位任意字符';
		}
		else if(password != repassword){
			errMsg = '两次密码输入不一致'
		}
		else{
			errMsg = '';//b)重置
		}
		//验证不通过
		if(errMsg){
			$err.html(errMsg);//a)显示错误
		}
		//验证通过
		else{
			//发送ajax请求,后台验证
			$.ajax({
				url:'/user/register',
				type:'post',
				data:{
					username:username,
					password:password
				},
				success:function(data){//data获取的是请求返回值res.json/end/send
					// console.log(data)
					if(data.code == 0){
						$err.html('');//2)重置
						//注册成功,跳转到登录页面,通过trigger驱动事件
						$goLogin.trigger('click');
						window.location.reload();

					}
					//注册失败
					else{
						$err.html(data.message);//1)显示错误
					}
				},
				error:function(err){
					console.log(err)
				}
			})
		}
	})
	//登录
	$login = $('#login');
	$('#sub-login').on('click',function(){
		var username = $login.find("[name='username']").val();
		var password = $login.find("[name='password']").val();
		// 前台验证
		var errMsg = '';
		//提示信息errMsg通过html方法插入页面
		var $err = $login.find('.err');
		if(!usernameReg.test(username)){//test是正则上的方法
			errMsg = '用户名是以字母开头，包含数字或者下划线的3到10位字符';
		}
		else if(!passwordReg.test(password)){
			errMsg = '密码是4位任意字符';
		}
		else{
			errMsg = '';//b)重置
		}
		//验证不通过
		if(errMsg){
			$err.html(errMsg);//a)显示错误
		}
		//验证通过
		else{
			//发送ajax请求,后台验证
			$.ajax({
				url:'/user/login',
				type:'post',
				dataType:'json',
				data:{
					username:username,
					password:password
				},
				success:function(data){//data获取的是请求返回值res.json/end/send
					// console.log(data)
					if(data.code == 0){
						$err.html('');//2)重置
						//登陆成功后，跳转登陆后的页面
						/*
						$('#login').hide();
						$('#user-info').show();
						$('#user-info').find('span').html(data.user.name);
						*/
						//刷新页面
						window.location.reload();
					}
					//注册失败
					else{
						$err.html(data.message);//1)显示错误
					}
				},
				error:function(err){
					console.log(err)
				}
			})
		}
	})
	/*
	共通出去logout.js
	//用户推出
	$('#logout').on('click',function(){
		$.ajax({
			url:'/user/logout',
			type:'get'
		})
		.done(function(data){
			// console.log(data);
			if(data.code == 0){
				window.location.href = '/';//返回首页
			}
		})
		.fail(function(err){
			$('user-info').find('.err').html('请求失败，请稍后再试');
		})
	})
	*/
	//分类数据局部更新，不刷新页面
	var $articlePage = $('#article-page');
	//构建文章列表
	function buildArticleHTML(docs){
		var html = '';
		docs.forEach(function(article){
			html += `
			<div class="panel panel-default content-item">
			<div class="panel-heading">
				<h3 class="panel-title">
				<a href="/detail/${ article._id.toString() }" class="link" target="_blank">${article.title}</a>
				</h3>
			</div>
			<div class="panel-body">
				${article.intro}
			</div>
			<div class="panel-footer">
				<span class="glyphicon glyphicon-user"></span>
				<span class="panel-footer-text text-muted">${article.author.name}</span>
				<span class="glyphicon glyphicon-th-list"></span>
				<span class="panel-footer-text text-muted">${article.category.name}</span>
				<span class="glyphicon glyphicon-time"></span>
				<span class="panel-footer-text text-muted">${ moment(article.createdAt).format('YYYY-MM-DD HH:mm:ss') }</span>
				<span class="glyphicon glyphicon-eye-open"></span>
				<span class="panel-footer-text text-muted"><em>${ article.click }</em>已阅读</span>
			</div>
			</div>		
			`;
		})

		return html;
	}
	//构建分页器
	function buildPaginationHtml(page,list){
		var html = '';
		html += `
			<ul class="pagination">
			<li>
			<a href="javascript:;" aria-label="Previous">
			<span aria-hidden="true">&laquo;</span>
			</a>
			</li>`
		list.forEach(function(i){
			// {% if i == page %}
			if(i == page){
				html += `<li class="active"><a href="javascript:;">${ i }</a></li>`
			}else{
				html += `<li><a href="javascript:;">${ i }</a></li>`
			}
		})
		html += `
			<li>
			<a href="javascript:;" aria-label="Next">
			<span aria-hidden="true">&raquo;</span>
			</a>
			</li>
			</ul>		
		`;
		return html;
	}
	//监听事件构建首页文章HTML
	$articlePage.on('get-data',function(ev,data){
		// console.log(data);
		//1.更新分页文章
		$('#article-wrap').html(buildArticleHTML(data.docs));
		//2.更新分页器
		//不用再判断页数是否大于1页,原因：事件'get-data'是点击的时候执行的回调函数,页面加载的的时候已经判断了页码。这里仅仅是更新替换
		$('#article-page').html(buildPaginationHtml(data.page,data.list));
	})
	$articlePage.pagination({
		url:'/articles'
	});

	//list页面文章列表显示http://127.0.0.1:3000/list/5f19803a00b355291c81ccc3
	//同首页文章列表展示（同上）
	
	//6.详情页评论分页逻辑(前提是能显示分页器才能获取这个id)
	var $commentPage = $('#comment-page');//需要保证页面始终有这个标签，不管有没有评论(是不是有点不好)
	function buildCommentHtml(comments){
		var html = '';
		comments.forEach(function(comment){
			var createdTime = moment(comment.createdAt).format('YYYY - MM - DD HH:mm:ss')
			html += `<div class="panel panel-default">
			          	 <div class="panel-heading">
			              <h3 class="panel-title">${comment.user.name} 发布于 ${createdTime}</h3>
			            </div>
			            <div class="panel-body">
			              ${comment.content}
			            </div>
			          </div>`
		})
		return html;
	}
	//监听事件构建分页数据HTML结构
	$commentPage.on('get-data',function(ev,data){
		//构建详情评论数据结构
		$('#comment-wrap').html(buildCommentHtml(data.docs));
		//构建分页器
		if(data.pages > 1){
			$('#comment-page').html(buildPaginationHtml(data.page,data.list))//还需要传pages吗
		}else{
			$('#comment-page').html('')
		}
		
	})
	$commentPage.pagination({
		url:'/comment/list'
	})	
})(jQuery);