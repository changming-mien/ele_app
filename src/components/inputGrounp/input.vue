<template>
   <div>
      <div class="input_group">
        <input :type="type" :value="value" :placeholder="placeholder" @input="$emit('input',$event.target.value)">
        <button v-if="btnTitle" :type="type" :value="value" :disabled="disabled" @click="$emit('btnClick')">{{btnTitle}}</button>
      </div>
    <div class="invalid-feedback" v-if="error" :class="{'is-invalid':error}">{{error}}</div>
   </div>
</template>

<script>
export default {
    props:{
        type:{
            type:String,
            default:"text"
        },
        value:String,
        placeholder:String,
        disabled:Boolean,
        btnTitle:String,
        error:String
    }
}
</script>

<style scoped>
.input_group {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top:20px;
}
.input_group input {
  height: 100%;
  width: 60%;
  outline: none;
}
.input_group button {
  border: none;
  outline: none;
  background: #fff;
}
.input_group button[disabled] {
  color: #aaa;
}
.is-invalid {
  border: 1px solid red;
}
.invalid-feedback {
  color: red;
  padding-top: 5px;
}
</style>