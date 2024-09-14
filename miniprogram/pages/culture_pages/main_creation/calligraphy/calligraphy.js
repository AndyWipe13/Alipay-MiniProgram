Page({
  data: {
    photofile:"",
    title:"登高",
    author:"杜甫",
    content:["风急天高猿啸哀","渚清沙白鸟飞回",
      "无边落木萧萧下","不尽长江滚滚来"],
    isLoad:"none",
  },
  
  onLoad() {
    my.showLoading({
      content:"加载中"
    });
    my.fncontext.callFunction({
      name:'cultrueImages',
      data:{
        fileId:[
          'cloud://env-00jx4k03swkv/calligraphyPics/calligraphy/shu_01.jpg',
          'cloud://env-00jx4k03swkv/calligraphyPics/calligraphy/shu_02.jpg',
          'cloud://env-00jx4k03swkv/calligraphyPics/calligraphy/shu_03.jpg',
          'cloud://env-00jx4k03swkv/calligraphyPics/calligraphy/shu_04.jpg',
          'cloud://env-00jx4k03swkv/calligraphyPics/calligraphy/shu_05.jpg',
          'cloud://env-00jx4k03swkv/calligraphyPics/calligraphy/shu_06.jpg',
          'cloud://env-00jx4k03swkv/calligraphyPics/calligraphy/shu_07.jpg',
          'cloud://env-00jx4k03swkv/calligraphyPics/calligraphy/shu_08.jpg',
          'cloud://env-00jx4k03swkv/calligraphyPics/calligraphy/shu_09.jpg',
          'cloud://env-00jx4k03swkv/calligraphyPics/calligraphy/待上传.jpg'
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
  daka(){
    if (this.data.photofile==""){
      my.alert({
        title:"君",
        content:"请先上传",
        buttonText: '吾知道了',
      })
    }else{
      my.alert({
        title:"君",
        content:"打卡成功",
        buttonText: '我知道了',
      })
    }
  },
  shangchuan(){
    self=this
    my.chooseImage ({
      sourceType: ['album','camera'],
      count:1,
      success: function (res) {
        self.setData({
          photofile:res.tempFilePaths[0]
        })
        console.log (res);
      },
      fail: function (err) {
        console.log (err);
      },
      
    });
  },

  recommendProds(){
    var self = this;
    my.fncontext.callFunction({
      name:"searchByType",
      data:{
        pType:4,
        nowPage:1
      },
      success:function(res){
        self.handlePageChange(res.result.message);
      }
    })
  },

  goStore(){
    my.navigateTo({
      url:"/pages/store_pages/storeZone/storeZone?typeIndex=3"
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
