// component/requestAuth/index.js
//获取应用实例
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //是否关闭
    isClose: {
      type: Boolean,
      value: false,
    },
    //商品数据详情
    goodDetail:{
      type:Object,
      value: {
        goodId: 1,
        goodImg: '',//图片链接
        goodName: '黑糖玛奇过',//名称
        goodAttr: '5*8', //规格
        goodPrice: 5000, //价格
        purchasePrice: 400, //进货单价
        commissionPrice:2000, //提成单价
        goodUnit: '箱', //价格单位
        isShelves: true ,//true 代表上架 false 代表没有上架
        goodUnitStock: [  //库存和单位
          {
            Unit: '箱',  //单位
            stock: 20000 //库存
          },
          {
            Unit: '瓶',  //单位
            stock: 20000 //库存
          },
          {
            Unit: '排',  //单位
            stock: 20000 //库存
          },
           
        ]
        
      }

    },

    //操作行为
    actionType:{
      type:String,
      value:'shelves'  //shelves 上架  manage 管理
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
    closeCom(e) {
      let that = this;
      console.log(e);
      console.log(e.currentTarget.dataset.action);
      that.setData({
        isClose: true
      })
    },
    //表单数据双向绑定
    formInput(e){
      let item = e.currentTarget.dataset.item; //在每个input绑定不同的item作为标识
      let string = 'goodDetail.'+item;
      this.setData({
        [string]: e.detail.value
      })
      console.log(this.data.goodDetail);
    },
    //商品状态修改
    gooodEdit(e)
    {
      let action=e.currentTarget.dataset.action;
      this.postEdit(action); 
    },
  }
})
