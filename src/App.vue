<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  //===========================下面是解决刷新页面丢失vuex数据
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store')))
      )
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
}
</script>


<style lang="less">
#app {
  width: 100vw;
  height: 100vh;
}
#nprogress .bar {
  background: green !important; //自定义颜色
}
#nprogress .spinner {
  display: none !important; // 进度条加载的右边的圆圈让不显示
}
</style>
