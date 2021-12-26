<template>
  <div id="shopcart">
    <el-card class="box-card">
      <div class="searchlabel">
        <li><strong>订单详细信息</strong></li>
        <li>
          <el-button type="primary" @click="goBack" size="small">返回</el-button>
          <el-button type="danger" @click="deletOrder" size="small">删除订单</el-button>
        </li>
      </div>
      <el-descriptions>
        <el-descriptions-item label="订单号">{{listInfo.LNo}}</el-descriptions-item>
        <el-descriptions-item label="订货日期">{{listInfo.BDate}}</el-descriptions-item>
        <el-descriptions-item label="订单状态">
          <el-tag :type="listInfo.Lstate==1?'danger':'success'" size="small">
            {{listInfo.Lstate==1?'未发货':'已发货'}}</el-tag>
        </el-descriptions-item>
        <!-- <el-descriptions-item label="折扣">{{gestInfo.cheap}}</el-descriptions-item> -->
        <el-descriptions-item label="收货地址">{{listInfo.Location}}</el-descriptions-item>
      </el-descriptions>
      <li><strong> <i class="el-icon-tickets"></i> 订单细则</strong></li>
      <!-- 表单区域 -->
      <el-table :data="listOut" stripe style="width: 100%; margin: 20px 0" border fit>
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="smallid" label="细则号" align="center" />
        <el-table-column prop="gid" label="商品货号" align="center" />
        <el-table-column prop="name" label="商品名称" align="center" />
        <el-table-column prop="maker" label="生产厂商" align="center" />
        <el-table-column prop="gnum" label="订货数量" align="center" />
        <el-table-column label="原价/件" align="center">
          <template slot-scope="scope">
            ￥ {{scope.row.price}}
          </template>
        </el-table-column>
        <el-table-column label="总额" align="center">
          <template slot-scope="scope">
            ￥ {{scope.row.money}}
          </template>
        </el-table-column>
        <el-table-column label="折扣后" align="center">
          <template slot-scope="scope">
            ￥ {{scope.row.money*gestInfo.cheap}}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      listInfo: {},
      gestInfo: {},
      infor: {
        uid: this.$store.state.user.uid,
        smallid: '',
      },
      listOut: [],
    }
  },
  methods: {
    async getGuestInfo() {
      this.listInfo = JSON.parse(this.$route.query.val)
      this.infor.smallid = this.listInfo.SmallID
      let uid = this.$store.state.user.uid
      const { data: res } = await this.$http.get('getGestInfo?uid=' + uid)
      this.gestInfo = res.obj[0]
      // console.log(res)
    },
    // 获得订单列表
    async getlistSmall() {
      console.log(this.infor)
      const { data: res } = await this.$http.post('getSmallout', this.infor)
      if (res.code == 200) {
        this.listOut = res.obj
        return this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }
    },
    // 返回订单页面
    goBack() {
      this.$router.go(-1)
    },
    // 删除订单
    async deletOrder() {
      console.log(this.infor.smallid)
      const { data: res } = await this.$http.get('deletestout?smallid=' + this.infor.smallid)
      this.$router.push('/main/orders')
      if (res.code == 200) {
        return this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }
    },
  },
  created() {
    this.getGuestInfo()
  },
  beforeMount() {
    this.getlistSmall()
  },
}
</script>

<style scoped lang='less'>
#shopcart {
  width: 100%;
  height: 100%;
  .searchlabel {
    display: flex;
    justify-content: space-between;
  }
}
</style>