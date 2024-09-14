
Page({
  data: {
    rating:false,
    value:5
  },
  async onLoad() {
    const eventChannel = this.getOpenerEventChannel();
    // 通过监听 PageA_Data 事件，接收 A 页面传过来的数据。
    eventChannel.on('payId', data => {
      this.setData({
        payId:data.data
      })
    });
    my.showLoading({
      content:'加载中...',
      delay:100
    });
    await this.initPage();
  },

  async initPage(){
    var self = this;
    my.fncontext.callFunction({
      name:'getPaymentInfo',
      data:{
        payId:self.data.payId
      },
      success:(res)=>{
        if(res.result.success===true){
          var dataset = res.result.message;
          self.setData({
            pName:dataset.pName,
            price:dataset.price,
            cnt:dataset.cnt,
            totalPrice:dataset.finalPrice,
            fullName:dataset.fullName,
            phoneNumber:dataset.phoneNumber,
            address:dataset.address,
            date:dataset.date,
            paymentInfoPic:dataset.info_pic,
            statusNum:dataset.status
          });
          switch(dataset.status){
              case 0:
                self.setData({
                  status:"待发货",
                  goNxt:"推进至下一阶段",
                  isNxt:"nxt",
                  isFinished:"main"
                });
                break;
              case 1:
                self.setData({
                  status:"待收货",
                  goNxt:"推进至下一阶段",
                  isNxt:"nxt",
                  isFinished:"main"
                });
                break;
              case 2:
                self.setData({
                  status:"待评价",
                  goNxt:"去评价",
                  isNxt:"rate",
                  isFinished:"main"
                });
                break;
              case 3:
                self.setData({
                  status:"已完成",
                  isNxt:"finished",
                  isFinished:"main-finished"
                });
                break;
          }
          my.hideLoading();
        }
      }
    })
  },

  handleRateClose(){
    this.setData({
      rating:false
    })
  },

  handleRateChange(value) {
    this.setData({
        value,
    });
  },

  commitRate(){
    var self = this;
    my.fncontext.callFunction({
      name:'paymentNext',
      data:{
        payId:self.data.payId,
        status:self.data.statusNum
      },success(res){
        if(res.result.success===true){
          my.showToast({
            content:'感谢您的评价！',
            duration:2000
          })
          getApp().globalData.paymentBack={
            message:"from paymentNext Back"
          };
          setTimeout(()=>{
            my.navigateBack();
          },2000);
        }else{
          my.showToast({
            content:'操作失败，请稍后重试！',
            duration:2000
          })
          my.hideLoading();
        }
      }
    })
    my.hideLoading();
  },

  goNext(){
    var self = this
    if(self.data.status!=="待评价"){
      my.showLoading({
        content:'请稍等...',
        delay:100
      });
      my.fncontext.callFunction({
        name:'paymentNext',
        data:{
          payId:self.data.payId,
          status:self.data.statusNum
        },success(res){
          if(res.result.success===true){
            my.showToast({
              content:'操作成功！',
              duration:2000
            });
            getApp().globalData.paymentBack={
              message:"from paymentNext Back"
            };
            setTimeout(()=>{
              my.navigateBack();
            },2000);
            
          }else{
            my.hideLoading();
          }
        }
      })
    }else{
      self.setData({
        rating:true
      })
    }
  }
});