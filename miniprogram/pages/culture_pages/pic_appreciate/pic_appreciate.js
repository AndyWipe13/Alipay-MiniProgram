Page({
  data: {
    array:[
        {
          page:"",
          title:"",
        },
        {
          page:"",
          title:"",
        },
        {
          page:"",
          title:"",
        },
        {
          page:"",
          title:"",
        },
        {
          page:"",
          title:"",
        },
        {
          page:"",
          title:"",
        },
    ],
    length:5,
    indexArray:[]
  },
  onLoad() {
    my.setNavigationBar({
      title:"鉴赏之旅"
    })
    this.setData({
      length:`${parseInt(this.data.array.length/2)}`
    })
    let newArry=[];
    for(let i=0;i<this.data.length;i++){
      let row=[];
      for(let j=0;j<2;j++){
        row.push(i*2+j);
      }
      newArry.push(row);
    }
    this.setData({
      indexArray:newArry
    });
    my.showLoading({
      content:'加载中...'
    });
    this.initPics();
  },
  initPics(){
    my.fncontext.callFunction({
      name:'indexAppreciate',
      data:{
        set:"appreciate_index",
        idx:"index"
       /* fileId:[
          'cloud://env-00jx4k03swkv/appreciatePic/jianshang5.jpg',
          'cloud://env-00jx4k03swkv/appreciatePic/jianshang4.jpg',
          'cloud://env-00jx4k03swkv/appreciatePic/jianshang2.jpg',
          'cloud://env-00jx4k03swkv/appreciatePic/jianshang3.jpg',
          'cloud://env-00jx4k03swkv/appreciatePic/jianshang1.png',
          'cloud://env-00jx4k03swkv/appreciatePic/6.jpg',
          'cloud://env-00jx4k03swkv/appreciatePic/7.jpg',
          'cloud://env-00jx4k03swkv/appreciatePic/8.jpg',
          'cloud://env-00jx4k03swkv/appreciatePic/9.jpg',
          'cloud://env-00jx4k03swkv/appreciatePic/10.jpg'
        ]*/
      },
      success:(res)=>{
        res = res.result.message;
        var array=this.data.array;
        for(var index in res){
          array[index]={page:res[index].img};
        }
        this.setData({
          array:array
          /*[
            {
              page:res[0].tempFileURL
            },
            {
              page:res[1].tempFileURL
            },
            {
              page:res[2].tempFileURL
            },
            {
              page:res[3].tempFileURL
            },
            {
              page:res[4].tempFileURL
            },
            {
              page:res[5].tempFileURL
            },
            {
              page:res[6].tempFileURL
            },
            {
              page:res[7].tempFileURL
            },
            {
              page:res[8].tempFileURL
            },
            {
              page:res[9].tempFileURL
            },
          ]*/
        });
        this.setData({
          length:`${parseInt(this.data.array.length/2)}`
        })
        let newArry=[];
        for(let i=0;i<this.data.length;i++){
          let row=[];
          for(let j=0;j<2;j++){
            row.push(i*2+j);
          }
          newArry.push(row);
        }
        this.setData({
          indexArray:newArry
        });
        my.hideLoading();
      }
    })
  }
});
