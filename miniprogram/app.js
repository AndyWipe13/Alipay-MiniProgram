App({
  async onLaunch(options) {
    //context为创建并返回云托管上下文
    const context = my.cloud.createCloudContext({
      // env是直接云开发环境对应的ID,关联什么环境填写什么环境的ID，填写错误会报错
      env: 'env-00jx4k03swkv'
    });
    context.init({
      env: 'env-00jx4k03swkv'
    });
    my.fncontext = context;

    my.getOpenUserInfo({
      success: (res) => {
        let userInfo = JSON.parse(res.response).response;
        if(userInfo.code==10000){
          this.globalData.authUser = true;
        }
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },

  globalData:{
    authUser:false,
    musicList:'',
    isFirstVisit:true,
    indexWonderful:[],
    indexCharm:[],
    indexAncientArray:[],
    indexBackground:[],
    musicPhotoList:[],
    aiSettion:{appId:'',apiSecret:'',apiKey:''}
  },

  onShow(options) {
   
  },
});
