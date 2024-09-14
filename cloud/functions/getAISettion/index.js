const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();
  const itemList =await db.collection("ai_settion").get()
  console.log(itemList)
  if(itemList.length>0){
    var item = itemList[0];
    return {success:true,message:item};
  }else{
    return {success:false};
  }
};