<template>
  <div>
    主裁抽签
    <a-button @click="drawSeat">座位排序抽签</a-button>
    <a-button @click="test">测试</a-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: [{ 'id': 1, 'result': 5 }, { 'id': 2, 'result': 6 }]
      }
    },
    mounted () {
    },
    methods: {
      drawSeat () {
        this.axios.get('/student/drawSeat')
      },
      test () {
        this.axios.post('/api/judge/test', this.form)
      }
    }
  }
</script>
