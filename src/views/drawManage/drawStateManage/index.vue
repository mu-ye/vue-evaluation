<template>
  <div>
    <a-row>
      <a-col span="24">
        <a-alert
          message="提示信息！"
          description="1.参赛队抽签重置，五项都需要重置；2.考生赛位抽签重置，仅重置自己；
3.裁判类型充钱重置，三四五都需要重置；4.执行裁判抽签重置，四五都需要重置；5.裁判位置抽签，仅重置自己"
          type="info"
          show-icon
        />
      </a-col>
    </a-row>
    <div style="margin-top: 10px">
      <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="studentSign">
        重置
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `已选择 ${selectedRowKeys.length} 项` }}
        </template>
      </span>
    </div>
    <a-table
      rowKey="id"
      :columns="columns"
      :data-source="data"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :pagination="false"
      bordered
      style="margin-top: 10px">
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
      title: '抽签名称',
      dataIndex: 'drawName',
      key: 'drawName'
    },
    {
      title: '状态',
      dataIndex: 'stateName',
      key: 'stateName'
    }
  ]

  const data = []

  export default {
    data () {
      return {
        data,
        columns,
        loading: false,
        selectedRowKeys: []
      }
    },
    mounted () {
      this.init()
    },
    computed: {
      hasSelected () {
        return this.selectedRowKeys.length > 0
      }
    },
    methods: {
      init () {
        this.axios.get('/drawState/getDrawStateList').then(data => {
          this.data = data
        })
      },
      studentSign () {
        this.loading = true
        // ajax request after empty completing
        setTimeout(() => {
          this.loading = false
          console.log(this.selections)

          this.axios.post('/drawState/reset', this.selectedRowKeys).then(() => {
            this.selectedRowKeys = []
            this.init()
          })
        }, 1000)
      },
      onSelectChange (selectedRowKeys, selectedRows) {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      action (text, record) {
        return record.name + '***' + record.name
      }
    }
  }
</script>
