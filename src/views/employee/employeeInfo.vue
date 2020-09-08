<template>
    <div class="employee-container">
        <div class="searchWrap">
            <div class="block">
                <span class="label">员工姓名:</span>
                <el-input
                    placeholder="请输入"
                    v-model="input"
                    clearable>
                </el-input>
            </div>
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
                <span class="label">激活状态:</span>
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
            <el-button type="warning" @click="handleClick" >返回上一级</el-button>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%;">
            <el-table-column
            label="员工姓名"
            prop="employeeName">
            </el-table-column>
            <el-table-column
            label="职务"
            prop="jobPositions">
            </el-table-column>
            <el-table-column
            label="激活状态"
            prop="activateStatus">
            </el-table-column>
            <el-table-column
            label="激活时间"
            prop="activateTime">
            </el-table-column>
            <el-table-column
            label="开通时间"
            prop="startTime">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name:'EmployeeInfo',
    data () {
        return {
            input:'',
            date:'',
            value:'',
            options:[{
                value:'0',
                label:'未激活',
            },{
                value:'1',
                label:'已激活',
            }],
            tableData:[{
                employeeName: 'admin1',
                jobPositions: '总经理',
                activateStatus: '已激活',
                activateTime: '2020-08-10',
                startTime: '2020-08-10'
            },{
                employeeName: 'admin2',
                jobPositions: '总经理',
                activateStatus: '已激活',
                activateTime: '2020-08-10',
                startTime: '2020-08-10'
            },{
                employeeName: 'admin3',
                jobPositions: '总经理',
                activateStatus: '已激活',
                activateTime: '2020-08-10',
                startTime: '2020-08-10'
            }],
        }
    },
    methods: {
      handleClick(row) {
        console.log(row);
        this.$router.push({ path: '/employee/activation' })
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
</style>