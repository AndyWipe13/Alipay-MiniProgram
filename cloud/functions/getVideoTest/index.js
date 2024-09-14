const fs = require('node:fs');
const cloud = require('@alipay/faas-server-sdk');
cloud.init({
  env: 'env-00jx4k03swkv'
});

const cloudPath = 'faas-nodejs-sdk/index.js';

exports.main = async (event, context) => {
  var fileList = (await cloud.getTempFileURL(event.fileId)).fileList;
  console.log('视频临时访问链接:', fileList);
  return fileList;
};