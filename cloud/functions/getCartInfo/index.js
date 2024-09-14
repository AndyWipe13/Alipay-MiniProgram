const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');
exports.main = async (event, context) => {
  //初始化
  cloud.init({
      env: 'env-00jx4k03swkv'
    });
  const db = cloud.database();
  
  //遍历在product集合查询pId结果
  var products=[];

  for(var i=0;i<event.pId.length;i++){
    var product=await db.collection('product').
      where({
        'pId':event.pId[i]
      }).projection({
        pName: true,
        price: true,
        pId:true,
        info_pic:true,
        pType:false,
        _id:false
      }).get();
    //将购买数量添加到 JSON 数组
    var finaProduct=product[0];
    finaProduct.pCnt=event.pCnt[i];
    console.log(finaProduct);
    //若 product 不为空添加 finaProduct 到 products
    if(product)
      products.push(finaProduct);
  }

  console.log(products);
  return products;
};