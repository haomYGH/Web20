function reqMovieData(url,query,successData){
  wx.request({
    // url: 'http://t.yushu.im/v2/movie/in_theaters?start=0&count=3',
    url: url,//'http://t.yushu.im/v2/movie/in_theaters'
    data: {
      ...query
    },
    // header: {
    //   'content-type': 'application/json' // 默认值
    // },
    success (res) {
      successData(formatMovieListData(res.data.subjects))
    }
  })
}
function formatMovieListData(data){
  return data.map(function (item) {
    return {
      coverImg: item.images.large,
      title: item.title,
      stars: coverStarsToArray(item.rating.stars),
      score: item.rating.average
    }
  })
}
function coverStarsToArray(stars){
  /**
   * stars=35时，就相当于3.5课星星。因为没有准备半颗星的icon所以向下取证(取第一位)
   * 一共5个星星：[1,1,1,1,1]
   */
  var arr = [];
  var num = stars.toString().substring(0,1);//toString是转成字符串类型，subString是取第一位(字符串上的方法)
  for(var i=1;i<=5;i++){
    if(i<=num){
      arr.push(1)
    }else{
      arr.push(0)
    }
  }
  return arr;
}

module.exports = {
  reqMovieData
}
