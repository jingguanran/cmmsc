<template>
  <div class="user-info">
    <el-row :gutter="30">
      <el-col :span="8">
        <div class="tree">
          <el-input placeholder="请输入部门名称" v-model="filterText"></el-input>

          <el-tree
            class="filter-tree"
            @node-click="treeClick"
            :data="groupData"
            :props="defaultProps"
            :filter-node-method="filterNode"
            ref="tree"
          ></el-tree>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="content">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="员工姓名">
              <el-input v-model="formInline.user" placeholder="请输入员工姓名"></el-input>
            </el-form-item>
            <el-form-item label="职务">
              <el-select v-model="formInline.region" placeholder="请选择">
                <el-option v-for="item in rollList" :label="item.name" :value="item.value" :key="item.id"></el-option>
                
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="员工姓名" width="180"></el-table-column>
            <el-table-column prop="name" label="性别" width="100"></el-table-column>
            <el-table-column prop="address" label="手机号"></el-table-column>
            <el-table-column prop="name" label="职务"></el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next"
            :total="100"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },

  methods: {
    treeClick(e,e2,e3) {
      console.log(e,e2,e3)
    },
    getStaffList() {
      queryStaffInfo(this.listQuery).then(response=>{
         this.tableData = response.data.list
      })
    },
    getGroupList(){
      queryGroup().then(response=>{
        this.groupData = response.data.list
      })
    },
    onSubmit(e) {
      console.log(Object.assign(this.listQuery,this.formInline))
      console.log(e);
    },
    handleCurrentChange(e) {
      console.log(e);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
  },

  data() {
    return {
      rollList:[{
        id:1,
        name:"经理",
        value:"s1"
      },
      {
        id:2,
        name:"经理",
        value:"s2"
      }],
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        id:1
      },
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
      formInline: {
        user: "",
        region: "",
      },
      filterText: "",
      groupData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
};
</script>
 <style scoped>
.user-info {
  padding: 24px;
  background: #f3f3f3;
}
.tree,
.content {
  background: white;
  padding: 24px;
  height: 1000px;
  border-radius: 4px;
}
</style>