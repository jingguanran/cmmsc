<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.menuName" :placeholder="$t('sysmenu.menuName')" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.menuPath" :placeholder="$t('sysmenu.menuPath')" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('common.query') }}
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-refresh-right" @click="handleReset">
        {{ $t('common.reset') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">
        {{ $t('common.add') }}
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        {{ $t('common.export') }}
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      row-key="id"
      :data="list.slice((listQuery.currentPage-1)*listQuery.pageSize,listQuery.currentPage*listQuery.pageSize)"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('sysmenu.menuName')">
        <template slot-scope="{row}">
          <span>{{ row.menuName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysmenu.menuCode')">
        <template slot-scope="{row}">
          <span>{{ row.menuCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysmenu.menuIcon')">
        <template slot-scope="{row}">
          <span>{{ row.menuIcon }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysmenu.menuPath')">
        <template slot-scope="{row}">
          <span>{{ row.menuPath }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysmenu.menuSequence')">
        <template slot-scope="{row}">
          <span>{{ row.menuSequence }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysmenu.menuStatus')" class-name="status-col">
        <template slot-scope="{row}">
          <el-tag :type="row.menuStatus | statusFilter">
            <span v-if="row.menuStatus === 1">{{ $t('common.show') }}</span>
            <span v-else>{{ $t('common.hide') }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operate')" min-width="100px" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" style="margin-right: 5px" @click="handleUpdate(row)">
            {{ $t('common.edit') }}
          </el-button>
          <el-popover :ref="'popover-' + row.id" placement="top" width="160" :title="$t('common.confirm-delete')" trigger="click">
            <div style="text-align: right; margin: 0">
              <el-button size="mini" @click="$refs[`popover-` + row.id].doClose()">{{ $t('common.cancel') }}</el-button>
              <el-button type="primary" size="mini" @click="$refs[`popover-` + row.id].doClose();handleDelete(row,$index)">{{ $t('common.confirm') }}</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">
              {{ $t('common.delete') }}
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" :inline="true" label-position="right" label-width="90px" style="width: 100%">
        <el-form-item :label="$t('sysmenu.menuCode')" prop="menuCode">
          <el-input v-model="temp.menuCode" :placeholder="$t('common.enter')" :disabled="dialogStatus==='update'" maxlength="32" clearable />
        </el-form-item>
        <el-form-item :label="$t('sysmenu.menuName')" prop="menuName">
          <el-input v-model="temp.menuName" :placeholder="$t('common.enter')" maxlength="32" clearable />
        </el-form-item>
        <el-form-item :label="$t('sysmenu.menuIcon')" prop="menuIcon">
          <el-input v-model="temp.menuIcon" :placeholder="$t('common.enter')" maxlength="32" clearable />
        </el-form-item>
        <el-form-item :label="$t('sysmenu.menuPath')" prop="menuPath">
          <el-input v-model="temp.menuPath" :placeholder="$t('common.enter')" maxlength="512" clearable />
        </el-form-item>
        <el-form-item :label="$t('sysmenu.menuComponent')" prop="menuComponent">
          <el-input v-model="temp.menuComponent" :placeholder="$t('common.enter')" maxlength="256" clearable />
        </el-form-item>
        <el-form-item :label="$t('sysmenu.menuSequence')" prop="menuSequence">
          <el-input-number v-model="temp.menuSequence" :placeholder="$t('common.enter')" :min="1" />
        </el-form-item>
        <el-form-item :label="$t('sysmenu.menuParent')" prop="parentId">
          <el-tooltip :content="$t('common.choose-tooltip')" placement="bottom" effect="light">
            <el-select ref="selectParentId" v-model="temp.parentId" :placeholder="$t('common.choose')" style="width: 100%" clearable @clear="handleClearParentId">
              <el-option :key="temp.parentId" hidden :value="temp.parentId" :label="parentName" />
              <el-tree ref="treeParentId" node-key="id" :data="parentIdOptions" :props="{label: 'title'}" :expand-on-click-node="false" :check-on-click-node="true" @node-click="handleNodeClickParentId" />
            </el-select>
          </el-tooltip>
        </el-form-item>
        <el-form-item :label="$t('sysmenu.menuStatus')" prop="menuStatus">
          <el-radio-group v-model="temp.menuStatus">
            <el-radio :label="1">{{ $t('common.show') }}</el-radio>
            <el-radio :label="0">{{ $t('common.hide') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('sysmenu.menuButton')" prop="menuButton">
          <el-checkbox-group v-model="checkedMenuButtonList">
            <el-checkbox v-for="item in menuButtonList" :key="item.value" :label="item.value">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('common.cancel') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { querySysMenu, addSysMenu, updateSysMenu, deleteSysMenu, querySysMenuTree, queryMenuButtonCheckbox, queryCheckedMenuButton } from '@/api/admin'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'SysMenu',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(menuStatus) {
      const statusMap = {
        1: 'success',
        0: 'danger'
      }
      return statusMap[menuStatus]
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        menuName: undefined,
        menuPath: undefined
      },
      parentIdOptions: [],
      parentName: '',
      checkedMenuButtonList: [],
      menuButtonList: [],
      temp: {
        id: undefined,
        menuStatus: 1
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.add')
      },
      rules: {
        menuCode: [{ required: true, message: this.$t('sysmenu.menuCode-required'), trigger: ['blur', 'change'] }],
        menuName: [{ required: true, message: this.$t('sysmenu.menuName-required'), trigger: ['blur', 'change'] }],
        menuPath: [{ required: true, message: this.$t('sysmenu.menuPath-required'), trigger: 'change' }],
        menuStatus: [{ required: true, message: this.$t('sysmenu.menuStatus-required'), trigger: 'change' }]
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
      querySysMenu(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.pagination.total
        this.listLoading = false
      })
      querySysMenuTree().then(response => {
        this.parentIdOptions = response.data
      })
      queryMenuButtonCheckbox().then(response => {
        this.menuButtonList = response.data
      })
    },
    handleFilter() {
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleReset() {
      this.listQuery.menuName = ''
      this.listQuery.menuPath = ''
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        menuStatus: 1
      }
    },
    handleCreate() {
      this.resetTemp()
      this.parentName = ''
      this.checkedMenuButtonList = []
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      if (this.$refs.selectParentId.value) {
        this.validateParentId()
      }
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.temp.parentId === undefined) {
            this.temp.parentId = 0
          }
          this.temp.menuButton = this.checkedMenuButtonList
          addSysMenu(this.temp).then(response => {
            if (response.message === 'success') {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.add-success'),
                type: 'success',
                duration: 2000
              })
              this.handleReset()
            } else {
              this.handleWarning(response)
            }
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        if (this.temp.parentId === '0') {
          this.parentName = this.$t('common.choose')
        } else {
          this.parentName = this.$refs.treeParentId.getNode(this.temp.parentId).label
        }
      })
      queryCheckedMenuButton(this.temp.menuCode).then(response => {
        this.checkedMenuButtonList = response.data
      })
    },
    updateData() {
      if (this.$refs.selectParentId.value) {
        this.validateParentId()
      }
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // const tempData = Object.assign({}, this.temp)
          const tempData = {}
          tempData.id = this.temp.id
          tempData.menuCode = this.temp.menuCode
          tempData.menuName = this.temp.menuName
          tempData.menuIcon = this.temp.menuIcon
          tempData.menuPath = this.temp.menuPath
          tempData.menuComponent = this.temp.menuComponent
          tempData.menuSequence = this.temp.menuSequence
          tempData.menuStatus = this.temp.menuStatus
          tempData.parentId = this.temp.parentId ? this.temp.parentId : 0
          tempData.menuButton = this.checkedMenuButtonList
          updateSysMenu(tempData).then(response => {
            if (response.message === 'success') {
              const index = this.list.findIndex(v => v.id === this.temp.id)
              this.list.splice(index, 1, this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.edit-success'),
                type: 'success',
                duration: 2000
              })
              this.handleReset()
            } else {
              this.handleWarning(response)
            }
          })
        }
      })
    },
    handleDelete(row, index) {
      deleteSysMenu(row.id).then(response => {
        if (response.message === 'success') {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.delete-success'),
            type: 'success',
            duration: 2000
          })
          this.list.splice(index, 1)
          this.handleReset()
        } else {
          this.handleWarning(response)
        }
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [this.$t('sysmenu.menuName'), this.$t('sysmenu.menuCode'), this.$t('sysmenu.menuIcon'), this.$t('sysmenu.menuPath'), this.$t('sysmenu.menuStatus'), this.$t('sysmenu.menuSequence')]
        const filterVal = ['menuName', 'menuCode', 'menuIcon', 'menuPath', 'menuStatusCn', 'menuSequence']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.$t('route.sysmenu')
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    getSortClass: function(key) {
      const sorter = this.listQuery.sorter
      return sorter === `${key}_ascend` ? 'ascending' : 'descending'
    },
    handleWarning(response) {
      this.$notify({
        title: this.$t('common.warning'),
        message: response.message,
        type: 'warning',
        duration: 2000
      })
    },
    validateParentId() {
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate('parentId')
      })
    },
    handleNodeClickParentId(data) {
      this.parentName = data.title
      this.temp.parentId = data.id
      this.$refs.selectParentId.blur()
      this.validateParentId()
    },
    handleClearParentId() {
      this.parentName = ''
      this.temp.parentId = ''
    }
  }
}
</script>
