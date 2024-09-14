
Page({
  data: {
    items:[],
    Content:"",
    nowPage:1,
  },
  async onLoad(message){
    var index = message.data;
    this.setData({
      index:index
    });
    var self = this;
    switch(index){
      case "全部":
        this.setData({
          items:[700,400,400,400],
          status:3
        });
        my.getSetting({
          success(res){
            if(res.authSetting.userInfo===true){
              my.showLoading({
                content: '加载中...'
              });
              self.getPaymentsByStatus(3,1);
            }else{
              self.setData({
                Content:"您暂未授权小程序，无法获取订单"
              })
            }
          }
        });
        break;
      case "\"待发货\"":
        this.setData({
          items:[400,700,400,400],
          status:0
        });
        my.getSetting({
          success(res){
            if(res.authSetting.userInfo===true){
              my.showLoading({
                content: '加载中...'
              });
              self.getPaymentsByStatus(0,1);
            }else{
              self.setData({
                Content:"您暂未授权小程序，无法获取订单"
              })
            }
          }
        });
        break;
      case "\"待收货\"":
        this.setData({
          items:[400,400,700,400],
          status:1
        });
        my.getSetting({
          success(res){
            if(res.authSetting.userInfo===true){
              my.showLoading({
                content: '加载中...'
              });
              self.getPaymentsByStatus(1,1);
            }else{
              self.setData({
                Content:"您暂未授权小程序，无法获取订单"
              })
            }
          }
        });
        break;
      case "\"待评价\"":
        this.setData({
          items:[400,400,400,700],
          status:2
        });
        my.getSetting({
          success(res){
            if(res.authSetting.userInfo===true){
              my.showLoading({
                content: '加载中...'
              });
              self.getPaymentsByStatus(2,1);
            }else{
              self.setData({
                Content:"您暂未授权小程序，无法获取订单"
              })
            }
          }
        });
        break;
    }
  },

  onReachBottom(){
    if(this.data.alreadyBottom==null||this.data.alreadyBottom===false){
      var nowPage = this.data.nowPage;
      nowPage++;
      this.getPaymentsByStatus(this.data.status,nowPage);
    }
  },

  onShow(){
    const { globalData } = getApp();
    if(globalData.paymentBack!=null){
      const message  = globalData.paymentBack.message;
      if(message==="from paymentNext Back"){
        this.onLoad({data:this.data.index});
      }
      globalData.paymentBack=null;
    }
  },

  onPullDownRefresh(){
    var self = this
    const index = self.data.status;
    switch(index){
      case 0:
        self.onLoad({data:"\"待发货\""});
        break;
      case 1:
        self.onLoad({data:"\"待收货\""});
        break;
      case 2:
        self.onLoad({data:"\"待评价\""});
        break;
      case 3:
        self.onLoad({data:"全部"});
        break;
    }
    this.setData({
      nowPage:1,
      alreadyBottom:false
    })
    my.stopPullDownRefresh();
  },
  async getPaymentsByStatus(status,nowPage){
    if(nowPage>1){
      my.showLoading({
        content:"请稍等"
      });
    }
    my.fncontext.callFunction({
      name:'getPaymentsBystatus',
      data:{
        nowPage:nowPage,
        status:status
      },
      success:(res)=>{
        if(res.result.success===false){
          if(nowPage===1){
            this.setData({
              Content:"您未有相关订单",
              paymentsArray:''
            });
            my.hideLoading();
          }else{
            my.showToast({
              content:"已经到底啦",
              duration:1000
            });
            this.setData({
              alreadyBottom:true
            });
            my.hideLoading();
          }
        }else{
          var newPayments = [];
          if(this.data.paymentsArray==null&&nowPage===1){
            let list = [];
            newPayments = list.concat(res.result.message);
          }
          if(this.data.paymentsArray!=null&&nowPage===1){
            newPayments = res.result.message;
          }
          if(this.data.paymentsArray!=null&&nowPage!==1){
            if(res.result.message!=null){
              let list = this.data.paymentsArray;
              newPayments = list.concat(res.result.message);
              this.setData({
                nowPage:nowPage
              })
            }
            
          }
          this.setData({
            paymentsArray:newPayments,
            Content:''
          });
          my.hideLoading();
        }
      }
    })
  },

  getAll(){
    var self = this;
    if(this.data.status!==3){
      my.getSetting({
        success(res){
          if(res.authSetting.userInfo===true){
            self.setData({
              alreadyBottom:false
            });
            my.showLoading({
              content: '加载中...'
            });
            self.getPaymentsByStatus(3,1);
          }else{
            self.setData({
              Content:"您暂未授权小程序，无法获取订单"
            })
          }
        }
      });
      this.setData({
        items:[700,400,400,400],
        status:3,
        index:'全部'
      });
    }
  },
  preSend(){
    var self = this;
    if(this.data.status!==0){
      my.getSetting({
        success(res){
          if(res.authSetting.userInfo===true){
            self.setData({
              alreadyBottom:false
            });
            my.showLoading({
              content: '加载中...'
            });
            self.getPaymentsByStatus(0,1);
          }else{
            self.setData({
              Content:"您暂未授权小程序，无法获取订单"
            })
          }
        }
      });
      this.setData({
        items:[400,700,400,400],
        status:0,
        index:'"待发货"'
      });
    }
  },
  preSign(){
    var self = this;
    if(this.data.status!==1){
      my.getSetting({
        success(res){
          if(res.authSetting.userInfo===true){
            self.setData({
              alreadyBottom:false
            });
            my.showLoading({
              content: '加载中...'
            });
            self.getPaymentsByStatus(1,1);
          }else{
            self.setData({
              Content:"您暂未授权小程序，无法获取订单"
            })
          }
        }
      });
      this.setData({
        items:[400,400,700,400],
        status:1,
        index:'"待收货"'
      });
    }
  },
  preRate(){
    var self = this;
    if(this.data.status!==2){
      my.getSetting({
        success(res){
          if(res.authSetting.userInfo===true){
            self.setData({
              alreadyBottom:false
            });
            my.showLoading({
              content: '加载中...'
            });
            self.getPaymentsByStatus(2,1);
          }else{
            self.setData({
              Content:"您暂未授权小程序，无法获取订单"
            })
          }
        }
      });
      this.setData({
        items:[400,400,400,700],
        status:2,
        index:'"待评价"'
      });
    }
  },
  toPaymentInfo(value){
    my.navigateTo({
      url:"/pages/private_pages/paymentsInfo/paymentsInfo",
      success:(res)=>{
        res.eventChannel.emit('payId',{
          data:value.currentTarget.dataset.payId
        })
      }
    })
  },
  async deletePayment(value){
    if(value.currentTarget.dataset.status!==3){
      my.alert({
        content:"该订单还未完成，暂不能删除！"
      })
    }else{
      this.setData({
        basicTwoVisible:true,
        targetData:value.currentTarget.dataset.payId,
        targetPayId:value.currentTarget.dataset.status
      })
    }
  },
  handlePrimaryButtonTap(){
    var self = this;
    const pId = this.data.targetData;
    my.showLoading({
      content: '正在删除...',
    }),
    my.fncontext.callFunction({
      name: "paymentDel",
      data:{
        pid: pId
      },
      success:function(res){
        if(res.result.success===true){
          self.setData({
            basicTwoVisible:false,
          });
          self.onLoad({data:self.data.index});
        }
      }
    })
  },
  handleSecondaryButtonTap(){
    this.setData({
      basicTwoVisible:false,
      targetData:'',
      targetPayId:''
    })
  },
});