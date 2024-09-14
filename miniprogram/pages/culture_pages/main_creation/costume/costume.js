Page({
  data: {
    isLoad:'none',
    // chuanda:[
    //   {
    //     title:'唐制形制',
    //     img:'',
    //     info:'唐朝形制华贵大气，色彩俏丽。服饰有精美的印花/刺绣做点缀，绮丽锦绣'
    //   }
    // ],
    // daka:[
    //   {
    //     title:"洛阳出行",
    //     area:"老城区"
    //   },
    //   {
    //     title:"长安风情",
    //     area:"钟楼"
    //   },
    //   {
    //     title:"长安风情",
    //     area:"广仁寺"
    //   },
    //   {
    //     title:"烟雨江南",
    //     area:"饶葛仙村"
    //   }
    // ]
  },
  // onSwipeChange1(e) {
  //   this.setData({
  //     current1: e.detail.current,
  //   });
  // },
  // onChange1(current1) {
  //   this.setData({
  //     current1,
  //   });
  // },
  onLoad() {
    my.setNavigationBar({
      frontColor: '#000',
      backgroundColor: '#EDE4DB',
    });
    my.showLoading({
      content:"加载中"
    });
    my.fncontext.callFunction({
      name: 'cultrueImages',
      data: {
        fileId: [
          'cloud://env-00jx4k03swkv/costumePics/costume/costume1.jpg',
          'cloud://env-00jx4k03swkv/costumePics/costume/2.jpg',
          'cloud://env-00jx4k03swkv/costumePics/costume/3.jpg',
          'cloud://env-00jx4k03swkv/costumePics/costume/4.jpg',
          'cloud://env-00jx4k03swkv/costumePics/costume/5.jpg',
          'cloud://env-00jx4k03swkv/costumePics/costume/6.jpg',
          'cloud://env-00jx4k03swkv/costumePics/costume/7.jpg'
        ]
      },
      success: (res) => {
        var imgList = [];
        res = res.result;
        for (var index in res) {
          imgList[index] = res[index].tempFileURL;
        };
        this.setData({
          images: imgList
        });
        my.hideLoading();
      }
    });
    setTimeout(()=>{
      this.recommendProds();
    },2000)
  },
  recommendProds(){
    var self = this;
    my.fncontext.callFunction({
      name:"searchByType",
      data:{
        pType:1,
        nowPage:1
      },
      success:function(res){
        self.handlePageChange(res.result.message);
      }
    })
  },

  goStore(){
    my.navigateTo({
      url:"/pages/store_pages/storeZone/storeZone?typeIndex=0"
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