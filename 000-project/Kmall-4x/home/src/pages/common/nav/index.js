require('./style.css')
var _user = require('@service/user');
const _util = require('../../../util');

var page = {
    init:function(){
        this.loadUserName();
        this.bindEvent_logout();//用户退出
    },
    loadUserName:function(){
        _user.getUsername(function(data){//util中封装的方法返回的data
            $('.not-login').hide();
			$('.login')
			.show()
			.find('.username')
			.text(data.username)
        },function(){console.log('未登录')})
    },
    bindEvent_logout:function(){
        $('#logout').on('click',function(){
            _user.logout(function(){
                window.location.reload();//重新加载页面(刷新页面)
            },function(msg){_util._util.showErrorMsg(msg)})
        })
    }
}

$(function(){
    page.init()
})