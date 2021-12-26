<template>
  <div id="shopcart">
    <el-card class="box-card">
      <MordaerTable />
    </el-card>
  </div>
</template>

<script>
import MordaerTable from '@/views/main/morder/components/MordaerTable'
export default {
  name: '',
  data() {
    return {
      gestInfo: {},
    }
  },
  components: {
    MordaerTable,
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