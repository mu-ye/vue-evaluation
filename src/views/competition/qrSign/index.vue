<template>
  <div>
    <a-modal
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk(signInfo.id)"
      @cancel="handleCancel"
      okText="确认"
      cancelText="取消"
      :maskClosable="false"
      :keyboard="false"
    >
      <a-descriptions :title="title" size="small" layout="vertical" bordered>
        <a-descriptions-item label="照片" span="3" >
          <div style="width: 100%;text-align: center">
            <img
              style="width:50px; height:50px;"
              :src="signInfo.url"
            />
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="编号">
          {{ signInfo.code }}
        </a-descriptions-item>
        <a-descriptions-item label="姓名">
          {{ signInfo.name }}
        </a-descriptions-item>
        <a-descriptions-item label="年龄">
          {{ signInfo.age }}
        </a-descriptions-item>
        <a-descriptions-item label="身份证">
          {{ signInfo.idCard }}
        </a-descriptions-item>
        <a-descriptions-item label="公司名称">
          {{ signInfo.companyName }}
        </a-descriptions-item>
        <!--        <a-descriptions-item label="手机">-->
        <!--          {{ signInfo.phone }}-->
        <!--        </a-descriptions-item>-->
        <a-descriptions-item label="考位">
          <b> {{ signInfo.seatInfo }}</b>
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>

    <a-card title="本场考试人员信息">
      <a-table
        :columns="columns"
        :data-source="signTwoData"
        :pagination="false"
        style="margin-top: 10px"
        size="small"
      ></a-table>
    </a-card>
  </div>
</template>

<script>
  const columns = [
    {
      title: '所属单位',
      dataIndex: 'companyName',
      key: 'companyName'
    },
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '身份证号',
      dataIndex: 'idCard',
      key: 'idCard'
    },
    {
      title: '考位',
      dataIndex: 'seatId',
      key: 'seatId'
    }
  ]
  export default {
    name: 'QrSign',
    data () {
      return {
        columns,
        timer: null,
        title: null,
        signInfo: {
          code: '',
          name: '',
          age: 0,
          idCard: '',
          companyName: '',
          phone: '',
          url: '',
          seatInfo: ''
        },
        confirmLoading: false,
        visible: false,
        idList: [],
        signTwoData: []
      }
    },
    mounted () {
      this.timer = setInterval(this.test, 1000)
    },
    destroyed () {
      clearInterval(this.timer)
    },
    methods: {
      test () {
        this.axios.get('/code-state/getInfoAndSign').then(
          data => {
            if (data != null) {
              this.signInfo = data
              console.log(data)
             this.showModal()
              clearInterval(this.timer)
              // this.$message.info('有数据')
              if (this.signInfo.type === 1) {
                this.title = '进入候考区签到'
              }
              if (this.signInfo.type === 2) {
                this.title = '进入备考区签到'
              }
              if (this.signInfo.type === 4) {
                this.title = '离开考试区签出'
              }
            } else {
              // this.$message.error('没有此考生信息！')
            }
          }
        )
        this.axios.get('/student/getStudentListHaveSignTwo').then(data => {
          this.signTwoData = data
          console.log(data)
        })
      },
      showModal () {
        this.visible = true
      },
      handleOk (e) {
        console.log(e)
        this.confirmLoading = true
        setTimeout(() => {
          this.sign()
          this.visible = false
          this.confirmLoading = false
        }, 1000)
      },
      handleCancel (e) {
        console.log('Clicked cancel button')
        this.timer = setInterval(this.test, 1000)
        this.visible = false
      },
      sign () {
        this.idList.push(this.signInfo.id)
        if (this.signInfo.type === 1) {
          this.axios.post('/student/signInOne', this.idList).then(() => {
            this.$message.info('签到成功')
          })
        }
        if (this.signInfo.type === 2) {
          this.axios.post('/student/signInTwo', this.idList).then(() => {
            this.$message.info('签到成功')
          })
        }
        if (this.signInfo.type === 4) {
          this.axios.post('/student/signAway', this.idList).then(() => {
            this.$message.info('签离成功')
          })
        }
        this.timer = setInterval(this.test, 1000)
      }
    }

  }
</script>
