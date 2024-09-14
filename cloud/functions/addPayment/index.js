const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();

  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  console.log(formattedTime);


  // 添加订单
  var order=[];
  for(var i=0;i<event.pId.length;i++){
  order[i] = await db.collection('myPayments').
  add({
    data: {
      pId:event.pId[i],
      info_pic:event.info_pic[i],
      pName: event.prodName[i],
      date:formattedTime,
      address:event.address,
      phoneNumber:event.phoneNumber,
      fullName:event.fullName,
      cnt:event.cnt[i],
      price:event.price[i],
      finalPrice:event.finalPrice[i],
      status:0
    },
  });
}           
  if(event.isCart==true){
    const res = await cloud.callFunction({
      name: 'cartDel',
      data:{
        pId:event.pId
      }
    });
  }
  if(order[0]._id!=null)
    return {message:order._id,success:true};
  else
    return {success:true};
};