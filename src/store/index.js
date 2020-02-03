import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const types={
  SET_LOCATION:"SET_LOCATION",
  SET_ADDRESS:"SET_ADDRESS",
  ORDER_INFO:"ORDER_INFO",
  USER_INFO:"USER_INFO",
  TOTAL_PRICE:"TOTAL_PRICE",
  REMARK_INFO:"REMARK_INFO"
}
const state={
  location:{},
  address:"",
  orderInfo:null,
  userInfo:null,
  remarkInfo: {
    tableware: '',
    remark: ''
  }
}
const getters={
  location:state=>state.location,
  address:state=>state.address,
  orderInfo:state=>state.orderInfo,
  userInfo:state=>state.userInfo,
  totalPrice:state=>{
    let price=0;
    const selectFoods=state.orderInfo.selectFoods;
    selectFoods.forEach(item=>{
      price+=item.activity.fixed_price*item.count
    })
    price += state.orderInfo.shopInfo.float_delivery_fee;
    return price
  },
  remarkInfo: state => state.remarkInfo

}
const mutations={
  [types.SET_LOCATION](state,location){
    if(location){
      state.location=location
    }else{
      state.location=null
    }

  },
  [types.SET_ADDRESS](state,address){
    if(address){
      state.address=address
    }else{
      state.address=""
    }
    
  },
  [types.ORDER_INFO](state,orderInfo){
    if(orderInfo){
      state.orderInfo=orderInfo
    }else{
      state.orderInfo=null
    }
  },
  [types.USER_INFO](state,userInfo){
    if(userInfo){
      state.userInfo=userInfo
    }else{
      state.userInfo=null
    }
  },
  [types.REMARK_INFO](state, remarkInfo) {
    if (remarkInfo) {
      state.remarkInfo = remarkInfo;
    } else {
      state.remarkInfo = null;
    }
  }
}
const actions={
  setLocation({commit},location){
    this.commit(types.SET_LOCATION,location)
  },
  setAddress({commit},address){
    this.commit(types.SET_ADDRESS,address)
  },
  setOrderInfo({commit},orderInfo){
    this.commit(types.ORDER_INFO,orderInfo)
  },
  setUserInfo({commit},userInfo){
    this.commit(types.USER_INFO,userInfo)
  },
  setRemarkInfo: ({ commit }, remarkInfo) => {
    commit(types.REMARK_INFO, remarkInfo);
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
