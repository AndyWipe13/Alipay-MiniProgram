const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');


exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();
  const colls =await db.collection("user").
  where({
    _openid:cloud.getAlipayContext().OPENID
  }).
  projection({
    _id:false,
    _openid:false,
    myCart:false,
    myColls:true
  }).
  get();//查询订单,以20个数据分页查询
  var nowIndex = (event.nowPage-1)*10;
  var list = (colls[0].myColls).splice(nowIndex,10);
  if(list.length>0){//有收藏
    const res = await cloud.callFunction({
      name: 'getCollsInfo',
      data: {
        pId:list,
        nowPage:event.nowPage
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
  else//无收藏
  {
    return {message:0,success:false};
  }
    
};