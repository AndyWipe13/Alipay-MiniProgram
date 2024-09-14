const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();
  
  //查询用户收藏
  const oldColls  =await db.collection('user').where({
    '_openid':cloud.getAlipayContext().OPENID,
  }).projection({
    myColls:true,
  }).get();
  var newColls=oldColls[0].myColls.filter(item => item != event.pId);
  const res = await db.
    collection('user').
    where({'_openid':cloud.getAlipayContext().OPENID}).
    update({
      data: {
          myColls:newColls
        }
    });

  if(res.count>0&&newColls!=oldColls)
    return {success:true};
  else
    return {success:false};

};