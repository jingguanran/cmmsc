<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-plus"
        @click="handleCreate"
      >
        {{ $t('common.add') }}
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        {{ $t('common.export') }}
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('customer.childrenName')">
        <template slot-scope="{row}">
          <span>{{ row.childrenName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.childrenAge')">
        <template slot-scope="{row}">
          <span>{{ row.childrenAge }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.childrenGender')">
        <template slot-scope="{row}">
          <span>{{ row.childrenGender}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.childrenSchool')">
        <template slot-scope="{row}">
          <span>{{ row.childrenSchool }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.childrenGrade')">
        <template slot-scope="{row}">
          <span>{{ row.childrenGrade }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('common.operate')"
        min-width="100px"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row,$index}">
          <el-button
            type="primary"
            size="mini"
            style="margin-right: 5px"
            @click="handleUpdate(row)"
          >
            {{ $t('common.edit') }}
          </el-button>
          <el-popover
            :ref="'popover-' + row.id"
            placement="top"
            width="160"
            :title="$t('common.confirm-delete')"
            trigger="click"
          >
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                @click="$refs[`popover-` + row.id].doClose()"
              >{{ $t('common.cancel') }}</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="$refs[`popover-` + row.id].doClose();handleDelete(row,$index)"
              >{{ $t('common.confirm') }}</el-button>
            </div>
            <el-button
              slot="reference"
              type="danger"
              size="mini"
            >
              {{ $t('common.delete') }}
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        label-position="right"
        label-width="100px"
        style="width: 100%"
      >
        <el-form-item :label="$t('customer.childrenName')">
          <el-input
            v-model="temp.childrenName"
            :placeholder="$t('common.enter')"
            minlength="2"
            maxlength="50"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('customer.childrenAge')">
          <el-input
            v-model="temp.childrenAge"
            :placeholder="$t('common.enter')"
            minlength="1"
            maxlength="3"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('customer.childrenGender')">
          <el-select
            v-model="temp.childrenGender"
            :placeholder="$t('common.choose')"
            clearable
            class="filter-item"
            style="width: 100%"
          >
            <el-option
              v-for="item in NatureOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('customer.childrenSchool')">
          <el-input
            v-model="temp.childrenSchool"
            :placeholder="$t('common.enter')"
            minlength="1"
            maxlength="50"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('customer.childrenGrade')">
          <el-input
            v-model="temp.childrenGrade"
            :placeholder="$t('common.enter')"
            minlength="1"
            maxlength="20"
            clearable
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import waves from '@/directive/waves' // waves directive
// eslint-disable-next-line no-unused-vars
import { parseTime } from '@/utils'
// eslint-disable-next-line no-unused-vars
import { getChildren, upChildren, chaneChildren, delChildren } from '@/api/getUser-info/children'
export default {
  name: 'Work',
  directives: { waves },
  data () {
    return {
      list: [],
      temp: {
        id: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.add')
      },
      rules: {

      },
      listLoading: false,
      downloadLoading: false,
      showUnitAddr: false,
      showUnitContact: false,
      showDetailAddr: false,
      showUnitPhone: false
    }
  },
  computed: {
    NatureOptions () {
      return [{
        value: '男',
        label: '0'
      }, {
        value: '女',
        label: '1'
      }
      ]
    }
  },
  methods: {
    resetTemp () {
      this.temp = {
        id: undefined
      }
    },
    handleCreate () {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 新增子女信息
    createData () {
      // 转换为时间戳 
      if (this.temp.startTime !== undefined) {
        this.temp['startTime'] = Date.parse(this.temp.startTime)
      }
      if (this.temp.endTime !== undefined) {
        this.temp['endTime'] = Date.parse(this.temp.endTime)
      }
      this.temp['consumerId'] = this.$route.params.id
      this.temp['consumerId'] = this.$route.params.id
      const valArray = []
      for (const val in this.temp) {
        valArray.push(val)
      }
      if (valArray.length <= 2) {
        this.$message.warning(`不能上传空表单`)
      } else {
        upChildren(this.temp).then(data => {
          this.getUserId()
          this.dialogFormVisible = false
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 删除子女信息
    handleDelete (row) {
      delChildren({
        childrenId: row.id
      }).then(data => {
        this.getUserId()
      }).catch(err => {
        console.log(err)
      })
    },
    // 弹窗
    handleUpdate (row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 修改子女信息
    updateData () {
      // 判断时间格式
      delete this.temp['updateTime']
      delete this.temp['isCurrent']
      delete this.temp['createTime']
      chaneChildren(
        this.temp
      ).then(data => {
        this.getUserId()
        this.dialogFormVisible = false
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取子女信息
    getUserId () {
      getChildren({
        consumerId: this.$route.params.id
      }).then(data => {
        this.list = data.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleDownload () {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [this.$t('customer.childrenName'), this.$t('customer.childrenAge'), this.$t('customer.childrenGender'),
        this.$t('customer.childrenSchool'), this.$t('customer.childrenGrade')]
        const filterVal = ['childrenName', 'childrenAge', 'childrenGender', 'childrenSchool', 'childrenGrade']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.$t('route.client_info')
        })
        this.downloadLoading = false
      })
    },
    formatJson (filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'installedDate') {
          return parseTime(v[j])
        } else if (j === 'enabled') {
          if (v[j] === 1) {
            return this.$t('common.able')
          } else {
            return this.$t('common.disable')
          }
        } else {
          return v[j]
        }
      }))
    }
  },
  mounted () {
    this.getUserId()
  }
}

</script>

<style lang='less' scoped>
</style>
