<template>
  <div>
    <a-button @click="exportExcel()">导出excel</a-button>
    <a-card>
      <a-table
        :columns="columns"
        :data-source="finalResult"
        bordered
        :pagination="false"
        rowKey="studentId"
        @change="onChange"
        size="small"
      >
      </a-table>
    </a-card>
  </div>
</template>

<script>
  const columns = [
    // {
    //   title: 'id',
    //   dataIndex: 'id',
    //   key: 'id'
    // },
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
      title: '综合成绩',
      dataIndex: 'comprehensiveResult',
      key: 'comprehensiveResult',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.comprehensiveResult - b.comprehensiveResult
    }
  ]

  function onChange (pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter)
  }

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
      },
      onChange,
      exportExcel () {
        window.open('/njdt/test-result/exportExcel')
      }
    }
  }
</script>
