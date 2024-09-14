const fs = require('node:fs');
const cloud = require('@alipay/faas-server-sdk');
cloud.init({
  env: 'env-00jx4k03swkv'
});

const cloudPath = 'faas-nodejs-sdk/index.js';

exports.main = async (event, context) => {
  // 批量获取临时访问链接
  var fileList = (await cloud.getTempFileURL(event.fileId)).fileList;
  console.log('文件临时访问链接列表:', fileList);
  
  return fileList;
};