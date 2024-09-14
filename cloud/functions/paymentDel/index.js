const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();
console.log(event.pid)
  var res = await db.collection('myPayments').where({
    '_openid':cloud.getAlipayContext().OPENID,
    '_id':event.pid
  }).remove();


  if(res!=null)
    return {success:true};
  else
    return {success:false};
};