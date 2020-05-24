<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>role管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row>
                <el-col :span="7">
                    <el-input v-model="name">
                        <el-button type="success" slot="append" icon="el-icon-search" @click="insertRole">添加role</el-button>
                    </el-input>
                </el-col>
            </el-row>
            <el-table :data="RoleList" border >
                 <el-table-column type="expand">
                   <template slot-scope="scope">
                     <el-row v-for="(item , i) in scope.row.firstPrivilege" :key="i">
                       <el-divider v-if="i !== 0"></el-divider>
                       <el-col :span="8">
                     <el-tag  @close="deleteFirstPrivilege(item.id)">
                       {{item.name}}
                     </el-tag>
                     <i class="el-icon-caret-right"></i>
                     </el-col>
                     <el-col :span="16">
                       <el-tag type="info" v-for="(item1 ,i1) in item.basePrivilege" :key="i1"
                       closable @close="deleteBasePrivilege(item1.id)">
                         {{item1.name}}
                       </el-tag>
                     </el-col>
                     </el-row>
                   </template>
                 </el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="name" label="权限名称"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="showPrivilegeDialog(scope.row.id)">一级权限</el-button>
                        <el-button type="success" @click="showBasePrivilegeDialgo(scope.row)">基础权限</el-button>
                        <el-button type="danger" @click="deleteRole(scope.row.id)">删除</el-button>
                        <el-button type="info" @click="showTree(scope.row)">权限树</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
          title="分配一级权限"
          :visible.sync="PrivilegeDialogVisible"
          width="30%"
        >
          <el-input v-model="firstPrivilege.name"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeFirstPrivilegeDialog">取 消</el-button>
            <el-button type="primary" @click="addFirstPrivilege">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="权限树"
        :visible.sync="privilegeTreeVisible"
        width="30%">
          <el-tree :data="peivilegeList" :props="defaultProps" node-key="id" default-expand-all></el-tree>
        </el-dialog>
        <!--添加基础权限的对话框  -->
        <el-dialog title="添加基础权限"
        :visible.sync="basePrivilegeVisible"
        width="30%">
          <el-select v-model="basePrivilegePara.idFirstPrivilege" placeholder="请选择" size="medium">
            <el-option
              v-for="item in firstPrivileges"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input placeholder="请输入基本权限" v-model="basePrivilegePara.name"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeBasePrivilegeDialog">取 消</el-button>
            <el-button type="primary" @click="addBasePrivilege">确 定</el-button>
          </span>
        </el-dialog>
</div>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      RoleList: [],
      PrivilegeDialogVisible: false,
      firstPrivilege: {
        name: '',
        id_role: 0
      },
      peivilegeList: [],
      privilegeTreeVisible: false,
      defaultProps: {
        children: 'basePrivilege',
        label: 'name'
      },
      basePrivilegeVisible: false,
      firstPrivileges: [],
      basePrivilegePara: {
        idFirstPrivilege: '',
        name: '',
        isUse: true
      }
    }
  },
  methods: {
    async  queryAllRole () {
      const data = await this.$http.get('queryAllRolePrivilege')
      this.RoleList = data.data
    },
    async insertRole () {
      const val = await this.$http.post('insertRole' + '/' + this.name)
      if (val.data === 1) {
        this.name = ''
        this.queryAllRole()
        return this.$message.success('添加用户成功')
      }
    },
    showPrivilegeDialog (roleId) {
      this.PrivilegeDialogVisible = true
      this.firstPrivilege.id_role = roleId
    },
    closeFirstPrivilegeDialog () {
      this.PrivilegeDialogVisible = false
      this.firstPrivilege.name = ''
      this.id_role = 0
    },
    async addFirstPrivilege () {
      const res = await this.$http.post('insertFirstPrivilege', this.firstPrivilege)
      this.PrivilegeDialogVisible = false
      if (res.data === 1) {
        this.queryAllRole()
        return this.$message.success('一级权限添加成功')
      }
      this.$message.console.error('一级权限添加失败')
    },
    showTree (role) {
      this.privilegeTreeVisible = true
      this.peivilegeList = role.firstPrivilege
    },
    showBasePrivilegeDialgo (role) {
      this.firstPrivileges = role.firstPrivilege
      this.basePrivilegeVisible = true
    },
    closeBasePrivilegeDialog () {
      this.basePrivilegeVisible = false
      this.basePrivilegePara.idFirstPrivilege = ''
      this.basePrivilegePara.name = ''
    },
    async addBasePrivilege () {
      const res = await this.$http.post('addBasePrivilege', this.basePrivilegePara)
      this.basePrivilegeVisible = false
      console.log(res)
      if (res.data === 1) {
        this.queryAllRole()
        this.basePrivilegePara.idFirstPrivilege = ''
        this.basePrivilegePara.name = ''
        return this.$message.success('基本权限添加成功')
      }
    },
    async deleteRole (idRole) {
      const rel = await this.$http.post('deleteRole' + '/' + idRole)
      if (rel.data === 1) {
        this.$message.success('角色删除成功')
        this.queryAllRole()
      }
    },
    deleteFirstPrivilege (idFirst) {
      console.log(idFirst)
    },
    deleteBasePrivilege (idBase) {
      this.$http.delete('deleteBasePrivilege/' + idBase)
      this.queryAllRole()
    }
  },
  created () {
    this.queryAllRole()
  }
}
</script>
<style lang="less" scoped>
.el-button{
    margin-left: 20px;
}
.el-tag{
  margin: 10px
}
.el-input{
  margin-top: 10px;
}
.el-select{
   display: flex;
        justify-content: flex-end;
}
</style>
