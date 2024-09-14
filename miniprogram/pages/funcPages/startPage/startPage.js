Page({
  data: {
    isViewVisible:false,
    showToast:false
  },
  async onLoad() {
    my.setNavigationBar({
      frontColor: '#000000',
      backgroundColor:'#000000',
      title:''
    })
    setTimeout(()=>{
      if(this.data.isViewVisible===false){
        this.setData({
          showToast:true
        })
      } 
    },7000)
    await this.delay(500);
    await this.background();
    await this.indexAppreciate();
    await this.indexBlogs();
    await this.recommendImgs();
    await this.initAI();
    this.setData({
      isViewVisible:true,
      showToast:false
    });
    await this.delay(1000);
    my.switchTab({
      url:"/pages/nav/index/index"
    });
  },
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  async initAI(){
    return new Promise((resolve)=>{
      my.fncontext.callFunction({
        name:'getAISettion',
        success:(res)=>{
          resolve(res);
          res=res.result.message;
          getApp().globalData.aiSettion={appId:res.APPID,apiSecret:res.APISecret,apiKey:res.APIKey};
        }
      });
    })
  },
  skip(){
    my.switchTab({
      url:"/pages/nav/index/index"
    })
  },
  async background(){
    return new Promise((resolve)=>{
      my.fncontext.callFunction({
        name:'getItemByFileId',
        data:{
          fileId:[
            'cloud://env-00jx4k03swkv/backgroundPic/poster.jpg',
            'cloud://env-00jx4k03swkv/backgroundPic/AI-img.jpg',
            'cloud://env-00jx4k03swkv/audios/portalMusic.mp3'
          ]
        },
        success:(res)=>{
          resolve(res);
          var imgList = [];
          res = res.result;
          for(var index in res){
            imgList[index] = res[index].tempFileURL;
          };
          getApp().globalData.indexBackground=imgList;
        }
      })
    })
    
  },

  //获取鉴赏之旅内容
  async indexAppreciate(){
    return new Promise((resolve)=>{
    my.fncontext.callFunction({
      name:'indexAppreciate',
      data:{
        set:"appreciate_index",
        idx:"index"
      },
      success:(res)=>{
        resolve(res);
        res = res.result.message
        getApp().globalData.indexAncientArray=res;
      }
    })
    })
  },

  //获取精彩推荐内容
  async indexBlogs(){
    return new Promise((resolve)=>{
      my.fncontext.callFunction({
        name:'indexAppreciate',
        data:{
          set:"daliy-recommendIndex",
          idx:"index"
        },
        success:(res)=>{
          resolve(res);
          res = res.result.message;
          var charm=[];
          for(var idx in res){
            charm[idx]={page:res[idx].img,title:res[idx].title}
          }
          getApp().globalData.indexCharm=charm;
        }
      })
    })
  },

  //精彩推荐封面图获取
  async recommendImgs(){
    return new Promise((resolve)=>{
      my.fncontext.callFunction({
        name:'indexAppreciate',
        data:{
          set:"videos",
          idx:"vId"
        },
        success:(res)=>{
          resolve(res);
          var imgList = [];
          var wonderful = [
            {
              page:"",
              title:""
            },
            {
              page:"",
              title:""
            }
          ];
          res = res.result.message;
          for(var index in res){
            imgList[index] = res[index].img;
            wonderful[index]={page:imgList[index],title:res[index].title};
          };
          getApp().globalData.indexWonderful=wonderful;
        }
      })
    })
  },
});
