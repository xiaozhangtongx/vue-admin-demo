<template>
  <div>
    <!-- 表单区域 -->
    <el-table :data="goodList" stripe style="width: 100%; margin: 20px 0" border fit>
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="GID" label="商品货号" align="center" />
      <el-table-column prop="Name" label="商品名称" align="center" />
      <el-table-column prop="GRest" label="商品库存" align="center" />
      <el-table-column prop="LowLimit" label="最低存量" align="center" />
      <el-table-column prop="Name" label="商品名称" align="center" />
      <el-table-column label="详情信息" align="center">
        <template slot-scope="scope">
          {{scope.row.info|strSlice(scope.row.Maker)}}
          <el-button type="text" @click="showGoodsInfo(scope.row)">详情</el-button>
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
            <el-button type="danger" @click="showEditserDialog(scope.row)">
              修改
            </el-button>
            <el-button type="warning" @click="soldOut(scope.row.GID)">
              下架
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
    <!-- 商品详细信息 -->
    <MgoodsInfo ref="goodsInfo" />
    <!-- 修改商品信息 -->
    <EditGoodsDialog ref="editgoods" />
  </div>
</template>

<script>
import MgoodsInfo from '@/views/main/mshop/components/MgoodsInfo'
import EditGoodsDialog from '@/views/main/mshop/components/EditGoodsDialog'
export default {
  name: '',
  data() {
    return {
      infor: {
        gid: '',
        gname: '',
        kinds: '',
        pageSize: 2,
        page: 1,
      },
      goodList: [],
      gestInfo: [],
      total: 0,
      editForm: {
        gid: '',
        gstate: 0,
      },
    }
  },
  created() {
    this.getGoodList()
  },
  components: {
    MgoodsInfo,
    EditGoodsDialog,
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
      // console.log(this.infor)
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
    // 展示详细信息
    showGoodsInfo(obj) {
      this.$refs.goodsInfo.showDialog(obj)
    },
    // 展示修改信息对话框
    showEditserDialog(obj) {
      this.$refs.editgoods.showEditserDialog(obj)
    },
    // 商品下架
    soldOut(gid) {
      this.editForm.gid = gid
      this.$confirm('此操作将下架该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          console.log(this.editForm)
          const { data: res } = await this.$http.post('upgoods', this.editForm)
          console.log(res)
          if (res.code == 200) {
            this.getGoodList()
            return this.$message.success('删除成功!')
          } else {
            return this.$message.error('删除失败!')
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
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