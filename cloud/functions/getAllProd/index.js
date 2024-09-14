const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');
exports.main = async (event, context) => {
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();
  const productList = await db.collection("product").
  orderBy('pId', 'desc').
  skip((event.nowPage-1)*10).limit(10).
  projection({
    _id: false,
    p_pic: false
  }).get();
  if(productList&&productList.length>0){
    var imgList = [];
    for(var index in productList){
      imgList[index] = productList[index].info_pic[0];
    }
    var fileList = (await cloud.getTempFileURL(imgList)).fileList;
    for(var tmp in productList){
      productList[tmp].info_pic = fileList[tmp].tempFileURL;
    }
    return {message:productList,success:true};
  }

  else
    return {success:false};
};