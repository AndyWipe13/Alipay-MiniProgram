const fs = require('node:fs');
const cloud = require('@alipay/faas-server-sdk');
cloud.init({
  env: 'env-00jx4k03swkv'
});

const cloudPath = 'faas-nodejs-sdk/index.js';

exports.main = async (event, context) => {

  const fileList = event.fileId;
  // 批量获取临时访问链接
  const tempFileList  = (await cloud.getTempFileURL(fileList)).fileList;
  console.log('文件临时访问链接列表:', tempFileList);
  
  return tempFileList;
};