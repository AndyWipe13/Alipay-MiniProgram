const cloud = require('@alipay/faas-server-sdk');
cloud.init({
  env: 'env-00jx4k03swkv'
});

const cloudPath = 'faas-nodejs-sdk/index.js';

exports.main = async (event, context) => {

   // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();
  const itemList =await db.collection(event.set).
  orderBy(event.idx, 'asc').
  projection({
    _id: false,
  }).get()

  if(itemList.length>0){
    var item = itemList;
    var imgList=[]
    for(var index in item){
      imgList[index] = item[index].img;
    }
    var fileList = (await cloud.getTempFileURL(imgList)).fileList;
    for(var tmp in fileList){
      item[tmp].img = fileList[tmp].tempFileURL
    }
    console.log(item)
    return {success:true,message:item};
  }else{
    return {success:false};
  }


};