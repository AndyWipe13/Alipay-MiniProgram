Component({
  mixins: [],
  data: {},
  props: {
    imageUrl1: {
      type: String,
      value: ''
    },
    title1: {
      type: String,
      value: 'Title'
    },
    imageUrl2: {
      type: String,
      value: ''
    },
    title2: {
      type: String,
      value: 'Title'
    },
    dataIndex:{
      type:Int16Array,
      value:0
    }
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onImageSection(e){
      const dataset = e.currentTarget.dataset;
      const index = dataset.index;
      const self=this;
      my.navigateTo({
        url: "/pages/culture_pages/ancient_pic/ancient_pic",
        success: function(res) {
          // 通过 eventChannel 向 B 页面传送数据
          res.eventChannel.emit('indexData', { 
            data: `${index}` ,
          })
        }
      });
    },
  },
});
