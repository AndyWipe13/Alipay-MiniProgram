const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');


exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();
 
  //查询用户收藏
  const colls  =await db.collection('user').where({
    '_openid':cloud.getAlipayContext().OPENID,
  }).projection({
    myColls:true,
  }).get();
  //查询是否收藏此商品
  var isColls=colls[0].myColls.filter(item => item == event.pId);
  if(isColls&&isColls.length>0)
    return {message:1,success:true};
  else
    return {message:0,success:true};
};