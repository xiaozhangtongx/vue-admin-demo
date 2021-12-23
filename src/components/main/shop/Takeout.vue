<template>
  <div>
    <el-dialog title="提交订单" :visible.sync="dialogVisible" width="24%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
        label-position="right" class="demo-ruleForm" style="width:20vw">
        <el-form-item label="收货地址" prop="address">
          <el-cascader size="large" :options="options" v-model="selectedOptions"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="datailAddress">
          <el-input v-model="ruleForm.datailAddress"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">结算</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Adress from '@/components/main/shop/Adress'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        address: '',
        datailAddress: '',
      },
      rules: {
        address: [{ required: true, message: '请输入收货地址', trigger: 'blur' }],
        datailAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
      },
    }
  },
  methods: {
    // 展示对话框
    showDialog() {
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
  components: {
    Adress,
  },
}
</script>