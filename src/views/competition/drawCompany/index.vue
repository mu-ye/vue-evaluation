<template>
  <div>
    <a-row>
      <a-col :span="8" style="text-align: center">
        <a-card size="big" title="待抽签代表队" style="width: 300px">
          <p v-for="(item, key) in forDrawCompany" :key="key">{{ item }} </p>
        </a-card>
      </a-col>
      <a-col :span="8" style="text-align: center">
        <a-button type="primary" @click="startDraw">开始抽签</a-button>
      </a-col>
      <a-col :span="8" style="text-align: center">
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
        forDrawCompany: [],
        drawResult: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.axios.get('/company/getHaveSighCompany').then(data => {
          console.log(data)
          this.forDrawCompany = data
        })
      },
      startDraw () {
        this.axios.get('/company/drawCompany').then(data => {
          this.drawResult = data
          data.sort((a, b) => { return a.drawResult - b.drawResult })
        })
      }
    }
  }
</script>

<style scoped>

</style>
