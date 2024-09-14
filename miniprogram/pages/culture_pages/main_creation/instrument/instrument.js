Page({
  data: {
    isLoad:"none"
  },
  async onLoad() {
    my.showLoading({
      content:"加载中"
    });
    if(getApp().globalData.musicList===''|| getApp().globalData.musicPhotoList===''){
      await this.initMusicList();
      await this.initMusicPhoto();
    }
    my.fncontext.callFunction({
      name:'cultrueImages',
      data:{
        fileId:[
          'cloud://env-00jx4k03swkv/instrumentPics/instrument/1.jpg',
          'cloud://env-00jx4k03swkv/instrumentPics/instrument/2.jpg',
          'cloud://env-00jx4k03swkv/instrumentPics/instrument/3.jpg',
          'cloud://env-00jx4k03swkv/instrumentPics/instrument/4.jpg',
          'cloud://env-00jx4k03swkv/instrumentPics/instrument/5.jpg',
          'cloud://env-00jx4k03swkv/instrumentPics/instrument/6.jpg',
          'cloud://env-00jx4k03swkv/instrumentPics/instrument/7.jpg',
          'cloud://env-00jx4k03swkv/instrumentPics/instrument/8.jpg',
          'cloud://env-00jx4k03swkv/instrumentPics/instrument/9.jpg',
          'cloud://env-00jx4k03swkv/instrumentPics/instrument/10.jpg',
          'cloud://env-00jx4k03swkv/instrumentPics/instrument/11.jpg',
          'cloud://env-00jx4k03swkv/instrumentPics/instrument/12.jpg'
        ]
      },
      success:(res)=>{
        var imgList = [];
        res = res.result;
        for(var index in res){
          imgList[index] = res[index].tempFileURL;
        };
        this.setData({
          images:imgList
        });
        my.hideLoading();
      }
    });
    setTimeout(()=>{
      this.recommendProds();
    },2000)
  },

  async initMusicPhoto(){
    return new Promise((resolve)=>{
      my.fncontext.callFunction({
        name:'cultrueImages',
        data:{
          fileId:[
            'cloud://env-00jx4k03swkv/albumPhotos/琵琶.jpg',
            'cloud://env-00jx4k03swkv/albumPhotos/二胡.jpg',
            'cloud://env-00jx4k03swkv/albumPhotos/编钟.jpg',
            'cloud://env-00jx4k03swkv/albumPhotos/xiao.jpg',
            'cloud://env-00jx4k03swkv/albumPhotos/笛子.jpg',
            'cloud://env-00jx4k03swkv/albumPhotos/古筝.jpg',
            'cloud://env-00jx4k03swkv/albumPhotos/qin.png',
            'cloud://env-00jx4k03swkv/albumPhotos/埙.jpg',
            'cloud://env-00jx4k03swkv/albumPhotos/sheng.jpg',
            'cloud://env-00jx4k03swkv/albumPhotos/gu.jpg'
          ]
        },
        success:(res)=>{
          resolve(res);
          res=res.result;
          var musicPhotoList = [];
          for(var index in res){
            musicPhotoList.push(res[index].tempFileURL);
          };
          getApp().globalData.musicPhotoList=musicPhotoList;
        }
      })
    })
  },
  async initMusicList(){
    return new Promise((resolve)=>{
      my.fncontext.callFunction({
        name:'cultrueImages',
        data:{
          fileId:[
            'cloud://env-00jx4k03swkv/audios/故梦.mp3',
            'cloud://env-00jx4k03swkv/audios/二泉映月.mp3',
            'cloud://env-00jx4k03swkv/audios/楚商.mp3',
            'cloud://env-00jx4k03swkv/audios/半山听雨.mp3',
            'cloud://env-00jx4k03swkv/audios/姑苏行.mp3',
            'cloud://env-00jx4k03swkv/audios/春江花月夜.mp3',
            'cloud://env-00jx4k03swkv/audios/春风又绿江南岸.mp3',
            'cloud://env-00jx4k03swkv/audios/伯牙悼子期.mp3',
            'cloud://env-00jx4k03swkv/audios/南海渔歌.mp3',
            'cloud://env-00jx4k03swkv/audios/飞升.mp3'
          ]
        },
        success:(res)=>{
          resolve(res);
          res=res.result;
          var soundList = [];
          for(var index in res){
            soundList.push(res[index].tempFileURL);
          };
          getApp().globalData.musicList=soundList;
        }
      })
    })
  },

  goToMusic(){
    if (getApp().globalData.musicIndex==undefined){
      getApp().globalData.musicIndex=0
    }
    my.navigateTo({
      url:"/pages/funcPages/musicPage/musicPage",
    })
  },

  getAudio(index){
    var self = this;
    my.fncontext.callFunction({
      name:'cultrueImages',
      data:{
        fileId:[
          self.data.audios[index]
        ]
      },
      success:(res)=>{
        res = res.result;
        self.innerAudioContext.src = res[0].tempFileURL;
        self.innerAudioContext.onCanPlay (() => {
          self.innerAudioContext.play ();
        });
      }
    })
  },
  recommendProds(){
    var self = this;
    my.fncontext.callFunction({
      name:"searchByType",
      data:{
        pType:2,
        nowPage:1
      },
      success:function(res){
        self.handlePageChange(res.result.message);
      }
    })
  },

  goStore(){
    my.navigateTo({
      url:"/pages/store_pages/storeZone/storeZone?typeIndex=1"
    })
  },
  handlePageChange(res){
    this.setData({
      prodArray:res
    })
    if (parseInt(this.data.prodArray.length/2)==this.data.prodArray.length/2){
      this.setData({
        length:`${parseInt(this.data.prodArray.length/2)}`
      })
    }else{
      this.setData({
        length:`${parseInt(this.data.prodArray.length/2+1)}`
      })
    }
    
    let newArry=[];
    let showArray=[];
    for(let i=0;i<this.data.length;i++){
      let row=[];
      for(let j=0;j<2;j++){
        row.push(i*2+j);
        showArray.push(true);
      }
      newArry.push(row);
    }
    this.setData({
      indexArray:newArry
    })
    if(parseInt(this.data.prodArray.length/2)<this.data.prodArray.length/2){
      showArray[this.data.length*2-1]=false;
    }
    this.setData({
      showArray:showArray,
      isLoad:''
    });
  },
});