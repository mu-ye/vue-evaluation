<template>
  <div>
    主裁抽签
    <a-button @click="drawSeat">座位排序抽签</a-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    mounted () {
    },
    methods: {
      drawSeat () {
        this.axios.get('/student/drawSeat')
      }
    }
  }
</script>
