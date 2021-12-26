<template>
  <div id="shop">
    <el-card class="box-card">
      <div class="searchlabel">

        <li><strong> <i class="el-icon-search"></i> 筛选搜索</strong></li>
        <li>
          <el-button type="info" @click="resetForm" size="small">重置</el-button>
          <el-button type="primary" @click="getGoodList" size="small">查询</el-button>
        </li>
      </div>
      <el-form :inline="true" :model="formInline" ref="goodsearch" class="demo-form-inline">
        <el-form-item label="商品名称：">
          <el-input v-model="formInline.gname" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品货号：">
          <el-input v-model="formInline.gid" placeholder="请输入商品货号"></el-input>
        </el-form-item>
        <el-form-item label="商品分类：">
          <el-select v-model="formInline.kinds" placeholder="请选择">
            <el-option label="服装" value="服装"></el-option>
            <el-option label="手机数码" value="手机数码"></el-option>
            <el-option label="家用电器" value="家用电器"></el-option>
            <el-option label="家具家装" value="家具家装"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="searchlabel">
        <li><strong> <i class="el-icon-goods"></i> 商品信息</strong></li>
        <el-button type="primary" @click="resetForm" size="small">添加商品</el-button>
      </div>
      <MgoodsTable ref="goodTable" />
    </el-card>
  </div>
</template>

<script>
import MgoodsTable from '@/views/main/mshop/components/MgoodsTable'
export default {
  name: '',
  data() {
    return {
      formInline: {
        gname: '',
        gid: '',
        kinds: '',
      },
    }
  },
  components: {
    MgoodsTable,
  },
  methods: {
    resetForm() {
      this.formInline.gname = ''
      this.formInline.gid = ''
      this.formInline.kinds = ''
    },
    getGoodList() {
      console.log(this.formInline)
      console.log(this.$refs.goodTable)
      this.$refs.goodTable.getGoodLists(this.formInline)
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