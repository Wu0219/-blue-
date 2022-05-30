// main/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonenumber: "",
    verifycode: "",
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