<template>
  <div>
    <!-- 表单区域 -->
    <el-table :data="goodList" stripe style="width: 100%; margin: 20px 0" border fit>
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="GID" label="商品货号" align="center" />
      <el-table-column prop="Name" label="商品名称" align="center" />
      <el-table-column label="商品图片" align="center" width="100px">
        <template slot-scope="scope">
          <img :src="`${scope.row.Photo}`" alt="" style="width:100%">
        </template>
      </el-table-column>
      <el-table-column label="详情信息" align="center">
        <template slot-scope="scope">
          {{scope.row.info|strSlice(scope.row.Maker)}}
          <el-button type="text">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="价格" align="center">
        <template slot-scope="scope">
          ￥ {{scope.row.Price}}
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center" width="120px">
        <template slot-scope="scope">
          <div class="operation">
            <el-button type="warning" icon="el-icon-shopping-cart-2" style="font-size:20px"
              @click="addShopCartNum(scope.row.GID)">
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
        gid: '',
        gname: '',
        kinds: '',
        pageSize: 3,
        page: 1,
      },
      goodList: [],
      total: 0,
      shopcart: {
        uid: this.$store.state.user.uid,
        gid: '',
        gnum: 0,
      },
    }
  },
  created() {
    this.getGoodList()
  },
  methods: {
    // 获得商品列表
    async getGoodList() {
      const { data: res } = await this.$http.post('goods', this.infor)
      console.log(res)
      if (res.code == 200) {
        this.goodList = res.obj.records
        this.total = res.obj.total
        return this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }
    },
    // 获得商品列表
    getGoodLists(formInline) {
      this.infor.gid = formInline.gid
      this.infor.gname = formInline.gname
      this.infor.kinds = formInline.kinds
      console.log(this.infor)
      this.getGoodList()
    },
    // 监听pageSize改变的事件
    handleSizeChange(newSize) {
      console.log(this.infor.pageSize)
      this.infor.pageSize = newSize
      this.getGoodList() // 数据发生改变重新申请数据
    },

    // 监听page改变的事件
    handleCurrentChange(newPage) {
      this.infor.page = newPage
      this.getGoodList() // 数据发生改变重新申请数据
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 添加购物车
    async addShopCart() {
      const { data: res } = await this.$http.post('addsCart', this.shopcart)
      if (res.code == 200) {
        return this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }
    },
    addShopCartNum(gid) {
      this.$prompt('请输入加入购物车的件数', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(async ({ value }) => {
          this.shopcart.gnum = value
          this.shopcart.gid = gid
          this.addShopCart()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入',
          })
        })
    },
  },
  filters: {
    strSlice(str) {
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