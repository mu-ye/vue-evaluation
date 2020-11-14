<template>
  <div>
    <a-card>
      <a-table :columns="columns" :data-source="questionList" rowKey="id" :pagination="false" style="margin-top: 5px">
      </a-table>
    </a-card>
  </div>
</template>

<script>
  const columns = [
    {
      title: '试题编号',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '试题类型',
      dataIndex: 'seatType',
      key: 'seatType'
    },
    {
      title: '试题名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '故障点',
      dataIndex: 'wrongPoint',
      key: 'wrongPoint'
    }
  ]
  export default {
    name: 'WrongShow',
    data () {
      return {
        columns,
        questionList: []
      }
    },
    mounted () {
      this.axios.get('/testQuestion/getQuestion').then(data => {
        this.questionList = data
      })
    }
  }
</script>
