<template>
  <div id="shopcart">
    <el-card class="box-card">
      <li><strong> <i class="el-icon-shopping-cart-2"></i> 购物车</strong></li>
      <ShopcartTable />
    </el-card>
  </div>
</template>

<script>
import ShopcartTable from '@/views/main/shopcart/components/ShopcartTable'
export default {
  name: '',
  data() {
    return {
      formInline: {
        gname: '',
        gid: '',
        kinds: '',
      },
    }
  },
  components: {
    ShopcartTable,
  },
  methods: {},
}
</script>

<style scoped lang='less'>
#shopcart {
  width: 100%;
  height: 100%;
}
</style>