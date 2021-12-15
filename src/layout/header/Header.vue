<!--
 * @Author: your name
 * @Date: 2021-12-10 22:27:51
 * @LastEditTime: 2021-12-15 18:57:15
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \db\src\layout\header\Header.vue
-->
<template>
  <div class="header">
    <div class="h-top">
      <li>
        <i :class="[isfold?'el-icon-s-unfold':'el-icon-s-fold','icon']" @click="fold"></i>
        <Breadcrumb />
      </li>
      <li class="ht-right">
        <el-badge :value="12" class="item">
          <i class="el-icon-bell"></i>
        </el-badge>
        <i class="el-icon-full-screen icon"></i>
        <i class="el-icon-refresh icon"></i>
        <Dropdown />
      </li>
    </div>
    <div class="h-bottom">
      <Tab />
    </div>
  </div>
</template>

<script>
import Tab from '@/components/header/Tab'
import Breadcrumb from '@/components/header/Breadcrumb'
import Dropdown from '@/components/header/Dropdown'
export default {
  name: '',
  data() {
    return {
      isfold: false,
    }
  },
  methods: {
    // 侧边菜单栏折叠
    fold() {
      this.isfold = !this.isfold
      this.$store.commit('collapse')
    },
  },
  components: {
    Tab,
    Breadcrumb,
    Dropdown,
  },
}
</script>

<style scoped lang='less'>
.header {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  > div {
    height: 50%;
    border-top: 1px solid #f6f6f6;
  }
  .h-top {
    display: flex;
    > li {
      width: 50%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .icon {
        height: 100%;
        width: 50px;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          background-color: #e6e6e6;
        }
      }
    }
    .ht-right {
      justify-content: flex-end;
      .item {
        margin-right: 20px;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
  .h-bottom {
    display: flex;
    align-items: flex-end;
  }
}
</style>