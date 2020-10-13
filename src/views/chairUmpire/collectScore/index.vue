<template>
  <div>
    <a-row>
      <a-col span="24">
        <a-table
          :columns="columns"
          :data-source="finalResult"
          bordered
          :pagination="false"
          rowKey="studentCode"
          size="small">
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
      title: '实操得分',
      dataIndex: 'result',
      key: 'result'
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
