<template>
  <div>
    <!-- 表单区域 -->
    <el-table :data="listOut" stripe style="width: 100%; margin: 20px 0" border fit>
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="LNo" label="订单号" align="center" />
      <el-table-column prop="SmallID" label="细则号" align="center" />
      <el-table-column prop="Location" label="收货地址" align="center" />
      <el-table-column prop="BDate" label="订货日期" align="center" />
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.Lstate==1?'danger':'success'" effect="dark" size="small">
            {{scope.row.Lstate==1?'未审批':'已审批'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center" width="120px">
        <template slot-scope="scope">
          <div class="operation">
            <el-button type="primary" @click="finish(scope.row.LNo)">审批</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="infor.page" :page-size="infor.pageSize" :page-sizes="[1, 2, 3, 10]"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      infor: {
        cno: this.$store.state.user.uid,
        pageSize: 3,
        page: 1,
      },
      listOut: [],
      total: 0,
      shopcart: {
        uid: '',
        gid: '',
        gnum: 0,
      },
    }
  },
  created() {
    this.getlistOut()
  },
  methods: {
    // 获得订单列表
    async getlistOut() {
      const { data: res } = await this.$http.post('getstouts', this.infor)
      console.log(res)
      if (res.code == 200) {
        this.listOut = res.obj.records
        this.total = res.obj.total
        return this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }
    },
    // 监听pageSize改变的事件
    handleSizeChange(newSize) {
      console.log(this.infor.pageSize)
      this.infor.pageSize = newSize
      this.getlistOut() // 数据发生改变重新申请数据
    },

    // 监听page改变的事件
    handleCurrentChange(newPage) {
      this.infor.page = newPage
      this.getlistOut() // 数据发生改变重新申请数据
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async finish(LNo) {
      const { data: res } = await this.$http.get('finishstout?lno=' + LNo)
      if (res.code == 200) {
        this.getlistOut()
        return this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }
    },
  },
}
</script>

<style scoped lang='less'>
.operation {
  display: flex;
  justify-content: space-evenly;
  /deep/.el-button {
    padding: 5px 10px;
  }
}
</style>