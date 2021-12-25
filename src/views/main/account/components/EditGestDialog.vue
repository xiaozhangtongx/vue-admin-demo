<template>
  <div>
    <!-- 修改账号对话框 -->
    <el-dialog title="修改个人信息" :visible.sync="editDialogVisible" width="50vh"
      @colse="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="26%"
        width="95%">
        <!-- 账号名 -->
        <el-form-item label="账号">
          <el-input v-model="editForm.uid" disabled></el-input>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称" prop="uname">
          <el-input v-model="editForm.uname"></el-input>
        </el-form-item>
        <!-- 地址 -->
        <el-form-item label="地址" prop="location">
          <el-input v-model="editForm.location"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo" style="margin-left: 20px">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 控制修改账号对话框显示/隐藏
      editDialogVisible: false,
      // 修改账号信息
      editForm: {},
      // 修改账号表单验证规则
      editFormRules: {
        uname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        location: [{ required: true, message: '请输入地址', trigger: 'blur' }],
      },
    }
  },
  methods: {
    // 打开对话框
    showEditserDialog(gestInfo) {
      this.editDialogVisible = true
      this.editForm = Object.assign({}, gestInfo)
    },
    // 关闭窗口
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 确认修改
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        console.log(valid)
        if (!valid) return
        console.log(this.editForm)
        // 发起请求
        const { data: res } = await this.$http.put('upGesteInfo', this.editForm)
        console.log(res)
        //隐藏
        this.editDialogVisible = false
        console.log(this.$parent)
        this.$parent.getGuestInfo()
      })
    },
  },
}
</script>
