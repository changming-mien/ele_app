<template>
<div class="login">
  <h2>登录</h2>
  <Input type="number" 
  v-model="phone" 
  placeholder="手机号" 
  :btnTitle="btnTitle" 
  :error="errors.phone" 
  :disabled="disabled" 
  @btnClick="getVerifyCode"/>
  <Input type="number" v-model="verifyCode" placeholder="验证码"  :error="errors.code" :disabled="disabled"/>
 <!-- 用户服务协议 -->
  <div class="login_des">
    <p>
          新用户登录即自动注册，表示已同意
          <span>《用户服务协议》</span>
        </p>
  </div>
  <!-- 登录按钮 -->
  <div class="login_btn">
    <button :disabled="isClick" @click="handleLogin">登录</button>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Input from "@/components/inputGrounp/input"
export default {
  components:{
      Input
  },
  data(){
    return {
      phone:"",
      verifyCode:"",
      errors:{},
      disabled:false,
      btnTitle:"输入验证码"

    }
  },
  computed:{
    isClick(){
      if(this.phone&&this.verifyCode){
            return false
          }else{
            return true
          }
    }
  },
  methods:{
    handleLogin() {
      // 取消错误提醒
      this.errors = {};
      // 发送请求
      this.$axios
        .post("/api/posts/sms_back", {
          phone: this.phone,
          code: this.verifyCode//879879
        })
        .then(res => {
          // console.log(res.data);
          // 检验成功 设置登录状态并且跳转到/
          localStorage.setItem("ele_login", res.data.user._id);
          this.$router.push("/");
        })
        .catch(err => {
          // 返回错误信息
          this.errors = {
            code: err.response.data.msg
          };
        });
    },
    getVerifyCode(){
      if(this.validataPhone()){
        this.validataBtn()
        // 进行网络请求
        this.$axios.post('/api/posts/sms_send',{
          sid:"4ef2331eb813b87e6f14a75c00442067",
          token:"13a56b537e7cba2fa7a72fbc20f401b1",
          appid:"5839b6834ed04d9a9923179a7bf5b9b1",
          templateid:"526765",
  				phone:this.phone
  			})
  			.then((res)=>{
          console.log(res)
  			})
  			.catch((error)=>{
  				console.log(error)
  			})
        
      }
    },
    validataPhone(){
        if(!this.phone){
          this.errors={
            phone:"手机号码不能为空"
          }
          return false;
        }else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)){
          this.errors={
            phone:"手机号码格式不正确"
          }
          return false
        }else{
          this.errors={}
          return true
        }
    },
    validataBtn(){
      let time=40;
      let timer=setInterval(()=>{
        this.btnTitle=time+"秒后重试";
        this.disabled=true;
        time--;
        if(time==0){
          clearInterval(timer);
          this.btnTitle="重新获取";
          this.disabled=false;
        }
      },1000)
    }
  }
}
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}

.login h2 {
  text-align: center;
  font-size: 30px;
}
.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
}
.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
  cursor: pointer;
}
.login_btn button[disabled] {
  background-color: #8bda81;
}
</style>
