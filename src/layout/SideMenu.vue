<template>
  <div>
    <el-menu :default-active="editableTabs" class="el-menu-vertical-demo" background-color="#282C34"
      text-color="#fff" :collapse="isCollapse" :router="true" :collapse-transition="false">

      <el-menu-item v-for="item in  menu" :index="item.path" :key="item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { check } from '../utils/auth'
export default {
  name: '',
  watch: {
    '$route.path': function (val) {
      this.selectedKeys = this.selectedKeysMap[val]
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val]
      // console.log(this.selectedKeys, this.openKeys)
    },
  },
  data() {
    this.selectedKeysMap = {}
    this.openKeysMap = {}
    let menuData = this.getMenuData(this.$router.options.routes)
    // console.log(menuData)
    const menu = menuData[0].children
    console.log(menu)
    return {
      menu,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path],
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = []
      // 权限的动态生成
      for (let item of routes) {
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          continue
        }
        // console.log(item)
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys
          this.selectedKeysMap[item.path] = [selectedKey || item.path]
          const newItem = { ...item }
          delete newItem.children
          menuData.push(newItem)
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [...parentKeys, item.path])
          } else {
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            )
          }
        }
      }
      // console.log(menuData)
      return menuData
    },
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse
    },
    editableTabs() {
      return this.$store.state.tableTabs.editableTabsValue
    },
  },
  watch: {
    $route: {
      handler(val) {
        // console.log(val) //新路由信息
        //console.log(oldval) //老路由信息
        const tag = {}
        tag.icon = val.meta.icon
        tag.title = val.meta.title
        tag.router = val.path
        tag.close = true
        tag.name = val.path
        this.$store.commit('addTab', tag)
      },
      // 深度观察监听
      deep: true,
    },
  },
}
</script>

<style scoped lang='less'>
.el-menu {
  border: 0;
}
.el-menu-item.is-active {
  background-color: #1890ff !important;
  color: #fff;
  span {
    color: #fff !important;
  }
}
</style>