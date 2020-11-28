// pages/movie/movie-more/movie-more.js
var {reqMovieData} = require('../../../utils/util');
var app = getApp();
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
    var type = options.type;
    var baseUrl = app.GLOBAL_DATA.baseUrl;
    var requestUrl = '';
    var navigationBarTitle = '';
    switch (type) {
      case 'inTheatersData':
        requestUrl = baseUrl + '/in_theaters';
        navigationBarTitle = '正在热映';
        break;
      case 'comingSoonData':
        requestUrl = baseUrl + '/coming_soon';
        navigationBarTitle = '即将上映';
        break;
      case 'top250Data':
        requestUrl = baseUrl + '/top250';
        navigationBarTitle = '豆瓣TOP250';
        break;
    }
    //保存当前加载地址
    this.setData({requestUrl})
    //设置顶部标题
    wx.setNavigationBarTitle({
      title:navigationBarTitle
    });
    //加载数据Loading
    wx.showNavigationBarLoading();
    // console.log(requestUrl)
    /*
    reqMovieData(requestUrl,null,function(data){
      _this.setData({movies:data},function(){
        //数据加载完毕，隐藏Loading
        wx.hideNavigationBarLoading()
      })
    })
    */
   reqMovieData(requestUrl,null,this.getMovieData)
  },
  //获取数据成功共通
  getMovieData:function(data){
    this.setData({movies:data},function(){
      //数据加载完毕，隐藏Loading
      wx.hideNavigationBarLoading()
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
    //下拉重新加载数据
    wx.showNavigationBarLoading();
    reqMovieData(this.data.requestUrl,null,this.getMovieData)
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

  }
})