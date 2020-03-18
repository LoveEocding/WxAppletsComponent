var App =getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //当前选中的品牌数据
    locationBrand:{
      type:Object,
      value:{
        brandCode: 1,
        brandName: '娃哈哈',
      }
    },
    // 品牌list
    brandList: {
      type: Array,
      value: [
        {
          brandCode:'ddd',
          brandName: '娃哈哈',
          isShow:true,
          isChecked:true,
        },
        {
          brandCode:'ccc',
          brandName: '农户山泉',
          isShow: true,
          isChecked: false,
        },
        {
          brandCode:'dddd',
          brandName: '农天',
          isShow: true,
          isChecked: false,
        },
        {
          brandCode: 'ffff',
          brandName: '娃方法',
          isShow: true,
          isChecked: false,
        },
      ]
    }
  },
  //组件周期
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log('在组件实例进入页面节点树时执行');
      this.setData({
        navTop: App.globalData.navTop*2
      })
      console.log(App.globalData);
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 所在页面声明周期
  pageLifetimes: {
    show: function () {
   
    },
    hide: function () {

    },
    resize: function (size) {

    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    //文本搜索数据
    serachTxt:'',
    //输入list是否展示
    inputShow:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 同步关联输入的值
    bindKeyInput(e){
      let serach = e.detail.value;
      let that=this;
      console.log(serach);
      console.log("娃哈哈".indexOf(serach));
      //同步循环数组
      that.data.brandList.forEach((item,index)=>{
        console.log(item.brandName.indexOf(serach));
        let tempString = "brandList[" + index + "].isShow";
        if(item.brandName.indexOf(serach)<0){
          console.log(tempString);
          that.setData({
            [tempString]:false
          })
        }
        else{
          that.setData({
            [tempString]: true
          })
        }
        
      })

      console.log(that.data.brandList);
      
    },
    //展开选择框
    extendList(){
      this.setData({
        inputShow:!this.data.inputShow
      })
    },
    //改变品牌
    changeBrand(e){
      console.log(e.currentTarget.dataset.index);
      let key = e.currentTarget.dataset.index;
      let that=this;
      that.data.brandList.forEach((item, index) => {
        let tempString = "brandList[" + index + "].isChecked";
        if (key==index) {
          that.setData({
            [tempString]: true
          })
        }
        else {
          that.setData({
            [tempString]: false
          })
        }

      })
      that.setData({
        "locationBrand.brandCode": that.data.brandList[key].brandCode,
        "locationBrand.brandName": that.data.brandList[key].brandName
      })
      //触发父组件事件
      that.triggerEvent('changeBrand', { brandCode: that.data.brandList[key].brandCode, brandName: that.data.brandList[key].brandName});
    },
    //返回上一层
    urlReturn() {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
