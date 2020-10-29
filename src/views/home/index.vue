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
              <a-button type="primary" class="button" :disabled="drawState" @click="doDraw">抽题</a-button>
            </a-col>
            <a-col :span="2" :offset="1">
              <a-button type="primary" class="button" :disabled="issueState" @click="doIssue">下发</a-button>
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
              <a-table :columns="studentColumns" :data-source="studentData" bordered :pagination="false" rowKey="code">
                <span slot="studentAction" slot-scope="text, record">
                  <div v-if="record.state === 0" class="colorError">未就绪</div>
                  <div v-if="record.state === 1" class="success">已就绪</div>
                  <div v-if="record.state === 2" class="link">考试中</div>
                  <div v-if="record.state === 3" class="warning">考试中断</div>
                  <div v-if="record.state === 4">比赛结束</div>
                </span>
              </a-table>
            </a-col>
            <a-col :span="10" :offset="2">
              <a-table :columns="judgeColumns" :data-source="judgeData" bordered :pagination="false" rowKey="code">
                <span slot="judgeAction" slot-scope="text, record">
                  <div v-if="record.state === 0" style="color: red;">未就绪</div>
                  <div v-if="record.state === 1" style="color: green">已就绪</div>
                </span>
              </a-table>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="6" v-if="judgeResultShow">
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
    title: '考生姓名',
    className: 'name',
    dataIndex: 'name'
  },
  {
    title: '考生就绪状态',
    className: 'state',
    scopedSlots: { customRender: 'studentAction' }
  }
]
const judgeColumns = [
  {
    title: '裁判名字',
    className: 'name',
    dataIndex: 'name'
  },
  {
    title: '裁判就绪状态',
    className: 'state',
    scopedSlots: { customRender: 'judgeAction' }
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
      nextState: true,
      drawState: true,
      issueState: true,
      judgeResultShow: false,
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
    this.getConfigVO()
    this.stateTimer = setInterval(this.getState, 1000)
    this.studentTimer = setInterval(this.getStudentData, 1000)
    this.judgeTimer = setInterval(this.getJudgeData, 1000)
    this.questionTimer = setInterval(this.getQuestionData, 1000)
  },
  methods: {
    getConfigVO () {
      this.axios.get('/config/getInfo').then(data => {
        this.configVO = data
      })
    },
    getState () {
      this.axios.get('/config/getState').then(data => {
        switch (data) {
          case 0:
            this.nextState = true
            this.drawState = true
            this.issueState = true
            this.judgeResultShow = false
            break
          case 1:
            this.nextState = true
            this.drawState = false
            this.issueState = true
            this.judgeResultShow = false
            break
          case 2:
            this.nextState = true
            this.drawState = true
            this.issueState = false
            this.judgeResultShow = true
            break
          case 3:
            this.nextState = true
            this.drawState = true
            this.issueState = true
            this.judgeResultShow = true
            break
          case 4:
            this.nextState = false
            this.drawState = true
            this.issueState = true
            this.judgeResultShow = true
            break
        }
      })
    },
    getQuestionData () {
      this.axios.get('/questionDraw/getList').then(data => {
        this.questionData = data
      })
    },
    getStudentData () {
      this.axios.get('/seatDraw/getStudentReadyShowVO').then(data => {
        this.studentData = data
        if (data === null) {
          clearInterval(this.studentTimer)
          clearInterval(this.judgeTimer)
          clearInterval(this.stateTimer)
          clearInterval(this.questionTimer)
        }
      })
    },
    getJudgeData () {
      this.axios.get('/judgeDrawResult/getJudgeReadyList').then(data => {
        this.judgeData = data
      })
    },
    handleSubmit () {
      this.axios.post('/config/setInfo', this.form).then(() => {
        this.$message.info('修改成功')
      })
    },

    doNext () {
      this.axios.get('/config/doNext').then(data => {
        this.$message.success('切换场次成功')
        this.getConfigVO()
      })
    },
    doDraw () {
      this.axios.get('/questionDraw/doDraw').then(data => {
        this.$message.success('抽题成功')
      })
    },
    doIssue () {
      this.axios.get('/config/doIssue').then(data => {
        this.$message.success('下发试卷试卷成功')
        this.issueState = true
      })
    }
  },
  destroyed () {
    // 页面销毁时结束轮询
    clearInterval(this.studentTimer)
    clearInterval(this.judgeTimer)
    clearInterval(this.stateTimer)
    clearInterval(this.questionTimer)
  }
}
</script>

<style scoped>
.button {
  width: 150px;
  height: 40px;
}
.success {
  color: #52c41a;
}
.error {
  color: #ff4d4f;
}
.link {
  color: #1890ff;
}
.warning {
  color: #faad14;
}
</style>
