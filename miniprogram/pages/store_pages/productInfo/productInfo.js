Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    vertical: false,
    interval: 2500,
    circular: true,
    duration: 1400,
    cartIco:'',
    cnt:'',
    basicVisible: false,
    pCnt:1,
    isAdded:0,
    authAdd:false,
    addSuccess:false,
    haveCart:"none",
    noneCart:"",
    isCollect:'StarOutline',
    cartIco:'/image/cart-icon.png',
    collectColor:'',
    defaultValue:4.5
  },
  async onLoad() {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('pId', data => {
      this.setData({
        pId: data.data
      })
    });
    my.showLoading({
      content: '页面加载中...',
      delay: '100',
    });
    await this.getProdInfo();
    var self = this;
    my.getSetting({
      success(res){
        self.setData({
          authUser:res.authSetting.userInfo
        });
        if(res.authSetting.userInfo===true){
          self.cartLen();
          self.isCollected();
        }
      }
    });
  },
  //前往付款页面
  toPay(){
    var self = this;
    if(self.data.authUser===true){
      var pId=[];
      var pCnt=[];
      pId[0]=self.data.pId;
      pCnt[0]=1;
      my.navigateTo({
        url:"/pages/store_pages/settlement/settlement",
        success:function(res){
          res.eventChannel.emit('pMessage',{
            pId: pId,
            pCnt:pCnt,
            totalPrice:self.data.price,
            isCart:false
          })
        }
      })
    }else{
      my.showToast({
        type:"fail",
        duration:2000,
        content:"您未授权小程序，无法购买哦"
      });
    }
  },

  async getProdInfo(){
    var self = this;
    my.fncontext.callFunction({
      name:'getProdInfo',
      data:{
        pId: this.data.pId
      },success:(res)=>{
        this.setData({
          background: res.result.message.info_pic,
          price: res.result.message.price,
          pName:res.result.message.pName,
          p_pic:res.result.message.info_pic
        });
        // self.getInfoPics(res.result.message.p_pic)
        my.hideLoading();
      }
    })
  },

  //查看该商品是否被收藏
  async isCollected(){
    my.fncontext.callFunction({
      name:'isCollected',
      data:{
        pId:this.data.pId
      },
      success:(res)=>{
        if(res.result.message===1){
          this.setData({
            isCollect:'StarFill',
            collectColor:'#f2c510'
          })
        }
        my.hideLoading();
      }
    })
  },

  // getInfoPics(picList){
  //   var self = this;
  //   my.fncontext.callFunction({
  //     name:'indexAppreciate',
  //     data:{
  //       fileId:picList
  //     },
  //     success:(res)=>{
  //       var imgList = [];
  //       res = res.result;
  //       for(var index in res){
  //         imgList[index] = res[index].tempFileURL
  //       }
  //       self.setData({
  //         p_pic:imgList
  //       });
  //     }
  //   })
  // },

  //获取购物车中商品的数量
  async cartLen(){
    my.fncontext.callFunction({
      name:'getCartLen',
      data:{
        pId:this.data.pId
      },
      success:(res)=>{
        if(res.result.len===0){
          this.setData({
            cnt:res.result.len,
            haveCart:"none",
            noneCart:"",
          })
        }else{
          this.setData({
            cnt:res.result.len,
            haveCart:"inline",
            noneCart:"none",
            isAdded:res.result.isAdded
          })
        }
        my.hideLoading();
      }
    })
  },

  previewImage(e){
    my.previewImage({
      current:e.currentTarget.dataset.index,
      urls:this.data.background
    })
  },

  previewImageInfo(e){
    my.previewImage({
      current:e.currentTarget.dataset.index,
      urls:this.data.p_pic
    })
  },

  //加入购物车中
  addCart(){
    if(this.data.authUser===true){
      my.fncontext.callFunction({
        name:'addToCart',
        data:{
          pId:this.data.pId,
          pCnt:this.data.pCnt
        },
        success:(res)=>{
          if(res.result.success===true){
            this.setData({
              addSuccess:true,
              basicVisible:false,
              haveCart:"inline",
              noneCart:"none",
              cnt:res.result.message,
              isAdded:1
            })
          }
        }
      })
    }else{
      my.showToast({
        type:"fail",
        duration:2000,
        content:"您未授权小程序，无法添加到购物车哦"
      });
    }
    
  },

  handleToastClose(){
    this.setData({
      authAdd:false
    })
  },

  //弹出加入购物车页面
  cartPop(){
    if(this.data.isAdded===1){
      this.setData({
        addSuccess:false,
        authAdd:true
      })
    }
    if(this.data.isAdded===0){
      this.setData({
        basicVisible:true
      })
    }
  },

  handlePopupClose(){
    this.setData({
      basicVisible:false
    })
  },

  handleChange: function (value) {
    this.setData({
        pCnt: value,
    });
  },

  //跳转至购物车页面
  toCart(){
    my.navigateTo({
      url:"/pages/private_pages/cart/cart",
      success:(res)=>{
        
      }
    })
  },

  //加入或移除我的收藏
  addOrDel(){
    if(this.data.authUser===true){
      if(this.data.isCollect==='StarOutline'){
        my.fncontext.callFunction({
          name:'addMyColls',
          data:{
            pId:this.data.pId
          },
          success:(res)=>{
            if(res.result.success===true){
              this.setData({
                isCollect:'StarFill',
                collectColor:'#FF9F18'
              })
            }
          }
        })
      }else{
        my.fncontext.callFunction({
          name:'collsDel',
          data:{
            pId:this.data.pId
          },
          success:(res)=>{
            if(res.result.success===true){
              this.setData({
                isCollect:'StarOutline',
                collectColor:''
              })
            }
          }
        })
      }
    }else{
      my.showToast({
        type:"fail",
        duration:2000,
        content:"您未授权小程序，无法加入收藏哦"
      });
    }
  }
});