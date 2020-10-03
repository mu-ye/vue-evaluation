<template>
  <div>

    <a-button @click="drawSeat">赛位抽签</a-button>
    <a-table
      :columns="columns"
      :data-source="drawSeatResult"
      bordered
      :pagination="false"
      rowKey="id"
      size="small"></a-table>
  </div>
</template>

<script>
  const columns = [
    {
      title: '顺序',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '代表队',
      dataIndex: 'companyName',
      key: 'companyName'
    },
    {
      title: '考生编号',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '赛位号id',
      dataIndex: 'seatId',
      key: 'seatId'
    },
    {
      title: '比赛场次',
      dataIndex: 'gameNumber',
      key: 'gameNumber'
    },
    {
      title: '比赛轮次',
      dataIndex: 'gameRound',
      key: 'gameRound'
    },
    {
      title: '组',
      dataIndex: 'groupId',
      key: 'groupId'
    }
  ]

  export default {
    data () {
      return {
        columns,
        drawSeatResult: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      drawSeat () {
        this.axios.get('/student/drawSeat').then(data => {
          this.drawSeatResult = data
          this.init()
        })
      },
      init () {
        this.axios.get('/seat-draw/getSeatDrawList').then(data => {
          this.drawSeatResult = data
        })
      }
    }
  }
</script>
