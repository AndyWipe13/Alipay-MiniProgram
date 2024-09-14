const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();

  //查询用户的购物车
  var cart = await db.collection('user').where({
    '_openid':cloud.getAlipayContext().OPENID
  }).projection({
    myCart:true,
    _openid:false,
    myColls:false
  }).get();

  
  cart = cart[0].myCart;
  //删除购物车的某一商品
  var newCart;
  for(var i=0;i<event.pId.length;i++){
    newCart = cart.filter(item => item.pId !== event.pId[i]);
  }
  // 更新 myCart 内容 
  const res = await db.
    collection('user').
    where({'_openid':cloud.getAlipayContext().OPENID}).
    update({
      data: {
          myCart:newCart,
        }
    });
  
  if(res.count>0&&newCart!=cart)
    return {success:true};
  else
    return {success:false};
};