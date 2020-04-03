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
    <el-aside width="200px" >
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#373d41"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <!-- 这部分是以及标题的模板区域-->
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
          <el-menu-item index="1-4-1">
              <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户增删</span>
        </template>
          </el-menu-item>
          <el-menu-item index="1-4-1">
              <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户权限</span>
        </template>
          </el-menu-item>
        </el-submenu>
    </el-menu>
    </el-aside>
    <el-main >Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/')
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
</style>
