<template>
  <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange">
  </el-cascader>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  name: '',
  components: {},
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      addtions: {}, //存储地址数据
    }
  },
  methods: {
    handleChange(value) {
      //我们选择地址后，selectedOptions 会保存对应的区域码，例如北京的区域码为'110000'
      //我们要取出区域码对应的汉字，就需要用CodeToText(区域码)进行输出
      this.addtions.selectedOptions = value
      var name = ''
      this.selectedOptions.map((item) => (name += CodeToText[item] + '/'))
      this.addtions.names = name
      console.log(this.addtions.names)
      // console.log(this.addtions)
    },
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  beforeDestrory() {},
  destroyed() {},
}
</script>

<style lang="less">
</style>

