Page({
  data: {
    currentOpen: -1,
    length:0,
    cartIco:'/image/buy.png',
    hasProducts:false,
    nowPage:1,
    noData:false,
    nowSearch:false,
  },
  onPullDownRefresh(){
    this.setData({
      nowSearch:false,
      nowPage:1,
      noData:false
    });
    this.onLoad({entryMethod:0});
    my.stopPullDownRefresh();
  },

  onLoad(message) {
    let entryMethod = parseInt(message.entryMethod);
    my.showLoading({
      content: '客官请稍等...'
    });
    switch(entryMethod){
      case 0:
        this.getAll(1);
        break;
      case 2:
        this.setData({
          searchValue:message.value
        })
        this.searchByName(message.value);
        break;
    }
  },

  handleSeach(value,e) {
    this.setData({
      searchValue:value
    })
  },

  // searchByType(type,nowPage){
  //   var self = this;
  //   my.fncontext.callFunction({
  //     name:"searchByType",
  //     data:{
  //       pType:type,
  //       nowPage:nowPage
  //     },
  //     success:function(res){
  //       if(res.result.success===true){
  //         self.handlePageChange(res.result.message);
  //         self.setData({
  //           productList:res.result.message
  //         })
  //       }
  //       my.hideLoading();
  //     }
  //   })
  // },

  handlePageChange(res){
    this.setData({
      array:res
    })
    if (parseInt(this.data.array.length/2)==this.data.array.length/2){
      this.setData({
        length:`${parseInt(this.data.array.length/2)}`
      })
    }else{
      this.setData({
        length:`${parseInt(this.data.array.length/2+1)}`
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
    if(parseInt(this.data.array.length/2)<this.data.array.length/2){
      showArray[this.data.length*2-1]=false;
    }
    this.setData({
      showArray:showArray
    });
    my.hideLoading();
  },

  getAll(nowPage){
    var self = this;
    my.fncontext.callFunction({
      name:"getAllProd",
      data:{
        nowPage: nowPage
      },
      success:function(res){
        res = res.result;
        if(nowPage===1){
          self.handlePageChange(res.message);
        }else{
          if(res.success===true){
            let list = self.data.array;
            list = list.concat(res.message);
            self.setData({
              nowPage:nowPage
            })
            self.handlePageChange(list);
          }else{
            self.setData({
              noData:true
            })
          }
        }
      }
    })
  },
  searchByName(value){
    if(value!==''){
      this.setData({
        noData:false
      })
      my.showLoading({
        content: '搜索中...',
        delay: '100',
      });
      var self = this;
      my.fncontext.callFunction({
        name:'searchByName',
        data:{
          keyValue:value,
          nowPage: 1
        },
        success:function(res){
          if(res.result.success===false){
            self.setData({
              hasProducts:true
            });
            my.hideLoading();
            my.showToast({
              content:'啊哦，没有您想要的商品，试试其他关键字吧',
              duration:1000
            })
          }else{
            self.handlePageChange(res.result.message);
            self.setData({
              nowSearch:value
            })
            my.hideLoading();
          }
        }
      });
      self.setData({
        hasProducts:false
      })
    }
  },

  onReachBottom(){
    if(this.data.noData===false){
      var nowPage = this.data.nowPage;
      nowPage++;
      if(this.data.nowSearch===false){
        this.getAll(nowPage);
      }
    }
  },
});