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
          <span>{{ row.processDefinitionKey }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('process.processDefinitionName')">
        <template slot-scope="{row}">
          <span>{{ row.processDefinitionName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('process.processDefinitionVersion')">
        <template slot-scope="{row}">
          <el-tag type="success">
            <span>{{ 'v' + row.processDefinitionVersion }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('process.status')">
        <template slot-scope="{row}">
          <span>{{ row.processStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('process.startTime')" min-width="100px" prop="startTime">
        <template slot-scope="{row}">
          <span>{{ row.startTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('process.endTime')" min-width="100px" prop="endTime">
        <template slot-scope="{row}">
          <span>{{ row.endTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operate')" min-width="100px" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" style="margin-right: 5px" @click="handleTrack(row)">
            {{ $t('process.track') }}
          </el-button>
          <router-link :to="{path: '/personaloa/myprocessdetails', query: { processInstanceId: row.processInstanceId, processDefinitionKey: row.processDefinitionKey, processDefinitionName: row.processDefinitionName, processDefinitionVersion: row.processDefinitionVersion, processStatus: row.processStatus, startTime: row.startTime, startUserId: row.startUserId, endTime: row.endTime } }">
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
import { queryHistoricProcessInstance, getHighLightedProcessDiagram } from '@/api/activiti'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'MyProcess',
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
        status: 'personal',
        processDefinitionName: undefined
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
      queryHistoricProcessInstance(this.listQuery).then(response => {
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
