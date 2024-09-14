const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();
  console.log(event.pId.length);
  var res=[];
  //根据 pId 查找商品
  for(let i=0;i<event.pId.length;i++){
  res[i] = await db.collection('product').
    where({
      'pId':event.pId[i]
    }).projection({
      pName: true,
      price: true,
      p_pic: false,
      pId:false,
      info_pic:true,
      pType:false,
      _id:false
    }).get();
  }
  //  console.log(res[0][0]); 
  if(res&&res.length>0){
    var product=[]
    for(let i=0;i<event.pId.length;i++){
      product[i] = res[i][0];
      var fileList = (await cloud.getTempFileURL([product[i].info_pic[0]])).fileList;
      product[i].imgUrl = fileList[0].tempFileURL;
      product[i].info_pic = product[i].info_pic[0];
      console.log(product[i].info_pic);
    }
    return { message: product,success:true};
  }
  else
      return {success:false};
};