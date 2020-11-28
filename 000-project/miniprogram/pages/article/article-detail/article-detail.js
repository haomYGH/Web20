var {articles} = require('../../../data/db')
// pages/article/article-detail/article-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var articleId = options.articleId;//具体文章标识
    // console.log(articles)//顶部引入的数据
    //处理收藏状态
    var isCollected = false;
    var articles_collection = wx.getStorageSync('articles_collection');
    if(articles_collection){
      isCollected = !!articles_collection[articleId];
    }else{
      var collects = {};
      collects[articleId] = false;
      wx.setStorageSync('articles_collection', collects)
    }
    this.setData({...articles[articleId],isCollected:isCollected});
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
   * 处理收藏，Storage保存收藏状态
   */
  tapCollect:function(){
    // wx.setStorageSync('key01',{name:'haom'})
    // console.log(wx.getStorageSync('articles_collection'))
    // console.log(this.data.isCollected)
    //改变storage里面的数据
    var articles_collection = wx.getStorageSync('articles_collection');
    var isCollected = articles_collection[this.data.id];//这个isCollected状态要从storage上拿
    articles_collection[this.data.id] = !isCollected;
    wx.setStorageSync('articles_collection', articles_collection);
    //改变视图页面
    this.setData({
      isCollected: !isCollected
    },function(){
      wx.showToast({
        title: isCollected ? '取消成功' : '收藏成功' ,
      })
    })
  },
  /**
   * 处理分享
   */
  tapShare:function(){
    wx.showActionSheet({
      itemList: ['分享到朋友圈','分享到QQ','分享到微博'],
      success (res) {
        // console.log(res.tapIndex)
        wx.showToast({
          title: itemList[res.tapIndex] + '成功',
        })
      },
      fail (res) {
        // console.log(res.errMsg)
        wx.showToast({
          icon:'none',
          title: '取消分享',
        })
      }
    })
  },
  /**
   * 处理播放背景音乐
   */
  tapMusic:function(){
    // 定义背景音乐,因为我们要使用这个实例上的方法
    var backgroundAudioManager = wx.getBackgroundAudioManager();
    //获取当前播放状态
    var isPlaying = this.data.isPlaying;
    //如果true正在播放,则点击暂停。
    if(isPlaying){
      backgroundAudioManager.pause();
      this.setData({isPlaying: false})
    }else{//如果false非播放状态，点击则播放
      //articles还是顶部引入的那个
      var music = this.data.music;
      console.log(music)
      backgroundAudioManager.src = music.src;
      backgroundAudioManager.coverImgUrl = music.coverImgUrl;
      backgroundAudioManager.title = music.title;
      this.setData({isPlaying:true})
    }

  }
})