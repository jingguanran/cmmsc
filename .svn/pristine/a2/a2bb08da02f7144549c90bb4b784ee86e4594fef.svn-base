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
        {{ $t('customer.industry') }}
      </el-checkbox>
      <el-checkbox
        v-model="showDetailAddr"
        class="filter-item"
        style="margin-left:15px;"
      >
        {{ $t('customer.educationLevel') }}
      </el-checkbox>
      <el-checkbox
        v-model="showUnitContact"
        class="filter-item"
        style="margin-left:15px;"
      >
        {{ $t('customer.relationHobby') }}
      </el-checkbox>
      <el-checkbox
        v-model="showUnitPhone"
        class="filter-item"
        style="margin-left:15px;"
      >
        {{ $t('customer.relationAddress') }}
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
      <el-table-column :label="$t('customer.relationName')">
        <template slot-scope="{row}">
          <span>{{ row.relationName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.relationAge')">
        <template slot-scope="{row}">
          <span>{{ row.relationAge }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.relation')">
        <template slot-scope="{row}">
          <span>{{ row.relation }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.relationContact')">
        <template slot-scope="{row}">
          <span>{{ row.relationContact }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.unitName')">
        <template slot-scope="{row}">
          <span>{{ row.unitName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.unitNature')">
        <template slot-scope="{row}">
          <span>{{ row.unitNature }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('customer.industry')"
        v-if="showUnitAddr"
      >
        <template slot-scope="{row}">
          <span>{{ row.industry }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('customer.educationLevel')"
        v-if="showDetailAddr"
      >
        <template slot-scope="{row}">
          <span>{{ row.educationLevel }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('customer.relationHobby')"
        v-if="showUnitContact"
      >
        <template slot-scope="{row}">
          <span>{{ row.relationHobby }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('customer.relationAddress')"
        v-if="showUnitPhone"
      >
        <template slot-scope="{row}">
          <span>{{ row.relationAddress }}</span>
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
        :model="temp"
        label-position="right"
        label-width="100px"
        style="width: 100%"
      >
        <el-form-item :label="$t('customer.relationName')">
          <el-input
            v-model="temp.relationName"
            :placeholder="$t('common.enter')"
            minlength="3"
            maxlength="64"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('customer.relation')">
          <el-input
            v-model="temp.relation"
            :placeholder="$t('common.enter')"
            minlength="1"
            maxlength="5"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('customer.relationAge')">
          <el-input
            v-model="temp.relationAge"
            :placeholder="$t('common.enter')"
            minlength="1"
            maxlength="3"
            clearable
          />
        </el-form-item>
        <el-form-item
          :label="$t('customer.relationContact')"
          prop="relationContact"
        >
          <el-input
            v-model="temp.relationContact"
            :placeholder="$t('common.enter')"
            minlength="1"
            maxlength="50"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('customer.unitName')">
          <el-input
            v-model="temp.unitName"
            :placeholder="$t('common.enter')"
            minlength="1"
            maxlength="50"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('customer.unitNature')">
          <el-input
            v-model="temp.unitNature"
            :placeholder="$t('common.enter')"
            minlength="1"
            maxlength="50"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('customer.industry')">
          <el-input
            v-model="temp.industry"
            :placeholder="$t('common.enter')"
            minlength="3"
            maxlength="64"
            clearable
          />
        </el-form-item>
        <el-form-item
          :label="$t('customer.educationLevel')"
          prop="unitPhone"
        >
          <el-input
            v-model="temp.educationLevel"
            :placeholder="$t('common.enter')"
            minlength="2"
            maxlength="50"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('customer.relationHobby')">
          <el-input
            v-model="temp.relationHobby"
            :placeholder="$t('common.enter')"
            minlength="1"
            maxlength="70"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('customer.relationAddress')">
          <el-input
            v-model="temp.relationAddress"
            :placeholder="$t('common.enter')"
            minlength="3"
            maxlength="150"
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
import { getSociety, upSociety, delSociety, chaneSociety } from '@/api/getUser-info/society'
import { validPhone } from '@/utils/regular/cell-phone'

export default {

  name: 'Work',
  directives: { waves },
  data () {
    return {
      list: [],
      temp: {
        id: undefined,
        relationContact: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.add')
      },
      rules: {
        relationContact: [
          { required: false, message: '请输入正确手机号码', trigger: 'blur', validator: validPhone }
        ]
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
    // 新增社会关系
    createData (dataForm) {
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
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            upSociety(this.temp).then(data => {
              this.getUserId()
              this.dialogFormVisible = false
            }).catch(err => {
              console.log(err)
            })
          }
        })
      }
    },
    // 删除社会关系
    handleDelete (row) {
      delSociety({
        relationId: row.id
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
    // 修改社会关系
    updateData (dataForm) {
      // 判断时间格式
      delete this.temp['updateTime']
      delete this.temp['isCurrent']
      delete this.temp['createTime']
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          chaneSociety(
            this.temp
          ).then(data => {
            this.getUserId()
            this.dialogFormVisible = false
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    // 获取社会关系信息
    getUserId () {
      getSociety({
        consumerId: this.$route.params.id
      }).then(data => {
        this.list = data.data
        if (this.list[0]['endTime'] === null) {
          this.list[0]['endTime'] = '在职'
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleDownload () {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [this.$t('customer.relationName'), this.$t('customer.relationAge'), this.$t('customer.relation'),
        this.$t('customer.relationContact'), this.$t('customer.unitName'), this.$t('customer.unitNature'),
        this.$t('customer.industry'), this.$t('customer.educationLevel'), this.$t('customer.relationHobby'), this.$t('customer.relationAddress')]
        const filterVal = ['relationName', 'relationAge', 'relation', 'relationContact', 'unitName', 'unitNature', 'industry', 'educationLevel', 'relationHobby', 'relationAddress']
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
