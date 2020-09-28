<template>
  <div>
    <a-row>
      <a-form-model :model="form" >
        <a-col span="12">
          <a-card title="场次、轮次信息" style="width: 480px" size="small">
            <p>当前场次：{{ form.gameNumber }}</p>
            <p>当前轮次：{{ form.gameRound }}</p>
          </a-card>
        </a-col>
        <a-col span="12">
          <a-card title="场次、轮次管理" style="width: 480px" size="small">
            <a-form-model-item label="场次">
              <a-select default-value="0" style="width: 240px" v-model="form.gameNumber">
                <a-select-option value="1" key="1">
                  1
                </a-select-option>
                <a-select-option value="2" key="2">
                  2
                </a-select-option>
                <a-select-option value="3" key="3" >
                  3
                </a-select-option>
                <a-select-option value="4" key="4">
                  4
                </a-select-option>
                <a-select-option value="5" key="5">
                  5
                </a-select-option>
                <a-select-option value="6"  key="6">
                  6
                </a-select-option>
                <a-select-option value="7" key="7">
                  7
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-item label="轮次">
              <a-select default-value="0" style="width: 240px" v-model="form.gameRound">
                <a-select-option value="1">
                  1
                </a-select-option>
                <a-select-option value="2">
                  2
                </a-select-option>
                <a-select-option value="3" >
                  3
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-button type="primary"  @click="handleSubmit">确认提交</a-button>
            </a-form-item>
          </a-card>
        </a-col>
      </a-form-model>
    </a-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          id: 1,
          gameNumber: 0,
          gameRound: 0
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.axios.get('/config/getInfo').then(data => {
          console.log(data)
          this.form.gameNumber = data.gameNumber
          this.form.gameRound = data.gameRound
        })
      },
      handleSubmit () {
         this.axios.post('/config/setInfo', this.form).then(() => {
          this.$message.info('修改成功')
         })
      }
    }
  }
</script>

<style scoped>

</style>
