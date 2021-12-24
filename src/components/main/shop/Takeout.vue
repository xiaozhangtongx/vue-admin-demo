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
      listout: {
        SmallID: new Date().getTime(),
        Location: '',
        BDate: new Date(),
        CNo: this.$store.state.user.uid,
        Smallout: [],
      },
      options: regionData,
      selectedOptions: [],
      addtions: {}, //存储地址数据
      rules: {
        address: [{ required: true, message: '请输入收货地址', trigger: 'blur' }],
        datailAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
      },
    }
  },
  methods: {
    // 展示对话框
    showDialog(smallout) {
      console.log(smallout)
      this.dialogVisible = true
      // this.$set(this.listout.Smallout, null, smallout)
      this.listout.Smallout = Object.assign([], smallout)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.listout.Location = this.ruleForm.address + this.ruleForm.datailAddress
          // console.log(this.listout)
          const { data: res } = await this.$http.post('stout', this.listout)
          // console.log(this.listout)
          if (res.code == 200) {
            this.resetForm('ruleForm')
            this.dialogVisible = false
            return this.$message.success(res.message)
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
      this.selectedOptions = null
    },
    handleChange(value) {
      //我们选择地址后，selectedOptions 会保存对应的区域码，例如北京的区域码为'110000'
      //我们要取出区域码对应的汉字，就需要用CodeToText(区域码)进行输出
      this.addtions.selectedOptions = value
      var name = ''
      this.selectedOptions.map((item) => (name += CodeToText[item]))
      this.addtions.names = name
      // console.log(this.addtions.names)
      this.ruleForm.address = this.addtions.names
      // console.log(this.addtions)
    },
  },
  components: {
    Adress,
  },
}
</script>