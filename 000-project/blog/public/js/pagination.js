//自定义插件
;(function($){
    //分页器点击事件，ajax请求
    $.fn.extend({
        pagination:function(options){
            var $elem = $(this);
            $elem.on('click','a',function(){
                $this = $(this);
                //1.获取当前页码
                var currentPage = $elem.find('.active a').html() / 1;
                //2.根据当前页计算将要显示的页码
                //思路：上一页、下一页、其他(点击具体页码)
                var labelText = $this.attr('aria-label');//获取上下页码的特殊属性值
                // console.log(labelText);//Previous  Next
                var page = 1;
                if(labelText == 'Previous'){
                    page = currentPage - 1
                }else if(labelText == 'Next'){
                    page = currentPage + 1
                }
                //如果点击的是具体的页码
                else{
                    page = $this.html() / 1
                }

                var url = options.url+'?page='+page;
                var id = $elem.data('id');
                if(id){
                    url += '&id='+id;//多个参数以&隔开
                }
                //发送ajax请求
                $.ajax({
                    // url:options.url+'?page='+page+'&id='+id,
                    url:url,
                    type:'get',
                    dataType:'json'
                })
                .done(function(result){
                    // console.log('分页数据::result=>',result);
                    if(result.code == 0){
                        // console.log(result.data)
                        //构建HTML，可以抽取出去，通过自定义事件调用
                        $elem.trigger('get-data',result.data)
                    }
                })
                .fail(function(err){
                    console.log(err)
                })
            })
        }
    })
})(jQuery);