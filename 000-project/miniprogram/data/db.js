// c)将数据抽取出去(模块化)
var articles = [
  {
    id:0,
    avatar:'/images/avatar/u1.jpg',
    date:'2019-05-06',
    title:'我是标题',
    img:'/images/article/a1.jpg',
    desc:'我是描述',
    content:'我是详细内容1',
    star:30,
    view:40,
    music:{
      // http://www.333ttt.com/up/
      src: 'http://sc1.111ttt.cn/2018/1/03/13/396131202421.mp3',
      title:'冯提莫 - 佛系少女',
      coverImgUrl:'http://oxoxtpvtn.bkt.clouddn.com/%E4%B8%BA%E7%88%B1%E7%97%B4%E7%8B%82.jpg'
    }
  },
  {
    id:1,
    avatar: '/images/avatar/u2.jpg',
    date: '2019-05-07',
    title: '我是标题2',
    img: '/images/article/a2.jpg',
    desc: '我是描述2',
    content:'我是详细内容2',
    star: 40,
    view: 50,
    music: {
      src: 'http://oxoxtpvtn.bkt.clouddn.com/%E6%9D%8E%E5%81%A5%E3%80%81%E5%AD%99%E4%BF%AA%20-%20%E9%A3%8E%E5%90%B9%E9%BA%A6%E6%B5%AA%20%28Live%29.mp3',
      title: '风吹麦浪',
      coverImgUrl: 'http://oxoxtpvtn.bkt.clouddn.com/%E9%A3%8E%E5%90%B9%E9%BA%A6%E6%B5%AA.jpg'
    } 
  }      
]

module.exports = {
  articles
}