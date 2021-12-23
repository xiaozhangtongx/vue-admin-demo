<template>
  <div>
    <el-breadcrumb separator="/main">
      <el-breadcrumb-item :to="{ path:`${editableTabs}` }" class="item">
        {{editableTabs|breadcrumb}}
      </el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </el-breadcrumb>
  </div>
</template>

<script>
import store from '@/store/index.js'
export default {
  name: '',
  data() {
    return {}
  },
  methods: {},
  computed: {
    editableTabs() {
      // return '/main/home'
      // console.log(this.$store.state.tableTabs.editableTabsValue)
      return this.$store.state.tableTabs.editableTabsValue
    },
  },
  filters: {
    breadcrumb() {
      let routers = store.state.tableTabs.editableTabs
      let nowvalue = store.state.tableTabs.editableTabsValue
      let res = routers.filter((item) => item.router == nowvalue)
      // console.log(res)
      return res[0].title
    },
  },
}
</script>

<style scoped lang='less'>
/deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner,
/deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
/deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
/deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  font-weight: 700;
  color: #414244;
  cursor: pointer;
}
</style>