const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  //初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();
  //查询购物车情况
  const cart = await db.collection("user").
  aggregate().
  match({
    _openid:cloud.getAlipayContext().OPENID
  }).group({
   _id: '$myCart'
  }).end();
  var myCart=cart[0]._id;
  var nowIndex = (event.nowPage-1)*10;
  var list = myCart.splice(nowIndex,10);
  //判断用户购物车是否为空
  if(list.length==0){
    return {"message": 0};
  }else{
    //将购物车json数组的pId单独取出组成新的数组
    var pId=list.map(obj => {return obj.pId});
    //将购物车json数组的pCnt单独取出组成新的数组
    var pCnt=list.map(obj => {return obj.pCnt});
    const res = await cloud.callFunction({
      name: 'getCartInfo',
      data: {
        'pId':pId,
        'pCnt':pCnt
      }
    });
    var imgList = [];
    for(var index in res.result){
      imgList[index] = res.result[index].info_pic[0];
    }
    var fileList = (await cloud.getTempFileURL(imgList)).fileList;
    for(var tmp in res.result){
      res.result[tmp].info_pic = fileList[tmp].tempFileURL;
    }
    return {message:res.result,success:true};
  }
  
};