/* eslint-disable vue/no-duplicate-attributes */
<template>
  <el-container class="home-container">
  <el-header >
      <div>
          <img src="../assets/daivd.png" alt="">
          <span>李鹤的后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
  </el-header>
  <el-container>
    <el-aside :width="togglecollapse ? '64px':'200px'" >
        <el-menu
          unique-opened
          :default-active="navstatus"
          class="el-menu-vertical-demo"
          background-color="#373d41"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="togglecollapse"
          router>
           <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-submenu index="1">
            <!-- 这部分是以及标题的模板区域-->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="1-4-1" @click="changeNavStatus">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>用户列表</span>
                  </template>
              </el-menu-item>
              <el-menu-item index="1-4-2">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>用户权限</span>
                  </template>
              </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <!-- 这部分是以及标题的模板区域-->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
              <el-menu-item index="1-5-1">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>商品权限</span>
                  </template>
              </el-menu-item>
              <el-menu-item index="1-5-2">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>用户权限</span>
                  </template>
              </el-menu-item>
          </el-submenu>
        </el-menu>
    </el-aside>
    <el-main >
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      userList: [],
      togglecollapse: false,
      navstatus: ''
    }
  },
  create () {
    this.queryAll()
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/')
    },
    async queryall () {
      // eslint-disable-next-line no-unused-vars
      const result = await this.$http.post('/user/queryAll')
      console.log(result)
      this.userList = result.data
    },
    toggleCollapse () {
      this.togglecollapse = !this.togglecollapse
    },
    changeNavStatus () {
      this.navstatus = '1-4-1'
    }
  }
}
</script>

<style lang="less" scoped>
    .home-container{
        height: 100%;
    }
    .el-header{
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 0px;
        align-items: center;
        color: #fff;
        font-size: 20px;
        >div{
            display: flex;
            align-items: center;
            span{
                margin-left: 15px;
            }
        }
    }
    .el-aside{
        background: #333744;
        height: 100%;
    }
    .el-main{
        background-color: #eaedf1;
        height: 100%;
    }
    .toggle-button{
      background:#4a5064 ;
      font-size: 10px;
      line-height: 24px;
      color: burlywood;
      text-align: center;
      letter-spacing: 0.4em;
      cursor: pointer;
    }
</style>
