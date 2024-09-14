Page({
  data: {
    theme: "white",
    selfPause:false,
    icons: [{
        src: '/image/1.jpg',
        title: '华夏之音'
      },
      {
        src: '/image/2.jpg',
        title: '对弈人生'
      },
      {
        src: '/image/3.jpg',
        title: '笔墨生花'
      },
      {
        src: '/image/4.jpg',
        title: '中国绘画'
      },
      {
        src: '/image/5.jpg',
        title: '衣着之仪'
      }
    ],
    musicIndex: 0,
    lastdeg: 0,
    intervalId: 0,
    startEnd: false,
    played: false
  },
  onLoad() {
    this.setData({
      charm: getApp().globalData.indexCharm,
      wonderful: getApp().globalData.indexWonderful,
      ancientArray: getApp().globalData.indexAncientArray,
      background: getApp().globalData.indexBackground,
    });
    this.innerAudioContext = my.createInnerAudioContext();
    this.innerAudioContext.autoplay = true;
    this.innerAudioContext.src = getApp().globalData.indexBackground[2];
    this.innerAudioContext.loop = true;

  },
  onShow() {
    if (!this.data.selfPause) {
      this.innerAudioContext.play();
    }
  },
  onReady() {
    this.animation = my.createAnimation({
      timeFunction: 'linear',
      duration: 3000
    })
    this.innerAudioContext.onCanPlay(()=>{
      this.innerAudioContext.play();
      this.startRotate();
    })
  },
  onHide(){
    if(!this.innerAudioContext.paused){
      this.innerAudioContext.pause();
    }
  },
  onPageScroll(e) {
    if (this.data.theme == "white" && e.scrollTop >= 130) {
      my.setNavigationBar({
        frontColor: '#000',
        backgroundColor: '#FFFFFF',
        title: '诸华拾遗'
      })
      this.setData({
        theme: "black"
      })
    } else if (this.data.theme == "black" && e.scrollTop < 130) {
      my.setNavigationBar({
        frontColor: '#fff',
        backgroundColor: '#FFFFFF',
        title: ''
      })
      this.setData({
        theme: "white"
      })
    }
  },

  onImageSection2(e) {
    const index = e.currentTarget.dataset.index;
    let str = [
      "/pages/culture_pages/main_creation/instrument/instrument",
      "/pages/culture_pages/main_creation/chess/chess",
      "/pages/culture_pages/main_creation/calligraphy/calligraphy",
      "/pages/culture_pages/main_creation/paint/paint",
      "/pages/culture_pages/main_creation/costume/costume",
    ];
    my.navigateTo({
      url: str[index]
    })
  },
  onImageSection3(e) {
    const index = e.currentTarget.dataset.index;
    my.navigateTo({
      url: "/pages/culture_pages/ancient_pic/ancient_pic",
      success: function (res) {
        res.eventChannel.emit('indexData', {
          data: `${index}`
        })
      }
    });
  },
  appreciateMore() {
    my.navigateTo({
      url: "/pages/culture_pages/pic_appreciate/pic_appreciate",
    });
  },
  wonderfulMore() {
    my.navigateTo({
      url: "/pages/culture_pages/total_recommend/total_recommend"
    });
  },
  onImageSection4(e) {
    const index = e.currentTarget.dataset.index;
    my.navigateTo({
      url: "/pages/culture_pages/recommends/recommend/recommend",
      success: function (res) {
        res.eventChannel.emit('indexDataSection4', {
          data: index
        })
      }
    });
  },
  rotate() {
    self.setData({lastdeg: self.data.lastdeg+360})
    self.animation.rotate(self.data.lastdeg).step()
    self.setData({ animation: self.animation.export() })
  },
  startRotate(){
    self=this
    this.rotate();
    var id=setInterval(this.rotate,3000)
    this.setData({
      intervalId:id,
    })
  },
  pauseRotate(){
      clearInterval(this.data.intervalId)
      this.animation.step({
        duration:0,
        timeFunction:"step-start"
      })
      this.setData({
        animation:this.animation.export(),
      })
  },
  funcRotate() {
    if(this.innerAudioContext.paused){
      this.innerAudioContext.play();
      this.startRotate();
      this.setData({
        selfPause:false
      })
    }else{
      this.innerAudioContext.pause();
      this.pauseRotate();
      this.setData({
        selfPause:true
      })
    }
  },

  onImageSection5(e) {
    const index = e.currentTarget.dataset.index;
    my.navigateTo({
      url: "/pages/culture_pages/blogs/blog/blog",
      success: function (res) {
        res.eventChannel.emit('indexDataSection5', {
          index: index
        })
      }
    });
  },
  goChat() {
    my.navigateTo({
      url: "/pages/funcPages/AIChat/AIChat"
    })
  },
});