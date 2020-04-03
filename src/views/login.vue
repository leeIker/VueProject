/* eslint-disable indent */
/* eslint-disable no-unreachable */
/* eslint-disable vue/valid-v-model */
/* eslint-disable no-trailing-spaces */
/* eslint-disable keyword-spacing */
/* eslint-disable space-before-blocks */
/* eslint-disable space-before-function-paren */

<template>
    <div class="login-contanier">
        <div class="login-box">
            <div class="avatar-box">
                <img src="../assets\logo.png" alt="">
            </div>
            <el-form ref="loginFormRef" label-width="0px" class="login-form" :rules="loginFormRules"  :model="loginForm">
                <el-form-item  prop="name">
                    <el-input prefix-icon="el-icon-user-solid"  v-model="loginForm.name">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" prefix-icon="el-icon-question"  v-model="loginForm.password" ></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">login</el-button>
                    <el-button type="info" @click="reset">reset</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        name: 'lihe',
        password: '123456'
      },
      loginFormRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: false, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reset () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        const result = await this.$http.post('/user/login', this.loginForm)
        console.log(result)
        // eslint-disable-next-line eqeqeq
        if (result.status != 200) {
          this.reset()
          return this.$message.error('login fail')
        }
        this.$message.success('login seccess')
        // eslint-disable-next-line no-unreachable
        console.log(result.data.userToken)
        window.sessionStorage.setItem('userToken', result.data.userToken)
        this.$router.push('/home')
      })
    },
    async queryUser () {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        const result = await this.$http.get('user/queryAll')
        console.log(result.data)
      }

      )
    }
  }
}
</script>
<style lang="less" scoped>
    .login-contanier{
        background-color:#2b4b6b;
        height: 100%;
    }
    .login-box{
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position:absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .avatar-box{
        height: 150px;
        width:150px;
        border:1px solid #eee;
        border-radius: 50%;
        padding:10px;
        background-color: #eee;
        box-shadow: 0 0 10px #ddd;
        position:absolute;
        left:50%;
        transform: translate(-50%,-50%);
        img{
            width:100%;
            height:100%;
            border-radius: 50%;
        }
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
    .login-form{
        width: 100%;
        padding: 0px 20px;
        box-sizing: border-box;
        position: absolute;
        bottom: 0px;
    }
</style>
