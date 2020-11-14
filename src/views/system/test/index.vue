<template>
  <div>
    <a-card title="当前数据库url">
      {{ dataURL }}
    </a-card>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        dataURL: '未获取到正确值'
      }
    },
    mounted () {
      this.axios.get('/ConfigUrl/getConfigUrl').then(data => {
        this.dataURL = data
      })
    }
  }
</script>

<style scoped></style>
