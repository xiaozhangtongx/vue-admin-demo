<template>
  <div class="header">
    <div class="h-top"></div>
    <div class="h-bottom"></div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped lang='less'>
.header {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  > div {
    height: 50%;
    border-top: 1px solid #f6f6f6;
  }
}
</style>