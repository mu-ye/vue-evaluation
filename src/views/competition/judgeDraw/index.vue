<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="8">
        <a-table :columns="columns" :data-source="opticalData" bordered :pagination="false" rowKey="code">
          <template slot="title">
            <p style="text-align: center"><b>光缆接续</b></p>
          </template>
        </a-table>
      </a-col>
      <a-col :span="8">
        <a-table :columns="columns" :data-source="switchData" bordered :pagination="false" rowKey="code">
          <template slot="title">
            <p style="text-align: center"><b>交换机组网</b></p>
          </template>
        </a-table>
      </a-col>
      <a-col :span="8">
        <a-table :columns="columns" :data-source="videoData" bordered :pagination="false" rowKey="code">
          <template slot="title">
            <p style="text-align: center"><b>视频搭建</b></p>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>
<script>
const columns = [
  {
    title: '裁判编号',
    className: 'code',
    dataIndex: 'code'
  },
  {
    title: '裁判姓名',
    className: 'name',
    dataIndex: 'name'
  },
  {
    title: '是否监场',
    className: 'masterName',
    dataIndex: 'masterName'
  }
]

export default {
  data () {
    return {
      columns,
      opticalData: [],
      switchData: [],
      videoData: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.axios.get('/judge/getJudgeDrawVO').then(data => {
        console.log(data)
        this.opticalData = data[0]
        this.switchData = data[1]
        this.videoData = data[2]
      })
    }
  }
}
</script>
