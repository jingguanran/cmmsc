<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.taskName" :placeholder="$t('task.current')" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('common.query') }}
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-refresh-right" @click="handleReset">
        {{ $t('common.reset') }}
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('process.processDefinitionName')">
        <template slot-scope="{row}">
          <span>{{ row.processDefinitionName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('process.processInstanceName')">
        <template slot-scope="{row}">
          <span>{{ row.processInstanceName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.current')">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.startTime')" min-width="100px" prop="startTime">
        <template slot-scope="{row}">
          <span>{{ row.taskLocalVariables.startTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.endTime')" min-width="100px" prop="endTime">
        <template slot-scope="{row}">
          <span>{{ row.taskLocalVariables.endTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.description')">
        <template slot-scope="{row}">
          <span>{{ row.taskLocalVariables.description }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operate')" min-width="130px" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" style="margin-right: -5px" @click="handleTrack(row)">
            {{ $t('process.track') }}
          </el-button>
          <el-button type="primary" size="mini" style="margin-right: 5px" @click="handleAssign(row)">
            {{ $t('task.assign') }}
          </el-button>
          <router-link :to="{path: '/personaloa/mytaskdetails', query: { processInstanceId: row.processInstanceId, processDefinitionName: row.processDefinitionName, processInstanceName: row.processInstanceName, name: row.name, startTime: row.taskLocalVariables.startTime, endTime: row.taskLocalVariables.endTime, description: row.taskLocalVariables.description } }">
            <el-button type="primary" size="mini">
              {{ $t('process.details') }}
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog fullscreen :visible.sync="trackDialogVisible">
      <div v-html="svgSrc" />
    </el-dialog>
  </div>
</template>

<script>
import { queryPersonalTask, getHighLightedProcessDiagram, claimTask } from '@/api/activiti'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'CandidateTask',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        taskStatus: 'candidate',
        taskName: undefined
      },
      temp: {
        id: undefined
      },
      trackDialogVisible: false,
      svgSrc: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryPersonalTask(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.pagination.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleReset() {
      this.listQuery.taskName = ''
      this.handleFilter()
    },
    handleTrack(row) {
      getHighLightedProcessDiagram(row.processInstanceId).then(response => {
        if (response.message === 'success') {
          this.svgSrc = response.data
          this.trackDialogVisible = true
        } else {
          this.svgSrc = ''
          this.handleWarning(response)
        }
      })
    },
    handleAssign(row) {
      claimTask(row.id).then(response => {
        if (response.message === 'success') {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('task.assign-success'),
            type: 'success',
            duration: 2000
          })
          this.handleReset()
        } else {
          this.handleWarning(response)
        }
      })
    },
    handleWarning(response) {
      this.$notify({
        title: this.$t('common.warning'),
        message: response.message,
        type: 'warning',
        duration: 2000
      })
    }
  }
}
</script>
