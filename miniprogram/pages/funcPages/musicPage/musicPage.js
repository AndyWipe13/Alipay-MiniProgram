Page({
  data: {
    albumPhoto:'',
    isLiked:'HeartOutline',
    playAndPause:'/image/waiting.png',
    visibleList:false,
    duration:'0:00',
    totalSeconds:0,
    currentTime:'0:00',
    musicIndex:0,
    musicList:[
      {
        title:'琵琶',
        name:'故梦(琵琶版)',
        author:'千年破晓'
      },
      {
        title:'二胡',
        name:'二泉映月',
        author:'阿炳'
      },
      {
        title:'编钟',
        name:'楚商',
        author:'群星'
      },
      {
        title:'箫',
        name:'半山听雨-洞箫',
        author:'孤箫'
      },
      {
        title:'笛',
        name:'姑苏行',
        author:'俞逊发'
      },
      {
        title:'古筝',
        name:'春江花月夜',
        author:'中央民族乐团'
      },
      {
        title:'琴',
        name:'春风又绿江南岸',
        author:'李祥霆'
      },
      {
        title:'埙',
        name:'伯牙悼子期(埙与古琴)',
        author:'曹节'
      },
      {
        title:'笙',
        name:'南海渔歌',
        author:'王磊,北京环球音像'
      },
      {
        title:'鼓',
        name:'飞升',
        author:'聲無哀樂'
      },
    ]
  },

  onLoad() {
    this.setData({
      musicPhotoList:getApp().globalData.musicPhotoList
    })
    this.innerAudioContext = my.createInnerAudioContext();
    this.initMusicList(0);
  },
  initMusicList(musicIndex){
    this.setData({
      musicFileIdList:getApp().globalData.musicList
    });
    this.innerAudioContext.src = getApp().globalData.musicList[musicIndex];
    this.innerAudioContext.onCanPlay (() => {
      let duration = this.formatTime(this.innerAudioContext.duration);
      this.setData({
        duration:duration,
        totalSeconds:this.innerAudioContext.duration,
        playAndPause:'/image/play.png'
      })
    });
  },

  onUnload(){
    this.innerAudioContext.stop();
  },
  getAudio(index){
    this.innerAudioContext.src = this.data.musicFileIdList[index];
    this.innerAudioContext.onCanPlay (() => {
      let duration = this.formatTime(this.innerAudioContext.duration);
      this.setData({
        duration:duration,
        totalSeconds:this.innerAudioContext.duration,
        playAndPause:'/image/play.png'
      })
    });
  },
  formatTime(timeInSeconds){
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = Math.floor(timeInSeconds % 60);
    let formattedCurrentTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return formattedCurrentTime
  },
  like(){
    if(this.data.isLiked==='HeartOutline'){
      this.setData({
        isLiked:'HeartFill'
      });
    }else{
      this.setData({
        isLiked:'HeartOutline'
      });
    }
  },
  prevMusic(){
    this.innerAudioContext.stop();
    this.setData({
      duration:'0:00',
      totalSeconds:0,
      currentTime:'0:00',
      playAndPause:'/image/waiting.png',
      currentPosition:0
    });
    var musicIndex = this.data.musicIndex;
    if(musicIndex===0){
      musicIndex=9
      this.setData({
        musicIndex:musicIndex
      })
    }else{
      this.setData({
        musicIndex:--musicIndex
      })
    }
    this.getAudio(musicIndex);
    getApp().globalData.musicIndex=this.data.musicIndex
  },
  playAndPause(){
    if(this.data.playAndPause!=='/image/waiting.png'){
      if(this.data.playAndPause==='/image/play.png'){
        this.innerAudioContext.play();
        this.setData({
          playAndPause:'/image/pause.png'
        });
      }else{
        this.setData({
          playAndPause:'/image/play.png'
        });
        this.innerAudioContext.pause();
      }
      this.innerAudioContext.onTimeUpdate(() => {
        let currentTime = this.formatTime(this.innerAudioContext.currentTime);
        this.setData({
          currentTime: currentTime, // 更新当前播放时间
          currentPosition:this.innerAudioContext.currentTime
        });
      });
    }
  },
  playing(e){
    if(this.data.playAndPause!=='/image/waiting.png'){
      const value = e.detail.value;
      const currentTime = this.formatTime(value); // 获取滑块的值
      this.setData({
        currentTime:currentTime
      })
      this.innerAudioContext.seek(value);
      if(this.data.playAndPause==='/image/play.png'){
        this.innerAudioContext.play();
        this.setData({
          playAndPause:"/image/pause.png"
        });
      }
      this.innerAudioContext.onTimeUpdate(() => {
        this.setData({
          currentTime: this.formatTime(this.innerAudioContext.currentTime), // 更新当前播放时间
          currentPosition:this.innerAudioContext.currentTime
        });
      });
    }
  },

  nextMusic(){
    this.innerAudioContext.stop();
    this.setData({
      duration:'0:00',
      totalSeconds:0,
      currentTime:'0:00',
      playAndPause:'/image/waiting.png',
      currentPosition:0
    });
    var musicIndex = this.data.musicIndex;
    if(musicIndex===9){
      musicIndex=0;
      this.setData({
        musicIndex:musicIndex
      })
    }else{
      this.setData({
        musicIndex:++musicIndex
      })
    }
    this.getAudio(musicIndex);
    getApp().globalData.musicIndex=this.data.musicIndex
  },
  openList(){
    this.setData({
      visibleList:true
    })
  },
  closeList(){
    this.setData({
      visibleList:false
    })
  },

  litsenByList(e){
    this.innerAudioContext.stop();
    const musicIndex = e.currentTarget.dataset.index;
    this.setData({
      visibleList:false,
      duration:'0:00',
      totalSeconds:0,
      currentTime:'0:00',
      playAndPause:'/image/waiting.png',
      currentPosition:0,
      musicIndex:musicIndex
    });
    this.getAudio(musicIndex);
  },
});