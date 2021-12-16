<template>
  <div>
    <el-container class="main">

      <!-- <div v-if="drawer"> -->
      <!-- <el-drawer title="我是标题" :visible="drawer" :with-header="false" direction="ltr" size='200px'
        wrapperClosable=true id="menuDrawer">
        <div class="logo">
          <img src="../assets/logo.png" alt="" style="width:64px">
          <h1>xx管理系统</h1>
        </div>
        <SideMenu />
      </el-drawer> -->
      <!-- </div> -->

      <!-- <div v-else> -->
      <el-aside :width="isCollapse?'65px':'200px'" v-if="!drawer">
        <div class="logo">
          <img src="../assets/logo.png" alt="" style="width:64px">
          <h1>xx管理系统</h1>
        </div>
        <SideMenu />
      </el-aside>
      <!-- </div> -->

      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>Main</el-main>
        <el-footer>xxxx ©2021 Created by xiaozhangtx</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '@/layout/header/Header'
import SideMenu from '@/layout/SideMenu'
export default {
  name: '',
  data() {
    return {
      size: '400px',
      drawer1: this.drawer,
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse
    },
    drawer: {
      get() {
        return this.$store.state.isMobile
      },
      set(val) {
        return (this.$store.state.isMobile = val)
      },
    },
  },
  // created() {
  //   // 这里用了 箭头函数 其实可以不用 that 了，但是由于写 Es5 的习惯我就没改
  //   // 核心方法，主要 根据窗口的变化 来控制布局
  //   window.onresize = () => {
  //     window.screenWidth = document.body.clientWidth
  //     // 第二步
  //     screenWidth = window.screenWidth
  //     if (screenWidth < 800) this.drawer = true
  //     console.log(screenWidth)
  //   }
  //   window.onresize()
  // },
  methods: {},
  components: {
    Header,
    SideMenu,
  },
}
</script>

<style scoped lang='less'>
.el-container {
  width: 100vw;
  height: 100vh;
  // overflow: hidden;
  .el-header {
    height: 14vh !important;
    z-index: 888;
    box-shadow: 0 1px 4px rgb(231, 231, 231);
  }
  .el-aside {
    background-color: #282c34;
    z-index: 999;
    box-shadow: 2px 0 6px rgb(150, 150, 150);
    .logo {
      height: 14vh;
      display: flex;
      align-items: center;
      // justify-content: space-evenly;
      overflow: hidden;
      h1 {
        font-size: 24px;
        color: #fff;
        font-family: 'Arial', 'Microsoft YaHei', '黑体', '宋体', sans-serif;
      }
    }
  }
  .el-main {
    background-color: #eff1f4;
  }
  .el-footer {
    height: 6vh !important;
    border-top: 1px dashed #dcdfe6;
    color: rgba(0, 0, 0, 0.45);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1vw;
  }
}
#menuDrawer {
  // width: 200px;
  z-index: 1000;
  // position: relative;
  // height: 100%;
  // width: 100%;
  /deep/.el-drawer__body {
    height: 100%;
    background: #282c34;
  }
  /deep/.el-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
    margin-right: -18px !important;
  }
}
</style>