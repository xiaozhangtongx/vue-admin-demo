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
        font-size: 24px;
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
        margin-right: 10px;
        font-size: 24px;
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