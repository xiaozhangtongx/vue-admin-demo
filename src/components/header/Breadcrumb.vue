<template>
  <div>
    <el-breadcrumb separator="/main">
      <el-breadcrumb-item :to="{ path:`${editableTabs}` }">{{editableTabs}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
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
}
</script>

<style scoped lang='less'>
</style>