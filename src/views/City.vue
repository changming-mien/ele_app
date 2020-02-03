<template>
  <div class="city">
    <div class="search_wrap">
      <div class="search">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="输入城市名" v-model="search_val">
      </div>
      <button @click="$router.push({name:'address',params:{city:city}})">取消</button>
    </div>
    <div style="height:100%" v-if="searchList.length==0">
      <div class="location">
          <Location :address="city" @click="selectCity({name:city})"/>
      </div>
      <Alphabet ref="scrollCity" 
      @selectKey="selectKey" 
      @selectCity="selectCity" 
      :cityInfo="cityInfo" :keys="keys"/>
    </div>
    <div class="search_list" v-else>
      <ul>
        <li v-for="(item,index) in searchList" :key="index"
        @click="selectCity(item)"
        >
            {{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
	import Location from '../components/Location.vue'
	import Alphabet from '../components/Alphabet.vue'
export default {
  name: 'city',
  components:{
      Location,Alphabet
  },
  data(){
  	return{
        search_val:"",
        searchList:[],
        allCities:[],
        cityInfo:{},
        keys:[]
  	}
  },
  computed:{
      city(){
          return this.$store.getters.location.addressComponent.city||this.$store.getters.location.addressComponent.province
      }
  },
  watch:{
        search_val(){
            this.searchPlace()
        }
    },
  created(){
      this.getCityinfo();
  },
  methods:{
      getCityinfo(){
          this.$axios.get('/api/posts/cities')
          .then(res=>{
              this.cityInfo=res.data;
              this.keys=Object.keys(res.data);
              this.keys.pop();
              this.keys.sort();
            //   console.log(this.cityInfo)
              this.$nextTick(()=>{
                this.$refs.scrollCity.initScroll()
              })
              this.keys.forEach(key=>{
                  this.cityInfo[key].forEach(city=>{
                      this.allCities.push(city)
                  })
              })
          })
          .catch(err=>{
              console.log(err)
          })
      },
      selectCity(item){
          this.$router.push({name:"address",params:{city:item.name}})
      },
      selectKey(n){
          const citylist=this.$refs.scrollCity.getElementsByClassName("citylist");
          const el=citylist(n);
          this.scroll.scrollToElement(el)
      },
      searchPlace(){
        //    console.log(this.search_val)
        if(!this.search_val){
            this.searchList=[]
        }else{
            this.searchList=this.allCities.filter(item=>{
               return item.name.indexOf(this.search_val)!=-1;
           })
        } 
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.search_wrap {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 3px 16px;
  display: flex;
  justify-content: space-between;
}
.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 40px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}
.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}
.search_wrap button {
  outline: none;
  color: #009eef;
}

.location {
  background: #fff;
  padding: 8px 16px;
  height: 65px;
  box-sizing: border-box;
}

.search_list {
  background: #fff;
  padding: 5px 16px;
}
.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
