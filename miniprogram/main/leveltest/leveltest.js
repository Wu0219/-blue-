// main/leveltest/leveltest.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      quest: [{
        id: 1,
        type: 1, //类型，1.单选，2.多选
        question: "1.Mike Jackson__his first album when he was only five years old.（单选）",
        answers: [{
          index: 'A',
          content: 'released'
        }, {
          index: 'B',
          content: 'relieved'
        }]
      }, {
        id: 2,
        type: 1,
        question: "2.She finds her new teaching job rather __.（单选）",
        answers: [{
          index: 'A',
          content: 'stressful'
        }, {
          index: 'B',
          content: 'careful'
        }, {
          index: 'C',
          content: 'respectful'
        }, {
          index: 'D',
          content: 'thoughtful'
        }]
      }, {
        id: 3,
        type: 2,
        question: "3.__Mr.Brown__strawberries?(多选)",
        answers: [{
          index: 'A',
          content: 'Does; likes; Yes, he does'
        }, {
          index: 'B',
          content: 'Does; like; Yes, he does'
        }, {
          index: 'C',
          content: "Does; likes; No, Mr Brown doesn't"
        }, {
          index: 'D',
          content: "Does; like; No, he doesn't"
        }]
      }]
  },
 // 点击问题答案触发事件
 answerSelected(e) {
  let outidx = e.currentTarget.dataset.outidx;
  let idx = e.currentTarget.dataset.idx;
  let question = this.data.quest[outidx];
  if (question.type == 1) {
    //单选
    for (let item of question.answers) {
      item.selected = false;
    }
    question.answers[idx].selected = true;
    this.setData({
      quest: this.data.quest
    });
  } else if (question.type == 2) {
    //多选
    question.answers[idx].selected = !question.answers[idx].selected;
    this.setData({
      quest: this.data.quest
    });
  }
},

// 点击提交按钮
submit() {
  let {
    quest
  } = this.data;
  //用来保存选中的答案
  let answerSelected = [];
  for (let questItem of quest) {
    if (questItem.type == 1) { //处理单选题
      let isSelected = false;
      for (let answerItem of questItem.answers) {
        if (answerItem.selected) {
          //答案被选中
          isSelected = true;
          answerSelected.push(answerItem.index);
        }
      }
      if (!isSelected) {
        //如果一个都没选
        answerSelected.push('');
      }
    } else { //处理多选题
      let multiAnswer = [];
      for (let answerItem of questItem.answers) {
        if (answerItem.selected) {
          //答案被选中
          multiAnswer.push(answerItem.index);
        }
      }
      answerSelected.push(multiAnswer.join(','));
    }
  }
  console.log(answerSelected);
  var correctgrade=0;
  if(answerSelected[0]=="A"){
    correctgrade++;
  }
  if(answerSelected[1]=="A"){
    correctgrade++;
  }
  if(answerSelected[2]=="B,D"){
    correctgrade++;
  }
  app.globalData.grade=correctgrade;
  wx.redirectTo({
    url: '/main/levelgenerate/levelgenerate',
  })
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