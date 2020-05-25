<template>
   <div>
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>practice</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-steps :active="activeStep" :align-center="true"
             finish-status="finish" process-status="process">
                        <el-step title="添加用户信息"></el-step>
                        <el-step title="添加商品分类"></el-step>
                        <el-step title="添加商品信息"></el-step>
                        <el-step title="提交信息"></el-step>
                     </el-steps>
            <el-tabs v-model="tabsModel" @tab-click="handleClick"
            :tab-position="tabPositon">
                <el-tab-pane label="添加用户信息" name="0">
                    <el-form :model="personForm" :rules="personRules" ref="personFormFef" label-width="100px">
                        <el-form-item label="姓名" prop="name" size="medium">
                            <el-input v-model="personForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="电话号码" prop="phoneNumber" size="medium">
                            <el-input v-model="personForm.phoneNumber"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password" size="medium">
                            <el-input v-model="personForm.password" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="添加商品分类" name="1"></el-tab-pane>
                <el-tab-pane label="角色商品信息" name="2"></el-tab-pane>
                <el-tab-pane label="检查并提交" name="3"></el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
export default {
  data () {
    var checkAge = (rule, value, callback) => {
      if (!Number.isInteger(parseInt(value))) {
        return callback(new Error('请输入数字值'))
      }
    }
    return {
      activeStep: 0,
      tabsModel: '',
      reverse: true,
      tabPositon: 'left',
      personForm: {
        name: '',
        phoneNumber: '',
        password: ''
      },
      personRules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码框不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClick () {
      this.activeStep = parseInt(this.tabsModel)
    }
  }
}
</script>
<style lang="less" scoped>
.block{
    border: 1px;
    display: flex;
    justify-items: center;
}
.el-timeline{
    margin-top: 50px;
}
el-tabs{
    margin-top: 50px;
}
.el-form-item{
    width: 600px;
    margin: 40px 10px;
}
</style>
