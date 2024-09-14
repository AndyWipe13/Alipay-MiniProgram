const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  var index = event.index;
  const db = cloud.database();
  var nowInf = await db.collection("videos").where({
    vId : index
  }).projection({
    _id: false,
    vId:false,
    img:false
  }).get();
  nowInf = nowInf[0];
  var videoList = await db.collection("videos").
  projection({
    _id: false,
    src:false
  }).limit(10).get();
  videoList.splice(index,1);
  return {nowInf:nowInf,videoList:videoList};
};