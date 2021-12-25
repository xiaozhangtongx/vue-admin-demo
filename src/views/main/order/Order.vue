<template>
  <div id="shopcart">
    <el-card class="box-card">
      <el-descriptions title="用户信息">
        <el-descriptions-item label="账号">{{gestInfo.uid}}</el-descriptions-item>
        <el-descriptions-item label="余额">{{gestInfo.rest}}元</el-descriptions-item>
        <el-descriptions-item label="赊额">{{gestInfo.borrow}}元</el-descriptions-item>
        <el-descriptions-item label="折扣">{{gestInfo.cheap}}</el-descriptions-item>
        <el-descriptions-item label="地址">{{gestInfo.location}}</el-descriptions-item>
      </el-descriptions>
      <li style="margin-top:20px"><strong> <i class="el-icon-tickets"></i> 订单</strong></li>
      <OrdaerTable />
    </el-card>
  </div>
</template>

<script>
import OrdaerTable from '@/views/main/order/components/OrdaerTable'
export default {
  name: '',
  data() {
    return {
      gestInfo: {},
    }
  },
  components: {
    OrdaerTable,
  },
  methods: {
    async getGuestInfo() {
      let uid = this.$store.state.user.uid
      const { data: res } = await this.$http.get('getGestInfo?uid=' + uid)
      this.gestInfo = res.obj[0]
      console.log(this.gestInfo)
      // console.log(res)
    },
  },
  created() {
    this.getGuestInfo()
  },
}
</script>

<style scoped lang='less'>
#shopcart {
  width: 100%;
  height: 100%;
}
</style>