<template>
  <div>
    <el-card v-for="item in goodList" :key="item.gid">
      <el-descriptions title="商品信息">
        <el-descriptions-item label="商品货号">{{item.gid}}</el-descriptions-item>
        <el-descriptions-item label="商品名称">{{item.name}}</el-descriptions-item>
        <el-descriptions-item label="商品类别">
          <el-tag size="small">{{item.kinds}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="商品余量">{{item.grest}}</el-descriptions-item>
        <el-descriptions-item label="商品最低存量提醒" style="color:red">{{item.lowlimit}}
        </el-descriptions-item>
        <el-descriptions-item label="生产厂商">{{item.maker}}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>
<script>
import MgoodsInfo from '@/views/main/mshop/components/MgoodsInfo'
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
    }
  },
  created() {
    this.getGoodList()
  },
  components: {
    MgoodsInfo,
  },
  methods: {
    // 获得商品列表
    async getGoodList() {
      const { data: res } = await this.$http.get('getwarngoods')
      console.log(res)
      if (res.code == 200) {
        this.goodList = res.obj
        return this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }
    },
  },
}
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 20px;
}
</style>