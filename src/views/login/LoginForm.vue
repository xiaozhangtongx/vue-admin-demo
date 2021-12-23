<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="uid">
        <el-input placeholder="请输入您的账号" prefix-icon="el-icon-s-custom" v-model="ruleForm.uid"
          autocomplete="off" @keyup.enter.native="focusNext('upward')"></el-input>
      </el-form-item>
      <el-form-item prop="upward">
        <el-input placeholder="请输入您的密码" prefix-icon="el-icon-lock" type="password" show-password
          v-model="ruleForm.upward" autocomplete="off" ref="upward"
          @keyup.enter.native="submitForm('ruleForm')">
        </el-input>
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
        uid: '100001',
        upward: '123456',
      },
      rules: {
        uid: [{ required: true, message: '请输入您的账号', trigger: 'blur' }],
        upward: [
          { required: true, message: '请输入您的密码', trigger: 'blur' },
          { len: 6, message: '请输入长度为6位的密码', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.post('login', this.ruleForm)
          if (res.code == 200) {
            this.$store.dispatch('saveUserInfo', res.obj[0])
            sessionStorage.setItem('store', JSON.stringify(this.$store.state))
            this.$router.push('/main/home')
            console.log(res)
            this.$notify({
              title: '你好呀,' + res.obj[0].uname,
              message: '欢迎登录订货系统',
              type: 'success',
              offset: 100,
            })
          } else {
            return this.$message.error(res.message)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    focusNext(nextRef) {
      this.$refs[nextRef].focus()
    },
  },
}
</script>

<style scoped lang='less'>
</style>