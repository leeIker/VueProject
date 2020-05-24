/* eslint-disable camelcase */
<template>
   <div>
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row>
            <el-col :span="2">
                <el-button type="primary" @click="openInsertDialgon">增加分类</el-button>
            </el-col>
        </el-row>
         <el-alert
                title="最多支持三级分类"
                type="warning">
         </el-alert>
        <el-card>
            <tree-table :data="tabbleData" :columns="columns" :show-index="true" border
             :selection-type="false" :expand-type="false">
                <template slot="isOk" slot-scope="scope">
                  <i class="el-icon-success" v-if="scope.row.name" style="color: green"></i>
                  <i class="el-icon-error" v-else style="color: black"></i>
                </template>
                <template slot="class" slot-scope="scope">
                  <el-tag v-if="scope.row.id<100">一级分类</el-tag>
                  <el-tag v-else-if="scope.row.id>99 && scope.row.id<500" type="success">二级分类</el-tag>
                  <el-tag type="warning" v-if="scope.row.id>499">三级分类</el-tag>
                </template>
                <template slot="manage" slot-scope="scope">
                  <el-button type="danger" @click="deleteClass(scope.row.id)">删除</el-button>
                  <el-button type="success">操作</el-button>

                </template>
        </tree-table>
        </el-card>
        <el-dialog
        title="添加商品分类"
        :visible.sync="insertDialogVisible"
        width="30%"
        >
            <el-cascader
                v-model="goodClass"
                :options="tabbleData"
                placeholder="请选择分类"
                :change-on-select="true"
                :props="{ expandTrigger: 'hover' ,
                label: 'name', value:'id'}"
                @change="handleChange"></el-cascader>
            <el-input placeholder="请填写分类名"
            v-model="className"
            ></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="insertDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="insertGoodClass">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      tabbleData: [],
      columns: [{ label: '类名', prop: 'name' },
        { label: '类别是否有效', type: 'template', template: 'isOk' },
        { label: '权限等级', type: 'template', template: 'class' },
        { label: '操作', type: 'template', template: 'manage' }
      ],
      insertDialogVisible: false,
      goodClass: [],
      className: ''
    }
  },
  methods: {
    async queryGoodTree () {
      const res = await this.$http.get('queryGoodClassTree')
      this.tabbleData = res.data
      console.log(res.data)
    },
    openInsertDialgon () {
      this.insertDialogVisible = true
    },
    async insertGoodClass () {
      if (this.goodClass.length === 0) {
        const res = await this.$http.post('insertFirst/' + this.className)
        if (res.data === 1) {
          this.goodClass = []
          this.className = ''
          this.insertDialogVisible = false
          this.queryGoodTree()
          return this.$message.success('一级商品分类添加成功')
        }
      } else if (this.goodClass.length === 1) {
        const res = await this.$http.post('insertSecond', { id_first: this.goodClass[0], name: this.className })
        if (res.data === 1) {
          this.goodClass = []
          this.className = ''
          this.insertDialogVisible = false
          this.queryGoodTree()
          return this.$message.success('二级商品分类添加成功')
        }
      } else {
        const res = await this.$http.post('insertBase', { id_second: this.goodClass[1], name: this.className })
        if (res.data === 1) {
          this.goodClass = []
          this.className = ''
          this.insertDialogVisible = false
          this.queryGoodTree()
          return this.$message.success('三级商品分类添加成功')
        }
      }
    },
    handleChange () {
      console.log(this.goodClass)
    },
    deleteClass (id) {
      console.log(id)
    }
  },
  created () {
    this.queryGoodTree()
  }
}
</script>
<style lang="less" scoped>
.el-button{
    margin-left: 10px;
}
.el-card{
    margin: 20px;
}
.el-input{
  margin-top: 10px;
}
.el-cascader{
   display: flex;
        justify-content: flex-end;
}
.el-alert{
  margin: 20px;
  width: 500px;
}
</style>
