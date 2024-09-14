Page({
  data: {
    currentOpen: -1,
    length:0,
    cartIco:'/image/buy.png',
    nowSearch:false,
    pIdList:[0,0,0,0,0,0,4,18,25],
    productType:[
      {
        name:'汉服专区'
      },
      {
        name:'古音乐器'
      },
      {
        name:'棋类'
      },
      {
        name:'文房四宝'
      },
      {
        name:'绘画艺品'
      },
      {
        name:'文化周边'
      }
    ]
  },

  async onLoad() {
    my.showLoading({
      content:'客官请稍等'
    });
    this.getRecommend();
    this.getAll();
  },

  navigateToProdInfo(e){
    my.navigateTo({
      url: "/pages/store_pages/productInfo/productInfo",
      success:function(res){
        res.eventChannel.emit('pId',{
          data: e.currentTarget.dataset.pId
        })
      }
    })
  },

  getAll(){
    var self = this;
    my.fncontext.callFunction({
      name:"getAllProd",
      data:{
        nowPage: 1
      },
      success:function(res){
        res = res.result.message;
        let typeName1 = self.pType(res[0].pType);
        let typeName2 = self.pType(res[1].pType)
        self.setData({
          array:res,
          typeName1:typeName1,
          typeName2:typeName2
        })
        my.hideLoading();
      }
    })
  },

  pType(typeIndex){
    var typeName;
    switch(typeIndex){
      case 1:
       typeName="古装服饰";
       break;
      case 2:
        typeName="古音乐器";
        break;
      case 3:
       typeName="棋类";
       break;
      case 4:
       typeName="文房四宝";
       break;
      case 5:
       typeName="绘画艺品";
       break;
      case 6:
       typeName="文化周边";
       break;
    }
    return typeName;
  },

  handleSeach(value,e) {
    this.setData({
      searchValue:value
    })
  },

  getRecommend(){
    var self = this;
    my.fncontext.callFunction({
      name:"cultrueImages",
      data:{
        fileId:[
          'cloud://env-00jx4k03swkv/store_Recommend/costume.jpg',
          'cloud://env-00jx4k03swkv/store_Recommend/instrument.jpg',
          'cloud://env-00jx4k03swkv/store_Recommend/chess.jpg',
          'cloud://env-00jx4k03swkv/store_Recommend/calligraphy.jpg',
          'cloud://env-00jx4k03swkv/store_Recommend/paint.jpg',
          'cloud://env-00jx4k03swkv/store_Recommend/extra.jpg',
          'cloud://env-00jx4k03swkv/store_Recommend/background1.jpg',
          'cloud://env-00jx4k03swkv/store_Recommend/background2.jpg',
          'cloud://env-00jx4k03swkv/store_Recommend/background3.png'
        ]
      },
      success:function(res){
        res = res.result;
        var imgList = [];
        for(let index in res){
          imgList.push(res[index].tempFileURL)
        }
        self.setData({
          background:imgList
        })
      }
    })
  },
  goAllProd(){
    my.navigateTo({
      url:"/pages/store_pages/storeType/storeType?entryMethod=0"
    })
  },

  goType(e){
    let typeIndex = e.currentTarget.dataset.index;
    my.navigateTo({
      url:"/pages/store_pages/storeZone/storeZone?typeIndex="+typeIndex+""
    })
  },

  goSearch(value){
    if(value!==''){
      this.setData({
        searchValue:''
      })
      my.navigateTo({
        url:'/pages/store_pages/storeType/storeType?entryMethod=2&&value='+value+''
      })
    }
  },
  
});
