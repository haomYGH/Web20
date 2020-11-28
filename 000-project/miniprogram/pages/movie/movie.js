var {reqMovieData} = require('../../utils/util.js')
//获取全局app
var app = getApp();
// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    /*
    wx.request({
      // url: 'http://t.yushu.im/v2/movie/in_theaters?start=0&count=3',
      url: 'http://t.yushu.im/v2/movie/in_theaters',
      data: {
        start: 0,
        count: 3
      },
      // header: {
      //   'content-type': 'application/json' // 默认值
      // },
      success (res) {
        console.log(res.data)
        var data = res.data.subjects.map(function(item){
          return {
            coverImg:item.images.large,
            title:item.title,
            stars:item.rating.stars,
            score:item.rating.average
          }
        })
        // console.log(movie_item_data)
        _this.setData({
          inTheaters:data
        })
      }
    })
    */
   var baseUrl = app.GLOBAL_DATA.baseUrl;
  //  console.log(baseUrl)
   reqMovieData(baseUrl+'/in_theaters',{start: 0,count: 3},function(successData){
    _this.setData({inTheatersData:successData})
   })
   reqMovieData(baseUrl+'/coming_soon',{start: 0,count: 3},function(successData){
    _this.setData({comingSoonData:successData})
   })
   reqMovieData(baseUrl+'/top250',{start: 0,count: 3},function(successData){
    _this.setData({top250Data:successData})
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 更多>
   */
  tapMore:function(ev){
    // console.log(ev)//可以拿到data-*
    var type = ev.currentTarget.dataset.type;
    wx.navigateTo({
      url: './movie-more/movie-more?type='+type
    })
  }
})