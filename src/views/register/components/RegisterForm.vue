<template>
  <div>
    <!-- 内容主体区域 -->
    <el-form :model="newPwdForm" :rules="newPwdFormRules" ref="newPwdFormRef" style="width:96%">
      <!-- 账号 -->
      <el-form-item prop="uid">
        <el-input placeholder="请输入您的账号" prefix-icon="el-icon-s-custom" v-model="newPwdForm.uid"
          autocomplete="off" @keyup.enter.native="focusNext('upward')"></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="upward">
        <el-input show-password type="password" prefix-icon="el-icon-lock"
          v-model="newPwdForm.upward" placeholder="请输入你的密码">
        </el-input>
      </el-form-item>

      <!-- 确认密码 -->
      <el-form-item prop="checkPass">
        <el-input show-password type="password" prefix-icon="el-icon-lock"
          v-model="newPwdForm.checkPass" placeholder="请确认你的密码">
        </el-input>
      </el-form-item>

    </el-form>
    <!-- 内容底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="changePwdDialogVisible = false" type="primary">注 &nbsp;&nbsp;&nbsp; 册
      </el-button>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      // console.log(this.checkPass)
      console.log(value.length)
      if (value === '' || value.length != 6) {
        callback(new Error('请输入6位密码'))
      } else {
        if (this.checkPass != '') {
          this.$refs.newPwdFormRef.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      // console.log(value)
      if (value == '') {
        callback(new Error('请再次输入密码'))
      } else if (value != this.newPwdForm.upward) {
        console.log(value)
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 对话框显示
      changePwdDialogVisible: false,
      // 修改密码表单项
      newPwdForm: {
        uid: '',
        upward: '',
        checkPass: '',
      },
      // 验证规则
      newPwdFormRules: {
        upward: [{ validator: validatePass, trigger: 'blur', required: true }],
        checkPass: [{ validator: validatePass2, trigger: 'blur', required: true }],
      },
      // 原来的密码
      oldpwd: '',
    }
  },
  methods: {
    // 注册
    changePwd() {
      this.$refs.newPwdFormRef.validate(async (valid) => {
        console.log(this.newPwdForm)
        if (!valid) return
        // 发起请求
        const { data: res } = await this.$http.post('register', this.newPwdForm)
        if (res.code == 200) {
          this.$refs.newPwdFormRef.resetFields() // 重置表单项
          this.$router.replace('/login')
        } else {
          this.$refs.newPwdFormRef.resetFields() // 重置表单项
          return this.$message.error(res.message)
        }
      })
    },
  },
}
</script>

<style scoped lang='less'>
.el-button {
  width: 96%;
}
</style>