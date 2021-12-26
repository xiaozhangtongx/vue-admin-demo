<template>
  <div>
    <!-- 修改商品对话框 -->
    <el-dialog title="修改商品信息" :visible.sync="editDialogVisible" width="50vh"
      @colse="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="26%"
        width="95%">
        <!-- 商品货号 -->
        <el-form-item label="商品货号">
          <el-input v-model="editForm.gid" disabled></el-input>
        </el-form-item>
        <!-- 价格 -->
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="editForm.price"></el-input>
        </el-form-item>
        <!-- 商品存量 -->
        <el-form-item label="商品存量" prop="grest">
          <el-input v-model="editForm.grest"></el-input>
        </el-form-item>
        <!-- 最低存量 -->
        <el-form-item label="最低存量" prop="lowlimit">
          <el-input v-model="editForm.lowlimit"></el-input>
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
      // 控制修改商品对话框显示/隐藏
      editDialogVisible: false,
      // 修改商品信息
      editForm: {
        gid: '',
        price: '',
        grest: '',
        lowlimit: '',
      },
      // 修改商品表单验证规则
      editFormRules: {
        price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        grest: [{ required: true, message: '请输入商品存量', trigger: 'blur' }],
        lowlimit: [{ required: true, message: '请输入商品最低存量', trigger: 'blur' }],
      },
    }
  },
  methods: {
    // 打开对话框
    showEditserDialog(goodsInfo) {
      this.editDialogVisible = true
      console.log(goodsInfo)
      this.editForm.gid = goodsInfo.GID
      this.editForm.price = goodsInfo.Price
      this.editForm.grest = goodsInfo.GRest
      this.editForm.lowlimit = goodsInfo.LowLimit
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
        const { data: res } = await this.$http.put('upgoods', this.editForm)
        console.log(res)
        //隐藏
        this.editDialogVisible = false
        console.log(this.$parent)
        this.$parent.getGoodList()
      })
    },
  },
}
</script>
