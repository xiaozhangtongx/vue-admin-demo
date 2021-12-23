<template>
  <div>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <el-avatar src="https://i.gtimg.cn/club/item/face/img/2/16022_100.gif">
        </el-avatar>
        admin
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">
          <i class="el-icon-s-custom">个人中心</i>
        </el-dropdown-item>
        <el-dropdown-item command="/login"> <i class="el-icon-switch-button">退出登录</i>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  methods: {
    handleCommand(command) {
      if (command == '/login') {
        window.sessionStorage.clear()
        this.$store.dispatch('saveUserInfo', null)
        this.$router.replace(command)
      }
      // this.$message('click on item ' + command)
    },
  },
}
</script>

<style scoped lang='less'>
div {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-dropdown-link {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-icon-arrow-down {
    font-size: 12px;
    display: flex;
  }
}
</style>