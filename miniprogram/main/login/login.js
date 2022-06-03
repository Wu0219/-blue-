// main/login/login.js
var app = getApp(); //获取应用实例
var countDown = null; //自定义一个倒计时的函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonenumber: "",
    verifycode: "",
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
  gotoenroll: function (e) {
    wx.redirectTo({
      url: '/main/enroll/enroll',
    })
  },
  logincomplete:function(e){
    wx.reLaunch({
      url: '/main/englishsquare/square',
    })
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