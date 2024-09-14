const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  //获取base_dir字段
  const base_dir = event.base_dir;
  const db = cloud.database();
  const docList = await db.collection('pics').where({'base_dir':''+base_dir+''}).get();
  var temp = "";
  var idList = [];
  for(index in docList){
    idList[index] = docList[index].fileID;
  };
  console.log(idList);
  var fileList = (await cloud.getTempFileURL(idList)).fileList;
  console.log(fileList);
  for(var tmp in docList){
     if(tmp==0){
      temp += "\""+docList[tmp].name+"\":\""+fileList[tmp].tempFileURL+"\"";
     }else{
      temp += ",\""+docList[tmp].name+"\":\""+fileList[tmp].tempFileURL+"\"";
     }
  }
  var imgs = '{'+temp+'}';
  return imgs;
};
