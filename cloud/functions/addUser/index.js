const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');


exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();
  const user = await db.collection('user').
  where({
    _openid: cloud.getAlipayContext().OPENID
  }).get();

  //如果已有此用户返回值为1，若无添加后返回值为2
  var authUser = 1;
  if(user.length===0){
    // 向 collection 添加 doc
    db.collection('user').
    add({
      data:{
        _openid: cloud.getAlipayContext().OPENID,
        myCart:[],
        myColls:[]
      }
  });
    authUser = 2;
  }

  return { message: authUser,success:true };
};