<template>
  <div class="gutter-example">
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
                  <a-col
                    class="gutter-row"
                    :span="8"
                    v-for="judgeType in item.groupJudgeTypeVOList"
                    :key="judgeType.typeName"
                  >
                    <a-card hoverable :bordered="true" style="margin-top: 20px">
                      <p style="text-align: center">
                        <b>{{ judgeType.typeName }}</b>
                      </p>
                      <a-row :gutter="16">
                        <a-col
                          class="gutter-row"
                          :span="12"
                          v-for="judge in judgeType.groupTypeJudgeVOList"
                          :key="judge.code"
                        >
                          <a-card hoverable :bordered="true" style="margin-top: 20px">
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
        groups: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.axios.get('/judge/getGroupJudgeVO').then(data => {
          console.log(data)
          this.groups = data
        })
      }
    }
  }
</script>
