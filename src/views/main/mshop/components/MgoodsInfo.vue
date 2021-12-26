<template>
  <div>
    <el-dialog title="商品信息" :visible.sync="dialogVisible" width="50%">
      <div class="goodInfo">
        <div class="img"><img :src="`${goodsInfo.Photo}`" alt=""></div>
        <div>
          <el-descriptions>
            <el-descriptions-item label="商品货号">{{goodsInfo.GID}}</el-descriptions-item>
            <el-descriptions-item label="商品名称">{{goodsInfo.Name}}</el-descriptions-item>
            <el-descriptions-item label="生产厂商">{{goodsInfo.Maker}}</el-descriptions-item>
            <el-descriptions-item label="商品种类">
              <el-tag size="small">{{goodsInfo.Kinds}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="货物价格">￥ {{goodsInfo.Price}}</el-descriptions-item>
            <el-descriptions-item label="商品描述">{{goodsInfo.Descri}}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      dialogVisible: false,
      goodsInfo: {},
      photo: '',
    }
  },
  methods: {
    // 展示对话框
    showDialog(goodsInfo) {
      this.dialogVisible = true
      this.goodsInfo = Object.assign({}, goodsInfo)
      // let goodsInfos = []
      // for (var index in goodsInfo) {
      //   if (index == 'Photo') {
      //     this.photo = goodsInfo[index]
      //     continue
      //   } else if (index == 'LowLimit' || index == 'GRest') {
      //     continue
      //   }
      //   goodsInfos.push({ key: index, data: goodsInfo[index] })
      // }
      // this.goodsInfo = goodsInfos
      // console.log(goodsInfos)
    },
  },
}
</script>

<style lang="less" scoped>
.goodInfo {
  display: flex;
  img {
    width: 78px;
    height: 100px;
  }
}
</style>