//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    menuList:[
      {
        name:'跑马灯',
        url:'../../component/messageMarquee/index'
      },
      {
        name: '二级(组+成员)选择',
        url: '../../component/personSelectPicker/index'
      },
      {
        name: '底部弹出（商品编辑）',
        url: '../../component/goodsManage/actionGoodsShelves'
      },
      {
        name: '自定义导航+select模糊搜索',
        url: '../../component/goodsManage/headNav'
      },
      {
        name: '简易搜索组件',
        url: '../../component/goodsManage/serarchText'
      },
      {
        name: '底部微信授权组件',
        url: '../../component/requestAuth/index'
      },
    ]
  },
  onLoad: function () {
  
  },
  getUserInfo: function(e) {
  }
})
