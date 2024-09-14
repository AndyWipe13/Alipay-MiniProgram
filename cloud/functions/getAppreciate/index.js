const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();
  const itemList =await db.collection("appreciate_info").
  where({
    index: parseInt(event.index)
  }).get()
  console.log(itemList)
  if(itemList.length>0){
    var item = itemList[0];
    var fileList = (await cloud.getTempFileURL(item.imgList)).fileList;
    for(var index in fileList){
      item.imgList[index] = fileList[index].tempFileURL
    }
    return {success:true,message:item};
  }else{
    return {success:false};
  }
};