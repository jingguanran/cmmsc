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
            <el-button type="warning" @click="handleClick" >返回上一级</el-button>
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
                <el-button type="text" size="small">查看详情</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name:'SubordinateUnit',
    data () {
        return {
            date:'',
            value:'',
            options:[{
                value:'1',
                label:'选项1',
            }],
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