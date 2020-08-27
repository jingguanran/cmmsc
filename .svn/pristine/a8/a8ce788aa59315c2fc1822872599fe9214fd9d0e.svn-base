<template>
  <div
    class="app-container"
    v-loading="loading"
  >
    <div class="filter-container">
      <el-input
        v-model="listQuery.client_account"
        :placeholder="$t('customer.clientAccount')"
        clearable
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.enabled"
        :placeholder="$t('customer.enabled')"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in statusOptions"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t('common.query') }}
      </el-button>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-refresh-right"
        @click="handleReset"
      >
        {{ $t('common.reset') }}
      </el-button>
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
      <el-button
        type="text"
        @click="centerDialogVisible = true"
      >{{ $t('common.batchoPeration') }}</el-button>
      <el-checkbox
        v-model="showCity"
        class="filter-item"
        style="margin-left:15px;"
      >
        {{ $t('customer.clientCity') }}
      </el-checkbox>
      <el-checkbox
        v-model="showCounty"
        class="filter-item"
        style="margin-left:15px;"
      >
        {{ $t('customer.clientCounty') }}
      </el-checkbox>
      <el-checkbox
        v-model="showAddress"
        class="filter-item"
        style="margin-left:15px;"
      >
        {{ $t('customer.clientAddress') }}
      </el-checkbox>
    </div>

    <el-table
      v-loading="listLoading"
      row-key="id"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('customer.clientName')">
        <template slot-scope="{row}">
          <span>{{ row.consumerName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.contactsName')">
        <template slot-scope="{row}">
          <span>{{ row.contactsName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.contactsPhone')">
        <template slot-scope="{row}">
          <span>{{ row.contactsPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.clientAccount')">
        <template slot-scope="{row}">
          <span>{{ row.consumerAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showCity"
        :label="$t('customer.clientCity')"
      >
        <template slot-scope="{row}">
          <span>{{ row.consumerCity }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showCounty"
        :label="$t('customer.clientCounty')"
      >
        <template slot-scope="{row}">
          <span>{{ row.consumerCounty }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.clientTownship')">
        <template slot-scope="{row}">
          <span>{{ row.consumerTownship }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.clientHamlet')">
        <template slot-scope="{row}">
          <span>{{ row.consumerHamlet }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showAddress"
        :label="$t('customer.clientAddress')"
      >
        <template slot-scope="{row}">
          <span>{{ row.consumerAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('customer.installedDate')"
        min-width="100px"
      >
        <template slot-scope="{row}">
          <span>{{ row.installedDate | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('customer.enabled')"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.enabled | statusFilter">
            <span v-if="row.enabled === 1">{{ $t('common.able') }}</span>
            <span v-else>{{ $t('common.disable') }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('common.operate')"
        min-width="100px"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <el-button
            type="primary"
            size="mini"
            @click="goUser(row)"
          >
            {{ $t('common.detail') }}
          </el-button>
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

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.currentPage"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="90px"
        style="width: 100%"
      >
        <el-form-item
          :label="$t('customer.clientName')"
          prop="consumerName"
        >
          <el-input
            v-model="temp.consumerName"
            :placeholder="$t('common.enter')"
            minlength="3"
            maxlength="50"
            clearable
          />
        </el-form-item>
        <el-form-item
          :label="$t('customer.contactsName')"
          prop="contactsName"
        >
          <el-input
            v-model="temp.contactsName"
            :placeholder="$t('common.enter')"
            minlength="3"
            maxlength="50"
            clearable
          />
        </el-form-item>
        <el-form-item
          :label="$t('customer.contactsPhone')"
          prop="contactsPhone"
        >
          <el-input
            v-model="temp.contactsPhone"
            :placeholder="$t('common.enter')"
            minlength="11"
            maxlength="50"
            clearable
          />
        </el-form-item>
        <el-form-item
          :label="$t('customer.clientAccount')"
          prop="consumerAccount"
        >
          <el-input
            v-model="temp.consumerAccount"
            :placeholder="$t('common.enter')"
            minlength="3"
            maxlength="64"
            clearable
          />
        </el-form-item>
        <el-form-item
          :label="$t('customer.clientCity')"
          prop="CityAllCode"
        >
          <el-cascader
            v-model="temp.CityAllCode"
            :options="options"
            clearable
            style="width: 100%"
            :props="optionProps"
            @change="getCode"
          />
        </el-form-item>
        <el-form-item
          :label="$t('customer.SysOrg')"
          prop="reseauId"
        >
          <el-cascader
            v-model="temp.reseauId"
            :options="optionsSysOrg"
            clearable
            style="width: 100%"
            :props="optionsSysOrgProps"
          />
        </el-form-item>
        <el-form-item
          :label="$t('customer.clientAddress')"
          prop="consumerAddress"
        >
          <el-input
            v-model="temp.consumerAddress"
            type="textarea"
            autosize
            :placeholder="$t('common.enter')"
            minlength="3"
            maxlength="200"
            clearable
          />
        </el-form-item>
        <el-form-item
          :label="$t('customer.installedDate')"
          prop="installedDate"
        >
          <el-date-picker
            v-model="temp.installedDate"
            type="date"
            :placeholder="$t('common.enter')"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item
          :label="$t('customer.enabled')"
          prop="enabled"
        >
          <el-radio-group v-model="temp.enabled">
            <el-radio :label="1">{{ $t('common.able') }}</el-radio>
            <el-radio :label="0">{{ $t('common.disable') }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false,loading=false">
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData('dynamicValidateForm'):updateData('dynamicValidateForm')"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 批量操作 -->
    <el-dialog
      title="批量操作"
      :visible.sync="centerDialogVisible"
      width="50%"
      center
    >
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="importExc"
      >
        {{ $t('common.import') }}
      </el-button>
      <el-upload
        ref="upload"
        drag
        :limit="limitNum"
        :auto-upload="false"
        accept=".xlsx,.xls"
        :action="UploadUrl()"
        :before-upload="beforeUploadFile"
        :on-change="fileChange"
        :on-exceed="exceedFile"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList"
      >

        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div
          class="el-upload__tip"
          slot="tip"
        >只能上传xlsx文件，且不超过10M</div>
      </el-upload>

      <el-button
        size="small"
        type="primary"
        @click="submitUpload"
      >立即上传</el-button>
      <el-button size="small">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { getUserData, chaneUser, getCity, getSysOrgTree, upUser, delUser } from '../../api/getUser-info/user'
import { parseTime } from '@/utils'
import { validPhone } from '@/utils/regular/cell-phone'

import { getTemp, toLead } from '@/api/getUser-info/getTemplate'
export default {
  name: 'Customer',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter (status) {
      const statusMap = {
        1: 'success',
        0: 'danger'
      }
      return statusMap[status]
    }
  },
  data () {
    return {
      limitNum: 1,
      fileList: [],
      centerDialogVisible: false,
      loading: true,
      getMsg: '',
      tableKey: '',
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        currentPage: 1,
        // pageSize: 10,
        clientAccount: undefined,
        enabled: undefined,
        sorter: 'createTime_descend'
      },
      list: [

      ],
      statusOptions: [
        { key: '1', display_name: this.$t('common.able') },
        { key: '0', display_name: this.$t('common.disable') }
      ],
      temp: {
        id: undefined,
        enabled: '',
        contactsPhone: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.add')
      },
      rules: {
        contactsPhone: [
          { required: false, message: '请输入正确手机号码', trigger: 'blur', validator: validPhone }
        ]
      },
      showCounty: false,
      showCity: false,
      showAddress: false,
      listLoading: false,
      downloadLoading: false,
      cityAll: [],
      options: [],
      optionsSysOrg: [

      ],
      optionsSysOrgProps: {
        value: 'key',
        label: 'title'
      },
      optionProps: {
        value: 'regionId',
        label: 'fullName'
      }
    }
  },
  computed: {

  },
  created () {
  },
  mounted () {
    this.getUser()
  },
  methods: {
    // 文件超出个数限制时的钩子
    exceedFile (files, fileList) {
      this.$message.warning(`只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`)
    },
    // 文件状态改变时的钩子
    fileChange (file, fileList) {
      this.fileList.push(file.raw)
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile (file) {

      const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      const size = file.size / 1024 / 1024
      if (extension !== 'xlsx' || extension !== 'xls') {
        this.$message.warning('只能上传后缀是xlsx或xls的文件')
      }
      if (size > 10) {
        this.$message.warning('文件大小不得超过10M')
      }
    },
    // 文件上传成功时的钩子
    handleSuccess (res, file, fileList) {
      this.$message.success('文件上传成功')
    },
    // 文件上传失败时的钩子
    // eslint-disable-next-line handle-callback-err
    handleError (err, file, fileList) {
      this.$message.error('文件上传失败')
    },
    UploadUrl () {
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      return ''
    },
    submitUpload () {

      if (this.fileList.length === 0) {
        this.$message.warning('请上传文件')
      } else {
        const form = new FormData()
        form.append('file', this.fileList[0])
        toLead(form).then(
          res => {
          }, err => {
            console.log(err)
          })
      }
    },
    // 获取模板
    importExc () {
      getTemp().then(data => {
        const fileName = '客户信息模板.xlsx'
        const linkNode = document.createElement('a')
        linkNode.download = fileName
        linkNode.style.display = 'none'
        linkNode.href = URL.createObjectURL(data)
        document.body.appendChild(linkNode)
        linkNode.click()
        URL.revokeObjectURL(linkNode.href) // 释放URL 对象
        document.body.removeChild(linkNode)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取code
    getCode (value) {
      this.temp['consumerCityCode'] = value[0]
      this.temp['consumerCountyCode'] = value[1]
      this.temp['consumerTownshipCode'] = value[2]
    },
    // 初始化列表
    async getUser () {
      getUserData(this.listQuery).then(data => {
        this.getMsg = data.data.list
        this.list = this.getMsg
        this.total = data.data.pagination.total
        this.loading = false
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
      })
      // 获取城市信息
      await getCity().then(data => {
        this.options = JSON.parse(data.data)[0].children
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
      })

      // 获取网格信息
      await getSysOrgTree().then(data => {
        this.optionsSysOrg = data.data.list[0].children
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
      })
    },

    // 分页查询
    getList (val) {
      this.loading = true
      this.listQuery['pageSize'] = val.limit
      this.listQuery['pageNum'] = val.page
      this.getUser()
    },
    // 查询
    handleFilter (val) {
      this.loading = true
      this.listQuery['consumerAccount'] = this.listQuery.client_account
      this.listQuery['enabled'] = this.listQuery.enabled
      this.getUser()
    },
    // 重置
    handleReset () {
      this.loading = true
      this.listQuery.client_account = ''
      this.listQuery.enabled = ''
      this.handleFilter()
    },
    resetTemp () {
      this.temp = {
        // id: undefined,
        enabled: 0
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
    // 新增信息
    createData (dataForm) {
      this.loading = true
      if (this.temp.installedDate === undefined) {
        delete this.temp['installedDate']
      } else {
        this.temp['installedDate'] = parseTime(this.temp.installedDate).slice(0, 10)
      }
      delete this.temp['consumerCounty']
      delete this.temp['consumerHamlet']
      delete this.temp['consumerTownship']
      delete this.temp['consumerCity']
      delete this.temp['createTime']
      delete this.temp['updateTime']
      if (this.temp.reseauId !== undefined) {
        this.temp['reseauId'] = this.temp.reseauId[2]
      }
      const valArray = []
      for (const val in this.temp) {
        valArray.push(val)
      }
      if (valArray.length <= 1) {
        this.$message.warning(`不能上传空表单`)
      } else {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            upUser(
              this.temp
            ).then(
              data => {
                if (data.status === 409) {
                  this.$message({
                    message: data.message,
                    type: 'warning'
                  })
                  this.loading = false
                } else {
                  this.getUser()
                  this.dialogFormVisible = false
                  this.loading = false
                }
              }
            ).catch(err => {
              console.log(err)
            })
          }
        })
      }
    },
    handleUpdate (row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.CityAllCode = [row.consumerCityCode, row.consumerCountyCode, row.consumerTownshipCode]
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 修改信息
    updateData (dataForm) {
      this.loading = true
      this.temp['installedDate'] = parseTime(this.temp.installedDate).slice(0, 10)
      delete this.temp['consumerCounty']
      delete this.temp['consumerHamlet']
      delete this.temp['consumerTownship']
      delete this.temp['consumerCity']
      delete this.temp['createTime']
      delete this.temp['updateTime']
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          chaneUser(this.temp).then(data => {
            if (data.status === 409) {
              this.$message({
                message: data.message,
                type: 'warning'
              })
              this.loading = false
            } else {
              this.getUser()
              this.dialogFormVisible = false
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    // 删除用户信息
    handleDelete (row, index) {
      this.loading = true
      delUser({
        id: row.id
      }).then(
        data => {
          this.getUser()
        }
      ).catch(err => {
        console.log(err)
      })
    },
    handleDownload () {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [this.$t('customer.clientName'), this.$t('customer.contactsName'), this.$t('customer.contactsPhone'),
        this.$t('customer.clientAccount'), this.$t('customer.clientCity'), this.$t('customer.clientCounty'),
        this.$t('customer.clientAddress'), this.$t('customer.installedDate'), this.$t('customer.enabled')]
        const filterVal = ['consumerName', 'contactsName', 'contactsPhone', 'consumerAccount', 'consumerCity', 'clientCounty', 'consumerAddress', 'installedDate', 'enabled']
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
    },
    // 路由传参 跳转到tab页面
    goUser (row) {
      var id = row.id
      this.$router.push({ path: `UserDetails/index/${id}` })
    }

  }
}
</script>

