Page({
  data: {
    countdown: 3
  },
  onLoad() {},
  toPortal(){
    my.navigateTo({
      url:'/pages/nav/store/store'
    })
  },
  toPayment(){
    my.navigateBack({
      delta:2
    })
  },
  onShow(){
    this.startCountdown();
  },

  startCountdown() {
    const intervalId = setInterval(() => {
      const { countdown } = this.data;

      if (countdown > 1) {
        this.setData({
          countdown: countdown - 1
        });
      } else {
        clearInterval(intervalId);
        my.switchTab({
          url:'/pages/nav/store/store'
        })
      }
    }, 1000);
  }
  
});
