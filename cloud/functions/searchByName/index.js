const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');


exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();
  console.log(event.keyValue);
  const product =await db.collection("product").
    where({
      pName:{$regex:event.keyValue}
    }).
    projection({
      _id: false,
      p_pic: false
    }).
    skip(10*(event.nowPage-1)).
    limit(10).
    get();//模糊查询含有关键词的字段,以20个数据分页查询

  
  if(product&&product.length>0){
    //有商品
    var imgList = [];
    for(var index in product){
      imgList[index] = product[index].info_pic[0];
    }
    var fileList = (await cloud.getTempFileURL(imgList)).fileList;
    for(var tmp in product){
      product[tmp].info_pic = fileList[tmp].tempFileURL;
    }
    return { message: product,success:true};
  }
  else//无商品
    return {success:false};
};