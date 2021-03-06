// main/enroll/enroll.js
var app = getApp();
var countDown = null; //自定义一个倒计时的函数
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phonenumber: "",
    username: "",
    verifycode: "",
    grade:0,
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

  userphoneinput: function (e) {
    this.data.phonenumber = e.detail.value
  },
  verifycodeinput: function (e) {
    this.data.verifycode = e.detail.value
  },
  usernameinput: function (e) {
    this.data.username = e.detail.value
  },
  goback: function (e) {
    wx.redirectTo({
      url: '/main/login/login',
    })
  },
  registnext: function (e) {
    var that = this;
    var myreg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (that.data.phonenumber == "") {
      wx.showModal({
        title: '提示',
        content: '请输入手机号',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.verifycode == "") {
      wx.showModal({
        title: '提示',
        content: '请输入验证码',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.username == "") {
      wx.showModal({
        title: '提示',
        content: '请输入用户名',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.phonenumber.length != 11) {
      wx.showModal({
        title: '提示',
        content: '手机号长度有误',
        showCancel: false,
        success(res) {}
      })
    } else if (!myreg.test(that.data.phonenumber)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        showCancel: false,
        success(res) {}
      })
    } else {
      const sex = that.data.sex
      var flag1 = 0
      for (let i = 0, len = sex.length; i < len; ++i) {
        if (sex[i].checked == true) {
          flag1 = 1
        }
      }
      if (flag1 == 0) {
        wx.showModal({
          title: '提示',
          content: '请选择性别',
          showCancel: false,
          success(res) {}
        })
      } else {
        const identity = that.data.identity
        var flag2 = 0
        for (let i = 0, len = identity.length; i < len; ++i) {
          if (identity[i].checked == true) {
            flag2 = 1
          }
        }
        if (flag2 == 0) {
          wx.showModal({
            title: '提示',
            content: '请选择注册身份',
            showCancel: false,
            success(res) {}
          })
        } else {
          app.globalData.phonenumber = that.data.phonenumber;
          app.globalData.username = that.data.username;
          if (that.data.sex[0].checked == true) {
            app.globalData.gender = "男"
          } else if (that.data.sex[1].checked == true) {
            app.globalData.gender = "女"
          }
          if (that.data.identity[0].checked == true) {
            app.globalData.identity = "用户"
            app.globalData.grade = 0
            wx.redirectTo({
              url: '/main/levelgenerate/levelgenerate',
            })
          } else {
            app.globalData.identity = "志愿者"
            app.globalData.grade = 0
            wx.redirectTo({
              url: '/main/leveltest/leveltest',
            })
          }
        }
      }
    }
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
        app.globalData.year=house_name;
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
    //console.log('picker:' + this.data.openPicker);
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

  }
})