<template>
   <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row>
              <el-col :span="7">
                <el-input placeholder="请输入内容" v-model="searchContent" clearable>
                    <el-button slot="append" icon="el-icon-search" @click="queryGoodsByContent"></el-button>
                </el-input>
              </el-col>
              <el-col :span="4">
                  <el-button type="primary" @click="openAddGoodDialog">添加商品</el-button>
              </el-col>
            </el-row>
            <el-table :data="Gooddata">
              <el-table-column type="index"></el-table-column>
              <el-table-column label="商品名" prop="name"></el-table-column>
              <el-table-column label="价格" prop="price"></el-table-column>
              <el-table-column label="描述" prop="des"></el-table-column>
              <el-table-column label="重量" prop="weight"></el-table-column>
              <el-table-column label="操作">
                <template>
                  <el-button type="primary">操作</el-button>
                  <el-button type="danger" >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
        title="添加商品"
        :visible.sync="addGoodsDialogVisible"
        width="30%"
        >
        <el-cascader
        v-model="idBase"
        :options="GoodTypeTree"
        :props="{ expandTrigger: 'hover' ,value:'id',label:'name'}"
        ></el-cascader>
        <el-input v-model="good.name" placeholder="请输入名称"></el-input>
        <el-input v-model="good.price" placeholder="请输入价格"></el-input>
        <el-input v-model="good.des" placeholder="请输入描述"></el-input>
        <el-input v-model="good.weight" placeholder="请输入重量"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addGoodsDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="insertGood">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      searchContent: '',
      Gooddata: [],
      addGoodsDialogVisible: false,
      GoodTypeTree: [],
      idBase: '',
      good: {
        id_base: '',
        name: '',
        price: '',
        des: '',
        weight: ''
      }
    }
  },
  computed: {
    idbasef: function () {
      return this.idBase[2]
    }
  },
  methods: {
    queryGoodsByContent () {

    },
    async queryAllGood () {
      const res = await this.$http.get('queryAllGoods')
      if (res.data) {
        this.Gooddata = res.data
      }
    },
    openAddGoodDialog () {
      this.addGoodsDialogVisible = true
    },
    async queryGoodTypeTree () {
      const res = await this.$http.get('queryGoodClassTree')
      if (res.data) {
        this.GoodTypeTree = res.data
      }
    },
    async insertGood () {
      this.good.id_base = this.idbasef
      const res = await this.$http.put('insertGood', this.good)
      if (res.data) {
        this.idBase = ''
        this.good.name = ''
        this.good.price = ''
        this.good.des = ''
        this.good.weight = ''
        this.$message.success('商品添加成功')
        this.addGoodsDialogVisible = false
      }
    }
  },
  created () {
    this.queryGoodTypeTree()
    this.queryAllGood()
  }
}
</script>
<style lang="less" scoped>
.el-cascader{
  display: flex;
}
.el-input{
  margin-top: 15px;
}
</style>
