//退出，清空状态信息
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