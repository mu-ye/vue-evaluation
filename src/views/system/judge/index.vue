<template>
  <div>
    <div class="table-operations">
      <a-button type="primary">
        导入裁判数据
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
      title: '裁判编码',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    // {
    //   title: '性别',
    //   dataIndex: 'sex',
    //   key: 'sex'
    // },
    {
      title: '所属单位',
      dataIndex: 'companyName',
      key: 'companyName'
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
        this.axios.get('/judge/getJudgeList').then(data => {
          console.log(data)
          this.data = data
        })
      }
    }
  }
</script>
