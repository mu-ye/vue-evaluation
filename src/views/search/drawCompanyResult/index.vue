<template>
  <div>
    <a-row>
      <a-col :span="8">
        <a-card size="small" title="抽签结果" style="width: 300px">
          <p v-for="(item, key) in drawResult" :key="key">{{ item.drawResult }}{{ item.name }} </p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        drawResult: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.axios.get('/company/getDrawResult').then(data => {
          console.log(data)
          this.drawResult = data
        })
      }
    }
  }
</script>
