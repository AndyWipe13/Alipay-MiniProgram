Component({
  mixins: [],
  data: {},
  props: {
    imageUrl: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: 'Title'
    },
    width:{
      type: Int16Array,
      value: 350
    },
    height:{
      type: Int16Array,
      value: 450
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
      console.log(index);
      my.navigateTo({
        url:"/pages/culture_pages/recommends/recommend/recommend",
        success: function(res) {
          // 通过 eventChannel 向 B 页面传送数据
          res.eventChannel.emit('indexDataSection4', { 
            data: index
          })
        }
      });
    },
  },
});
