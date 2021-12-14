<template>
  <div class="tab1">
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
      <el-tab-pane v-for="(item) in editableTabs" :key="item.name" :label="item.title"
        :name="item.name">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editableTabsValue: '2',
      editableTabs: [
        {
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content',
        },
        {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content',
        },
      ],
      tabIndex: 2,
    }
  },
  methods: {
    addTab(targetName) {
      let newTabName = ++this.tabIndex + ''
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content',
      })
      this.editableTabsValue = newTabName
    },
    removeTab(targetName) {
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName)
    },
  },
}
</script>

<style scoped lang='less' >
.tab1 {
  width: 100%;
  height: 80%;
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
  margin-left: 5px;
}
</style>