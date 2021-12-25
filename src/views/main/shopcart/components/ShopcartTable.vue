<template>
  <div>
    <!-- 表单区域 -->
    <el-table :data="goodList" stripe style="width: 100%; margin: 20px 0" border fit
      @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column prop="gid" label="商品货号" align="center" />
      <el-table-column prop="name" label="商品名称" align="center" />
      <el-table-column prop="maker" label="生产厂商" align="center" />
      <el-table-column label="单价" align="center">
        <template slot-scope="scope">
          ￥ {{scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column label="购买数量" align="center">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.gnum" @change="handleChange(scope.row)" :min="1"
            :max="scope.row.grest" size="small">
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="总价格" align="center">
        <template slot-scope="scope">
          ￥ {{scope.row.price*scope.row.gnum}}
        </template>
      </el-table-column>
    </el-table>
    <li class="money">
      <span><strong>应支付：{{total}} 元</strong></span>
      <el-button type="danger" round size="small" @click="check_out" :disabled="disables">
        下 单
      </el-button>
    </li>
    <Takeout ref="take_out" />
  </div>
</template>

<script>
import Takeout from '@/components/main/shop/Takeout'
export default {
  name: '',
  data() {
    return {
      multipleSelection: [],
      total: 0,
      goodList: [],
    }
  },
  components: {
    Takeout,
  },
  created() {
    this.getGoodList()
  },
  computed: {
    disables() {
      return this.total <= 0
    },
  },
  methods: {
    // 获得商品列表
    async getGoodList() {
      let uid = this.$store.state.user.uid
      console.log(uid)
      const { data: res } = await this.$http.get('getShopCart?uid=' + uid)
      console.log(res)
      if (res.code == 200) {
        this.goodList = res.obj
        return this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }
    },
    // 选择商品
    handleSelectionChange(val) {
      let sum = 0
      this.multipleSelection = val
      val.forEach((item) => {
        sum += item.price * item.gnum
      })
      this.total = sum
      console.log(val)
    },
    // 提交订单
    check_out() {
      console.log(this.multipleSelection)
      this.$refs.take_out.showDialog(this.multipleSelection, this.total)
      this.multipleSelection = []
    },
    // 添加货物的数量
    handleChange(obj) {
      if (obj.grest - obj.gnum <= 0) {
        return this.$message.error('商品储备不足')
      }
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
.money {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;
  span {
    margin-right: 20px;
  }
}
</style>