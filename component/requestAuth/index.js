// component/requestAuth/index.js
//获取应用实例
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //订阅的模板Id
    temId:{
      type:String,
      value:''
    },
    //是否关闭
    isClose:{
      type:Boolean,
      value:false,
    },
    //是否订阅
    isSubs:{
      type:Boolean,
      value:true,
    },
    //是否勾选
    isCheck:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //关闭操作
    closeCom(e)
    {
      let that=this;
      console.log(e);
      console.log(e.currentTarget.dataset.action);
      //如果同意触发请求
      if (e.currentTarget.dataset.action=="agree"){
        console.log(that.data.temId);
        wx.requestSubscribeMessage({
          tmplIds: [that.data.temId],
          success(res) {
            console.log(that.data.temId);
            //代表拒绝操作
            if (res[that.data.temId] == 'reject') {

            } else {
              //插入订阅结果
            }
          },
          fail(res) {
            console.log('订阅失败回调');
          }
        })

      }
      that.setData({
        isClose:true
      })
    }
  }
})
