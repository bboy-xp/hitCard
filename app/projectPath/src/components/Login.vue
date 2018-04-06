<template>
  <div>
      <button v-on:click="login">一键登录</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {
      login() {
          location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx21174deccc6b6c4b&redirect_uri=http%3a%2f%2fsxp.topsxp.top%3a7001%2fgetCode%2&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      }
  }
}
</script>
