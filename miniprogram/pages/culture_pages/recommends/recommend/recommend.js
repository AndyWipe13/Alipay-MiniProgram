Page({
  data:{
    isHidden:"preview-info"
  },
  onLoad(data){
    var self = this;
    my.setNavigationBar({
      title: '精彩推荐'
    });
    my.showLoading({
      content:"页面加载中"
    });
    if(data.index==null){
      const eventChannel = self.getOpenerEventChannel();
      eventChannel.on('indexDataSection4', data => {
        var index=data.data;
        this.initPage(index);
      });
    }else{
      let index = parseInt(data.index);
      this.initPage(index);
    }
  },

  initPage(index){
    var self = this;
    my.fncontext.callFunction({
      name:'getVideo',
      data:{
        index:index
      },
      success:(res)=>{
        res = res.result;
        self.setData({
          title : res.nowInf.title,
          info:res.nowInf.info
        });
        self.getVideos(res.nowInf.src);
        self.recommendImgs(res.videoList);
      }
    })
  },

  toPlayOtherVideos(e){
    const index = e.currentTarget.dataset.index;
    my.redirectTo({
      url:"/pages/culture_pages/recommends/recommend/recommend?index="+index+""
    });
  },

  allInfo(){
    this.setData({
      isHidden:'all-info',
      isDisplay:'none'
    })
  },

  getVideos(videoFileId){
    var self = this;
    my.fncontext.callFunction({
      name:'getVideoTest',
      data:{
        fileId:[videoFileId]
      },
      success:(res)=>{
        res = res.result;
        self.setData({
          src:res[0].tempFileURL
        })
      }
    })
  },

  recommendImgs(videoList){
    var coverList = [];
    var self = this;
    for(var index in videoList){
      coverList[index] = videoList[index].img;
    }
    my.fncontext.callFunction({
      name:'getItemByFileId',
      data:{
        fileId:coverList
      },
      success:(res)=>{
        res = res.result;
        for(var index in res){
          videoList[index].img = res[index].tempFileURL;
        };
        self.setData({
          recommendList:videoList
        });
        my.hideLoading();
      }
    })
  }
});
