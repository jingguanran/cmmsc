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
      <el-checkbox
        v-model="showUnitAddr"
        class="filter-item"
        style="margin-left:15px;"
      >
        {{ $t('customer.englishLevel') }}
      </el-checkbox>
      <el-checkbox
        v-model="showDetailAddr"
        class="filter-item"
        style="margin-left:15px;"
      >
        {{ $t('customer.computerLevel') }}
      </el-checkbox>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('customer.schoolName')">
        <template slot-scope="{row}">
          <span>{{ row.schoolName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.majorName')">
        <template slot-scope="{row}">
          <span>{{ row.majorName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.schoolAddres')">
        <template slot-scope="{row}">
          <span>{{ row.schoolAddres}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('customer.englishLevel')"
        v-if="showDetailAddr"
      >
        <template slot-scope="{row}">
          <span>{{ row.englishLevel }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('customer.computerLevel')"
        v-if="showUnitAddr"
      >
        <template slot-scope="{row}">
          <span>{{ row.computerLevel }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('customer.entranceTime')"
        min-width="100px"
      >
        <template slot-scope="{row}">
          <span>{{ row.entranceTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('customer.gradTime')"
        min-width="100px"
      >
        <template slot-scope="{row}">
          <span>{{ row.gradTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
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
        <el-form-item :label="$t('customer.schoolName')">
          <el-input
            v-model="temp.schoolName"
            :placeholder="$t('common.enter')"
            minlength="1"
            maxlength="50"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('customer.majorName')">
          <el-input
            v-model="temp.majorName"
            :placeholder="$t('common.enter')"
            minlength="2"
            maxlength="50"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('customer.schoolAddres')">
          <el-input
            v-model="temp.schoolAddres"
            :placeholder="$t('common.enter')"
            minlength="2"
            maxlength="150"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('customer.englishLevel')">
          <el-input
            v-model="temp.englishLevel"
            :placeholder="$t('common.enter')"
            minlength="1"
            maxlength="20"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('customer.computerLevel')">
          <el-input
            v-model="temp.computerLevel"
            :placeholder="$t('common.enter')"
            minlength="1"
            maxlength="30"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('customer.entranceTime')">
          <el-date-picker
            v-model="temp.entranceTime"
            type="datetime"
            :placeholder="$t('common.enter')"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item :label="$t('customer.gradTime')">
          <el-date-picker
            v-model="temp.gradTime"
            type="datetime"
            :placeholder="$t('common.enter')"
            style="width: 100%"
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
import { getEducation, upEducation, chaneEducation, delEducation } from '@/api/getUser-info/education'

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
        value: 'zhinan',
        label: '指南'
      }, {
        value: 'jinan',
        label: '济南'
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
    // 新增教育经历
    createData () {
      // 转换为时间戳
      if (this.temp.entranceTime !== undefined) {
        this.temp['entranceTime'] = Date.parse(this.temp.entranceTime)
      }
      if (this.temp.gradTime !== undefined) {
        this.temp['gradTime'] = Date.parse(this.temp.gradTime)
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
        upEducation(this.temp).then(data => {
          this.getUserId()
          this.dialogFormVisible = false
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 删除教育经历
    handleDelete (row) {
      delEducation({
        educationId: row.id
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

    // 修改教育经历
    updateData () {
      // 判断时间格式
      if (typeof this.temp.entranceTime !== 'number') {
        if (this.temp.entranceTime === null) {
          this.temp['entranceTime'] = null
        } else {
          this.temp['entranceTime'] = Date.parse(this.temp.entranceTime)
        }
      }
      if (typeof this.temp.gradTime !== 'number') {
        if (this.temp.gradTime === null) {
          this.temp['gradTime'] = null
        } else {
          this.temp['gradTime'] = Date.parse(this.temp.gradTime)
        }
      }
      delete this.temp['updateTime']
      delete this.temp['isCurrent']
      delete this.temp['createTime']
      chaneEducation(
        this.temp
      ).then(data => {
        this.getUserId()
        this.dialogFormVisible = false
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取教育经历
    getUserId () {
      getEducation({
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
        const tHeader = [this.$t('customer.schoolName'), this.$t('customer.majorName'), this.$t('customer.schoolAddres'),
        this.$t('customer.englishLevel'), this.$t('customer.computerLevel'), this.$t('customer.entranceTime'),
        this.$t('customer.gradTime')]
        const filterVal = ['schoolName', 'majorName', 'schoolAddres', 'englishLevel', 'computerLevel', 'entranceTime', 'gradTime']
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
