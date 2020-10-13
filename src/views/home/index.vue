<template>
  <div>
    <a-row>
      <a-col span="24">
        <a-alert
          message="提示信息！"
          description="1. 绿色表示：考生（裁判）已经就绪； 红色表示： 考生（裁判）还未就绪。 2.默认显示的是第一场第一轮考生（裁判）情况"
          type="info"
          show-icon
        />
      </a-col>
    </a-row>
    <div style="margin-top: 30px">
      <a-form :form="form" @submit="handleSubmit">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="场次">
              <a-select
                v-decorator="['gameNumber', { rules: [{ required: true, message: '场次不能为空!' }] }]"
                placeholder="选择场次"
                @change="handleSelectChange"
              >
                <a-select-option value="1">
                  1
                </a-select-option>
                <a-select-option value="2">
                  2
                </a-select-option>
                <a-select-option value="3">
                  3
                </a-select-option>
                <a-select-option value="4">
                  4
                </a-select-option>
                <a-select-option value="5">
                  5
                </a-select-option>
                <a-select-option value="6">
                  6
                </a-select-option>
                <a-select-option value="7">
                  7
                </a-select-option>
              </a-select>
            </a-form-item></a-col
            >
          <a-col :span="6">
            <a-form-item label="轮次">
              <a-select
                v-decorator="['gameRound', { rules: [{ required: true, message: '轮次不能为空!' }] }]"
                placeholder="选择轮次"
                @change="handleSelectChange"
              >
                <a-select-option value="1">
                  1
                </a-select-option>
                <a-select-option value="2">
                  2
                </a-select-option>
                <a-select-option value="3">
                  3
                </a-select-option>
              </a-select>
            </a-form-item></a-col
          >
          <a-col
            :span="4"
          ><a-form-item style="margin-top: 40px">
            <a-button type="primary" html-type="submit">
              查询
            </a-button>
          </a-form-item></a-col
          >
        </a-row>
      </a-form>
    </div>
    <!--门户主页-->
    <div class="text-main">
      <div>
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="12" v-for="item in groups" :key="item.groupName">
            <div class="gutter-box">
              <a-card hoverable :bordered="true" style="margin-top: 20px">
                <p style="text-align: center">
                  <b>{{ item.groupName }}</b>
                </p>
                <a-row :gutter="16">
                  <a-col class="gutter-row" :span="8" v-for="type in item.typeShowVOList" :key="type.typeName">
                    <a-card hoverable :bordered="true" style="margin-top: 20px">
                      <p style="text-align: center">
                        <b>{{ type.typeName }}</b>
                      </p>
                      <a-row :gutter="16">
                        <a-col class="gutter-row" :span="24">
                          <a-card
                            hoverable
                            :bordered="true"
                            style="margin-top: 20px"
                            :class="{ stateOk: type.studentShowVO.state, stateNo: !type.studentShowVO.state }"
                          >
                            <p style="text-align: center">
                              <b>{{ type.studentShowVO.studentName }}</b>
                            </p>
                          </a-card>
                        </a-col>
                        <a-col class="gutter-row" :span="12" v-for="judge in type.judgeShowVOList" :key="judge.code">
                          <a-card
                            hoverable
                            :bordered="true"
                            style="margin-top: 20px"
                            :class="{ stateOk: judge.state, stateNo: !judge.state }"
                          >
                            <p style="text-align: center">
                              <b>{{ judge.name }}</b>
                            </p>
                          </a-card>
                        </a-col>
                      </a-row>
                    </a-card>
                  </a-col>
                </a-row>
              </a-card>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        groupNumberData: [1, 2, 3, 4, 5, 6, 7],
        groupRoundData: [1, 2, 4],
        formLayout: 'horizontal',
        form: this.$form.createForm(this, { name: 'coordinated' }),
        groups: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.axios
          .get('/judge/getGroupShowVO', {
            params: {
              gameNumber: 1,
              gameRound: 1
            }
          })
          .then(data => {
            console.log(data)
            this.groups = data
          })
      },
      // 查询
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values)
            this.axios
              .get('/judge/getGroupShowVO', {
                params: {
                  gameNumber: values.gameNumber,
                  gameRound: values.gameRound
                }
              })
              .then(data => {
                this.groups = data
              })
          }
        })
      }
    }
  }
</script>
<style>
  .stateOk {
    background-color: darkseagreen;
  }
  .stateNo {
    background-color: palevioletred;
  }
</style>
