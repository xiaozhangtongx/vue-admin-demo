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
        <el-form-item label="总共金额">
          <strong style="color:red"> {{total}} 元</strong>
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
      total: 0,
      ruleForm: {
        address: '',
        datailAddress: '',
      },
      gestInfo: {},
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
  created() {
    this.getGuestInfo()
  },
  methods: {
    // 获取顾客信息
    async getGuestInfo() {
      let uid = this.$store.state.user.uid
      const { data: res } = await this.$http.get('getGestInfo?uid=' + uid)
      this.gestInfo = res.obj[0]
      this.ruleForm.datailAddress = this.gestInfo.location
      console.log(this.gestInfo)
    },
    // 展示对话框
    showDialog(smallout, total) {
      console.log(smallout)
      this.dialogVisible = true
      this.total = total
      // this.$set(this.listout.Smallout, null, smallout)
      this.listout.Smallout = Object.assign([], smallout)
    },
    // 确认是否关闭对话框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    // 提交订单
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.listout.Location = this.ruleForm.address + this.ruleForm.datailAddress
          if (this.total > this.gestInfo.rest) {
            this.open()
            return
          } else {
            console.log(this.gestInfo.rest)
            this.gestInfo.rest = this.gestInfo.rest - this.total
            console.log(this.gestInfo)
            this.updateGestInfo()
            this.tackOut()
          }
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    // 赊额
    open() {
      this.$confirm('你的余额不足是否使用赊额?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          if (this.gestInfo.rest + this.gestInfo.borrow < this.total) {
            return this.$message({
              type: 'error',
              message: '你的赊额不足，下单失败',
            })
          } else {
            this.tackOut()
            this.gestInfo.borrow = this.gestInfo.borrow - this.total + this.gestInfo.rest
            this.gestInfo.rest = 0
            this.updateGestInfo()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消支付',
          })
        })
    },
    // 提交订单
    async tackOut() {
      const { data: res } = await this.$http.post('stout', this.listout)
      // console.log(this.listout)
      if (res.code == 200) {
        this.resetForm('ruleForm')
        this.dialogVisible = false
        return this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }
    },
    // 更新顾客余额
    async updateGestInfo() {
      const { data: res } = await this.$http.post('upGesteInfo', this.gestInfo)
      return this.$message.info(res.message)
    },
    // 重置订单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.selectedOptions = null
    },
    // 选择地址
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