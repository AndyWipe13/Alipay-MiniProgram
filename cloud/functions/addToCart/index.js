const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();
  //查找用户现有购物车
  const oldCart = await db.collection("user").
  aggregate().
  match({
    _openid:cloud.getAlipayContext().OPENID
  }).group({
   _id: '$myCart'
  }).end();

  //将新数据加入购物车
  var newCart=oldCart[0]._id;
  newCart.unshift({'pId':event.pId,'pCnt':event.pCnt});

  // 更新 myCart 内容 
  const res = await db.collection('user').
    where({'_openid':cloud.getAlipayContext().OPENID}).
    update({
        data: {
          myCart:newCart,
        }
    });
  
  if(res.count>0)
    return { message:newCart.length,success:true};
  else
    return {success:false};
};