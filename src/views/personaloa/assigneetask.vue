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
      <el-table-column :label="$t('common.operate')" min-width="190px" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" style="margin-right: -5px" @click="handleTrack(row)">
            {{ $t('process.track') }}
          </el-button>
          <el-button type="primary" size="mini" @click="handleComplete(row)">
            {{ $t('task.complete') }}
          </el-button>
          <el-button type="primary" size="mini" style="margin-left: 5px" @click="handleDelegate(row)">
            {{ $t('task.delegate') }}
          </el-button>
          <el-button type="primary" size="mini" style="margin-left: 5px" @click="handleRegress(row)">
            {{ $t('task.regress') }}
          </el-button>
          <el-button type="primary" size="mini" style="margin-top: 5px" @click="handleReject(row)">
            {{ $t('task.reject') }}
          </el-button>
          <el-button type="primary" size="mini" style="margin-left: 5px" @click="handleTerminate(row)">
            {{ $t('task.terminate') }}
          </el-button>
          <router-link :to="{path: '/personaloa/mytaskdetails', query: { processInstanceId: row.processInstanceId, processDefinitionName: row.processDefinitionName, processInstanceName: row.processInstanceName, name: row.name, startTime: row.taskLocalVariables.startTime, endTime: row.taskLocalVariables.endTime, description: row.taskLocalVariables.description } }">
            <el-button type="primary" size="mini" style="margin-left: 5px">
              {{ $t('process.details') }}
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="90px" style="width: 100%">
        <el-form-item v-if="dialogStatus==='complete' || dialogStatus==='delegate'" :label="$t('process.candidate')" prop="candidate">
          <el-select v-model="temp.candidate" :placeholder="$t('common.choose')" clearable class="filter-item" style="width: 100%">
            <el-option-group v-for="group in candidateOptions" :key="group.value" :label="group.value">
              <el-option v-for="item in group.children" :key="item.key" :label="item.value" :value="item.key" />
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('process.comments')" prop="comment">
          <el-input v-model="temp.comment" type="textarea" :placeholder="$t('common.enter')" maxlength="512" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('common.cancel') }}
        </el-button>
        <el-button type="primary" @click="startData()">
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog fullscreen :visible.sync="trackDialogVisible">
      <div v-html="svgSrc" />
    </el-dialog>
  </div>
</template>

<script>
import { queryPersonalTask, queryUsername, getHighLightedProcessDiagram, completeTask, resolveTask, delegateTask, regressTask, rejectTask, terminateTask } from '@/api/activiti'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'AssigneeTask',
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
        taskStatus: 'assignee',
        taskName: undefined
      },
      candidateOptions: [],
      temp: {
        id: undefined
      },
      trackDialogVisible: false,
      svgSrc: '',
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        complete: this.$t('task.complete'),
        delegate: this.$t('task.delegate'),
        regress: this.$t('task.regress'),
        reject: this.$t('task.reject'),
        terminate: this.$t('task.terminate')
      },
      rules: {
        comment: [{ required: true, message: this.$t('task.taskComment-required'), trigger: 'blur' }]
      }
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
      queryUsername().then(response => {
        this.candidateOptions = response.data
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
    handleComplete(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'complete'
      this.dialogFormVisible = true
    },
    handleDelegate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'delegate'
      this.dialogFormVisible = true
    },
    handleRegress(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'regress'
      this.dialogFormVisible = true
    },
    handleReject(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'reject'
      this.dialogFormVisible = true
    },
    handleTerminate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'terminate'
      this.dialogFormVisible = true
    },
    startData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.dialogStatus === 'complete' && (this.temp.delegationState === null || this.temp.delegationState === 'RESOLVED')) {
            const tempData = {}
            tempData.taskId = this.temp.id
            tempData.processInstanceId = this.temp.processInstanceId
            tempData.candidate = this.temp.candidate
            tempData.comment = this.temp.comment
            completeTask(tempData).then(response => {
              if (response.message === 'success') {
                this.list.unshift(this.temp)
                this.dialogFormVisible = false
                this.$notify({
                  title: this.$t('common.success'),
                  message: this.$t('task.complete-success'),
                  type: 'success',
                  duration: 2000
                })
                this.handleReset()
              } else {
                this.handleWarning(response)
              }
            })
          } else if (this.dialogStatus === 'complete' && this.temp.delegationState === 'PENDING') {
            const tempData = {}
            tempData.taskId = this.temp.id
            tempData.processInstanceId = this.temp.processInstanceId
            tempData.comment = this.temp.comment
            resolveTask(tempData).then(response => {
              if (response.message === 'success') {
                this.list.unshift(this.temp)
                this.dialogFormVisible = false
                this.$notify({
                  title: this.$t('common.success'),
                  message: this.$t('task.handle-delegate-success'),
                  type: 'success',
                  duration: 2000
                })
                this.handleReset()
              } else {
                this.handleWarning(response)
              }
            })
          } else if (this.dialogStatus === 'delegate') {
            const tempData = {}
            tempData.taskId = this.temp.id
            tempData.processInstanceId = this.temp.processInstanceId
            tempData.assignee = this.temp.candidate
            tempData.comment = this.temp.comment
            delegateTask(tempData).then(response => {
              if (response.message === 'success') {
                this.list.unshift(this.temp)
                this.dialogFormVisible = false
                this.$notify({
                  title: this.$t('common.success'),
                  message: this.$t('task.delegate-success'),
                  type: 'success',
                  duration: 2000
                })
                this.handleReset()
              } else {
                this.handleWarning(response)
              }
            })
          } else if (this.dialogStatus === 'regress') {
            const tempData = {}
            tempData.taskId = this.temp.id
            tempData.processInstanceId = this.temp.processInstanceId
            tempData.comment = this.temp.comment
            regressTask(tempData).then(response => {
              if (response.message === 'success') {
                this.list.unshift(this.temp)
                this.dialogFormVisible = false
                this.$notify({
                  title: this.$t('common.success'),
                  message: this.$t('task.regress-success'),
                  type: 'success',
                  duration: 2000
                })
                this.handleReset()
              } else {
                this.handleWarning(response)
              }
            })
          } else if (this.dialogStatus === 'reject') {
            const tempData = {}
            tempData.taskId = this.temp.id
            tempData.processInstanceId = this.temp.processInstanceId
            tempData.comment = this.temp.comment
            rejectTask(tempData).then(response => {
              if (response.message === 'success') {
                this.list.unshift(this.temp)
                this.dialogFormVisible = false
                this.$notify({
                  title: this.$t('common.success'),
                  message: this.$t('task.reject-success'),
                  type: 'success',
                  duration: 2000
                })
                this.handleReset()
              } else {
                this.handleWarning(response)
              }
            })
          } else if (this.dialogStatus === 'terminate') {
            const tempData = {}
            tempData.taskId = this.temp.id
            tempData.processInstanceId = this.temp.processInstanceId
            tempData.comment = this.temp.comment
            terminateTask(tempData).then(response => {
              if (response.message === 'success') {
                this.list.unshift(this.temp)
                this.dialogFormVisible = false
                this.$notify({
                  title: this.$t('common.success'),
                  message: this.$t('task.terminate-success'),
                  type: 'success',
                  duration: 2000
                })
                this.handleReset()
              } else {
                this.handleWarning(response)
              }
            })
          }
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
