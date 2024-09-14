Page({
  data: {
    nameIcon:'',
    priceIcon:'',
    timeIcon:"DownOutline",
    timeColor:'#c07838',
    imgFileList:[
      'cloud://env-00jx4k03swkv/store_Recommend/costume.jpg',
      'cloud://env-00jx4k03swkv/store_Recommend/instrument.jpg',
      'cloud://env-00jx4k03swkv/store_Recommend/chess.jpg',
      'cloud://env-00jx4k03swkv/store_Recommend/calligraphy.jpg',
      'cloud://env-00jx4k03swkv/store_Recommend/paint.jpg',
      'cloud://env-00jx4k03swkv/store_Recommend/extra.jpg'
    ]
  },
  onLoad(message) {
    let typeIndex = parseInt(message.typeIndex);
    my.setNavigationBar({
      title:this.pType(typeIndex)
    })
    this.initBackground(typeIndex);
    typeIndex++;
    this.searchByType(typeIndex,1,'pId','desc');this.searchByType(typeIndex,1,'pId','desc');
    this.setData({
      nowType:typeIndex
    })
  },

  pType(typeIndex){
    var typeName;
    switch(typeIndex){
      case 0:
       typeName="古装服饰";
       break;
      case 1:
        typeName="古音乐器";
        break;
      case 2:
       typeName="棋类";
       break;
      case 3:
       typeName="文房四宝";
       break;
      case 4:
       typeName="绘画艺品";
       break;
      case 5:
       typeName="文化周边";
       break;
    }
    return typeName;
  },
  initBackground(typeIndex){
    var self = this;
    my.fncontext.callFunction({
      name:"cultrueImages",
      data:{
        fileId:[this.data.imgFileList[typeIndex]]
      },
      success:function(res){
        res = res.result;
        self.setData({
          background:res[0].tempFileURL
        })
      }
    })
  },
  searchByType(type,nowPage,sortColumn,sortOrder){
    my.showLoading({
      content:'加载中'
    });
    var self = this;
    my.fncontext.callFunction({
      name:"searchByType",
      data:{
        pType:type,
        nowPage:nowPage,
        sortColumn:sortColumn,
        sortOrder:sortOrder
      },
      success:function(res){
        if(res.result.success===true){
          self.setData({
            productList:res.result.message
          })
        }
        my.hideLoading();
      }
    })
  },
  sortTime(){
    const timeIcon = this.data.timeIcon;
    switch(timeIcon){
      case '':
        this.searchByType(this.data.nowType,1,'pId','desc');
        this.setData({
          timeIcon:"DownOutline",
          nameIcon:'',
          priceIcon:'',
          timeColor:'#c07838',
          nameColor:'',
          priceColor:''
        });
        break;
      case 'UpOutline':
        this.searchByType(this.data.nowType,1,'pId','desc');
        this.setData({
          timeIcon:"DownOutline"
        });
        break;
      case 'DownOutline':
        this.searchByType(this.data.nowType,1,'pId','asc');
        this.setData({
          timeIcon:'UpOutline'
        });
        break;
    }
  },
  sortName(){
    const nameIcon = this.data.nameIcon;
    switch(nameIcon){
      case '':
        this.searchByType(this.data.nowType,1,'pName','desc');
        this.setData({
          nameIcon:"DownOutline",
          timeIcon:'',
          priceIcon:'',
          nameColor:'#c07838',
          timeColor:'',
          priceColor:''
        });
        break;
      case 'UpOutline':
        this.searchByType(this.data.nowType,1,'pName','desc');
        this.setData({
          nameIcon:"DownOutline"
        });
        break;
      case 'DownOutline':
        this.searchByType(this.data.nowType,1,'pName','asc');
        this.setData({
          nameIcon:'UpOutline'
        });
        break;
    }
  },
  
  sortPrice(){
    const priceIcon = this.data.priceIcon;
    switch(priceIcon){
      case '':
        this.searchByType(this.data.nowType,1,'price','desc');
        this.setData({
          priceIcon:"DownOutline",
          timeIcon:'',
          nameIcon:'',
          priceColor:'#c07838',
          nameColor:'',
          timeColor:''
        });
        break;
      case 'UpOutline':
        this.searchByType(this.data.nowType,1,'price','desc');
        this.setData({
          priceIcon:"DownOutline"
        });
        break;
      case 'DownOutline':
        this.searchByType(this.data.nowType,1,'price','asc');
        this.setData({
          priceIcon:'UpOutline'
        });
        break;
    }
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
});
