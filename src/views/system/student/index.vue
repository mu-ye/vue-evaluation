<template>
  <div>
    <a-card>
      <div class="table-operations">
        <a-upload
          name="file"
          :multiple="false"
          action="/njdt/student/uploadStudent"
          :headers="headers"
          @change="handleChange"
        >
          <a-button> <a-icon type="upload" /> 导入考生数据 </a-button>
        </a-upload>
      </div>
      <a-table :columns="columns" :data-source="data" rowKey="id" :pagination="false" style="margin-top: 10px">
        <span slot="action" slot-scope="text, record">
          <img
            style="height:50px;"
            :src="`http://172.18.10.201:8889/res/file/idCard/${record.idCard}.png`"
          />
        </span>
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
    },
    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' }
    }
  ]
  export default {
    data () {
      return {
        columns,
        data: [],
        headers: {
          authorization: 'authorization-text'
        }
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
      },
      handleChange (info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          this.$message.success(`${info.file.name} 上传成功！`)
          this.init()
        } else if (info.file.status === 'error') {
          this.$message.error(`${info.file.name} 上传失败`)
        }
      }
    }
  }
</script>
