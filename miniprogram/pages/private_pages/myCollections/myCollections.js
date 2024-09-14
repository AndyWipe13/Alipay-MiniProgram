Page({
  data: {
    nowPage:1,
    rightBtns:[
      {
        text:"删除",
        bgColor:"#FF2B00",
        color:"#fffff"
      }
    ],
    Content:""
  },
  async onLoad() {
    const app = getApp();
    if(app.globalData.authUser===true){
      my.showLoading({
        content: '加载中...',
        delay: '100',
      });
      await this.getAllColls(1);
    }else{
      this.setData({
        Content:"您暂未授权小程序，无法获取收藏内容"
      })
    }
  },

  onPullDownRefresh(){
    this.onLoad();
    my.stopPullDownRefresh();
  },

  onReachBottom(){
    var nowPage = this.data.nowPage;
    nowPage++;
    this.getAllColls(nowPage);
  },

  async getAllColls(nowPage){
    var self = this;
    my.fncontext.callFunction({
      name:'getColls',
      data:{
        nowPage:nowPage
      },
      success:(res)=>{
        if(nowPage===1){
          if(res.result.success===true){
            this.setData({
              collsArray:res.result.message
            });
            if(res.result.message!=0){
              this.setData({
                Content:""
              })
            }
          }else{
            this.setData({
              Content:"您还未收藏商品，快去挑选喜欢的商品吧"
            })
          };
        }else{
          if(res.result.success===true){
            let list = self.data.collsArray;
            list = list.concat(res.result.message);
            self.setData({
              nowPage:nowPage,
              collsArray:list
            })
          }
        }
        my.hideLoading();
      }
    })
  },

  toProdInfo(value){
    my.navigateTo({
      url:"/pages/store_pages/productInfo/productInfo",
      success:(res)=>{
        res.eventChannel.emit('pId',{
          data:value.currentTarget.dataset.pId
        })
      }
    })
  }
});
