// 所有的东西都是通过后台请求过来的
//上传图片总共经过2次请求,
//第一次请求将图片存在后台静态资源里，然后把图片在后台静态资源地址返回给前台
//第二次才是真正的向后台请求该图片的静态资源,然后后台把该图片返回给前台
;(function($){
    ClassicEditor
    .create( document.querySelector( '#content' ),{
        language:'zh-cn',
        ckfinder:{
			uploadUrl:'/article/uploadImage'//路由地址。第一次请求
		}
    } )
    .catch( error => {
        console.error( error );
    } );
    //表单验证
    $('#btn-submit-add').on('click',function(){
        console.log('验证');
        //1.获取数据。如果有不符合我们要求的输入，就阻止他提交，并友情提示
        // return false;
    })
})(jQuery);