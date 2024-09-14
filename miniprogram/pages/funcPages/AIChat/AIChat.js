Page({
  data: {
    question:'',//用户提问的问题
    url:'',
    answer:'',//输出的回答
    chat:[{"role":"system","content":"你的名字叫小华同学，是我们支付宝小程序“文史浪漫旅”的专属AI助手，你现在扮演中华传统文化的发扬者，如果用户问你与传统文化无关的，请说：对不起，与传统文化无关的问题我太不清楚呢。"}],//聊天纪录，
    isViewVisible: true ,// 控制提示词是否可见
    isonLoad: false,
    tips:[
      "汉服有哪些主要的流派和特点？",
      "中国书法中有哪些不同的书写风格？"
    ],
    idx:1,
    appId:'',
    apiSecret:'',
    apiKey:'',
    chatHeight:1185
  },
  onLoad() {
    this.getWebsocketUrl();
    //this.connectWebsocket();
    this.onMessage();
    var app=getApp();
    this.setData({
      idx:this.data.chat.length,
      appId:app.globalData.aiSettion.appId,
      apiSecret:app.globalData.aiSettion.apiSecret,
      apiKey:app.globalData.aiSettion.apiKey,
    });
    if(!app.globalData.isFirstVisit&&this.data.chat.length!==1){
      this.setData({
        isViewVisible: false,
      });
    }else{
      app.globalData.isFirstVisit=false
    }
    this.scrollToBottom();
    my.getSystemInfo({
      success: (res) => {
        this.setData({
          screenWidth: res.screen.width
        })
      }
    })
  },
  onUnload() {
    my.closeSocket({
      success:()=>{
        console.log('关闭成功');
      }
    })
    my.offSocketMessage();
    if(this.data.answer[this.data.answer.length-1]==='⬤'){
      this.deleteChat();
      this.deleteChat();
    }
  },
  getWebsocketUrl() {
    return new Promise((resolve, reject) => {
      const CryptoJS = require('crypto-js');
      var url = "wss://spark-api.xf-yun.com/v3.5/chat";
      var host = "spark-api.xf-yun.com";
      var apiKeyName = "api_key";
      var date = new Date().toGMTString();
      // var date = 'Fri, 05 May 2023 10:43:39 GMT';
      var algorithm = "hmac-sha256";
      var headers = "host date request-line";
      var signatureOrigin = "host: ".concat(host, "\ndate: ").concat(date, "\nGET /v3.5/chat HTTP/1.1");
      var signatureSha = CryptoJS.HmacSHA256(signatureOrigin,this.data.apiSecret);
      var signature = CryptoJS.enc.Base64.stringify(signatureSha);
      var authorizationOrigin = "".concat(apiKeyName, "=\"").concat(this.data.apiKey, "\", algorithm=\"").concat(algorithm, "\", headers=\"").concat(headers, "\", signature=\"").concat(signature, "\"");
      var authorization = weBtoa(authorizationOrigin);
      url = "".concat(url, "?authorization=").concat(authorization, "&date=").concat(encodeURI(date), "&host=").concat(host);
      resolve(url)
      this.setData({
        url: url
      });
    })

    function weBtoa(string) {
      var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      string = String(string);
      var bitmap, a, b, c, result = "",
        i = 0,
        rest = string.length % 3;
      for (; i < string.length;) {
        if ((a = string.charCodeAt(i++)) > 255 ||
          (b = string.charCodeAt(i++)) > 255 ||
          (c = string.charCodeAt(i++)) > 255)
          throw new TypeError("Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.");
        bitmap = (a << 16) | (b << 8) | c;
        result += b64.charAt(bitmap >> 18 & 63) + b64.charAt(bitmap >> 12 & 63) +
          b64.charAt(bitmap >> 6 & 63) + b64.charAt(bitmap & 63);
      }
      return rest ? result.slice(0, rest - 3) + "===".substring(rest) : result;
    };
  },
  connectWebsocket(){
    this.getWebsocketUrl().then(res => {
    my.connectSocket({
      url: this.data.url, // 此 url 仅为示例，开发者可替换自己的 URL
      success: (res) => {
        console.log("创建socket连接成功" + JSON.stringify(res));
      },
      fail: (error) => {
        console.error('创建连接失败: ', JSON.stringify(error));
      },
    });
    my.onSocketOpen(function(res) {
    //  my.alert({ content: 'onSocketOpen' + JSON.stringify(res) });
    });
    my.onSocketError(function(res) {
     // my.alert({ content: 'onSocketError' + JSON.stringify(res) });
    });
    my.onSocketClose(function(res) {
    //  my.alert({ content: 'onSocketClose' + JSON.stringify(res) });
    });
    }).catch(err=>{
    })
  },
  sendMessage(){
    var idx=this.data.idx
    this.addChat("user",this.data.question,idx)//加入聊天记录
    this.setData({
      idx:idx+1,
    }); 
    this.connectWebsocket();
    var params = {
      "header": {
        "app_id": this.data.appId
      },
      "parameter": {
        "chat": {
          "domain": "generalv3.5",
          "temperature": 0.5,
          "max_tokens": 1024
        }
      },
      "payload": {
        "message": {
          "text": this.data.chat
        }
      },
      
    }
    setTimeout(()=>{
      my.sendSocketMessage({
        data: JSON.stringify(params),
        fail: (error) => {
          console.error('sendSocketMessage failed: ', JSON.stringify(error));
          this.deleteChat();
          my.alert({
            title: '网络开了小差，已为您重新连接',
            })
          this.setData({
              isonLoad: false,
              idx:this.data.idx-1
          });
          this.connectWebsocket();
        }
      })
    },700)
  },
  onMessage(){
    var str=''
    my.onSocketMessage((res)=>{
    var temp=this.data.answer
    var data=JSON.parse(res.data)
    var idx=this.data.idx
    //console.log(idx+'\n')
    str=str+data.payload.choices.text[0].content
    temp=str+'⬤'
    this.setData({
      answer: temp,
      isonLoad: false
    })
    this.addChat("assistant",this.data.answer,idx)//加入聊天记录
    if (data.header.status===2) {
      setTimeout(()=>{
        my.closeSocket({
          success:()=>{
            console.log('关闭成功');
          }
        })
        str=''
        var answer=this.data.answer
        answer = answer.substr(0, answer.length - 1);
        this.addChat("assistant",answer,idx)//加入聊天记录
        this.setData({
          idx:idx+1,
        });
       // this.connectWebsocket();
      },500)
    }
    });
    
  },

  toPaymentInfo(){
    if(this.data.question!=''){
      this.setData({
        isonLoad: true,
        answer: '',
        chatHeight:1185
    });
      //console.log("点击成功")
      this.sendMessage();
      //this.onMessage();
      this.setData({
        question: '', // 更新页面数据对象
        isViewVisible: false,
      });
     // console.log(this.data.answer)
    }
  },
  addChat(object,content,idx){
    var chat=this.data.chat
    chat.splice(idx,1,
      {"role": object, "content": content} 
      )
    this.setData({
      chat:chat
    }, () => {
      this.scrollToBottom();  // 更新滚动位置
    });
 //   this.scrollToBottom(); 
  },
  deleteChat(){
    var chat=this.data.chat
    chat.pop()
    this.setData({
      chat:chat
    });
//    this.scrollToBottom(); 
  },
  handleInput: function(e) {
    this.setData({
      question: e.detail.value  // 更新页面数据对象
    }, () => {

        this.heightByInput(); 
    });
  },
  tips(e){
    const index = e.target.dataset.index;
   // console.log("按钮的文本是:", event.target.dataset.text);
    this.setData({
      isonLoad: true,
      chatHeight:1185
    });
    this.setData({
      question: this.data.tips[index], // 更新页面数据对象
      isViewVisible: false
    });
    this.sendMessage();
    this.setData({
      question: '', // 更新页面数据对象
      isViewVisible: false,
    });
  },
  // 滚动到最底部
  scrollToBottom() {
    //console.log(1)
    const query = my.createSelectorQuery();
    query.select('.scroll-view-content').boundingClientRect();
    query.exec((res) => {
      if (res[0]) {
        this.setData({
          scrollTop: res[0].height  // 设置 scrollTop 为内容的高度
        });
      }
    });
  },
  heightByInput(){
    var rpx=750/this.data.screenWidth;
    const query = my.createSelectorQuery();
    query.select('.send').boundingClientRect();
    query.exec((res) => {
      //console.log(res[0].height)
      if (res[0]) {
        this.setData({
          chatHeight:1185- res[0].height*rpx+96.92 // 设置 scrollTop 为内容的高度
        });
      }
    });
  }
});