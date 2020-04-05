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
                <el-input placeholder="请输入内容">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-col>
              <el-col :span="4">
                  <el-button type="primary">添加用户</el-button>
              </el-col>
            </el-row>
            <el-table :data="DataDto.userDto" border stripe>
                <el-table-column type="index" ></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="密码" prop="password"></el-table-column>
                <el-table-column label="创建时间" prop="createTime"></el-table-column>
                <el-table-column label="状态">
                  <template >
                    <el-switch v-model="a"  active-color="#13ce66"
                               inactive-color="#ff4949"
                               @change="changeStatu(a)">
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template>
                    <el-button type="primary" icon="el-icon-edit"></el-button>
                    <el-button type="danger" icon="el-icon-delete"></el-button>
                    <el-tooltip class="item" effect="dark" content="sister" placement="top" :enterable="false">
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

    </div>
</template>
<script>
export default {
  data () {
    return {
      a: true,
      DataDto: {
        currentPage: 1,
        pageSize: 4
      }
    }
  },
  created () {
    this.queryUser()
  },
  methods: {
    async queryUser () {
      const result = await this.$http.post('/user/queryUserByPage', this.DataDto)
      console.log(result)
      this.DataDto = result.data
      console.log(this.DataDto)
      if (result.status !== 200) return this.$message.error('请求用户列表失败')
    },
    async pageChange (newPage) {
      this.DataDto.currentPage = newPage
      const result = await this.$http.post('/user/queryUserByPage', this.DataDto)
      console.log(result)
      this.DataDto = result.data
    },
    changeStatu (a) {
      console.log(a)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
