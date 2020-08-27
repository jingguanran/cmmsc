<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.processDefinitionName" :placeholder="$t('process.processDefinitionName')" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column :label="$t('process.processDefinitionKey')">
        <template slot-scope="{row}">
          <span>{{ row.key }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('process.processDefinitionName')">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('process.processDefinitionVersion')">
        <template slot-scope="{row}">
          <el-tag type="success">
            <span>{{ 'v' + row.version }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('process.suspended')">
        <template slot-scope="{row}">
          <span v-if="row.suspended === false">{{ $t('common.no') }}</span>
          <span v-else>{{ $t('common.yes') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operate')" min-width="100px" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handlePreview(row)">
            {{ $t('process.preview') }}
          </el-button>
          <el-button type="primary" size="mini" @click="handleStart(row)">
            {{ $t('process.start') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="90px" style="width: 100%">
        <el-form-item :label="$t('process.candidate')" prop="candidate">
          <el-select v-model="temp.candidate" :placeholder="$t('common.choose')" clearable class="filter-item" style="width: 100%">
            <el-option-group v-for="group in candidateOptions" :key="group.value" :label="group.value">
              <el-option v-for="item in group.children" :key="item.key" :label="item.value" :value="item.key" />
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('process.rangeTime')" prop="rangeTime">
          <el-date-picker v-model="temp.rangeTime" type="datetimerange" :default-time="['08:30:00', '18:00:00']" style="width: 100%" clearable />
        </el-form-item>
        <el-form-item :label="$t('process.description')" prop="description">
          <el-input v-model="temp.description" type="textarea" :placeholder="$t('common.enter')" maxlength="512" clearable />
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

    <el-dialog fullscreen :visible.sync="previewDialogVisible">
      <div v-html="svgSrc" />
    </el-dialog>
  </div>
</template>

<script>
import { queryProcessDefinition, queryUsername, getProcessResource, startProcessInstance } from '@/api/activiti'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'StartProcess',
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
        processDefinitionName: undefined
      },
      candidateOptions: [],
      temp: {
        id: undefined
      },
      dialogFormVisible: false,
      previewDialogVisible: false,
      svgSrc: '',
      dialogStatus: '',
      textMap: {
        start: this.$t('route.startprocess')
      },
      rules: {
        candidate: [{ required: true, message: this.$t('process.processCandidate-required'), trigger: 'change' }],
        rangeTime: [{ required: true, message: this.$t('process.processRangetime-required'), trigger: 'change' }],
        description: [{ required: true, message: this.$t('process.processDescription-required'), trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryProcessDefinition(this.listQuery).then(response => {
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
      this.listQuery.processDefinitionName = ''
      this.handleFilter()
    },
    handleStart(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'start'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      queryUsername().then(response => {
        this.candidateOptions = response.data
      })
    },
    handlePreview(row) {
      this.previewDialogVisible = true
      getProcessResource(row.deploymentId).then(response => {
        this.svgSrc = response
      })
    },
    startData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // const tempData = Object.assign({}, this.temp)
          const tempData = {}
          tempData.candidate = this.temp.candidate
          tempData.startTime = this.temp.rangeTime ? this.temp.rangeTime[0] : null
          tempData.endTime = this.temp.rangeTime ? this.temp.rangeTime[1] : null
          tempData.description = this.temp.description
          tempData.customForm = []
          tempData.processDefinitionId = this.temp.id
          startProcessInstance(tempData).then(response => {
            if (response.message === 'success') {
              this.dialogFormVisible = false
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('process.startSuccess'),
                type: 'success',
                duration: 2000
              })
            } else {
              this.handleWarning(response)
            }
          })
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
