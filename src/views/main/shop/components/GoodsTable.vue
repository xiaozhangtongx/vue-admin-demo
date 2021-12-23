<template>
  <div>
    <!-- 表单区域 -->
    <el-table :data="goodList" stripe style="width: 100%; margin: 20px 0" border fit>
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="id" label="商品货号" align="center" />
      <el-table-column prop="name" label="商品名称" align="center" />
      <el-table-column label="商品图片" align="center" width="100px">
        <template slot-scope="scope">
          <img :src="`${scope.row.photo}`" alt="" style="width:100%">
        </template>
      </el-table-column>
      <el-table-column label="详情信息" align="center">
        <template slot-scope="scope">
          {{scope.row.info|strSlice(scope.row.info)}}
          <el-button type="text">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="价格" align="center">
        <template slot-scope="scope">
          ￥ {{scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center" width="120px">
        <template slot-scope="scope">
          <div class="operation">
            <el-button type="warning" icon="el-icon-shopping-cart-2" style="font-size:20px"
              @click="editArticle(scope.row)">
            </el-button>
            <el-button type="danger" @click="confirmDelet(scope.row.name)">
              购买
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="infor.page" :page-size="infor.pageSize" :page-sizes="[1, 2, 5, 10]"
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
        name: '',
        username: window.sessionStorage.getItem('nowuser'),
        pageSize: 3,
        page: 1,
      },
      goodList: [
        {
          id: '1314520233',
          name: '华为P50',
          photo:
            'https://res.vmallres.com/pimages//product/6941487233526/428_428_48C1AA99CF46357159197E2E7BC0D755E554B00824FE480Emp.png',
          info: 'aaaaaqweqweqweqweqweqweqweqweqweqwe',
          price: '42342',
        },
      ],
      total: 0,
    }
  },
  methods: {
    // 获得用户文章列表
    async getgoodList() {
      console.log(this.infor)
      const { data: res } = await this.$http.post('getarticles', this.infor)
      console.log(res)
      if (res.code == 200) {
        this.goodList = res.obj.records
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
      this.getgoodList() // 数据发生改变重新申请数据
    },

    // 监听page改变的事件
    handleCurrentChange(newPage) {
      this.infor.page = newPage
      this.getgoodList() // 数据发生改变重新申请数据
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
  },
  filters: {
    strSlice(str) {
      return str.slice(10) + '......'
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