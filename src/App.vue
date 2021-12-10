<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  width: 100vw;
  height: 100vh;
}
#nprogress .bar {
  background: #b21fc5 !important; //自定义颜色
}
#nprogress .spinner {
  display: none !important; // 进度条加载的右边的圆圈让不显示
}
</style>
