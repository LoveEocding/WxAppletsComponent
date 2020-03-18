// component/personSelectPicker/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //组件是否关闭
    isClose: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    //已经选了多少人
    selectNum:{
      type:Number,
      value:0,
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    //字父节点数据
    nodeList:{
      type:Array,
      value:[{
        parentId:1,
        name:'业务组',
        isChecked:true,
        isExpand:false,
        childNode:[
          {
            childId:2,
            name:'姓名1',
            isChecked: true,
          },
          {
            childId: 2,
            name: '姓名2',
            isChecked: true,
          },
          {
            childId: 2,
            name: '姓名3',
            isChecked: true,
          }
        ]
      },
        {
          parentId: 1,
          name: '业务组',
          isChecked: true,
          isExpand: false,
          childNode: [
            {
              childId: 2,
              name: '姓名1',
              isChecked: true,
            },
            {
              childId: 2,
              name: '姓名2',
              isChecked: true,
            },
            {
              childId: 2,
              name: '姓名3',
              isChecked: true,
            },
            {
              childId: 2,
              name: '姓名1',
              isChecked: true,
            },
            {
              childId: 2,
              name: '姓名2',
              isChecked: true,
            },
            {
              childId: 2,
              name: '姓名3',
              isChecked: true,
            },
            {
              childId: 2,
              name: '姓名1',
              isChecked: true,
            },
            {
              childId: 2,
              name: '姓名2',
              isChecked: true,
            },
            {
              childId: 2,
              name: '姓名3',
              isChecked: true,
            },
          ]
        }
      ],
      observer: function (newVal, oldVal, changedPath) {
        console.log('改变了值');
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    }

  },
  //组件周期
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log('在组件实例进入页面节点树时执行');
      var that=this;
      that.settlementNum();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 所在页面声明周期
  pageLifetimes: {
    show: function () {
      // 页面被展示
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
      letterArray:['A','B','C','D','E','F','G','H','I','G','K','M','N','O','P','R','S','T','U','V','W'],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //父亲节点选择
    clickParentNode(event){
       let that=this;
       let pIndex = event.currentTarget.dataset.index;
       console.log(pIndex);
       console.log(that.data.nodeList[pIndex]);
       let arrayString ="nodeList["+pIndex+"].isChecked";
       //改变非值
       that.setData({
         [arrayString]:!that.data.nodeList[pIndex].isChecked
       })
       //循环把子节点的所有值也改成非
      let newChildNode=that.data.nodeList[pIndex].childNode.map((item)=>{
        item.isChecked = that.data.nodeList[pIndex].isChecked;
        return item;
      })

      //设置子节点
      let childArrayString = "nodeList[" + pIndex + "].childNode";
      that.setData({
        [childArrayString]:newChildNode
      })
      //计算num
      that.settlementNum();
    },
    //子节点选择
    clickChildNode(event){
      let that = this;
      let pIndex = event.currentTarget.dataset.pindex;
      let cIndex = event.currentTarget.dataset.cindex;
      let changeString = "nodeList[" + pIndex + "].childNode[" + cIndex +"].isChecked";
      console.log(changeString);
      that.setData({
        [changeString]:!that.data.nodeList[pIndex].childNode[cIndex].isChecked
      })
      //循环子节点是否有激活有的话父亲节点激活
      let pFlag=false;
      pFlag = !that.data.nodeList[pIndex].childNode.some(res=>{
        return res.isChecked==false;
      })
      //需要给父级别激活
      let arrayString = "nodeList[" + pIndex + "].isChecked";
      //改变非值
      that.setData({
        [arrayString]: pFlag
      })
      //计算num
      that.settlementNum();
      
    },
    //循环结算已选数量
    settlementNum(){
      let that=this;
      let num=0;
      that.data.nodeList.forEach(item=>{
        item.childNode.forEach(k=>{
          if(k.isChecked){
            num++;
          }
        })
      })
      that.setData({
        selectNum:num
      })
    },
    //父节点展开操作
    parentExpand(event)
    {
      let that = this;
      let pIndex = event.currentTarget.dataset.pindex;
      let arrayString = "nodeList[" + pIndex + "].isExpand";
      //改变非值
      console.log(arrayString);
      that.setData({
        [arrayString]: !that.data.nodeList[pIndex].isExpand
      })

    },
    //关闭操作
    closeAction()
    {
      console.log('执行了关闭操作');
      let that=this;
      that.setData({
        isClose:true
      })
      wx.pageScrollTo({
        scrollTop: 0
      })
    },
    //循环只找到true的选项
    cycleFindTrue()
    {
      let that = this;
      let num = 0;
      let tempArray=[];
      let i=0;
      let isHave=false;
      let sendGroupString="";
      that.data.nodeList.forEach(item => {
        isHave=false;
        tempArray[i] = {};
        tempArray[i].isChecked = item.isChecked;
        tempArray[i].name = item.name;
        tempArray[i].isExpand = item.isExpand;
        tempArray[i].parentId = item.parentId;
        tempArray[i].childNode = [];
        let j = 0;
        item.childNode.forEach(k => {
          if (k.isChecked) {
            isHave = true;
            tempArray[i].childNode[j] = {};
            tempArray[i].childNode[j] = JSON.parse(JSON.stringify(k));
            j++;
          }
        })
        //如果子元素一个都没有true 则父元素没有
        if (isHave) {
          i++;
        }
        if(item.isChecked){
          sendGroupString += item.name+';';
        }else
        {
          item.childNode.forEach(k => {
            if (k.isChecked) {
              sendGroupString += k.name + ';';
            }
          })
        }
      })
      console.log(tempArray);
      that.setData({
        sendGroupString: sendGroupString
      })
      return tempArray;
    },

    //确定选择
    sureOK(){
      console.log('触发了确定操作');
      let that=this;
      let tempArray=that.cycleFindTrue();
      that.closeAction();
      //子组件向父子组件传值
      console.log(that.data.sendGroupString)
      that.triggerEvent('personSelectComplete', { uploadNodeList: tempArray, selectNum: that.data.selectNum, nodeList: that.data.nodeList, 
      sendGroupString:that.data.sendGroupString});
    },
  }
})
