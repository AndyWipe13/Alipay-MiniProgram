Page({
  data: {
    avatar: "",
    controlInfo:'control-regist',
    nickName:"授权同步支付宝个人信息",
    registButt:'',
    arr:'right',
    url_module:["cart/cart","myCollections/myCollections"],
    isRegist1: false,
    isRegist2: false,
    registLoading: false,
    registFail: false,
    items: [
      {
        title: '待发货',
        icon: '/image/garbage.png'
      },
      {
        title: '待收货',
        icon: '/image/car.png'
      },
      {
        title: '待评价',
        icon: '/image/estimate.png'
      },
    ],
    myCart:'/image/cart-icon.png',
    myColl:'/image/myColl.png'
  },
  async onLoad(){
    my.getOpenUserInfo({
      success: (res) => {
        let userInfo = JSON.parse(res.response).response;
        if(userInfo.code==10000){
          if(userInfo.nickName==null){
            this.setData({
              avatar:userInfo.avatar,
              nickName:'暂无昵称',
              controlRegist:'control-regist',
              controlInfo:'private-info'
            })
          }else{
            this.setData({
              avatar:userInfo.avatar,
              nickName:userInfo.nickName,
              controlRegist:'control-regist',
              controlInfo:'private-info'
            })
          }
        }
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },

  onShow(){
    var self = this;
    my.getSetting({
      success(res){
        if(getApp().globalData.authUser===true&&res.authSetting.userInfo==null){
          getApp().globalData.authUser=false;
          self.setData({
            controlInfo:"control-regist",
            nickName:'授权同步支付宝个人信息',
            controlRegist:''
          })
        }
      }
    })
  },

  onPullDownRefresh(){
    var self = this;
    my.getSetting({
      success(res){
        if(getApp().globalData.authUser===true&&res.authSetting.userInfo==null){
          getApp().globalData.authUser=false;
          self.setData({
            controlInfo:"control-regist",
            nickName:'授权同步支付宝个人信息',
            controlRegist:''
          })
        }
      }
    });
    my.stopPullDownRefresh();
  },

  isRegist(){
    var self = this;
    my.getOpenUserInfo({
      success: (res) => {
        let userInfo = JSON.parse(res.response).response;
        if(userInfo.code==10000){
          if(self.data.registButt!=='none'){
            self.setData({
              registLoading: true
            })
            my.fncontext.callFunction({
              name: "addUser",
              success:function(res){
                if(res.result.message===1){
                  self.setData({
                    registLoading: false,
                    isRegist1 : true
                  })
                }if(res.result.message===2){
                  self.setData({
                    registLoading: false,
                    isRegist2 : true
                  })
                }
                const app = getApp();
                app.globalData.authUser=true;
              }
            });
            if(userInfo.nickName==null){
              self.setData({
                avatar:userInfo.avatar,
                nickName:'暂无昵称',
                controlRegist:'control-regist',
                controlInfo:'private-info'
              })
            }else{
              self.setData({
                avatar:userInfo.avatar,
                nickName:userInfo.nickName,
                controlRegist:'control-regist',
                controlInfo:'private-info'
              })
            }
          }
        }
      },
      fail: (err) => {
        self.setData({
          registFail :true
        })
        console.log(err);
      }
  });
  },

  toPrivatePages(e){
    const base_dir = "/pages/private_pages/";
    var navInfo = e.currentTarget.dataset.info;
    var module_url = base_dir+this.data.url_module[navInfo];
    my.navigateTo({
      url: module_url,
      success:function(res){
      }
    })
  },
  toPayments(e){
    const index = JSON.stringify(e.title);
    if(index==null){
      my.navigateTo({
        url:'/pages/private_pages/myPayment/myPayment?data=全部'
      })
    }else{
      my.navigateTo({
        url:"/pages/private_pages/myPayment/myPayment?data="+index+""
      })
    } 
  },




  handleOpen(e) {
    const { field } = e.target.dataset;
    this.setData({ [field]: true });
  },
  handleClose() {
    this.setData({
        basicVisible: false,
        withTitleVisible: false,
        basicTwoVisible: false,
        basicThreeVisible: false,
        focusOneVisible: false,
        focusTwoVisible: false,
        focusThreeVisible: false,
        customVisible: false,
        customBodyVisible: false,
    });
},
});


