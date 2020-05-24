/* eslint-disable vue/valid-v-model */
<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-row>
              <el-col :span="7">
                <el-input placeholder="请输入内容" v-model="DataDto.searchContent" clearable @clear="clear">
                    <el-button slot="append" icon="el-icon-search" @click="queryUser"></el-button>
                </el-input>
              </el-col>
              <el-col :span="4">
                  <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
              </el-col>
            </el-row>
            <el-table :data="DataDto.userDto" border stripe>
                <el-table-column type="index" ></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="密码" prop="password"></el-table-column>
                <el-table-column label="创建时间" prop="createTime">
                  // eslint-disable-next-line vue/no-parsing-error
                  <template slot-scope="scope">
                    {{scope.row.createTime | dateFormat}}
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" @click="showChangeDialog(scope.row.id)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="deleteUser(scope.row.id)"></el-button>
                    <el-tooltip class="item" effect="dark" content="something" placement="top" :enterable="false">
                      <el-button type="warning" icon="el-icon-setting"></el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
            </el-table>
              <el-pagination :current-page="DataDto.currentPage"
               :page-size="DataDto.pageSize"
               @current-change="pageChange"
                layout="prev, pager, next"
                :total="DataDto.totalCount">
              </el-pagination>
        </el-card>
        <el-dialog
          title="添加用户"
          :visible.sync="dialogVisible"
          width="50%">
          <el-form :model="addForm" status-icon :rules="addFormRules" ref="addFormRef" label-width="120px" class="demo-ruleForm">
            <el-form-item label="name" prop="name">
              <el-input type="type" v-model="addForm.name" ></el-input>
            </el-form-item>
            <el-form-item label="password" prop="password">
              <el-input type="type" v-model="addForm.password"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="提示"
          :visible.sync="changeDialogStatu"
          width="50%">
           <el-form :model="changeForm" status-icon :rules="changeFormRules" ref="changeFormRef" label-width="120px" class="demo-ruleForm">
            <el-form-item label="name" prop="name">
              <el-input type="type" v-model="changeForm.name" ></el-input>
            </el-form-item>
            <el-form-item label="password" prop="password">
              <el-input type="type" v-model="changeForm.password"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="changeDialogStatu = false">取 消</el-button>
            <el-button type="primary" @click="updateUser">确 定</el-button>
          </span>
        </el-dialog>

    </div>
</template>
<script>
export default {
  data () {
    return {
      DataDto: {
        searchContent: '',
        currentPage: 1,
        pageSize: 4,
        a: false
      },
      dialogVisible: false,
      addForm: {
        name: '',
        password: ''
      },
      addFormRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50个字符', trigger: 'blur' }
        ]
      },
      changeFormRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50个字符', trigger: 'blur' }
        ]
      },
      changeDialogStatu: false,
      changeForm: {
        name: '',
        password: ''
      }
    }
  },
  created () {
    this.queryUser()
  },
  methods: {
    async queryUser () {
      const result = await this.$http.post('/user/queryUserByPage', this.DataDto)
      this.DataDto = result.data
      if (result.status !== 200) return this.$message.error('请求用户列表失败')
    },
    async pageChange (newPage) {
      console.log(newPage)
      this.DataDto.currentPage = newPage
      console.log(this.DataDto)
      this.queryUser()
    },
    changeStatu (a) {
      console.log(a)
    },
    clear () {
      this.queryUser()
    },
    addUser () {
      this.$refs.addFormRef.validate(async vali => {
        if (vali === false) return
        const result = await this.$http.post('user/register', this.addForm)
        if (result.status !== 200) return this.$message.error('添加用户失败')
        this.$message.success('添加用户成功')
        this.$refs.addFormRef.resetFields()
      })
      this.dialogVisible = false
    },
    async showChangeDialog (id) {
      console.log(id)
      this.changeDialogStatu = true
      const result = await this.$http.get('user/queryUserById/' + id)
      this.changeForm = result.data
    },
    async updateUser () {
      this.$refs.changeFormRef.validate(async vali => {
        if (vali === false) return
        const result = await this.$http.post('user/updateUser', this.changeForm)
        console.log(result)
        if (result.status !== 200) return this.$message.error('修改信息失败')
        this.$message.success('修改信息成功')
        this.$refs.changeFormRef.resetFields()
        this.changeDialogStatu = false
        this.queryUser()
      })
    },
    deleteUser (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await this.$http.post('user/deleteUserById/' + id)
        if (result.status !== 200) return this.$message.error('删除失败')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.queryUser()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
