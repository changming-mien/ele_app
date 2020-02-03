<template>
  <div>
    <router-view></router-view>
    <tarBar :tabBar="tarBarData"/>
  </div>
</template>

<script>
import tarBar from "../components/tabBar.vue"
export default {
  components:{
    tarBar
  },
  data(){
    return {
      tarBarData:[{
        title:"首页",
        icon:'home',
        path:"/home"
      },{
        title:"订单",
        icon:'file-text-o',
        path:"/order"
      },{
        title:"我的",
        icon:'user',
        path:"/me"
      }]
    }
  }

}
</script>

<style scoped>
.index{
	width: 100%;
	height: calc(100% - 45px);
}
</style>