<template>
  <div>
    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <a-card size="small">
          <a-row style="margin-top: 18px">
            <a-col :span="3" :offset="3" style="font-size: x-large">
              <b
              ><p>当前比赛场次：{{ configVO.gameNumber }}</p></b
              >
            </a-col>
            <a-col :span="3" :offset="1" style="font-size: x-large">
              <b
              ><p>当前比赛轮次：{{ configVO.gameRound }}</p></b
              >
            </a-col>
            <a-col :span="2" :offset="1">
              <a-button type="primary" class="button" :disabled="nextState" @click="doNext">下一场</a-button>
            </a-col>
            <a-col :span="2" :offset="1">
              <a-button type="primary" class="button" :disabled="drawState">抽题</a-button>
            </a-col>
            <a-col :span="2" :offset="1">
              <a-button type="primary" class="button" :disabled="issueState">下发</a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <br />
    <a-row :gutter="[16, 16]">
      <a-col :span="18">
        <a-card size="small">
          <a-row style="margin-top: 18px">
            <a-col :span="10" :offset="1">
              <a-table
                :columns="studentColumns"
                :data-source="studentData"
                bordered
                :pagination="false"
                rowKey="code"
              ></a-table>
            </a-col>
            <a-col :span="10" :offset="2">
              <a-table
                :columns="judgeColumns"
                :data-source="judgeData"
                bordered
                :pagination="false"
                rowKey="code"
              ></a-table>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card size="small">
          <a-row style="margin-top: 18px">
            <a-col :span="22" :offset="1">
              <a-table
                :columns="questionColumns"
                :data-source="questionData"
                bordered
                :pagination="false"
                rowKey="code"
              ></a-table>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const studentColumns = [
  {
    title: '考生编号',
    className: 'code',
    dataIndex: 'code'
  },
  {
    title: '考生就绪状态',
    className: 'state',
    dataIndex: 'state'
  }
]
const judgeColumns = [
  {
    title: '裁判编号',
    className: 'code',
    dataIndex: 'code'
  },
  {
    title: '裁判就绪状态',
    className: 'state',
    dataIndex: 'state'
  }
]
const questionColumns = [
  {
    title: '题目类型',
    className: 'gameType',
    dataIndex: 'gameType'
  },
  {
    title: '题目名称',
    className: 'name',
    dataIndex: 'name'
  }
]
export default {
  data () {
    return {
      configVO: '',
      nextState: false,
      drawState: true,
      issueState: true,
      studentColumns,
      judgeColumns,
      questionColumns,
      studentData: [],
      judgeData: [],
      questionData: [],
      config: '',
      form: {
        id: 1,
        gameNumber: 0,
        gameRound: 0
      }
    }
  },
  mounted () {
    this.init()
    this.getQuestionData()
    this.getDrawState()
    this.getIssueState()
    this.getNextState()
    this.getConfigVO()
  },
  methods: {
    getConfigVO () {
      this.axios.get('/config/getInfo').then(data => {
        this.configVO = data
      })
    },
    getNextState () {
      this.axios.get('/questionDraw/getList').then(data => {
        this.questionData = data
      })
    },
    getDrawState () {
      this.axios.get('/config/getDrawState').then(data => {
        this.drawState = false
      })
    },
    getIssueState () {
      this.axios.get('/config/getIssueState').then(data => {
        this.issueState = false
      })
    },
    getQuestionData () {
      this.axios.get('/questionDraw/getList').then(data => {
        this.questionData = data
      })
    },
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
    },

    doNext () {
      this.axios.get('/config/nextChange').then(data => {
        this.$message.success('切换场次成功')
        this.getConfigVO()
      })
    }
  }
}
</script>

<style scoped>
.button {
  width: 150px;
  height: 40px;
}
</style>
