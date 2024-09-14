const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();
  //查询订单,以20个数据分页查询
  var order = null;
  console.log(event.status);
  if(event.status===3){
    order =await db.collection("myPayments").
    orderBy('date', 'desc').
    where({
      _openid:cloud.getAlipayContext().OPENID,
    }).
    projection({
      pId: true,
      cnt:true,
      price:true,
      finalPrice:true,
      pName:true,
      info_pic:true,
      status:true
    }).
    skip((event.nowPage-1)*10).
    limit(10).
    get();
  }else{
    order =await db.collection("myPayments").
    orderBy('date', 'desc')
    .where({
      _openid:cloud.getAlipayContext().OPENID,
      status:event.status
    }).
    projection({
      pId: true,
      cnt:true,
      price:true,
      finalPrice:true,
      pName:true,
      info_pic:true,
      status:true
    }).
    skip((event.nowPage-1)*10).
    limit(10).
    get();
  }
  console.log(order);
  //有订单
  if(order&&order.length>0){
    var imgList = [];
    for(var index in order){
      imgList[index] = order[index].info_pic;
    }
    var fileList = (await cloud.getTempFileURL(imgList)).fileList;
    for(var tmp in order){
      order[tmp].info_pic = fileList[tmp].tempFileURL;
    }
    return { message: order,success:true};
  }
  //无订单
  else
    return {success:false};
};