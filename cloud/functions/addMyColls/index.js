const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();

  //查找用户现有收藏
  const oldColls  =await db.collection('user').
  where({
    '_openid':cloud.getAlipayContext().OPENID,
  }).projection({
    myColls:true,
    _openid:false,
    myCart:false,
    _id:false
  }).get();

  //将新数据加入收藏
  var newColls=oldColls[0].myColls;
  newColls.unshift(event.pId);
  // 更新 myColls 内容 
  const res = await db.collection('user').
  where({'_openid':cloud.getAlipayContext().OPENID}).
  update({
      data: {
        myColls:newColls,
      }
  });
  
  if(res.count>0)
    return {success:true};
  else
    return {success:false};
};