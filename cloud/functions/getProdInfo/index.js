const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();
 
  //查找对应 pId 商品
  const product=await db.collection('product').where({
      'pId':event.pId
    }).projection({
      pName: true,
      price: true,
      info_pic:true,
      p_pic: true,
      pId:false,
      pType:false,
      _id:false
    }).get();

  if(product&&product.length>0){
    const productInfo = product[0];
    //有商品
    var imgList = productInfo.info_pic;
    var fileList = (await cloud.getTempFileURL(imgList)).fileList;
    for(var index in fileList){
      productInfo.info_pic[index]=fileList[index].tempFileURL;
    }
    return { message: productInfo,success:true};
  }
  else
    return {success:false};
};