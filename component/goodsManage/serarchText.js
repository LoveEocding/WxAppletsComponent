// component/goodsManage/serarchText.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    serach:{
      type:String,
      value:''
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

    /**
     * 确定触发父组件
     */
    inputConfirm(e)
    {
      console.log(e);
      //触发父组件事件
      this.triggerEvent('serachConfim', { serach:e.detail.value });
    }

  }
})
