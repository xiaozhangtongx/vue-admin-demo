<template>
  <div class="home">
    <h1>系统首页</h1>
    <h1>欢迎{{user.uid}}</h1>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      user: this.$store.state.user,
    }
  },
  methods: {},
}
</script>

<style scoped lang='less'>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
}
</style>