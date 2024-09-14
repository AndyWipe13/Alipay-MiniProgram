const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  // 初始化
  cloud.init({
    env: 'env-00jx4k03swkv'
  });
  const db = cloud.database();
  var status = (event.status)+1;
  const updateCount = await db.collection('myPayments').
  doc(event.payId).
  update({
    data:{
      status:status
    }
  })
  if(updateCount.count===1){
    return {success:true};
  }else{
    return {success:false};
  }
}