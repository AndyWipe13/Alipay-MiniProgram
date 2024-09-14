Page({
  data: {
    array:[
      {
        page:'',
        title:'',
        width:700,
        height:450
      },
      {
        page:'',
        title:'',
        width:700,
        height:450
      },
      {
        page:"",
        title:"",
        width:700,
        height:450
      },
      {
        page:"",
        title:"",
        width:700,
        height:450
      },
      {
        page:"",
        title:"",
        width:700,
        height:450
      },
      {
        page:"",
        title:"",
        width:700,
        height:450
      }
    ],
  },
  onLoad() {
    my.setNavigationBar({
      title:"精彩推荐"
    });
    my.showLoading({
      content:'加载中...'
    })
    my.fncontext.callFunction({
      name:'indexAppreciate',
      data:{
        set:"videos",
        idx:"vId"
      },
      success:(res)=>{
        var imgList = [];
        var array=[];
        res = res.result.message;
        for(var index in res){
          imgList[index] = res[index].img;
          array[index]={page:imgList[index],title:res[index].title,width:700,height:450}
        };
        this.setData({
          array:array
        });
        my.hideLoading();
      }
    })
  },
  onPageScroll(e){
    let scrolltop=e.scrollHeight/this.data.array.length
    scrolltop=562.0/scrolltop*e.scrollTop
    this.data.array.forEach((item, index) => {
      let tupian=(index*562)
      let jiemian=scrolltop
      let cha=tupian-jiemian
      let xishu=1
      if (cha<=0){
        xishu=0.85
      }else if(cha>0 && cha<700){
        xishu=(0.25/700)*(cha)+0.85
      }else if(cha>=700 && cha<1400){
        xishu=-(0.25/700)*(cha-700)+1
      }else{
        xishu=0.85
      }
      if(xishu>1){
        xishu=1
      }else if(xishu<0.85){
        xishu=0.85
      }
      item.width=parseInt(700*xishu)
      item.height=parseInt(450*xishu)
    })
    this.setData({
      array: this.data.array,
    });
  },
  onShow(){
    this.onice()
  },
  onice(){
    let temp_top=0
    let temp_height=0
    const query = my.createSelectorQuery();
    
    query.selectViewport().scrollOffset().exec((res) => {
      temp_top = res[0].scrollTop;
      temp_height = res[0].scrollHeight;
      let scrolltop=temp_height/this.data.array.length
     scrolltop=562.0/scrolltop*temp_top
     this.data.array.forEach((item, index) => {
       let tupian=(index*562)
       let jiemian=scrolltop
       let cha=tupian-jiemian
       let xishu=1
       if (cha<=0){
         xishu=0.85
       }else if(cha>0 && cha<700){
         xishu=(0.25/700)*(cha)+0.85
       }else if(cha>=700 && cha<1400){
         xishu=-(0.25/700)*(cha-700)+1
       }else{
         xishu=0.85
       }
       if(xishu>1){
         xishu=1
       }else if(xishu<0.85){
         xishu=0.85
       }
       item.width=parseInt(700*xishu)
       item.height=parseInt(450*xishu)
     })
     this.setData({
       array: this.data.array,
     });
      }
    );
     
  }
});