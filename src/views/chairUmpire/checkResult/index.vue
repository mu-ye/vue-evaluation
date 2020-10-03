<template>
  <div>
    <a-row>
      <a-col span="24">
        <a-card title="场次、轮次管理" style="width: 100%" size="small">
          <a-row>
            <a-col span="8">          <a-form-model-item label="场次">
              <a-select default-value="0" style="width: 240px" v-model="form.gameNumber">
                <a-select-option value="1" key="1">
                  1
                </a-select-option>
                <a-select-option value="2" key="2">
                  2
                </a-select-option>
                <a-select-option value="3" key="3">
                  3
                </a-select-option>
                <a-select-option value="4" key="4">
                  4
                </a-select-option>
                <a-select-option value="5" key="5">
                  5
                </a-select-option>
                <a-select-option value="6" key="6">
                  6
                </a-select-option>
                <a-select-option value="7" key="7">
                  7
                </a-select-option>
              </a-select>
            </a-form-model-item></a-col>
            <a-col span="8">
              <a-form-item label="轮次">
                <a-select default-value="0" style="width: 240px" v-model="form.gameRound">
                  <a-select-option value="1">
                    1
                  </a-select-option>
                  <a-select-option value="2">
                    2
                  </a-select-option>
                  <a-select-option value="3">
                    3
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="24">
              <a-form-item>
                <a-button type="primary" @click="checkResult">确认提交</a-button>
              </a-form-item>
            </a-col>
          </a-row>

        </a-card>
      </a-col>
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
    methods: {
      checkResult () {
        console.log()
      }
    }
  }
</script>

<style scoped>

</style>
