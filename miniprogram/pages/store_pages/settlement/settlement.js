Page({
  data: {
    cnt:"1",
    reciever:'暂未获取到收货地址',
    phoneNumber:'',
    address:'点此获取收货地址',
    authAddress:'noneAddress',
    arr:'right',
    haveAddress:false,
    index:-1,
    num:null,
    count:0
  },
  async onLoad() {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('pMessage', pMessage => {
      this.setData({
        pId:pMessage.pId,
        pCnt:pMessage.pCnt,
        totalPrice:pMessage.totalPrice,
        isCart:pMessage.isCart
      })
    });
    my.showLoading({
      content:'加载中',
      delay:100
    })
    await this.getProdBaseInfo();
  },
  prodCnt(value){
    console.log(typeof value);
    var cnt=this.data.count;
    cnt++;
    if(typeof value=="object"){
      if(cnt%2==0){
        this.setData({
          index:value.currentTarget.dataset.index
        });
        var oldNum=this.data.pCnt[this.data.index];//统计上一次的数量便于对总价格进行计算
        var newpCnt=this.data.pCnt;
        newpCnt[this.data.index]=this.data.num;
        this.setData({
          pCnt:newpCnt,
          count:0
        });
        console.log(this.data.index);
        var money=this.data.proArr[this.data.index].price*(this.data.num);
        var totalMoney=this.data.totalPrice+this.data.proArr[this.data.index].price*(this.data.num-oldNum);
        this.setData({
          cntPrice:money,
          totalPrice:totalMoney
        });
      }
    }
    if(typeof value=="number"){
      this.setData({
          num:value,
          count:cnt
      });    
    }
  },

  async getProdBaseInfo(){
    if(this.data.pId.length!=0){
    my.fncontext.callFunction({
      name:'getProdBaseInfo',
      data:{
        pId:this.data.pId
      },
      success:(res)=>{
        this.setData({
          proArr:res.result.message
        });
        my.hideLoading();
      }
    })
  }
  },

  handleToastClose(){
    this.setData({
      haveAddress:false
    })
  },
  getAddress(){
    var self = this;
    my.getAddress({
      success: function(res) {
        if(res.resultStatus==9000){
          self.setData({
            reciever : res.result.fullname,
            phoneNumber : res.result.mobilePhone,
            address : res.result.address,
            authAddress:'gotAddress',
            arr:''
          })
        }
      },
      fail: function(err) {
        console.log(err);
      }
    });
  },

  emitSettlemnet(){
    if(this.data.reciever==='暂未获取到收货地址'){
      this.setData({
        haveAddress:true
      })
    }else{
      var cntPrice=[];
      var price=[];
      var pName=[];
      var info_pic=[];
      for(var i=0;i<this.data.pCnt.length;i++){
        cntPrice[i]=this.data.proArr[i].price*this.data.pCnt[i];
        price[i]=this.data.proArr[i].price;
        pName[i]=this.data.proArr[i].pName;
        info_pic[i]=this.data.proArr[i].info_pic;
      }
      my.showLoading({
        content: '交易中...',
        delay: '100',
      });
      my.fncontext.callFunction({
        name:'addPayment',
        data:{
          pId:this.data.pId,
          info_pic:info_pic,
          prodName:pName,
          address: this.data.address,
          phoneNumber:this.data.phoneNumber,
          fullName:this.data.reciever,
          cnt:this.data.pCnt,
          price:price,
          finalPrice:cntPrice,
          isCart:this.data.isCart
        },success:(res)=>{
          if(res.result.success===true){
            my.hideLoading()
            my.navigateTo({
              url:'/pages/store_pages/paySuccess/paySuccess',
              success:(res)=>{
              }
            })
          }
        }
      })
    }
  }
});