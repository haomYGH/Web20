// pages/article/article.js
var {articles} = require('../../data/db')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    /*
    //a)模拟数据
    articles:[
      {
        avatar:'../../images/avatar/u1.jpg',
        date:'2019-05-06',
        title:'我是标题',
        img:'../../images/article/a1.jpg',
        desc:'我是描述',
        star:30,
        view:40
      },
      {
        avatar: '../../images/avatar/u2.jpg',
        date: '2019-05-07',
        title: '我是标题2',
        img: '../../images/article/a2.jpg',
        desc: '我是描述2',
        star: 40,
        view: 50
      }      
    ]*/
    articles:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    //b)模拟数据加载
    //c)将数据抽取出去(模块化)
    var articles = [
      {
        avatar:'../../images/avatar/u1.jpg',
        date:'2019-05-06',
        title:'我是标题',
        img:'../../images/article/a1.jpg',
        desc:'我是描述',
        star:30,
        view:40
      },
      {
        avatar: '../../images/avatar/u2.jpg',
        date: '2019-05-07',
        title: '我是标题2',
        img: '../../images/article/a2.jpg',
        desc: '我是描述2',
        star: 40,
        view: 50
      }      
    ];*/
    //改变data不能用this.data = 来直接赋值。
    //setDate改变data
    this.setData({
      articles:articles
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
  //跳转文章详情
  tapArticleItem:function(ev){
    // console.log(ev.currentTarget.dataset);//注册了监听点击事件的组件,就是最外层的view
    // console.log(ev.target.dataset);//实际触发了点击事件的组件
    var articleId = ev.target.dataset.articleId;
    wx.navigateTo({
      url: './article-detail/article-detail?articleId='+articleId,
    })
  }
})