// component/messageMarquee/index.js
//获取应用实例
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    marqueeText:{
       type:String,
       value:'我是滚动文字我是滚动文字我是滚动文字'
     },
     jumpUrl:{
       type:String,
       value:"pages/messageAll/index"
     }
  },

  /**
   * 组件的初始数据
   */
  data: {
     speed:5000, //速度
     marqueeinter:null,
     marqueeTextLeft:180,
     duration:2
  },
  //组件周期
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log('在组件实例进入页面节点树时执行');
      this.marqueeRun();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 所在页面声明周期
  pageLifetimes: {
    show: function () {
      this.marqueeRun();
      // 页面被展示
    },
    hide: function () {
      //清除定时器
      clearInterval(this.marqueeinter);
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
     //跑马灯跑动
     marqueeRun()
     {
       let that=this;
      //  console.log(that.data.marqueeText.length * 24);
       clearInterval(that.marqueeinter);
       that.marqueeinter=setInterval(()=>{
         if ((Math.abs(that.data.marqueeTextLeft) > that.data.marqueeText.length * 24 + 300) && that.data.marqueeTextLeft<0){
           that.setData({
           marqueeTextLeft:700,
           duration: 0
           })
         }else{
           that.setData({
             marqueeTextLeft: that.data.marqueeTextLeft-24,
             duration: 4
           })
         
         }
        //  console.log(that.data.marqueeTextLeft);
          
       },250);
     },
     //点击跳转到其他页面
     jumpToUrl()
     {
       let that=this;
       wx.navigateTo({
         url: that.data.jumpUrl,
         events: {
           // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
           acceptDataFromOpenedPage: function (data) {
             console.log(data)
           },
           someEvent: function (data) {
             console.log(data)
           }
          },
         success: function (res) {
           // 通过eventChannel向被打开页面传送数据
          //  res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
         }
       })
     },
  }
})
