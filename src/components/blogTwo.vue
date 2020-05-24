<template>
    <div>
        <el-breadcrumb>
            <el-breadcrumb-item @click="changeState">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input placeholder="请输入内容" v-model="DataDto.searchContent">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary">添加用户</el-button>
                    </el-col>
                </el-row>
                <div class="tablebox">
                <el-table border
                    :data="DataDto.userDto">
                    <el-table-column type="expand">
                    </el-table-column>
                    <el-table-column
                        type="index"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="password"
                        label="密码"
                        width="180">
                    </el-table-column>
                    <el-table-column
                    width="180"
                        prop="createTime"
                        label="时间">
                    </el-table-column>
                     <el-table-column
                     width="180"
                        label="是否是超级用户">
                        <el-switch
                          v-model="switchValue"
                          active-color="#13ce66"
                          inactive-color="#ff4949">
                        </el-switch>
                    </el-table-column>
                    </el-table>
                    <el-pagination
                      :current-page="DataDto.currentPage"
                      :page-size="DataDto.pageSize"
                      @current-change="pageChange"
                        layout="prev, pager, next"
                        :total="DataDto.totalCount">>
                    </el-pagination>
                    </div>
        </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      DataDto: {
        searchContent: '',
        currentPage: 1,
        pageSize: 4
      },
      switchValue: false
    }
  },
  methods: {
    async queryUser () {
      const result = await this.$http.post('/user/queryUserByPage', this.DataDto)
      this.DataDto = result.data
      if (result.status !== 200) return this.$message.error('请求用户列表失败')
    },
    changeState () {
      console.log('this is blog')
    },
    pageChange (newPage) {
      this.DataDto.currentPage = newPage
      this.queryUser()
    }
  },
  created () {
    this.queryUser()
  }
}
</script>
<style lang="less" scoped>
.tablebox{
    margin-top: 70px;
}
</style>
