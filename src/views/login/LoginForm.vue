<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="uid">
        <el-input placeholder="请输入您的账号" prefix-icon="el-icon-s-custom" v-model="ruleForm.uid"
          autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="upwd">
        <el-input placeholder="请输入您的密码" prefix-icon="el-icon-lock" type="password" show-password
          v-model="ruleForm.upwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        uid: '',
        upwd: '',
      },
      rules: {
        uid: [{ required: true, message: '请输入您的账号', trigger: 'blur' }],
        upwd: [
          { required: true, message: '请输入您的密码', trigger: 'blur' },
          { len: 6, message: '请输入长度为6位的密码', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push('/main/home')
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
}
</script>

<style scoped lang='less'>
</style>