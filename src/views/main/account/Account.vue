<template>
  <div id="shopcart">
    <el-card class="box-card">
      <el-descriptions title="用户信息" border>
        <el-descriptions-item label="账号">{{gestInfo.uid}}</el-descriptions-item>
        <el-descriptions-item label="昵称">{{gestInfo.uname}}</el-descriptions-item>
        <el-descriptions-item label="余额">{{gestInfo.rest}}元</el-descriptions-item>
        <el-descriptions-item label="赊额">{{gestInfo.borrow}}元</el-descriptions-item>
        <el-descriptions-item label="折扣">{{gestInfo.cheap}}</el-descriptions-item>
        <el-descriptions-item label="地址">{{gestInfo.location}}</el-descriptions-item>
      </el-descriptions>
      <el-row type="flex" justify="space-around" style="margin-top:20px">
        <el-button type="primary" @click="editGestInfo">修改信息</el-button>
        <el-button type="success" @click="showRechargesDialog">充值余额</el-button>
        <el-button type="danger" @click="showchangePwd">修改密码</el-button>
        <el-button type="warning" @click="exit">退出系统</el-button>
      </el-row>
    </el-card>
    <!-- 编辑信息 -->
    <EditGestDialog ref="editgest" />
    <!-- 充值余额 -->
    <Recharge ref="recharge" />
    <!-- 修改密码 -->
    <ChangePwd ref="changePwd" />
  </div>
</template>

<script>
import EditGestDialog from '@/views/main/account/components/EditGestDialog'
import Recharge from '@/views/main/account/components/Recharge'
import ChangePwd from '@/views/main/account/components/ChangePwd'
export default {
  name: '',
  data() {
    return {
      gestInfo: {},
    }
  },
  methods: {
    async getGuestInfo() {
      let uid = this.$store.state.user.uid
      const { data: res } = await this.$http.get('getGestInfo?uid=' + uid)
      this.gestInfo = res.obj[0]
      console.log(this.gestInfo)
      // console.log(res)
    },
    // 展示修改信息对话框
    editGestInfo() {
      this.$refs.editgest.showEditserDialog(this.gestInfo)
    },
    // 展示余额充值对话框
    showRechargesDialog() {
      this.$refs.recharge.showRechargesDialog(this.gestInfo)
    },
    // 修改密码对话框
    showchangePwd() {
      this.$refs.changePwd.showchangePwd(this.gestInfo)
    },
    // 退出
    exit() {
      window.sessionStorage.clear()
      this.$store.dispatch('saveUserInfo', null)
      this.$router.replace('/login')
    },
  },
  components: { EditGestDialog, ChangePwd, Recharge },
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