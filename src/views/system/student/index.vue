<template>
  <div>
    <div class="table-operations">
      <a-button type="primary">
        导入考生数据
      </a-button>
    </div>
    <a-table :columns="columns" :data-source="data" rowKey="id" :pagination="false" style="margin-top: 10px">
    </a-table>
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
      title: '单位名',
      dataIndex: 'companyName',
      key: 'companyName'
    },
    {
      title: '考生编码',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '学生姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex'
    },
    {
      title: '身份证',
      dataIndex: 'idCard',
      key: 'idCard'
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '二维码',
      dataIndex: 'twoDimensionalCode',
      key: 'twoDimensionalCode'
    }
  ]
  export default {
    data () {
      return {
        columns,
        data: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.axios.get('/student/getStudentList').then(data => {
          console.log(data)
          this.data = data
        })
      }
    }
  }
</script>
