// main/enroll/enroll.js
var app = getApp(); //获取应用实例
var countDown = null; //自定义一个倒计时的函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: [{
      id: 1,
      value: '男'
    }, {
      id: 2,
      value: '女'
    }],

    msgList: [{
      key: 1,
      name: '请选择在读年级'
    }],
    // 判断导航栏列表是否显示
    meunShow: [{
      isShows: true
    }],
    sousuoList: [{
      id: 1,
      name: '小学以下'
    }, {
      id: 2,
      name: '小学'
    }, {
      id: 3,
      name: '初中'
    }, {
      id: 4,
      name: '高中'
    }, {
      id: 5,
      name: '大学及以上'
    }],

    identity: [{
      id: 1,
      value: '用户'
    }, {
      id: 2,
      value: '志愿者'
    }],
    contantTxt: '发送验证码', //按钮中展示的内容
    countTime: 60 //倒计时的时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  radioChange_sex: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    const sex = this.data.sex
    for (let i = 0, len = sex.length; i < len; ++i) {
      sex[i].checked = sex[i].id == e.detail.value
    }
    this.setData({
      sex
    })
    console.log(this.data.sex);
  },

  radioChange_identity: function (e) {
    const identity = this.data.identity
    for (let i = 0, len = identity.length; i < len; ++i) {
      identity[i].checked = identity[i].id == e.detail.value
    }
    this.setData({
      identity
    })
    console.log(this.data.identity);
  },

  postaddManage: function () {
    let sex = '';
    this.data.sex.map((item, index) => {
      if (item.checked) {
        sex = item.id;
      }
    })
    let params = {
      sex: sex,
    }
    addManage(params).then(res => {
      console.log(res);
    })
  },

  souSearch: function (e) {
    var that = this;
    var openPicker = this.data.openPicker;
    var house_name = e.target.dataset.name;

    var msgList = that.data.msgList;
    this.setData({
      openPicker: !openPicker,
    })
    for (var i = 0; i < msgList.length; i++) {
      var keys = msgList[i].key;
      if (keys == 1) {
        msgList[i].name = house_name;
        that.setData({
          msgList: msgList,
          house_name: house_name
        })
      }
    }

    var menuNum = that.data.menuNum;
    var meunShow = this.data.meunShow;
    var menuSrc = "meunShow[" + menuNum + "].isShows";
    // console.log('menuNum:' + menuNum);
    for (var n = 0; n < meunShow.length; n++) {
      // 拼接 ，使我们可以获取到menuShow里面每一个isSHows
      var menuSrcs = meunShow[n].isShows;
      // console.log('menuSrcs:' + menuSrcs);
      // 解决重复点击不能隐藏的问题
      if (n != menuNum) {

        this.setData({
          menuSrcs: true
        });
      };
    };

    // 给当前点击的去反data中设置的meunShow，使之显示， 只写此处只会显示不能隐藏
    this.setData({
      [menuSrc]: !this.data.meunShow[menuNum].isShows
    });

  },

  menuClick: function (e) {
    // 获取通过wxml  data-hi="{{ idx }}" 传过来的索引
    var that = this;
    var menuNum = e.currentTarget.dataset.hi;
    that.setData({
      menuNum: menuNum
    })
    var name = e.currentTarget.dataset.name;
    if (name == that.data.name) {
      // console.log('==');
      that.setData({
        openPicker: !this.data.openPicker,
      })
    } else {
      // console.log('!=');
      that.setData({
        openPicker: true,
      })
    }

    that.setData({
      name: name
    })
    // console.log(name + ',' + menuNum);
    // 拼接 ，使我们可以获取到menuShow里面每一个isSHows
    var menuSrc = "meunShow[" + menuNum + "].isShows";
    // console.log('picker:' + this.data.openPicker);
    this.setData({
      needAnimation: true,
      menuNums: menuNum + 1
    });

    // 循环data中设置的meunShow
    for (var n = 0; n < this.data.meunShow.length; n++) {
      // 拼接 ，使我们可以获取到menuShow里面每一个isSHows
      var menuSrcs = "meunShow[" + n + "].isShows";
      // 解决重复点击不能隐藏的问题
      if (n != menuNum) {
        // 初始化，每次点击时先全部隐藏，但是重复点击不会隐藏
        this.setData({
          [menuSrcs]: true
        });
      };
    };

    // 给当前点击的去反data中设置的meunShow，使之显示， 只写此处只会显示不能隐藏
    this.setData({
      [menuSrc]: !this.data.meunShow[e.currentTarget.dataset.hi].isShows
    });
  },

  // 按钮事件
  getVerificationCode() {
    var that = this; 
    var countTime = that.data.countTime
    // setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式，简单来说就是定时执行
    countDown = setInterval(function () {
      countTime--; // 倒计时开始递减
      // 更新按钮中的显示内容
      that.setData({
        contantTxt: countTime + ' 秒'
      })
      // 如果倒计时时间小于或者等于0，也就是倒计时结束，显示 “重新发送” 字样
      if (countTime <= 0) {
        clearInterval(countDown); //停止执行countDown函数
        // 更新按钮中的显示内容
        that.setData({
          contantTxt: '重新发送',
          countTime: 60,
        })
      }
    }, 1000)
  }
})