<template>
  <div>
    <a-card>
        <a-table
          :columns="columns"
          :data-source="finalResult"
          bordered
          :pagination="false"
          rowKey="studentCode"
          size="small">
        </a-table>
    </a-card>
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
      dataIndex: 'studentId',
      key: 'studentId'
    },
    {
      title: '学生姓名',
      dataIndex: 'studentName',
      key: 'studentName'
    },
    {
      title: '公司',
      dataIndex: 'companyName',
      key: 'companyName'
    },
    {
      title: '实操成绩',
      dataIndex: 'result',
      key: 'result'
    },
    {
      title: '理论成绩',
      dataIndex: 'computerTestResult',
      key: 'computerTestResult'
    },
    {
      title: '综合成绩',git
      dataIndex: 'comprehensiveResult',
      key: 'comprehensiveResult'
    }
  ]

  export default {
    data () {
      return {
        columns,
        gameNumber: 0,
        gameRound: 0,
        finalResult: []
      }
    },
    mounted () {
    this.init()
      },
    methods: {
      init () {
        this.axios.get('/test-result/getFinalResult').then(data => {
          console.log(data)
          this.finalResult = data
        })
      }
    }
  }
</script>
