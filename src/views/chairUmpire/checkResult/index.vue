<template>
  <div>

    <a-alert
      message="提示信息！"
      description="当出现警告图标时，表示对于统一考生的打分，分差大于10，请核查"
      type="warning"
      show-icon
    />

    <a-card style="width: 100%;margin: 24px 0">
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
          <a-button type="primary" @click="checkResult">查看</a-button>
        </a-col>
      </a-row>
    </a-card>
    <a-table
      :columns="columns"
      :data-source="tempResult"
      bordered
      :pagination="false"
      rowKey="id"
    >
<!--      <span slot="action" slot-scope="text,record">-->
<!--        <div v-if="record.flag === 1"><a-icon type="warning" style="color: red" @click="detail(record.studentId)"/></div>-->
<!--      </span>-->
    </a-table>
<!--    <a-modal v-model="visible" title="Basic Modal" @ok="handleOk">-->
<!--      <a-table-->
<!--        :columns="columnsDetail"-->
<!--        :data-source="resultDetail"-->
<!--        bordered-->
<!--        :pagination="false"-->
<!--        rowKey="id"-->
<!--      >-->
<!--      </a-table>-->
<!--    </a-modal>-->
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
  const columnsDetail = [
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
    // {
    //   title: '裁判Id',
    //   dataIndex: 'judgeId',
    //   key: 'judgeId'
    // },
    {
      title: '裁判姓名',
      dataIndex: 'judgeName',
      key: 'judgeName'
    },
    {
      title: '打分项',
      dataIndex: 'questionStandardName',
      key: 'questionStandardName'
    },
    {
      title: '得分',
      dataIndex: 'cent',
      key: 'cent'
    }
  ]

  export default {
    data () {
      return {
        columns,
        columnsDetail,
        gameNumber: 0,
        gameRound: 0,
        resultDetail: [],
        tempResult: [],
        visible: false
      }
    },
    methods: {
      checkResult () {
        this.axios.get('/test-result/getTempResult?gameNumber=' + this.gameNumber + '&gameRound=' + this.gameRound).then(data => {
          console.log(data)
          this.tempResult = data
        })
      },
      detail (studentId) {
        this.axios.get('/test-result/getResultByStudentCode?gameNumber=' + this.gameNumber + '&gameRound=' + this.gameRound + '&studentId=' + studentId).then(data => {
          this.resultDetail = data
        })
        console.log(this.resultDetail)
        this.showModal()
      },
      showModal () {
        this.visible = true
      },
      handleOk (e) {
        console.log(e)
        this.visible = false
      }
    }
  }
</script>

<style scoped>

</style>
