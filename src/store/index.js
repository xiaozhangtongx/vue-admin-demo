import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    tableTabs: {
      editableTabsValue: '/main/home',
      editableTabs: [
        {
          title: '系统首页',
          router: '/main/home',
          name: '/main/home',
          close: false,
          icon: '',
        },
      ],
    },
  },
  mutations: {
    // 是否折叠
    collapse(state) {
      state.isCollapse = !state.isCollapse
    },
    // 添加标签
    addTab(state, data) {
      if (data.title !== '/main/home') {
        const result = state.tableTabs.editableTabs.some(
          (item) => item.title === data.title
        )
        if (result === false) state.tableTabs.editableTabs.push(data)
        // console.log(data.name)
        state.tableTabs.editableTabsValue = data.name
      } else {
        state.tableTabs.editableTabsValue = '/main/home'
      }
    },
    // 删除标签
    removeTab(state, targetName) {
      state.tableTabs.editableTabs = state.tableTabs.editableTabs.filter(
        function (item) {
          return item.title != targetName
        }
      )
      state.tableTabs.editableTabsValue =
        state.tableTabs.editableTabs.slice(-1)[0].name
    },
  },
  actions: {
    addTab: ({ commit }, data) => {
      commit('addTab', data)
    },
    removeTab: ({ commit }, targetName) => {
      commit('removeTab', targetName)
    },
  },
  modules: {},
})
