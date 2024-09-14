Page({
  data: {
    isLoad:"none",
    photo:"",
    randomFileId:[
      'cloud://env-00jx4k03swkv/paintPics/paint/random/1.jpg',
      'cloud://env-00jx4k03swkv/paintPics/paint/random/2.jpg',
      'cloud://env-00jx4k03swkv/paintPics/paint/random/3.jpg',
      'cloud://env-00jx4k03swkv/paintPics/paint/random/4.jpg',
      'cloud://env-00jx4k03swkv/paintPics/paint/random/5.jpg',
      'cloud://env-00jx4k03swkv/paintPics/paint/random/6.jpg',
    ],
    randomPhoto:[],
  },
  onLoad() {
    my.setNavigationBar({
      frontColor: '#000',
      backgroundColor: '#EAE3D4',
    });
    my.showLoading({
      content:"加载中"
    });
    this.getImages();
    let picFileId=this.choosePicByWeek();
    this.getImagesByWeek(picFileId);
    setTimeout(()=>{
      this.recommendProds();
    },2000)
  },

  getImages(){
    my.fncontext.callFunction({
      name:'cultrueImages',
      data:{
        fileId: [
          'cloud://env-00jx4k03swkv/paintPics/paint/hua_01.jpg',
          'cloud://env-00jx4k03swkv/paintPics/paint/hua_02.jpg',
          'cloud://env-00jx4k03swkv/paintPics/paint/hua_03.jpg',
          'cloud://env-00jx4k03swkv/paintPics/paint/hua_04.jpg',
          'cloud://env-00jx4k03swkv/paintPics/paint/hua_05.jpg',
          'cloud://env-00jx4k03swkv/paintPics/paint/hua_06.jpg',
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
    })
  },
  recommendProds(){
    var self = this;
    my.fncontext.callFunction({
      name:"searchByType",
      data:{
        pType:5,
        nowPage:1
      },
      success:function(res){
        self.handlePageChange(res.result.message);
      }
    })
  },

  goStore(){
    my.navigateTo({
      url:"/pages/store_pages/storeZone/storeZone?typeIndex=4"
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
  /*getRandomImages(fileIdList){
    my.fncontext.callFunction({
      name:'cultrueImages',
      data:{
        fileId: fileIdList
      },
      success:(res)=>{
        var imgList = [];
        res = res.result;
        for(var index in res){
          imgList[index] = res[index].tempFileURL;
        };
        let randomInt = Math.floor(Math.random() * 5) + 1;
        this.setData({
          randomPhoto:imgList,
          photo:imgList[randomInt],
          randomFileId:''
        });
      }
    })
  },

  productRandomPaint(){
    var tmp=Math.random()*this.data.randomPhoto.length
    tmp=Math.floor(tmp)
    while(this.data.randomPhoto[tmp]==this.data.photo){
      tmp=Math.random()*this.data.randomPhoto.length
      tmp=Math.floor(tmp)
    }
    this.setData({
      photo:this.data.randomPhoto[tmp]
    })
  },*/
  choosePicByWeek(){
    var week=new Date().getDay();
    var picFileId;
    var listFileId=this.data.randomFileId;
    if(week===0){
      picFileId=listFileId[3];
    }else{
      picFileId=listFileId[week-1];
    }
    return picFileId;
  },
  getImagesByWeek(fileIdList){
    my.fncontext.callFunction({
      name:'cultrueImages',
      data:{
        fileId: [fileIdList]
      },
      success:(res)=>{
        res = res.result;
        this.setData({
          photo:res[0].tempFileURL,
        });
      }
    })
  },
});
