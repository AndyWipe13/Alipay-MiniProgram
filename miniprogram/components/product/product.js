Component({
  mixins: [],
  data: {},
  props: {
    prodPic1: {
      type: String,
      value: ''
    },
    pName1: {
      type: String,
      value: ''
    },
    price1: {
      type: Int16Array,
      value: 0
    },
    cartIco1: {
      type: String,
      value: ''
    },
    ifShow1:{
      type:String,
      value:''
    },
    ifShow2:{
      type:String,
      value:''
    },
    prodPic2: {
      type: String,
      value: ''
    },
    pName2: {
      type: String,
      value: 'Title'
    },
    price2: {
      type: Int16Array,
      value: 0
    },
    cartIco2: {
      type: String,
      value: ''
    },
    pId1: {
      type: String,
      value: ''
    },
    pId2: {
      type: String,
      value: ''
    }
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    navigateToProdInfo(e){
      my.navigateTo({
        url: "/pages/store_pages/productInfo/productInfo",
        success:function(res){
          res.eventChannel.emit('pId',{
            data: e.currentTarget.dataset.pId
          })
        }
      })
    },
  },
});
