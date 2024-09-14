Page({
  data:{
    blogFileList:{
      blog1:[
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/1/1.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/1/2.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/1/3.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/1/4.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/1/5.jpg',
      ],
      blog2:[
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/2/1.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/2/2.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/2/3.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/2/4.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/2/5.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/2/6.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/2/7.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/2/8.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/2/9.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/2/10.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/2/11.jpg',
      ],
      blog3:[
      'cloud://env-00jx4k03swkv/blogPics/blogsPic/3/1.jpg',
      'cloud://env-00jx4k03swkv/blogPics/blogsPic/3/2.jpg',
      'cloud://env-00jx4k03swkv/blogPics/blogsPic/3/3.jpg',
      'cloud://env-00jx4k03swkv/blogPics/blogsPic/3/4.jpg',
      'cloud://env-00jx4k03swkv/blogPics/blogsPic/3/5.jpg',
      'cloud://env-00jx4k03swkv/blogPics/blogsPic/3/6.jpg',
      'cloud://env-00jx4k03swkv/blogPics/blogsPic/3/7.jpg',
      'cloud://env-00jx4k03swkv/blogPics/blogsPic/3/8.jpg',
      'cloud://env-00jx4k03swkv/blogPics/blogsPic/3/9.jpg'
    ],
      blog4:[
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/4/1.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/4/2.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/4/3.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/4/4.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/4/5.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/4/6.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/4/7.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/4/8.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/4/9.jpg',
        'cloud://env-00jx4k03swkv/blogPics/blogsPic/4/10.jpg'
      ]
    }
  },
  onLoad(){
    my.setNavigationBar({
      frontColor: '#000',
      backgroundColor: '#fff',
    });
    my.showLoading({
      content:"加载中"
    });
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('indexDataSection5', data => {
    /*  var fileList = [];
      switch(data.index){
        case 0:
          fileList = this.data.blogFileList.blog1;
          break;
        case 1:
          fileList = this.data.blogFileList.blog2;
          break;
        case 2:
          fileList = this.data.blogFileList.blog3;
          break;
        case 3:
          fileList = this.data.blogFileList.blog4;
          break;
      }*/
      this.getBlogImage(data.index);
    });
  },

  getBlogImage(index){
    my.fncontext.callFunction({
      name:'getBlogImgs',
      data:{
        index:index
      },
      success:(res)=>{
        res = res.result.message;
        var imgList = [];
        for(var index in res.imgList){
          imgList[index] = res.imgList[index];
        }
        this.setData({
          blogImgs:imgList,
          blogFileList:''
        });
        my.hideLoading();
      }
    })
  }
});
