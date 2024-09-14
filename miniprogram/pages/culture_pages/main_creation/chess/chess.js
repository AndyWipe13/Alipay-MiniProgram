Page({
  data: {
    isLoad:"none",
    isReady: 'none',
    items: [
      {
        title:"棋文化",
        content:"",
      },
      {
        title:"围棋",
        content:"",
      },
      {
        title:"围棋史",
        content:"",
      },
      {
        title:"围棋地位",
        content:"",
      },
      {
        title:"象棋",
        content:"",
      },
      {
        title:"象棋史",
        content:"",
      },
      {
        title:"象棋地位",
        content:"",
      },
      {
        title:"影响",
        content:"",
      },
    ],
  },
  onLoad() {
    var self = this;
    my.setNavigationBar({
      frontColor: '#000',
      backgroundColor: '#FFFFFF',
    });
    my.showLoading({
      content:"加载中"
    });
    my.fncontext.callFunction({
      name: 'cultrueImages',
      data: {
        fileId: [
          'cloud://env-00jx4k03swkv/chessPics/chess/chess1.jpg',
          'cloud://env-00jx4k03swkv/chessPics/chess/chess2.jpg',
          'cloud://env-00jx4k03swkv/chessPics/chess/chess3.jpg',
          'cloud://env-00jx4k03swkv/chessPics/chess/chess4.jpg',
          'cloud://env-00jx4k03swkv/chessPics/chess/chess5.jpg',
          'cloud://env-00jx4k03swkv/chessPics/chess/chess6.jpg',
          'cloud://env-00jx4k03swkv/chessPics/chess/chess7.jpg',
          'cloud://env-00jx4k03swkv/chessPics/chess/chess8.jpg',
          'cloud://env-00jx4k03swkv/chessPics/chess/chess9.jpg',
          'cloud://env-00jx4k03swkv/chessPics/chess/chess10.jpg',
          'cloud://env-00jx4k03swkv/chessPics/bg.png'
        ]
      },
      success: (res) => {
        var imgList = [];
        var tmp_item=[]
        res = res.result;
        for (var index in res) {
          let tmp_object={
            title:'',
            content:''
          }
          imgList[index] = res[index].tempFileURL;
          tmp_object.title=`第${parseInt(index)+1}项1`;
          tmp_object.content=res[index].tempFileURL;
          tmp_item[index]=tmp_object;
        };
        self.setData({
          images: imgList,
        });
      }
    });

    my.fncontext.callFunction({
      name: 'getVideoTest',
      data: {
        fileId: ['cloud://env-00jx4k03swkv/chessPics/chessVideo.mp4']
      },
      success: (res) => {
        res = res.result;
        this.setData({
          src: res[0].tempFileURL,
        });
        my.hideLoading();
      }
    });
    setTimeout(() => {
      this.setData({
        isReady: ''
      });
      this.recommendProds();
    }, 2000)
  },

  recommendProds(){
    var self = this;
    my.fncontext.callFunction({
      name:"searchByType",
      data:{
        pType:3,
        nowPage:1
      },
      success:function(res){
        self.handlePageChange(res.result.message);
      }
    })
  },

  goStore(){
    my.navigateTo({
      url:"/pages/store_pages/storeZone/storeZone?typeIndex=2"
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