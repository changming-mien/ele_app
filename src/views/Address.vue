<template>
  <div class="address-page">
      <Header title="选择收货地址" :isLeft="true"/>
      <div class="city_search">
    	<div class="search">
    		<span class="city" @click="$router.push('/city')">
    			{{city}}
    			<i class="fa fa-angle-down"></i>
    		</span>
    		<i class="fa fa-search"></i>
    		<input type="text" name="" v-model="search_val" placeholder="小区/学校/写字楼">
    	</div>
    </div>
    <Location :address="address" @click="selectAddress"/>
    <div class="area">
      <ul class="area_list" v-for="(item,index) in areaList" :key="index">
        <li @click="selectAddress(item)">
          <h4>{{item.name}}</h4>
          <p>{{item.district}}{{item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue"
import Location from "../components/Location.vue"
export default {
    components:{
        Header,
        Location
    },
    data(){
        return{
            city:this.$route.params.city,
            search_val:"",
            areaList:[]
        }
    },
    computed:{
        address(){
            return this.$store.getters.location.formattedAddress
        }
    },
    watch:{
        search_val(){
            this.searchPlace()
        }
    },
    methods:{
        searchPlace(){
            let self=this;
            AMap.plugin('AMap.Autocomplete', function(){
                // 实例化Autocomplete
                var autoOptions = {
                    //city 限定城市，默认全国
                    city: self.city
                }
                var autoComplete= new AMap.Autocomplete(autoOptions);
                autoComplete.search(self.search_val, function(status, result) {
                    // 搜索成功时，result即是对应的匹配数据
                    self.areaList=result.tips;
                })
            })
            console.log(self.areaList)
        },
        selectAddress(item){
            if(item){
                this.$store.dispatch("setAddress",item.district+item.address)
            }else{
                this.$store.dispatch("setAddress",this.address)
            }
            this.$router.push('/home');
            
        }
    }
}
</script>

<style scoped>
.address-page {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}

.city_search {
  background-color: #fff;
  padding: 10px 20px;
  color: #333;
}

.search {
  background-color: #eee;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 40px;
}
.search .city {
  padding: 0 10px;
}
.city i {
  margin-right: 10px;
}
.search input {
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
}

.area {
  margin-top: 16px;
  background: #fff;
}
.area li {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
  list-style: none;
}
.area li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

</style>