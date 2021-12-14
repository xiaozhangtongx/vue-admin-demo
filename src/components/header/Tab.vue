<template>
  <div class="tab1">
    <el-tabs v-model="editableTabsValue" v-for="(item) in editableTabs" :key="item.name"
      @tab-click="changerouter(item)" type="card" @tab-remove="removeTab(item.title)">
      <el-tab-pane :name="item.name" :closable="item.close">
        <span slot="label"><i class="el-icon-date"></i>{{item.title}}</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    editableTabs() {
      return this.$store.state.tableTabs.editableTabs
    },
    editableTabsValue: {
      get() {
        return this.$store.state.tableTabs.editableTabsValue
      },
      set(val) {
        this.$store.state.tableTabs.editableTabsValue = val
      },
    },
  },
  methods: {
    removeTab(targetName) {
      console.log(1)
      this.$store.commit('removeTab', targetName)
    },
    changerouter(item) {
      console.log(item.router)
      this.$router.push(item.router)
    },
  },
}
</script>

<style scoped lang='less' >
.tab1 {
  width: 100%;
  height: 80%;
  display: flex;
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__nav {
  width: 100%;
  border: none;
}
/deep/ .el-tabs__item.is-active {
  background-color: #42b983;
  color: #fff;
  border-color: #42b983;
}
/deep/.el-tabs__header {
  margin: 0;
}
/deep/.el-tabs__item {
  border: 1px solid #d8dce5;
  margin-left: 10px;
}
/deep/.el-tabs--card > .el-tabs__header {
  border: none;
}
</style>