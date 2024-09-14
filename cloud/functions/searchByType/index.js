const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');


exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();
  const product =await db.collection("product").
    orderBy(event.sortColumn, event.sortOrder).
    where({
      pType:event.pType
    }).
    projection({
      _id: false,
      p_pic: false
    }).
    skip((event.nowPage-1)*10).
    limit(10).
    get();//模糊查询含有关键词的字段,以10个数据分页查询

  //有商品
  if(product&&product.length>0){
    var imgList = [];
    for(var index in product){
      imgList[index] = product[index].info_pic[0];
    }
    var fileList = (await cloud.getTempFileURL(imgList)).fileList;
    for(var tmp in product){
      product[tmp].info_pic = fileList[tmp].tempFileURL;
    }
    return { message: product,success:true};
  }else//无商品
    return {success:false};
};