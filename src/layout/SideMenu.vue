<template>
  <div>
    <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#282C34"
      text-color="#fff">
      <el-submenu index=" 1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-4-1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
        </el-menu-item>
      </el-submenu>

      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>

      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped lang='less'>
.el-menu {
  border: 0;
}
</style>