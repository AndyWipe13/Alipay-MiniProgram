Page({
  // options: {
  //   observers: true,
  // },
  data: {
    basicVisible:false,
    // soundOrMute:"SoundOutline",
    // soundList:[
    //   'cloud://env-00jx4k03swkv/audios/琵琶.mp3',
    //   'cloud://env-00jx4k03swkv/audios/二胡.mp3',
    //   'cloud://env-00jx4k03swkv/audios/编钟.mp3',
    //   'cloud://env-00jx4k03swkv/audios/箫.mp3',
    //   'cloud://env-00jx4k03swkv/audios/笛.mp3',
    //   'cloud://env-00jx4k03swkv/audios/古筝.mp3',
    //   'cloud://env-00jx4k03swkv/audios/琴.mp3',
    //   'cloud://env-00jx4k03swkv/audios/埙.mp3',
    // ],
    index:0,
    descriptionHidden: false,
    opacity:1,
    animationData: {}
  },
  onLoad() {
    my.setCanPullDown({
      canPullDown: false
    });
    my.showLoading({
      content:'加载中...'
    });
    // this.innerAudioContext = my.createInnerAudioContext();
    this.initPics();
    // this.initAudio();
  },
  // observers: {
  //   'index,soundList': function(index) {
  //     this.innerAudioContext.src=this.data.soundList[index];
  //   }
  // },

  // initAudio(){
  //   var self = this;
  //   my.fncontext.callFunction({
  //     name:'cultrueImages',
  //     data:{
  //       fileId:this.data.soundList
  //     },
  //     success:(res)=>{
  //       res=res.result;
  //       var soundList = [];
  //       for(var index in res){
  //         soundList.push(res[index].tempFileURL);
  //       };
  //       self.setData({
  //         soundList:soundList
  //       })
  //     }
  //   })
  // },

  previewImage(e){
    const index = e.currentTarget.dataset.index;
    my.previewImage({
      current:index,
      urls:this.data.imgList
    })
  },

  initPics(){
    my.fncontext.callFunction({
      name:'indexAppreciate',
      data:{
        set:"appreciate_index",
        idx:"index"
      },
      success:(res)=>{
        res = res.result.message;
        var imageInfo=[];
        for(var index in res){
          imageInfo[index]={page:res[index].img,title:res[index].title,content:res[index].content}
        }
        this.setData({
          imageInfo:imageInfo
        });
        my.hideLoading();
      }
    })
  },
  onBack() {
    my.navigateBack();
  },
  onShow(){
    const eventChannel = this.getOpenerEventChannel();
    // 通过监听 PageA_Data 事件，接收 A 页面传过来的数据。
    eventChannel.on('indexData', data => {
      var index=data.data;
      this.setData({
        index:`${index}`,
      })
    });
    this.tapHandler();
  },
  onImageClick(){
    if (this.data.descriptionHidden==false){
      this.setData({
        descriptionHidden:true
      })
    }else{
      this.setData({
        descriptionHidden:false
      })
    }
  }, 
  touchStart(e) {
    this.startX = e.touches[0].clientX;
  },
  touchMove(e) {
    this.moveX = e.touches[0].clientX;
    this.setData({
      opacity: this.data.opacity - (Math.abs(this.startX-this.moveX)/10000)
    })
  },
  touchEnd(e) {
    this.setData({
      opacity:1
    })
    this.moveX=e.changedTouches[0].clientX;
    if (this.moveX - this.startX > 100) {
      // 执行右滑操作
      var temp=parseInt(this.data.index)-1
      if (this.data.index>0){
        this.setData({
          index:`${temp}`,
        })
      }
    } 
    if (this.startX - this.moveX > 100) {
      // 执行左滑操作
      if (this.data.index<this.data.imageInfo.length-1){
        var temp=parseInt(this.data.index)+1;
        this.setData({
          index:`${temp}`,
        })
      }
    }
    if (this.startX!=this.moveX){
      this.tapHandler();
    }
    this.startX=0
    this.moveX=0
  },
  tapHandler() {
    let animation = my.createAnimation({
      duration: 150,
      timingFunction: 'ease',
    });
    animation.scale(1.05).step();
    animation.scale(1).step();
    this.setData({
      animationData: animation.export()
    });
  },

  handleShowBasic() {
    var self = this;
    this.setData({
        basicVisible: true,
    });
    my.fncontext.callFunction({
      name:"getAppreciate",
      data:{
        index:this.data.index
      },
      success:(res)=>{
        res = res.result.message;
        self.setData({
          title:res.title,
          article:res.article,
          imgList:res.imgList
        })
      }
    })
  },

  handlePopupClose(){
    this.setData({
      basicVisible: false,
      title:'',
      article:'',
      imgList:''
    });
    // this.innerAudioContext.stop();
  },
  // startTalk(){
  //   if(this.data.soundOrMute==='SoundOutline'){
  //     this.innerAudioContext.play();
  //     this.setData({
  //       soundOrMute:"SoundMuteOutline"
  //     });
  //   }else{
  //     this.innerAudioContext.stop();
  //     this.setData({
  //       soundOrMute:"SoundOutline"
  //     })
  //   }
  // }
});
