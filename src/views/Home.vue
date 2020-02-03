<template>
  <div class="home">
    <div class="header">
    	<div class="address_map" @click="$router.push({name:'address',params:{city:city}})">
    		<i class="fa fa-map-marker"></i>
    		<span>{{address}}</span>
    		<i class="fa fa-sort-desc"></i>
    	</div>
    </div>
    <div class="search_wrap" :class="{'fixedview':isShow}" @click="$router.push('/search')">
      	<div class="shop_search">
          <i class="fa fa-search"></i>
          搜索商家 商家名称
        </div>
    </div>
    <div id="container">
      <mt-swipe :auto="4000" class="swiper">
        <mt-swipe-item v-for="(item,index) in swipeImages" :key="index">
          <img :src="item" alt="">
        </mt-swipe-item>
      </mt-swipe>
      <mt-swipe :auto="0" class="entries">
        <mt-swipe-item v-for="(entry,i) in entries" :key="i">
          <div class="foodentry" v-for="(item,index) in entry" :key="index">
            <div class="img_wrap">
              <img :src="item.image" alt>
            </div>
            <span>{{item.name}}</span>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 推荐商家 -->
    <div class="shoplist-title">推荐商家</div>
    <FilterView :filterData="filterData" @searchFixed="searchFixed" @updata="updata"/>
    <mt-loadmore :top-method="loadData" :bottom-method="loadMore" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false" :bottomPullText="bottomPullText">
      <div class="shoplist">
        <IndexShop v-for="(item,index) in restaurants" :key="index" :restaurant="item.restaurant"/>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
import { Loadmore } from 'mint-ui';
import FilterView from "../components/FilterView.vue";
import IndexShop from "../components/IndexShop";
export default {
  name: 'home',
  components:{
    FilterView,
    IndexShop
  },
  data(){
    return{
      swipeImages:[],
      entries:[],
      filterData:null,
      currentIndex:0,
      isShow:false,
      page: 1,
      size: 5,
      restaurants: [], // 存放所有商家容器
      allLoaded:false,
      bottomPullText:" 上拉加载更多",
      data:null
    }
  },
  computed:{
    address(){
      return this.$store.getters.address
    },
    city(){
       return this.$store.getters.location.addressComponent.city||this.$store.getters.location.addressComponent.province
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      this.$axios.get("/api/profile/shopping")
      .then(res=>{
        // console.log(res.data)
        this.swipeImages=res.data.swipeImgs;
        this.entries=res.data.entries;
      })
      .catch(error=>{
        console.log(error)
      })
      this.$axios.get("/api/profile/filter")
      .then(res=>{
        this.filterData=res.data
        console.log(this.filterData)
      })
      .catch(error=>{
        console.log(error)
      })
      this.loadData();
    },
    loadData() {
      this.page = 1;
      this.allLoaded=false;
      this.bottomPullText="上拉加载更多"
      // 拉取商家信息
      this.$axios
        .post(`/api/profile/restaurants/${this.page}/${this.size}`, this.data)
        .then(res => {
          // console.log(res.data);
          this.$refs.loadmore.onTopLoaded();
          this.restaurants = res.data;
        });
    },
    loadMore(){
      if(!this.allLoaded){
        this.page++;
        this.$axios
        .post(`/api/profile/restaurants/${this.page}/${this.size}`, this.data)
        .then(res => {
          this.$refs.loadmore.onBottomLoaded();
          if(res.data.length>0){
            res.data.forEach(item=>{
              this.restaurants.push(item)
            })
            if(res.data.length<this.size){
              this.allLoaded=true;
              this.bottomPullText="数据加载完毕";
            }
          }else{
            this.allLoaded=true;
            this.bottomPullText="数据加载完毕";
          }
        });
      }
    },
    searchFixed(isShow){
        this.isShow=isShow;
    },
    updata(condition){
      this.data=condition;
      this.loadData();
    }
    
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header,.search_wrap {
  background-color: #009eef;
  padding:10px 16px;
}
.header .address_map {
  color: #fff;
  font-weight: bold;
}
.address_map i {
  margin: 0 3px;
  font-size: 18px;
}
.address_map span {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search_wrap {
  position: sticky;
  z-index: 999;
  top: 0;
  box-sizing: border-box;
}
.search_wrap .shop_search {
  /* margin-top: 10px; */
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}
.swiper {
  height: 100px;
}
.swiper img {
  width: 100%;
  height: 100px;
}

.entries {
  background: #fff;
  height: 47.2vw;
  text-align: center;
  overflow: hidden;
}
.foodentry {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 2.933333vw;
}
.foodentry .img_wrap {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.img_wrap img {
  width: 100%;
  height: 100%;
}
.foodentry span {
  display: block;
  color: #666;
  font-size: 0.32rem;
}
/* 推荐商家 */
.shoplist-title {
  display: flex;
  align-items: flex;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
}
.shoplist-title:after,
.shoplist-title:before {
  display: block;
  content: "一";
  width: 5.333333vw;
  height: 0.266667vw;
  color: #999;
}
.shoplist-title:before {
  margin-right: 3.466667vw;
}
.shoplist-title:after {
  margin-left: 3.466667vw;
}

.fixedview {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 999;
}

.mint-loadmore {
  height: calc(100% - 95px);
  overflow: auto;
}
</style>

