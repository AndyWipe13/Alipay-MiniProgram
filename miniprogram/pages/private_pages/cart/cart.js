Page({
  data: {
    price:0,
    index:-1,
    num:null,
    count:0,
    Content:"",
    hasCart:'none',
    nowPage:1
  },
  async onLoad() {
    const app = getApp();
    if(app.globalData.authUser===true){
      my.showLoading({
        content:'加载中...',
        delay:'100'
      })
      await this.getCartAll(1);
    }else{
      this.setData({
        Content:"您暂未授权小程序，无法获取购物车内容",
        hasCart:''
      })
    }
  },
  onPullDownRefresh(){
    this.onLoad();
    my.stopPullDownRefresh();
  },

  onScrollToBottom(){
    var nowPage = this.data.nowPage;
    nowPage++;
    this.getCartAll(nowPage);
  },

  async getCartAll(nowPage){
    var self = this;
    my.fncontext.callFunction({
      name: "getCartAll",
      data:{
        nowPage:nowPage
      },
      success:function(res){
        if(nowPage===1){
          if(res.result.message==0){
            self.setData({
              Content:"您目前购物车为空",
              hasCart:'',
              myCartArray:""
            })
          }else{
            var check=[];
            for(var i=0;i<res.result.message.length;i++){
              check[i]=false;
            };
            self.setData({
              myCartArray:res.result.message,
              checked:check
            });
          }
        }else{
          if(res.result.success===true){
            let list = self.data.myCartArray;
            list = list.concat(res.result.message);
            self.setData({
              nowPage:nowPage,
              myCartArray:list
            })
          }
        }
        my.hideLoading();
      }
    })
  },

  toProdInfo(value){
    my.navigateTo({
      url:'/pages/store_pages/productInfo/productInfo',
      success:(res)=>{
        res.eventChannel.emit('pId',{
          data:value.currentTarget.dataset.pId
        })
      }
    })
  },

  emitPay(){
    for(var i=0;i<this.data.checked.length;i++){
    if(this.data.checked[i]){
     my.navigateTo({
     url:'/pages/store_pages/settlement/settlement',
      success:(res)=>{
        var idList = [];
        var pCnt=[];
        var i=0;
        for(var index in this.data.myCartArray){
          if(this.data.checked[index]){
              idList[i] = this.data.myCartArray[index].pId;
              pCnt[i]=this.data.myCartArray[index].pCnt;
              i++;
          }
        }
        res.eventChannel.emit('pMessage',{
        pId:idList,
        pCnt:pCnt,
        totalPrice:this.data.price,
        isCart:true
        })
      }
    })
    break;
  }
  }
  },

  handleChange(checked){
    this.setData({
      index:checked.currentTarget.dataset.index
    });
    if(checked.detail.value===true){
      var money=this.data.price+this.data.myCartArray[this.data.index].pCnt*this.data.myCartArray[this.data.index].price;
      var newChaecked=this.data.checked;
      newChaecked[this.data.index]=true
      this.setData({
        checked:newChaecked
      });
    }else{
      var money=this.data.price-this.data.myCartArray[this.data.index].pCnt*this.data.myCartArray[this.data.index].price;
      if(money<0)
        money=0;
      var newChaecked=this.data.checked;
      newChaecked[this.data.index]=false
      this.setData({
        checked:newChaecked
      });
    }
    this.setData({
      price:money
   });
  },
  async onTap(value){
    var cnt=this.data.count;
    cnt++;
    if(typeof value=="object"){
      if(cnt%2==0){
        this.setData({
          index:value.currentTarget.dataset.index
        });
        var oldNum=this.data.myCartArray[this.data.index].pCnt;//统计上一次的数量便于对总价格进行计算
        var newCartArray=this.data.myCartArray;
        newCartArray[this.data.index].pCnt=this.data.num;
        this.setData({
          myCartArray:newCartArray,
          count:0
        });
        if(this.data.checked[this.data.index]==true){
            var money=this.data.price+this.data.myCartArray[this.data.index].price*(this.data.num-oldNum);
            this.setData({
              price:money
            });
        }
      }
    }
    if(typeof value=="number"){
      this.setData({
          num:value,
          count:cnt
      });    
    }

  },

  cartRemove(e) {
    this.setData({
      basicTwoVisible:true,
      targetData:e.target.dataset.pId
    })
  },

  handlePrimaryButtonTap(e){
    var self = this;
    var pId =[];
    pId[0] =this.data.targetData;
    my.fncontext.callFunction({
      name:'cartDel',
      data:{
        pId: pId
      },
      success:(res)=>{
        if(res.result.success===true){
          self.setData({
            basicTwoVisible:false,
          });
          self.onLoad();
        }
      }
    })
  },

  handleSecondaryButtonTap(){
    this.setData({
      basicTwoVisible:false
    })
  },
  allChecked(checked){
    var check=[];
    var money=0;
    if(checked.detail.value==true){
      for(var i=0;i<this.data.myCartArray.length;i++){
        check[i]=true;
        money+=this.data.myCartArray[i].pCnt*this.data.myCartArray[i].price;
      }
      this.setData({
        checked:check,
        price:money
      })
    }else{
      for(var i=0;i<this.data.myCartArray.length;i++){
        check[i]=false;
      }
      this.setData({
        checked:check,
        price:money
      })
    }
  }
});