<template>
  <div>
    <el-container>
      <el-aside :width="isCollapse?'65px':'200px'">
        <div class="logo">
          <img src="../assets/logo.png" alt="" style="width:64px">
          <h1>xx管理系统</h1>
        </div>
        <SideMenu />
      </el-aside>
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
    return {}
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse
    },
  },
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
    background-color: #f6f8f9;
  }
  .el-footer {
    height: 6vh !important;
    border-top: 1px dashed #dcdfe6;
    color: rgba(0, 0, 0, 0.45);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>