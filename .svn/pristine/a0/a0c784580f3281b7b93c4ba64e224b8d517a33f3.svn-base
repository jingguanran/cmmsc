<template>
  <div class="tab-container">

    <el-tabs
      v-model="activeName"
      style="margin-top:15px;"
      type="border-card"
    >
      <el-tab-pane
        :label="$t('customer.work')"
        name="work"
      >

        <work />

      </el-tab-pane>
      <el-tab-pane
        :label="$t('customer.education')"
        name="education"
      >
        <education />
      </el-tab-pane>
      <el-tab-pane
        :label="$t('customer.childrenStatus')"
        name="childrenStatus"
      >
        <children />
      </el-tab-pane>
      <el-tab-pane
        :label="$t('customer.relation')"
        name="relation"
      >
        <society />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import work from './views/work'
import children from './views/children'
import education from './views/education'
import society from './views/society'
import { parseTime } from '@/utils'

export default {
  name: 'Tab',
  directives: { waves },
  components: {
    work,
    children,
    society,
    education
  },
  data () {
    return {
      activeName: 'work'
    }
  },
  watch: {
    activeName (val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created () {
    // init the default selected tab

  },
  methods: {

  }

}
</script>

<style scoped>
.tab-container {
  margin: 10px;
}
</style>
