<template>
  <div>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '@/layout/Header'
export default {
  name: '',
  data() {
    return {}
  },
  methods: {},
  components: {
    Header,
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
  }
  .el-main {
    background-color: #f6f8f9;
  }
  .el-footer {
    height: 6vh !important;
    border-top: 1px dashed #dcdfe6;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>