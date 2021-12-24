<template>
  <div>
    <!-- 表单区域 -->
    <el-table :data="listOut" stripe style="width: 100%; margin: 20px 0" border fit>
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="smallid" label="细则号" align="center" />
      <el-table-column prop="gid" label="商品货号" align="center" />
      <el-table-column prop="name" label="商品名称" align="center" />
      <el-table-column prop="maker" label="生产厂商" align="center" />
      <el-table-column prop="gnum" label="订货数量" align="center" />
      <el-table-column label="单价" align="center">
        <template slot-scope="scope">
          ￥ {{scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column label="总额" align="center">
        <template slot-scope="scope">
          ￥ {{scope.row.money}}
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      infor: {
        uid: this.$store.state.user.uid,
        smallid: '1640348356223',
      },
      listOut: [],
    }
  },
  created() {
    this.getlistSmall()
  },
  methods: {
    // 获得订单列表
    async getlistSmall() {
      const { data: res } = await this.$http.post('getSmallout', this.infor)
      console.log(res)
      if (res.code == 200) {
        this.listOut = res.obj
        return this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }
    },
  },
  filters: {
    strSlice(state) {
      // return str.slice(2) + '......'
      return '.....'
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