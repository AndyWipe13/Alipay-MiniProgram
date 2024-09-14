const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();

  const Cart = await db.collection("user").
    aggregate().
    match({
      _openid:cloud.getAlipayContext().OPENID
    }).group({
    _id: '$myCart',
    cnt: db.command.aggregate.count()
    }).end();

  var nowCart=Cart[0]._id;
  var isAdded = 0;

  for(var index in nowCart){
    if(nowCart[index].pId===event.pId){
      isAdded = 1;
      break;
    }
  }
  if(Cart&&Cart.length>0)
    return { len:nowCart.length,isAdded: isAdded,success:true};
  else
    return {success:false};
};