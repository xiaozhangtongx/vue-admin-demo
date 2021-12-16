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
  color: #1890ff !important;
  background: #e8f4ff !important;
}
/deep/.el-tabs__header {
  margin: 0;
}
/deep/.el-tabs--card > .el-tabs__header {
  border: none;
}
/deep/.el-tabs__header .el-tabs__item.is-active,
/deep/.el-tabs__header .el-tabs__item.is-active:hover,
/deep/.el-tabs__header .el-tabs__item:hover {
  // padding: 0 30px 0 30px;
  -webkit-mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
  mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}
/deep/ .el-tabs__header .el-tabs__item {
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
}
/deep/.el-tabs__header .el-tabs__item:hover {
  color: #515a6e;
  background: #dee1e6;
}
</style>