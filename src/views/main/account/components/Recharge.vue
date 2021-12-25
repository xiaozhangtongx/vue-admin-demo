<template>
  <div>
    <!-- 修改额度对话框 -->
    <el-dialog title="修改个人信息" :visible.sync="RechargeDialogVisible" width="50vh"
      @colse="RechargeDialogClosed">
      <el-form :model="RechargeForm" :rules="RechargeFormRules" ref="RechargeFormRef"
        label-width="26%" width="95%">
        <!-- 额度名 -->
        <el-form-item label="你的账号">
          <el-input v-model="gestInfo.uid" disabled></el-input>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="充值金额" prop="rest">
          <el-input v-model.number="RechargeForm.rest"></el-input>
        </el-form-item>
        <!-- 地址 -->
        <el-form-item label="充值赊额" prop="borrow">
          <el-input v-model.number="RechargeForm.borrow"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="RechargeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="RechargeUserInfo" style="margin-left: 20px">确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 控制修改额度对话框显示/隐藏
      RechargeDialogVisible: false,
      // 修改额度信息
      RechargeForm: {
        rest: 0,
        borrow: 0,
      },
      // 顾客信息
      gestInfo: {},
      // 修改额度表单验证规则
      RechargeFormRules: {
        rest: [{ required: true, message: '请输入充值金额', trigger: 'blur' }],
        borrow: [{ required: true, message: '请输入充值赊额', trigger: 'blur' }],
      },
    }
  },
  methods: {
    // 打开对话框
    showRechargesDialog(gestInfo) {
      this.RechargeDialogVisible = true
      this.gestInfo = Object.assign({}, gestInfo)
    },
    // 关闭窗口
    RechargeDialogClosed() {
      this.$refs.RechargeFormRef.resetFields()
    },
    // 确认修改
    RechargeUserInfo() {
      this.$refs.RechargeFormRef.validate(async (valid) => {
        console.log(valid)
        if (!valid) return
        this.gestInfo.rest += this.RechargeForm.rest
        this.gestInfo.borrow += this.RechargeForm.borrow
        console.log(this.gestInfo)
        // 发起请求
        const { data: res } = await this.$http.put('upGesteInfo', this.gestInfo)
        console.log(res)
        //隐藏
        this.RechargeDialogVisible = false
        console.log(this.$parent)
        this.$parent.getGuestInfo()
      })
    },
  },
}
</script>
