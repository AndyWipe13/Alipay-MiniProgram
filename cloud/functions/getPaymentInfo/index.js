const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');
const { execFileSync } = require('node:child_process');


exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();

  //查询订单,以20个数据分页查询
  const order =await db.collection("myPayments").
  where({
    _id:event.payId
  }).
  projection({
    pId: false,
    date:true,
    address:true,
    phoneNumber:true,
    fullName:true,
    cnt:true,
    pName:true,
    info_pic:true,
    status:true,
    _openID:false,
    price:true,
    finalPrice:true,
    _id:false
  }).
  get();
  
  if(order&&order.length>0){
    var imgList = [];
    imgList[0] = order[0].info_pic;
    var fileList = (await cloud.getTempFileURL(imgList)).fileList;
    order[0].info_pic = fileList[0].tempFileURL;
    return { message: order[0],success:true};
  }
  else
    return {success:false};
};