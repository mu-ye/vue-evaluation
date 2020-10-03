<template>
  <div>
    <a-row>
      <a-col span="24">
        <a-alert
          message="提示信息！"
          description="当出现警告图标时，表示对于统一考生的打分，分差大于10，请核查"
          type="warning"
          show-icon
        />
      </a-col>
    </a-row>
    <a-row>
      <a-col span="24">
        <a-card title="成绩核验" style="width: 100%" size="small">
          <a-row>
            <a-col span="8">
              场次:<a-select default-value="0" style="width: 240px" v-model="gameNumber">
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
            </a-col>
            <a-col span="8">
              轮次: <a-select default-value="0" style="width: 240px" v-model="gameRound">
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
            </a-col>
            <a-col span="8">
              <a-button type="primary" @click="checkResult">确认提交</a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-row>
      <a-col span="24">
        <a-table
          :columns="columns"
          :data-source="tempResult"
          bordered
          :pagination="false"
          rowKey="id"
          size="small">
          <span slot="action" slot-scope="text,record">
            <div v-if="record.flag === 1"><a-icon type="warning" style="color: red"/></div>
          </span>
        </a-table>
      </a-col>

    </a-row>
  </div>
</template>

<script>
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '学生编号',
      dataIndex: 'studentCode',
      key: 'studentCode'
    },
    {
      title: '学生姓名',
      dataIndex: 'studentName',
      key: 'studentName'
    },
    {
      title: '裁判Id',
      dataIndex: 'judgeId',
      key: 'judgeId'
    },
    {
      title: '裁判姓名',
      dataIndex: 'judgeName',
      key: 'judgeName'
    },
    {
      title: '得分',
      dataIndex: 'result',
      key: 'result'
    },
    {
      title: '异常',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      align: 'center'
    }
  ]

  export default {
    data () {
      return {
        columns,
        gameNumber: 0,
        gameRound: 0,
        tempResult: []
      }
    },
    methods: {
      checkResult () {
        this.axios.get('/test-result/getTempResult?gameNumber=' + this.gameNumber + '&gameRound=' + this.gameRound).then(data => {
          console.log(data)
          this.tempResult = data
        })
      }
    }
  }
</script>

<style scoped>

</style>
