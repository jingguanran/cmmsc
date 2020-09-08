<template>
    <div class="employee-container">
        <div class="searchWrap">
            <div class="block">
                <span class="label">选择日期:</span>
                <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="block">
                <span class="label">排序:</span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-button type="primary" class="btnSearch">查询</el-button>
        </div>
        <div class="btnOperate">
            <el-button >批量导出</el-button>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%;">
            <el-table-column
            label="部门名称"
            prop="department">
            </el-table-column>
            <el-table-column
            label="激活数量"
            prop="activateNumber">
            </el-table-column>
            <el-table-column
            label="未激活数量"
            prop="noActivateNumber">
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">进入下级单位</el-button>
                <el-button type="text" size="small" @click="handleInfo(scope.row)">查看详情</el-button>
            </template>
            </el-table-column>
        </el-table>
        <pagination 
            v-show="total > 0" 
            :total="total" 
            :page.sync="tableCondition.currentPage" 
            :limit.sync="tableCondition.pageSize"
            @pagination="getTable"
         />
    </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
    name:'Employee',
    components:{ Pagination },
    data () {
        return {
            date:'',
            value:'',
            options:[{
                value:'1',
                label:'选项1',
            }],
            defaultValue:0,
            total:3,
            loading:true,
            tableCondition:{
                currentPage:1,
                pageSize:10
            },
            tableData:[{
                department: '省总公司',
                activateNumber: '30',
                noActivateNumber: '20'
            },{
                department: '市总公司',
                activateNumber: '40',
                noActivateNumber: '10'
            },{
                department: '区总公司',
                activateNumber: '20',
                noActivateNumber: '30'
            }],
        }
    },
    mounted(){
        console.log('reload',this.defaultValue)
    },
    methods: {
      handleClick(row) {
        console.log(row);
        this.$router.push({ path: '/employee/subordinateUnit' })
      },
      getTable () {
        //   this.loading = true
          //请求接口
      },
      handleInfo(row){
        this.$router.push({ path: '/employee/employeeInfo' })
      }
    }
}
</script>

<style scoped>
.employee-container {
    width: 100%;
    padding: 20px;
}
.searchWrap {
    display: flex;
}
.block {
    margin-right: 20px;   
    display: flex;
    align-items: center;
}
.label {
    min-width: 80px;
}
.btnOperate {
    margin: 20px 0;
}
.pagination-container {
    text-align: right;
}
</style>