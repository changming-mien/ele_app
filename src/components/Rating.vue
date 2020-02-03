<template>
    <div class="Rating-gray">
        <i v-for="(item,index) in itemClasses" :key="index" class="fa" :class="item"></i>
    </div>
</template>

<script>
// 星星长度
const LENGTH = 5;
// 星星对应的class
const CLS_ON = "fa-star";
const CLS_HALF = "fa-star-half-empty";
const CLS_OFF = "fa-star-o";
export default {
    props:{
        rating:
        {
            type:Number,
            default:0
        }
    },
    computed:{
        itemClasses(){
            let result=[];
            let score=Math.floor(this.rating*2)/2;
            let half=score%1!=0;
            for(let i=0;i<Math.floor(score);i++){
                result.push(CLS_ON)
            }
            if(half){
                result.push(CLS_HALF)
            }
            while(result.length<LENGTH){
                result.push(CLS_OFF)
            }
            return result;
        }
    }
}
</script>

<style scoped>
.Rating-gray {
  margin-right: 1.066667vw;
  color: #ffbe00;
  display: inline-block;
}
</style>