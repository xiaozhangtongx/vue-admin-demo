<template>
  <div id="shop">
    <el-card class="box-card">
      <div class="searchlabel">
        <li><strong> <i class="el-icon-search"></i> 筛选搜索</strong></li>
        <li>
          <el-button type="info" @click="onSubmit" size="small">重置</el-button>
          <el-button type="primary" @click="onSubmit" size="small">查询</el-button>

        </li>
      </div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商品名称：">
          <el-input v-model="formInline.user" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品货号：">
          <el-input v-model="formInline.user" placeholder="请输入商品货号"></el-input>
        </el-form-item>
        <el-form-item label="商品分类：">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="服装" value="shanghai"></el-option>
            <el-option label="手机数码" value="beijing"></el-option>
            <el-option label="家用电器" value="beijing"></el-option>
            <el-option label="家具家装" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="searchlabel">
        <li><strong> <i class="el-icon-goods"></i> 商品信息</strong></li>
      </div>
      <GoodsTable />
    </el-card>
  </div>
</template>

<script>
import GoodsTable from '@/views/main/shop/components/GoodsTable'
export default {
  name: '',
  data() {
    return {
      formInline: {
        user: '',
        region: '',
      },
    }
  },
  components: {
    GoodsTable,
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
  },
}
</script>

<style scoped lang='less'>
#shop {
  width: 100%;
  height: 100%;
  .box-card {
    .searchlabel {
      display: flex;
      justify-content: space-between;
    }
  }
}
/deep/.el-input__inner {
  height: 32px;
  line-height: 32px;
}
.el-form--inline .el-form-item {
  margin-right: 40px;
}
</style>